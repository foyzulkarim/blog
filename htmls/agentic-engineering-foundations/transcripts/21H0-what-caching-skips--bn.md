# Slide N-21H0 — What Caching Actually Skips

## On-Screen Content
- **Header**: Under the Hood · What Caching Skips · N-21H0
- **Title**: What Caching Actually Skips
- **Lede**: Back to the three stages from 21E1. Two of them get confused — and only one is ever cached. The trap: thinking "tokens are already computed, so what's left to cache?"
- **① Tokenize**: text → token IDs ("The cat" → [464, 2415]). Always runs · ~free · CPU.
- **② Prefill — compute K/V**: each token ID → vector → W_K/W_V matmul → its Key + Value. Expensive · GPU · the forward pass.
- **③ Decode**: emit output tokens one at a time, reading the whole K/V store. Serial · output cost.
- **The confusion**: a token's K/V is produced *by* the forward pass (②), not by tokenizing. "Tokens are already computed" only covers ①; the expensive K/V work hasn't happened yet.
- **Where caching enters**: hash the prefix token IDs → look in the store. Hit → load stored K/V, skip ② for them. Miss → run ② and store it. ① runs either way.
- **Takeaway**: caching never skips tokenization; it skips the forward-pass K/V computation for the *unchanged prefix* — the only part that was ever expensive.

## Speaker Transcript (Bengali)

dashboard-এ এইমাত্র দেখলাম, cache efficiency প্রায় ৮৮%। কিন্তু এই caching ঠিক কোন কাজটা বাঁচায়, সেটা না বুঝলে একটা ফাঁদে পা পড়ে যায়। ফাঁদটা এই — অনেকে ভাবেন, "token তো আগেই হিসাব হয়ে গেছে, তাহলে আর cache করার বাকি থাকে কী?" এই গোলমালটা মেটাতে চলুন ফিরে যাই 21E1-এর সেই তিনটা stage-এ — Tokenize, Prefill, Decode। কারণ এর মধ্যে দুটো stage-কেই মানুষ গুলিয়ে ফেলে।

Stage এক — **Tokenize**। আপনার text ভেঙে token ID-তে বদলে যায়; যেমন "The cat" হয়ে গেল [464, 2415]। এটা সবসময় চলে, প্রায় বিনামূল্যে, CPU-তেই। Stage দুই — **Prefill**, যেখানে Key আর Value হিসাব হয়। প্রতিটা token ID প্রথমে একটা vector হয়, তারপর W_K আর W_V দিয়ে matmul করে তার Key আর Value বেরোয়। এটাই ব্যয়বহুল, এটাই GPU-তে চলে — এই হিসাবটারই technical নাম "forward pass"। Stage তিন — **Decode**, পুরো K/V store পড়ে পড়ে একটা একটা করে output token বের করা। আর মনে আছে 21F-তে বলেছিলাম — এই store না থাকলে প্রতিটা decode step-এ আগের সব token-এর K/V নতুন করে হিসাব করতে হতো, O(N²) বৃদ্ধি; within-request KV cache সেটাই আটকায়।

এবার আসল গোলমালটা। একটা token-এর Key আর Value কিন্তু তৈরি হয় ওই stage দুই-এ, prefill-এর forward pass-এ। tokenize করার পর ওগুলোর কোনো অস্তিত্বই নেই। তাই "token আগেই হিসাব হয়ে গেছে" কথাটা বড়জোর stage এক পর্যন্ত সত্যি। যেটা সত্যিকারের দামি কাজ — সেই K/V হিসাব — সেটা তখনো হয়ইনি।

তাহলে caching ঢোকে কোথায়? prefix-এর token ID-গুলোর একটা hash বানিয়ে store-এ খোঁজা হয়। **মিলে গেলে — hit** — জমিয়ে রাখা K/V সোজা তুলে নেওয়া হয়, ওই অংশের stage দুই-টা পুরো বাদ। **না মিললে — miss** — stage দুই চালিয়ে হিসাব করে store-এ রেখে দেওয়া হয়। কিন্তু stage এক, মানে tokenize, যাই হোক চলবেই। সোজা কথায় — caching কখনো tokenize বাঁচায় না; ও বাঁচায় ওই forward-pass-এর K/V হিসাবটা, যে prefix-টা বদলায়নি তার জন্য। আর সেটাই তো একমাত্র দামি অংশ ছিল। এই "মুছে না ফেলে জমিয়ে রাখা" ব্যাপারটাকেই বলে prompt caching। সেটা ঠিক কীভাবে কাজ করে, একই store কীভাবে গরম থেকে যায় — এবার পুরোটা গুছিয়ে দেখি।
