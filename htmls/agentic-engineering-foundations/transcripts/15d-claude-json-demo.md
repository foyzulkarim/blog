# Slide 15d — Demo: The Root ~/.claude.json (4 of 4)

## On-Screen Content
- **Header**: Skills Intro · Demo · 4 of 4 · 15d / 81
- **Title**: The Root ~/.claude.json
- **Badge**: Demo — global runtime state, usage history, per-project snapshots
- **Structure Tree**:
  - ~/.claude.json
    - numStartups: 485          ← total Claude Code launches
    - installMethod: "native"
    - userID: "…"               ← anonymous telemetry ID
    - customApiKeyResponses     ← approved / rejected providers
    - tipsHistory: { … }        ← which tips you've dismissed
    - projects: {               ← 45 project entries
        "/Users/foyzul/…/agentic-swe-vod": {
          allowedTools: []
          mcpServers: {}
          lastCost: $0.83
          lastTotalCacheReadInputTokens: 1,516,400
          lastModelUsage: { haiku, sonnet }
          exampleFiles: ["index.html", …]
        }
      }
- **Cards**:
  - Global State — numStartups (485), customApiKeyResponses, tipsHistory
  - Per-Project Entry — 45 projects, allowedTools, mcpServers, exampleFiles, last session snapshot
  - Last Session Snapshot — lastCost $0.83, cacheRead 1,516,400 vs cacheCreation 38,994, Haiku + Sonnet usage
- **Takeaway**: → Not a config file — a runtime ledger. Claude writes it, you read it to understand what's happening.

## Speaker Transcript (Bengali)

এটা আমাদের demo series-এর শেষ piece। `~/.claude.json` — root-level state file।

`settings.json` হলো config — আপনি লেখেন, Claude পড়ে। এটা উল্টো — Claude লেখে, আপনি পড়েন। এটা একটা runtime ledger।

**Global fields দিয়ে শুরু করি।**

`numStartups: 485` — আমি এই machine-এ 485 বার Claude Code launch করেছি। এটা শুনতে অনেক মনে হচ্ছে, কিন্তু daily use করলে এটা স্বাভাবিক।

`installMethod: "native"` — কীভাবে install করা হয়েছে। Native installer দিয়ে।

`userID` — anonymous telemetry ID। আপনার identity না, শুধু usage pattern track করার জন্য।

`customApiKeyResponses` — আপনি কোন custom provider approve করেছেন, কোনটা reject করেছেন। আমার case-এ lmstudio approved, ollama rejected।

`tipsHistory` — এটা interesting। Claude Code session শুরুতে tips দেখায় — "shift+enter চাপুন", "memory command আছে" এরকম। কোন tip কতবার দেখানো হয়েছে সব এখানে track হয়। 485 startup-এ অনেক tip দেখা হয়ে গেছে।

**এখন `projects` key।**

এখানে 45টা entry আছে — 45টা project path, প্রত্যেকটা আমি Claude Code দিয়ে কাজ করেছি। আর প্রতিটার ভেতরে একটা full snapshot।

`agentic-swe-vod` project-এর entry দেখি:

`allowedTools` — এই project-এ কোন tools explicitly allow করা আছে। আমার case-এ empty — মানে default settings use করছে।

`mcpServers` — এই project-এর MCP server config। Empty মানে project-level কোনো custom MCP নেই।

`exampleFiles` — এটা Claude নিজে pick করে। আপনার repo দেখে সবচেয়ে representative files কোনগুলো সেটা decide করে। এই project-এ `index.html`, `index-kimi.html`, `index-minimax.html` — slide files।

**Last session snapshot — এটা সবচেয়ে useful।**

`lastCost: $0.83` — আগের session-এ $0.83 খরচ হয়েছে।

এখন cache numbers দেখুন: `lastTotalCacheReadInputTokens: 1,516,400` আর `lastTotalCacheCreationInputTokens: 38,994`। Cache read 1.5 million token, cache creation মাত্র 39 হাজার। Ratio দেখুন — প্রায় 40:1। মানে প্রতিবার context re-send না করে cache থেকে পড়ছে। এটা cost-এ বিশাল পার্থক্য করে।

`lastModelUsage` — দুটো model use হয়েছে। Haiku 493 input token, 15 output — lightweight tasks এর জন্য। Sonnet 4592 input, 14551 output — main heavy lifting। Claude automatically route করে — সব call Sonnet-এ যায় না।

এটাই `~/.claude.json`। Config না — ledger। Claude লেখে, আপনি বোঝেন কী হচ্ছে।

এই চারটা demo slide মিলিয়ে আমরা দেখলাম Claude Code-এর পুরো directory structure — `.claude/` layout, actual `~/.claude/` directory, `projects/` system, আর root `~/.claude.json`। এবার Claude Code খুললে সবার আগে যা চোখে পড়ে সেটা দেখি — status line।
