# Slide 17 — Demo: Recommendation → Skill → Output

## On-Screen Content
- **Header**: Skills Intro · Hands-on · 17 / 82
- **Title**: Demo: Recommendation → Skill → Output
- **Lede**: The recommender suggested a `release-notes` skill for *claude-lens*. We built it on the spot and ran it — here's what happened.
- **Left — Recommender Output**:
  - `release-notes` (custom, user-only)
  - Why: Project is at v1.1.0, distributed via `npx github:foyzulkarim/claude-lens`. Drafts changelog from `git log` since last tag.
  - Starter template: rough frontmatter + 3-line body stub
  - Note: Starter template — rough shape, needs real steps.
- **Right — What We Actually Built**:
  - `.claude/skills/release-notes/SKILL.md`
  - Full 7-step process: find last tag → collect commits → group by type → suggest semver → draft entry → prepend to CHANGELOG.md → report
  - Invoked with `/release-notes` → real CHANGELOG entry written.
- **Takeaway**: → The recommender gives you the shape. You add the steps. `/release-notes` ran and prepended a real entry to `CHANGELOG.md` — zero manual drafting.

## Speaker Transcript (Bengali)

[placeholder — transcript to be filled from recording]

এতক্ষণ দেখলাম automation recommender কী করে। এখন একটু হাতে-কলমে দেখি — এই skill-এর output নিয়ে আমি আসলে কী করলাম।

আমি recommender চালালাম আমার `claude-lens` project-এ। claude-lens হলো একটা CLI dashboard যেটা `~/.claude` usage data পড়ে visualize করে। Recommender codebase analyze করে বলল — তোমার project-এর জন্য সবচেয়ে দরকারি custom skill হবে `release-notes`।

কেন? কারণ project-টা v1.1.0-এ আছে, distribute হয় `npx github:foyzulkarim/claude-lens` দিয়ে। প্রতিটা release-এর আগে manually `git log` দেখে changelog লিখতে হয়। এটা boring, এটা time-consuming, এটা automatable।

Recommender একটা starter template দিল — শুধু frontmatter আর তিন লাইনের body। এটা rough shape, পুরো skill না।

তো আমি সেখান থেকে শুরু করলাম। আর সেই starting point নিয়ে একটা real 7-step process বানালাম।

দেখুন ডানদিকে। Step 1 — শেষ released tag খুঁজো: `git describe --tags --abbrev=0`। Step 2 — সেই tag থেকে HEAD পর্যন্ত commits collect করো। Step 3 — commits গুলো group করো: Features, Fixes, Maintenance। Step 4 — next semver version suggest করো, কারণ সহ। Step 5 — CHANGELOG entry draft করো proper format-এ। Step 6 — সেই entry `CHANGELOG.md`-তে prepend করো — Read আর Write tool দিয়ে, `sed` বা `awk` ছাড়া। Step 7 — user-কে report করো, entry inline দেখাও।

`disable-model-invocation: true` দিয়েছি। মানে এটা শুধু আমি explicitly `/release-notes` লিখলে চলবে — Claude নিজে থেকে চালাবে না। কারণ এই skill CHANGELOG.md লেখে। Side effect আছে, তাই user-এর conscious decision দরকার।

আমি skill লিখলাম, তারপর `/release-notes` invoke করলাম। Claude last tag খুঁজল, commit range collect করল, group করল, semver suggest করল, entry draft করল, আর CHANGELOG.md-তে prepend করল — সব automatically।

এটাই পুরো flow। Recommender rough shape দিল — আমি detail যোগ করলাম — skill চলল — real output বের হলো।

পরের slide-এ আরো গভীরে যাবো — skill-এ বাইরের script কীভাবে ব্যবহার করবেন, token বাঁচাবেন।
