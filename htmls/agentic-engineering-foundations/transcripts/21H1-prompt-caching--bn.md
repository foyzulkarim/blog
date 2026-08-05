# Slide N-21H1 — Prompt Caching: Same Store, Kept Warm

## On-Screen Content
- **Header**: Under the Hood · The Solution · N-21H1
- **Title**: Prompt Caching: Same Store, Kept Warm
- **Lede**: [Solution 2] Prompt caching is the *same KV store* — the server just chooses not to free it. It keeps the prefix's K/V alive across requests, so the next turn *loads* them instead of re-prefilling. You still send everything every turn; the server stays stateless.
- **Body (two-request timeline + two clarifier cards)**:
  - Request 1 — cache write: full prefill of the prefix (system prompt, tools, CLAUDE.md); its K/V is computed and kept in the store, keyed by a hash (a short fingerprint of the token sequence) of the prefix tokens. Write ≈ 1.25× input price · once.
  - Request 2 — cache hit: same prefix → hash matches → load the stored K/V, skip its prefill; only the new tail is prefilled. The match runs token-by-token until your context diverges. Read ≈ 10% input price · every hit.
  - Same store, two lifetimes — *Within a response:* built during prefill + decode, freed when it returns. *Across requests:* the prefix's K/V is retained. Prompt caching is the KV cache the server didn't throw away.
  - TTL · until evicted — entries leave two ways: TTL expiry (~5 min idle, refreshed on each hit) or memory-pressure eviction. Let it lapse → re-prefill at full cost.
- **Takeaway**: → Caching keys on the *prefix*. Whatever stays identical at the front rides cheap. Change something early — even one token — and the cache breaks from that point on.

## Speaker Transcript (Bengali)

এইমাত্র দেখলাম — caching tokenize বাঁচায় না, ও বাঁচায় ওই forward-pass-এর K/V হিসাবটা, যে prefix-টা বদলায়নি তার জন্য — একমাত্র যে অংশটা সত্যিই দামি ছিল। এবার সেই "জমিয়ে রাখা"-টা ঠিক কীভাবে কাজ করে, ধাপে ধাপে দেখি। আর শুরুতেই সবচেয়ে বড় ভুল-বোঝাবুঝিটা পরিষ্কার করে দিই, কারণ আমি নিজেও অনেকদিন এটা গুলিয়ে ফেলতাম — prompt caching আর KV cache কিন্তু আলাদা দুটো জিনিস না। এটা একই KV store — server শুধু ঠিক করে যে response শেষ হলেও এটা মুছবে না, ধরে রাখবে।

মনে করুন — সাধারণ নিয়মে response তৈরি হয়ে গেলে runtime ওই store-টা খালি করে দেয়। prompt caching মানে runtime বলছে, "না, prefix-এর key-value গুলো আমি মুছব না, কিছুক্ষণ রেখে দিই।" ফলে পরের request-এ ওই prefix-টা আবার শূন্য থেকে prefill করতে হয় না — সোজা store থেকে তুলে নেওয়া হয়। আর একটা কথা পরিষ্কার থাকুক, যাতে গোলমাল না হয় — মনে আছে 21C-তে আমরা বলেছিলাম server "stateless", মানে server-এর কোনো স্মৃতি নেই, সে প্রতিটা call-কে একদম নতুন ভাবে দেখে? ঠিক সেই ব্যাপারটার সাথে এটা গুলিয়ে ফেললে চলবে না — আপনি কিন্তু প্রতি turn-এ পুরো context-টাই পাঠাচ্ছেন, server আগের মতোই stateless। ও আপনার "conversation" মনে রাখছে না; ও শুধু prefix-এর token গুলোর একটা hash — মানে একটা ছোট ফিঙ্গারপ্রিন্ট, যেটা দিয়ে ওই নির্দিষ্ট token সিকোয়েন্সকে চেনা যায় — সেটা মিলিয়ে দেখে আগের হিসাব করা key-value আবার ব্যবহার করছে। cache miss হলে কী হবে? আবার নতুন করে হিসাব হবে — উত্তরটা একদম একই থাকবে। তাই এটা নিছক গতি আর খরচের একটা কৌশল, কোনো স্মৃতি না।

