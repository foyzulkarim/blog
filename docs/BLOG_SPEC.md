# Blog Specification — Single Source of Truth

Status: **Final — single source of truth for planning and building.** Consolidates and supersedes the earlier comparison docs (now deleted).

## 1. Project scope

- Standalone blog for **`blog.foyzul.com`** (confirmed).
- Astro application deployed to Cloudflare.
- Independent from `foyzul.com` and other projects.
- Focused only on publishing and reading blog posts.
- `/` is both the homepage and the post index. No separate landing, portfolio, or marketing page.

## 2. Design system decision

One consolidated production system. Do not merge both stylesheets or maintain two themes.

- **Visual source of truth: Claude** (`claude/blog.css`).
- **Semantic, accessibility, font-loading, and Astro-structure reference: ChatGPT** (`chatgpt/`).

### 2.1 Why Claude is the visual foundation

- Publication identity: serif prose with sans structure and mono data.
- 19px body copy, generous line height, 68ch reading measure.
- oklch colour tokens with carefully designed light and dark modes.
- Scrollbar-safe full-bleed grid (named tracks), not `translateX(-50%)`.
- Sticky first-column mobile tables with edge-fade and scrollbar affordances.
- Restrained borders, fills, radii, and accent colour.
- Typographic index rather than cards.

### 2.2 What comes from ChatGPT

- Semantic HTML patterns (see §5).
- Self-hosted font strategy with `unicode-range` gating.
- Simpler Astro migration path; production markup without a preview runtime.

### 2.3 Explicitly dropped

- `claude/Blog Design System.dc.html` + `claude/support.js` (Design Canvas preview tooling — not production).
- Google Fonts `<link>` tags in `claude/views/*.html`.
- ChatGPT's visual system (tokens, layout, card-less index is retained only as semantic reference).
- `chatgpt/responsive.html` — no `/responsive` QA page in v1.

**Retained from ChatGPT after all:** the Shiki dual-theme variable pattern
(`--shiki-light` / `--shiki-dark` per token, seen in `chatgpt/post.html:69`). Astro emits it with
`shikiConfig.defaultColor: false`, and it is the mechanism that makes code blocks correct in dark
mode. The block background stays on our `--code-bg` so the editorial palette of §3.3 is preserved.

## 3. Design tokens and typography

Lift the token system from `claude/blog.css`, then consolidate:

- **One authoritative light token block and one dark token block.** Remove values currently duplicated across `prefers-color-scheme` and preview-specific theme hooks.
- Remove stale specimen text, including the older 17px body-size statement. The selected body token is **19px**.
- Dark mode via `prefers-color-scheme` only. No manual toggle in v1.

### 3.1 Type roles

| Role | Typeface |
|---|---|
| Prose (body, descriptions) | Source Serif 4 |
| Headings, navigation, UI | IBM Plex Sans |
| Code, metadata, numeric data | IBM Plex Mono |
| Bengali prose and UI | Noto Sans Bengali |

### 3.2 Scale and measure

- Body: 19px, generous line height.
- Prose measure: 68ch.
- Bengali (`[lang="bn"]`) gets a longer line-height.
- Spacing and type scales: retain Claude's existing scale tokens.

### 3.3 Code blocks

