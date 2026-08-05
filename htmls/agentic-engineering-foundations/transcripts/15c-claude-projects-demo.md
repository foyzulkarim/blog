# Slide 15c — Demo: How ~/.claude/projects/ Works (3 of 3)

## On-Screen Content
- **Header**: Skills Intro · Demo · 3 of 4 · 15c / 81
- **Title**: How ~/.claude/projects/ Works
- **Badge**: Demo — every project gets its own directory, named after its path
- **Directory Tree**:
  - ~/.claude/projects/
    - -Users-foyzul-personal-agentic-swe-vod/  ← this project
      - memory/                        ← project memory
      - c1cf3a99-…-c86a.jsonl          ← session log
      - 6d976b1d-…-c517.jsonl          ← session log
      - … 16 more sessions
    - -Users-foyzul-personal-aswe-lms/
    - -Users-foyzul-personal-tokenowl/
    - … 20 more projects
- **Cards**:
  - Naming Convention — path → slug, slashes become hyphens, worktrees get own entry
  - Session Logs — each UUID .jsonl = one full conversation (18 sessions for this project)
  - Project Memory — memory/ subdirectory, separate from global agent-memory/
- **Takeaway**: → Let's open this live — switch to terminal and walk through the project directory.

## Speaker Transcript (Bengali)

আমরা আগে দেখেছিলাম `~/.claude/`-এর ভেতরে `projects/` নামে একটা directory আছে। এটা একটু আলাদাভাবে explain করা দরকার — কারণ এটা বুঝলে Claude-এর memory আর session system টা পুরোপুরি clear হয়ে যাবে।

`projects/` directory-তে আপনি যতো project-এ কাজ করেছেন সবার জন্য আলাদা আলাদা subdirectory আছে।

**Naming convention** — directory-এর নাম হয় project-এর full path থেকে। Forward slash গুলো হাইফেন হয়ে যায়। যেমন আমার এই project-এর path হলো `/Users/foyzul/personal/agentic-swe-vod` — সেটা হয়ে যায় `-Users-foyzul-personal-agentic-swe-vod`। Simple rule, predictable। Git worktree-ও আলাদা entry পায়, কারণ তার path আলাদা।

এই machine-এ 23টা project directory আছে। মানে আমি 23টা আলাদা project-এ Claude Code দিয়ে কাজ করেছি। `aswe-lms`, `tokenowl`, `budgetcheckpoint` — প্রতিটার নিজের directory।

এখন একটা project-এর ভেতরে ঢুকি — এই `agentic-swe-vod` project। এখানে কী আছে?

**Session logs** — UUID-named `.jsonl` file। প্রতিটা file একটা conversation session। Start থেকে end পর্যন্ত — প্রতিটা message, প্রতিটা tool call, প্রতিটা file edit। এই project-এ এখন 18টা session আছে। আপনি চাইলে যেকোনো পুরনো session-এ ফিরে যেতে পারবেন, দেখতে পারবেন Claude ঠিক কী করেছিল।

সবচেয়ে important জিনিস: **`memory/`** subdirectory। এটা এই specific project-এর memory। Global `~/.claude/agent-memory/`-এ Claude সব project জুড়ে যা শেখে তা থাকে। কিন্তু এই `memory/`-এ থাকে শুধু এই project সম্পর্কে Claude-এর learnings — এই codebase-এর patterns, এই project-এর conventions, আপনার preferences এই context-এ। দুটো আলাদা, দুটোই important।

এখন terminal-এ switch করি আর actually দেখি।
