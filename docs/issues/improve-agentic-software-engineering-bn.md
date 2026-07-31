# Improve the Bengali adaptation of “Agentic Software Engineering”

Status: Ready  
Priority: High  
Target: `src/content/posts/agentic-software-engineering-bn/index.mdx`  
Reference: `src/content/posts/agentic-software-engineering/index.mdx`

## Context

The Bengali post is a strong spiritual adaptation with a lively, natural voice, but it currently trades away some of the English post’s precision and credibility. The main issues are contradictory phase language, an unfinished citation, a job-seeking frame that sometimes overwhelms the engineering thesis, several unqualified technical claims, and a handful of combative generalisations.

The goal is not to turn it into a literal translation. The Bengali version should retain its distinctive rhythm and memorable lines while recovering the original’s technical discipline and durable argument.

Current editorial assessment: **B+ / 8.1**.  
Target: **A− / 8.8 or better**, ready to change `draft: true` to `draft: false`.

## Desired outcome

Publish a Bengali essay that:

- makes trustworthy software—not employability—the primary argument;
- uses the career benefit as a concrete secondary payoff;
- preserves the conversational Bangladeshi engineering voice;
- describes the seven phases without internal contradictions;
- qualifies technical advice according to risk and context;
- supports every attributed or externally verifiable claim;
- demonstrates the lifecycle through real Claude-Lens evidence;
- can be read independently without the English post open beside it.

## Editorial principles

- Preserve adaptation over literal translation.
- Prefer controlled confidence over provocation for its own sake.
- Keep the strongest colloquial lines when they sharpen the argument.
- Use English technical terms where they are more natural for the target audience, but keep surrounding Bengali syntax clean.
- Treat the English version as the source of conceptual truth when the two versions contradict each other.
- Scale recommendations to the cost of failure; avoid universal rules where the real decision is contextual.

## Work plan

### 1. Resolve publication blockers

- [ ] Replace “শেষ দুইটাতে গিয়ে মাত্র code লেখা হয়” with language that says production implementation begins in Phase 6 and Phase 7 ships and learns from it.
- [ ] Describe Phase 1 HTML/CSS as disposable prototype code rather than claiming that it involves “কোনো coding নেই”.
- [ ] Change both Phase 1 references to screenshot comparison in “Phase 04” to “Phase 06”. This includes the prose and the `03-concept-pipeline.svg` alt text.
- [ ] In Phase 3, replace implementation-time “commit” language with “task”, “increment”, or “planned increment”. Preserve the rule that every implemented increment must leave the repository runnable.
- [ ] Make it explicit that Phase 3 plans the walking skeleton and Phase 6 implements it.
- [ ] Find and link the exact Robert C. Martin source for the claim about constraining agent output instead of reading it. If the source or wording cannot be verified, remove the quotation-style passage and the unfinished reference.
- [ ] Remove the literal `*link যোগ করতে হবে*` placeholder from References.
- [ ] Audit the remaining phase numbers in prose, captions, alt text, and SVG labels against the seven-phase lifecycle.

Acceptance check: a reader can explain when prototype code, production implementation, validation, and shipping happen without encountering two conflicting answers.

### 2. Re-centre the thesis

- [ ] Rewrite the title and description so they promise trustworthy agentic engineering first and career differentiation second.
- [ ] Rework the opening paragraph beginning “আপনি যদি সত্যিই engineer…” so Claude-Lens is evidence for the method rather than evidence of the author’s status.
- [ ] Replace “আপনি চাকরির জন্য নামছেন, business-এর জন্য না” with a line that allows the lifecycle to apply to both portfolio work and maintained products.
- [ ] Introduce the proportionality rule near the opening: use the lifecycle in proportion to the cost of failure, and use disposable spikes for genuine exploration.
- [ ] Keep the paper-trail/employability argument for the final section, where it works as a consequence of rigorous engineering rather than the premise.

Acceptance check: the first screenful establishes the operating contract, intended reader, and risk-proportional scope without making an unsupported hiring promise.

### 3. Calibrate tone without flattening the voice

