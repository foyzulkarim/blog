# Architecture — blog.foyzul.com

Companion to `BLOG_SPEC.md`. The spec defines *what it looks like*; this defines *what gets built*. Where the two disagree, this document records the resolution and the spec section that needs amending.

## 0. Decisions locked

| # | Decision | Consequence |
|---|---|---|
| L1 | **Spec §3 wins over `post-1/`.** post-1 is a draft, not the target design. | Its content is re-authored into the Claude token system. See §7. |
| L2 | **Bengali face is Noto Sans Bengali.** | Use the WOFF2 files in `public/fonts/`. Spec §3.1 is authoritative. |
| L3 | **Static build, no SSR.** Nothing in the spec needs a server. | No Astro adapter. See §2. |
| L4 | **MDX, not plain Markdown.** | post-1 needs `<Figure>`, `<Callout>`, and inline SVG diagrams as components. Raw HTML in `.md` would work but is not authorable at that density. Reversible if v1 posts turn out to be prose-only. |
| L5 | **Full-bleed via `subgrid`.** | Chosen from the three options in §6.1. Keeps one `<article>` per post with the track definition in one place. |
| L6 | **Tag chips link to `/topics/#<tag>`.** | Option (a) from §5.2 — no new routes, no empty-tag cases. |
| L7 | **`site` = `https://blog.foyzul.com`.** | Confirmed. RSS, sitemap, and canonical tags all emit absolute URLs on this origin. |

## 1. Stack

- Astro, static output (`output: 'static'`, the default).
- MDX via `@astrojs/mdx`.
- RSS via `@astrojs/rss`.
- Shiki for code (built into Astro, dual-theme — see §8).
- Zero client JavaScript. No framework integration, no islands.
- Deployed to Cloudflare Workers static assets.

## 2. Deployment

Cloudflare's current Astro guide targets **Workers with Workers Assets**, and states an adapter is not needed for a static site. No `main` field, because there is no Worker code — only assets.

```jsonc
// wrangler.jsonc
{
  "name": "blog-foyzul-com",
  "compatibility_date": "2026-07-30",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page",
    "html_handling": "auto-trailing-slash"
  }
}
```

`not_found_handling` is **not** optional. Its default returns a null-body 404 and the built
`dist/404.html` is never served. `html_handling: "auto-trailing-slash"` (the default, stated
explicitly) is what resolves `/about` → 307 → `/about/` → `about/index.html`, matching Astro's
`trailingSlash: 'always'`.

Verified by running the real Workers runtime (`wrangler dev`) against `dist`, not just by reading
the config: homepage 200 with stylesheet and `<h1>`, `/about` → 307 → `/about/` 200, unmatched
paths serve our own 404 page, and `public/_headers` is honoured (fonts come back with
`Cache-Control: public, max-age=31536000, immutable`).

For a Git-connected deploy: Workers & Pages → the Worker → Settings → Builds, build command
`npm run build`, deploy command `npx wrangler deploy`. The dashboard Worker name must equal `name`
here or the build fails. `wrangler` is a devDependency so both CI and `npm run deploy` resolve it.

Notes:

- `site` in `astro.config.mjs` is `https://blog.foyzul.com` — confirmed, not a placeholder. It is what makes `rss.xml`, the sitemap, and the canonical tags emit absolute URLs.
- Custom headers (cache-control for hashed assets vs HTML) go in a `public/_headers` file. Fonts and hashed build assets get a long immutable max-age; HTML does not.

## 3. Project structure

