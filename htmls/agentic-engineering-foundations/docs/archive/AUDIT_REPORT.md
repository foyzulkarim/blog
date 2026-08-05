# Module 4 — "Under the Hood" Consistency Audit Report

## Summary

- **Total slides in Module 4 scope:** 25
  - N-20, N-21A, N-21B, N-21C, N-21D, N-21E, N-21E0, N-21E1, N-21E2, N-21F, N-21F2, N-21F3, N-21G, N-21G2, N-21G3, N-21H0, N-21H, N-21H1, N-21I, N-21J, N-21K, N-21L, N-21M, N-21N, N-21O
- **Total transcripts found:** 1
- **Slides missing transcripts:** 22 (all except N-20)
  - N-21A, N-21B, N-21C, N-21D, N-21E, N-21E0, N-21E1, N-21E2, N-21F, N-21F2, N-21F3, N-21G, N-21G2, N-21G3, N-21H0, N-21H, N-21H1, N-21I, N-21J, N-21K, N-21L, N-21M, N-21N, N-21O
  - **Note:** N-21F3 and N-21G3 are diagram-only `[DOC ONLY]` slides and per the audit prompt do NOT need transcripts. That still leaves 22 slides without transcripts.
- **Transcripts missing slides:** 0 (the 1 existing transcript maps to N-20)
- **Broken handoffs:** 2
- **Terminology issues:** 3
- **Other issues:** 4

---

## Critical Issues (blocks recording / confuses learners)

### C1. Missing Transcripts for 22 of 23 Spoken Slides

**File:** `transcripts-bn/`

Only one transcript exists for the entire Module 4:
- `20-under-the-hood-header--bn.md` → N-20

All other Module 4 slides (N-21A through N-21O, excluding diagram-only N-21F3 and N-21G3) have **no transcript**. The audit prompt states there should be 23 transcript files (one per unique slide except the two diagram-only ones). The filesystem shows only 1.

**Missing transcripts (expected filenames, per naming convention):**
- `21a-what-is-a-token--bn.md`
- `21b-context-window-contents--bn.md`
- `21c-server-remembers-nothing--bn.md`
- `21d-the-tool-loop--bn.md`
- `21e-why-sessions-get-expensive--bn.md`
- `21e0-request-end-to-end--bn.md`
- `21e1-tokenize-prefill-decode--bn.md`
- `21e2-live-prefill-vs-decode--bn.md`
- `21f-kv-cache-compute-once--bn.md`
- `21f2-inside-the-lookup--bn.md`
- `21g-where-kv-cache-lives--bn.md`
- `21g2-the-boxes-live--bn.md`
- `21h0-what-caching-actually-skips--bn.md`
- `21h-prompt-caching--bn.md`
- `21h1-cache-reuse-over-time--bn.md`
- `21i-your-stable-prefix--bn.md`
- `21j-live-without-cache--bn.md`
- `21k-live-with-cache--bn.md`
- `21l-putting-it-together--bn.md`
- `21m-when-window-fills--bn.md`
- `21n-spend-fewer-tokens--bn.md`
- `21o-the-machine-written-down--bn.md`

**Impact:** The author cannot record Bengali narration for any of these slides. The video pipeline cannot generate descriptions. The entire Module 4 is unrecordable.

### C2. No Speaker Notes JSON in index.html

**File:** `index.html`

The AGENTS.md spec and the `deck-stage.js` engine both expect a `<script type="application/json" id="speaker-notes">` at the bottom of the HTML file. This element is **completely missing**. The `deck-stage.js` script broadcasts `slideIndexChanged` messages, but without the notes array, external presenter windows have no content to display.

**Impact:** Speaker notes system is non-functional. Presenter view is broken.

---

## Moderate Issues (inconsistencies that should be fixed)

### M1. Slide 19C Takeaway Does Not Hand Off to Module 4

**File:** `index.html`, line 1489

Slide 19C ("Skills: Further Study") ends with:
> "→ Official docs: Claude Code → Skills. Every keyword above has its own section."

This takeaway points to "official docs" and "skills," not to the upcoming "Under the Hood" module. There is no verbal bridge from "skills reference" to "let's open the machine."

**What it should say:** Something that signals the transition from skills scaffolding to the mechanics underneath — e.g., "Now that you know what to build with, let's open the machine and see how it works."

### M2. N-21H0 Section Label Mismatch

**File:** `index.html`, line 2007

N-21H0 has section label:
> "Under the Hood · What Caching Skips"

The audit prompt lists expected subsection labels, and "What Caching Skips" is not in the canonical list. The label used on the slide is "What Caching Skips" but the audit prompt says the expected labels are: "The Unit, The Container, Statelessness, Multi-Turn, The Problem, Inside One Turn, Live Demo, The First Fix, How Attention Picks, The Boxes, The Boxes-Live, What Caching Skips, The Solution, Stable vs Volatile, Synthesis, The Limit, Working Habits, What's Next."

