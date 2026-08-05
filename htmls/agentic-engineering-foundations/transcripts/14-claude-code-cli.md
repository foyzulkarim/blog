# Slide 14 — Claude Code: Your Agentic CLI

## On-Screen Content
- **Header**: Skills Intro · The CLI · 14 / 81
- **Title**: Claude Code: Your Agentic CLI
- **Lede**: Problem — The 5-phase framework needs a tool — one that reads codebases, runs tests, and loads skills.
- **Concept**: Claude Code is Anthropic's official CLI — your terminal interface to agentic engineering.
- **Four Cards**:
  - 01 Reads Full Codebase — Analyzes architecture, dependencies, and conventions across your entire project.
  - 02 Edits, Tests & Shell — Writes code, runs tests, executes bash — all within your existing workflow.
  - 03 Skills via /commands — Type /req, /arch, /tdd — Claude loads your skill and follows your process.
  - 04 MCP Integration — Connects to Playwright, databases, search — giving Claude eyes, arms, and memory.
- **Install**: curl -fsSL https://claude.ai/install.sh | bash (Recommended). Legacy: npm install -g @anthropic-ai/claude-code
- **Needs from you**: Clear requirements · Architecture decisions · Well-scoped tasks · Your review
- **Surfaces**: Terminal CLI · VS Code extension · JetBrains plugin · Desktop app · Web (claude.ai/code)
- **Auth**: Claude.ai subscription (Pro / Max / Teams / Enterprise) · API key · Enterprise SSO (AWS Bedrock · Google Vertex · Azure)
- **Takeaway**: → Claude Code is the interface. Your clarity is the input. Garbage in, garbage out.

## Speaker Transcript (Bengali)

আমরা গত section-এ 5-phase framework নিয়ে কথা বলেছি। Requirements। Architecture। Tasks। TDD। Review। Agent-দের জন্য design করা complete engineering lifecycle।

কিন্তু একটা কথা: paper-এ framework শুধু একটা checklist। আপনার এমন একটা tool লাগে যেটা আসলে execute করতে পারে — যেটা codebase read করে, test run করে, skill load করে, আর external tools connect করে যেগুলো agent-কে superpower দেয়।

সেই tool হলো Claude Code — Anthropic-এর official CLI। আর এই course-এর বাকি অংশে আমরা এই tool-ই ব্যবহার করবো।

বেশিরভাগ AI coding tool file-by-file কাজ করে। কিছু code paste করেন, suggestion পান, আবার paste করেন। Small edit-এর জন্য ঠিক আছে। কিন্তু agentic engineering-এ পুরো system বোঝা লাগে — architecture, dependency, team convention। Claude Code exactly এটা করে। সে পুরো project read করে, file-এর মাঝে relationship বোঝে, আর পুরো codebase জুড়ে reason করে। এটা শুধু code generator না। এটা আপনার terminal-এ একজন engineering partner।

চারটা জিনিস Claude Code-কে agentic engineering-এর জন্য right tool বানায়।

প্রথম: সে পুরো codebase read করে। একটা file at a time না — পুরো project। Architecture, dependency, team convention বোঝে। এটা foundational। যে agent একটা file দেখতে পায়, সে good architectural decision নিতে পারে না। এটা one street-এর map নিয়ে city navigate করার মতো।

দ্বিতীয়: সে edit, test, আর shell command run করে। Code লেখে, test suite run করে, git status check করে, deploy করে — সব একই interface থেকে। Editor আর terminal-এর মাঝে context switch না। Copy-paste error না। একটা conversation, একটা workflow।

তৃতীয়: slash command দিয়ে skills। `/req` type করলে Claude requirements skill load করে। `/tdd` type করলে test-driven development skill load করে। এগুলো built-in feature না — এগুলো আপনার custom instructions, on demand load হয়। আমরা কয়েকটা একসাথে build করবো।

চতুর্থ: MCP server integration। MCP — Model Context Protocol — Claude-কে external tools-এর সাথে connect করে। Playwright browser automation-এর জন্য। Databases direct query-এর জন্য। Search engines semantic retrieval-এর জন্য। MCP Claude-কে eyes, arms, আর memory দেয় terminal-এর বাইরে। পরে depth-এ cover করবো।

Installation একটা command। Recommended way হলো `curl -fsSL https://claude.ai/install.sh | bash`। Legacy npm package-ও আছে যদি prefer করেন। Complex setup না। Initially API key configure করতে হবে না — existing Anthropic credentials ব্যবহার করে।

Claude Code সব জায়গায় run করে যেখানে লাগে: terminal, VS Code, JetBrains, desktop app, web। আর multiple auth method support করে — Claude.ai subscription, API key, অথবা enterprise SSO AWS Bedrock, Google Vertex, অথবা Azure-এর through।

কিন্তু মনে রাখবেন এটা আপনার কাছে কী চায়। Clear requirements। Architecture decisions। Well-scoped tasks। আপনার review। Claude Code হলো interface। আপনার clarity হলো input। Framework process দেয়। Tool execution দেয়। কিন্তু instruction vague হলে কিছুই matter করে না। Garbage in, garbage out।

Next slide-এ দেখাবো Claude Code configuration কোথায় store করে — `.claude/` directory — যাতে customize করতে হলে exactly জানেন কোথায় দেখতে হবে।
