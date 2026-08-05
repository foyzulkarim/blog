# Slide 12 — Three Scenarios, One Framework

## On-Screen Content
- **Header**: The Hook · 12 / 81
- **Title**: Three Scenarios, One Framework
- **Lede**: The same 5-phase pipeline — different entry points. The discipline never changes.
- **Pipeline**: REQ → ARCH → TASKS → TDD → REVIEW
- **Table**:
  - Greenfield | 1 2 3 4 5 | Blank slate — all 5 phases.
  - New Feature | — 2 3 4 5 | System exists — skip REQ.
  - Bugfix | RCA — 3 4 5 | Root-cause analysis first — understand why.
- **Takeaway**: → The entry point changes. The discipline doesn't. Same framework, different starting line.

## Slide 12 — Three Scenarios, One Framework — Speaker Transcript (Bengali)

এতক্ষণ আমরা 5-phase framework-টা একটা fixed pipeline হিসেবে দেখলাম — পাঁচটা phase, sequential, সব run করতে হবে। কিন্তু real world-এ সব কাজ same shape-এর না। Greenfield project আর bug fix কি same process follow করবে? হ্যাঁ — same framework। কিন্তু same entry point না।

Slide-এ তিনটা scenario দেখতে পাচ্ছেন। Same pipeline — REQ, ARCH, TASKS, TDD, REVIEW। কিন্তু কোথা থেকে শুরু করবেন সেটা scenario-র ওপর নির্ভর করে।

---

**Scenario ০১ — Greenfield।** Blank slate। কোনো existing code নেই, কোনো legacy constraint নেই, কোনো prior architecture নেই। Full pipeline — সব পাঁচটা phase। Requirements থেকে শুরু, review-তে শেষ। এটা সবচেয়ে clean scenario কিন্তু সবচেয়ে demanding-ও। কারণ কোনো reference point নেই — আপনি যে decision নেবেন সেটাই precedent হয়ে যাবে। আপনি যে naming convention choose করবেন, যে folder structure set করবেন, যে error handling pattern establish করবেন — সেটাই project-এর DNA হবে। তাই greenfield-এ Phase 1 — requirements — সবচেয়ে critical। Foundation-এ ভুল করলে পুরো structure সেই ভুলের ওপর দাঁড়াবে।

**Scenario ০২ — New Feature।** System already আছে। Requirements defined — আপনি জানেন system কী করে, কোন users ব্যবহার করে, কোন constraints আছে। তাই Phase 1 skip। Phase 2 — Architecture থেকে শুরু করুন। নতুন feature existing system-এ কীভাবে fit করবে? কোন module-এ বসবে? কোন API change লাগবে? কোন existing contract break করা যাবে না? Architecture define করুন, তারপর tasks, TDD, review — চারটা phase, same discipline।

**Scenario ০৩ — Bugfix।** এটা আলাদা। এখানে Phase 1 requirements না — Phase 1 হয়ে যায় Root Cause Analysis। Slide-এ দেখুন, REQ column-এ RCA লেখা। কারণ bug fix করার আগে বুঝতে হবে — কেন break হলো? কোন assumption ভুল ছিল? কী changed? কোন edge case miss হয়েছিল? Root cause বুঝার পর architecture phase skip — কারণ system architecture change করছেন না, existing architecture-র মধ্যেই fix করছেন। সরাসরি task generation-এ যান। Fix-টা কী হবে define করুন। এমন test লিখুন যেটা bug-টা prove করে — test red হবে কারণ bug exist করে। তারপর fix implement করুন — test green হবে। Review করুন। Merge করুন। Surgical — precise, contained, unnecessary cut ছাড়া।

---

এখন একটা practical mistake যেটা আমি team-এ বারবার দেখি — দুইটা direction-এ হয়।

**প্রথমটা** — bugfix-কে feature-এর মতো treat করা। এক লাইনের null check fix-এর জন্য full requirements document লেখা, architecture review করা। এটা waste। Process-এর জন্য process — engineering না, bureaucracy।

**দ্বিতীয়টা** — feature-কে bugfix-এর মতো treat করা। "Quick হবে, শুধু add করে দিই।" কোনো architecture discussion নেই, কোনো task breakdown নেই, শুধু code throw করা। এটা dangerous — কারণ আপনি intentional decision ছাড়া system-এর shape বদলাচ্ছেন। এক মাস পরে কেউ জিজ্ঞেস করবে "এই module এভাবে কেন?" — আর কারো কাছে answer থাকবে না।

---

Framework বলে কোন phases run করতে হবে — শুধু এটা না যে every time সব পাঁচটা run করতেই হবে। Intelligence হলো জানা কোন scenario-তে কোথায় শুরু করতে হবে — আর সেই starting point-এর পরে discipline never drops।

Entry point বদলায়। Discipline বদলায় না।

এটাই ছিল "The Hook" section-এর core content। চলুন একটু pause নিয়ে recap করি — কী শিখলাম আর এরপর কোথায় যাচ্ছি।
