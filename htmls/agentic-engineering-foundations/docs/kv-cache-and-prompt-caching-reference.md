# Under the Hood: Tokens, KV Cache & Prompt Caching — Knowledge Reference

> A revision doc capturing the mental model worked out for the "Under the Hood" module
> (slides 21E → 21H). Written so you can re-derive every slide's claim from first
> principles. The HTML deck is canonical; this is the *why* behind it.

---

## 0. The one-paragraph summary

When you hit Enter, the server **prefills** your entire context (computes a Key and a
Value for every token), then **decodes** the answer one token at a time. The Key/Value
tensors are stored in a **KV cache** so each token's K/V is computed *once* instead of
re-derived every step. That store lives in GPU memory **beside the model's weights, not
inside them**, and by default it is freed when the response ends. **Prompt caching is that
same KV store, kept warm across requests**: the server retains the prefix's K/V (keyed by
a hash of the prefix tokens) so the next request *loads* it instead of re-prefilling.
KV cache and prompt caching are **not different mechanisms — they are the same store with
two lifetimes.**

---

## 1. Tokens, prefill, decode (the cost anatomy)

- **Token** = the unit of everything. Text is chopped into sub-word tokens; the model only
  ever sees tokens. Cost, speed, and context size are all counted in tokens.
- A single turn has three parts:
  1. **Prefill** — the server reads your *entire* input prompt in one **parallel** pass.
  2. **Compute (attention)** — for every input token it computes a **Key** and a **Value**.
     (This is really *part of* prefill, not a separate phase — prefill *is* the K/V compute.)
  3. **Decode / Generate** — output tokens are produced **one at a time**, serially.
- **Prefill + compute = input cost. Decode = output cost.** You pay both, every turn.
- **Why sessions get expensive:** every turn re-sends a growing context, and the **stable
  prefix** (system prompt, tools, CLAUDE.md, early turns) goes through prefill *again* every
  turn even though it never changed. Re-sending 50K stable tokens 20 times = billing ~1M
  tokens you already paid for.
- **Demo numbers (local Mac Mini M4 Pro, oMLX):** prefill ingests at ~107 tok/s (parallel,
  compute-bound); decode emits at ~16.6 tok/s (serial, memory-bandwidth-bound). The same
  context that took seconds to ingest streams out one word at a time.

---

## 2. What K, Q, V actually are

At each attention layer, every token's vector is projected three ways through **learned
weight matrices** (W_Q, W_K, W_V):

| Symbol | Name  | Meaning | Stored? |
|--------|-------|---------|---------|
| **Q** | Query | What the current token is *looking for* | ❌ used once, then dropped |
| **K** | Key   | The *label* a token advertises — what later Queries match against | ✅ |
| **V** | Value | The *content* a token hands over when its Key is matched | ✅ |

**Attention = a soft dictionary lookup.** Each past token publishes a Key (an address) and
a Value (a payload). The current token forms a Query, dot-products it against every Key,
softmaxes the scores, and pulls a weighted sum of the Values.

**Why it's the "KV" cache and not "QKV":** future tokens need to be *found* (via their K)
and *read* (via their V). A past token's Query — what *it* was searching for — is useless
to anyone else. So you cache K and V, and throw Q away.

These are **just numbers** (numeric tensors), not "thoughts" or "meaning."

---

## 3. The KV cache (within one response)

**Structure — the key correction:** it is **not** one entry for the whole context. It is
**one K vector and one V vector per token, per layer.** For T tokens in an L-layer model:

```
KV cache = for each layer ℓ (0..L-1):
             K_ℓ : a stack of T key vectors    [tok0_K, tok1_K, ...]
             V_ℓ : a stack of T value vectors  [tok0_V, tok1_V, ...]
```

It grows **along the token axis** — one new row per token.

**Prefill:** compute K and V for *all* input tokens in parallel, write them to the store.
One-time cost.

**Decode (the loop):** for each new token —
1. compute its Q, K, V;
2. its **Q reads the entire stored K stack** → softmax → weighted sum over the **entire
   stored V stack** → output token;
3. **append** its own K and V as a new row.
Repeat. The store is one row longer each step.

