# Slide N-21E2 — Live: Prefill vs. Decode

## On-Screen Content
- **Header**: Under the Hood · Live Demo · N-21E2
- **Title**: Live: Prefill vs. Decode
- **Lede**: Same machine — a Mac Mini M4 Pro running a local LLM via oMLX. Two screenshots, seconds apart. First the prefill pipeline ingests the prompt. Then generation begins.
- **Body (two panels)**:
  - Left — Stage ② · Prefill: oMLX dashboard showing `1 PP — 1 req`, 14.9K tokens ingested at 107 tok/s
  - Right — Stage ③ · Decode (Generate): oMLX dashboard showing `Generating...`, emitting tokens at 16.6 tok/s, cache 87.8% warm
- **Takeaway**: → Prefill is parallel bulk ingestion. Decode is serial token-by-token emission. The same context that took seconds to ingest now streams out one word at a time.

## Speaker Transcript (Bengali)

Concept-টা শুনলাম — tokenize, prefill, decode। এবার চোখে দেখি — খরচের যে দুটো stage, মানে stage দুই আর stage তিন, সেগুলো আসলে কীভাবে দেখায়, কোনটা কত দ্রুত বা ধীর। আমার সামনে এখন একটা Mac Mini M4 Pro, 64GB RAM। এখানে চলছে oMLX — একটা local inference engine। Model হলো একটা local LLM, 4-bit quantized। সবকিছু local, কোনো cloud না, কোনো API call না। এটাই আমার regular development environment। আর এই dashboard-টাই আমি use করি, যেনো দেখতে পারি ভেতরে কী ঘটছে।

বাম দিকের screenshot-টা দেখুন — এটা stage দুই, prefill। এখানে লেখা আছে "1 PP — 1 req"। PP মানে prefill pipeline, 1 req মানে একটা request process হচ্ছে। দেখুন speed — 107 tok/s। মানে প্রতি সেকেন্ডে 107টা token ingest হচ্ছে। আর মোট 14.9K token process হচ্ছে। এটা শুধু prompt-টা পড়া, কোনো উত্তর এখনো বানানো হয়নি।

এখন ডান দিকের screenshot-টা দেখুন — কয়েক সেকেন্ড পরের, এটা stage তিন, decode। এখন লেখা "Generating..."। আগের 14.9K token ingest হয়ে গেছে, এখন সেই প্রথম পাঠের একটা অংশ মেমোরিতে রাখা আছে — পরের slide-এ দেখব কেন — 87.8% efficiency-তে। এখন model শুধু একটা একটা করে token বানাচ্ছে — 16.6 tok/s। মনে রাখবেন, prefill-এ ছিলো 107 tok/s, decode-এ 16.6 tok/s। প্রায় সাত গুণ slower।

কেন? কারণ prefill-এ পুরো prompt-টা একসাথে process হচ্ছে — parallel, bulk ingestion। কিন্তু decode-এ প্রতিটা নতুন token এর জন্য আগের সব token-এর context লাগে। একটা একটা করে, serially। token 500 বানাতে গেলে token 499-এর output লাগবে। এটাই decode stage-এর bottleneck।

এই দুটো screenshot-এ আমরা দেখলাম, theory-টা আসলে কীভাবে দেখায় — prefill হলো parallel bulk, decode হলো serial precision। এটাই decode stage-এর reality — serial, one token at a time।

তাহলে দুটো জিনিস পরিষ্কার হলো। এক — prefill-এ ভারী compute হয়, পুরো prompt-টা একসাথে process হয়। দুই — decode-এ প্রতিটা নতুন token-এর জন্য আগের সব token-এর key-value হিসাব আবার লাগে, তাই serial আর ধীর। তাহলে স্বাভাবিক প্রশ্ন — এই key-value হিসাবগুলো একবার করে কোথাও জমিয়ে রাখা যায় না? প্রতি token-এ আবার শূন্য থেকে কেন? এই প্রশ্নটার উত্তরই হলো সেই cache যেটার কথা আগে hint দিয়েছিলাম — সেটাই এখন দেখা যাক।
