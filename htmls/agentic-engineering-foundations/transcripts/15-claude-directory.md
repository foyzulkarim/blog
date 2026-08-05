# Slide 15 — The .claude/ Directory

## On-Screen Content
- **Header**: Skills Intro · Layout · 15 / 81
- **Title**: The .claude/ Directory
- **Lede**: Problem — Skills, hooks, settings, rules — scattered. Without the map, you waste hours searching.
- **Directory Tree**:
  - your-project/
    - .claude/
      - skills/ (req/SKILL.md, arch/SKILL.md, tdd/SKILL.md, review/SKILL.md)
      - agents/ (code-reviewer.md, test-writer.md)
      - hooks/ (block-rm.sh)
      - settings.json
      - rules/ (*.md)
    - CLAUDE.md
    - CLAUDE.local.md (gitignored)
- **Legend**:
  - skills/ — On-demand instructions via slash commands.
  - hooks/ — Automatic guardrails at lifecycle events.
  - settings.json — Project config — committed, team standard.
  - rules/ — Conditional instructions scoped to file paths.
  - agents/ — Specialized subagents with focused tool sets. Invoked automatically when task matches description.
- **Takeaway**: → Global: ~/.claude/settings.json + ~/.claude/CLAUDE.md. Project wins. No magic.

## Speaker Transcript (Bengali)

Claude Code install হয়ে গেছে। এখন একটা skill লেখার আগে অথবা একটা guardrail configure করার আগে, আপনাকে জানতে হবে সবকিছু কোথায় থাকে। কারণ Claude Code-এর একটা specific directory structure আছে — আর layout না জানলে ঘণ্টার পর ঘণ্টা file hunt করবেন যেগুলোর location predictable।

যা মানুষকে trip করে দেয়, তা হলো Claude Code multiple configuration layer ব্যবহার করে। Skills এক জায়গায়। Hooks আরেক জায়গায়। Settings একটা JSON file-এ। Rules একটা subdirectory-তে। তার ওপর home directory-তে global file আছে যেগুলো প্রতিটা project-এ apply করে। মনে রাখার অনেক কিছু — কেউ map দেখালে ছাড়া।

তো এই slide-টা সেই map। `.claude/` directory-এর map।

প্রতিটা Claude Code project-এর root-এ একটা `.claude/` directory থাকে। ভেতরে চারটা key subdirectory আর file।

প্রথম: `skills/` — এখানেই slash-command skill-গুলো থাকে। `req.md` requirements gathering-এর জন্য। `arch.md` architecture design-এর জন্য। `tdd.md` test-driven implementation-এর জন্য। `review.md` code review-এর জন্য। প্রতিটা skill একটা markdown file। আপনি `/req` type করলে Claude `.claude/skills/req/SKILL.md` read করে, আর ভেতরের instruction follow করে। Simple। কোনো magic না। শুধু folder-এ একটা file।

দ্বিতীয়: `hooks/` — এগুলো আপনার automatic guardrails। Lifecycle event-এ fire করা shell script। Hook script গুলো conventionally এই `hooks/` folder-এ রাখা হয়, কিন্তু register করতে হয় `settings.json`-এ। `PreToolUse` hook Claude কোনো tool use করার আগে run করে — exit code 2 দিলে সেই action block হয়। `PostToolUse` hook পরে run করে — auto-formatting অথবা auto-committing-এর জন্য perfect। Hooks সবসময় active। আপনি invoke করার অপেক্ষা করে না। এরা আপনার workflow-এর silent bodyguard।

তৃতীয়: `settings.json` — project-level configuration। Permission modes। Model selection। Custom commands। এই file git-এ committed, মানে এটা আপনার team standard। যে কেউ project clone করলে same settings পায়। আর "it works on my machine" না — কারণ agent-এর behavior-ও version-controlled।

চতুর্থ: `rules/` — specific file path-এ scoped conditional instruction। `src/api/`-এর file edit করলে API rules apply করে। `src/components/`-এর জন্য frontend rules। এভাবে irrelevant instruction দিয়ে প্রতিটা session clutter না করে domain-specific standard enforce করা যায়। এটা এমন — specialist consultant যে শুধু যখন লাগে তখনই আসে।

আপনি `agents/`-ও দেখবেন — specialized subagents focused tool set নিয়ে। Task তাদের description-এর সাথে match করলে automatically invoke হয়। Code reviewer agent। Test writer agent। প্রত্যেকের নিজের instruction আর capability।

Project root-এ `CLAUDE.md`-ও লক্ষ্য করুন — project-wide conventions। আর `CLAUDE.local.md` যেটা gitignored — আপনার personal overrides যা কখনো share হয় না। Team rules আর নিজের cheat sheet-এর মাঝে difference হিসেবে চিন্তা করুন।

আরও দুইটা location project-এর বাইরে থাকে — home directory-তে।

`~/.claude/settings.json` — user-level defaults। প্রতিটা Claude Code project-এ apply করে, যতক্ষণ না project-level settings override করে।

`~/.claude/CLAUDE.md` — global conventions। সব জায়গায় চাওয়া coding standard। Import preference। Naming convention। এটা প্রতিটা session-এ, প্রতিটা project-এ load হয়।

Global আর project settings দুটোই থাকলে, project-level জিতে। Local global-এর ওপর জিতে। Specific general-এর ওপর জিতে। এটাই hierarchy। কোনো surprise না।

এটাই complete map। Skills `skills/`-এ। Hooks `hooks/`-এ। Rules `rules/`-এ। Settings `settings.json`-এ। Conventions `CLAUDE.md`-তে। Global defaults `~/.claude/`-তে।

Layout জানুন। আপনি যা configure করবেন সবকিছু specific কোথাও থাকে। কোনো magic না। কোনো hidden menu না। শুধু directory-তে কিছু file।

Next, theory থেকে বের হই — আমার actual machine-এ এই directory structure live দেখাবো।
