# Slide 15e — The Status Line — Your Live Dashboard

## On-Screen Content
- **Header**: Skills Intro · Hands-on · 15e / 81
- **Title**: The Status Line — Your Live Dashboard
- **Badge**: Concept — every number visible the moment Claude Code opens, and every one customizable
- **Live Statusline Replica**:
  - Line 1: [Sonnet 4.6] 🗂 agentic-swe-vod | 🌿 main          145790 tokens
  - Line 2: ████ 72% | $3.93 | ⏱ 136m 4s | 🕐 06:58 | 1m20s idle
  - Line 3: cache: 99% | read: 144k | write: 0k | +623 -107
  - Line 4: ►► accept edits on (shift+tab to cycle)
- **Four Cards**:
  - Session Identity — Sonnet 4.6 (model), agentic-swe-vod (project), main (branch)
  - Cost & Context — 72% context used, $3.93 session cost, 145790 tokens total
  - Cache Health — 99% hit rate, 144k read from cache, 0k new write
  - Permission Mode — accept edits on, shift+tab cycles: plan → default → accept edits, +623 -107 lines changed
- **Takeaway**: → Customize with /config or the statusline-setup skill.

## Speaker Transcript (Bengali)

Claude Code open করলে এটাই প্রথম দেখবেন। এই status line। আমার screen-এ এখন exactly এটাই আছে — চারটা line, অনেক number। আমরা এখনই এটা walk করি, কারণ এই numbers বুঝলে পুরো session জুড়ে কী হচ্ছে সেটা track করতে পারবেন।

**প্রথম line — Session Identity।**

`[Sonnet 4.6]` — এই moment-এ কোন model use হচ্ছে। আমার case-এ Sonnet 4.6। এটা change হতে পারে session-এ যদি Claude automatically lighter model-এ route করে।

`agentic-swe-vod` — কোন project-এ আছেন। আর `main` — কোন git branch-এ।

Right side-এ `145790 tokens` — এই session-এ এখন পর্যন্ত মোট কত token process হয়েছে।

**দ্বিতীয় line — Cost আর Context।**

Yellow bar আর `72%` — context window-এর কতটুকু ব্যবহার হয়েছে। আমি এখন 72% ভরে ফেলেছি। 100%-এর কাছে গেলে Claude automatic compaction করে — পুরনো context summarize করে space বানায়। এই number দেখে বুঝবেন কখন `/compact` run করা দরকার।

`$3.93` — এই session-এ এখন পর্যন্ত কত খরচ হয়েছে। Real-time। আগে `~/.claude.json`-এ `lastCost` দেখলাম — এটা সেই number-এর live version।

`136m 4s` — session চলছে 136 মিনিট ধরে। `06:58` — current time। `1m20s idle` — শেষ action-এর পর কত সময় গেছে।

**তৃতীয় line — Cache Health।**

এটা আমার favourite line। `cache: 99%` — এই session-এর 99% token request cache থেকে serve হয়েছে। মানে প্রতিবার নতুন করে সব পাঠাতে হয়নি। এটাই `~/.claude.json`-এ `lastTotalCacheReadInputTokens: 1,516,400` দেখেছিলাম।

`read: 144k` — cache থেকে পড়া tokens। `write: 0k` — এই moment-এ নতুন cache তৈরি হয়নি।

`+623 -107` — এই session-এ 623 line add হয়েছে, 107 line remove হয়েছে। Git diff-এর মতো।

**চতুর্থ line — Permission Mode।**

`accept edits on` — এই mode-এ Claude freely file edit করতে পারে। আর `shift+tab to cycle` — এটাই সেই shortcut। Shift+Tab চাপলে mode cycle করে তিনটা option-এর মধ্যে:
- **accept edits on** — Claude freely file edit করে, আপনি পরে git diff দিয়ে review করেন
- **plan mode** — Claude শুধু plan করে, কোনো file edit করে না — approve করলে তবেই execute
- **default** — Claude প্রতিটা action-এর আগে permission চায়

Complex বা risky task করার আগে plan mode-এ যান। আবার normal কাজে ফিরলে cycle back করুন।

**Customize করুন।**

এই সব information দেখতে ভালো লাগছে — কিন্তু আপনার কাছে হয়তো অন্যরকম দরকার। `/config` command দিয়ে বা `statusline-setup` skill দিয়ে customize করতে পারবেন। কোন section দেখাবে, কোনটা hide করবেন, order change করবেন — সব tweak করা যায়।

এটাই Claude Code-এর live dashboard। Directory জানা হলো, config জানা হলো, cost tracking জানা হলো — এখন real-time-এ সব দেখছেন। এবার skills-এ যাই।
