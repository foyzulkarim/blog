# Slide 13 — Reflection

## On-Screen Content
- **Header**: Reflection · 13 / 81
- **Title**: What Did We Learn?
- **Reflection Points**:
  1. One-shot prompts fail — complex work needs agents.
  2. "Vibe coding" skips steps — 5 phases give AI a process.
  3. The framework adapts — same discipline, different entry points.
- **Takeaway**: → Process beats prompts. Next: the tools that make this process executable.

## Slide 13 — What Did We Learn? — Speaker Transcript (Bengali)

"The Hook" section শেষ হচ্ছে তিনটা takeaway দিয়ে — এগুলো এই section-এর core, আর বাকি পুরো course এই তিনটার ওপরেই দাঁড়াবে।

প্রথম takeaway — one-shot prompt দিয়ে complex কাজ হয় না। কেন হয় না সেটা আমরা দেখলাম — context limited থাকে, কোনো planning নেই, কোনো verification নেই। তার solution হলো agent, মানে একটা orchestrator যে পুরো কাজটাকে ভেঙে ফেলে, ছোট ছোট ধাপে organize করে, result verify করে, আর দরকার হলে নিজেই correct করে নেয়। Chatbot না, autocomplete না — process-driven agent।

দ্বিতীয় takeaway — AI-কে একটা process দিতে হয়, আর সেই process হলো এই 5 phases। "Vibe coding"-এ পাঁচটা জায়গায় gap থাকে — requirements নেই, architecture নেই, task breakdown নেই, tests নেই, review নেই। 5-phase framework-এ প্রতিটা gap-এর বিপরীতে একটা করে phase আছে, প্রতিটা phase-এর একটা owner আছে, একটা deliverable আছে। কোনো phase optional না — কারণ প্রতিটা phase পরের phase-এর ভিত্তি।

তৃতীয় takeaway — framework adapt করে, কিন্তু mindset বদলায় না। Situation বুঝে আপনি phase swap করবেন, optimize করবেন, কখনো কখনো skip-ও করবেন। যেমন একটা markdown file লিখতে TDD করার কোনো মানে হয় না — সেটা skip করা সঠিক সিদ্ধান্ত। কিন্তু সেই skip টা conscious হতে হবে। মাথায় ভাবতে হবে — এই phase কি এখানে apply হয়? না হলে কেন না? নিজেকে সেই justification দিতে হবে। Mindlessly skip করা আর reasoned skip করা — এই দুটো এক জিনিস না। Framework flexible, কিন্তু প্রতিটা phase নিয়ে consciously reason করার discipline — সেটা কোনো situation-এ বদলায় না।

---

এখন একটু দাঁড়ান, এই তিনটা takeaway-এর ভেতরে যে common thread আছে সেটা notice করুন। প্রতিটার মধ্যে same principle কাজ করছে — আপনি যত বেশি execution agent-এর কাছে দেবেন, আপনার specification তত বেশি precise হতে হবে। Agent আপনার মন পড়তে পারে না, সে আপনার instruction পড়ে। Vague instruction দিলে vague code পাবেন, precise instruction দিলে precise code পাবেন। Slide 08-এ বলেছিলাম — quality of the loop is determined by the quality of the intent। সেই একই principle এখানে পুরো framework-এর level-এ কাজ করছে।

এই জায়গা থেকেই একটা প্রশ্ন আসে, যেটা অনেকে করেন — "AI কি software engineer-দের replace করবে?" এই প্রশ্নটা নিয়ে আমার perspective টা বলি। আমি মনে করি যেটা replace হবে সেটা হলো undisciplined coding। যে engineer precisely specify করতে পারে, robust architecture design করতে পারে, systematically review আর validate করতে পারে — সে replace হচ্ছে না, সে amplify হচ্ছে। তার output multiply হচ্ছে। 5-phase framework সেই amplification-এর structure — আর সেটাই আমরা এই section জুড়ে দেখলাম।

---

তাহলে এটাই ছিল "The Hook" — framework কী, কেন দরকার, আর কীভাবে adapt করে। কিন্তু framework একা যথেষ্ট না। Framework বলে কী করতে হবে, কিন্তু আমাদের এমন একটা tool দরকার যেটা দিয়ে এই পুরো process টা agents-এর সাহায্যে actually execute করা যাবে — requirements থেকে শুরু করে review পর্যন্ত। আমাদের এই section এখানেই শেষ। পরের section-এ আমরা সেই tool-এ deep dive করব — theory না, সরাসরি hands-on।
