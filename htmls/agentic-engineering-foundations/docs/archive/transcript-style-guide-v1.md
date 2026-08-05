# Bengali Transcript Style Guide — Agentic SWE Course

> Use this instruction set when creating or refining any Bengali transcript (`transcripts/`). These transcripts are the primary source — there is no English original. Think in Bengali first, then drop in technical terms where needed.
>
> When in doubt, re-read **`transcripts/13-reflection.md`** as the north star.

---

## The Golden Rule

Before writing or rewriting any sentence, ask yourself:

> *"আমি যদি একটা বাঙালি দোস্তকে এটা বুঝাই, তাহলে কীভাবে বলব?"*

Express the *idea*, not a translated sentence structure. Look at the slide content for the concept, then speak it naturally in Bengali.

---

## 1. Tone & Voice

**Always write as a lecturer speaking respectfully to adult learners.**

- **Use inclusive "we" (আমরা, আমাদের)** when recapping, discovering, or journeying together:
  - ✅ "এই পর্যন্ত আমরা দেখলাম..."
  - ✅ "আমরা Claude-কে পুরো file path hallucinate করতে দেখেছি"
  - ❌ "আমি দেখেছি" (too personal, breaks inclusive bond)

- **Use respectful direct address "you" (আপনি, আপনার, আপনাকে)** for instructions, invitations, and direct engagement:
  - ✅ "আপনি fine-tune করতে পারেন"
  - ✅ "আপনি যখন skill invoke করেন"
  - ❌ "তুমি করতে পারোস" (too informal)
  - ❌ Omitting "you" entirely (creates distance, sounds like documentation)

- **Use gentle imperatives** when guiding — never bark commands:
  - ✅ "চিন্তা করুন", "তুলনা করুন", "দাঁড়ান"
  - ❌ "শুরু করুন" (abrupt), "ভাগ করো" (too blunt)

---

## 2. Language Mechanics

### 2.1 Kill Benglish Verb Conjugation

English words must **not** take Bengali verb auxiliaries. If an English word feels like it needs "করা / হওয়া" attached to it, replace the whole expression with a natural Bengali one.

| ❌ Garbage | ✅ Natural |
|---|---|
| realize করলেন | বুঝতে পারলেন, দেখলেন, উপলব্ধি করলেন |
| session শুরু করলেন | সেশন খুললেন, কাজ শুরু করলেন |
| invoke করতে পারেন | trigger হতে পারে, চালু হতে পারে, কল করতে পারেন |
| explain করতে হয় | বলে দিতে হয়, বোঝাতে হয় |
| load করে | লোড নেয়, তুলে নেয় |
| execute করে | চালায়, রান করে |
| update করলে | আপডেট করলে (noun usage is fine), পরিবর্তন করলে |

**Exception:** Pure technical verbs that Bengali developers actually say out loud — "ডিপ্লয় করা", "কমিট করা", "ডিবাগ করা" — are acceptable because they are established loanwords, not forced translations.

### 2.2 Bengali Syntax, Not English Skeleton

Never preserve English word order or negation patterns by swapping in Bengali words.

| ❌ English structure + Bengali words | ✅ Bengali syntax |
|---|---|
| Claude-র কোনো idea না | Claude জানে না / Claude-র কোনো ধারণাই নেই |
| problem টা এই | মূল সমস্যা হলো এই |
| skill দিয়ে solve করা যায় | skill দিয়ে সমাধান করা যায় |
| every session zero থেকে শুরু হয় | প্রতিটা সেশন শূন্য থেকে শুরু হয় |
| no drift happens | কোনো বিচ্যুতি হয় না |

### 2.3 Technical Terms: English Noun, Bengali Grammar

English technical terms are acceptable and expected (Claude, TypeScript, React, skill, context window, invoke, API, TDD, refactor). But they must sit inside **Bengali grammar**, not English grammar.

**✅ Correct:**
> Skill `.claude/skills/`-এ থাকে।  
> Context window অপ্রয়োজনীয় ভারী হয় না।  
> Skill trigger হতে পারে দুইভাবে।

**❌ Wrong:**
> Skill is located in `.claude/skills/`. (English grammar)  
> Context window bloated হয় না। ("bloated" as verb)  
> Skill দুইভাবে trigger হতে পারে। (fine as noun, but "trigger" as pure English verb is okay here as established loanword)

