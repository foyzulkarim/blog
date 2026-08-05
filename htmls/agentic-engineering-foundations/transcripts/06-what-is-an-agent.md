# Slide 06 — What Is an Agent?

## On-Screen Content
- **Header**: The Hook · 06 / 81
- **Title**: What Is an Agent?
- **Lede**: Problem — One-shot prompts fail on complex tasks. Every LLM call has limited context, no planning, and no verification.
- **Concept**: An Agent is an intelligent orchestrator that decomposes work and decides what to do next.
- **Diagram**: Agent (Orchestrator: decomposes · decides · verifies) → Sequential Skills (ordered, predictable workflows) + Parallel Subagents (fast, scalable execution)
- **Takeaway**: → Agents decompose work into sequential skills or parallel subagents. The fundamental building block.

## Speaker Transcript (Bengali)

তো — agent জিনিসটা আসলে কী? এই word-টা আপনি সব জায়গায় শুনবেন — AI agent, coding agent, autonomous agent — আর বেশিরভাগ definition হয় too vague, না হয় too academic। আমি চাই আপনি এই slide-এর পরে কাউকে এক লাইনে বোঝাতে পারেন agent কী।

সবচেয়ে simple ভাবে বললে: agent হলো একটা system যেটা একটা goal receive করে, সেই goal-কে ছোট ছোট steps-এ ভাঙে, execute করে, result evaluate করে, আর দরকার হলে নিজেকে correct করে। এটা একটা instruction blindly run করে না — এটা decide করে কোন steps লাগবে, কোন order-এ লাগবে, আর কখন adjust করতে হবে।

এখন এই "decide করে" part-টা নিয়ে সতর্ক থাকতে হবে। Agent যখন "decide" করে, সে কিন্তু মানুষের মতো চিন্তা করছে না। ভেতরে একটা large language model আছে যেটা pattern matching-এর মাধ্যমে statistically সবচেয়ে likely next step predict করছে। কিন্তু practically যেটা হয় সেটা decision-making-এর মতোই behave করে — সে context দেখে, option weigh করে, আর একটা path choose করে। তাই আমরা এটাকে orchestration বলি।

---

এই orchestration part-টাই agent-কে script থেকে fundamentally আলাদা করে। Script every time same steps run করে — input যাই হোক। আপনি একটা bash script লিখলেন যেটা build করে, test চালায়, deploy করে। যদি test fail করে, script হয় থেমে যায়, না হয় blindly পরের step-এ চলে যায়। সে জানে না fail কেন হলো, কী fix করতে হবে।

Agent অন্যভাবে কাজ করে। Test fail করলে সে error message পড়ে, code inspect করে, probable cause identify করে, fix generate করে, আবার test চালায়। এটা railroad track আর GPS-এর মতো — track শুধু একদিকে যায়, কোনো বাধা আসলে আটকে যায়। GPS recalculate করে যখন আপনি wrong turn নেন বা রাস্তা বন্ধ থাকে।

---

আপনি probably এই limitation নিজে experience করেছেন। ধরুন আপনি Claude-এ বা ChatGPT-তে একটা complex prompt দিলেন — "build me a session tracking backend with Redis, JWT auth, and rate limiting।" আর পেলেন একটা single file। হয়তো দুইটা। Code দেখতে impressive। কিন্তু কোনো test নেই। Error handling আছে কিন্তু আপনার project-এর convention follow করে না। Architecture আপনার বাকি system-এর সাথে fit করে না। Rate limiting implementation-টা naive — production-এ কাজ করবে না।

এটাই one-shot ceiling। একটা prompt, একটা response, কোনো verification নেই, কোনো iteration নেই। Simple, isolated task-এর জন্য এটা fine। কিন্তু যেকোনো complex কাজ — যেখানে multiple files, multiple concerns, multiple decisions involved — সেখানে one-shot ঝড়ের মাঝে তিরপালের মতো ছিঁড়ে যায়।

---

Solution হলো agent pattern। আর slide-এ দেখতে পাচ্ছেন, agent দুইভাবে কাজ organize করে।

**প্রথমটা: sequential skills** — ordered workflow যেখানে একটা step-এর output পরের step-এর input হয়। আমাদের 5-phase framework-এর কথা চিন্তা করুন: requirements phase-এ আপনি define করলেন কী build করতে হবে। সেই output architecture phase-এ feed করলো — কীভাবে build করতে হবে। Architecture থেকে বের হলো task breakdown — কোন order-এ build করতে হবে। Tasks feed করলো implementation-এ — actual code। আর implementation-এর পরে review — code কি correct, secure, maintainable? প্রতিটা step-এর clear input আছে, clear output আছে। এটা একটা pipeline — predictable, reproducible, auditable।

**দ্বিতীয়টা: parallel subagents** — একই সময়ে multiple agent problem-এর ভিন্ন ভিন্ন অংশে কাজ করে। ধরুন আপনি একটা feature build করছেন। একটা agent database schema design করছে। আরেকটা API route আর validation logic লিখছে। আরেকটা test suite generate করছে। এরা independently কাজ করছে, কিন্তু একটা orchestrator আছে যে coordinate করছে — ensure করছে schema আর API consistent আছে, test গুলো actual implementation-এর against চলছে। এটা construction site-এর general contractor-এর মতো — plumber, electrician, carpenter সবাই একসাথে কাজ করছে, কিন্তু contractor ensure করছে plumber-এর pipe electrician-এর wire-এর মধ্য দিয়ে যাচ্ছে না।

---

এই দুইটা pattern — sequential আর parallel — এই পুরো course জুড়ে আমরা বারবার দেখবো আর apply করবো। এগুলো agentic engineering-এর fundamental building block।

কিন্তু agent-এর orchestration করতে হলে একটা brain লাগে — যেটা natural language বুঝবে, code generate করবে, decision নেবে। সেই brain হলো large language model।

পরের slide-এ আমরা দেখবো LLM exactly কীভাবে কাজ করে আর agent-এর ভেতরে এর role কী।
