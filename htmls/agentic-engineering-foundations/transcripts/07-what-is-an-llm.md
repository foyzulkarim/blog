# Slide 07 — What Is a Large Language Model?

## On-Screen Content
- **Header**: The Hook · 07 / 81
- **Title**: What Is a Large Language Model?
- **Definition**: A neural network trained on vast text that learns to predict the next token — enabling it to generate text, write code, and reason.
- **Breakthrough**: Attention Is All You Need (2017) — the transformer architecture replaced sequential processing with parallel attention.
- **Four Pillars**:
  - 01 Pre-training — Trained on billions of documents, absorbs patterns by exposure, predicts patterns not meaning
  - 02 Next-Token Prediction — Predicts the next likely token, adds it back, repeats; simple mechanism, intelligent output
  - 03 Emergent Capabilities — Small: completes sentences; Medium: summarizes paragraphs; Large: writes code, debugs, reasons
  - 04 Transformer Arch — Looks at all words at once, decides which parts matter, long-range coherence
- **Constraints**: Finite context window (~200K tokens) · No persistent memory across sessions · KV-cache is working memory, not true memory
- **Takeaway**: ! Hard limits: finite context window (~200K tokens) · no persistent memory across sessions · KV-cache is working memory, not true memory.

## Slide 07 — What Is a Large Language Model? — Speaker Transcript (Bengali)

আগের slide-এ আমরা বললাম agent-এর একটা brain লাগে। সেই brain হলো Large Language Model — LLM। চলুন বুঝি এটা কী, কীভাবে কাজ করে, আর — equally important — এর limitations কী।

২০১৭-এ Google-এর একটা research team একটা paper publish করে — "Attention Is All You Need।" এই paper introduce করলো transformer architecture, যেটা fundamentally বদলে দিলো machine কীভাবে language process করে।

এর আগে কী হতো? Dominant approach ছিল recurrent neural network — RNN আর LSTM। এগুলো text মোটামুটি sequentially process করতো — একটা token process করো, সেটার output নিয়ে পরের token-এ যাও। কিছু bidirectional variant ছিল, কিন্তু fundamental bottleneck ছিল এই sequential nature। লম্বা text-এ শুরুর information শেষ পর্যন্ত টিকতো না — signal fade হয়ে যেত।

Transformer এটা বদলে দিলো attention mechanism দিয়ে। Transformer একটা sentence বা passage-এর সব token একসাথে দেখতে পারে আর decide করতে পারে কোন token কোন token-এর সাথে কতটা relevant। এটা এমন — আপনি একটা letter এক অক্ষর এক অক্ষর করে পড়ছেন, versus পুরো page-টা এক নজরে দেখে important অংশগুলোতে focus করছেন। দুইটাতে information same, কিন্তু understanding-এর depth আর speed আলাদা।

---

এই transformer-এর ওপর ভিত্তি করে LLM চারটা pillar-এর মাধ্যমে কাজ করে।

**Pillar ০১ — Pre-training।** এই model-গুলো billions of documents-এর ওপর train করা হয় — books, articles, code repositories, web pages। Training-এর সময় model explicitly কিছু "শেখানো" হয় না — কেউ বলে দেয় না "এটা grammar, এটা logic।" বরং এত বিশাল পরিমাণ text-এ expose হতে হতে সে pattern absorb করে — sentence structure, logical flow, coding conventions। গুরুত্বপূর্ণ distinction: সে pattern recognize করে আর predict করে, "meaning বোঝে" না — অন্তত আমরা যেভাবে meaning বুঝি সেভাবে না। এটা একজন musician-এর মতো ভাবুন যে হাজার হাজার গান শুনেছে। সে কান দিয়ে তাল মেলাতে পারে, কিন্তু আপনি যদি জিজ্ঞেস করেন "কেন এই chord progression কাজ করে?" — সে theory explain করতে পারবে না। সে pattern থেকে কাজ করে, principle থেকে না।

