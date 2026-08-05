# Slide 18 — Demo: Let Bash Do the Work

## On-Screen Content
- **Header**: Skills Intro · Cost · 18 / 82
- **Title**: Demo: Let Bash Do the Work
- **Lede**: Three versions of the same `commit` skill — each one moves more work out of the LLM and into bash. The tokens follow.
- **commit v1 — LLM does everything**:
  - Claude runs each git command itself: `git status`, `git diff --stat`, `git diff --cached`
  - Asks: "what to stage?" / Asks: "commit this?" — multi-turn, interactive
  - Footer: Many tool calls · back-and-forth · high tokens
- **commit-v2 — bash collects, LLM drafts**:
  - Exactly 3 tool calls: `gather.sh` (branch, status, diff, commits) → Draft msg (LLM reads blob once) → `commit.sh` (stage + commit)
  - Zero confirmation. Sensitive files auto-excluded by script.
  - Footer: 3 tool calls · same diff volume, less round-trips
- **commit-v3 — adaptive bash, LLM hits once**:
  - Same 3 tool calls but `gather.sh` is adaptive: small change → full diff; large change → drop lockfiles/generated/vendored, cap per-file lines
  - Context curation happens in bash — no LLM involvement.
  - Footer: 3 tool calls · bash trims the diff · fewest tokens
- **Takeaway**: → The LLM should **read** context, not **gather** it. Move collection to bash — one script, one call, one read. The skill stays thin; the savings stack.

## Speaker Transcript (Bengali)

[placeholder — transcript to be filled from recording]

এতক্ষণ দেখলাম skill কীভাবে কাজ করে। এখন একটা practical প্রশ্ন — skill বানানোর সময় token খরচ কীভাবে কমানো যায়?

আমার নিজের `commit` skill-এর তিনটা version দেখাই। একই কাজ — conventional commit তৈরি করা। কিন্তু প্রতিটা version একটু বেশি কাজ bash-এ সরিয়ে দিয়েছে।

প্রথম version — `commit` v1। এখানে Claude নিজেই সব git command চালায়। `git status` চালায়। `git diff` চালায়। staging নিয়ে জিজ্ঞেস করে। commit message দেখিয়ে confirm চায়। প্রতিটা question, প্রতিটা git call, প্রতিটা back-and-forth — সব মিলিয়ে অনেক tool call হয়। এটা interactive, এটা conversational, কিন্তু প্রতিটা round-trip মানে আরো tokens।

দ্বিতীয় version — `commit-v2`। এখানে পুরো approach বদলে গেছে। মাত্র তিনটা tool call। প্রথমটা `gather.sh` — একটা bash script যেটা সব কিছু একসাথে এনে দেয়: branch name, task number, status, diff, recent commits। Claude এই blob একবার পড়ে। দ্বিতীয়টা message draft করা — LLM একবার চিন্তা করে। তৃতীয়টা `commit.sh` — script-ই staging করে, sensitive file বাদ দেয়, commit করে।

কোনো প্রশ্ন নেই। কোনো back-and-forth নেই। Script-ই সব git mutation করে — Claude শুধু reading আর drafting করে।

তৃতীয় version — `commit-v3`। Structure একই — তিনটা tool call। কিন্তু এবার `gather.sh` আরো intelligent। ছোট change হলে পুরো diff দেয়। বড় change হলে bash নিজেই decide করে — lockfile, generated file, vendored code বাদ দেয়, প্রতিটা file-এর diff cap করে। এই curation সম্পূর্ণ bash-এ হয়, LLM ছাড়া।

SKILL.md-তে একটা line আছে: "Emit no narration between the three tool calls." মানে Claude এর মধ্যে কোনো কথা বলবে না — শুধু তিনটা call করবে, শেষে result দেবে।

এই তিনটা version একটা principle demonstrate করে: **LLM-র কাজ context পড়া, context জোগাড় করা না।** যতটা পারা যায় context gathering bash-এ সরিয়ে দিন। Claude একবার পড়বে, একবার চিন্তা করবে, একবার লিখবে। বাকি সব script করে দেবে।

আমি এই দুটো version test করেছি এই session-এই — screen-এ দেখতে পাচ্ছেন। পার্থক্যটা আপনাদের নিজেদের দেখতে দিচ্ছি।
