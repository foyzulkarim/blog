# Slide N-21E0 — One Request, End to End (Roadmap)

## On-Screen Content
- **No slide-meta header** — full-frame diagram slide (N-21E0)
- **Badge (top-left)**: ● The map — we walk every box next
- **Visual (full-frame diagram, d1)**: the whole journey of one request on a single frame — presented as the MAP of the machine; every box on it gets its own slide over the next stretch (21E1 → 21G2).
  - Client (CLI/app) ships the *full* conversation every turn (callback to 21C statelessness).
  - Inference server: **Prefill** — one parallel pass: Tokenize → Embed → Compute K/V (GPU-expensive); then a **Decode loop** — serial: emit one token at a time → Detokenize → reply streams back.
  - **① Weights — the model**: read-only, loaded once at boot, shared by every request.
  - **② KV Cache Store**: the per-token K/V stack — the only box that holds *your* data.

## Speaker Transcript (Bengali)

আগের slide-এ আমরা দেখলাম — প্রতিটা turn-এ context বাড়ে, পুরোটা আবার পাঠানো হয়, আর bill বাড়তে থাকে। এখন কথা রাখার পালা — পুরো রাস্তাটা একবারে দেখব। এই যে ছবিটা আপনার সামনে — এটাই সেই map। আর কোণার badge-টা খেয়াল করুন — *the map, we walk every box next* — এই ছবির প্রতিটা বাক্সে আমরা সামনের slide-গুলোতে এক এক করে ঢুকব। তাই আজ বিস্তারিত মুখস্থ করার দরকার নেই — শুধু flow-টা ধরুন।

শুরুর আগে ছবির subtitle-টা পড়ুন, কারণ এটাই এই frame-এর সবচেয়ে গুরুত্বপূর্ণ লাইন: same path runs every turn — আর server দুটো request-এর মাঝে *কিছুই* মনে রাখে না। বাঁদিকের client বাক্সটা দেখুন — CLI, app, Claude Code, যা-ই হোক — প্রতিটা turn-এ সে **পুরো conversation-টা** পাঠায়। শুধু আপনার নতুন message না — system prompt, tool definitions, আগের প্রতিটা turn — সবকিছু। Server stateless। এই কথাটা মাথায় গেঁথে রাখুন, কারণ এই module-এর পুরো খরচের গল্পটা এর উপরেই ঝুলছে।

তো একটা prompt এসে পৌঁছাল inference server-এ — diagram-এ যাকে runner process বলা হচ্ছে। আমার Mac-এ এটা oMLX; cloud-এ vLLM বা Anthropic-এর নিজস্ব stack — architecture একই। আর request-টা পাঁচটা বাক্সের ভেতর দিয়ে হাঁটে, দুটো phase-এ।

Phase এক — **prefill**: সব input token-এর উপর একটাই parallel pass। তিনটা বাক্স। প্রথমে **tokenize** — আপনার text টুকরো হয়ে token ID হয়ে যায়; diagram-এ দেখুন, "The cat" হয়ে গেছে [464, 2415] — শুধু সংখ্যা। CPU-তে চলে, প্রায় free, আর model এখনো ছোঁয়াই লাগেনি। তারপর **embed** — প্রতিটা token ID একটা করে vector হয়; one token, one vector। আর এখানেই model প্রথমবার জড়াল, কারণ vector-টা আসে model-এর weights থেকে। তৃতীয় বাক্সটা **prefill** নিজে — লাল রঙে আঁকা, আর label-টাই বলে দিচ্ছে কেন: *GPU, expensive*। model সব vector একসাথে নেয়, আর *প্রতিটা* input token-এর জন্য একটা key আর একটা value হিসাব করে। এখানে একটু সাবধান — আমরা software-এর মানুষ, "key-value" শুনলেই Redis বা dictionary মনে পড়ে। এটা সেটা না। পুরো request-এর জন্য একটা pair না — **প্রতিটা token-এর জন্য** একটা K আর একটা V, row-এর পর row। কীভাবে হিসাবটা হয়, attention জিনিসটা কী — সেসব ঠিক পরের slide-এ খুলব; আজ শুধু এটুকু মনে রাখুন: GPU-র সবচেয়ে বড় সময়টা এই pass-এই পোড়ে, আর খরচটা আপনার input যত বড়, তত বেশি।

এবার pipeline-এর নিচে তাকান — দুটো memory বাক্স, আর এ দুটো একেবারেই আলাদা জিনিস। সোনালি বাক্স — **① Weights**, মানে model নিজে। boot-এর সময় একবার load হয়, read-only, প্রতিটা request — প্রতিটা user — একই weights ভাগ করে চালায়। আমার machine-এ oMLX দেখাচ্ছে Active Models — 29.4 gigabytes। আর বাক্সের ভেতরের লাইনটা পড়ুন: *your tokens never enter here* — আপনার conversation থেকে weights কিছু শেখে না, কিছু রাখে না, এক bit-ও বদলায় না। এটা engine, cargo না। আর teal বাক্স — **② KV Cache Store** — prefill এইমাত্র যে K আর V বানাল, সেগুলো এখানে জমে; token প্রতি এক row করে বাড়ে। diagram পরিষ্কার বলছে: এই *একটাই* বাক্স যেখানে আপনার data থাকে — read আর write দুটোই। আমার machine-এ এই মুহূর্তে 16.1 gigabytes। দুটো বাক্সই বসে একই দ্রুত GPU memory-তে — এজন্যই Apple-এর unified memory নিয়ে এত আলোচনা, এজন্যই Nvidia-র GPU-তে এত বিশাল high-bandwidth memory: প্রতিটা token বানাতে chip-কে weights প্লাস এই বাড়তে থাকা cache — দশ-বিশ gigabyte — পড়ে ফেলতে হয়।

Phase দুই — **decode**। serial, একটা একটা করে token, আর উপরের ছোট্ট arrow-টা বলছে: *repeat per output token*। decode loop একটা token বের করে, তারপর সেই token-এর K আর V cache store-এ append করে দেয়। আর এখানে subtle কিন্তু জরুরি কথা: পরের token-টা ঠিক করতে model পেছনে গিয়ে কাঁচা text আবার পড়ে না — সে পড়ে cache-এ জমা K/V — input প্লাস এ পর্যন্ত যা generate হয়েছে, সব। cache-টা আছেই এই কারণে। token বের করো, তার K/V জমা করো, আবার ঘোরো। এজন্যই prefill এক গিলায় পুরো prompt খেয়ে ফেলে, কিন্তু উত্তর আসে word by word। শেষ বাক্স — **detokenize**, আবার CPU-তে — token ID আবার text হয়ে, যেমন যেমন তৈরি হচ্ছে, আপনার দিকে stream হতে থাকে।

আর নিচের footer লাইনটা পড়ে রাখুন, কারণ সামনের সবকিছু এর উপর দাঁড়িয়ে: মাঝের compute-টা transient — তার নিজের কোনো memory নেই। সে weights পড়ে, আর KV store-এ পড়ে-লেখে। আপনার data থাকে শুধু KV store-এ — আর response শেষ হলেই সেটা মুছে ফেলা হয়। ফেলেই দেওয়া হয় — *unless* কেউ সেটাকে warm রাখে। ওই "unless"-টার দাম টাকায় মাপা যায়, আর আমরা ঠিক সেদিকেই যাচ্ছি। তার আগে, পরের slide-এ এই tokenize–prefill–decode তিনটা stage-কে ধরে ধরে খুলি — খরচটা ঠিক কোন stage-এ বসে, আর কেন।
