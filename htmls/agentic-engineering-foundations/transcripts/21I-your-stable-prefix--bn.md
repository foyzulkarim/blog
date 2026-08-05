# Slide N-21I — What Is Your Stable Prefix?

## On-Screen Content
- **Header**: Under the Hood · Stable vs Volatile · N-21I
- **Title**: What Is Your Stable Prefix?
- **Lede**: Prompt caching works because your context has a predictable structure. The front never changes; only the tail does — and knowing this changes where you should write your instructions.
- **Body (two-column layout)**:
  - Left — "Stable Prefix · Cached after turn 1" [gold border]:
    - System prompt [Machinery]
    - Tool definitions [Machinery]
    - CLAUDE.md [Machinery]
    - Skills metadata [Machinery]
    - Identical every request. ~10% of input price from turn 2 onward.
  - Right — "Volatile Tail · Billed every turn" [teal border]:
    - Files read this session [Session]
    - Conversation so far [Session]
    - ← your new message [You]
    - Changes every turn. Not cached. Full input price every turn.
  - Insight card (full width, gold): "CLAUDE.md is stable — cached, cheap from turn 2 on. Instructions you give in chat land in the volatile tail: full price every turn, and one edit to early chat breaks the cache from that point on."
- **Takeaway**: → Write rules in CLAUDE.md. Tell session-specific context in chat. CLAUDE.md rides cheap. Chat is volatile.

## Speaker Transcript (Bengali)

আগের slide-এ চারটে turn ধরে দেখলাম — cache entry কীভাবে লেখা হয়, বারবার ব্যবহার করে কতটা খরচ হয়, TTL-এর ঘড়ি কখন বদলায়, আর শেষে evict হয়ে কী হয় — পুরো জীবনকালটা চোখের সামনে চলে গেল। আর এখন পরিষ্কার হলো, prompt caching আসলে কী করে — এটা key করে prefix-এর উপর, আর যখন prefix হুবহু একই থাকে তখন খরচ অনেক কমে, আর ভাঙলে আবার পুরোটা। কিন্তু একটু থেমে ভাবা দরকার, কারণ এই "stable prefix" জিনিসটা আসলে কী দিয়ে তৈরি, তা আপনার মনে থাকতে হবে — কারণ এটা একবার চোখে দেখলে, কোথায় কী লেখা উচিত সেটা আপনি নিজেই বের করে ফেলতে পারবেন, কোনো rule মুখস্থ করতে হবে না।

মনে আছে, 21B-তে আমরা দেখেছিলাম context window-এ আপনি কিছু টাইপ করার আগেই কতটা ভরে যায়? সেই প্রথম অংশটাই হলো stable prefix — system prompt, প্রতিটা tool-এর definition, আপনার CLAUDE.md, আর skills-এর metadata — এগুলো প্রতিটা session-এ, প্রতিটা request-এ হুবহু একই থাকে। প্রথম call-এর পর এগুলো cache-এ বসে যায়, আর পরের প্রতিটা call-এ এগুলো পড়া হয় আসল দামের মাত্র দশ ভাগের এক ভাগে। এই অংশটা নিয়ে আলাদা চিন্তা করতে হবে না, এটা automatically stable — আপনার লিখা ক্লিয়েই এটা বদলানোর দরকার না, এটা সবসময় একই থাকে।

তারপর আসে volatile অংশ, যা প্রতি turn-এ বদলায়। এই session-এ যে file গুলো পড়ানো হয়েছে, এখন পর্যন্ত হওয়া conversation, আর আপনার নতুন message — এই তিনটা প্রতি turn-এ বদলায়, এটা cache হয় না, এটাই পুরো দামে চলে।

এবার সবচেয়ে practical কথাটা আসলো। আপনার লেখা instruction গুলো — কোথায় রাখছেন? যদি CLAUDE.md-এ রাখেন, সেটা stable prefix-এর অংশ হয়ে যাবে — প্রথম turn-এর পরেই cache-এ বসে যায়, পরের প্রতিটা turn-এ সস্তায় পড়া হয়, প্রায় বিনা পয়সায়। কিন্তু যদি chat-এ গিয়ে বলেন, "এই session-এ এভাবে কাজ করো" — সেটা conversation-এর অংশ, volatile tail হয়ে যাবে, প্রতি turn-এ পুরো দামে re-bill হচ্ছে। আর যদি সেই conversation-এর শুরুর দিকে কোনো কারণে কিছু বদলান, তখন সেখান থেকে পুরো cache ভেঙে যাবে।

rule টা একটাই, এবং এটা কোর্স জুড়ে আমরা বারবার বলেছি: যা stable থাকবে, যা বারবার দরকার হবে — সেটা CLAUDE.md-এ লিখুন। আর যা এই session-এর জন্য specific, one-time — সেটা chat-এ বলুন। CLAUDE.md cache-এ বসে থাকবে, chat volatile থাকবে।

এখন theory আর structure দুটোই পরিষ্কার, চলুন এবার এটা numbers-এ দেখি — cache না থাকলে ঠিক কতটা ক্ষতি হয়, আর থাকলে কতটা সাশ্রয় পাবেন।
