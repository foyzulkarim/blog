# Bengali Transcript Style Guide — Agentic SWE Course

> Use this instruction set when creating or refining any Bengali transcript (`transcripts/`). These transcripts are the primary source — there is no English original. Think in Bengali first, then drop in technical terms where needed.
> When in doubt, re-read **`../courses/agentic-engineering-foundations/transcripts/13-reflection.md`** as the north star.

---

## The Golden Rule

Before writing or rewriting any sentence, ask yourself:

> *"আমি যদি একটা বাঙালি দোস্তকে এটা বুঝাই, তাহলে কীভাবে বলব?"*

Express the *idea*, not a translated sentence structure. Look at the slide content for the concept, then speak it naturally in Bengali.

---

## 1. Tone, Voice & Inclusivity

**Always write as a senior engineering peer or collaborative instructor speaking respectfully to adult learners.**

### 1.1 The Inclusivity Shift (আমাদের, আমরা)

Never sound like a rigid taskmaster barking direct orders or standard documentation. Frame the architecture, setup, and code decisions as a **joint journey**.

* **Use inclusive first-person plural pronouns (আমরা, আমাদের, আমাদের উচিত)** when proposing actions, structuring files, or making design choices.
* **Avoid direct imperatives** like "করুন", "ফেলুন", or "যান" when mapping out architectural steps. Instead, use structures like `...করা উচিত`, `...করতে পারি`, or `...করে ফেলা যাক`.

| ❌ Rigid Command (What NOT to do) | ✅ Collaborative & Inclusive (EXACTLY what to do) |
| --- | --- |
| তাই ভাগ করে ফেলুন। `req.md` requirements-এর জন্য। | **আমাদের উচিত** একে ভাগ করে ফেলা। যেমন requirements এর জন্য **আমরা বানাতে পারি** `req.md` |
| প্রথমে repository-টি clone করুন। | প্রথমে **আমাদের উচিত** repository-টি clone করে ফেলা। |
| এই কোডটি refactor করুন। | এই কোডটি এবার **আমরা একটু refactor করতে পারি**। |

### 1.2 Multi-Perspective Alignment

Balance this collective workflow with respectful direct addresses when focusing on the learner's independent actions.

* **Use inclusive "we" (আমরা, আমাদের)** when recapping, discovering, or planning architectural decisions together:
* ✅ "এই পর্যন্ত আমরা দেখলাম..."
* ✅ "আমরা Claude-কে পুরো file path hallucinate করতে দেখেছি"


* **Use respectful direct address "you" (আপনি, আপনার, আপনাকে)** for instructions, invitations, and individual realizations:
* ✅ "আপনি fine-tune করতে পারেন"
* ✅ "আপনি যখন skill invoke করেন"
* ❌ "তুমি করতে পারোস" (too informal)


* **Use gentle imperatives** only when guiding high-level thought patterns — never for mechanical steps:
* ✅ "চিন্তা করুন", "তুলনা করুন", "ধরে নিন"
* ❌ "শুরু করুন" (abrupt), "ভাগ করো" (too blunt)



---

## 2. Language Mechanics

### 2.1 Kill Benglish Verb Conjugation

English words must **not** take Bengali verb auxiliaries. If an English word feels like it needs "করা / হওয়া" attached to it, replace the whole expression with a natural Bengali one.

| ❌ Garbage | ✅ Natural |
| --- | --- |
| realize করলেন | বুঝতে পারলেন, দেখলেন, উপলব্ধি করলেন |
| session শুরু করলেন | সেশন খুললেন, কাজ শুরু করলেন |
| invoke করতে পারেন | trigger হতে পারে, চালু হতে পারে, কল করতে পারেন |
| explain করতে হয় | বলে দিতে হয়, বোঝাতে হয় |
| load করে | লোড নেয়, তুলে নেয় |
| execute করে | চালায়, রান করে |
| update করলে | আপডেট করলে (noun usage is fine), পরিবর্তন করলে |

> **Exception:** Pure technical verbs that Bengali developers actually say out loud — *"ডিপ্লয় করা", "কমিট করা", "ডিবাগ করা"* — are acceptable because they are established loanwords, not forced translations.

### 2.2 Bengali Syntax, Not English Skeleton

Never preserve English word order or negation patterns by swapping in Bengali words.

| ❌ English structure + Bengali words | ✅ Bengali syntax |
| --- | --- |
| Claude-র কোনো idea না | Claude জানে না / Claude-র কোনো ধারণাই নেই |
| problem টা এই | মূল সমস্যা হলো এই |
| skill দিয়ে solve করা যায় | skill দিয়ে समाधान করা যায় |
| every session zero থেকে শুরু হয় | প্রতিটা সেশন শূন্য থেকে শুরু হয় |
| no drift happens | কোনো বিচ্যুতি হয় না |

### 2.3 Technical Terms: English Noun, Bengali Grammar

English technical terms are acceptable and expected (`Claude`, `TypeScript`, `React`, `skill`, `context window`, `invoke`, `API`, `TDD`, `refactor`). But they must sit inside **Bengali grammar**, not English grammar.

* ✅ **Correct:** `Skill .claude/skills/-এ থাকে।`
* ✅ **Correct:** `Context window অপ্রয়োজনীয় ভারী হয় না।`
* ❌ **Wrong:** `Skill is located in .claude/skills/.` (English grammar)
* ❌ **Wrong:** `Context window bloated হয় না।` ("bloated" used unnaturally as a verb)

---

## 3. Sentence Structure — Flowing Breath Units

**NEVER write choppy fragments.** Natural spoken Bengali moves in connected breath units. Each paragraph should flow like a spoken sentence in a continuous lecture.