- [ ] Review broad claims about company owners, product managers, AI companies, reviewers, and vibe coders.
- [ ] Delete or narrow claims that target a group without contributing evidence, especially:
  - “বেশিরভাগ company owner নিজেরাই জানে না”;
  - “Product manager-রা ticket লিখতে পারে না”;
  - the claim that AI companies brand Git worktrees as their own;
  - “Vibe coding নিছক এলোমেলো চিন্তা”.
- [ ] Reframe “দুই column-ই কাজ করা software বানায়, কিন্তু একটা মাত্র column একজন engineer বানায়” so it contrasts fragile and durable evidence without gatekeeping who counts as an engineer.
- [ ] Keep high-value lines such as “আপনি release করে দোয়া করছেন”, “issue tracker হলো সেই memory যেটা agent-এর নেই”, and “ওটা তিন গুণ output না। ওটা একটা queue।”
- [ ] Read the complete post aloud and remove places where consecutive punch lines make the tone feel performative.

Acceptance check: the post remains recognisably opinionated, but disagreement with any one aside does not undermine the central lifecycle.

### 4. Restore technical nuance

- [ ] Qualify “stack pick করবেন না” as advice for product architecture when the prototype is exploring experience; acknowledge that a technical spike may need an early stack choice when architecture is the primary uncertainty.
- [ ] Change the blanket instruction to discard in-memory substitutes. Recommend real-engine integration tests for behaviours that depend on migrations, constraints, transactions, indexes, or engine semantics, while allowing fast substitutes for isolated tests where fidelity is irrelevant.
- [ ] Remove “ওটা নিয়ে মাথা ঘামাবেন না: ওই সময়টা CI খরচ করছে, আপনি না.” CI duration affects feedback time and cost; state the actual trade-off.
- [ ] Replace “শেষ নিঃশ্বাস পর্যন্ত নিজের position defend করুন” with the evidence-seeking standard from the English version: argue to expose assumptions, not to win.
- [ ] Add the distinction between hard requirements and preferences when evaluating architecture.
- [ ] Require at least two viable designs, failure modes, operating costs, invalidating assumptions, and an observable revisit trigger for consequential decisions.
- [ ] Clarify that visual comparison is one oracle for visual intent, not evidence of behaviour, accessibility, responsiveness, security, or performance.
- [ ] State that an oracle must be reproducible and actionable; flaky or unexplained failures train people and agents to ignore red gates.
- [ ] Make agent permissions task-specific and time-bounded, not only a permanent three-tier list.
- [ ] In the shipping phase, distinguish operational health, product behaviour, and business outcome; recommend the smallest useful signal set instead of telemetry volume.

Acceptance check: every strong recommendation states either its operating conditions, its trade-off, or the failure class it is designed to catch.

### 5. Add a concrete Claude-Lens evidence thread

- [ ] Select one representative Claude-Lens capability that passed through most or all seven phases.
- [ ] Collect stable public links for its prototype/reference, architecture decision, specification or ticket, pull request, test evidence, and any production learning.
- [ ] Add a compact recurring example or one dedicated case-study section tracing:
  `prototype → decision → dependency → ticket → executable evidence → pull request → production finding`.
- [ ] Name at least one decision that changed, one rejected option, or one assumption disproved by implementation or production.
- [ ] If a required artefact is not public, say so plainly or publish a redacted durable version; do not imply evidence that readers cannot inspect.

Acceptance check: a skeptical reader can follow at least one claim out of the essay and into the repository’s actual paper trail.

### 6. Recover useful concepts omitted from the English version

Adapt these ideas in the Bengali voice where they materially strengthen the post:

- [ ] Prototype awkward states: empty, loading, invalid input, partial data, denied permissions, and narrow screens.
- [ ] Define a complete ticket: outcome, business rules, inputs/outputs, ownership, invariants, edge states, evidence, non-functional constraints, dependencies, non-goals, and rollback.
- [ ] Review the specification across ticket boundaries for conflicting vocabulary and assumptions.
- [ ] Keep local and remote issue representations linked by stable identifiers and explicit states such as `draft`, `published`, and `closed`.
- [ ] Cap parallel work at review and integration capacity; call out shared APIs, ports, databases, generated files, and migrations as collision surfaces.
- [ ] Put commands, results, screenshots or traces, known risks, and rollback information on the pull request itself.