---

## 3. Sentence Structure — Flowing Breath Units

**NEVER write choppy fragments.** Natural spoken Bengali moves in connected breath units. Each paragraph should flow like a spoken sentence in a continuous lecture.

### ❌ Choppy (reads like bullet points)
> চারটা গ্রুপে ভাগ করেছি।  
> প্রথম গ্রুপ — আরো কিছু frontmatter field। `when_to_use` দিয়ে extra trigger phrase যোগ করা যায়। `paths` দিয়ে বলা যায় skill শুধু নির্দিষ্ট file pattern-এ কাজ করার সময় activate হবে।

### ✅ Flowing (reads like a presenter talking)
> প্রথমেই বলি — skill কিন্তু শুধু একটা markdown file না। Frontmatter-এ আরো অনেক field আছে যা আপনি fine-tune করতে পারেন। যেমন `when_to_use` — `description`-এর পাশাপাশি extra trigger phrase যোগ করার জন্য, যাতে LLM আরো precisely বুঝতে পারে কখন এই skill টা কাজে লাগবে। `paths` দিয়ে আপনি বলতে পারেন যে skill শুধু নির্দিষ্ট file pattern-এ কাজ করার সময়ই activate হবে — ধরুন শুধু `*.test.ts` ফাইলে কাজ করার সময়।

**Techniques for flow:**
- Use natural connectors: **যেমন, ধরুন, তারপরে, এবার, সেই জন্য, তাই, তাহলে, কিন্তু, আর, তো, অথবা, এজন্য, ঠিক**
- Parenthetical asides: **"— ধরুন শুধু `*.test.ts` ফাইলে কাজ করার সময় —"**
- Appositives and clauses that build on each other rather than starting new sentences

---

## 4. Transitions — Never Announce Mechanical Structure

### ❌ Forbidden openings
- "চারটা গ্রুপে ভাগ করেছি"
- "তিনটা takeaway আছে"
- "প্রথম গ্রুপ —", "দ্বিতীয় গ্রুপ —", "তৃতীয় গ্রুপ —"
- "Rule 1:", "Rule 2:"

### ✅ Natural narrative transitions
- "প্রথমেই বলি —"
- "তারপরে আসে..."
- "এবার চিন্তা করুন..."
- "আরেকটা জিনিস..."
- "শেষে..."
- "তাহলে সব মিলিয়ে..."

**The principle:** Don't tell the listener you're about to list four things. Just start with the first one, and let the flow carry them through.

---

## 5. Explain WHY, Not Just WHAT

Every concept must answer: *Why does this matter to the learner?*

### ❌ Dry WHAT
> `when_to_use` দিয়ে extra trigger phrase যোগ করা যায়। `paths` দিয়ে বলা যায় skill শুধু নির্দিষ্ট file pattern-এ কাজ করার সময় activate হবে।

### ✅ WHY + WHAT
> `when_to_use` — `description`-এর পাশাপাশি extra trigger phrase যোগ করার জন্য, **যাতে LLM আরো precisely বুঝতে পারে কখন এই skill টা কাজে লাগবে।** `paths` দিয়ে আপনি বলতে পারেন যে skill শুধু নির্দিষ্ট file pattern-এ কাজ করার সময়ই activate হবে — **ধরুন শুধু `*.test.ts` ফাইলে কাজ করার সময়।**

**Add consequence, contrast, or real-world scenario to every technical point.**

---

## 6. Metaphors & Analogies

Use 1–2 relatable metaphors per slide to make abstract concepts concrete. They should feel natural to a Bengali-speaking software engineer.

### ✅ Good examples from the course
- **"চুক্তির সবচেয়ে গুরুত্বপূর্ণ শর্ত page seventeen-এ রাখার মতো — কেউ এতদূর পড়ে না"** (lost-in-the-middle)
- **"ছবি ঝুলাতে truck size-এর toolbox নিয়ে আসার মতো"** (mega-skills)
- **"library card রাখার মতো — বই যেখানে আছে সেখানেই থাকে, আপনার ব্যাগে নয়"** (@path vs paste)
- **"আকাঙ্ক্ষা jinni পূরণ করে, specification engineer execute করে"** (explicit prompts)
- **"সবখানে first gear-এ গাড়ি চালানোর মতো"** (not matching thinking to complexity)

