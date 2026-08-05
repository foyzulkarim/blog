# Slide 16a — Dissecting a Skill

## On-Screen Content
- **Header**: Skills Intro · Ecosystem · 16a / 81
- **Title**: Dissecting a Skill
- **Lede**: Skills aren't only files you write — they ship with the CLI, arrive via plugins, or live in your repo. Same anatomy, three sources.
- **Three Source Cards**:
  - Built-in — ships with Claude Code CLI: `/code-review /verify /run /debug /batch /loop /claude-api /init`
  - Official Plugins — Anthropic marketplace: `claude-code-setup` → claude-automation-recommender · `commit-commands` → /commit /changelog · `frontend-design` → UI/component review · `dev-pipeline` (this course) → /req /arch /tdd /review /commit
  - Community & Your Own: `addy-agent-skills` → CI/CD, automation bundles · `.claude/skills/` → your repo, your team's rules
- **Anatomy Panel** (claude-plugins-official · claude-code-setup · SKILL.md):
  - `name`: claude-automation-recommender — slash command identifier
  - `description`: LLM-matched, not keyword — "Use when user asks for automation recommendations..."
  - `allowed-tools`: Read Glob Grep Bash — Claude Code field (Agent Skills standard uses `tools:`)
  - No flags → dual invocation (user or Claude). `disable-model-invocation: true` → user-only. `user-invocable: false` → Claude-only.
  - Body: Automation Types · Workflow Phases 1–3
- **Takeaway**: → The `description` field is the LLM trigger — write it as a usage policy. "Use when…" always beats "Skill for…"

## Speaker Transcript (Bengali)

আমরা এইমাত্র দেখলাম skill কী — একটা চুক্তি, একবার define করলে Claude বারবার execute করে। কিন্তু একটা প্রশ্ন থেকে যায়। এই skill গুলো আসে কোথা থেকে? শুধু কি আপনি নিজে বানাবেন? না। তিনটা আলাদা জায়গা থেকে skill আসতে পারে।

প্রথমটা হলো built-in skill — যেগুলো Claude Code CLI-এর সাথেই ইন্সটল হয়। `/code-review`, `/verify`, `/run`, `/debug`, `/batch`, `/loop`, `/claude-api`, `/init` — এগুলো কোনো সেটআপ ছাড়াই পাবেন। Anthropic টিম বানিয়েছে, প্রতিটা ভার্সনে শিপ করে। আপনি Claude Code ইন্সটল করলেই হলো।

দ্বিতীয়টা হলো official plugin marketplace — Anthropic নিজে কিছু plugin publish করে। Plugin মানে একটা প্যাকেজ যার ভেতরে এক বা একাধিক skill থাকে। `claude-code-setup` plugin-এ আছে `claude-automation-recommender` — এটা আপনার codebase analyze করে বলে দেয় কোন automation সেটআপ করবেন। `commit-commands`-এ আছে `/commit` আর `/changelog`। আর এই course-এর নিজস্ব `dev-pipeline` plugin-এ আছে `/req`, `/arch`, `/tdd`, `/review`, `/commit` — পুরো 5-phase framework-এর skill গুলো। এগুলো built-in মনে হতে পারে কারণ course install করলেই পাবেন, কিন্তু আসলে একটা plugin থেকে আসছে।

তৃতীয়টা হলো community plugin আর নিজের তৈরি skill। `addy-agent-skills` একটা community plugin — CI/CD আর automation-এর জন্য ready-made skill গুলো আছে এখানে। আর সবচেয়ে গুরুত্বপূর্ণ হলো আপনার নিজের `.claude/skills/` — আপনার repository-তে, আপনার দলের নিয়মে, version control-এ।

এখন একটা কাজ করি। আমি `claude-automation-recommender`-এর SKILL.md ফাইলটা খুলি — invoke করবো না, শুধু পড়ি। দেখি Anthropic-এর একজন engineer একটা skill কীভাবে লিখেছেন।