এবার দুটো request-এর গল্পে দেখি। Request এক — এটা cache write। prefix-টা, মানে system prompt, tool definition, CLAUDE.md — পুরোটা একবার prefill হয়, আর তার key-value store-এ রেখে দেওয়া হয়, prefix token গুলোর একটা hash — সেই ফিঙ্গারপ্রিন্ট — দিয়ে চিহ্নিত করে। এই লেখাটার দাম সামান্য বেশি — মোটামুটি ইনপুট দামের ১.২৫ গুণ, কিন্তু এটা একবারই। Request দুই — এটা cache hit। একই prefix এলো, hash মিলে গেল, key-value সোজা store থেকে load হয়ে গেল — prefix-এর prefill পুরো বাদ। শুধু শেষের নতুন অংশটুকু, যেটা সত্যিই বদলেছে, সেটুকু prefill হয়। আর এই পড়ার দাম? আসল দামের মোটামুটি ১০ শতাংশ। আরেকটা জিনিস খেয়াল রাখবেন — এই মিলটা token ধরে ধরে হয়, যেখানে আপনার context আলাদা হয়ে যায় ঠিক সেই বিন্দু পর্যন্ত।

তাহলে KV cache আর prompt caching-এর সম্পর্কটা এক বাক্যে — একই store, দুটো আয়ু। এক response-এর ভেতরে: store-টা prefill আর decode-এ তৈরি হয়, response ফেরত গেলেই খালি হয়ে যায়। একাধিক request জুড়ে: সেই একই store-এর prefix অংশটা মুছে না ফেলে ধরে রাখা হয়। সোজা কথায় — prompt caching হলো সেই KV cache, যেটা server ফেলে দেয়নি। আলাদা দুই জিনিস না, আলাদা দুই আয়ু।

আর একটা জরুরি কথা — এই store চিরকাল থাকে না, evict হয়ে যায়। দুইভাবে যেতে পারে। এক, TTL শেষ হয়ে — TTL মানে Time To Live, মানে কতক্ষণ বেঁচে থাকবে সেটার একটা সময়সীমা — এখানে মোটামুটি পাঁচ মিনিট চুপ থাকলে; তবে প্রতিবার hit হলে ঘড়িটা আবার নতুন করে শুরু হয়। দুই, memory-পীড়নে — মানে store জায়গা ভরে গেলে — পুরোনো entry সরিয়ে জায়গা বানানো হয়, TTL শেষ হওয়ার আগেও। তাই cache hit ঘড়ি দেখে নিশ্চিত করা যায় না। lapse করলেই আবার পুরো prefix শূন্য থেকে prefill, পুরো দামে।

পুরো ব্যাপারটা একটা pre-printed form-এর মতো ভাবুন। উপরের অর্ধেক — নাম, ঠিকানা — আগে থেকে ছাপা; আপনাকে শুধু নিচের নতুন অংশটুকু ভরতে হয়। দ্রুত, সস্তা। কিন্তু উপরের ঠিকানায় একটা অক্ষরও বদলালে, সেই জায়গা থেকে নিচের পুরোটা আবার নতুন করে। caching ঠিক এভাবেই prefix-এর উপর key করে — সামনে যা হুবহু এক থাকে সেটা সস্তায় চলে যায়; শুরুর দিকে একটা token বদলালেন তো, ঠিক সেখান থেকে cache ভেঙে যায়।

তাহলে theory-টা পরিষ্কার — prefix-এর key-value মিললে server তুলে নেয়, দশ ভাগের এক ভাগ দামে, আর prefix-এর hash ভাঙলে আবার পুরো prefill। কিন্তু এই "মিললো", "ভাঙলো" — শব্দের মধ্যে থাকা ব্যাপারটা আসলে চোখে না দেখলে ঠিকমতো বসে না। তো এবার একটা cache entry-র পুরো জীবনকালটা — লেখা, ব্যবহার, TTL-এর ঘড়ি, শেষমেশ evict হয়ে যাওয়া — চারটে turn ধরে, একটাই ছবিতে দেখে নিই।