```
astro.config.mjs
wrangler.jsonc
public/
  fonts/*.woff2            # canonical self-hosted font assets
  _headers
src/
  content.config.ts        # collection schema (§4)
  content/posts/           # one folder per post; see docs/AUTHORING.md
    _TEMPLATE/index.mdx    #   leading _ = never published
    <slug>/index.mdx       #   folder name is the URL; images sit beside it
  styles/blog.css          # consolidated production design system (§6)
  layouts/
    Base.astro             # <html>, head, skip link, header, footer
    Post.astro             # article wrapper + full-bleed track
  components/
    SiteHeader.astro  SiteFooter.astro  SkipLink.astro
    PostList.astro    TagChips.astro    Pagination.astro
    Callout.astro     Figure.astro      Diagram.astro
  pages/
    index.astro            # post index, page 1
    page/[page].astro      # pages 2..n
    [...slug].astro        # individual post
    topics/index.astro
    about.astro
    rss.xml.ts
    404.astro
```

`404.astro`, `_headers`, and the sitemap are additions — none appear in the spec.

## 4. Content model

The spec references "the content collection" five times but never defines it. This is the schema:

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),          // §5.2 requires exactly one, and the index renders it
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'bn']).default('en'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

Decisions embedded here:

- **`lang` is frontmatter, not a tag.** Spec §8.2 describes a `বাংলা` chip; deriving it from `lang: 'bn'` keeps the tag vocabulary editorial and avoids a magic tag string. The chip is rendered, not authored.
- **`lang` drives three things**: the `lang` attribute on the index entry and on `<article>`, the Noto Sans Bengali swap, and the `বাংলা` chip.
- **`draft: true` is excluded from every route, the index count, and RSS** — via one shared `getPublishedPosts()` helper so the filter cannot be forgotten in one place. Drafts still build in `astro dev`.
- **Slug = the file's `id`** from the glob loader. `src/content/posts/cold-starts.mdx` → `/cold-starts/`.

## 5. Routing

| Route | Source | Notes |
|---|---|---|
| `/` | `pages/index.astro` | Index page 1 |
| `/page/2/` … | `pages/page/[page].astro` | **New — spec §8.3's "Older posts" link had no destination in the §6 route table** |
| `/<slug>/` | `pages/[...slug].astro` | Bare slug per spec §6 |
| `/topics/` | `pages/topics/index.astro` | Grouped by tag |
| `/about/` | `pages/about.astro` | Canonical about-page content |
| `/rss.xml` | `pages/rss.xml.ts` | Spec §6 says `rss.xml`; prototypes say `feed.xml`. Spec wins. |
| `/404` | `pages/404.astro` | **New** |

### 5.1 Reserved-slug guard (must build)

Bare-slug posts at the root collide with the static pages. Astro resolves static routes before dynamic ones, so a post named `about.mdx` would **silently never render** — no error, no page, just a missing post. `getStaticPaths()` in `[...slug].astro` must assert:

```ts
const RESERVED = new Set(['about', 'topics', 'page', 'rss.xml', '404', '_astro']);
```

and throw at build time on collision. A build failure is the correct outcome; a silently dropped post is not.

### 5.2 Tag links — open decision

Spec §8.2 sends every tag chip to `/topics/`, so clicking `POSTGRES` lands on a page of all tags rather than Postgres posts. Options:

- **(a)** `/topics/#postgres` — anchor into the existing grouped page. No new routes, no filtering, one line of change.
- **(b)** `/topics/<tag>/` — a real per-tag page. New dynamic route, needs its own reserved-slug handling, and an empty-tag case.
- **(c)** Leave as specified — chips are decorative labels that lead to the tag directory.

## 6. Design-system consolidation

The Claude prototype was consolidated into `src/styles/blog.css`. Beyond the §3 dedupe the spec already calls for, these are the corrections made while reconciling it with the spec:

| # | Fix | Location |
|---|---|---|
| C1 | `Noto Serif Bengali` → `Noto Sans Bengali` (per L2) | `blog.css:11,14` |
| C2 | **Add `:root { color-scheme: light dark }`.** The only `color-scheme` declarations live inside the `[data-theme]` blocks that spec §3 deletes. Removing them without this leaves native scrollbars and form controls light in dark mode. | `blog.css:148,157` |
| C3 | `.index-intro` is a 14px uppercase `--text-faint` eyebrow, but spec §8.1 puts it on a `<header>` wrapping the `<h1>` and lede — which would render the lede tiny, uppercase, and faint. Split into `.index-intro` (wrapper) and `.index-intro__meta` (the eyebrow). | `blog.css:671` |
| C4 | `.post-link` makes the whole row an `<a>` carrying the grid areas. Spec §5.2 requires `<article><h2><a>…</a></h2><time>`, and that anchor cannot nest inside the row anchor. Move the grid to the `<article>`; keep the `grid-template-areas` at the `48rem` breakpoint. | `blog.css:630-669` |
| C5 | **Tag chips have no CSS.** New component: inline, all-caps, `--text-faint`, `·` separated, meeting the §5.5 target size. | new |
| C6 | `pre` has `overflow-x: auto` but no focus affordance. Spec §3.3 requires overflowing code to be focusable — add `tabindex="0"` + accessible name via a rehype step, and a `pre:focus-visible` style matching `.table-scroll:focus-visible`. | `blog.css:418,451` |
| C7 | Dark-mode contrast is unmeasured. Spec §5.6 states light-mode floors only. Measure the dark palette and record floors before ship. | spec §5.6 |
| C8 | Nav and RSS hit areas enlarged (spec §9.4 item 8) | `blog.css:289,316` |

### 6.1 Full-bleed contract — open decision

Spec §9.2 correctly identifies the prototype defect: `.page > .bleed { grid-column: full }` only reaches **direct** children, which forced the post into two `<article>` elements. To keep one `<article>` and still let a table escape the measure:

| Option | Mechanism | Tradeoff |
|---|---|---|
| **Subgrid** | `article { grid-column: full; display: grid; grid-template-columns: subgrid; }` | Track definition stays in one place. Requires subgrid support; raises the browser floor. |
| **`display: contents`** | `article { display: contents }` — children become grid items of `.page` | Smallest change. Historically dropped elements from the accessibility tree; fixed in current engines, but it is the semantic `<article>` this spec is strict about. |
| **Re-declare the track** | `article` repeats `.page`'s `grid-template-columns` | No support questions at all. Duplicates the track definition in two places, which can drift. |

This affects only the post layout. Everything else in §9 can be built before it is settled.

## 7. Re-tokenizing post-1

Per L1, `post-1/agentic-software-engineering.html` becomes `src/content/posts/agentic-software-engineering.mdx`. The work:

- **6 inline SVG diagrams** re-classed from post-1's vocabulary (`.node`, `.flowline`, `.lbl`, `.eye`, `.bar*`) to `blog.css`'s (`.box`, `.stroke`, `.arrow`, `.text--emphasis`). This is not cosmetic: post-1 hardcodes `fill:#fff` on `.node` (line 106) and uses raw hex teal/amber/slate throughout, all of which break in dark mode. The `blog.css` diagram tokens already have dark values.
- The existing `role="img"` + `aria-label` on each SVG satisfies spec §5.4 — keep it as-is rather than converting to `<title>`/`<desc>`.
- **New components with no equivalent in `blog.css`**: `.callout` (with its `.tag`), `.eyebrow` section numbering, `.figframe`. These need tokens and dark values designed, not ported.
- Prose reflows from 17px Plex Sans / 648px to 19px Source Serif 4 / 68ch. Diagram `viewBox` widths (880) and internal label sizing should be checked against the new measure.
- The post has **zero tables and zero `<pre>` blocks**, so §3.5 and §3.3 are unexercised by the only real content. Worth knowing before investing further in the table system.

## 8. Fonts and code

**Fonts.** IBM Plex Sans 400/600 and Noto Sans Bengali 400/600 are canonical assets in `public/fonts/`. The production `@font-face` declarations retain Bengali `unicode-range` gating (`U+0980-09FF, U+200C-200D, U+25CC, U+A8F1`), which keeps English pages from requesting Bengali. Source Serif 4 and IBM Plex Mono are also self-hosted there (spec §4).

**Code blocks.** Astro's Shiki supports dual themes:

```js
markdown: {
  shikiConfig: {
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  },
}
```

With `defaultColor: false`, a `@media (prefers-color-scheme: dark)` block remaps `--shiki-dark` onto `.astro-code`. Note the selector is `.astro-code`, not `.shiki`. This is the mechanism spec §2.3 discards along with the rest of the ChatGPT system — worth keeping, since it is what makes code correct in dark mode. Low urgency: no current post has a code block.

## 9. Build order

1. Scaffold + `wrangler.jsonc` + fonts + `_headers`. Deploy an empty shell to prove the Cloudflare path.
2. `content.config.ts` + one real post (post-1, prose only) + `[...slug].astro` with the reserved-slug guard.
3. `blog.css` consolidation: C1, C2, C3, C4, C5, C8.
4. `Base.astro` / `Post.astro`, header, footer, skip link.
5. Index + pagination + tag chips.
6. Full-bleed contract (§6.1) once decided, then post-1's diagrams and the callout/figframe components.
7. `/topics/`, `/about/`, `rss.xml`, `404`, sitemap.
8. Responsive + a11y verification at 1440/768/380 against spec §10, plus C7 dark-mode contrast.

## 10. Verification

`npm run verify` builds, serves, and drives headless Chromium over `/`, the post, `/topics/`,
`/about/` and `/404/` at 1440 / 768 / 380 in both colour schemes. It asserts:

- no document-level horizontal overflow (`scrollWidth <= clientWidth`) — spec §10
- body copy computes to 19px at every width — spec §10
- exactly one `<main>` and one `<h1>` per page — spec §5.1
- the skip link is the first focusable element and becomes visible on focus — spec §5.1
- full-bleed caps at 1280px — spec §3.4
- all six diagram scrollers are `tabindex="0"` with an accessible name — spec §5.4
- **no HTML nodes inside any SVG, and every diagram has ≥8 shapes** — see the MDX trap below
- contrast floors for primary / secondary / faint / accent in both schemes — spec §5.6

### 10.1 Defects the verification caught

| Defect | Cause | Fix |
|---|---|---|
| 91px horizontal overflow at ≥768px on the post page | `.tags { grid-area: tags }` was written for `.post-item`'s grid but matched *every* `.tags`, including the one inside `article.post` — a subgrid with no such named area, so it was placed in an implicit column past the right edge | scoped to `.post-item > .tags` |
| One diagram rendered as flowed serif text, missing ~18 of its 20 elements | MDX parses a **line-wrapped child of `<text>`** as markdown and injects a `<p>`. HTML inside SVG breaks parsing and swallows the following siblings. Two of the six diagrams were affected | SVG text content kept on one line; regression guard added to `verify.mjs` |
| `pick a ticket ↓` clipped to `a ticket ↓` | CSS `text-anchor: middle` on `.label` overrides the `text-anchor="start"` **presentation attribute**. This defect exists in `post-1/` too and was ported faithfully before being noticed | `.anchor-start` class, declared after `.label`/`.eye` |

## 11. Open items

- **About page** still carries placeholder LinkedIn/YouTube URLs.
- Per-tag routes (`/topics/<tag>/`) remain available if the anchor approach proves too coarse.
- §3.5 tables and §3.3 code blocks are implemented and verified in isolation but no real post
  exercises them yet.

## 12. Spec amendments applied

`BLOG_SPEC.md` should be updated to match: §3.1/§4 Bengali resolved to Sans (L2); §6 route table gains `/page/N/`, `/404`; §8.1 `.index-intro` markup corrected (C3); §5.2 noted as incompatible with the current `.post-link` (C4); §2.3 revised — Shiki dual-theme variables are retained from the ChatGPT side (§8); §12 "None blocking" is no longer accurate.
