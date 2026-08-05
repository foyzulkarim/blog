# Slide 16b — Built-in Agents: Explore Before You Build

## On-Screen Content
- **Header**: Skills Intro · Agents · 16b / 81
- **Title**: Built-in Agents: Explore Before You Build
- **Lede**: Two read-only agents shipped inside Claude Code — and the targets your skills can delegate to via `context: fork`.
- **Explore Agent**:
  - Tools: Read, Grep, Glob (read-only — cannot write or edit)
  - Use for: Understanding an unfamiliar codebase before proposing changes.
  - How to invoke: Ask Claude to explore before architecting, or use the Agent tool with subagent_type="Explore".
  - When: Before writing an architecture document. Before touching legacy code.
- **Plan Agent**:
  - Tools: Read-only — cannot modify files.
  - Use for: Designing architecture grounded in actual codebase state.
  - How to invoke: Use the Agent tool with subagent_type="Plan", or ask Claude to plan before implementing.
  - When: Before implementing a complex feature. Before a refactor.
- **Note**: Both agents are read-only by definition — they literally cannot write files. Safe to run on unfamiliar codebases before you understand them.
- **Takeaway**: → The best architecture is grounded architecture. Explore before you plan. Plan before you code.

## Speaker Transcript (Bengali)

Skill-এর anatomy এইমাত্র দেখলাম — frontmatter-এ `name`, `description`, `allowed-tools`, আর body-তে process definition। কিন্তু skill শুধু আপনি বানান না। Claude Code-এর সাথে দুইটা built-in agent ship করে আসে — Explore আর Plan — একই anatomy নিয়ে, একই invocation pattern নিয়ে। এরা শুধু স্বাধীনভাবে ব্যবহার করা যায় না; আপনার নিজের skill-ও এদের মধ্যে delegate করতে পারে `context: fork` + `agent: Explore` দিয়ে। আর এরা design-এর দিক থেকে read-only — আপনাকে বাঁচাবে agentic engineering-এর সবচেয়ে ব্যয়বহুল ভুল থেকে — এমন code নিয়ে architectural decision নেওয়া যেটা আপনি বোঝেন না।

Explore Agent। এই agent file পড়তে পারে, grep দিয়ে search করতে পারে, আর glob pattern দিয়ে file খুঁজতে পারে। শুধু এতটুকুই। লিখতে পারে না। edit করতে পারে না। delete করতে পারে না। এটা একজোড়া চোখ, হাত না।

ব্যবহার করুন যখন একটা codebase-এর জন্য architecture document লিখতে যাবেন যেটা আগে দেখেন নি। অথবা legacy code-এ হাত দেবেন আর নিশ্চিত না যে function বদলালে কী ভাঙবে। Explore Agent terrain map তৈরি করে build শুরু করার আগে — foundation ঢালার আগে surveyor পাঠানোর মতো।

চালু করুন Claude-কে explore করতে বলে architecting-এর আগে, অথবা Agent tool-এ `subagent_type="Explore"` দিয়ে। সে relevant file পড়ে, architecture সারাংশ দেয়, dependency চিহ্নিত করে, আর report করে। সব read-only। সব safe।

Plan Agent। এই agent-ও read-only — file modify করতে পারে না। এর কাজ হলো actual codebase-র অবস্থার ওপর ভিত্তি করে architecture design করা। theoretical architecture না, aspirational architecture না — এমন architecture যেটা আসলে যা আছে তার সাথে মানানসই।

চালু করুন Agent tool-এ `subagent_type="Plan"` দিয়ে, অথবা Claude-কে implement করার আগে plan করতে বলে। Claude read-only state-এ ঢোকে যেখানে investigate, design, propose করতে পারে — কিন্তু execute করতে পারে না। এটা এমন architect-এর মতো যে blueprint আঁকতে পারে কিন্তু হাতুড়ি তুলতে পারে না।

ব্যবহার করুন complex feature implement করার আগে। refactor করার আগে। যে কোনো সিদ্ধান্তের আগে যেটা একাধিক file প্রভাবিত করে। Plan Agent Claude-কে কাজ করার আগে বুঝতে বাধ্য করে। আর কাজ করার আগে বুঝা — surgeon আর কসাই-এর মাঝে পার্থক্য।

দুটো agentই definition-এর দিক থেকে read-only। আসলেই file লিখতে পারে না। এটা preference setting না, আর configure করতে হবে এমন guardrail না — design-এর ভেতরেই তৈরি। production code-এ রাত দুইটায় চালান আর নির্ভয়ে ঘুমান, জেনে যে এরা দেখতে পারে কিন্তু স্পর্শ করতে পারে না।

আমি প্রতিটা architecture document-এর আগে Explore Agent ব্যবহার করি। প্রতিটা। কারণ কঠিনভাবে শিখেছি legacy code নিয়ে অনুমান করা ব্যয়বহুল। সেই function যেটা unused ভেবেছিলেন? তিনটা অন্য service call করে। সেই database table যেটা simple ভেবেছিলেন? চৌদ্দটা column আর দুইটা foreign key আছে যেটা জানতেন না।

সবচেয়ে ভালো architecture হলো grounded architecture। Architecture যেটা code আসলে কী করে তার ওপর ভিত্তি করে, আপনি কী ভাবেন তার ওপর না। আগে explore করুন, তারপর plan করুন, তারপর code করুন। এই দুইটা agent এই ধারাবাহিকতা স্বয়ংক্রিয় করে দেয়। আর এখন যে skill বানাবেন সেটা চাইলে এদের মধ্যে delegate করতে পারবে — `context: fork` + `agent: Explore` দিয়ে আপনার skill একটা read-only subagent-এ চলবে, main conversation-এর কোনো ক্ষতি ছাড়াই।
