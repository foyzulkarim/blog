# Slide 18a — Dynamic Context Injection

## On-Screen Content
- **Header**: Skills Intro · Power · 18a / 82
- **Title**: Dynamic Context Injection
- **Lede**: Prefix a line with `!` — the command runs before Claude reads the skill; its output replaces the line. Right for **metadata that configures the skill**. Wrong for data the skill will process.
- **Left — Mechanism + Rule**:
  - Syntax: `` !`command` `` (single line) or ` ```! ` fenced block (multi-line)
  - Runs once before Claude reads. Only the output enters context — not the command text. No token bloat from the command itself.
  - Rule: ✓ Inject metadata that **configures** how the skill behaves — small, bounded, changes per-project. ✗ Don't inject data the skill will **process** — diffs, file contents, test output. Those come through tool calls when needed.
- **Right — Three Good Examples** (inside a `release-notes` skill):
  - `!node -p "require('./package.json').name + ' v' + require('./package.json').version"` — 1 line, brands the generated output, changes per project
  - `` !date +%Y-%m-%d `` — 1 token, needed for the changelog entry heading, can't be hardcoded
  - `` !cat .claude/release-config.json `` — tiny JSON, configures which sections to include, project-specific settings
- **Takeaway**: → Inject what shapes the skill's behaviour. Let tool calls fetch what the skill will analyse. Same `!` syntax — different intent.

## Speaker Transcript (Bengali)

[placeholder — transcript to be filled from recording]

আগের slide-এ দেখলাম bash script-এ কাজ সরিয়ে দিলে LLM-র tool call কমে, tokens কমে। এই slide-এ একটু ভিন্ন feature — dynamic context injection। দেখতে একই রকম মনে হতে পারে, কিন্তু কাজটা আলাদা।

`!` prefix দিয়ে যেকোনো line-এ একটা shell command রাখতে পারবেন। Claude Code skill load করার আগেই সেই command চালিয়ে output নিয়ে সেই line-এর জায়গায় বসিয়ে দেয়। Claude skill পড়তে বসার আগেই এটা হয়ে যায়। Claude শুধু final result দেখে — command কী ছিল সেটা দেখে না।

গুরুত্বপূর্ণ পার্থক্য: command-এর text context-এ ঢোকে না, শুধু output ঢোকে। তাই আগের slide-এর নিয়মের সাথে কোনো বিরোধ নেই।

কিন্তু এই feature কখন ব্যবহার করবেন? এখানে একটা নিয়ম আছে।

**Inject করুন metadata — যা skill-এর আচরণ configure করে।** Inject করবেন না working data — যা skill process করবে।

পার্থক্যটা কী? Inject করার জিনিসটা হতে হবে: ছোট এবং bounded, প্রতিটা project-এ আলাদা, আর skill কীভাবে কাজ করবে সেটা নির্ধারণ করে — skill যা analyze করবে সেটা না।

আমাদের `release-notes` skill-এর কথা মনে আছে? ওটাই ব্যবহার করি উদাহরণ হিসেবে।

তিনটা injection দেখুন।

প্রথমটা — project name আর version। `node -p` দিয়ে `package.json` থেকে এক লাইনে বের করি। এটা inject করলে skill জানে কোন project-এর জন্য changelog লিখছে। output-এ সঠিক project name বসাতে পারে। প্রতিটা project-এ different — hardcode করার উপায় নেই।

দ্বিতীয়টা — আজকের date। `date +%Y-%m-%d`। এক token। Changelog entry-র heading-এ date লাগে। কিন্তু আজকের date skill-এ লেখা যাবে না — কারণ ওটা বদলে যায়। Inject করলে Claude সবসময় সঠিক date পাবে।

তৃতীয়টা — `release-config.json`। একটা ছোট JSON যেখানে project-specific settings আছে — কোন section include করতে হবে, কোন format follow করতে হবে। এটা behavior configure করে।

তিনটাই ছোট। তিনটাই project-এ বদলায়। তিনটাই বলে skill কীভাবে কাজ করবে।

এবার ভাবুন — git diff inject করলে কী হতো? diff বড় হতে পারে, শত শত line। আর diff হলো working data — skill যা process করবে, যা analyze করবে। সেটা tool call দিয়ে আনা উচিত, যখন দরকার।

একই `!` syntax — কিন্তু intent আলাদা। Metadata inject করুন, working data না।
