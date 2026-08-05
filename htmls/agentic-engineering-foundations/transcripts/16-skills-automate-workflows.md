# Slide 16 — Skills: Automate Your Workflows

## On-Screen Content
- **Header**: Skills Intro · Concept · 16 / 81
- **Title**: Skills: Automate Your Workflows
- **Lede**: Problem — Every session starts from zero. You re-explain conventions — every single time.
- **Solution**: Skills = markdown in .claude/skills/, loaded on demand via slash command.
- **Three Steps**:
  - 01 You type /command — /req /arch /tdd /review. Signal: switch to this workflow.
  - 02 Claude loads skill — .claude/skills/req/SKILL.md. Process, checklists, output format.
  - 03 Claude follows it — Socratic → ARCH → Tasks → TDD → Review. Consistent. Repeatable. Every time.
- **Key Traits**:
  - Dual-invocation — User slash command or Claude auto-matches. Three modes: default · user-only · Claude-only.
  - On-demand — Zero context bloat until needed.
  - Version-controlled — In .claude/skills/ — shared, committed.
- **Advanced Note**: Skills are matched by LLM reasoning over the description field — not keyword matching. Write descriptions that articulate when to use the skill, not just what it does.
- **Invocation control**: Default (no flags) → both user & Claude. `disable-model-invocation: true` → user slash command only. `user-invocable: false` → Claude auto-invoke only (no slash command — for background knowledge skills).
- **Takeaway**: → A skill is a contract. Define once. Claude executes every time.

## Speaker Transcript (Bengali)

একটা ঘটনা আমাদের সবারই পরিচিত। নতুন একটা Claude সেশন শুরু করলেন, কাজ করতে বসলেন, আর হঠাৎই দেখলেন Claude জানে না আপনার দল কীভাবে কাজ করে।

- সে জানে না আপনি Drizzle ব্যবহার করেন Prisma-র পরিবর্তে।
- জানে না টেস্ট ফাইল `__tests__/`-এ যায়।
- জানে না আপনার রিভিউ চেকলিস্টে ষোলটা নির্দিষ্ট চেক আছে।
- জানে না আপনি nested conditional-এর বদলে early return পছন্দ করেন।

তো প্রতিটা সেশনের প্রথম দশ মিনিট চলে যায় নিয়মকানুন আবার বলে দিতে। আরো খারাপ ব্যাপার হলো — কিছু একটা বলতে ভুলে গেলেন, Claude একটা ধারণা নিয়ে বসে যেটা আপনার স্ট্যান্ডার্ড ভাঙে। বারবার। একদম গ্রাউন্ডহগ ডের মতো, কিন্তু TypeScript নিয়ে।

এটাই মূল সমস্যা। প্রতিটা সেশন শূন্য থেকে শুরু হয়। Claude-র সাধারণ জ্ঞান আছে — TypeScript জানে, React জানে — কিন্তু আপনার দলের নিয়ম, আপনার স্ট্যাক, আপনার কনভেনশন — এসবের কিছুই মনে নেই।

Skills ঠিক এই সমস্যার সমাধান। Skill মানে `.claude/skills/`-এ রাখা একটা markdown ফাইল যেখানে আপনার পুরো প্রসেস লেখা থাকে — চেকলিস্ট, কনভেনশন, আউটপুট ফরম্যাট। একবার লিখলেন, আর যখনই প্রয়োজন on demand লোড হয়।

যখন আপনি `/req` এরকম slash command লিখেন, Claude সংশ্লিষ্ট skill ফাইল পড়ে আর instruction অনুযায়ী কাজ করে। আর কখনো আবার বলে দিতে হয় না। কোনো বিচ্যুতি হয় না। কোনো "আমি ভুলে গিয়েছিলাম আপনি টেস্ট ওই ফোল্ডারে চান" হয় না। Skill হলো আপনার আর agent-এর মধ্যে একটা চুক্তি।

তিনটা ধাপ। সহজ আর বারবার করার মতো।

প্রথম ধাপে আপনি slash command লিখেন। `/req` requirements-এর জন্য। `/arch` architecture-এর জন্য। `/tdd` test-driven implementation-এর জন্য। `/review` code review-এর জন্য। এটা Claude-কে বুঝিয়ে দেয় — এখন এই নির্দিষ্ট workflow-তে যাও। এগুলো Claude-র built-in command নয়, এগুলো আপনার custom skill, যে নামেই খুশি দিতে পারেন।

