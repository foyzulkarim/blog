# Writing and shipping a post

## Running locally

```bash
npm install     # once
npm run dev     # → http://localhost:4321
```

Hot reload covers everything: prose, frontmatter, components, and `blog.css`. Adding or deleting
a post folder is picked up without a restart.

Astro 7 runs the dev server as a background daemon, so the command returns immediately:

```bash
npx astro dev status    # is it running, and on which pid
npx astro dev logs      # tail the output
npx astro dev stop      # shut it down
```

Two things behave differently in dev than in production, by design:

- **`draft: true` posts are visible in dev** and excluded from `npm run build`, the index count,
  RSS, and the sitemap. That is the point — you can preview an unfinished post.
- **Dev does not use the Cloudflare runtime.** `public/_headers`, the custom 404 page, and the
  `/about` → `/about/` redirect are served by Workers, not by `astro dev`. To exercise those:

```bash
npm run build
npx wrangler dev        # → http://localhost:8788, the real Workers runtime
```

Use `npm run dev` for writing, `npx wrangler dev` when you care about headers, redirects, or the
404 page. `npm run verify` runs the full browser check suite before you push.

## Where things live

```
src/
  pages/
    index.astro                    ← the homepage / post index
    [...slug].astro                ← renders every post
    topics/  about.astro  rss.xml.ts  404.astro
  content/
    posts/                         ← EVERY POST LIVES HERE
      _TEMPLATE/index.mdx          ← copy this; the _ prefix keeps it unpublished
      agentic-software-engineering/
        index.mdx                  ← the post
        (images go beside it)
  components/                      ← Figure, Callout, Eyebrow (used inside posts)
  layouts/    styles/blog.css      ← chrome and the single stylesheet
```

The homepage reads `src/content/posts/` directly. You never edit `index.astro` to publish —
adding a folder is the whole operation.

## Adding a post

1. **Copy the template.** `cp -r src/content/posts/_TEMPLATE src/content/posts/my-new-post`
2. **The folder name is the URL.** `my-new-post/` → `https://blog.foyzul.com/my-new-post/`
3. **Fill in the frontmatter** (see the table below).
4. **`npm run dev`** — the post appears at the top of the homepage if its `pubDate` is the newest.
5. **`npm run verify`** before pushing. It builds, drives a real browser at three widths in both
   colour schemes, and fails on layout or accessibility regressions.

A flat file works too — `src/content/posts/my-new-post.mdx` gives the same URL. Use a folder when
the post has images; use a flat file for pure prose.

## Frontmatter

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Becomes the `<h1>` and the index link. Never write `#` in the body. |
| `description` | yes | One sentence. Index row, RSS, and meta description. Keep it short — the fuller lede goes in the body. |
| `pubDate` | yes | `2026-07-31`. Sorts the index, newest first. |
| `updatedDate` | no | Renders as "Updated …" beside the date. |
| `tags` | no | Free text. Chips link to `/topics/#<tag>`; the topics page builds itself. |
| `lang` | no | `bn` swaps to Noto Sans Bengali, loosens the line height, and adds a বাংলা chip. |
| `draft` | no | `true` shows in `npm run dev`, excluded from build, index count, RSS, and sitemap. |

Anything invalid fails the build with the field name — the schema is in `src/content.config.ts`.

## Two rules that will bite you

**1. Keep SVG `<text>` content on one line.**

```jsx
<text class="label" x="16" y="40">pick a ticket</text>     ✅
<text class="label" x="16" y="40">
  pick a ticket                                            ❌ breaks the whole diagram
</text>
```

MDX parses a wrapped child as Markdown and injects a `<p>`. HTML inside SVG breaks parsing and
silently swallows every element after it. `npm run verify` catches this.

**2. Never hardcode a colour in a diagram.** Use the token classes — `box--raised`, `box`,
`box--emphasis`, `stroke`, `stroke--dash`, `arrow`, `label`, `label--sm`, `eye`, `text--emphasis`,
`text--warm`, `anchor-start`. A `#fff` fill vanishes against the dark background.

Use `anchor-start` rather than `text-anchor="start"` — CSS beats the presentation attribute, so the
attribute silently does nothing and the label gets clipped.

## Slugs that will fail the build

`about`, `topics`, `page`, `rss.xml`, `404`, `_astro`, `fonts`. Posts sit at the bare root, so
these would collide with real routes. Astro resolves static routes first, so a colliding post would
silently never render — the build throws instead. Rename the folder.

## Publishing

```bash
npm run build        # → dist/
npm run verify       # build + browser checks; run this before pushing
npx wrangler deploy  # manual deploy
```

Or connect the repo in the Cloudflare dashboard (Workers & Pages → your Worker → Settings →
Builds), with build command `npm run build` and deploy command `npx wrangler deploy`. The Worker
name in the dashboard must match `name` in `wrangler.jsonc` (`blog-foyzul-com`) or the build fails.
