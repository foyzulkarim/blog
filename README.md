# blog.foyzul.com

Source for [blog.foyzul.com](https://blog.foyzul.com) — a static, zero-JavaScript blog built with
[Astro](https://astro.build) and served from [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/).

Posts are MDX files under `src/content/posts/`. Adding a folder there publishes a post; there is no
CMS, no database, and no server rendering.

## Stack

| Piece | Choice |
|---|---|
| Framework | Astro 7, static output (no adapter, no SSR) |
| Content | MDX via `@astrojs/mdx`, typed frontmatter via a content collection schema |
| Syntax highlighting | Shiki, dual light/dark themes emitted as CSS variables |
| Feeds | `@astrojs/rss` (`/rss.xml`) and `@astrojs/sitemap` |
| Fonts | Self-hosted Source Serif 4, IBM Plex Mono, and Noto Sans Bengali |
| Styling | One hand-written stylesheet, `src/styles/blog.css` — oklch tokens, light and dark |
| Hosting | Cloudflare Workers assets, custom domain `blog.foyzul.com` |
| Client JS | None, apart from the theme toggle |

## Getting started

Requires Node 26 (see `.nvmrc`).

```bash
npm install
npm run dev      # → http://localhost:4321
```

Astro 7 runs the dev server as a background daemon, so `npm run dev` returns immediately:

```bash
npx astro dev status   # is it running, and on which pid
npx astro dev logs     # tail the output
npx astro dev stop     # shut it down
```

Two things behave differently in dev, by design: `draft: true` posts are visible (and excluded from
the production build), and the Cloudflare runtime is not involved — so `public/_headers`, the custom
404 page, and the `/about` → `/about/` redirect are not exercised. To test those, build and run the
real Workers runtime:

```bash
npm run build
npx wrangler dev       # → http://localhost:8788
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload for prose, components, and CSS |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run check` | `astro check` — type and content-schema diagnostics |
| `npm run verify` | Build, then drive a real browser at three widths in both colour schemes and fail on layout or accessibility regressions |
| `npm run deploy` | Build and `wrangler deploy` |

Run `npm run verify` before pushing.

## Repository layout

```
astro.config.mjs           # site URL, MDX, sitemap, Shiki dual themes
wrangler.jsonc             # Workers assets config and custom domain
public/
  _headers                 # cache-control for fonts and hashed assets
  fonts/*.woff2            # self-hosted faces
scripts/
  verify.mjs               # browser check suite behind `npm run verify`
  shots.mjs                # screenshot helper
src/
  content.config.ts        # post collection schema
  content/posts/           # one folder per post — the whole publishing surface
    _TEMPLATE/index.mdx    #   leading _ = never published
    <slug>/index.mdx       #   folder name is the URL; images sit beside it
  pages/                   # index, [...slug], about, topics, rss.xml, 404
  layouts/                 # Base.astro, Post.astro
  components/              # Figure, Callout, Eyebrow, header/footer, chips
  styles/blog.css          # the single stylesheet
  lib/                     # rehype plugin for focusable code blocks
docs/
  BLOG_SPEC.md             # design and content spec — the visual source of truth
  ARCHITECTURE.md          # what gets built, and why each decision was made
  AUTHORING.md             # how to write and ship a post
```

## Writing a post

```bash
cp -r src/content/posts/_TEMPLATE src/content/posts/my-new-post
```

The folder name becomes the URL (`my-new-post/` → `https://blog.foyzul.com/my-new-post/`). Fill in
the frontmatter, write the body, and the homepage picks it up — `index.astro` is never edited to
publish.

```yaml
---
title: My new post
description: One sentence, used on the index, in RSS, and as the meta description.
pubDate: 2026-08-05
tags: [astro, cloudflare]
lang: en          # `bn` switches to Noto Sans Bengali and adds a বাংলা chip
draft: false      # true = visible in dev, excluded from build, index, RSS, sitemap
---
```

Invalid frontmatter fails the build with the offending field name; the schema lives in
`src/content.config.ts`. `docs/AUTHORING.md` covers the rest — reserved slugs, the components
available inside posts, and the two MDX rules that will bite you when authoring inline SVG diagrams.

## Deploying

The site deploys from the Cloudflare dashboard (Workers & Pages → the Worker → Settings → Builds)
with build command `npm run build` and deploy command `npx wrangler deploy`. The Worker name in the
dashboard must match `name` in `wrangler.jsonc` (`blog-foyzul-com`) or the build fails.

For a manual deploy:

```bash
npm run deploy
```

`blog.foyzul.com` is configured as a Custom Domain, so Cloudflare provisions the DNS record and the
certificate on deploy. `workers_dev` and `preview_urls` are both off deliberately — a second live
copy would be duplicate content for crawlers.

## License

Code is MIT licensed — see [LICENSE](LICENSE). Post content in `src/content/posts/` is © Foyzul
Karim; please ask before republishing it.
