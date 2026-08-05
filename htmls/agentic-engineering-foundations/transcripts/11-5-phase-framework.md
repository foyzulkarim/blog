# Slide 11 — The 5-Phase Agentic Framework

## On-Screen Content
- **Header**: The Hook · 11 / 81
- **Title**: The 5-Phase Agentic Framework
- **Lede**: Each phase has one owner and produces one deliverable. No phase is optional.
- **Table**:
  - 1 | Requirement Engineering | You | REQ document — what to build
  - 2 | System Architecture | You + Claude | ARCH doc — data models, APIs, modules
  - 3 | Task Generation | Claude | Task list with tests + scope + REQ trace
  - 4 | TDD Implementation | Claude | Working code + passing tests
  - 5 | Review & Merge | You + Claude | Approved PR — 16 parallel checks
- **Takeaway**: → Each phase has one owner and one deliverable. Discipline over speed.

## Slide 11 — The 5-Phase Agentic Framework — Speaker Transcript (Bengali)

আগের slide-এ আমরা vibe coding-এর পাঁচটা gap দেখলাম — no requirements, no architecture, no task breakdown, no tests, no review। এই slide সেই পাঁচটা gap-এর exact solution। পাঁচটা phase। প্রতিটার একটা owner। প্রতিটার একটা deliverable। কোনো phase optional না।

শুরুতে একটা principle বুঝে নিন। Agent-রা সবচেয়ে ভালো perform করে যখন তাদের clear role, clear scope, আর clear deliverable দেওয়া হয়। "Build the backend" দিলে সে struggle করবে — কারণ scope too broad, context too vague, success criteria undefined। কিন্তু "Generate a task list from this architecture document, where each task maps to a requirement and fits in a single session" দিলে? সে excel করবে। কারণ input defined, output defined, scope bounded। Framework-এর কাজ হলো প্রতিটা interaction-কে এই focused format-এ নিয়ে আসা।

---

**Phase ০১ — Requirement Engineering।** Owner: আপনি। শুধু আপনি। Claude এই phase-এ নেই। কেন? কারণ requirements হলো "কী build করতে হবে আর কেন" — এটা business decision, technical decision না। কোন problem solve করছেন, কোন users-এর জন্য, success কীভাবে measure করবেন, কোন constraints আছে — এগুলো আপনার domain knowledge, আপনার stakeholder conversation, আপনার judgment দিয়ে আসে। LLM-এর কাছে এই context নেই — সে আপনার organization জানে না, আপনার users জানে না, আপনার business priority জানে না। তাই এই phase human-only।

Deliverable হলো REQ document। এটা contract — আপনি কী build করছেন, কেন build করছেন, আর "done" দেখতে কেমন। সবকিছু এই document থেকে flow করে। এটা ভুল হলে পরের প্রতিটা phase সেই error compound করবে — architecture ভুল problem-এর জন্য design হবে, tasks ভুল architecture থেকে generate হবে, code ভুল tasks implement করবে। এটা ঠিক হলে? Agent-এর কাছে north star থাকে। প্রতিটা decision-এ সে এই document-এর against check করতে পারে।

**Phase ০২ — System Architecture।** Owner: আপনি আর Claude — collaboration। আপনি domain knowledge আনেন — এই system কোন existing infrastructure-এ বসবে, কোন integration দরকার, কোন compliance requirement আছে। Claude technical patterns আনে — data model কেমন হওয়া উচিত, API contract কী হবে, module boundaries কোথায় হবে, কোন design pattern fit করবে।

Deliverable হলো ARCH document। এটা blueprint — data models, API contracts, module boundaries, dependency graph। Quality bar কী? এত detailed যে আরেকজন developer — যে আপনার সাথে একটা conversation-ও করেনি — এই document পড়ে implement করতে পারে। যদি document পড়ে প্রশ্ন জাগে, document incomplete।

