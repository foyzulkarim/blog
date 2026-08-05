# Slide 09 — The Agent as Orchestrator

## On-Screen Content
- **Header**: The Hook · 09 / 81
- **Title**: The Agent as Orchestrator
- **Lede**: From single-intent assistants to purpose-based orchestrators that coordinate parallel subagents.
- **Left Panel — Sequential Skills**: Pipeline of REQ → ARCH → TASKS → TDD → REVIEW. Ordered workflows — one step feeds the next.
- **Right Panel — Parallel Subagents**: Subagent 1 (Database schema), Subagent 2 (API parser), Subagent 3 (Error handling), Subagent 4 (Test suite). Orchestrator coordinates · integrates · verifies.
- **Takeaway**: → Scales with the problem: small task → 1 subagent · complex system → 10 subagents, coordinated, verified.

## Slide 09 — The Agent as Orchestrator — Speaker Transcript (Bengali)

আগের slide-এ আমরা দেখলাম LLM আর agent মিলে কীভাবে একটা loop চালায় — intent, breakdown, execution, loopback। এখন প্রশ্ন হলো — এই loop কি সব কাজের জন্য enough?

চলুন একটা simple example দিয়ে শুরু করি। আপনি Claude open করলেন, লিখলেন "write me a function that validates an email address।" পাঁচ সেকেন্ডে clean, working code পেলেন। কাজ হয়ে গেলো। কেন? কারণ পুরো problem একটা context window-এ fit করে। Intent clear। Scope ছোট। একটা prompt, একটা response — single loop-ই যথেষ্ট।

এবার scale বাড়ান। "Build me a session tracking dashboard backend।" এখন কী হয়? একটা LLM call-এ পুরো task hold করা possible না। Database schema আলাদা concern। API layer আলাদা। Authentication আলাদা। Validation আলাদা। Test coverage আলাদা। প্রতিটা piece isolated ভাবে generate করলে হয়তো individually ঠিক দেখাবে। কিন্তু একসাথে রাখলে? Fit করবে না। Schema-র field name আর API-এর expected field আলাদা হবে। Error handling-এর convention এক file-এ এক রকম, আরেক file-এ আরেক রকম। এটা এমন — চারজন carpenter যারা কখনো একে অপরের সাথে দেখা করেনি, আলাদা আলাদা ঘরে বসে একটা house-এর door বানাচ্ছে। প্রতিটা door craftsmanship-এ excellent। কিন্তু যখন house-এ লাগাতে যাবেন — কোনো frame-এ fit করবে না।

এই problem-এর solution হলো orchestration। আর এখানেই agent single-intent assistant থেকে orchestrator-এ evolve করে।

Orchestrator agent নিজে code লেখে না। নিজে test চালায় না। তার কাজ হলো coordinate করা — কোন কাজ কোন order-এ হবে, কে কী করবে, আর output গুলো একসাথে consistent কি না সেটা verify করা। সে simultaneously project manager, architect, আর quality gate।

---

Slide-এ দুইটা pattern দেখতে পাচ্ছেন — বাম দিকে sequential, ডান দিকে parallel। দুইটাই orchestration-এর tool।

**Sequential skills** হলো ordered pipeline যেখানে একটা step-এর output সরাসরি পরের step-এর input। আমাদের 5-phase framework exactly এই pattern follow করে: Requirements phase define করে কী build করতে হবে। সেই output Architecture phase-এ যায় — কীভাবে build করতে হবে। Architecture থেকে আসে Task breakdown — কোন order-এ, কোন granularity-তে। Tasks feed করে TDD phase-এ — test-first approach-এ actual implementation। আর সবশেষে Review — code কি correct, secure, maintainable, consistent? প্রতিটা phase-এর defined input আছে, defined output আছে। কোনো phase skip করার সুযোগ নেই কারণ পরের phase-এর input আগের phase-এর output-এর ওপর depend করে। এটা assembly line — predictable, reproducible, auditable।

**Parallel subagents** হলো ভিন্ন approach — একই সময়ে multiple agent problem-এর ভিন্ন ভিন্ন অংশে কাজ করে। Slide-এ example দেখতে পাচ্ছেন: Subagent 1 database schema design করছে। Subagent 2 API parser লিখছে। Subagent 3 error handling তৈরি করছে। Subagent 4 test suite generate করছে। চারজন independently কাজ করছে — কিন্তু orchestrator ওপর থেকে coordinate করছে।

এই coordination part-টা trivial না। Orchestrator-কে ensure করতে হয় — schema-র field name আর API parser-এর expected fields match করছে কি না। Error handling-এর pattern সব subagent-এ consistent কি না। Test suite actual implementation-এর against চলছে কি না, কোনো outdated assumption-এর against না। কিছু দুই subagent-এর মাঝে crack-এ পড়ে যাচ্ছে কি না — যেমন একজন assume করছে userId string, আরেকজন assume করছে number।

---

এটাকে একটু ভিন্নভাবে ভাবুন। Sequential হলো relay race — একজন দৌড়ায়, baton পরেরজনকে দেয়, পরেরজন দৌড়ায়। Speed limited by each leg, কিন্তু coordination simple — baton হাতে পৌঁছালেই হলো। Parallel হলো orchestra — সবাই একসাথে বাজাচ্ছে, ভিন্ন instrument, ভিন্ন part, কিন্তু conductor ensure করছে সবাই same tempo-তে, same key-তে, same piece-এ আছে। Orchestra ছাড়া conductor? Silence। Conductor ছাড়া orchestra? Noise।

আর এখানে scaling-এর beauty আসে। Orchestrator problem-এর complexity-র সাথে scale করে। ছোট task? একটা subagent, একটা loop, done। Medium feature? তিনটা subagent parallel-এ, orchestrator integrate করছে। Complex distributed system? দশটা subagent, multiple phase, coordinated, verified, integrated। Same pattern — শুধু scale বদলায়।

---

কিন্তু — আর এটা দিয়ে এই group-এর slides শেষ করবো — orchestrator থাকলেও, parallel subagents থাকলেও, fancy tools থাকলেও — disciplined process না থাকলে আপনি শুধু extra steps সহ vibe coding করছেন। আরো sophisticated vibe coding, কিন্তু vibe coding nonetheless। Output unpredictable। Quality inconsistent। Debugging impossible কারণ কে কোন decision কেন নিলো সেটার কোনো trace নেই।

Process-ই vibe coding আর engineering-এর মাঝে line draw করে। আর সেই process — 5-phase framework — এটাই আমরা এরপর detail-এ দেখবো।
