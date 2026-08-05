# Slide N-21F — KV Cache: Compute Once, Reuse

## On-Screen Content
- **Header**: Under the Hood · The First Fix · N-21F
- **Title**: KV Cache: Compute Once, Reuse
- **Lede**: [Solution 1] To emit each new token, attention must look at the *Key* and *Value* of every earlier token. So compute each token's K/V *once*, store them, and reuse — instead of re-deriving the whole history at every step.
- **Body**:
  - Attention = a soft dictionary lookup (three small cards):
    - Query (Q) — what the current token is *looking for*. Used once, then dropped — never stored.
    - Key (K) — the *label* a token advertises, what every later Query matches against.
    - Value (V) — the *content* a token hands over when its Key gets matched.
  - During Prefill — compute K and V for all input tokens in one parallel pass, and write them to the store. One-time cost.
  - During Decode — each new token's Query reads the whole stored K/V, emits a token, then appends its own K/V. One new row per step.
  - Closing card — game checkpoint analogy: instead of replaying from level 1 each step, save progress and resume. Without the KV store, every decode step re-derives K/V for all prior tokens — quadratic. The store is that checkpoint: each token's K/V computed *once*, reused forever. But the checkpoint is *ephemeral* — wiped when the response ends, so the next turn must re-prefill the stable prefix from scratch.
- **Takeaway**: → Compute once, reuse — within one response. Next: inside the lookup itself, to see how attention actually reads these K/V rows — then where this store lives, and why it dies when the response ends.

## Speaker Transcript (Bengali)

KV cache — এই শব্দটা এতক্ষণ ধরে আমরা বারবার বলে যাচ্ছি, কোর্সের নানা জায়গায় এসেছে, কিন্তু এখনো একবারও খুলে বলিনি জিনিসটা ভেতরে আসলে কী। চলুন এই episode-এ পুরো ব্যাপারটা একদম গোড়া থেকে demystify করি। তবে KV cache-এ ঢোকার আগে এই key আর value আসলে কী, সেটা একটু পরিষ্কার করে নিই — কারণ এই দুটো শব্দও আমরা বারবার বলছি, অথচ এখনো ঠিক করে বলিনি কোনটা কী।

attention-এর ব্যাপারটা একটা dictionary lookup-এর মতো ভাবুন — মানে একটা জিনিস খুঁজে বের করে তুলে আনা। প্রতিটা token নিজের জন্য তিনটে জিনিস হিসাব করে। এক — Query, মানে এই token এই মুহূর্তে কী খুঁজছে। দুই — Key, মানে এই token নিজের সম্পর্কে কী "label" ঝুলিয়ে রাখছে, যেটা পরের token-গুলোর Query এর সাথে মিলিয়ে দেখা হবে। তিন — Value, মানে এই token-টা যদি কারো সাথে মিলে যায়, তাহলে সে আসলে কী তথ্য হাতে তুলে দেবে। সোজা কথায় — Query হলো "কী খুঁজছি", Key হলো "আমি কী, আমাকে এভাবে খুঁজবে", আর Value হলো "মিল হলে আমি এই জিনিসটা দেব"। মনে রাখবেন — এগুলো কোনো চিন্তা বা অর্থ না, নিছক সংখ্যা, numeric representation।

এখন মজার ব্যাপারটা — পরের token-গুলোর কাজে লাগে শুধু আগের token-গুলোর Key আর Value। কোনো পুরোনো token "কী খুঁজছিল" সেটা, মানে তার Query, ভবিষ্যতের কারো কোনো কাজে আসে না — তাই Query একবার ব্যবহার করে ফেলে দেওয়া হয়, জমিয়ে রাখা হয় না। জমিয়ে রাখা হয় শুধু Key আর Value। এই জন্যই নামটা "KV cache" — QKV cache না।

এবার দেখি এটা কাজ করে কীভাবে। আপনার input prompt-টা যখন প্রথমবার process হয় — এটাই prefill — তখন সব input token-এর Key আর Value একসাথে, parallel-ভাবে হিসাব হয়ে store-এ লিখে রাখা হয়। তারপর decode শুরু হয় — model একটা একটা করে output token বানায়। প্রতিটা নতুন token-এর Query গোটা store-টা পড়ে, একটা token বের করে, আর তারপর নিজের Key-Value টা store-এর শেষে জুড়ে দেয়। মানে store প্রতি ধাপে এক সারি করে বড় হয় — আগের সবকিছু reuse, শুধু একটুখানি নতুন কাজ।

এটা বুঝতে একটা game-এর কথা ভাবুন। ধরুন প্রতিটা নতুন level-এ যাওয়ার আগে আপনাকে game-টা একদম শুরু থেকে restart করতে হচ্ছে। level 1, তারপর 2, তারপর আবার 1 থেকে শুরু করে 3 — এভাবে। সেটা কতটা সময় নষ্ট সেটা বুঝতেই পারছেন। KV cache ছাড়া decode ঠিক তাই করতো — ৫০০তম token বানাতে গেলে আগের ৪৯৯টা token-এর Key আর Value প্রতিবার নতুন করে হিসাব করতে হতো। sequence যত লম্বা হয়, কাজ তত বাড়তো — এটাই quadratic growth, ভয়ংকর অপচয়।

KV store হলো সেই game checkpoint। প্রতিটা token-এর K/V একবার হিসাব হয়, store-এ save হয়, এবং পরের প্রতিটা ধাপে সেখান থেকেই পড়া হয় — একদম restart ছাড়া। কিন্তু এই checkpoint টা permanent না। game session শেষ হলে, মানে response তৈরি হয়ে গেলেই, runtime এই store টা মুছে ফেলে। পরের turn-এ নতুন session — checkpoint নেই, আবার শুরু থেকে। তাই KV cache একটা response-এর ভেতরে খরচ কমায় ঠিকই, কিন্তু আগে বলা সেই বড় সমস্যাটা — stable prefix প্রতি turn-এ আবার prefill হচ্ছে — সেটার সমাধান এখনো হয়নি।

attention-কে বললাম "soft dictionary lookup" — কিন্তু এই "soft" বলতে আসলে কী বোঝায়, ভেতরে ঠিক কীভাবে বেছে নেওয়া হয়? চলুন একটা সত্যিকারের বাক্যে এই হিসাবটা একবার চোখে দেখি।
