# Slide N-21G — Where the KV Cache Lives

## On-Screen Content
- **Header**: Under the Hood · The Boxes · N-21G
- **Title**: Where the KV Cache Lives
- **Lede**: The cache is *not* inside the model's weights. Inside the inference server there are three distinct boxes — and your tokens' K/V only ever land in one of them.
- **Body (three boxes)**:
  - ① Weights — the model: W_Q, W_K, W_V, the MLP — loaded once at boot, shared by every request. Read-only. Never changed. Never cleared. Your tokens never go *into* them. (The machinery — fixed.)
  - ② KV Cache Store: a *separate* memory region holding the per-token K/V stack. Read + write. Grows one row per token. The only box that holds *your* data. (The prep table — fills up, kept or wiped.)
  - ③ Forward Pass — the compute: token in → matmuls → token out. Reads the weights and reads + appends the KV store. Transient — nothing persists here.
  - Closing card — at the end of a response the runtime *frees* box ② by default; box ① is untouched, ready for the next request. So the only thing worth keeping alive is the KV store. (At scale, box ② can be offloaded to other memory tiers or nodes.)
- **Takeaway**: → Weights = fixed machinery. KV cache = a separate store beside it, never part of the model — which is exactly why it *can* outlive one request.

## Speaker Transcript (Bengali)

আগের slide-এ একটা প্রশ্ন রেখে এসেছিলাম — এই KV store-টা আসলে থাকে কোথায়? অনেকের মাথায় একটা ভুল ছবি বসে যায় — মনে হয় cache-টা বুঝি model-এর ভেতরে, weights-এর সাথে মিশে আছে। ভুলটা আগেভাগে না ধরিয়ে, চলুন বরং inference server-টা — যে software আসলে model চালায় আর উত্তর বানায় — একটু খুলে ভেতরে উঁকি দিই। দেখবেন, ওটা জোড়-লাগানো একটাই জিনিস নয়; ভেতরে আছে কয়েকটা আলাদা অংশ — আর সেগুলোর মধ্যে আপনার token-এর key-value কিন্তু কেবল একটাতেই গিয়ে বসে। অংশগুলো একটা একটা করে চিনে নিই।

প্রথম অংশ — Weights, মানে model নিজেই। এগুলো হলো সেই matrices — মানে সংখ্যার সারি-কলামের ঘর — W-Q, W-K, W-V, আর MLP। সোজা কথায় বললে, এগুলো হলো model-এর ভেতরে জমা থাকা "weights" বা ওজন — এক একটা matrix এক একটা কাজ করে। W-Q, W-K, W-V দিয়ে token থেকে Query, Key, Value বের হয়, আর MLP (Multi-Layer Perceptron — একটা ধরনের ফিড-ফরওয়ার্ড নেটওয়ার্ক layer) দিয়ে তথ্য আরো প্রক্রিয়া করা হয়। এই weights একবারই load হয়, server চালু হওয়ার সময়। এরপর এগুলো প্রতিটা request, প্রতিটা user-এর জন্য একই — read-only। কখনো বদলায় না, কখনো মুছে যায় না। সবচেয়ে জরুরি কথা — আপনার token কখনো এই weights-এর "ভেতরে" ঢোকে না। এগুলো হলো কারখানার যন্ত্রপাতি — স্থির, বাঁধা।

দ্বিতীয় অংশ — KV Cache Store। এটা weights থেকে একদম আলাদা একটা memory অঞ্চল। এখানেই token-গুলোর Key আর Value সারি বেঁধে জমা হয়। এটা read আর write — দুটোই হয়, আর প্রতিটা token-এ এক সারি করে বড় হয়। গোটা server-এ এই একটাই অংশ যেখানে *আপনার* data থাকে। এটাকে ভাবুন রান্নাঘরের prep table-টা — যেখানে কেটে-বেছে রাখা জিনিস জমতে থাকে; কাজ শেষে হয় মুছে ফেলা হয়, নয়তো ঢেকে রেখে দেওয়া হয়।

তৃতীয় অংশ — Forward Pass, মানে আসল হিসাবটা যেখানে ঘটে। একটা token ঢোকে, matmul-এর হিসাব হয় — matmul মানে matrix multiplication, সারি-কলামের সংখ্যাগুলো গুণ-যোগ করার অপারেশন, এটাই model-এর মূল গাণিতিক কাজ — এরপর একটা token বেরোয়। এই হিসাব করতে গিয়ে সে দুই দিকে হাত বাড়ায় — একদিকে weights পড়ে (যন্ত্রপাতি), আরেকদিকে KV store পড়ে আর তাতে নতুন সারি জুড়ে দেয়। কিন্তু এই অংশে কিছুই জমে থাকে না — হিসাব শেষ, সব মুছে গেল। এটা ক্ষণস্থায়ী।

এবার আগের ভুল ধারণাটা মিলিয়ে নিন। অনেকে ভাবেন token গুলো weights-এর ভেতরে গিয়ে ঢোকে — না। weights হলো সেই রেসিপি, যেটা কখনো বদলায় না; আর আপনার উপকরণ গিয়ে বসে prep table-এ, শেফের ভেতরে নয়। forward pass মানে শেফ — সে রেসিপি (weights) দেখে, prep table (KV store) দেখে, পরের জিনিসটা বানায়, table-এ যোগ করে।

আর এখান থেকেই পরের ধাপটা স্পষ্ট হয়। response শেষ হলে runtime সাধারণত দ্বিতীয় অংশটা — KV store — খালি করে দেয়, পরের request-এর জন্য জায়গা বানাতে। প্রথম অংশ, weights, একটুও নড়ে না, "clear" হয় না — পরের request-এর জন্য ঠিক যেমন ছিল তেমনই থাকে। তার মানে দাঁড়াল — ধরে রাখার মতো একটাই জিনিস আছে, সেটা হলো এই KV store। (বড় production system-এ এই অংশটাকে আবার আলাদা memory tier বা আলাদা মেশিনেও সরিয়ে রাখা যায়, কিন্তু ধারণাটা একই।)

তাহলে মূল কথাটা এই — weights হলো স্থির যন্ত্রপাতি, আর KV cache হলো তার পাশে বসানো একটা আলাদা store। cache কখনোই model-এর অংশ নয় — আর ঠিক এই কারণেই এটা এক request-এর সীমা পেরিয়ে টিকে থাকতে *পারে*।

এই যে তিনটে আলাদা অংশের কথা বললাম — Weights, KV store, আর Forward pass — এদেরকে একসাথে ধরলে এই তিনটেই হলো একটা inference server-এর তিনটে বাক্স। চলুন, বাক্স তিনটে এবার চোখের সামনে দেখি।

> **▶ পরের স্লাইডে যান → N-21G1 · The Three Memory Regions (diagram)**

এই যে — তিনটে বাক্স একসাথে এক ছবিতে। আর ছবিটা শুধু concept-ই দেখায় না — এও দেখায়, এই তিনটে বাক্স একটা সত্যিকারের dashboard-এ কোন কোন panel হয়ে ফুটে ওঠে।
