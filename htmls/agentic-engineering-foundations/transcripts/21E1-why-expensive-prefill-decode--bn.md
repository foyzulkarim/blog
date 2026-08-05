# Slide N-21E1 — Why It's Expensive: Tokenize, Prefill, Decode

## On-Screen Content
- **Header**: Under the Hood · Inside One Turn · N-21E1
- **Title**: Why It's Expensive: Tokenize, Prefill, Decode
- **Lede**: When you hit Enter, the server doesn't just "read and reply." Three stages run in sequence — and the middle one is where almost all the cost lives.
- **Body (three-stage visual)**:
  - Stage ① · Tokenize — Your *entire* input — system prompt, tools, CLAUDE.md, conversation, your message — is chopped into token IDs (21A). Always runs · ~free · CPU.
  - Stage ② · Prefill — All input tokens are ingested in one parallel pass, and for *each* the model computes a key and a value through attention — the mechanism by which tokens weigh relationships with all other tokens. How the model "understands" context. Expensive · proportional to input size · the GPU burns most of its time here.
  - Stage ③ · Decode (Generate) — The model produces output tokens one at a time. Each depends on all previous tokens. Serial, sequential. Output cost · one word at a time.
  - Insight card: "Tokenize is ~free · Prefill = input cost · Decode = output cost. You pay for both, every turn. And the stable prefix — the unchanging front of the context (system prompt, tools, CLAUDE.md) — goes through prefill again and again, even though it hasn't changed."
- **Takeaway**: → The expensive part isn't the reply — it's re-prefilling your entire context from scratch every turn.

## Speaker Transcript (Bengali)

আগের slide-এ পুরো map-টা দেখলাম, আর কথা দিয়েছিলাম — ওই ছবির প্রতিটা বাক্সে আমরা একে একে ঢুকব। তো প্রথম stop: আপনি Enter চাপলে server-এর ভেতরে আসলে কী ঘটে। server কিন্তু শুধু "পড়ে আর উত্তর দেয়" না — পরপর তিনটা stage চলে: Tokenize, Prefill, আর Decode। আর সবচেয়ে জরুরি কথাটা আগেই বলে রাখি — প্রায় পুরো খরচটা বসে মাঝের stage-টায়। চলুন তিনটাকে একটা একটা করে খুলে দেখি।

Stage এক — Tokenize। আপনার *পুরো* input — system prompt, প্রতিটা tool-এর definition, আপনার CLAUDE.md, এতক্ষণের conversation, আর আপনার নতুন message — সবকিছু কেটে টুকরো টুকরো token ID-তে বদলে যায়। এটা সেই 21A-র গল্পটাই — model অক্ষর দেখে না, শব্দও দেখে না, দেখে token। এই stage-টা সবসময় চলে, কিন্তু এটা প্রায় বিনামূল্যে — সাধারণ CPU-তেই হয়ে যায়, ভারী কোনো হিসাব এখানে নেই।

Stage দুই — Prefill। এইখানেই আসল কাজ। ওই সব input token একসাথে, একটাই parallel pass-এ ingest হয় — আর *প্রতিটা* token-এর জন্য model attention দিয়ে একটা key আর একটা value হিসাব করে। attention হলো সেই mechanism, যেটা দিয়ে প্রতিটা token বাকি সব token-এর সাথে নিজের সম্পর্কটা ওজন করে — কোন token-এর সাথে কোন token-এর সম্পর্ক, কোনটা গুরুত্বপূর্ণ, কোনটা না। এভাবেই model আসলে context "বোঝে"। এটাই expensive stage — খরচ সরাসরি input-এর আকারের সাথে বাড়ে, যত বড় input তত বেশি compute। আর এটাই সেই জায়গা যেখানে GPU-র — মানে Graphics Processing Unit, ছবি আঁকার কাজে ব্যবহার হয় যে চিপ, সেটাই আসলে model-এর সব হিসাব চালায় — তার বেশিরভাগ সময় আর শক্তি খরচ হয়।

Stage তিন — Decode, মানে generate। এখন model উত্তর বানাতে শুরু করে, একটা একটা করে token। প্রতিটা নতুন token আগের সব token-এর উপর নির্ভর করে — তাই এটা serial, একটার পর একটা, ধীরে ধীরে। এটা output cost।

এবার তিনটা stage পাশাপাশি রাখুন। Tokenize প্রায় free। Prefill হলো input cost। Decode হলো output cost। আর আপনি input আর output — দুটোর জন্যই দাম দিচ্ছেন, প্রতিটা turn-এ। কিন্তু এখানে সবচেয়ে গুরুত্বপূর্ণ কথাটা — আপনার context-এর সামনের যে অংশটুকু — সেটা একটু পরে বিস্তারিত দেখব — কিন্তু সংক্ষেপে বলতে গেলে, system prompt, tool definition, CLAUDE.md — এই অংশটুকুকেই আমরা বলব "stable prefix", মানে যে অংশ প্রতি turn-এ হুবহু একই থাকে, কিছুই বদলায় না। অথচ এই stable prefix প্রতিটা turn-এ আবার prefill হচ্ছে, আবার সেই দামি key-value হিসাব হচ্ছে, আবার তার দাম দিচ্ছেন। একই বই বারবার স্ক্যান করছেন, একই হিসাব বারবার করছেন — শুধু একটা নতুন পাতা জুড়তে গিয়ে।

তাহলে খরচের আসল জায়গাটা এখন পরিষ্কার — উত্তর বানানো না, পুরো context শূন্য থেকে আবার prefill করা। প্রতিটা turn-এ একই কাজ, একই দাম। কিন্তু এই tokenize, prefill, decode — শুধু concept-এ শুনলে কিছুটা অস্পষ্ট থেকে যায়। তাই আগে চলুন live দেখি, আমার নিজের machine-এ stage দুই আর stage তিন আসলে কীভাবে আচরণ করে — কোনটা দ্রুত, কোনটা ধীর, আর কেন।
