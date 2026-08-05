# Slide N-21B — What's in the Context Window

## On-Screen Content
- **Header**: Under the Hood · The Container · N-21B
- **Title**: What's in the Context Window
- **Lede**: The context window is the model's working memory for one request — finite, about 200K tokens for Sonnet. And most of it is loaded before you type a single word.
- **Body (stacked budget visual — the window filling, top to bottom)**: System prompt → Tool definitions → CLAUDE.md (always loaded) → Skills metadata → Files read in → Conversation so far → ← your new message. (First several segments = machinery present *before* your prompt.)
- **Takeaway**: → Every token competes for the same finite budget — and you pay for all of it, every turn.

## Speaker Transcript (Bengali)

এটা আসলে model-এর working memory, কিন্তু একটা গুরুত্বপূর্ণ শর্ত আছে — এই memory টা শুধু একটা request-এর জন্য। এক request, এক context window, ব্যস। আর এই জায়গাটা অসীম না — এটার একটা নির্দিষ্ট সীমা আছে, Sonnet-এর ক্ষেত্রে মোটামুটি দুই লাখ token, যাকে আমরা বলি ~200K। মনে আছে আগে যখন আমরা LLM-এর গল্প করেছিলাম, তখনই এই hard limit-টার কথা বলেছিলাম — এবার দেখা যাক এই সীমার ভেতরে আসলে কী কী থাকে।

আর এখানেই বেশিরভাগ মানুষ একটা ভুল ধারণা নিয়ে বসে থাকেন। আমরা ভাবি — আমি যা লিখব, পুরো দুই লাখ token-ই তো আমার। কিন্তু বাস্তবটা একদম উল্টো। আপনি একটা অক্ষর টাইপ করার আগেই এই window-এর অনেকটা অংশ ভরে বসে আছে। সবার উপরে থাকে system prompt, তার নিচে প্রতিটা tool-এর definition, তারপর আপনার CLAUDE.md — যেটা সবসময় load হয়ে থাকে, তারপর skills-এর metadata, তারপর যে file গুলো এই session-এ পড়ানো হয়েছে, তারপর এতক্ষণের পুরো conversation — আর সবার শেষে, একদম তলায়, আপনার নতুন message-টা।

ব্যাপারটা একটা ওজন-সীমা দেওয়া suitcase-এর মতো ভাবতে পারেন। ব্যাগের ওজন বাঁধা, কিন্তু আপনি জিনিস ঢোকানোর আগেই অর্ধেকটা আগে থেকেই ভরা — দরকারি সব machinery দিয়ে। আপনার নিজের জিনিস ঢোকানোর জায়গা শুরু হয় ওই অর্ধেক ভরা ব্যাগের বাকি অংশটুকুতে। মানে আপনার "জায়গা" আসলে পুরোটা না, যা বেঁচে আছে শুধু সেটুকুই।

আর এর consequence-টা খুব সরাসরি — এই window-এর প্রতিটা token একই সীমিত budget-এর জন্য একে অপরের সাথে লড়ছে। system prompt-ও লড়ছে, আপনার file-ও লড়ছে, আপনার message-ও লড়ছে। আর সবচেয়ে গুরুত্বপূর্ণ — এই পুরোটার জন্যই কিন্তু আপনি খরচ দিচ্ছেন, প্রতিটা turn-এ, প্রতিবার। শুধু আপনার নতুন লেখা অংশটুকুর জন্য না।

তাহলে স্বাভাবিক প্রশ্নটা এসেই যায় — এই গোটা ভরা window-টা প্রতিবার যায়টা কোথায়? কে নিয়ে যায়, কোথায় পাঠায়, আর সেখানে কী হয়? সেটা বুঝতে গেলে আমাদের দেখতে হবে একটা request আসলে কীভাবে যায় — চলুন server-এর দিকটা একবার দেখি।
