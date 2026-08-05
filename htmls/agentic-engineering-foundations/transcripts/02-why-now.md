# Slide 02 — Why Now

## On-Screen Content
- **Header**: The Hook · 02 / 81
- **Title**: Speed without discipline is not engineering.
- **Lede**: AI coding agents make development 10× faster. Without process, that speed produces broken code, lost context, and runaway cost.
- **Cards**:
  - 01 The Paradigm Shift — Agents reason across entire codebases, write/test/fix/review, genuine collaborators, speed increases 10× or more
  - 02 Quality at Risk — Code looks correct but breaks things, missed edge cases, security flaws, no architectural context
  - 03 Cost Escalation — Every interaction costs tokens, bloated sessions waste context, undisciplined workflows multiply spend
- **Card footers**: Agents are teammates, not tools. | Without process, speed kills quality. | Without hygiene, costs spiral.
- **Takeaway**: → This course gives you the 5-phase framework, guardrails, and cost controls to turn raw speed into disciplined engineering.

## Speaker Transcript (Bengali)

আমি এখন যা দেখছি, সেটা একটু বলি — কারণ এটা সত্যিই অসাধারণ, আবার একটু ভয়ংকরও। AI coding agent-গুলো development-কে অন্তত দশ গুণ faster করে দিচ্ছে। আমি কোনো vendor whitepaper quote করছি না — আমি নিজে এটা measure করেছি। যে কাজ আগে ঘণ্টা লাগতো, এখন মিনিটে হয়। Complex refactors যেগুলো দিনের পর দিন focused effort চাইতো, সেগুলো এখন delegate করা যায়। Delivery speed একটা order of magnitude-এ বেড়ে গেছে।

আর এটা শুধু fast typing-এর কথা না। এই agent-গুলো আমাদের পুরো codebase জুড়ে reason করতে পারে — code লেখে, test করে, bug fix করে, এমনকি review-ও করে। এগুলো GitHub Copilot-এর মতো autocomplete tool না। এগুলো genuine collaborator — আমাদের teammate। এই distinction-টা মাথায় রাখুন, কারণ এটা পরে গুরুত্বপূর্ণ হবে।

কিন্তু একটা কথা আছে — আর এটা critical — এই speed-এর দাম আছে। আসলে তিনটা দাম। আর যদি আমরা এগুলো ignore করি, তাহলে এই paradigm আমাদের help-এর চেয়ে hurt করবে বেশি।

প্রথম, quality। যখন একজন human code লেখে, সে context বোঝে। সে convention জানে। Architecture decision-এর weight অনুভব করে। একটা AI agent সেটা করে না। সে generate করে এমন code যেটা দেখতে ঠিক — compile হয়, superficial check পাস করে — কিন্তু সে miss করে জিনিস। Edge case miss করে। Subtle bug introduce করে। Existing features অজান্তেই break করতে পারে, কারণ সে পুরো system-এ side effects দেখতে পায় না। Security flaw-ও commit করতে পারে — hardcoded credentials, SQL injection risk, improper input validation — আর সেই code এক নজরে perfectly fine দেখায়। সবচেয়ে বড় কথা — agent আমাদের team-এর conventions জানে না। ছয় মাস আগে কেন সেই architecture decision নেওয়া হয়েছিল, কোন pattern আমাদের codebase-এ follow করা হয়, কোন shortcut আমরা ইচ্ছা করেই এড়িয়ে গেছি — এগুলোর কিছুই তার কাছে নেই। সে blank slate থেকে code করে, আর আমাদের পুরো institutional knowledge-কে ignore করে।

যেই গতিতে আমরা code generate করবো, সেই গতিতে bad code-ও generate করতে পারবো। আর rigorous quality process না থাকলে, আমরা engineering করছি না — আমরা gamble করছি।

দ্বিতীয়, lost context। Agent-এর একটা session যত লম্বা হয়, তত বেশি সে আগের decision ভুলতে শুরু করে। Session-এর শুরুতে যে architectural choice নেওয়া হয়েছিল, সেটা মাঝপথে contradict করে নতুন code লেখা হয়। একটা component-এর সাথে আরেকটা component-এর যে agreement ছিল, সেটা ভেঙে যায়। আমরা জানিও না কখন এটা হলো — কারণ প্রতিটা individual response ঠিকঠাক দেখায়। Context হারানো মানে শুধু memory হারানো না — এর মানে হলো আমাদের codebase-এ inconsistency ঢুকে যাওয়া, যেটা পরে বের করা অনেক কঠিন।

তৃতীয়, cost। AI agent-এর প্রতিটা interaction-এ token লাগে। আর token-এর দাম আছে। একটা careless workflow — যেটা unnecessary context pathায়, পঞ্চাশ লাইনের bash script prompt-এর ভেতর embed করে, অথবা unrelated task-এর মাঝে session clear করে না — খুব দ্রুত cost বাড়িয়ে দেয়। এর বিপরীতে, একটা disciplined workflow একই result fraction of the price-এ achieve করতে পারে।

Speed easy। Speed with quality and cost control hard।

ঠিক এই problem-টাই এই course solve করার জন্য ডিজাইন করা হয়েছে। আগামী কয়েক ঘণ্টায়, আমরা একটা 5-phase agentic framework শিখবো যেটা AI-assisted development-এ engineering discipline আনে। আমরা দেখবো কীভাবে requirements gather করতে হবে, যাতে ambiguity broken code-এ পরিণত না হয়। কীভাবে architecture design করতে হবে, যাতে agent এক লাইন code লেখার আগেই system বোঝে। কীভাবে কাজকে testable task-এ ভাগ করতে হবে। কীভাবে test-driven development enforce করতে হবে, যাতে quality verify হয়, assume করা না হয়। আর কীভাবে multi-agent code review চালাতে হবে, যাতে যা human বা single agent miss করে, সেটা ধরা পড়ে।

আমরা operational layer-ও cover করবো: automatic guardrails কীভাবে setup করতে হবে যাতে credential leak হয় না, session hygiene কীভাবে configure করতে হবে যাতে cost কম থাকে, আর reusable skills কীভাবে build করতে হবে যাতে প্রতিটা session আমাদের convention দিয়ে শুরু হয়, blank slate নিয়ে না।

এই course শেষে, আমরা শুধু AI দিয়ে code করবো না। আমরা agent দিয়ে engineering করবো — process দিয়ে, quality gate দিয়ে, cost control দিয়ে। আমরা "vibe coding"-এর জায়গা থেকে move করবো — যেখানে prompt ছুঁড়ে আর best-এর আশা করা হয় — একটা reproducible, trustworthy, professional workflow-এ।

এটাই promise। চলুন শুরু করি।