**Pillar ০২ — Next-Token Prediction।** এটা LLM-এর core mechanism, আর এটা deceptively simple। Model একটা prompt পায় — কিছু text। সে predict করে statistically সবচেয়ে likely next token কী হবে। সেই token generate করে, prompt-এ add করে, আবার predict করে। শুধু এটুকুই। Token by token by token। কিন্তু যখন আপনি এই simple mechanism-টা billions of parameters আর trillions of training tokens-এর scale-এ চালান, output remarkably intelligent feel করে। সে code লেখে, logic follow করে, explanation দেয়। মনে রাখবেন — mechanism-টা prediction। Output-টা intelligent behave করে কারণ training data-তে intelligent pattern যথেষ্ট পরিমাণে ছিল।

**Pillar ০৩ — Emergent Capabilities।** এটা fascinating part। কিছু capabilities model-এ deliberately design করা হয়নি — scale বাড়ার সাথে সাথে এগুলো emerge করেছে। Small model sentence complete করতে পারে — "The cat sat on the..." → "mat." Medium model paragraph summarize করতে পারে। Large model code লিখতে পারে, debug করতে পারে, complex reasoning chain follow করতে পারে। এখন, code-এর বিষয়ে একটা clarification। কেউ model-কে আলাদাভাবে "coding শেখায়নি" এই অর্থে যে কোনো separate coding curriculum ছিল না। কিন্তু training data-তে deliberately massive পরিমাণ code include করা হয়েছিল — GitHub repositories, Stack Overflow, documentation। Model সেই code-এর pattern absorb করেছে, আর sufficient scale-এ সেই pattern থেকে সে নতুন code generate করতে পারে। এটা emergence — কিন্তু accidental emergence না। Training data curation একটা deliberate choice ছিল।

**Pillar ০৪ — Transformer Architecture।** Attention mechanism model-কে long-range connection করতে দেয়। যখন আপনার code-এ line 50-তে একটা variable declare করা হয় আর line 500-তে ব্যবহার করা হয়, transformer সেই connection ধরতে পারে। যখন একটা document-এর শুরুতে একটা condition set করা হয় আর শেষে reference করা হয়, transformer সেটা track করতে পারে। এই long-range coherence-ই LLM-কে useful করে — isolated sentence generation না, connected, contextual output।

---

কিন্তু — আর এটা আপনাকে অবশ্যই মনে রাখতে হবে — hard limits আছে। এগুলো ignore করলে আপনি agent-কে এমন কাজ দেবেন যেটা সে structurally করতে পারে না।

**Context window।** Best model-এর জন্য roughly 200,000 tokens। এটা কোনো software bug না যেটা next update-এ fix হবে — এটা architecture আর computational cost-এর constraint। Window exceed করলে কী হয়? Model শুরুর information-এ attention কমিয়ে দেয়। আপনি প্রথমে যে requirements দিলেন, যে conventions বললেন — সেগুলো effectively fade হয়ে যায়। Model "ভোলে" না exactly — সে আর attend করতে পারে না।

**Persistent memory নেই।** Conversation চলাকালীন model KV-cache ব্যবহার করে — এটা working memory, session-এর মধ্যে context track করার জন্য। কিন্তু session end হলে? সেই cache completely মুছে যায়। পরের session-এ model-এর কাছে আপনার নাম নেই, project context নেই, আগের conversation-এর কোনো trace নেই। প্রতিটা session clean slate — যতক্ষণ না আপনি explicitly context দেন।

এই limitations-ই explain করে কেন আমাদের agent pattern লাগে। আপনি পুরো codebase একটা prompt-এ dump করে আশা করতে পারেন না যে model সব বুঝবে আর perfect output দেবে। Context window-এ ধরবে না, আর ধরলেও attention dilute হবে। আপনার এমন একটা system লাগে — একটা agent — যে কাজকে focused, manageable chunk-এ ভাগ করে, প্রতিটা chunk LLM-এর capacity-র মধ্যে রাখে, আর output verify করে।

---

তো summary: LLM কোনো magic না। এটা একটা extraordinarily powerful pattern-matching engine যেটা massive scale-এ operate করে। Simple mechanism — next token prediction। Powerful output — code, logic, explanation। Real constraints — finite context, no memory, no true understanding। এই combination-ই আমাদের framework-এর foundation — LLM-এর strength use করো, limitations-এর around design করো।

পরের slide-এ আমরা দেখবো এই LLM practically কীভাবে agent-এর ভেতরে কাজ করে — intent থেকে execution পর্যন্ত পুরো loop।