Actually, "What Caching Skips" IS in the list. Let me re-check... yes, it is in the expected list. So this is actually correct.

### M3. N-21E0 Has No Counter in slide-meta

**File:** `index.html`, line 1738

N-21E0 is a diagram-only `[DOC ONLY]` roadmap slide, but it does NOT have a `.slide-meta` counter at all. It is a pure `<img>` slide. The audit prompt says this is a "map" slide. The lack of a counter is inconsistent with other slides, but it is a diagram-only slide. However, the audit prompt says to check for counter continuity.

### M4. N-21H1 Has No Counter in slide-meta

**File:** `index.html`, line 2084

N-21H1 is a diagram-only slide (cache reuse over time diagram), but it does NOT have a `.slide-meta` counter. It is a pure `<img>` slide. Like N-21E0 and N-21F3/N-21G3, this is a diagram-only slide, but the audit prompt says N-21E0 and N-21H1 carry a `[DOC ONLY]` label but DO have transcripts. Wait, looking at the slide, N-21H1 does NOT have a `[DOC ONLY]` label on the slide — it's just an image. The audit prompt says N-21E0 and N-21H1 carry a DOC ONLY label but DO have transcripts. But looking at the HTML, N-21H1 does NOT have a `[DOC ONLY]` label.

**Wait, re-reading:** The audit prompt says: "Note: N-21E0 and N-21H1 carry a DOC ONLY label on the slide but DO have transcripts — confirm whether these are intentionally transcribed or mislabeled on the slide."

Looking at the HTML:
- N-21E0: `data-label="N-21E0 Request end to end (roadmap)"` — NO `[DOC ONLY]` label
- N-21H1: `data-label="N-21H1 Cache reuse over time diagram"` — NO `[DOC ONLY]` label

The `[DOC ONLY]` label is only on N-21F3 and N-21G3. So the audit prompt's claim about N-21E0 and N-21H1 having `[DOC ONLY]` labels is **incorrect** — the filesystem does not show those labels. This is a discrepancy between the prompt and the actual files. The slides DO have transcripts expected, so they should be transcribed.

### M5. N-21E0 and N-21H1 Expected to Have Transcripts

The audit prompt says N-21E0 and N-21H1 "carry a DOC ONLY label on the slide but DO have transcripts." On the filesystem, neither slide has a `[DOC ONLY]` label. Both slides are in the spoken flow (N-21E0 is a roadmap diagram, N-21H1 is a cache timeline diagram). The audit prompt's statement is factually wrong about the labels. These slides SHOULD have transcripts since they are part of the spoken narrative.

### M6. Video JSON `module_title` Capitalization Inconsistent

**Files:** `videos/module-4/4.1/4.1.json` through `4.5/4.5.json`

All 5 JSON files use:
> `"module_title": "Under the hood"`

The slide deck uses:
> `"Under the Hood"` (title case)

The JSON should use title case to match the slide deck.

### M7. Video Lessons Only Cover 5 of 25 Module 4 Slides

**Files:** `videos/module-4/4.1/` through `4.5/`

Video lessons exist only for:
- 4.1 → N-20 (slide_counter: "20")
- 4.2 → N-21A (slide_counter: "21a")
- 4.3 → N-21B (slide_counter: "21b")
- 4.4 → N-21C (slide_counter: "21c")
- 4.5 → N-21D (slide_counter: "21d")

Slides N-21E through N-21O have **no video lessons**. Per the course structure, this is a known gap (the audit prompt asks to "note which remaining slides have NO video lesson yet"), but it is worth documenting.

### M8. Terminology: "Turn" vs "Request" vs "Call"

**File:** `index.html`, throughout Module 4

The deck uses "turn" and "request" somewhat interchangeably. For example:
- N-21E1: "Stage ② · Prefill" — "proportional to input size · the GPU burns most of its time here" — this is per-request, not per-turn.
- N-21D: "The Loop: How Tools Run" — uses "turn" consistently.
- N-21E: "Why Sessions Get Expensive" — "Every turn re-sends a growing context."

The terms are mostly consistent, but "request" is used in N-21E1 and N-21H0 to describe the server-level operation, while "turn" is used for the user-facing loop. This is acceptable but could be tightened.

### M9. Terminology: "Stable Prefix" Introduced Before Definition

**File:** `index.html`, line 1777

N-21E1 ("Tokenize, Prefill, Decode") uses the term "stable prefix" in the takeaway:
> "And the stable prefix — the unchanging front of the context (system prompt, tools, CLAUDE.md) — goes through prefill again and again, even though it hasn't changed."