Do not restore material merely to reach paragraph-level parity. Each addition must either close a reasoning gap or make an instruction independently executable.

### 7. Tighten structure and pacing

- [ ] Clarify the names or opening sentences of Phases 3–5 so readers can distinguish foundation planning, feature decomposition, and specification partitioning.
- [ ] Remove repeated explanations of chat ephemerality, artefact durability, evidence, and gates after each idea has landed once strongly.
- [ ] Target a 10–15% prose reduction after adding the Claude-Lens evidence thread; cut repetition before cutting examples.
- [ ] Keep the limitations section, but move a short scope warning near the beginning.
- [ ] Ensure the final three sections progress rather than repeat: durable artefacts → limits → control-loop conclusion → public evidence.

Acceptance check: every major section contributes a new decision, technique, limitation, or piece of evidence.

### 8. Run a Bengali language and terminology pass

- [ ] Standardise the project name as `Claude-Lens` everywhere.
- [ ] Decide a house style for English technical nouns with Bengali suffixes and apply it consistently.
- [ ] Replace awkward calques where a natural Bengali construction is available, without forcing uncommon Bengali translations of familiar engineering terms.
- [ ] Check punctuation, italic emphasis, Bengali quotation marks, repeated spaces, and heading capitalisation.
- [ ] Verify that code-switching serves comprehension rather than filling ordinary Bengali sentences with avoidable English verbs.
- [ ] Ask at least one Bengali-speaking software engineer to mark passages that feel translated, unclear, or socially unnatural.

Acceptance check: the prose sounds natural when read aloud by the intended audience and technical terms remain immediately recognisable.

### 9. Verify diagrams, references, and rendering

- [ ] Check every diagram against the final prose after editing.
- [ ] Correct the lifecycle and concept-pipeline SVG text if it repeats the current code/phase contradiction.
- [ ] Review Bengali alt text for accuracy, brevity, and useful information not already supplied by the caption.
- [ ] Verify every external link and every attributed claim.
- [ ] Ensure references are cited from the relevant paragraph, not only collected at the end.
- [ ] Run the repository’s formatting, content validation, and production build commands.
- [ ] Inspect the rendered post at desktop and narrow mobile widths, including horizontally scrollable figures and the sticky comparison table.
- [ ] Check title, description, publication date, language metadata, canonical URL behaviour, and topic listing behaviour.

Acceptance check: the production build succeeds, all links resolve, diagrams agree with the text, and no placeholder remains.

## Suggested implementation sequence

Keep the work portable across computers by using small, independently reviewable commits:

1. `fix: correct Bengali lifecycle contradictions`
2. `docs: resolve Bengali post sources and technical claims`
3. `docs: refocus Bengali post thesis and tone`
4. `docs: add Claude-Lens evidence to Bengali post`
5. `docs: tighten Bengali adaptation language and pacing`
6. `fix: align Bengali diagrams and accessibility text`
7. `docs: publish Bengali agentic engineering post`

Do not combine unrelated site changes with these commits.

## Definition of done

- [ ] All Phase 1/3/4/6/7 contradictions are resolved in prose, captions, alt text, and SVG content.
- [ ] The unfinished Robert C. Martin reference is verified and linked or removed.
- [ ] The title, description, and opening lead with trustworthy engineering.
- [ ] The job-seeking benefit remains present but is not presented as a guaranteed outcome.
- [ ] Unsupported group-level claims have been removed, narrowed, or sourced.
- [ ] Context-dependent technical guidance is properly qualified.
- [ ] At least one real Claude-Lens capability is traceable through public artefacts.
- [ ] The strongest Bengali voice and memorable lines remain intact.
- [ ] Repetition is reduced and the final post is no longer than the current draft unless the evidence thread clearly justifies it.
- [ ] References, diagrams, metadata, accessibility text, mobile layout, and the production build have been verified.
- [ ] `draft` is changed to `false` only after every publication blocker above is complete.

## Non-goals

- Producing a paragraph-by-paragraph translation of the English post.
- Removing established English engineering vocabulary solely to make the text more formally Bengali.
- Rewriting the English source post as part of this issue.
- Changing the site-wide visual design or component system.
- Claiming that this lifecycle is appropriate for disposable scripts or open-ended exploratory spikes.
