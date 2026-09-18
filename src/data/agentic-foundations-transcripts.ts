/*
 * Speaker transcripts for the "Agentic Software Engineering: Foundations" deck.
 *
 * These are the words spoken while the deck was recorded for the video course.
 * They power two things:
 *   1. The in-slide "Transcript" toggle in the reading view (read the whole talk).
 *   2. The speaker-notes surface when presenting.
 *
 * ── How to author ────────────────────────────────────────────────────────────
 * The map is keyed by each slide's `data-label` (exactly as it appears in the
 * deck MDX, e.g. "03 Foundations"). Each value is the narration for that slide
 * as an array of paragraphs — one string per paragraph. Long transcripts are
 * fine; the panel scrolls.
 *
 *   "03 Foundations": [
 *     "First paragraph of what you said on this slide…",
 *     "Second paragraph…",
 *   ],
 *
 * An empty array (`[]`) means "no transcript" — that slide gets no control.
 * Every slide in the deck is listed below so there is a slot ready for each.
 * The entries below are PLACEHOLDERS written from each slide's own content —
 * replace them with your real narration.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type SlideTranscripts = Record<string, string[]>;

const placeholder = (label: string): string[] => [
  `Narration for “${label}” goes here — paste what you said while presenting ` +
    `this slide, split into paragraphs. Delete this line once you do.`,
];

export const transcripts: SlideTranscripts = {
  // A few worked examples (multi-paragraph, to show the intended shape and to
  // exercise the scrolling panel for longer "big chunk" transcripts).
  '01 Cover': [
    'Welcome. Over the next hour we are going to build a foundation for what I ' +
      'call agentic software engineering — the discipline of working deliberately ' +
      'with AI coding agents rather than being carried along by them.',
    'This is the first course in the series. We start with why discipline matters ' +
      'at all when the tools feel this fast, then we get hands-on with Claude Code, ' +
      'then skills, and finally we open the machine and look at what is actually ' +
      'happening under the hood with tokens, context, and caching.',
  ],
  '03 Foundations': [
    'Here is the shape of the whole journey. Four modules, and they are ordered on ' +
      'purpose — from the process, to the interface, to the machine.',
    'Module one is about discipline: agents, large language models, vibe coding, and ' +
      'the five-phase framework that keeps you in control. Module two is Claude Code ' +
      'itself — the CLI, its configuration surface, and the files it manages for you.',
    'Module three is skills: reusable workflows you can invoke precisely, written so ' +
      'they are token-aware. And module four goes under the hood — tokens, context, ' +
      'inference, the KV cache, prompt caching, and the working habits that fall out ' +
      'of understanding all of it. Understand the process, learn the interface, open ' +
      'the machine, then work with intention.',
  ],
  '21G The Boxes': [
    'Now let us make the abstract concrete. When people say "context window," it is ' +
      'easy to picture one undifferentiated bucket of text. It is not. Think of it as ' +
      'a set of boxes, each with a different job and a different lifetime.',
    'There is the system box — stable instructions that rarely change. There is the ' +
      'conversation box, growing turn by turn. There are tool results, which can be ' +
      'huge and volatile. Keeping the stable things stable and the volatile things at ' +
      'the edges is exactly what lets prompt caching do its job, and it is why the ' +
      'order of what you put in front of the model matters so much.',
  ],

  // Every remaining slide, ready for your narration.
  '02 The Hook': placeholder('02 The Hook'),
  '04 The Hook': placeholder('04 The Hook'),
  '05 The Hook': placeholder('05 The Hook'),
  '06 The Hook': placeholder('06 The Hook'),
  '07 The Hook': placeholder('07 The Hook'),
  '08 The Hook': placeholder('08 The Hook'),
  '09 The Hook': placeholder('09 The Hook'),
  '10 The Hook': placeholder('10 The Hook'),
  '11 The Hook': placeholder('11 The Hook'),
  '12 The Hook': placeholder('12 The Hook'),
  '13 Reflection': placeholder('13 Reflection'),
  '14 The CLI': placeholder('14 The CLI'),
  '15 Layout': placeholder('15 Layout'),
  '15a Demo 1 of 4': placeholder('15a Demo 1 of 4'),
  '15b Demo 2 of 4': placeholder('15b Demo 2 of 4'),
  '15c Demo 3 of 4': placeholder('15c Demo 3 of 4'),
  '15d Demo 4 of 4': placeholder('15d Demo 4 of 4'),
  '15e Dashboard': placeholder('15e Dashboard'),
  '16 Skills Concept': placeholder('16 Skills Concept'),
  '16a Ecosystem': placeholder('16a Ecosystem'),
  '16a-1 Built-in Demo': placeholder('16a-1 Built-in Demo'),
  '16b Agents': placeholder('16b Agents'),
  '16c Demo': placeholder('16c Demo'),
  '17 Hands-on': placeholder('17 Hands-on'),
  '18 Cost': placeholder('18 Cost'),
  '18a Power': placeholder('18a Power'),
  '19 Frontmatter': placeholder('19 Frontmatter'),
  '19a Anatomy': placeholder('19a Anatomy'),
  '20 Under the hood header': placeholder('20 Under the hood header'),
  '21A The Unit': placeholder('21A The Unit'),
  '21B The Container': placeholder('21B The Container'),
  '21C Statelessness': placeholder('21C Statelessness'),
  '21D Multi-Turn': placeholder('21D Multi-Turn'),
  '21E The Problem': placeholder('21E The Problem'),
  '21E0 Roadmap': placeholder('21E0 Roadmap'),
  '21E1 Inside One Turn': placeholder('21E1 Inside One Turn'),
  '21E2 Live Demo': placeholder('21E2 Live Demo'),
  '21F The First Fix': placeholder('21F The First Fix'),
  '21F2 How Attention Picks': placeholder('21F2 How Attention Picks'),
  '21G1 Memory regions': placeholder('21G1 Memory regions'),
  '21G2 The Boxes, Live': placeholder('21G2 The Boxes, Live'),
  '21G3 Demo': placeholder('21G3 Demo'),
  '21H0 What Caching Skips': placeholder('21H0 What Caching Skips'),
  '21H1 The Solution': placeholder('21H1 The Solution'),
  '21H2 Cache over time': placeholder('21H2 Cache over time'),
  '21I Stable vs Volatile': placeholder('21I Stable vs Volatile'),
  '21J Live Demo': placeholder('21J Live Demo'),
  '21J2 Live Demo': placeholder('21J2 Live Demo'),
  '21K Working Habits': placeholder('21K Working Habits'),
  'Course close': placeholder('Course close'),
};
