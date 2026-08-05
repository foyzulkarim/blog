# Slide N-21G2 — The Boxes, Live in oMLX

## On-Screen Content
- **Header**: Under the Hood · The Boxes, Live · N-21G2
- **Title**: The Boxes, Live in oMLX
- **Lede**: The three boxes aren't an abstraction — the inference server exposes each one as its own dashboard panel. Same oMLX dashboard running Qwen locally on a Mac Mini. Each panel *is* one box.
- **① Weights → "Active Models"**: Qwen3.5-9B-OptiQ-4bit · ~7.12 GB est; panel total 29.4 GB; loaded once at boot, shared by every request; your tokens never enter it.
- **② KV Store → "Runtime Cache"**: Memory 16.1 / 32 GB · 146 entries, 0 evictions; the only box holding *your* data; grows per token, kept or wiped.
- **③ Forward Pass → "Working Buffers"**: Activations + workspace · ~6 GB — the gap between 7.12 GB weights and 29.4 GB total.
- **Takeaway**: one unified memory; oMLX hands out slices — ~7 GB weights, ~6 GB forward-pass buffers, your KV in another — the dashboard tracks all three.

## Speaker Transcript (Bengali)

এইমাত্র 21G-তে আমরা তিনটে বাক্সের কথা বললাম — Weights, KV store, আর Forward pass। কিন্তু এগুলো নিছক খাতার ছবি না। যে inference server model চালায়, সে এই প্রতিটা বাক্সকে আলাদা আলাদা panel হিসেবে dashboard-এ দেখায়। এই যে screen-এ oMLX-এর dashboard — একটা Mac Mini-তে locally Qwen চলছে। প্রতিটা panel আসলে আমাদের একটা করে বাক্স। চলুন মিলিয়ে দেখি।

প্রথম বাক্স, Weights — এটা "Active Models" panel-এ। দেখুন, **Qwen3.5-9B-OptiQ-4bit, ~৭.১২ GB**। এটা আসল weight — parameter-গুলো। কিন্তু panel-এর total বলছে **২৯.৪ GB**। এর মানে weight ছাড়াও আরও ~৬ GB কিছু একটা ধরে রেখেছে। আপনার token এর ভেতরে এ বাক্সে ঢোকে না।

দ্বিতীয় বাক্স, KV store — "Runtime Cache" panel-এ। **৩২ GB-র মধ্যে ১৬.১ GB ভরেছে, ১৪৬টা entry, eviction শূন্য।** এটাই সেই একমাত্র বাক্স যেখানে *আপনার* data থাকে — token ধরে ধরে বাড়ে, আর হয় ধরে রাখা হয়, নয়তো মুছে ফেলা হয়।

তৃতীয় বাক্স, Forward pass — "Working Buffers"। এটা নিয়ে বড় confusion হয়। মনে হয় Forward pass মানে speed — কিন্তু না, এটা আসলে **activations আর workspace** — সেই ~৬ GB যেটা weight আর total-এর মধ্যে gap। যখন model run করে, intermediate value গুলো এখানে বসে। GPU core-এর compute এ বাক্স এক আর দুই, মানে weights আর KV store — দুটোকেই পড়ে, আর মাঝখানে এই working buffer-এর মধ্যে দিয়ে চলে।

গোটা জিনিসটা আসলে একটাই unified memory — oMLX সেখান থেকে টুকরো করে ভাগ দেয়: ~৭ GB weights, ~৬ GB forward-pass buffers, আর আপনার KV আলাদা। Dashboard প্রতিটা slice-ই track করে। কিন্তু এই caching — আসলে কোন কাজটা skip করছে? কোনটা বাঁচাচ্ছে? ঠিক এখানেই সবচেয়ে বড় ভুল-বোঝাবুঝিটা হয়। চলুন সেটা পরিষ্কার করি।
