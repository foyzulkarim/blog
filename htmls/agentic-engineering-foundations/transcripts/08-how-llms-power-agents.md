# Slide 08 — How LLMs Power Agents

## On-Screen Content
- **Header**: The Hook · 08 / 81
- **Title**: How LLMs Power Agents
- **Lede**: The LLM is the brain. The agent is the body.
- **Four Cards**:
  - 01 Intent — You state what you want in natural language. The LLM parses words into a structured goal. (LLM parses → structured goal)
  - 02 Breakdown — The LLM decomposes the goal into steps. Route → schema → validation → query → errors. (LLM plans → executable steps)
  - 03 Execution — The LLM generates the actual code — functions, SQL migrations, test cases. (LLM builds → working code)
  - 04 Loopback — The LLM evaluates the result. Tests pass? Secure? Generates fix if needed. (LLM checks → adapts → repeats)
- **Note**: Also known as: perceive-plan-act-observe · ReAct · OODA — same pattern, different names.
- **Takeaway**: → The quality of the loop is determined by the quality of the intent. Vague prompts → vague breakdown → vague code. The framework gives you structure. Specificity gives you precision.

## Slide 08 — How LLMs Power Agents — Speaker Transcript (Bengali)

আগের slide-এ আমরা LLM-কে individually বুঝলাম — কী করতে পারে, কীভাবে কাজ করে, কোথায় limit। এখন দেখবো এই LLM agent-এর ভেতরে কীভাবে কাজ করে — brain আর body কীভাবে connect হয়।

Slide-এ আপনি দেখতে পাচ্ছেন চারটা step — Intent, Breakdown, Execution, Loopback। এটা একটা loop। আর শুরুতেই বলে রাখি — এই loop-টা নতুন concept না। Different field-এ different নামে এটা আছে। AI research-এ একে বলে ReAct — Reason plus Act। Cognitive science-এ perceive-plan-act-observe। Military strategy-তে OODA — Observe, Orient, Decide, Act — যেটা Colonel John Boyd formalize করেছিলেন fighter pilot-দের decision-making-এর জন্য। তাঁর theory ছিল — dogfight-এ যে pilot fastest loop চালাতে পারে, সে জেতে। Same principle এখানে apply হয়: agent যত fast আর accurately এই loop চালাতে পারে, output তত ভালো।

নাম যাই হোক, pattern একই। চলুন প্রতিটা step detail-এ দেখি।

---

**Step ০১ — Intent।** আপনি natural language-এ বলেন কী চান। "Build me an API endpoint that ingests session data।" এটুকুই আপনার কাজ — intent express করা। এরপর LLM আপনার words parse করে। Training-এ billions of code example দেখে সে জানে API endpoint-এর structure কেমন হয়, session data মানে কী ধরনের data, ingestion-এর typical pattern কী। সে আপনার human-language intent-কে একটা structured, machine-actionable goal-এ translate করে।

এখন এখানেই প্রথম critical point। Intent যত specific, translation তত accurate। "Build me an API" আর "Build me a POST endpoint at /api/sessions that accepts JSON with userId, timestamp, and events array, validates with Zod, and stores in PostgreSQL" — দুইটা থেকে LLM দুই রকম output দেবে। প্রথমটা থেকে সে guess করবে। দ্বিতীয়টা থেকে সে execute করবে। এই difference-টা মনে রাখবেন — course-এর বাকি অংশে বারবার ফিরে আসবে।

**Step ০২ — Breakdown।** LLM goal-টাকে executable steps-এ decompose করে। Route handler লাগবে। Request-এর জন্য schema define করতে হবে। Validation logic লাগবে। Database query লিখতে হবে। Error handling দরকার। LLM এই steps-গুলো generate করে কারণ training data-তে সে হাজার হাজার similar implementation দেখেছে — সে জানে এই ধরনের কাজে typically কী কী step থাকে। এটাকে আমরা loosely "planning" বলি, কিন্তু precise হতে চাইলে — LLM একটা plan generate করে pattern-এর basis-এ, actively plan করে না যেভাবে আপনি বা আমি করি। Distinction subtle, কিন্তু important। কারণ pattern-based generation মানে — familiar pattern-এ breakdown excellent হবে, unfamiliar বা novel architecture-এ সে struggle করবে। আপনার framework-এর কাজ হলো breakdown-টাকে familiar territory-তে রাখা।

**Step ০৩ — Execution।** LLM actual code generate করে। TypeScript functions। SQL migrations। Test cases। এটা সেই part যেটা সবাই দেখে আর impressed হয়। আর হওয়ারই কথা — একজন experienced engineer-এর মতো যে এই ধরনের pattern শতবার implement করেছে, LLM clean, functional code produce করতে পারে।

কিন্তু এখানে সবচেয়ে বড় danger লুকিয়ে আছে। LLM-এর confidence level output-এর correctness-এর সাথে correlated না। সে ভুল code exactly same confidence-এ লিখবে যেভাবে correct code লেখে। কোনো hesitation নেই, কোনো "আমি sure না" নেই। Production-এ break করবে এমন code সে same polish দিয়ে deliver করবে যেটা perfectly working code-এ দেয়। এই জন্যই শুধু execution যথেষ্ট না — আপনার loopback লাগবে।

**Step ০৪ — Loopback।** LLM নিজের output evaluate করে। Test pass করছে? Architecture-এর সাথে consistent? Security vulnerability আছে? কিছু fail করলে সে fix generate করে, আবার execute করে, আবার evaluate করে। এটা self-correction loop — আর এটাই agent-কে one-shot generation থেকে আলাদা করে।

কিন্তু — আর এটা critical — loopback-এর quality সম্পূর্ণ নির্ভর করে feedback-এর quality-র ওপর। যদি test না থাকে, loopback-এর কিছু check করার নেই। যদি linting না থাকে, style violation ধরার উপায় নেই। যদি type checking না থাকে, subtle bug invisible থাকবে। Loopback শুধু তখনই কাজ করে যখন সে meaningful signal পায়। কোনো signal না থাকলে — কোনো correction না। আর কোনো correction না থাকলে — আপনি আবার one-shot territory-তে ফিরে গেলেন।

---

তো পুরো picture-টা দাঁড়ালো এরকম: LLM হলো brain — সে pattern match করে, code generate করে, output evaluate করে। Agent হলো body — সে file system-এ লেখে, test runner চালায়, tool call করে, result collect করে। LLM ছাড়া agent একটা empty shell — হাত-পা আছে কিন্তু কী করতে হবে জানে না। Agent ছাড়া LLM একটা chatbot — brilliant analysis দিতে পারে কিন্তু একটা file-ও create করতে পারে না। দুইটা একসাথে? এমন একটা system যেটা আসলে software build করতে পারে।

কিন্তু এই পুরো loop-এর একটা absolute truth আছে: quality of the loop is determined by the quality of the intent। Vague prompt দিলে vague breakdown হবে। Vague breakdown থেকে vague code আসবে। Vague code-এ loopback-এরও কিছু করার থাকবে না — কারণ "কী correct" সেটাই define করা হয়নি। Garbage in, garbage out — এটা computing-এর oldest principle, আর LLM-এর যুগেও equally true।

Framework আপনাকে structure দেয় যাতে intent vague না হয়। Specificity আপনাকে precision দেয় যাতে প্রতিটা step-এ LLM জানে exactly কী করতে হবে।

পরের slide-এ আমরা এই loop-কে আরেকটু zoom out করে দেখবো — agent শুধু একটা loop চালায় না, সে orchestrate করে। কীভাবে? সেটাই দেখবো।
