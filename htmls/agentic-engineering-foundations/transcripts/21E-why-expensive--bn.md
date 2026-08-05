# Slide N-21E — Why Sessions Get Expensive

## On-Screen Content
- **Header**: Under the Hood · The Problem · N-21E
- **Title**: Why Sessions Get Expensive
- **Lede**: [Problem] Every turn re-sends a growing context. You pay input tokens for the whole window — again and again. Twenty turns deep, you're re-billing the same 50K tokens twenty times.
- **Body (cost/size climbing across turns)**: turn 1 vs turn 20 token count; emphasis that the *front* of the context (system prompt, tools, CLAUDE.md, early turns) barely changes, yet it's re-sent and re-*computed* from scratch by the model — every turn.
- **Takeaway**: → Re-sending the stable part every turn means re-computing it every turn. To see where the cost actually lives, we need to open up what "computation" means.

## Speaker Transcript (Bengali)

চলুন সরাসরি কথায় আসি — একটা session যত গভীরে যায়, তত কেন দাম বাড়ে, সেটার exact হিসাবটা। আগের slide-গুলোতে আমরা *কারণটা* দেখেছি — server stateless, তাই প্রতিটা turn-এ পুরো conversation আবার যায়। এই slide-এ দেখব সেই কারণটার *bill*-টা কেমন দাঁড়ায়। এটা না বুঝলে পরের সমাধানটার মানেই বোঝা যাবে না।

বাঁদিকের chart-টা দিয়ে শুরু করি। Turn এক — মোটে ~5K token। এর বেশিরভাগটাই কিন্তু আপনার message না — system prompt, tool definitions, আপনার CLAUDE.md — মানে শুরুতেই যে baseline-টা যায়। তারপর প্রতিটা turn-এ জমে আপনার নতুন message, model-এর উত্তর, আর — agentic কাজে সবচেয়ে বড় অংশ — tool-এর output: file-এর content, diff, command-এর result। আর যেহেতু server কিছু মনে রাখে না, পরের turn-এ এই *পুরো স্তূপটাই* আবার যায়। তাই bar-গুলো বাড়ছে: turn পাঁচ-এ ~25K, turn দশ-এ ~50K, আর turn কুড়ি-তে — লাল bar — 100K-র উপরে। খেয়াল করুন, এই bar-টা আপনার শেষ message-এর size না — এটা *গোটা window*-র size, আর প্রতিটা turn-এ আপনি input token-এর দাম দিচ্ছেন এই গোটা window-র জন্যই।

মানে total খরচটা শেষ bar-টা না — *সবগুলো bar যোগ করলে* যা হয়, তাই। আর ডানদিকের card-টা সেই যোগফলের সবচেয়ে কষ্টের জায়গাটায় আঙুল রাখছে: context-এর শুধু stable, না-বদলানো 50K অংশটা কুড়িবার re-send করা মানে — 1 million token-এর bill, এমন content-এর জন্য যার দাম আপনি *আগেই দিয়ে ফেলেছেন*। দশ লাখ token, শুধু পুনরাবৃত্তির দাম।

আর সবচেয়ে যেটা খটকা লাগার মতো — context-এর এই সামনের অংশটা, মানে system prompt, tool definitions, CLAUDE.md, শুরুর দিকের turn-গুলো — এগুলো তো প্রায় কিছুই বদলায় না। Turn এক-এ যা ছিল, turn কুড়ি-তেও মোটামুটি ঠিক তাই। অথচ slide-এর শব্দ দুটো খেয়াল করুন — re-sent *আর* re-computed। শুধু যে আবার পাঠানো হচ্ছে তা না — model প্রতিবার এই না-বদলানো অংশটাকে *from scratch* আবার process করছে, যেন জীবনে প্রথমবার দেখছে। পাঠানোটা সস্তা — network-এ কিছু byte। আসল দামটা ওই দ্বিতীয় শব্দটায় লুকিয়ে: re-computed।

একটু ভেবে দেখুন ব্যাপারটা কতটা অপচয়। একটা গোটা বই-এর সাথে একটামাত্র নতুন পাতা জুড়তে গিয়ে যদি প্রতিবার পুরো বইটাই আবার নতুন করে photocopy করতে হয় — আর প্রতিবার সেই গোটা বইয়ের copy-র দাম গুনতে হয় — সেটা যেমন পাগলামি, এটাও ঠিক তেমনি। যা বদলায়নি, তার জন্য বারবার দাম দেওয়া — এটা খাঁটি অপচয়।

তাহলে স্বাভাবিকভাবেই প্রশ্ন আসে — এই অপচয়টা কি আদৌ রোধ করা যায় না? Provider-রা কি এটা ভাবেনি? ভেবেছে — এবং সমাধানও আছে। কিন্তু সেই সমাধানটা *কেন* কাজ করে, কোথায় তার সীমা, সেটা বুঝতে হলে আগে দেখতে হবে — আপনি Enter চাপলে server-এর ভেতরে আসলে কী কী ঘটে। takeaway-টা যেমন বলছে — "computation" শব্দটাকেই খুলে দেখতে হবে: কোন ধাপে সবচেয়ে বেশি compute লাগে, দামটা আসলে কোথা থেকে বেরোয়। তবে ধাপে ধাপে ঢোকার আগে চলুন পুরো রাস্তাটা একবারে দেখে নিই — Enter থেকে উত্তরের একটা letter screen-এ আসা পর্যন্ত, সবকিছু একটাই ছবিতে, যাতে মাথায় একটা পুরো মানচিত্র গেঁথে যায়।
