# Slide 19 — Skill Design Patterns

## On-Screen Content
- **Header**: Skills Intro · Design · 19 / 81
- **Title**: Skill Design Patterns
- **Lede**: Problem — Skills can be ignored or bloated. Four patterns fix accuracy and tokens.
- **Pattern Cards**:
  - 01 Lead with the Rule (Accuracy) — LLMs over-attend to start/end. Buried instructions get lost. Put the #1 rule at the TOP. Output format at the BOTTOM. Bookend.
  - 02 One Skill Per Workflow (Tokens) — Mega-skills load everything. Most is irrelevant. req.md · arch.md · tdd.md · review.md. Load only what you need.
  - 03 Use @path, Never Paste (Tokens) — Pasting docs into skills bloats context permanently. Write @docs/ARCH.md. Skill stays lean; Claude reads it at invocation.
  - 04 Explicit Output Tags (Accuracy) — Vague instructions produce vague results. Use <output_format>, <acceptance_criteria>. Higher precision than prose.
- **Bonus Pattern 05**: Write Descriptions as Trigger Conditions — The description field is evaluated by LLM reasoning — not keyword matching — to decide when to auto-invoke. Write: "Use when the user asks for a structured requirements interview" — not: "Requirements skill" (manual invocation only).
- **Takeaway**: → Design for the LLM's attention pattern. Accuracy is a decision.

## Speaker Transcript (Bengali)

এই পর্যন্ত আমরা দেখলাম কীভাবে skill লিখতে হয়, কীভাবে invoke করা যায়, আর বাইরের script দিয়ে কীভাবে skill-কে হালকা রাখা যায়। কিন্তু skill লেখা আর skill design করা — এই দুটো এক জিনিস না। যে skill Claude ঠিকঠিক follow করে, আর যে skill নিয়ে Claude হিমশিম খায় — পার্থক্যটা কিছু design principle-এ লুকিয়ে আছে যেগুলো আমরা এখন একসাথে explore করতে পারি।

সবচেয়ে গুরুত্বপূর্ণ যেটা — সেটা হলো LLM-এর attention pattern বোঝা। আমরা আগেই দেখেছি lost-in-the-middle effect — model শুরুতে আর শেষে যা পায় সেটায় বেশি মনোযোগ দেয়, আর মাঝখানটা মিলিয়ে যায়। তো যদি আমাদের সবচেয়ে important rule-টা skill-এর মাঝখানে চাপা থাকে, model-এর কাছে সেটা প্রায় অদৃশ্য হয়ে যায় — চুক্তির সবচেয়ে গুরুত্বপূর্ণ শর্ত page seventeen-এ রাখার মতো, কেউ এতদূর পড়ে না।

তাই আমাদের উচিত সবচেয়ে গুরুত্বপূর্ণ জিনিসটা দুপাশে সাজিয়ে রাখা — একটা sandwich pattern তৈরি করে ফেলা। Number one discipline rule সবার উপরে রাখা যাক, frontmatter-এর পরেই। কোনো preamble না, কোনো exception না। requirements skill-এর জন্য এটা "WHAT not HOW।" TDD skill-এর জন্য "red before green।" তারপর নিচে output format রাখা যাক — deliverable-এর exact structure। এটা Claude-কে skill-এ ঢোকার সময় সবচেয়ে গুরুত্বপূর্ণ constraint জানায়, আর বের হওয়ার সময় ঠিক কী produce করতে হবে তাও জানায়। উপরে critical rule, মাঝখানে process, নিচে output format — এই bookend pattern টা accuracy-এর সবচেয়ে বড় secret।

এবার token-এর দিকটাও একবার দেখা যাক। Temptation অনেক বড় — একটা mega-skill বানিয়ে ফেলা যেটা সবকিছু cover করে। requirements, architecture, tasks, tests, review — সব একটা file-এ। কিন্তু এটা ছবি ঝুলাতে truck size-এর toolbox নিয়ে আসার মতো — প্রতিবার সবকিছু লোড হয়, অথচ একটা phase-এর সময় বাকি গুলোর দরকারই থাকে না।

তাই আমাদের উচিত এটাকে ভাগ করে ফেলা। যেমন requirements এর জন্য আমরা বানাতে পারি req.md, architecture এর জন্য arch.md, implementation এর জন্য tdd.md, আর review এর জন্য review.md। শুধু যা লাগে যখন লাগে তখনই লোড করা যাক — good code-এ যেমন modularity কাজ করে, skill-এও ঠিক তেমনি।

তৃতীয় pattern টা বাইরের file নিয়ে — আর এটা খুবই সহজে ignore করা হয়। যখন skill-এর কোনো document refer করতে হয়, তখন আমাদের উচিত paste না করে path দেওয়া। যেমন লিখতে পারি: `Refer to @docs/ARCH.md for the architecture specification.` Skill file-এ content নেই বলে নিজে হালকা থাকে, আর Claude invoke করার সময় Read tool দিয়ে file-টা পড়ে নেয়। information পাওয়া যায়, কিন্তু skill definition-এ permanently embed হয়ে থাকে না — library card রাখার মতো, বই যেখানে আছে সেখানেই থাকে, আমাদের ব্যাগে নয়।

চতুর্থ pattern — explicit output format tag ব্যবহার করা। অস্পষ্ট instruction দেয় অস্পষ্ট output। যদি skill বলে "write good requirements," Claude improvise করে। কিন্তু যদি বলে `<output_format><goal /></output_format>` তারপর `<acceptance_criteria><criterion /></acceptance_criteria>`, তাহলে mechanical precision-এ সেই structure অনুসরণ করে। XML-style tag অস্পষ্টতা দূর করে, আর অস্পষ্টতা precision-এর শত্রু — এটা কোনো magic না, এটা clarity।

আর একটা pattern আছে যেটা slide-এ bonus হিসেবে দেওয়া — কিন্তু আসলে অনেক গুরুত্বপূর্ণ। সেটা হলো description field-টা trigger condition হিসেবে লেখা। description LLM reasoning দিয়ে evaluate হয়, keyword matching না — auto-invoke করার সময় সিদ্ধান্ত নেওয়ার জন্য। তো "Use when the user asks for a structured requirements interview" লিখলে Claude-কে ঠিক বলে দেওয়া হয় কখন লোড করতে হবে। কিন্তু "Requirements skill" লিখলে Claude-কে কিছুই বলা হয় না — একটা কাজে লাগে, আরেকটা ধুলো জমায়।

সব মিলিয়ে একবার দেখা যাক — দুইটা pattern accuracy-এর জন্য: গুরুত্বপূর্ণ instruction দুপাশে রাখা, আর explicit format tag ব্যবহার করা। দুইটা token-এর জন্য: একটা skill একটা workflow-এর জন্য, আর `@path` দিয়ে file reference করা। আর bonus হিসেবে description-টা trigger condition হিসেবে লেখা।

এগুলো nice-to-have না। এগুলো পার্থক্য করে skill যেটা কাজ করে আর যেটা প্রায় কাজ করে। skill যেটা pennies খরচ করে আর যেটা dollars। Claude-কে ঠিকঠিক process অনুসরণ করতে বলা আর দরকারের সময় improvise করতে দেওয়া — এই দুটোর মাঝে পার্থক্যটা আসলে আমাদের design decision-এর। Accuracy accident না — decision।
