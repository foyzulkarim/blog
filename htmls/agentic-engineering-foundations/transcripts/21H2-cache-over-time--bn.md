# Slide N-21H2 — Cache Reuse Over Time

## On-Screen Content
- **No slide-meta header / no badge** — full-frame diagram slide (N-21H2)
- **Visual (full-frame diagram, d4)**: the same prefix across four turns.
  - **Turn 1 — cache miss**: full prefill of everything; write the prefix's K/V to the store.
  - **Turn 2 — cache hit**: hash(prefix) matches → load the stored K/V, prefill only the new tail (prefix ≈10%, tail at full price).
  - **Turn 3 — cache hit**: load again; each hit refreshes the TTL.
  - **Turn 4 — miss again**: after the entry idle-expired, the same prefix now misses — the entry is gone, so it's a full prefill, re-written from scratch, back to full price.
  - **KV-store lifetime bar**: written → warm (reused) → warm (TTL refreshed) → evicted → cold (re-written).
- **Bottom line**: caching keys on the prefix — whatever stays identical at the front rides cheap; change one early token, *or let the entry lapse*, and you pay the full prefill again from that point on.

## Speaker Transcript (Bengali)

আগের slide-এ দেখলাম — server prefix-এর key-value মুছে ফেলে না, রেখে দেয়। কিন্তু এই "রেখে দেয়" — এটা চিরকাল না। চলুন একটা cache entry-র পুরো জীবনকালটা চোখের সামনে চলে যাক — লেখা থেকে মুছে যাওয়া পর্যন্ত, কয়েকটা turn ধরে।

**Turn এক** — cache miss। কারণ store-এ তখনো কিছু নেই। server পুরো জিনিসটা একবারে prefill করে — system prompt, tool definition, CLAUDE.md, এতক্ষণের conversation, আপনার নতুন message — সব। তারপর prefix-এর Key/Value হিসাব করে store-এ লিখে রাখে, prefix-এর hash দিয়ে চিহ্নিত করে। দাম পুরো — আর সাথে একটু cache-write-এর extra খরচ, মনে আছে, ইনপুট দামের প্রায় ১.২৫ গুণ, কিন্তু সেটা একবারই।

**Turn দুই** — cache hit। আপনি আবার সব পাঠালেন, prefix-এর hash মিলে গেল। server আর prefix-টা নতুন করে prefill করে না — store থেকে সরাসরি তুলে নেয়, মোটামুটি ইনপুট দামের দশ ভাগের এক ভাগে। শুধু শেষের নতুন অংশটুকু — যেটা আগে ছিল না, যেটা সত্যিই বদলেছে — সেটুকু পুরো দামে prefill হয়।

**Turn তিন** — আবার hit, আবার same deal। prefix সস্তায় load, নতুন tail পুরো দামে। কিন্তু এখানে একটা ছোট কিন্তু গুরুত্বপূর্ণ detail আছে — প্রতিটা hit-এ সেই entry-র TTL ঘড়িটা আবার নতুন করে শুরু হয়। মানে আপনি যত ঘন ঘন hit করছেন, সেটা তত বেশিক্ষণ বেঁচে থাকে।

এবার **Turn চার** — miss আবার। কিন্তু এবার prefix তো বদলায়নি, hash-ও একই, তবুও miss কেন? কারণ turn তিন-এর পর আপনি একটু চুপ থেকেছিলেন — মোটামুটি পাঁচ মিনিটের বেশি। TTL-এর ঘড়ি শেষ, entry evict হয়ে গেছে, store থেকে উধাও। একই prefix, কিন্তু entry নেই — তাই server-এর কাছে কিছু load করার নেই, আবার শূন্য থেকে পুরো prefix prefill, আবার পুরো দাম, আবার নতুন করে store-এ লেখা।

নিচের lifetime bar-টা একবার দেখুন। amber segment — "prefix K/V written", লেখা হলো। তারপর দুটো teal segment — "WARM — reused" আর "WARM — TTL refreshed", বারবার ব্যবহার হচ্ছে, ঘড়ি নতুন হচ্ছে। তারপর একটা বাধার চিহ্ন — "✗ EVICTED", idle পাঁচ মিনিটের বেশি বা memory-র চাপে entry চলে গেছে। আর শেষে আবার amber — "cold → re-written", ঠান্ডা হয়ে গেছে, নতুন করে লেখা হচ্ছে। এটাই একটা cache entry-র পুরো জীবন — জন্ম, ব্যবহার, মৃত্যু, পুনর্জন্ম।

তাহলে শিক্ষাটা দু'দিক থেকে। একদিকে — যতক্ষণ prefix-এর শুরুর দিকটা হুবহু একই থাকছে, ততক্ষণ সেটা সস্তায় চলে। অন্যদিকে — cache দু'ভাবে ভাঙে। শুরুর দিকে একটা token বদলালে, অথবা কিছুক্ষণ চুপ করে entry-কে idle-এ মরতে দিলে — দুটোর যেকোনো একটাতেই আপনি সেই জায়গা থেকে আবার পুরো prefill-এর দাম গুনতে থাকবেন।

এবার প্রশ্নটা স্বাভাবিক — এই "সামনের stable অংশ" বলতে আপনার রোজকার কাজে আসলে কী কী পড়ে? system prompt, tool definition, CLAUDE.md — কোনটা কোথায় বসে, কোনটা cache-এর সুবিধা পায়, কোনটা পায় না? চলুন সেই দিকে এগোই।
