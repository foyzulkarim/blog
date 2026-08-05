# Slide 19A — Prompting for Precision

## On-Screen Content
- **Header**: Skills Intro · Communication · 19A / 81
- **Title**: Prompting for Precision
- **Lede**: Skills give Claude process. These four rules determine whether Claude follows your process — or improvises around it.
- **Four Rules**:
  - 01 Be Explicit, Not Conversational — "Refactor src/auth/middleware.ts to extract JWT validation into validateToken(), add expired-token handling, add unit tests" beats: "clean up the auth code"
  - 02 Investigate Before Answering — Add to CLAUDE.md: "ALWAYS read relevant files before proposing edits. Never speculate about code you have not opened." Prevents hallucinated imports and phantom file paths.
  - 03 Only What's Requested — "Only make changes directly requested. Do not refactor adjacent code." Prevents scope drift — the #1 cause of wasted tokens.
  - 04 Match Thinking to Complexity — /fast (routine execution) → /effort high (complex tasks) → /effort xhigh (multi-step reasoning) → ultrathink (architectural decisions — only recognized per-turn keyword)
- **Takeaway**: → The framework gives you structure. Specificity gives you precision. Process + precise prompts = disciplined engineering.

## Speaker Transcript (Bengali)

skill Claude-কে process দেয় — কিন্তু skill যতই ভালো হোক, process ততটাই ভালো যতটা prompt যা সেই process টা trigger করে। আর Claude Code-এর সাথে শত ঘণ্টার পর যা আমরা শিখেছি — সেটা হলো, session যেটা সহজে চলে আর যেটা লড়াই করে, পার্থক্য প্রায় সবসময় prompt-এর মধ্যেই লুকিয়ে থাকে।

চারটা rule আমরা দেখব। বলতে সহজ, কিন্তু master করতে হলে conscious practice লাগে — আর প্রতিটা rule-এর পেছনে একটা করে principle আছে যেটা বোঝা জরুরি।

প্রথম rule — explicit হোন, conversational হবেন না। এটাই সবচেয়ে বেশি ভাঙা rule। "Clean up the auth code" লিখলেন আর আশা করলেন Claude মন পড়বে। পারে না, করবেও না। যা করবে তা অনুমান — আর তার অনুমান আপনার চাওয়া থেকে ভিন্ন হবেই।

তুলনা করুন: "Refactor src/auth/middleware.ts to extract JWT validation into validateToken(), add expired-token handling, add unit tests।" একই লক্ষ্য, সম্পূর্ণ ভিন্ন result। একটা আকাঙ্ক্ষা, আরেকটা specification। আকাঙ্ক্ষা jinni পূরণ করে, specification engineer execute করে। আর specificity শুধু verbose হওয়া না — এটা অস্পষ্টতা দূর করা। আপনি যে word বলেন না, সেটা একটা সিদ্ধান্ত যেটা Claude আপনার জন্য নেয়। আর Claude-র সিদ্ধান্ত pattern matching-এর ওপর ভিত্তি করে, মন পড়ার ওপর না — তাই ambiguous word-এর দাম আপনাকেই দিতে হয়।

দ্বিতীয় rule — investigate করুন, তারপর answer দিন। Claude আত্মবিশ্বাসী, বিপজ্জনকভাবে আত্মবিশ্বাসী। সে propose করবে এমন file-এ edit যেটা পড়েনি, এমন import suggest করবে যেটা exist করে না, আর এমন code refactor করবে যেটা দেখেনি — malicious বলে না, কারণ সে pattern match করে, আর pattern বলে "this is probably what you want।" আমরা Claude-কে পুরো file path hallucinate করতে দেখেছি — `./utils/auth` থেকে import suggest করা যখন actual path `./lib/authentication`, অথবা তিন মাস আগে refactor করা function use করতে propose করা — সব কারণ সে অনুমান করছিল পড়ার বদলে।

তাই CLAUDE.md-তে যোগ করুন: "ALWAYS read relevant files before proposing edits. Never speculate about code you have not opened." এই একটা sentence কোনো linter-এর চেয়ে বেশি bug prevent করে — এটা Claude-কে লাফ দেওয়ার আগে দেখতে বাধ্য করে, improvise করার আগে investigate করতে।

তৃতীয় rule — কেবল যা requested হয়েছে তাই করুন। scope drift হলো wasted token-এর number one cause। আপনি login form-এ bug fix করতে বললেন, আর সে পুরো authentication module refactor করে দিল। CSS tweak চাইলেন, আর সে component অন্য framework-এ rewrite করে দিল। Claude helpful — too helpful — আর সীমানা ছাড়া helpful হলো chaos। তাই rule যোগ করুন: "Only make changes directly requested. Do not refactor adjacent code।" restrictive মনে হতে পারে, কিন্তু restrictive ই হওয়ার কথা — constraints create precision, freedom create drift, আর drift token পোড়ায়।

শেষ rule — complexity-এর সাথে thinking match করুন। Claude Code-এ thinking depth control করার দুটো mechanism আছে — `/effort` command আর `ultrathink` keyword — কিন্তু বেশিরভাগ মানুষ কখনো ব্যবহার করে না। Claude-কে default-এ যা model মনে হয় সেটাই করতে দেয়, যা সবখানে first gear-এ গাড়ি চালানোর মতো। `/fast` routine execution-এর জন্য — speed mode, simple refactors, formatting fixes, যেখানে deep reasoning-এর দরকার নেই। `/effort high` complex task-এর জন্য — new feature implementation, clear scope সহ bug fix, যেখানে reasoning matter করে। `/effort xhigh` multi-step reasoning-এর জন্য — complex refactors, integration work, যেখানে একটা সিদ্ধান্ত আরেকটাকে প্রভাবিত করে। আর `ultrathink` — এটাই Claude Code-এর একমাত্র recognized per-turn keyword — prompt-এ এই word লিখলে Claude Code সেই একটা turn-এ deeper reasoning করে; database schema change, API redesign-এর মতো architectural decision-এ। একটা important note: `think` বা `think hard` লিখলে সেগুলো Claude Code-এ special keyword হিসেবে কাজ করে না — এগুলো ordinary text হিসেবে pass হয়, recognized keyword না। সঠিক mechanism সঠিক কাজে — এটা time বাঁচায়, token বাঁচায়, আর result ভালো করে।

তাহলে সব মিলিয়ে — framework আপনাকে structure দেয়, কিন্তু specificity দেয় precision। Structure ছাড়া prompt directionless, precision ছাড়া prompt powerless। Process plus precise prompt — সেটাই disciplined engineering। এখানে কোনো magic নেই, কোনো vibe নেই — শুধু engineering।
