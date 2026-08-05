# Slide N-21C — The Server Remembers Nothing

## On-Screen Content
- **Header**: Under the Hood · Statelessness · N-21C
- **Title**: The Server Remembers Nothing
- **Lede**: Every message, Claude Code packages the entire context into one payload and ships it. The server holds nothing between calls. The model is a pure function of the text you send.
- **Body (grid cols-2)**:
  - ✗ What people imagine — a server that remembers your conversation and continues from where it left off.
  - ✓ What actually happens — the whole context is re-assembled and re-sent on every call; the server is stateless; no *conversation state* persists server-side. (A short-lived cache may speed up re-processing, but it isn't memory — more on that later.)
  - Definition card: *Session = the running context, held by Claude Code on your machine — not on the server.*
- **Takeaway**: → The 'conversation' lives in your terminal, not in the model.

## Speaker Transcript (Bengali)

আগের slide-এ আমরা দেখলাম প্রতিবার একটা পুরো ভরা context window তৈরি হয়। এবার প্রশ্ন — এটা যখন server-এ যায়, server কি আগের কথা মনে রাখে? আমরা প্রায় সবাই ধরে নিই — হ্যাঁ, ওপারে নিশ্চয়ই একটা server বসে আছে যে আমাদের পুরো conversation মনে রেখেছে, আর প্রতিবার আগের জায়গা থেকে গল্পটা continue করছে। কথাটা শুনতে স্বাভাবিক, কিন্তু বাস্তবে ব্যাপারটা একদম এমন না।

আসলে যা হয় — আপনি প্রতিটা message পাঠানোর সময় Claude Code পুরো context-টা একসাথে গুছিয়ে একটা payload বানায়, আর সেই গোটা জিনিসটা একবারে পাঠিয়ে দেয়। server দুটো call-এর মাঝখানে কিচ্ছু ধরে রাখে না — শূন্য। model হলো নিছক একটা pure function — আপনি যে text পাঠাবেন, ঠিক সেটার উপর ভিত্তি করেই output দেবে, এর বেশি কোনো স্মৃতি ওর নেই। (একটা ছোট্ট কথা আগেভাগে বলে রাখি — server ভেতরে একটা স্বল্পস্থায়ী cache রাখতে পারে যেটা পুরোনো অংশটা আবার process করা দ্রুত করে দেয়; কিন্তু সেটা "মনে রাখা" নয়, নিছক একটা গতি বাড়ানোর কৌশল — কয়েকটা slide পরে এটা বিস্তারিত দেখব।)

একটা ছবি দিয়ে ভাবুন। প্রতিবার আপনি যেন একজন একদম নতুন, অপরিচিত মানুষের হাতে গোটা case folder-টা তুলে দিচ্ছেন। সে পুরোটা পড়ে, একটা উত্তর দেয়, folder টা আপনার হাতে ফেরত দেয় — আর সঙ্গে সঙ্গে সব ভুলে যায়। পরের বার আবার নতুন কেউ, আবার গোটা folder প্রথম থেকে। যে মানুষটা মনে রাখছে না — মনে রাখছেন আপনি, কারণ folder টা থেকে যাচ্ছে আপনার কাছে।

আর এই folder টাই হলো session। একটু পরিষ্কার করে বলি — session মানে চলমান context, যেটা Claude Code আপনার নিজের machine-এ ধরে রাখে, server-এ নয়। মানে যাকে আমরা "conversation" বলছি, সেটা আসলে বাস করছে আপনার terminal-এ, ওই দূরের model-এর ভেতরে নয়। model প্রতিবার শুধু একবারের জন্য folder টা পড়ছে, তারপর ভুলে যাচ্ছে।

তো একটা request-এর গল্পটা পরিষ্কার — পুরো context একসাথে পাঠাও, model পড়ে উত্তর দেয়, সব ভুলে যায়। কিন্তু আসল কাজ তো কখনো এক request-এ শেষ হয় না। model একটা file পড়তে চায়, একটা command চালাতে চায়, তারপর আবার ভাবে — মানে একটা কাজের পেছনে থাকে অনেকগুলো round-trip। সেই loop টা ঠিক কীভাবে ঘোরে, সেটাই চলুন এবার দেখি।
