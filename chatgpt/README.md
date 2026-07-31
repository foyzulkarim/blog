# foyzul blog design specimen

Plain HTML and one site-wide CSS file, ready to lift into Astro layouts.

## Files

- `styles.css` — complete token block and element system
- `index.html` — site root and post list
- `post.html` — post layout and full element specimen
- `about.html` — one-column prose layout
- `responsive.html` — exact-width review frames at 1440, 768, and 380px
- `fonts/` — self-hosted IBM Plex Sans and Noto Sans Bengali subsets
- `assets/trace-screenshot.png` — raster-image specimen

## Full-bleed contract

`.full-bleed` stays centered on the viewport rather than the prose column.

| Viewport | Object width | Edge behaviour |
| --- | ---: | --- |
| 1440px | 1180px | 130px viewport gutters |
| 768px | ~707px | fluid `4vw` gutters |
| 380px | ~350px | fluid `4vw` gutters |

Prose remains capped at `68ch`. Wide tables have a `64rem` minimum width and scroll inside `.table-scroll`; text is never reduced or squeezed. The mobile scroll instruction appears at `45rem` and below. The scroll region is keyboard-focusable.

## Fonts

The four WOFF2 files total 138,828 bytes:

- IBM Plex Sans Latin: 400 and 600
- Noto Sans Bengali: 400 and 600, limited by `unicode-range` and used through `:lang(bn)`

English-only pages do not request the Bengali files.

## Astro port

Copy `styles.css` into the global stylesheet, move `fonts/` and `assets/` to the public asset directory, and preserve the relative URLs or adjust them once. The post markup uses reusable wrappers only for wide tables; Shiki colour variables remain inline content data while the visual treatment stays in the global stylesheet.