* **Use natural connectors:** *যেমন, ধরুন, তারপরে, এবার, সেই জন্য, তাই, তাহলে, কিন্তু, আর, তো, অথবা, এজন্য, ঠিক*
* **Parenthetical asides:** *"— ধরুন শুধু `*.test.ts` ফাইলে কাজ করার সময় —"*

### ❌ Choppy (reads like bullet points)

> চারটা গ্রুপে ভাগ করেছি। প্রথম গ্রুপ — আরো কিছু frontmatter field। `when_to_use` দিয়ে extra trigger phrase যোগ করা যায়। `paths` দিয়ে বলা যায় skill শুধু নির্দিষ্ট file pattern-এ কাজ করার সময় activate হবে।

### ✅ Flowing & Collaborative (reads like a peer talking)

> প্রথমেই বলি — skill কিন্তু শুধু একটা markdown file না। Frontmatter-এ আরো অনেক field আছে যা আমরা fine-tune করতে পারি। যেমন `when_to_use` — এটি আমরা ব্যবহার করতে পারি `description`-এর পাশাপাশি কিছু extra trigger phrase যোগ করার জন্য, যাতে LLM আরো precisely বুঝতে পারে কখন এই skill টা কাজে লাগবে। আবার `paths` দিয়ে আমরা বলে দিতে পারি যে skill শুধু নির্দিষ্ট file pattern-এ কাজ করার সময়ই activate হবে — ধরুন শুধু `*.test.ts` ফাইলে কাজ করার সময়।

---

## 4. Transitions — Never Announce Mechanical Structure

### ❌ Forbidden openings

* "চারটা গ্রুপে ভাগ করেছি"
* "তিনটা takeaway আছে"
* "প্রথম গ্রুপ —", "দ্বিতীয় গ্রুপ —"
* "Rule 1:", "Rule 2:"

### ✅ Natural narrative transitions

* "প্রথমেই বলি —"
* "তারপরে আসে..."
* "এবার চিন্তা করুন..."
* "আরেকটা জিনিস..."
* "তাহলে সব মিলিয়ে..."

---

## 5. Explain WHY, Not Just WHAT

Every concept must answer: *Why does this matter to the learner?* Add consequence, contrast, or real-world scenarios to every technical point.

* ❌ **Dry WHAT:** `when_to_use দিয়ে extra trigger phrase যোগ করা যায়।`
* ✅ **WHY + WHAT:** `when_to_use — description-এর পাশাপাশি extra trigger phrase যোগ করার জন্য, যাতে LLM আরো precisely বুঝতে পারে কখন এই skill টা কাজে লাগবে।`

---

## 6. Metaphors & Analogies

Use 1–2 relatable metaphors per slide to make abstract concepts concrete. They should feel natural to a Bengali-speaking software engineer.

* **"চুক্তির সবচেয়ে গুরুত্বপূর্ণ শর্ত page seventeen-এ রাখার মতো — কেউ এতদূর পড়ে না"** *(lost-in-the-middle)*
* **"ছবি ঝুলাতে truck size-এর toolbox নিয়ে আসার মতো"** *(mega-skills)*
* **"library card রাখার মতো — বই যেখানে আছে সেখানেই থাকে, আপনার ব্যাগে নয়"** *(@path vs paste)*
* **"আকাঙ্ক্ষা jinni পূরণ করে, specification engineer execute করে"** *(explicit prompts)*

---

## 7. Opening & Closing Patterns

### Opening — Always frame with context

Never jump straight into the first bullet. Set the stage collectively:

> "এই পর্যন্ত আমরা [X] দেখলাম... কিন্তু [Y] — এই দুটো এক জিনিস না। যে [good outcome], আর যে [bad outcome] — পার্থক্যটা [theme]-এ লুকিয়ে আছে যেগুলো আমরা এখন explore করব।"

### Closing — Always connect back to the bigger picture

Never end with a dry recap. End with a philosophical or engineering principle:

> "তাহলে সব মিলিয়ে — framework আমাদের structure দেয়, কিন্তু specificity দেয় precision। Structure ছাড়া prompt directionless, precision ছাড়া prompt powerless। এখানে কোনো magic নেই, কোনো vibe নেই — শুধু engineering।"

---

## 8. Paragraph Rhythm & Formatting

* **Each paragraph = one core idea** that unfolds over 3–6 sentences.
* **Mix short punchy sentences with longer flowing ones** for natural spoken rhythm.
* **One-sentence paragraphs are forbidden** unless they are deliberate dramatic pauses.
* **Use em-dashes (—)** for parenthetical asides and dramatic pauses to mirror spoken cadence.
* **Inline code**, file paths, and CLI commands stay in English/backticks: `@docs/ARCH.md`, `/fast`, `*.test.ts`.
* **Write for the ear, not the eye.** Use spoken transitions and cadence; never narrate the slide interface with phrases such as "on-screen content says."
* **Technical terms stay inside Bengali grammar.** When introducing an unfamiliar term, add a brief Bengali gloss before continuing.

---

## Checklist Before Saving

Read the transcript aloud in your head. If any sentence makes you pause and think *"this sounds stiff, commanding, or translated,"* rewrite it.

* [ ] Opens with context, not jumping straight to a bullet point.
* [ ] Uses **"আমরা" / "আমাদের"** when walking through steps, actions, or building solutions together.
* [ ] Uses **"আপনি"** consistently and respectfully for individual user realizations or options.
* [ ] No "English word + করা/হোয়া" forced conjugations.
* [ ] No English word order with Bengali vocabulary.
* [ ] No mechanical "first group / second group" structural announcements.
* [ ] Every technical point includes **WHY** it matters to the engineer.
* [ ] Contains at least one relatable developer metaphor or analogy.
* [ ] Closes with a solid architectural principle, not a dry summary.
* [ ] Sounds like an elite engineering peer speaking casually but respectfully.
