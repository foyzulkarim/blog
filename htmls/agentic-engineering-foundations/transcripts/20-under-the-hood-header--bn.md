# Slide N-20 — Under the Hood (Section Header)

## On-Screen Content
- **Section kicker**: · · · Under the Hood
- **Section title**: Under the Hood.
- **Section lede**: You've seen *what* to build — skills, the .claude directory, the workflow. Before we build, we open the machine. Tokens, the context window, the request loop, and caching — the four things that explain why agents forget, why long sessions get expensive, and why structure beats memory. After this, nothing in the build is magic.

## Speaker Transcript (Bengali)

এই পর্যন্ত আমরা skill নিয়ে মোটামুটি সবকিছুই দেখে ফেললাম — কীভাবে লিখতে হয়, কীভাবে design করতে হয়, আর কোথায় গেলে আরো গভীরে যাওয়া যায়। অর্থাৎ কী বানাতে হবে — skill, .claude directory, পুরো workflow — সেটা এখন আমাদের হাতের মুঠোয়। কিন্তু একটা জিনিস আমরা এখনো ছুঁয়েও দেখিনি — এই পুরো জিনিসটার ভেতরে আসলে কী ঘটছে। গাড়ি চালানো তো শিখে ফেললাম, এবার একটু bonnet টা খুলে engine-টা দেখে নেওয়া যাক।

এই section-এ আমরা চারটা জিনিস খুলে দেখব — token, context window, tool loop, আর caching। শুনতে আলাদা আলাদা মনে হলেও, এই চারটা আসলে একই গল্পের চারটা অংশ। আর এই চারটা একবার বুঝে গেলে আপনি নিজেই বুঝে যাবেন — কেন agent কিছুক্ষণ পরেই সব ভুলে যায়, কেন একটা লম্বা session হঠাৎ এত দামি হয়ে ওঠে, আর কেন আমরা বারবার বলি যে structure আসলে মুখস্থের চেয়ে অনেক বেশি শক্তিশালী।

আর সবচেয়ে গুরুত্বপূর্ণ কথাটা হলো — এই section টা শেষ করার পর, সামনের build-এ আর একটা জিনিসও আপনার magic মনে হবে না। যা ঘটবে তার সবটাই mechanics, সবটাই খুলে ব্যাখ্যা করা যায়। তো চলুন একদম গোড়া থেকে শুরু করি — যে জিনিসটা দিয়ে model সবকিছু মাপে, সবকিছু পড়ে, আর সবকিছুর দাম ঠিক হয়: token।
