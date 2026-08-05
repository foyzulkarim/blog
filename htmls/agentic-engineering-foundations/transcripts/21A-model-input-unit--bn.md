# Slide N-21A — What Is a Token?

## On-Screen Content
- **Header**: Under the Hood · The Unit · N-21A
- **Title**: What Is a Token?
- **Lede**: Before the model reads anything, your text is chopped into tokens. The model never sees letters or words — only tokens.
- **Cards (4)**:
  - 01 Not letters, not words — Sub-word chunks. A common word like "the" is one token; a rare word splits into several. ~3–4 characters per token in English.
  - 02 Everything is tokens — Your prompt, your code, file contents, tool definitions, and the model's output — all measured and billed in tokens.
  - 03 Bengali costs more — Bengali and other Unicode scripts tokenize heavier: more tokens per character than English. Same meaning, bigger token count.
  - 04 Next-token prediction — The model predicts the next token from patterns, appends it, repeats. Pattern matching — not meaning, not understanding.
- **Takeaway**: → Tokens are the unit of everything ahead — context size, speed, and cost are all counted in tokens.

## Speaker Transcript (Bengali)

তাহলে শুরু করি একদম ছোট unit টা দিয়ে — token। আমরা যখন Claude-কে কিছু লিখি, আমাদের মনে হয় model আমাদের শব্দগুলো পড়ছে, বাক্যগুলো ধরে ধরে দেখছে। কিন্তু বাস্তবে model কখনো আলাদা অক্ষর দেখে না, আস্ত শব্দও দেখে না। তার আগেই আপনার লেখাটা টুকরো টুকরো হয়ে যায় — আর সেই টুকরোগুলোরই নাম token।

এই token গুলো ঠিক শব্দ না, আবার নিছক অক্ষরও না — মাঝামাঝি কিছু একটা, যাকে আমরা বলি sub-word chunk। যেমন "the"-র মতো খুব common একটা শব্দ পুরোটাই একটা token হয়ে যায়, কিন্তু কোনো বিরল বা কঠিন শব্দ ভেঙে কয়েকটা token-এ আলাদা হয়ে যায়। মোটা দাগে English-এর জন্য ধরে নিতে পারেন তিন থেকে চার character-এ মোটামুটি একটা token। তো model-এর চোখে একটা বাক্য মানে কয়েকটা শব্দ না — গোটা কতক token-এর একটা sequence, এর বেশি কিছু না।

আর এখানে একটা জিনিস খুব পরিষ্কার করে নেওয়া দরকার — শুধু আপনার prompt টাই token না, এখানে সবকিছুই token। আপনার লেখা প্রশ্ন, আপনার code, যে file গুলো পড়ানো হয়, এমনকি প্রতিটা tool-এর definition পর্যন্ত — সবই token-এ মাপা হয়। আর model যা ফেরত দেয়, সেই output-ও token। সবচেয়ে গুরুত্বপূর্ণ কথা — এই প্রতিটার জন্যই কিন্তু bill হয়, ভেতরে ঢোকার সময়ও, আবার বেরিয়ে আসার সময়ও। token হলো সেই meter টা, যেটা আপনার অজান্তেই সারাক্ষণ ঘুরে যাচ্ছে।

এবার এমন একটা কথা বলি যেটা আমাদের, মানে বাঙালি developer-দের, একদম সরাসরি ছুঁয়ে যায়। আমাদের এই বাংলা script কিন্তু English-এর চেয়ে অনেক ভারী হয়ে tokenize হয় — একই কথা বলতে গেলে character প্রতি অনেক বেশি token খরচ হয়ে যায়। মানে একই অর্থ English-এ লিখলে যত token লাগত, বাংলায় লিখলে তার চেয়ে অনেক বেশি লাগে। অর্থটা এক, কিন্তু token-এর হিসাবটা মোটেও এক না — কথাটা মাথার এক কোণে রেখে দিন, কারণ এই section শেষ হওয়ার আগে আমরা আবার এখানে ফিরে আসব।

আর এবার সবচেয়ে আসল প্রশ্ন — এই token দিয়ে model আসলে করেটা কী? খুব সহজ ভাষায় বললে, model প্রতিবার শুধু একটা কাজই করে — পরের token টা কী হবে সেটা predict করে। এ পর্যন্ত যত token আছে, তার pattern দেখে সবচেয়ে সম্ভাব্য পরের token টা বেছে নেয়, সেটাকে শেষে জুড়ে দেয়, তারপর আবার ঠিক একই কাজ — পরের token, তারপর তার পরেরটা, এভাবে একটার পর একটা।

এখানে আমাকে একটু থেমে একটা কথা পরিষ্কার করতে দিন। কোর্সের শুরুর দিকে, ধরুন আমরা যখন আলগাভাবে বলেছিলাম model "reason" করে — কথাটা আসলে ঠিক ছিল না, সুবিধার জন্য একটু শিথিল করে বলা হয়েছিল। model কিন্তু reason করছে না, "বুঝছে"-ও না, "চিন্তা"-ও করছে না। ও শুধু pattern match করছে, পরের token-এর একটা statistical prediction করছে মাত্র। আমরা output-এ যেটাকে reasoning-এর মতো দেখি, সেটা আসলে reasoning না — সেটা reasoning-এর মতো আচরণ করা output, যা এই next-token prediction থেকেই বেরিয়ে আসছে। পার্থক্যটা নিছক কথার মারপ্যাঁচ না — এই গোটা section টাই দাঁড়িয়ে আছে এই একটা পরিষ্কার দৃষ্টিভঙ্গির উপর।

তাহলে এটুকু গেঁথে নিই — token হলো সামনের সব কিছুর একক। context কত বড় হবে, model কত দ্রুত চলবে, আর কত খরচ হবে — সব কিছুই এই token দিয়ে গোনা হয়। আর token যখন সবকিছুর মাপকাঠি, তখন স্বাভাবিক পরের প্রশ্নটা হলো — এই token গুলো একসাথে গিয়ে জমা হয় কোথায়? সেই জায়গাটার নাম context window — চলুন এবার সেটাই খুলে দেখি।
