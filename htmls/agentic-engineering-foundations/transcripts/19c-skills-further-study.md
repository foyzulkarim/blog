# Slide 19C — Skills: Further Study

## On-Screen Content
- **Header**: Skills Intro · Reference · 19C / 81
- **Title**: Skills: Further Study
- **Lede**: The module covered the essentials. These surfaces are worth exploring on your own — each is a keyword in the official Claude Code docs.
- **More Frontmatter Fields**:
  - `when_to_use` — extra trigger phrases for LLM matching
  - `argument-hint` — autocomplete hint for expected args
  - `hooks` — PreToolUse · PostToolUse hooks while skill is active
  - `model` · `effort` — override model or thinking level per skill
  - `disallowed-tools` — block tools while skill is active
- **Arguments & Substitutions**:
  - `$ARGUMENTS` · `$0` · `$1` — positional args passed at invocation
  - `arguments:` — named args — $issue, $branch, etc.
  - `${CLAUDE_SKILL_DIR}` — skill-relative path for bundled scripts
  - `${CLAUDE_SESSION_ID}` — session ID for logging or correlation
  - `${CLAUDE_EFFORT}` — adapt instructions to active effort level
- **Skill Directory & Lifecycle**:
  - supporting files — templates, examples, scripts alongside SKILL.md
  - live change detection — edits take effect without restarting
  - auto-discovery — parent + nested dirs, monorepo-friendly
  - skill content lifecycle — compaction budget: 5k tokens/skill, 25k total
- **Sharing, Control & Extras**:
  - `skillOverrides` — on · name-only · user-invocable-only · off
  - `Skill(name)` permission rule — allow/deny specific skills in /permissions
  - `/run` · `/verify` — bundled skills: launch & confirm against live app
  - `/run-skill-generator` — record your project's launch recipe once
  - `/doctor` — diagnose skill listing budget overflow
- **Takeaway**: → Official docs: Claude Code → Skills. Every keyword above has its own section. That's the full toolkit — next, we open the hood and see the machine underneath.

## Speaker Transcript (Bengali)

এই পর্যন্ত আমরা skills-এর core ধারণাগুলো দেখলাম — কীভাবে লেখা যায়, কীভাবে invoke করা যায়, কীভাবে context manage করা যায়। কিন্তু skill system টা আসলে অনেক গভীর, আর এই slide-টা সেই গভীরতার একটা map — একটা reference যা আপনি পরে নিজের সময়ে explore করবেন।

প্রথমেই বলি — skill কিন্তু শুধু একটা markdown file না। Frontmatter-এ আরো অনেক field আছে যা আপনি fine-tune করতে পারেন। যেমন `when_to_use` — `description`-এর পাশাপাশি extra trigger phrase যোগ করার জন্য, যাতে LLM আরো precisely বুঝতে পারে কখন এই skill টা কাজে লাগবে। `argument-hint` দিয়ে skill invoke করার সময় autocomplete-এ একটা hint দেখানো যায় — যেমন `[issue-number]` বা `[filename] [format]` — যাতে user বুঝতে পারে কী argument pass করতে হবে। `hooks` দিয়ে skill active থাকার সময় tool use-এর সাথে shell command বাঁধা যায় — এগুলো `PreToolUse` আর `PostToolUse` hook, যা skill-এর মধ্যে প্রতিটা tool call-এর আগে বা পরে fire করে, skill শুরু বা শেষের event না। `model` আর `effort` দিয়ে একটা নির্দিষ্ট skill-এর জন্য আলাদা model বা thinking level set করা যায় — সব skill-এর জন্য same model লাগে না। আর `disallowed-tools` — কোনো skill active থাকার সময় নির্দিষ্ট tool block করে রাখতে চান? সেটাও করা যায়।

তারপরে আসে arguments আর substitutions — আর এটাই skill-কে static থেকে dynamic বানায়। আপনি যখন skill invoke করেন, সাথে argument pass করতে পারেন। `$ARGUMENTS` দিয়ে সব argument পাবেন, `$0`, `$1` দিয়ে individual argument। আরো elegant উপায় হলো frontmatter-এ `arguments:` field define করে named argument ব্যবহার করা — `$issue`, `$branch` এর মতো — যাতে code পড়তে গেলেই বোঝা যায় কী কী pass করতে হবে। আর কিছু built-in variable আছে যা environment থেকে automatically পাওয়া যায় — `${CLAUDE_SKILL_DIR}` দিয়ে skill-এর নিজস্ব directory path পাওয়া যায়, যা bundled script reference করার সময় খুবই কাজে লাগে। `${CLAUDE_SESSION_ID}` দিয়ে session tracking করা যায়, আর `${CLAUDE_EFFORT}` দিয়ে skill নিজেই জানতে পারে কোন effort level-এ চলছে — সেই অনুযায়ী নিজের behavior adjust করতে পারে।

এবার চিন্তা করুন — skill শুধ একটা SKILL.md file না, skill একটা directory। সেই directory-তে আপনি template, example, script রাখতে পারেন — skill-এর focus ধরে রেখে সব reference material একসাথে রাখা। আরেকটা beautiful জিনিস হলো live change detection — session চলাকালীন আপনি skill edit করলে restart ছাড়াই সেটা কার্যকর হয়। Auto-discovery মানে monorepo-তে nested `.claude/skills/` directory থেকেও skill load হয় — আপনাকে manually কিছু করতে হয় না। আর skill content lifecycle — আপনি maybe ভাবছেন এতো skill load হলে context window ভরে যাবে না? সেই জন্য compaction budget আছে — প্রতি skill-এ ৫ হাজার token, মোট ২৫ হাজার token। Skill গুলো smartly manage হয়।

শেষে — sharing, control আর কিছু extra utility। `skillOverrides` setting দিয়ে আপনি settings.json থেকে skill visibility control করতে পারেন — on, name-only, user-invocable-only, বা completely off। `Skill(name)` permission rule দিয়ে `/permissions`-এ নির্দিষ্ট skill allow বা deny করা যায় — team environment-এ খুবই কাজে লাগে। তারপরে কিছু bundled skill আছে — `/run` আর `/verify` দিয়ে live app চালিয়ে change verify করা যায়। `/run-skill-generator` একবার run করলে আপনার project-এর launch recipe record হয়ে যায় — পরের বার ঠিক সেই same setup-এ start করতে পারবেন। আর `/doctor` দিয়ে skill listing budget overflow diagnose করা যায় — এটা conversation compaction-এর ৫k/২৫k token budget না, বরং প্রতি turn-এ Claude যে skill listing দেখে তার character budget। কোনো skill-এর description truncate হচ্ছে কিনা, `/doctor` সেটা দেখিয়ে দেয়।

সব মিলিয়ে এই slide-টা একটা reference map — official docs-এ Claude Code → Skills section-এ প্রতিটা keyword-এর নিজস্ব section আছে। যখন আপনি নিজের workflow-এ skills ব্যবহার করতে শুরু করবেন, তখন এই ক্ষমতাগুলোর দরকার অনুভব করবেন। আর যখনই দরকার হবে — আপনি জানবেন কোথায় খুঁজতে হবে।