---

## 7. Opening & Closing Patterns

### Opening — Always frame with context
Never jump straight into the first bullet. Set the stage:

> "এই পর্যন্ত আমরা [X] দেখলাম... কিন্তু [Y] — এই দুটো এক জিনিস না। যে [good outcome], আর যে [bad outcome] — পার্থক্যটা [theme]-এ লুকিয়ে আছে যেগুলো আমরা এখন explore করব।"

> "skill Claude-কে process দেয় — কিন্তু skill যতই ভালো হোক, process ততটাই ভালো যতটা prompt যা সেই process টা trigger করে। আর Claude Code-এর সাথে শত ঘণ্টার পর যা আমরা শিখেছি — সেটা হলো..."

### Closing — Always connect back to the bigger picture
Never end with a dry recap. End with principle:

> "এগুলো nice-to-have না। এগুলো পার্থক্য করে [A] আর [B]। [Outcome metric 1] আর [Outcome metric 2] — এই দুটোর মাঝে পার্থক্যটা আসলে আপনার design decision-এর। [Quality] accident না — decision।"

> "তাহলে সব মিলিয়ে — framework আপনাকে structure দেয়, কিন্তু specificity দেয় precision। Structure ছাড়া prompt directionless, precision ছাড়া prompt powerless। [Formula]। এখানে কোনো magic নেই, কোনো vibe নেই — শুধু engineering।"

---

## 8. Write for the Ear, Not the Eye

This is a **speaker transcript**. It will be read aloud. Optimize for:

- **Cadence:** Vary sentence length. Short punchy sentences are fine for emphasis, but surround them with longer flowing ones.
- **Repetition for rhythm:** "ভুলে না। improvises না করে।" → "ভোলে না, improvises না করে" is fine because it creates spoken emphasis. But don't overdo it.
- **Rhetorical flow:** Use spoken transitions — "একটা ঘটনা আমাদের সবারই পরিচিত", "এটাই মূল সমস্যা", "শেষে একটা কথা" — not "On-screen content says" or "Next point".

---

## 9. Paragraph Rhythm

- **Each paragraph = one idea** that unfolds over 3–6 sentences
- **Mix short punchy sentences with longer flowing ones** for rhythm
- **One-sentence paragraphs are forbidden** unless they are deliberate dramatic pauses (rare)
- **Use em-dashes (—)** for parenthetical asides and dramatic pauses — they mirror spoken cadence

---

## 10. Code & Technical Terms in Bengali Prose

- **Inline code**, file paths, and CLI commands stay in English/backticks: `@docs/ARCH.md`, `/fast`, `*.test.ts`
- **Translate the surrounding explanation** into flowing Bengali — never leave a sentence half-English
- **When introducing a technical term for the first time**, give a brief Bengali gloss: "`hooks` দিয়ে skill-এর lifecycle-এ shell command বাঁধা যায়"

---

## Checklist Before Saving

Read the transcript aloud (in your head). If any sentence makes you pause and think "this sounds stiff or translated," rewrite it using the golden rule.

- [ ] Opens with context, not jumping straight to the first bullet
- [ ] "আপনি" used consistently and respectfully throughout
- [ ] "আমরা" used for shared experience/discovery
- [ ] No "English word + করা/হওয়া" forced conjugations
- [ ] No English word order with Bengali vocabulary
- [ ] No 2–4 word sentence fragments back-to-back
- [ ] No mechanical "first group / second group" announcements
- [ ] Natural connectors between ideas (যেমন, তাই, কিন্তু, তারপরে)
- [ ] Every technical point includes WHY it matters
- [ ] At least one metaphor or analogy
- [ ] Closes with a principled statement, not a dry recap
- [ ] Technical terms sit inside Bengali grammar
- [ ] Sounds like a lecturer speaking, not documentation being read

---

## Canonical Reference Transcript

When in doubt, re-read **`transcripts/13-reflection.md`** as the north star. It exemplifies every principle above:
- Inclusive "আমরা" / respectful "আপনি"
- No mechanical listing of the three takeaways
- Every point explains WHY
- Metaphors (amplification, framework as structure)
- Philosophical closing that connects to the course arc
- Long, flowing sentences that feel spoken, not written
