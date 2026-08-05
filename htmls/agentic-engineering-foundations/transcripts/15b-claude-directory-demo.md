# Slide 15b — Demo: A Real ~/.claude/ — Memory, History & More (2 of 2)

## On-Screen Content
- **Header**: Skills Intro · Demo · 2 of 4 · 15b / 81
- **Title**: A Real ~/.claude/ — Memory, History & More
- **Badge**: Demo — the directories Claude manages itself
- **Directory Tree** (bottom half):
  - agent-memory/          ← Claude's persistent memory
  - file-history/          ← per-file edit log (69 files)
  - projects/              ← per-project stored state
  - plans/                 ← planning artifacts
  - tasks/                 ← task tracking
  - jobs/                  ← background job state
  - sessions/              ← active session data
  - transcripts/           ← 84 full conversation logs
  - history.jsonl          ← every command ever run
  - cost-log.jsonl         ← token & cost per session
  - kimi.json  glm.json    ← cloud LLM providers
  - ollama.json  omlx.json ← local model providers
- **Cards**:
  - Memory & State — agent-memory/, file-history/ (69 files), projects/
  - Audit & Cost — history.jsonl, cost-log.jsonl, transcripts/ (84)
  - Custom LLM Providers — kimi.json, glm.json, minimax.json, ollama.json, omlx.json, lmstudio.json
- **Takeaway**: → Let's open this live — switch to terminal and walk through each directory.

## Speaker Transcript (Bengali)

আগের slide-এ দেখলাম config, skills, agents — যেগুলো আপনি নিজে লেখেন। এই slide-এ দেখবো — Claude নিজে যা manage করে। এগুলো আপনি directly edit করবেন না, কিন্তু জানা দরকার কারণ এগুলো থেকে অনেক useful information পাওয়া যায়।

**`agent-memory/`** — Claude-এর persistent memory। Session শেষ হলে Claude যা শেখে — আপনার preferences, project-specific patterns, past decisions — এখানে লিখে রাখে। পরের session শুরু হলে পড়ে। এটাই Claude-কে "মনে রাখার" ক্ষমতা দেয়। আপনি `/memory` command দিয়ে দেখতে আর edit করতে পারবেন।

**`file-history/`** — per-file edit log। এই machine-এ 69টা file track হচ্ছে। Claude কোনো file edit করলে, কোন session-এ কী change হয়েছে সেটা log হয়। পরে কোনো decision reverse করতে হলে বা কোনো change কোথা থেকে এলো বুঝতে হলে এখান থেকে দেখা যায়।

**`projects/`** — per-project stored state। প্রতিটা project-এর জন্য আলাদা subdirectory। Project-specific memory, task state, context — সব এখানে। আপনি কোনো project-এ কাজ করলে Claude এই directory-তে সেই project-এর information রাখে।

**`plans/`, `tasks/`, `jobs/`** — planning artifacts। কোনো complex task plan করলে, সেই plan এখানে save হয়। Task breakdown, job queue — সব tracked। Session শেষ হলেও কাজ হারায় না।

**`sessions/` আর `transcripts/`** — conversation history। এই machine-এ 84টা full transcript আছে। প্রতিটা conversation পুরোপুরি save। আপনি যদি কোনো decision আবার দেখতে চান, কোনো session-এ Claude কী বলেছিল খুঁজতে চান — `transcripts/`-এ আছে।

**`history.jsonl`** — এটা একটু surprising। Claude যতো Bash command ever run করেছে এই machine-এ — সব এখানে। Full audit trail। আপনি যদি জানতে চান Claude কোনো নির্দিষ্ট session-এ কী করেছিল — এটা দেখুন।

**`cost-log.jsonl`** — প্রতিটা session-এর token spend automatically track হয়। কত token গেলো, approximate cost কত। কোনো session unusually expensive হলে বুঝতে পারবেন।

এখন সবচেয়ে interesting জিনিস — এই machine-এ এই JSON file গুলো: `kimi.json`, `glm.json`, `minimax.json`, `ollama.json`, `omlx.json`, `lmstudio.json`। এগুলো custom LLM provider configurations। Claude Code শুধু Anthropic model-এ locked না। অন্য cloud provider — Kimi, GLM, Minimax। Local model — Ollama দিয়ে Llama, Mistral। LM Studio দিয়ে যেকোনো local model। সব configure করা যায়।

এখন terminal-এ switch করি আর এগুলো actually open করে দেখি।
