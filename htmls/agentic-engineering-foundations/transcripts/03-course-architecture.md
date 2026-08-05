# Slide 03 — Course Architecture

## On-Screen Content
- **Header**: The Hook · 03 / 81
- **Title**: Course Architecture
- **Lede**: A five-part progression: theory → practice → pain → cure → mastery.
- **Cards**:
  - 1 The Hook — Understanding the framework and why process matters.
  - 2 Skills Intro — Just enough skill scaffolding to start building.
  - 3 The Build — A real project — phase by phase, every skill read before invoked.
  - 4 Problems We Hit — Guardrails and UI automation — introduced after you feel the pain.
  - 5 The Operating Environment — Settings, CLAUDE.md, rules, hooks, and advanced deep dives.
- **Takeaway**: → Theory → practice → pain → cure → mastery. A deliberate progression.

## Speaker Transcript (Bengali)

তো এখন আমরা problem জানি — আর এই course কীভাবে solve করতে চায় সেটাও জানি। চলুন দেখি কীভাবে exactly পৌঁছাবো সেখানে।

এই course-টা five-part journey হিসেবে structure করা। Random tips and tricks একসাথে ছুঁড়ে দেওয়া না — একটা deliberate progression যেটা আমাদের problem বোঝা থেকে, real project build করা, production-এ safely run করা — এই পর্যন্ত নিয়ে যাবে।

এইটা arc।

Part One — The Hook। আমরা এখন এখানেই আছি। Framework establish করছি। Process কেন matter করে। "Vibe coding" কেন fail করে। 5-phase discipline কীভাবে difference করে toys আর production code-এর মাঝে। এই section শেষে, আমরা principle-এ framework বুঝবো।

Part Two — Skills Intro। কিছু build করার আগে, আমরা core mechanics-এর সাথে পরিচয় হবো। Skill কী, কীভাবে create করতে হয়, কীভাবে Claude-র capability extend করে, আর token-saving patterns যেগুলো expensive workflow আর efficient workflow-এর মাঝে difference করে। Just enough to start building — কোনো fluff না, কোনো detour না।

Part Three — The Build। এটা course-র heart। আমরা একসাথে একটা real project build করবো — Agentic Sessions Dashboard — phase by phase, ঠিক যে framework-টা আমি বলেছি সেটা follow করে। Requirements। Architecture। Task generation। TDD implementation। Review and merge। প্রতিটা skill open করে read করা হবে, invoke করার আগে। আমরা discipline-কে action-এ দেখবো, শুধু theory-তে না।

Part Four — Problems We Hit। এখানেই teaching interesting হয়। Build-টা surface-এ smooth দেখাবে। কিন্তু behind the scenes, জিনিস ভুল হবে। Claude প্রায় একটা API key commit করে ফেলবে। Code test পাস করবে কিন্তু formatting standard fail করবে। আমরা UI manually check করবো — tedious, slow, inconsistent। আমরা আগে pain feel করবো। আর তখনই solution আসবে: automatic guardrails via hooks, আর UI automation via MCP। আমি intentionally guardrails upfront দিচ্ছি না, কারণ pain না feel করলে cure-র value বোঝা যায় না।

Part Five — The Operating Environment। শেষে, project build করে আর problem feel করার পর, আমরা configuration layer-এ deep dive করবো। Session hygiene। Permission modes। Settings hierarchy। CLAUDE.md — যেটা probably সবচেয়ে powerful আর সবচেয়ে underutilized lever আমাদের কাছে। Hooks — যেগুলো দিয়ে আমরা Claude-র behavior automate করতে পারবো, শুধু request করে না বরং system-level-এ enforce করে। Conditional rules। আর এর বাইরেও কিছু advanced deep dive আছে — context compaction, cost profiling, multi-agent orchestration patterns — যেগুলো আমাদের beginner থেকে practitioner-এ নিয়ে যাবে। সবকিছু যা লাগবে আমাদের নিজেদের agentic environment architect করতে, শুধু এই tutorial follow করতে না।

Pattern-টা লক্ষ্য করুন — আর এই pattern-এর একটা নাম আছে। Theory → practice → pain → cure → mastery। সব tooling front-load করা হয় না। just enough নিয়ে শুরু করি, build করি, জিনিস break হতে দিই, তারপর fix করি — সেই ক্রমে। এটা deliberate। Theory without practice entertainment, education না। আর understanding ছাড়া protection শুধু magic spell — আমরা জানবো না কেন কাজ করে, তাই জানবো না কখন break হয়।

এই course শেষে, আমরা শুধু agentic engineering কীভাবে করতে হয় তা জানবো না। আমরা জানবো প্রতিটা piece কেন আছে। আর এটাই আমাদের dangerous করে — best way possible-এ।

চলুন Act One শুরু করি।
