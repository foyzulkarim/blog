# Slide N-21D — The Loop: How Tools Run

## On-Screen Content
- **Header**: Under the Hood · Multi-Turn · N-21D
- **Title**: The Loop: How Tools Run
- **Lede**: The model can't run anything. It returns text, or a request to use a tool. Claude Code runs the tool, appends the result, and sends the whole thing back. Repeat.
- **Body (numbered flow + definition box)**:
  1. You send a goal
  2. Model returns a tool-use request (e.g. "read this file")
  3. Claude Code runs the tool
  4. Result is appended to the end of the context
  5. The whole context is re-sent
  6. Model continues, or requests another tool → loop until done
  - Definitions: *Append = added to the end of the context. Multi-turn = one goal, many of these round-trips.*
- **Takeaway**: → One thing you ask for can be ten turns under the hood — and the context grows with every one.

## Speaker Transcript (Bengali)

আমরা দেখলাম server-টা stateless — প্রতিটা call-এ পুরো context আবার পাঠাতে হয়, server কিছুই ধরে রাখে না। কিন্তু আসল কাজ তো কখনো এক request-এ শেষ হয় না। মনে আছে আমরা আগে "loopback"-এর কথা বলেছিলাম? এখন সেই loop টা ঠিক কীভাবে ঘোরে, সেটা একদম খুলে দেখব। আর শুরুতেই একটা জিনিস মাথায় গেঁথে নিন — model নিজে কিন্তু কিচ্ছু চালাতে পারে না। ও কোনো file পড়তে পারে না, কোনো command run করতে পারে না। ও শুধু দুটো জিনিসের একটা ফেরত দেয় — হয় text, নয়তো একটা request, "এই tool-টা ব্যবহার করো।"

তাহলে পুরো ব্যাপারটা ঘটে কীভাবে? ধাপে ধাপে দেখা যাক। প্রথমে আপনি একটা goal পাঠালেন — ধরুন, "এই endpoint-টা বানাও।" model উত্তরে কোড না দিয়ে একটা tool-use request ফেরত দিল — "আগে এই file-টা পড়তে হবে।" এবার Claude Code সেই tool টা চালায়, file-টা পড়ে। যে result পাওয়া গেল, সেটা context-এর একদম শেষে append করা হয় — মানে শেষে জুড়ে দেওয়া হয়। তারপর সেই গোটা context আবার নতুন করে পাঠানো হয়। model পড়ে, হয় কাজ continue করে, নয়তো আরেকটা tool চায় — আর loop টা আবার ঘোরে, যতক্ষণ না কাজ শেষ হয়।

এখানে দুটো শব্দ একটু থিতিয়ে নিই। append মানে — শেষে যোগ করা, পুরোনো কিছু মুছে নয়, নতুন জিনিস লেজের দিকে জুড়ে দেওয়া। আর multi-turn মানে — একটাই goal, কিন্তু তার পেছনে এরকম অনেকগুলো round-trip। আর এই এক একটা round-trip-কেই আমরা একটা "turn" বলছি — কখনো "request", কখনো "call"-ও বলব, কিন্তু এই section-এ তিনটে শব্দই আসলে একই জিনিস বোঝায়: server-এ পুরো context পাঠিয়ে একবার উত্তর নিয়ে আসা।

একটা ছবি দিয়ে ধরি। ভাবুন model হলো ফোনের ওপাশে বসা একজন advisor — যে নিজে ঘরের কোনো কিছু ছুঁতে পারে না, আর প্রতিটা call-এ সে শুধু একটাই কাজ বলতে পারে: "ওই button-টা চাপো।" ব্যস — একটা মাত্র। তারপর call শেষ।

আপনি button চাপলেন, ফলাফল দেখলেন। এবার ফোন করলেন।

কিন্তু এখানেই আসল ব্যাপার — প্রতিবার ফোন করলে advisor আগের call-এর কথা কিছুই মনে রাখে না। call কাটার সঙ্গে সঙ্গে সব ভুলে গেছে। তাই প্রতিবার ফোন করার আগে আপনাকে পুরো case file তৈরি করতে হয় — শুরু থেকে এ পর্যন্ত সবকিছু: আগের নির্দেশ, button-এর ফলাফল, পুরোটা। advisor সেটা পড়ে, একটা নির্দেশ দেয়, আবার ভুলে যায়।

তবে একটা call চলাকালীন, file পড়তে পড়তে সে নিজের মধ্যে mental notes তৈরি করছে — এতে পরের পাতায় দ্রুত চলতে পারছে। এটাই একটা ছোট্ট cache-এর কাজ — কয়েকটা slide পরে এটাকে বিস্তারিত দেখব। কিন্তু call শেষ হলে সেই mental notes-ও গেল — পরের call-এ আবার শূন্য থেকে।

আর প্রতিটা call-এ যে ফলাফল জানাচ্ছেন, সেটা case file-এর শেষে জুড়ে যাচ্ছে। পরের call-এ advisor-কে সেটুকু বেশি পড়তে হবে। এইভাবে প্রতিটা turn-এ file ভারী হতে থাকে।

আর এখানেই আসল উপলব্ধিটা — আপনি যেটাকে "একটা কাজ" ভাবছেন, ভেতরে সেটা দশটা turn হয়ে যেতে পারে। আর প্রতিটা turn-এ context আরো বড় হয়, আরো ভারী হয়। এবার চিন্তা করুন — যদি context প্রতি turn-এ বড় হয়, আর সেই গোটা বড় context প্রতি turn-এ আবার পুরোটা পাঠাতে হয়... তাহলে খরচের কী হবে? সেই হিসাবটাই চলুন পরের slide-এ মেলাই।
