# Slide 10 — The Problem With "Vibe Coding"

## On-Screen Content
- **Header**: The Hook · 10 / 81
- **Title**: The Problem With "Vibe Coding"
- **Cycle**: Prompt → Code → Hope → Ship → Bug → Repeat
- **Five Problems**:
  - 01 No Requirements — "Build a dashboard" — but which metrics? Which users? You operate on assumptions.
  - 02 No Architecture — Agent writes file by file with no blueprint. Every PR is a breaking change waiting to happen.
  - 03 No Task Breakdown — "Build the backend" is not a task. It is a wish.
  - 04 No Tests — Without tests, quality is unknown. Manual verification is a prayer, not a strategy.
  - 05 No Review — Bugs and security flaws go straight into your codebase.
- **Takeaway**: → Vibe coding produces toys. The 5-phase framework turns speed into engineering.

## Slide 10 — The Problem With "Vibe Coding" — Speaker Transcript (Bengali)

আগের slide-এ আমরা বললাম — orchestrator থাকলেও, parallel subagents থাকলেও, disciplined process না থাকলে আপনি শুধু extra steps সহ vibe coding করছেন। এখন চলুন exactly দেখি vibe coding কী, কেন এটা এত tempting, আর কোথায় এটা ভেঙে পড়ে।

আপনার প্রথম instinct probably এমন: "great, agent আছে, বলি কী চাই, আর দেখি পুরোটা build করে।" আপনি Claude বা Cursor open করলেন, লিখলেন "build me a dashboard," আর agent file after file generate করতে শুরু করলো এমন speed-এ যেটা কোনো human match করতে পারে না। Incredible দেখায়। Magic feel করে।

কিন্তু slide-এ যে cycle দেখতে পাচ্ছেন সেটা লক্ষ্য করুন: **Prompt → Code → Hope → Ship → Bug → Repeat।** "Hope" word-টা intentional। কারণ test নেই, review নেই, verification নেই — আপনি hope করছেন code কাজ করবে। আর যখন bug আসে — আর bug আসবেই — আপনি আবার same cycle-এ ফিরে যাচ্ছেন। এটা development process না। এটা gambling loop।

এখন কেউ বলতে পারে — "কিন্তু আগেও তো code-এ bug থাকতো। LLM আসার আগেও তো software কঠিন ছিল।" Absolutely। এটা সত্য। এই জন্যই আমরা decades ধরে methodology invent করেছি — Waterfall, Agile, Scrum, Extreme Programming। Sprint planning, code reviews, retrospectives — এগুলো meeting enjoy করি বলে করি না। এগুলো করি কারণ software production-এ survive করানো genuinely কঠিন। LLM সেই complexity কমায়নি — code generation-এর speed বাড়িয়েছে। আর speed বাড়লে discipline আরো বেশি দরকার, কম না।

কেন? কারণ agent fraction of context নিয়ে কাজ করে। সে আপনার deployment pipeline জানে না। Security posture জানে না। জানে না আপনার CEO গত মঙ্গলবার কোন feature কোন client-কে promise করেছেন। LLM-এর কাছে শুধু সেটুকুই আছে যেটা context window-এ fit করে — আর আমরা Slide 07-এ দেখলাম সেই window-এর hard limit আছে। তো আমরা এমন একটা system-কে, যে partial information নিয়ে কাজ করে, expect করছি complete, production-ready decision নিতে। এটা কাউকে শহরের অর্ধেক map দিয়ে rush hour-এ navigate করতে বলার মতো — সে একটা route বের করবে, কিন্তু সেটা optimal হওয়ার কোনো guarantee নেই।

---

এই gap-গুলো specific। Slide-এ পাঁচটা দেখতে পাচ্ছেন।

**Gap ০১ — No Requirements।** "Build a dashboard" — কিন্তু কোন metrics? কোন users? কোন time zones? কোন authentication model? Requirements ছাড়া agent assumption-এর ওপর চলে। আর assumption হলো সব bug-এর মা — কারণ assumption-এ build করা code technically "correct" থাকতে পারে, কিন্তু wrong problem solve করে।

**Gap ০২ — No Architecture।** Agent blueprint ছাড়া file by file লেখে। প্রতিটা file individually দেখলে fine দেখায়। কিন্তু file-গুলো একসাথে কোনো coherent structure follow করে না। প্রতিটা PR একটা potential breaking change। এটা floor plan ছাড়া room by room house বানানোর মতো — kitchen gorgeous, কিন্তু door টা closet-এর ভেতরে open হয়।

**Gap ০৩ — No Task Breakdown।** "Build the backend" কোনো task না। এটা একটা wish। Task specific হয়, testable হয়, bounded হয়। "Create a POST endpoint at /api/sessions that accepts userId and events array, validates with Zod, and returns 201" — এটা task। "Build the backend" — এটা birthday cake-এর মোমবাতিতে ফুঁ দিয়ে চাওয়া।

**Gap ০৪ — No Tests।** Test ছাড়া quality unknown। আপনি জানেন না code কাজ করে কি না — আপনি believe করেন কাজ করে। Manual verification কোনো strategy না — এটা দোয়া। আর দোয়া race condition catch করে না। মনে আছে Slide 08-এ আমরা বলেছিলাম — loopback-এর quality depend করে feedback signal-এর ওপর? Test না থাকলে signal নেই। Signal না থাকলে loopback meaningless। আপনি আবার one-shot territory-তে ফিরে গেলেন।

**Gap ০৫ — No Review।** Bug আর security flaw সরাসরি codebase-এ চলে যায়। Agent যে API key hardcode করলো? এখন production-এ। সেই SQL injection vulnerability? Live। Review ছাড়া আপনি code ship করছেন না — আপনি liability ship করছেন।

---

এই পাঁচটা gap-ই vibe coding-কে define করে। Speed আছে, output আছে, কিন্তু process নেই। আর process ছাড়া output-এর reliability zero।

এখন good news: speed আর discipline-এর মাঝে choose করতে হবে না। দুটোই পাওয়া যায়। Agent-এর speed থাকে — কিন্তু সেই speed-কে structure-এ channel করি। Requirements define করি। Architecture plan করি। Tasks break down করি। Test-first approach-এ implement করি। Review-এ verify করি।

এটাই 5-phase framework। আর পরের slide-এ আমরা exactly দেখবো প্রতিটা phase কী, কে own করে, আর কী deliverable বের হয়।
