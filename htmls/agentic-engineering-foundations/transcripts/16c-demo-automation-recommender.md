# Slide 16c — Demo: Automation Recommender

## On-Screen Content
- **Header**: Skills Intro · Demo · 16c / 82
- **Title**: Demo: Automation Recommender
- **Lede**: A read-only skill that analyzes your codebase and surfaces the top 1–2 automations across all five extension points — with *why*, not just what.
- **Left — Invoke + 5 Types**:
  - Invoke: `/claude-automation-recommender` — or ask: *"what automations can I set up for this project?"*
  - 5 Types: Hooks · Subagents · Skills · Plugins · MCP Servers (each with one-line description)
- **Right — 3-Phase Workflow**:
  - Phase 1: Codebase Analysis — reads package.json, pyproject.toml, .claude/, structure. Each signal maps to a recommendation.
  - Phase 2: Generate Recommendations — 1–2 per category max. Skips irrelevant categories. Uses web search for framework-specific options.
  - Phase 3: Output Report — each item has Why, Install/Create command, invocation mode. Ends with "ask for more on any category."
- **Takeaway**: → Read-only by design — analyzes and recommends. You decide what to implement. Now let's open the SKILL.md and see how this is built.

## Speaker Transcript (Bengali)

Built-in skill আর built-in agent দেখলাম। এখন একটু অন্যদিকে যাই — plugin থেকে install করা একটা real skill দেখাই। এটা Anthropic-এর official `claude-code-setup` plugin-এর ভেতরে আছে: `claude-automation-recommender`।

এই skill-এর কাজ একটাই — আপনার codebase দেখে বলে দেওয়া কোন Claude Code automation আপনার সবচেয়ে কাজে লাগবে। Hooks লাগবে কিনা, কোন MCP server install করবেন, কোন skill বানাবেন, কোন plugin নেবেন — এই পাঁচ ধরনের extension point-এর জন্য recommendation দেয়।

Invoke করতে পারবেন দুইভাবে। `/claude-automation-recommender` slash command দিয়ে। অথবা সরাসরি বলুন — "এই project-এ কী automation set up করা যায়?" — Claude নিজেই এই skill চালাবে কারণ description-এ intent match করবে। আগের slide-এ ঠিক এই মেকানিজম দেখেছিলেন।

এই skill তিনটা phase-এ কাজ করে।

Phase 1: codebase analysis। `package.json`, `pyproject.toml`, `.claude/` folder, project structure — সব পড়ে। কোন language, কোন framework, কোন database, external API আছে কিনা, CI/CD setup আছে কিনা — এই signals গুলো detect করে। প্রতিটা signal একটা নির্দিষ্ট recommendation-এর দিকে নিয়ে যায়। Stripe detect করলে context7 MCP suggest করবে। Playwright config থাকলে Playwright MCP বলবে। এটা generic advice না — আপনার project-এর specific কথা।

Phase 2: recommendation generate করা। এখানে একটা design decision আছে যেটা গুরুত্বপূর্ণ — প্রতি category-তে maximum একটা বা দুইটা recommendation। বেশি দেয় না। কারণ বেশি দিলে overwhelm হয়ে যাবেন, কিছুই করবেন না। যে category relevant না সেটা skip করে। আর শুধু reference list থেকে না — web search করে আপনার specific framework-এর জন্য option খোঁজে।

Phase 3: output। প্রতিটা recommendation-এ তিনটা জিনিস থাকে — কেন এটা আপনার project-এর জন্য relevant, কীভাবে install বা create করবেন, আর invocation mode কী হবে। শেষে বলে — "আরো চাইলে যেকোনো category-তে আরো দিতে পারি।"

একটা জিনিস মনে রাখবেন — এই skill read-only। codebase analyze করে, recommend করে — কিন্তু কোনো file তৈরি করে না, কোনো config লেখে না। সিদ্ধান্তটা আপনার। সে শুধু terrain map বানায়।

এখন একটু জুম করি। আমি এই skill-টার SKILL.md ফাইলটা খুলতে চাই — দেখতে চাই Anthropic-এর engineer এটা কীভাবে লিখেছেন। Frontmatter থেকে শুরু করে তিনটা phase পর্যন্ত — একটা production-grade skill কেমন দেখতে হয় সেটা আপনাদের দেখাবো।