**Why it matters (the "compute once" point):** *Without* the cache, emitting token #500
would re-derive the K/V of tokens 1–499 at **every** step — that K/V recomputation alone
is O(N²). *With* it, each token's K/V is computed exactly **once** and reused forever after
→ O(N) total for K/V. (Note: the attention computation — Q dot-producting against all
stored K's — remains O(N) per step regardless; the cache removes a *redundant* quadratic
layer, not the fundamental one.) The KV cache is therefore not an add-on optimization —
**it is the thing that makes autoregressive generation practical.** Without it, each step
pays *both* the attention cost *and* re-derives everyone's K/V — doubling the quadratic
work for nothing. Every real inference engine runs the cache always-on.

> ⚠️ Watch the word "recompute." With the cache, nothing is computed twice. "Recompute"
> only describes the **counterfactual no-cache world** — the waste the cache prevents.
> The deck deliberately avoids implying ongoing redundant work.

**Ephemeral by default:** the store exists for *one generation* and is freed when the
response ends. It does **not** carry to your next message — so next turn the stable prefix
gets re-prefilled from scratch. Cost drops to a *fraction*, not to *zero*.

---

## 4. Where the KV cache lives — the three boxes

The cache is **NOT inside the model's weights.** Inside the inference server there are three
distinct regions of GPU memory:

| Box | What it is | Read/Write | Holds your data? |
|-----|-----------|-----------|------------------|
| **① Weights** | W_Q, W_K, W_V, MLP — the model | **Read-only**, loaded once at boot, shared by all requests, **never changed, never cleared** | ❌ never |
| **② KV Cache Store** | the per-token K/V stack | **Read + write**, grows one row per token | ✅ the *only* box that does |
| **③ Forward Pass** | the compute (matmuls) | transient | ❌ nothing persists |

**Data flow:** a token enters the forward pass → it **reads the weights** (to project Q/K/V)
**and reads + appends the KV store** (for attention) → emits a token. Nothing stays in the
forward pass.

**The misconception this kills:** "the cache is baked into the model" / "the model
remembers." No — the weights are fixed machinery; the KV store is a separate buffer the
runtime manages. **Kitchen metaphor:** weights = the chef + recipes (never wiped);
KV cache = the prep table where prepped ingredients pile up; tokens = orders. The chef
reads the prep table, makes the next item, adds it to the table. At end of service the table
is wiped (or covered and saved) — **the chef and recipes are never "cleared."** The common
error is putting the ingredients *into the chef*; they go on the table beside him.

**What is kept vs cleared at end of response:**
- **Weights:** permanent. Serve millions of requests untouched. *Not* part of the
  "keep alive" question at all. (So "weights get cleared between requests" is wrong.)
- **KV store:** freed by default — *or* retained for a TTL if prompt caching keeps it warm.
  This is the **only** box worth keeping alive, and the only one prompt caching touches.

*(At scale, box ② can be tiered/offloaded — GPU HBM → CPU DRAM → SSD → a distributed KV
store — and prefill/decode can even run on separate nodes. The "separate store" picture is
literally true in big deployments; on a single local machine it's just a separate region of
unified memory.)*

---

## 5. Prompt caching = the KV cache, kept warm across requests

**Prompt caching is the same KV store; the server simply chooses not to free it.** It
retains the prefix's K/V beyond one request so the next request *loads* it instead of
re-prefilling.

**Two-request timeline:**
- **Request 1 — cache write:** full prefill of the prefix (system prompt, tools, CLAUDE.md).
  Its K/V is computed and kept in the store, **keyed by a hash of the prefix tokens.**
  (Anthropic: write ≈ **1.25×** base input price for the 5-min tier; **2×** for the 1-hour
  tier. Paid once.)
- **Request 2 — cache hit:** same prefix → hash matches → **load the stored K/V, skip its
  prefill.** Only the new tail is prefilled. The match runs along the prefix — in Anthropic's
  API, this is a block-level lookback (up to 20 blocks) checking cumulative prefix hashes;
  at the KV infrastructure level, it is contiguous token-level matching. Partial hits are
  normal — only the unbroken leading run that still matches is reused. (Anthropic: cache
  read ≈ **0.1× = 10%** of base input price, on every hit.)

**Same store, two lifetimes — the corrected framing:**
- *Within a response:* built during prefill + decode, freed when it returns.
- *Across requests:* the prefix's K/V is **retained**.
- One-liner: **"Prompt caching is the KV cache the server didn't throw away."**
- ❌ The old framing "different layers, different scope" is **wrong** — it implies two
  unrelated mechanisms. There is one store; only its lifetime differs.

