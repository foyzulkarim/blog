# Slide N-21F2 — Inside the Lookup: How Attention Picks

## On-Screen Content
- **Header**: Under the Hood · How Attention Picks · N-21F2
- **Title**: Inside the Lookup: How Attention Picks
- **Lede**: 21F called attention a "soft dictionary lookup." Here's the actual mechanic — three steps that turn the current token's Query into one blended answer, worked on a real sentence.
- **Sentence**: "The cat sat on the mat because **it** was tired." — processing **it**: which earlier token does it refer to? Its Query compares against every earlier token's Key.
- **Step 1 · Dot-product**: Query × each Key → one relevance score per token (cat 9.1, mat 4.0, sat 0.3, the 0.1). Bigger = better match.
- **Step 2 · Softmax**: squash scores into percentages that sum to 100% — the attention weights (cat 85%, mat 10%, sat 3%, the 2%).
- **Step 3 · Weighted blend**: sum each token's Value × its weight → one vector, mostly cat's content (→ "it" ≈ cat).
- **Takeaway**: attention never returns one entry — it returns a *blend* of all Values weighted by relevance (that's the "soft"), and it reads *every* stored Key/Value to do it — which is why the whole history must stay in the KV store.

## Speaker Transcript (Bengali)

একটু আগে আমরা attention-কে বলেছিলাম একটা "soft dictionary lookup" — নরম অভিধান খোঁজা। আর তিনটে জিনিস চিনেছিলাম — Query, Key আর Value। কিন্তু "soft" বা নরম বলতে আসলে কী বোঝায়, ভেতরে ঠিক কী হিসাবটা হয়? চলুন একটা সত্যিকারের বাক্যে ব্যাপারটা ধাপে ধাপে দেখি। বাক্যটা — "The cat sat on the mat because **it** was tired." model এখন "it" শব্দটা process করছে, আর তার Query জিজ্ঞেস করছে — এই "it" আসলে আগের কোন শব্দটাকে বোঝাচ্ছে? এই প্রশ্ন নিয়ে সে আগের প্রতিটা শব্দের Key-র সাথে নিজেকে মিলিয়ে দেখে। তিনটে ধাপে।

প্রথম ধাপ — **dot-product**। "it"-এর Query-কে প্রতিটা Key দিয়ে গুণ করা হয়, ফলে প্রতিটা শব্দের জন্য একটা করে relevance score বেরোয় — মানে কে কতটা প্রাসঙ্গিক। সংখ্যা যত বড়, মিল তত ভালো। এখানে cat পেল ৯.১, mat পেল ৪.০, sat ০.৩, আর the মোটে ০.১। মানে "it" সবচেয়ে বেশি ঝুঁকছে cat-এর দিকে।

দ্বিতীয় ধাপ — **softmax**। এই কাঁচা score-গুলোকে চেপে এমন শতাংশে বদলে ফেলা হয়, যাদের যোগফল ঠিক ১০০। এগুলোই হলো attention weight, মানে মনোযোগের ভাগ। cat পেল ৮৫%, mat ১০%, sat ৩%, আর the ২%। খেয়াল করুন — কোনো একটাকে বেছে নিয়ে বাকিদের বাদ দেওয়া হয় না, প্রত্যেকেই কিছু না কিছু ভাগ পায়।

তৃতীয় ধাপ — **weighted blend**, মানে ওজন মিশিয়ে মেশানো। প্রতিটা শব্দের Value-কে তার weight দিয়ে গুণ করে সব যোগ করা হয় — ৮৫% cat-এর Value, ১০% mat-এর, ৩% sat-এর, এইভাবে। ফলে একটাই vector বেরিয়ে আসে, যেটা মূলত cat-এর content-এ ভরা। তাই model বুঝে যায় — এখানে "it" মানে "cat"।

এটাই সেই "soft" — কখনো একটামাত্র entry ফেরত আসে না, ফেরত আসে সব Value-র একটা মিশ্রণ, প্রাসঙ্গিকতা অনুযায়ী ভাগ করে নেওয়া। আর এই একটা শব্দ process করতেই সে store-এ রাখা *প্রতিটা* Key আর Value পড়ে। তার মানে গোটা history-টা কোথাও জমা থাকতেই হবে — নইলে এই হিসাব হবে না। তাহলে প্রশ্ন — সেই store-টা ঠিক কোথায় বসে? inference server-এর ভেতরে, কোন বাক্সে, কোন memory-তে? সেটাই এবার খুলে দেখি।
