# Slide 16a-1 — Built-in Skills: Natural Language Invocation

## On-Screen Content
- **Header**: Skills Intro · Built-in Demo · 16a-1 / 82
- **Title**: Built-in Skills: Natural Language Invocation
- **Lede**: You don't have to type `/init` to trigger the init skill — ask in plain language and Claude's LLM matching does the rest.
- **Demo Panel 1 — Skill Discovery**:
  - Typed `/` in Claude Code prompt → full skill list appears
  - Visible built-ins: `/chrome-devtools-cli` · `/claude-api` · `/claude-automation-recommender` · `/code-review` · `/create-worktrees` · `/debug` · `/debug-optimize-lcp` · `/fewer-permission-prompts` · `/init` · `/insights` · `/loop` …
- **Demo Panel 2 — Natural Language Invocation**:
  - User typed: `"can you initialize the claude in this repository?"`
  - Claude matched intent → auto-invoked `Skill(init)` — no slash command used
  - Output: `● Skill(init)` → `└ Successfully loaded skill` → `● Let me explore the codebase first.` → Bash + Read tool calls begin
- **Key insight**: The `description` field of the init SKILL.md says "Initialize a new CLAUDE.md file with codebase documentation" — Claude's LLM found that match from the plain-English request.
- **Takeaway**: → Skills are triggered by intent, not syntax. `/init` and `"can you initialize claude?"` reach the same skill.

## Speaker Transcript (Bengali)

[placeholder — transcript to be filled from recording]

একটু আগে দেখলাম skill-এর তিনটা source — built-in, official plugin, আর নিজের তৈরি। এখন একটা live demo করি যেটা দুইটা জিনিস একসাথে দেখাবে — built-in skill কীভাবে discover করবেন, আর skill invoke করার দুইটা পথ।

প্রথম পথ — slash command। আমি terminal-এ শুধু `/` টাইপ করলাম। দেখুন — একটা পুরো তালিকা এসে গেল। `/chrome-devtools-cli`, `/claude-api`, `/code-review`, `/init`, `/loop` — এগুলো সব built-in বা plugin থেকে আসা skill। আপনি Claude Code install করলেই এগুলো পাবেন, আলাদা কিছু করতে হবে না। এই list-টাই আপনার toolkit। কোনো skill আছে কিনা সন্দেহ হলে প্রথমে `/` দিন।

এখন দ্বিতীয় পথ — natural language। আমি slash command ব্যবহার না করে সরাসরি লিখলাম: `"can you initialize the claude in this repository?"` কোনো `/init` টাইপ করিনি। শুধু plain English-এ যা করতে চাই সেটা বললাম।

দেখুন Claude কী করল। `Skill(init)` — `Successfully loaded skill`। নিজেই init skill invoke করে ফেলল। আমাকে slash command মনে রাখতে হয়নি।

এটা কীভাবে হলো? init skill-এর SKILL.md-তে description আছে: `"Initialize a new CLAUDE.md file with codebase documentation"` — Claude আমার request-এর intent-এর সাথে এই description মিলিয়ে দেখল, আর match পেল। এটাই LLM-based matching। keyword না, semantic intent।

এরপর Claude নিজেই কাজ শুরু করে দিল — codebase explore করতে Bash দিয়ে JSON আর TS/JS file খুঁজল, README আর package.json পড়ল। পুরো `/init` skill-এর process চলছে — আমি শুধু একটা সাধারণ প্রশ্ন করেছিলাম।

এটাই skill-এর আসল power। আপনাকে exact command syntax মুখস্থ করতে হবে না। intent বললেই হবে। Claude description পড়ে বুঝবে কোন skill এখানে প্রযোজ্য, আর execute করবে।

পরের slide-এ আমরা built-in agent গুলো দেখব — Explore আর Plan — যেগুলো skill-এর মতোই কিন্তু read-only আর একটু আলাদা কাজের জন্য।