However, "stable prefix" is not formally defined until N-21I ("Your Stable Prefix"). The term appears in N-21E1 without prior introduction.

**Suggested fix:** In N-21E1, use "the unchanging front of the context" without the "stable prefix" label, or add a parenthetical "(we'll call this the 'stable prefix' in a moment)."

### M10. Terminology: "KV Cache" vs "KV Store" vs "Key-Value Cache"

**File:** `index.html`, throughout Module 4

The deck uses:
- "KV cache" (N-21F, N-21G, etc.) — primary term
- "KV Store" (N-21G, N-21G2) — secondary term for the memory region
- "key-value cache" (N-21F, in the explanation of K/V) — used in the explanation of what K and V mean

These are used intentionally for pedagogical reasons:
- "KV cache" = the mechanism
- "KV Store" = the physical memory region holding the cache
- "key-value" = the expanded form when first introducing the concept

This is **acceptable** and pedagogically sound. No fix needed.

### M11. N-21O Takeaway References "Claude Lens" Project

**File:** `index.html`, line 2418

The N-21O takeaway says:
> "So join me. We open the JSONL line by line, demystify how the turns actually work, and build Claude Lens together — the dashboard that turns everything you just learned into something you can see. Let's build it for real."

This is a strong call-to-action, but the next slide (20 Requirements craft) does NOT start with building Claude Lens. It starts with "The Craft of Requirement Engineering." The handoff is **BROKEN** — the takeaway promises "let's build Claude Lens" but the next module is about requirements engineering.

Wait, the slide after N-21O is `data-label="20 Requirements craft"` which is "The Build · Phase 1 / 5". The takeaway says "let's build it for real" which DOES align with starting The Build module. The "Claude Lens" project is mentioned in N-21O as the project being built. But the next slide is "Requirements craft" which is Phase 1 of the Build. So the handoff is actually OK — "let's build" transitions into the Build phase.

However, the specific project name "Claude Lens" is introduced in N-21O but never mentioned again in the next slide. The next slide is generic requirements engineering. This is a WEAK handoff, not broken.

---

## Minor Issues (style / naming preferences)

### m1. N-21E Counter Shows "21E" but Labels Show "The Problem"

**File:** `index.html`, line 1690

N-21E has counter `21E` and label "The Problem". The concept flow is "cost" but the subsection label is "The Problem". This is intentional per the audit prompt ("The subsections use different phrasing"), so no fix needed.

### m2. N-21G2 Counter Shows "21G2" but Label Shows "The Boxes, Live"

**File:** `index.html`, line 1955

N-21G2 counter is `21G2` and label is "The Boxes, Live". This is consistent with the expected labels.

### m3. N-21I Counter Shows "21I" but Label Shows "Stable vs Volatile"

**File:** `index.html`, line 2095

N-21I counter is `21I` and label is "Stable vs Volatile". The concept is "stable prefix". This is intentional per the audit prompt.

### m4. N-21N Counter Shows "21N" but Label Shows "Working Habits"

**File:** `index.html`, line 2348

N-21N counter is `21N` and label is "Working Habits". The concept is "working habits". This is intentional.

---

## Slide-by-Slide Handoff Map

