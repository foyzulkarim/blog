// Renders the updated og-dos-donts-v1.webp card for the
// "Agentic session efficiency — DOs and DON'Ts" post.
// `node scripts/og-dos-donts-v1.mjs` — writes next to the post.
//
// The original v1 card had a waste-rate line chart in the right-hand box;
// the update removes the chart (box stays) and puts a gold /session-audit
// in its place. Left column and footer are unchanged.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'src/content/posts/agentic-session-efficiency-dos-and-donts');
const font = (f) => readFileSync(join(ROOT, `public/fonts/${f}`)).toString('base64');

const CSS = `
@font-face { font-family: 'Plex'; font-weight: 400; src: url(data:font/woff2;base64,${font('ibm-plex-mono-latin-400-normal.woff2')}) format('woff2'); }
@font-face { font-family: 'Plex'; font-weight: 600; src: url(data:font/woff2;base64,${font('ibm-plex-mono-latin-600-normal.woff2')}) format('woff2'); }
@font-face { font-family: 'Serif'; font-weight: 100 900; src: url(data:font/woff2;base64,${font('source-serif-4-latin-wght-normal.woff2')}) format('woff2'); }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #131519; }
.card {
  width: 1200px; height: 630px; position: relative;
  padding: 174px 74px 0; background: #131519;
  font-family: 'Plex', monospace; -webkit-font-smoothing: antialiased;
}
.eyebrow {
  font-size: 24px; font-weight: 600;
  letter-spacing: 0.01em; color: #7bbdf4;
}
.headline {
  margin-top: 17px; font-family: 'Serif', serif; font-weight: 700;
  font-size: 56px; letter-spacing: -0.01em; color: #d6d7db; line-height: 1.15;
}
.sub {
  margin-top: 24px; font-size: 21px; line-height: 1.7;
  color: #a6aaad; max-width: 520px;
}
.box {
  position: absolute; top: 139px; left: 690px; width: 436px; height: 303px;
  background: #192024; border: 1px solid #333438; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.skill { font-size: 40px; font-weight: 600; color: #e5c07b; letter-spacing: 0.01em; }
.foot { position: absolute; bottom: 57px; font-size: 18px; color: #8e9296; }
.foot--l { left: 74px; }
.foot--r { right: 74px; }
`;

const html = `<!doctype html><meta charset="utf-8"><style>${CSS}</style>
<div class="card">
  <div class="eyebrow">AGENTIC SESSION EFFICIENCY</div>
  <div class="headline">The DOs and DON’Ts</div>
  <div class="sub">What auditing 1,000+ of my own AI coding sessions taught me about where the tokens actually go.</div>
  <div class="box"><span class="skill">/session-audit</span></div>
  <div class="foot foot--l">audit → fix → re-audit</div>
  <div class="foot foot--r">blog.foyzul.com</div>
</div>`;

const dir = mkdtempSync(join(tmpdir(), 'ogv1-'));
const file = join(dir, 'og.html');
writeFileSync(file, html);
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`file://${file}`);
await page.evaluate(() => document.fonts.ready);
const png = await page.locator('.card').screenshot();
const out = join(OUT, 'og-dos-donts-v1.webp');
const { width, height, size } = await sharp(png).webp({ quality: 92 }).toFile(out);
console.log(`og-dos-donts-v1.webp  ${width}×${height}  ${(size / 1024).toFixed(0)} KB`);
await browser.close();