- **Light `pre`** (Claude's styling), consistent with the editorial palette. ChatGPT's dark terminal-style block is not adopted.
- Horizontally overflowing code must be keyboard-focusable (`tabindex="0"` with an accessible name).

### 3.4 Layout

- Claude's named-grid page layout: `full-start / measure-start / measure-end / full-end`.
- Full-bleed content caps at 1280px on desktop.
- Full-bleed is reserved for selected tables, figures, diagrams, and wide code blocks.

### 3.5 Tables

- Claude's `.table-scroll > .table--sticky`: first column pinned, edge-fade gradients (`background-attachment: scroll/local`), visible scrollbar, explanatory overflow note.
- Mobile: wide tables use the full viewport width; table text is not reduced or squeezed.
- Semantic requirements: `<caption>`, scoped header cells.

## 4. Fonts

Self-host all fonts. No third-party font origins.

| Face | Files | Notes |
|---|---|---|
| IBM Plex Sans Latin 400/600 | WOFF2 | Headings, UI (~46KB for English-only pages) |
| Source Serif 4 (variable, roman + italic) | WOFF2 | Prose — sourced via `@fontsource-variable/source-serif-4`, 50KB each |
| IBM Plex Mono 400/600 | WOFF2 | Code/data — sourced via `@fontsource/ibm-plex-mono`, ~14KB each |
| Noto Sans Bengali 400/600 | WOFF2 | Already in `chatgpt/fonts/` (44,352 + 47,636 bytes) |

All eight files are self-hosted from `public/fonts/`; nothing is fetched from a third-party origin at runtime. Latin faces carry a `unicode-range` so Bengali codepoints fall through to Noto Sans Bengali.

Rules:

- `font-display: swap` everywhere.
- Bengali faces gated behind `unicode-range` so English-only pages never request them; loaded only when Bengali text is present.
- Subset Latin faces to the required ranges before shipping.
- Copy `chatgpt/fonts/*.woff2` into the Astro public asset directory; source the missing Source Serif 4 and IBM Plex Mono WOFF2 files.

## 5. Semantic HTML and accessibility requirements

These are hard requirements, not preferences.

### 5.1 Document structure

- One `<main>` per page.
- One `<h1>` per page.
- One `<article>` around each complete post — layout must never split a post into multiple articles (see §9.2, full-bleed contract).
- Skip link as the first focusable element.

### 5.2 Index/post list

- Reverse-chronological list marked up as `<ol>`.
- Each entry: `<article>` containing an `<h2>` title linking to the post, `<time datetime>`, and one concise description.

```html
<ol class="post-list">
  <li>
    <article class="post-item">
      <h2 class="post-item__title"><a href="/cold-starts-across-five-edge-runtimes/">Cold starts across five edge runtimes</a></h2>
      <time class="post-item__date" datetime="2026-07-14">14 Jul 2026</time>
      <p class="post-item__desc">The same 1.4 MB handler, deployed unchanged, measured from four regions over 72 hours.</p>
      <ul class="tags">…</ul>
    </article>
  </li>
</ol>
```

This is incompatible with the Claude prototype's `.post-link`, which made the whole row a single
`<a>` carrying the grid areas (`claude/blog.css:630`) — the `<h2><a>` required here cannot nest
inside a row-level anchor. The grid moved onto `.post-item` instead.

### 5.3 Language

- `lang="bn"` on Bengali titles, descriptions, and prose. Triggers the Noto Sans Bengali swap and longer line-height.

### 5.4 Media and data

- Meaningful images get alternative text.
- SVG diagrams get accessible `<title>`/`<desc>`.
- Tables get `<caption>` and scoped headers.
- Any horizontal scroller (tables, code) is keyboard-focusable.

### 5.5 Interaction targets

- Nav and RSS links meet minimum target sizes (the Claude prototypes' small nav/RSS hit areas must be increased).
- Visible focus styles (Claude's are strong — retain).

### 5.6 Contrast

Retain the Claude palette; measured contrast in the prototypes:

Measured in the built site (`npm run verify`), not estimated:

| Role | Light | Dark |
|---|---:|---:|
| Primary text | 15.19:1 | 12.81:1 |
| Secondary text | 5.65:1 | 7.81:1 |
| Faint text | 4.73:1 | 5.84:1 |
| Accent (links) | 5.62:1 | 9.07:1 |

Do not introduce colours below these floors. The dark `--text-faint` was lifted from
`oklch(0.615 …)` to `oklch(0.660 …)` during the port so it clears 4.5:1; the original value was
never measured.

## 6. Site structure

| Route | Purpose |
|---|---|
| `/` | Homepage = post index ("Writing"), page 1 |
| `/page/<n>/` | Index pages 2..n — destination for the §8.3 "Older posts" link |
| `/<slug>/` | Individual post — bare slug, no `/posts/` or `/writing/` prefix. Slugs are asserted at build time against the reserved set (`about`, `topics`, `page`, `rss.xml`, `404`); a collision fails the build rather than silently dropping the post |
| `/404` | Not-found page (`dist/404.html`, served by Cloudflare on unmatched routes) |
| `/topics/` | Tag index — posts grouped by tag from the content collection |
| `/about/` | About page — lift content from `chatgpt/about.html` |
| `/rss.xml` | RSS feed |
| `/courses` | Not a page — nav links externally to `https://courses.foyzul.com` (`target="_blank"` `rel="noopener"`) |

## 7. Header and footer

### 7.1 Header

- `foyzul` wordmark linking to `/`.
- Nav: **Writing** (active on `/`), **Topics**, **Courses** (external), **About**.
- No hamburger menu. Items wrap to a second row at narrow widths with reduced gap.

### 7.2 Footer

Single line on desktop, stacked on mobile:

```text
foyzul · RSS · © 2026
```

No other footer content.

## 8. Homepage specification (`/`)

### 8.1 Introduction

```html
<header class="index-intro">
  <h1>Writing</h1>
  <p class="index-intro__lede">
    Notes on software architecture, cloud systems, and engineering with AI.
    <span class="index-intro__meta">1 post since 2026.</span>
  </p>
</header>
```

`.index-intro` is the **wrapper**. In the Claude prototype the same class name was a 14px
uppercase `--text-faint` eyebrow (`claude/blog.css:671`); applying it to this header would have
rendered the lede tiny, uppercase and faint. The eyebrow treatment now lives on
`.index-intro__meta`, which carries only the post-count metadata.

- `<h1>Writing</h1>` doubles as the active nav label.
- Lede may append post count + start year ("42 posts since 2019") as secondary metadata, computed from the content collection. It must never replace the `<h1>`.

### 8.2 Post list

Reverse chronological. Each row:

1. Post title (`<h2>`, linked).
2. Date — format `14 Jul 2026` (day + short month + year), with `datetime` attribute. Right-aligned on desktop, stacked under the title on mobile.
3. One concise description.
4. Tag chips — inline, all-caps, `--text-faint`, separated by `·`. Links to `/topics/`.

Bengali posts appear in the same chronological stream with `lang="bn"`; a `বাংলা` chip makes the language discoverable.

### 8.3 Pagination

`→ Older posts (N more)` link. No numbered pages until ~50 posts.

### 8.4 Appearance rules

Follow Claude's index direction:

- Typographic, not card-based.
- Hairline separators between rows.
- Sans post titles, serif descriptions, mono dates.
- Generous mobile spacing.
- No hero, no featured-post carousel, no card grid, no images, no author avatar, no read-time, no promotional sections.

### 8.5 Reference layouts

Desktop (1440px):

```text
──────────────────────────────────────────────────────────────────────
foyzul              Writing   Topics   Courses   About
──────────────────────────────────────────────────────────────────────


  Writing
  ───────
  Notes on software architecture, cloud systems,
  and engineering with AI. 42 posts since 2019.


  ────────────────────────────────────────────────────────────────
  Cold starts across five edge runtimes                  14 Jul 2026
  The same 1.4 MB handler, deployed unchanged, measured
  from four regions over 72 hours.
  EDGE RUNTIMES · BENCHMARKS
  ────────────────────────────────────────────────────────────────
  Postgres connection pooling when your app         28 Jun 2026
  scales to zero
  Serverless breaks the assumption pgbouncer was
  designed around. Four workarounds, measured.
  POSTGRES · SERVERLESS
  ────────────────────────────────────────────────────────────────
  ইউনিকোড নরমালাইজেশন এবং বাংলা টেক্সট সার্চ          09 Jun 2026
  যুক্তাক্ষর এবং নুক্তা-যুক্ত অক্ষরের কারণে বাংলা সার্চ
  কেন ভেঙে যায়, এবং NFC নরমালাইজেশন দিয়ে তা কীভাবে
  ঠিক করা যায়।
  বাংলা
  ────────────────────────────────────────────────────────────────

  → Older posts (37 more)


──────────────────────────────────────────────────────────────────────
foyzul                                RSS · © 2026
──────────────────────────────────────────────────────────────────────
```

Mobile (380px):

```text
──────────────────────────────
foyzul                Topics
            Writing  Courses
                          About
──────────────────────────────

  Writing
  ───────
  Notes on software
  architecture, cloud
  systems, and engineering
  with AI. 42 posts since
  2019.


  ──────────────────────────
  Cold starts across five
  edge runtimes
  14 Jul 2026
  The same 1.4 MB handler,
  deployed unchanged,
  measured from four regions.
  EDGE RUNTIMES · BENCHMARKS
  ──────────────────────────
  Postgres connection pooling
  when your app scales to zero
  28 Jun 2026
  Serverless breaks the
  assumption pgbouncer was
  designed around.
  POSTGRES · SERVERLESS
  ──────────────────────────
  ...

──────────────────────────────
foyzul
RSS · © 2026
──────────────────────────────
```

## 9. Astro implementation plan

### 9.1 Production structure

- One global stylesheet (consolidated tokens + components).
- Self-hosted fonts and assets in the public directory.
- Minimal page-specific classes.
- No client JavaScript required for reading.
- No parallel ChatGPT/Claude visual systems — prototypes are reference only, not shipped.

### 9.2 The full-bleed contract (must fix)

Claude's prototype requires full-bleed elements to be direct children of `.page`, which forced one post to be split into multiple `<article>` elements. The Astro implementation must:

- Keep one semantic `<article>` per post, and
- Allow selected tables, figures, diagrams, and code blocks inside it to enter the full-bleed track.

Layout must not split a post into multiple articles.

### 9.3 Build sources

| Piece | Source |
|---|---|
| Token system / global CSS | `claude/blog.css` (consolidated per §3) |
| Post layout template | `claude/views/post.html` + `claude/views/wide-table.html` |
| About page content | `chatgpt/about.html` |
| Font files (Bengali, Plex Sans) | `chatgpt/fonts/` |
| Topics index | New — group posts by tag from the content collection |
| Semantic patterns | §5 of this document |

### 9.4 Corrections to Claude's markup (from the accessibility review)

1. Real `<h1>` on the index (covered by §8.1).
2. Index post titles as `<h2>`.
3. `<time datetime>` instead of date spans.
4. `lang="bn"` on Bengali content.
5. One `<article>` per complete post (§9.2).
6. Keyboard-focusable code/table overflow regions.
7. Skip link.
8. Larger nav and RSS hit areas.

## 10. Responsive requirements

Verified targets: 1440px desktop, 768px tablet, 380px mobile.

- No document-level horizontal overflow at any tested size.
- Body copy stays at 19px on all sizes.
- Full-bleed caps at 1280px on desktop.
- Wide tables use the full mobile viewport with the first column pinned.
- Header nav wraps (no hamburger).
- Footer stacks on mobile.

## 11. Out of scope for v1

- Manual dark-mode toggle.
- `/responsive` QA page.
- Numbered pagination.
- Search.
- Comments.
- Any client-side JavaScript requirement for reading.

## 12. Open items

**Built.** The Astro site exists, builds clean, and passes the §10 responsive and §5 accessibility
checks at 1440/768/380 in both colour schemes (`npm run verify`). Fonts are sourced. See
`docs/ARCHITECTURE.md` for the build-side decisions.

Remaining:

- **Tag chips link to `/topics/#<tag>`**, an anchor into the grouped page, not a filtered view.
  Per-tag routes (`/topics/<tag>/`) remain an option.
- **About page links** to `linkedin.com` and `youtube.com` are the placeholders inherited from
  `chatgpt/about.html`; they need real profile URLs.
- §3.5's sticky-column table system and §3.3's code styling are implemented and unit-verified but
  **unexercised by real content** — the first post contains no tables and no code blocks.