**Why it's prefix-based (rigorous reason):** a token's K/V at upper layers depends, through
causal attention, on **all tokens before it**. Change token #5 and the cached K/V of #6,
#7, #8… are all invalidated. So you can reuse K/V only for the **unbroken leading run** that
is still byte-identical — your "stable prefix." Edit something early — even one token — and
the cache breaks **from that point onward.** This is not a heuristic; it's a direct
consequence of how K/V are computed.

**Eviction (when the warm store goes cold):**
- **TTL expiry** — idle timeout. Anthropic's documented tiers: **~5 min** (default) and
  **1 hour** (paid). Each cache *hit* resets the timer. *(No documented 30-min Anthropic
  tier — don't teach that number. Other providers, e.g. Moonshot/Kimi, DeepSeek, run their
  own automatic context caching with different windows.)*
- **Memory-pressure eviction (LRU)** — even before TTL, a full store evicts old entries to
  make room. So a cache hit is **never guaranteed by the clock alone.**
- Lapse → re-prefill the whole prefix at full price.

---

## 6. Reconciling with "the server remembers nothing" (statelessness)

There's an apparent contradiction: slide 21C says nothing persists server-side, yet prompt
caching keeps K/V for ~5 min. Resolution — **statelessness is the contract; prompt caching
is a transparent optimization underneath it:**
- The cache is keyed by a **hash of the prefix tokens** (content), not by your session/
  identity. It is not addressable "session state."
- It **expires** and can be **evicted** at any time.
- A miss just **recomputes the identical answer** — correctness never depends on it.
- You **still send the entire context every turn.** The server doesn't "pick up where it
  left off"; it re-reads everything and merely *skips recomputing* the unchanged prefix.

So the stateless contract holds. The deck phrases 21C as "no *conversation state* persists
server-side" and flags the cache as a speed trick, not memory.

---

## 7. The unbroken causal chain (how the slides connect)

```
21E   Why sessions get expensive   → cost lives in re-prefilling the stable prefix every turn
21E1  Prefill · Compute · Generate  → anatomy of one turn; prefill computes K/V = the cost
21G   Live: Prefill vs Decode       → see it: parallel ingest (107 t/s) vs serial emit (16.6 t/s)
21F   KV Cache: Compute Once, Reuse  → define Q/K/V; store K/V so each is computed once (ephemeral)
21F1  Where the KV Cache Lives       → 3 boxes: weights vs KV store vs forward pass (not in the model)
21H1  Prompt Caching: Same Store...  → keep that store warm across requests for the prefix
21I   Your Stable Prefix             → what's cacheable (machinery) vs volatile (chat); write rules in CLAUDE.md
21J/K Live: Without / With Cache     → 0% vs 69.8% efficiency; 3.3× faster, 3.7× cheaper
21L   Putting It Together            → recap
```

Each link answers the question the previous slide opened:
*cost is in prefill → the cache makes compute-once possible → here's the box it lives in
(not the weights) → so we can keep that box warm → here's what stays warm → proof → recap.*

---

## 8. Quick myth-buster

| Myth | Reality |
|------|---------|
| The KV cache is part of the model / the weights | Separate memory store *beside* the weights |
| The cache loads *into* the weights | The forward pass *reads* the cache; weights are read-only |
| The weights get cleared between requests | Weights are permanent; only the KV store is freed/kept |
| The whole context is one K/V entry | One K and one V *per token, per layer* |
| With the cache, K/V is recomputed each step | Computed *once*; "recompute" = the no-cache counterfactual |
| KV cache and prompt caching are different mechanisms | Same store, two lifetimes |
| A cache hit is guaranteed within 5 minutes | TTL *and* memory-pressure (LRU) eviction both apply |
| Caching = the server remembers your session | Content-hashed, expiring, correctness-neutral optimization |

---

## 9. Sources

- [Claude API — Prompt caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [NVIDIA NIM — KV Cache Reuse (a.k.a. prefix caching)](https://docs.nvidia.com/nim/large-language-models/1.2.0/kv-cache-reuse.html)
- [How prompt caching works — Paged Attention & Automatic Prefix Caching](https://sankalp.bearblog.dev/how-prompt-caching-works/)
- [The Evolution of KV Cache: from simple buffers to distributed memory systems](https://luv-bansal.medium.com/the-evolution-of-kv-cache-from-simple-buffers-to-distributed-memory-systems-df51cb8ce26f)
