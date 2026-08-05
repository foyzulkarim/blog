# Slide 15a — Demo: A Real ~/.claude/ — Config, Skills & Agents (1 of 2)

## On-Screen Content
- **Header**: Skills Intro · Demo · 1 of 4 · 15a / 81
- **Title**: A Real ~/.claude/ — Config, Skills & Agents
- **Badge**: Demo — the pieces you configure and invoke directly
- **Directory Tree** (top half highlighted):
  - CLAUDE.md              ← global rules — every session
  - settings.json          ← global config & permissions
  - agents/                ← subagent definitions
  - skills/                ← skill definitions
  - plugins/               ← installed packages
  - (remaining dirs marked "next slide")
- **Cards**:
  - Core Config — CLAUDE.md (global instructions, pre-project), settings.json (model, permissions, tools)
  - Skills & Agents — skills/ (global slash commands), agents/ (subagent specs), plugins/ (dev-pipeline etc.)
- **Takeaway**: → These are the pieces you actively write and configure. Memory, history, and cost tracking — next slide.

## Speaker Transcript (Bengali)

আমরা এখন সেই theoretical map থেকে বের হয়ে একটা real machine দেখবো। এটা আমার actual `~/.claude/` directory — daily use-এর পর যেটা দাঁড়িয়েছে। চারটা slide-এ ভাগ করেছি কারণ এখানে অনেক কিছু আছে যেটা আলাদাভাবে বোঝার দরকার।

এই first slide-এ দেখবো — আপনি নিজে যে জিনিসগুলো actively লেখেন আর configure করেন।

**`CLAUDE.md`** — এটা সবচেয়ে important file। প্রতিটা Claude Code session-এ, যে project-এই কাজ করুন না কেন, এই file automatically load হয়। আপনার global rules এখানে। Coding standard — snake_case নাকি camelCase। Response format — Bengali-তে explain করবে নাকি English-এ। Commit message style — conventional commits follow করবে কিনা। যা সব project-এ সবসময় apply করতে চান — এখানে লিখুন। Project-level `CLAUDE.md` এটাকে override করতে পারে, কিন্তু এটা সবসময় baseline।

**`settings.json`** — global configuration। Default model কোনটা। কোন tools trusted — মানে prompt ছাড়াই run করতে পারবে। Environment variable কোনগুলো। Permission allowlist। Project-level `settings.json` এটার ওপর জিতবে, কিন্তু কোনো project-specific settings না থাকলে এটাই কাজ করে।

এখন **`agents/`** directory। এখানে subagent definitions থাকে। প্রতিটা agent-এর নিজের description আছে, নিজের focused tool set আছে, নিজের instructions আছে। Claude কোনো task পেলে descriptions পড়ে automatically সঠিক agent invoke করে। আপনাকে বলতে হয় না "এই agent use করো"। এই machine-এ `review-consolidator` agent আছে — review workflow-এর জন্য।

**`skills/`** — global slash-command definitions। এখানে যা রাখবেন সেটা প্রতিটা project-এ available। `/req` type করলে এখান থেকে load হবে। Project-specific skills project-এর `.claude/skills/`-এ রাখুন।

**`plugins/`** — installed skill packages। এই machine-এ `dev-pipeline` plugin install করা আছে। সেই plugin-এর সব skills — `/commit`, `/tdd`, `/plan-requirements` — এখান থেকে load হয়। Plugin install মানে skills automatically available।

পরের slide-এ দেখবো — Claude নিজে যা manage করে। Memory, history, cost tracking।