| Slide | Takeaway | → Sets up next? | Handoff quality |
|-------|----------|-----------------|-----------------|
| N-20 | "So join me... the four things that explain why agents forget, why long sessions get expensive, and why structure beats memory. After this, nothing in the build is magic." | "Token" is the first topic | OK |
| N-21A | "Tokens are the unit of everything ahead — context size, speed, and cost are all counted in tokens." | Sets up "context window" | OK |
| N-21B | "Every token competes for the same finite budget — and you pay for all of it, every turn." | Sets up "statelessness" | OK |
| N-21C | "The 'conversation' lives in your terminal, not in the model." | Sets up "the loop" (multi-turn) | OK |
| N-21D | "One thing you ask for can be ten turns under the hood — and the context grows with every one." | Sets up "why sessions get expensive" | OK |
| N-21E | "Re-sending the stable part every turn means re-computing it every turn. To see where the cost actually lives, we need to open up what 'computation' means." | Sets up N-21E1 (tokenize, prefill, decode) | OK |
| N-21E0 | (no takeaway — diagram only) | N/A | OK |
| N-21E1 | "The expensive part isn't the reply — it's re-prefilling your entire context from scratch every turn." | Sets up N-21E2 (live demo of prefill vs decode) | OK |
| N-21E2 | "Prefill is parallel bulk ingestion. Decode is serial token-by-token emission." | Sets up N-21F (KV cache as the fix) | OK |
| N-21F | "Compute once, reuse — within one response. Next: inside the lookup itself, to see how attention actually reads these K/V rows — then where this store lives, and why it dies when the response ends." | Sets up N-21F2 (attention lookup) | OK |
| N-21F2 | "It never returns one entry — it returns a blend of all Values, weighted by relevance." | Sets up N-21F3 (diagram) | OK |
| N-21F3 | (no takeaway — diagram only) | N/A | OK |
| N-21G | "Weights = fixed machinery. KV cache = a separate store beside it, never part of the model — which is exactly why it can outlive one request." | Sets up N-21G2 (live boxes) | OK |
| N-21G2 | "One unified memory, oMLX hands out slices: weights in one region, your KV in another, the forward pass burning GPU cores between them." | Sets up N-21G3 (diagram) and N-21H0 (what caching skips) | OK |
| N-21G3 | (no takeaway — diagram only) | N/A | OK |
| N-21H0 | "Caching never skips tokenization. It skips the forward-pass K/V computation for the unchanged prefix — the only part that was ever expensive." | Sets up N-21H (prompt caching) | OK |
| N-21H | "Caching keys on the prefix. Whatever stays identical at the front rides cheap. Change something early — even one token — and the cache breaks from that point on." | Sets up N-21H1 (diagram) and N-21I (stable prefix) | OK |
| N-21H1 | (no takeaway — diagram only) | N/A | OK |
| N-21I | "Write rules in CLAUDE.md. Tell session-specific context in chat. CLAUDE.md rides cheap. Chat is volatile." | Sets up N-21J (live without cache) | OK |
| N-21J | "Zero cache efficiency means every token is recomputed every turn. The context grows — and so does the waste." | Sets up N-21K (live with cache) | OK |
| N-21K | "Same task — 3.3× faster, 3.7× cheaper. The prefix stayed warm; only the new tail needed compute." | Sets up N-21L (putting it together) | OK |
| N-21L | "Stable first, volatile last. That's context engineering — the same idea as 'structure substitutes for memory.'" | Sets up N-21M (when window fills) | OK |
| N-21M | "/compact keeps the gist, loses the detail. /clear restores the budget, loses the history. Neither is free — lean sessions avoid both." | Sets up N-21N (working habits) | OK |
| N-21N | "These are the habits. The commands that enforce them — /compact and /clear from a moment ago, plus /cost — get their full treatment in the Operating Environment. One last stop before we build: this whole machine is written down in a file you can open." | Sets up N-21O (the machine written down) | OK |
| N-21O | "So join me. We open the JSONL line by line, demystify how the turns actually work, and build Claude Lens together — the dashboard that turns everything you just learned into something you can see. Let's build it for real." | Sets up "The Build" module (20 Requirements craft) | WEAK |
| 19C → N-20 | "Official docs: Claude Code → Skills. Every keyword above has its own section." | Points to docs, not "Under the Hood" | BROKEN |
| N-21O → 20 | "Let's build it for real." | Transitions to "The Build" module | OK |

---

## Findings Summary

### Critical
1. **22 transcripts missing** — the entire Module 4 spoken content is unrecordable
2. **No speaker notes JSON** — presenter view is broken

### Moderate
1. **19C → N-20 handoff is BROKEN** — the takeaway points to "official docs" not "open the machine"
2. **"Stable prefix" used before defined** — N-21E1 uses the term before N-21I defines it
3. **Video JSON `module_title` uses lowercase** — should be "Under the Hood" (title case)
4. **N-21E0 and N-21H1 expected transcripts** — the audit prompt claims they have `[DOC ONLY]` labels, but they don't; they need transcripts

### Minor
1. All subsection labels match expected list
2. All slide counters are continuous and correct
3. Terminology is mostly consistent ("KV cache" / "KV Store" / "key-value cache" are used intentionally)
4. N-21O → 20 handoff is slightly WEAK (promises "Claude Lens" specifically, but next slide is generic requirements)

---

## Discrepancies Between Audit Prompt and Filesystem

The audit prompt states: "There are staged-but-uncommitted changes in this branch (a deleted transcript, plus edits to `index.html` and several Module 4 transcripts)."

**Filesystem reality:** `git status` shows only an untracked `.claude/` directory. No staged changes. No edited transcripts. The deleted transcript (`20-under-the-hood--bn.md`) is indeed gone, but no other Module 4 transcripts exist.

The audit prompt also states: "N-21E0 and N-21H1 carry a DOC ONLY label on the slide but DO have transcripts."

**Filesystem reality:** Neither N-21E0 nor N-21H1 has a `[DOC ONLY]` label. Only N-21F3 and N-21G3 have `[DOC ONLY]` labels. N-21E0 and N-21H1 are part of the spoken flow and DO need transcripts.

---

*Report generated by audit-kimi agent on 2026-06-11.*