দ্বিতীয় ধাপে Claude skill ফাইল লোড করে। `.claude/skills/req/SKILL.md` অথবা যেটা command-এর সাথে মেলে সেটা পড়ে। ফাইলের ভেতরে থাকে প্রসেস ডেফিনিশন, চেকলিস্ট, আউটপুট ফরম্যাট, discipline নিয়ম — সবকিছু যা Claude-র লাগে আপনার মতো করে কাজটি করতে।

তৃতীয় ধাপে Claude instruction অনুসরণ করে। requirements skill Socratic interview চালায়। architecture skill data model আর API contract প্রস্তাব করে। TDD skill প্রথমে failing test লেখে, তারপর code, তারপর refactor। যতবার invoke করবেন, একই প্রসেস চলবে। consistent, repeatable, reproducible।

তিনটা বৈশিষ্ট্য মনে রাখবেন।

Dual-invocation। skill দুইভাবে trigger হতে পারে। আপনি নিজে থেকে slash command দিয়ে invoke করতে পারেন — আপনার সময়, আপনার নিয়ন্ত্রণে। অথবা Claude নিজেই স্বয়ংক্রিয়ভাবে invoke করতে পারে যখন সে মনে করে বর্তমান context-এ skill মানানসই — আপনার লেখা description field দেখে। তাই precise description এত গুরুত্বপূর্ণ — এটাই automatic invocation-এর trigger। আর যদি শুধুমাত্র ব্যবহারকারীর নিয়ন্ত্রণ চান, frontmatter-এ `disable-model-invocation: true` দিন। তাহলে auto-invocation সম্পূর্ণ বন্ধ হয়ে যাবে — skill তখন শুধু slash command-এই চলবে।

আর ঠিক বিপরীত ক্ষেত্রে — যদি চান skill শুধু Claude নিজেই ব্যবহার করবে, কোনো slash command ব্যবহারকারীর কাছে দেখাবে না — তখন `user-invocable: false` দিন। এটা কাজে লাগে যখন আপনি একটা project-conventions বা code-style skill বানাতে চান যেটা Claude background knowledge হিসেবে নিজে থেকে apply করবে। ব্যবহারকারীকে manually invoke করতে হবে না, Claude নিজেই বুঝে নেবে কখন relevant।

তিনটা mode মনে রাখুন। Default — কোনো flag নেই — মানে user আর Claude দুজনেই invoke করতে পারে। `disable-model-invocation: true` মানে শুধু slash command। `user-invocable: false` মানে শুধু Claude auto-invoke। কোনটা বেছে নেবেন তা নির্ভর করে skill-এর প্রকৃতির ওপর — side effect আছে এমন skill (deploy, commit, send) user-only রাখুন। background knowledge skill Claude-only রাখুন।

On-demand। skill লোড হয় না যতক্ষণ না আপনি command দেন। context window অপ্রয়োজনীয় ভারী হয় না। `.claude/skills/`-এ শান্তিতে বসে থাকে যতক্ষণ না দরকার হয়। এটা token বাঁচানোর একটা প্যাটার্ন — আর token-এর দাম আমরা সবাই জানি।

Version-controlled। skill আপনার repository-তেই থাকে। `.claude/skills/` git-এ commit করা। দলের সবার সাথে ভাগাভাগি করা। codebase-রই অংশ। skill আপডেট করলে সবাই পরবর্তী pull-এ আপডেট পায়। এভাবে পুরো দল জুড়ে convention একসাথে বাড়ানো যায়।

শেষে একটা advanced note — skill মিলিয়ে নেয় LLM reasoning দিয়ে description field-এর ওপর, keyword matching দিয়ে নয়। তাই description লিখুন যেটা বোঝায় কখন skill ব্যবহার করতে হবে, শুধু কী করে তা নয়। "Use when the user asks for a structured requirements interview" সবসময়ই জেতে "Requirements skill"-এর কাছে।

skill-কে একটা চুক্তি হিসেবে ভাবুন। আপনি প্রসেস একবার define করেন — ধাপ, চেকলিস্ট, আউটপুট ফরম্যাট, discipline নিয়ম। Claude প্রতিবার execute করে। consistently। ভোলে না। improvises না।

Live demo-তে পরে scratch থেকে প্রথম skill বানাবো। কিন্তু তার আগে, আমি দেখাতে চাই কোন skills আমরা build phase-এ ব্যবহার করবো — কারণ 5-phase framework-এর প্রতিটা phase-এর একটা করে skill আছে।
