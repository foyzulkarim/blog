# Slide N-21L — Spend Fewer Tokens, Do More

## On-Screen Content
- **Header**: Under the Hood · Working Habits · N-21L
- **Title**: Spend Fewer Tokens, Do More
- **Lede**: Everything so far was the machine. Here's how you work it without bleeding tokens — habits that fall straight out of how context and caching actually behave.
- **Body (grid cols-2, four habits)**:
  1. Stable first, volatile last — keep unchanging context (system prompt, CLAUDE.md, instructions) at the front; let only the tail change. Editing early context mid-session invalidates the cache from that point on. *(from N-21H1 prompt caching)*
  2. Don't pre-load "just in case" — every token is re-sent and re-billed *every turn*. Dumping whole files or giant context up front costs you on all subsequent turns. Let the agent read on demand. *(from N-21C statelessness + N-21E growing loop)*
  3. Keep the window lean — a focused session with a small, relevant window beats a sprawling one — both for cost and for quality. *(from N-21B finite budget)*
  4. Mind Bengali weight — Bengali tokenizes heavier than English. Long Bengali prompts cost more tokens than they look — tighten them when it matters. *(callback to N-21A)*
- **Takeaway**: → These are the *habits* — they fall straight out of how context and caching behave. The *commands* that enforce them — `/compact`, `/clear`, `/cost` — get their full treatment in the Operating Environment.

## Speaker Transcript (Bengali)

এতক্ষণ পুরো মেশিনটা দেখলাম — token, context, stateless loop, আর caching কীভাবে চলে। এবার সেই মেশিন মাথায় রেখে কীভাবে কাজ করলে অযথা token খরচ কম হয়। ভালো খবর হলো — token বাঁচানোর habit গুলো আলাদা করে মুখস্থ করার কিছু নেই; context আর caching যেভাবে আচরণ করে, ঠিক সেখান থেকেই এগুলো আপনাআপনি বেরিয়ে আসে। চলুন কয়েকটা দেখি।

প্রথম অভ্যাসটা সরাসরি আগের prefix caching থেকে আসে — সামনে স্থির, পেছনে পরিবর্তনশীল। যা বদলায় না — system prompt, CLAUDE.md, আপনার instruction — সেগুলো সামনে রাখুন, আর শুধু লেজের অংশটা বদলাতে দিন। কারণ আপনি যদি session-এর মাঝপথে গিয়ে শুরুর দিকের context-টা edit করেন, তাহলে ঠিক সেই জায়গা থেকে পুরো cache-টা invalid হয়ে যায় — আর আবার শূন্য থেকে prefill শুরু।

দ্বিতীয়টা একটা খুব সাধারণ ভুল নিয়ে — "দরকার হতে পারে" ভেবে আগেভাগে সবকিছু load করে রাখা। মনে রাখবেন, প্রতিটা token প্রতি turn-এ আবার পাঠানো হয়, আবার bill হয়। তাই শুরুতেই গোটা গোটা file বা বিশাল context ঢেলে দিলে, সেই বোঝাটা আপনি পরের প্রতিটা turn-এ বয়ে বেড়াবেন আর তার দাম দেবেন। একটা weekend-এর ট্রিপে গোটা আলমারি গুছিয়ে নেওয়ার মতো — তারপর প্রতি পথে সেই পুরো বোঝা টেনে নিয়ে যাওয়া। তার চেয়ে agent-কে যখন যেটা দরকার তখন সেটা পড়ে নিতে দিন।

তৃতীয়টা একদম এই finite budget-এর কথা থেকে — window-টা হালকা রাখুন। একটা ছোট, প্রাসঙ্গিক window নিয়ে focused একটা session সবসময় একটা এলোমেলো ছড়ানো session-কে হারিয়ে দেয় — শুধু খরচে না, কাজের মানেও। অপ্রাসঙ্গিক জিনিসে ভরা একটা বিশাল window-এ আসল জিনিসটা চাপা পড়ে যায়। (এই হারিয়ে যাওয়ার ব্যাপারটা নিয়ে পরে আরো কথা হবে, এখন শুধু এটুকুই।)

আর চতুর্থটা — আমাদের একদম নিজেদের কথা। মনে আছে শুরুতে বলেছিলাম, বাংলা script English-এর চেয়ে ভারী হয়ে tokenize হয়? এখানেই সেটা কাজে লাগে। লম্বা বাংলা prompt দেখতে যত নিরীহ মনে হয়, token-এ তার চেয়ে অনেক বেশি খরচ করে। তাই যেখানে খরচটা matter করে, সেখানে prompt গুলো একটু আঁটসাঁট রাখুন — অর্থ না কমিয়ে কথাটা ছোট করুন।

তাহলে এগুলো হলো অভ্যাস — মেশিনটা মাথায় রেখে কীভাবে কাজ করতে হয়। আর যে command গুলো দিয়ে এই অভ্যাসগুলো হাতে-কলমে চালানো হয় — `/compact`, `/clear`, সঙ্গে `/cost` — সেগুলো নিয়ে আমরা বিস্তারিত বসব Operating Environment-এ। আপাতত এটুকুই — মেশিনটাও বুঝলেন, আর সেই মেশিন সস্তায় চালানোর অভ্যাসগুলোও জেনে নিলেন।