[ফাইল খোলা হচ্ছে: `.claude/plugins/.../claude-code-setup/skills/claude-automation-recommender/SKILL.md`]

দেখুন frontmatter-এ তিনটা field আছে।

প্রথমটা `name: claude-automation-recommender` — এটা skill-এর identifier। locally `.claude/skills/`-এ থাকলে এই name-ই slash command হয়।

দ্বিতীয়টা — সবচেয়ে গুরুত্বপূর্ণ — `description` field। মনোযোগ দিয়ে পড়ুন। এটা শুধু বলছে না skill কী করে। বলছে কখন ব্যবহার করতে হবে। "Use when user asks for automation recommendations, wants to optimize their Claude Code setup, mentions improving Claude Code workflows" — এটা একটা usage policy। Claude এই description পড়ে LLM reasoning দিয়ে সিদ্ধান্ত নেয় কখন এই skill auto-invoke করবে। keyword match করে না — semantic মিল খোঁজে। "আমার project-এ কী automation করা যায়" বললে Claude বুঝবে এই skill-টা এখানে relevant।

তৃতীয়টা `allowed-tools: Read Glob Grep Bash` — এই skill শুধু এই চারটা tool ব্যবহার করতে পারবে। বেশি না। এটা sandboxing — skill-কে দরকারের বেশি access দেওয়া হয়নি। একটা ছোট note: Claude Code-এর official field-এর নাম `allowed-tools`, কিন্তু Agent Skills open standard-এ একই field-এর নাম `tools`। এই specific SKILL.md file-টা standard follow করে তাই `tools` ব্যবহার করেছে। আপনি নিজের skill লেখার সময় `allowed-tools` ব্যবহার করুন।

আর লক্ষ্য করুন — frontmatter-এ কোনো `disable-model-invocation: true` নেই। মানে Claude নিজেও এই skill invoke করতে পারবে যখন মনে করবে context মানানসই। এটা ইচ্ছাকৃত — একটা recommender skill auto-invoke হলেই বরং ভালো।

এখানে তিনটা invocation mode-এর পার্থক্যটা বোঝা জরুরি। Default — কোনো flag নেই — মানে user আর Claude দুজনেই invoke করতে পারে। এই `claude-automation-recommender` সেই category-তে পড়ে। `disable-model-invocation: true` দিলে শুধু user slash command দিয়ে চালাতে পারবে — Claude নিজে থেকে চালাবে না। এটা দরকার হয় যেমন deploy বা commit করার skill-এর জন্য — side effect আছে, তাই user-এর explicit সিদ্ধান্ত নেওয়া দরকার। আর `user-invocable: false` দিলে user-এর কাছে কোনো slash command দেখায় না — Claude শুধু নিজে থেকে auto-invoke করে। এটা কাজে লাগে project-conventions বা code-style-এর মতো background knowledge skill-এর জন্য, যেটা Claude নিজেই context বুঝে apply করুক।

এরপর body-তে কী আছে দেখুন — এটা একটা পুরো process definition। Automation types-এর overview table, তিনটা phase-এর workflow, output template, decision framework — সবকিছু যা Claude-র লাগে কাজটা consistently করতে। এটাই চুক্তির শর্তাবলী।

Anthropic-এর engineer এই skill বানিয়েছে ঠিক একইভাবে যেভাবে আপনি আপনার skill বানাবেন — একটা markdown ফাইল, frontmatter-এ metadata, body-তে process। পার্থক্য শুধু content-এ।

একটা জিনিস মনে রাখবেন। description field-এ "claude-automation-recommender" লেখা হয়নি। লেখা হয়েছে "Use when user asks for automation recommendations" — কারণ LLM trigger হয় intent থেকে, label থেকে নয়। "Use when…" দিয়ে শুরু করলে Claude ঠিকঠাক match করতে পারে। এটাই আমরা পরের slide-এ যখন নিজেদের skill বানাবো তখন প্রয়োগ করবো।