**Phase ০৩ — Task Generation।** Owner: Claude। সে ARCH document input হিসেবে নেয় আর specific, testable, bounded task-এ ভাগ করে। প্রতিটা task-এর একটা requirement-এর সাথে trace থাকে — কোন task কোন requirement fulfill করছে সেটা explicit। প্রতিটা task একটা session-এ fit করে — মনে আছে context window-এর limitation? Task এত ছোট যে agent পুরো context ধরে রাখতে পারে। কোনো task "build the backend" না। প্রতিটা task এমন — "implement the POST /sessions endpoint with Zod validation, PostgreSQL insert, and 201 response।"

এই phase-ই vibe coding আর engineering-এর মাঝে সবচেয়ে বড় difference তৈরি করে। কারণ task breakdown মানে প্রতিটা piece independently verifiable। কিছু ভুল হলে আপনি জানেন exactly কোন task-এ ভুল হয়েছে। Debug করা possible কারণ scope contained।

**Phase ০৪ — TDD Implementation।** Owner: Claude। Test-Driven Development — মানে test আগে, code পরে। Claude প্রথমে test লেখে যেটা fail করে — কারণ implementation এখনো নেই। তারপর minimum code লেখে যেটা test pass করায়। তারপর refactor করে — clean up, optimize, convention follow। Red, green, refactor।

কেন test-first? কারণ আমরা Slide 08-এ দেখেছি — loopback-এর quality depend করে feedback signal-এর ওপর। Test হলো সেই signal। Test আগে লেখা মানে — "done" কী সেটা code লেখার আগেই define করা। Agent জানে কখন সে successful, কখন না। Test ছাড়া — যেটা আমরা Slide 10-এ বললাম — সে অন্ধকারে কাজ করছে।

Deliverable: working code আর passing tests — দুটোই। Code আছে কিন্তু test নেই? Deliverable incomplete। Test pass করে কিন্তু test coverage low? Deliverable incomplete।

**Phase ০৫ — Review and Merge।** Owner: আপনি আর Claude — shared। Claude ষোলটা parallel check চালায় — security vulnerabilities, performance bottlenecks, style consistency, architecture compliance, error handling patterns, test coverage gaps, dependency issues, naming conventions — systematic, exhaustive। আপনি সেই review-এর output triage করেন। কোনটা critical, কোনটা minor, কোনটা intentional tradeoff। আপনি decide করেন। আপনি merge করেন — "probably fine" হলে না। Clean হলে। Confident হলে।

---

লক্ষ্য করুন একটা pattern। Phase 1: আপনি alone। Phase 2: collaboration। Phase 3 আর 4: Claude alone। Phase 5: collaboration আবার। Framework-টা trust gradually build করে — আপনি direction দেন, Claude execute করে, আপনি verify করেন। কোনো phase-এ agent unsupervised, unchecked কাজ করছে না।

আর আরেকটা গুরুত্বপূর্ণ point। এই framework-এ agent-কে পুরো project context window-এ hold করতে হয় না। শুধু current phase-এর context লাগে। Phase 3-তে সে ARCH document নিয়ে কাজ করছে — পুরো codebase-এর কথা ভাবতে হচ্ছে না। Phase 4-তে সে একটা specific task implement করছে — বাকি tasks-এর কথা ভাবতে হচ্ছে না। প্রতিটা phase-এ সে specialist — focused, bounded, effective। আর specialist generalist-কে প্রতিবার হারায়।

এটাই framework-এর core principle: discipline over speed। Speed আছে — agent প্রতিটা phase-এ fast। কিন্তু speed process-এর ভেতরে channeled। Structure আছে, accountability আছে, verification আছে।

এখন প্রশ্ন হলো — এই framework কি শুধু নতুন project-এর জন্য? যদি existing system-এ feature add করতে হয়? যদি bug fix করতে হয়? পরের slide-এ দেখবো — same framework, different entry points।
