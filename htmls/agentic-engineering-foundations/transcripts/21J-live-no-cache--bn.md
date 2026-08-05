# Slide N-21J — Live: Without Cache

## On-Screen Content
- **Header**: Under the Hood · Live Demo · N-21J
- **Title**: Live: Without Cache
- **Lede**: I ran the same prompt through Claude Code with cache disabled. Every turn recomputed the entire context from scratch. These are the numbers.
- **Body**:
  - Left: oMLX Serving Stats dashboard — 224,545 total prefill tokens, 0 cached tokens, 0.0% cache efficiency
  - Right: Session cost cards — Time: 10m 39s · API Cost: $1.44 · Cache Efficiency: 0%
- **Takeaway**: → Zero cache efficiency means every token is recomputed every turn. The context grows — and so does the waste.

## Speaker Transcript (Bengali)

আমি একটা experiment করলাম — একই prompt, একই model, একই machine। শুধু একটা জিনিস বদলাই — oMLX-এ cache disabled করে দিলাম। মানে প্রতিটা turn-এ পুরো context আবার শূন্য থেকে process হবে।

এখানে দুটো panel আছে — বাম দিকেরটা oMLX-র local serving stats, আর ডান দিকেরটা Claude Code-র session summary, মানে Anthropic API-তে কী খরচ হয়েছে সেটা।

বাম দিকের dashboard-টা দেখুন। এটা session শেষে oMLX-র serving stats। দেখুন সবচেয়ে উপরের তিনটা সংখ্যা — Total Prefill Tokens: ২২৪,৫৪৫। Cached Tokens: শূন্য। Cache Efficiency: 0.0%। এই তিনটা সংখ্যাই একটা কাহিনি বলে — দশটা turn-এর প্রতিটাতে model আগের সবকিছু আবার নতুন করে পড়েছে। কোনোটাই reuse হয়নি।

ডান দিকের সংখ্যাগুলো আরো বেদনাদায়ক। সময় লেগেছে ১০ মিনিট ৩৯ সেকেন্ড। API cost পড়েছে $১.৪৪। আর Claude Code-র status bar-এ দেখা যাচ্ছে cache: 0% — মানে প্রতিটা turn-এ প্রতিটা token-এর জন্য full price দিতে হয়েছে।

একটু ভেবে দেখুন — ২২৪ হাজার token prefill করা হয়েছে, আর কিছুই cached নয়। মানে প্রতিটা turn-এ system prompt, tool definition, CLAUDE.md, আগের সব conversation — সবকিছু আবার নতুন করে compute করা হয়েছে। একটা turn যখন শেষ হয়, পরের turn-এ আবার একই কাজ। যেমন একটা column যোগ করার সময় প্রতিবার শূন্য থেকে শুরু করা — running total ধরে না রেখে।

এটাই আসলে 21E-তে যে problem-টার কথা বলেছিলাম, তার live proof। theory না, সংখ্যা — আমার নিজের machine-এর সংখ্যা। কিন্তু এতক্ষণ তো শুধু problem-টা দেখলাম। চলুন এবার দেখি, যদি একই experiment-এ cache চালু করি, তাহলে কী হয়।
