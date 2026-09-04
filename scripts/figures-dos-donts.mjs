// Renders the three in-body figures for the "Agentic session efficiency" post.
// `node scripts/figures-dos-donts.mjs` — writes fig-*.webp next to the post.
//
// The post's existing visuals (og-dos-donts.webp, image.png) are fixed dark
// One Dark cards, so these match that surface rather than following the page
// theme. Marks use #3987e5 / #d95926, validated for CVD separation and 3:1
// contrast against #282c34. Text stays on ink tokens — the marks carry identity.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'src/content/posts/agentic-session-efficiency-dos-and-donts');
const font = (w) =>
  readFileSync(join(ROOT, `public/fonts/ibm-plex-mono-latin-${w}-normal.woff2`)).toString('base64');

const CSS = `
@font-face { font-family: 'Plex'; font-weight: 400; src: url(data:font/woff2;base64,${font(400)}) format('woff2'); }
@font-face { font-family: 'Plex'; font-weight: 600; src: url(data:font/woff2;base64,${font(600)}) format('woff2'); }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #14161b; }
.card {
  --surface: #282c34; --hairline: #3d434f; --well: #23262d;
  --ink: #e6e9ef; --ink-2: #a4acbc; --ink-3: #8892a4;
  --blue: #3987e5; --orange: #d95926;
  width: 920px; padding: 38px 40px 30px; background: var(--surface);
  font-family: 'Plex', monospace; color: var(--ink);
  font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased;
}
.eye { font-size: 11.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
.quote { font-size: 15px; margin-top: 7px; }
.rule { height: 1px; background: var(--hairline); }
.note { font-size: 12px; line-height: 1.45; color: var(--ink-2); }
.b { font-weight: 600; color: var(--ink); }
.chip { width: 9px; height: 9px; flex: none; }

/* ── fig 1 ── */
.legend { display: flex; align-items: center; gap: 10px; margin: 24px 0 9px; }
.legend .name { font-weight: 600; }
.legend .gloss { font-size: 12px; color: var(--ink-3); }
.lane { display: grid; grid-template-columns: 92px 1fr 226px; align-items: center; column-gap: 18px; }
.lane + .lane { margin-top: 8px; }
.slot { font-size: 12px; color: var(--ink-3); text-align: right; }
.track { height: 58px; border: 1px solid var(--hairline); background: var(--well); padding: 7px; display: flex; gap: 3px; }
.tick { width: 2px; background: var(--orange); }
.tick--one { background: var(--blue); }

/* ── fig 2 timeline ── */
.tl { display: grid; grid-template-columns: 176px 142px 1fr; column-gap: 22px; margin-top: 24px; }
.marks { height: 36px; display: flex; align-items: flex-end; gap: 6px; }
.turn { width: 5px; height: 34px; background: var(--blue); }
.gap { width: 100%; height: 34px; border: 1px dashed var(--hairline); border-block: 0; position: relative; }
.gap::after { content: ''; position: absolute; inset: 50% 0 auto; border-top: 1px dashed var(--hairline); }
.repay { width: 100%; height: 34px; background: var(--orange); }
.base { grid-column: 1 / -1; height: 1px; background: var(--hairline); margin: 7px 0 9px; }
.cap { font-size: 11.5px; line-height: 1.5; color: var(--ink-3); }

/* ── fig 2 bars ── */
.bars { display: grid; grid-template-columns: 74px 540px auto; row-gap: 10px; column-gap: 14px; align-items: center; margin-top: 12px; }
.barlab { font-size: 12px; color: var(--ink-3); text-align: right; }
.bar { height: 12px; background: var(--blue); border-radius: 0 4px 4px 0; }
.barval { font-size: 12px; font-weight: 600; }

/* ── fig 3 ── */
.files { display: flex; gap: 7px; margin-top: 22px; }
.file { width: 70px; height: 76px; border: 1px solid var(--orange); background: rgba(217,89,38,0.15); position: relative; }
.file--first { border-color: var(--blue); background: rgba(57,135,229,0.17); }
.file i { position: absolute; left: 10px; right: 22px; height: 2px; background: var(--orange); opacity: 0.5; }
.file--first i { background: var(--blue); opacity: 0.55; }
.under { display: flex; gap: 7px; margin-top: 8px; font-size: 11.5px; color: var(--ink-3); }
.span { border-top: 1px solid var(--hairline); border-inline: 1px solid var(--hairline); height: 7px; }
.big { font-size: 30px; font-weight: 600; letter-spacing: -0.01em; color: var(--ink); }

/* ── og / hero card ── */
.card--og { width: 1200px; height: 630px; padding: 60px 64px; position: relative; display: flex; flex-direction: column; }
.og-main { flex: 1; display: flex; align-items: center; gap: 48px; }
.og-headline { font-size: 84px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin-top: 14px; white-space: nowrap; }
.og-headline .to { color: var(--ink-3); font-weight: 400; }
.og-chart text { paint-order: stroke; stroke: #282c34; stroke-width: 5px; }
.og-sub { font-size: 17px; color: var(--ink-2); margin-top: 18px; line-height: 1.5; }
.og-chart { flex: none; }
.og-foot { position: absolute; right: 64px; bottom: 34px; font-size: 14px; color: var(--ink-3); }
.og-skill { font-size: 30px; font-weight: 600; color: #e5c07b; letter-spacing: 0.01em; }
.og-skillrow { display: flex; align-items: baseline; gap: 18px; }
.og-skillrow .rest { font-size: 14px; color: var(--ink-3); letter-spacing: 0.08em; text-transform: uppercase; }
`;

const rep = (n, html) => Array.from({ length: n }, html).join('');
const ticks = (n, cls = '') => rep(n, () => `<div class="tick ${cls}"></div>`);

// ── Figure 1 ────────────────────────────────────────────────────────────────
const fig1 = `
<div class="eye">one question</div>
<div class="quote">“can you find the editing notes md file in this repository?”</div>

<div class="legend"><span class="chip" style="background:#d95926"></span><span class="name">Inline</span><span class="gloss">— scan output stays in the main context</span></div>
<div class="lane">
  <div class="slot">main context</div>
  <div class="track">${ticks(93)}</div>
  <div class="note"><span class="b">93 scan calls · 468K bytes</span><br/>resident for every later turn</div>
</div>

<div class="legend"><span class="chip" style="background:#3987e5"></span><span class="name">Delegated</span><span class="gloss">— one dispatch, one summary back</span></div>
<div class="lane">
  <div class="slot">main context</div>
  <div class="track">${ticks(1, 'tick--one')}</div>
  <div class="note"><span class="b">one summary</span><br/>the only thing that persists</div>
</div>
<div class="lane">
  <div class="slot">subagent</div>
  <div class="track">${ticks(93)}</div>
  <div class="note"><span class="b">468K scanned here</span><br/>discarded on return</div>
</div>
`;

// ── Figure 2 ────────────────────────────────────────────────────────────────
const bar = (label, value, pct) =>
  `<div class="barlab">${label}</div><div><div class="bar" style="width:${pct}%"></div></div><div class="barval">${value}</div>`;

const fig2 = `
<div class="eye">the prompt cache has a 5-minute ttl</div>
<div class="quote">Cache-TTL expiry alone — <span class="b">62%</span> of priced headline waste, <span class="b">$35.26</span>.</div>

<div class="tl">
  <div class="marks">${rep(12, () => '<div class="turn"></div>')}</div>
  <div class="marks"><div class="gap"></div></div>
  <div class="marks"><div class="repay"></div></div>
  <div class="base"></div>
  <div class="cap">turns under 5 min apart<br/>prefix stays cached</div>
  <div class="cap">&gt; 30 min away</div>
  <div class="cap">the next turn re-writes the entire prefix at cache-write price — <span class="b">93×</span> the per-turn cache creation of an unbroken session</div>
</div>

<div class="rule" style="margin: 26px 0 20px;"></div>

<div class="eye">cache-ttl findings per audit</div>
<div class="bars">
  ${bar('audit 1', 53, 100)}
  ${bar('audit 2', 38, 71.7)}
  ${bar('audit 3', 11, 20.8)}
  ${bar('audit 4', 9, 17.0)}
</div>
<div class="note" style="margin-top: 15px;">Clear the context, or leave a short handoff note, before stepping away — the one fix that demonstrably held.</div>
`;

// ── Figure 3 ────────────────────────────────────────────────────────────────
const lines = () => [13, 25, 37, 49, 61].map((t) => `<i style="top:${t}px"></i>`).join('');
const fig3 = `
<div class="eye">one session · one /tmp file · no intervening edit</div>
<div class="quote">The same file, read <span class="b">eleven</span> times.</div>

<div class="files">
  <div class="file file--first">${lines()}</div>
  ${rep(10, () => `<div class="file">${lines()}</div>`)}
</div>
<div class="under">
  <div style="width:70px; text-align:center;">read 1</div>
  <div style="width:763px;">
    <div class="span"></div>
    <div style="text-align:center; margin-top:6px;">reads 2–11 · identical, nothing edited in between</div>
  </div>
</div>
<div class="note" style="display:flex; align-items:baseline; gap:14px; margin-top:24px;">
  <span class="big">483 KB</span>
  <span>of pure repetition.<br/>The diff was already verified — the edit result said so.</span>
</div>
`;

const page_ = (body, cls = '') =>
  `<!doctype html><meta charset="utf-8"><style>${CSS}</style><div class="card ${cls}">${body}</div>`;

// ── og / hero card ─────────────────────────────────────────────────────────
// Waste-rate trend across the four audit runs: 0.69 → 0.66 → 0.46 → 0.42.
const trend = [0.69, 0.66, 0.46, 0.42];
const W = 460, H = 300, PAD = 46;
const x = (i) => PAD + (i * (W - 2 * PAD)) / (trend.length - 1);
const y = (v) => PAD + ((0.75 - v) / (0.75 - 0.38)) * (H - 2 * PAD);
const pts = trend.map((v, i) => [x(i), y(v)]);
const og = `
<div class="og-main">
  <div>
    <div class="og-skillrow"><span class="og-skill">/session-audit</span><span class="rest">→ 1,048 of my sessions · 4 runs</span></div>
    <div class="og-headline">0.69% <span class="to">→</span> 0.42%</div>
    <div class="og-sub">session-token waste rate — the fixes that were applied held</div>
  </div>
  <svg class="og-chart" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
    <polyline points="${pts.map((p) => p.join(',')).join(' ')}" stroke="#3987e5" stroke-width="3"/>
    ${pts
      .map(
        ([px, py], i) => `
    <circle cx="${px}" cy="${py}" r="6" fill="#3987e5"/>
    <text x="${px}" y="${py - 18}" text-anchor="middle" font-family="Plex" font-size="17" font-weight="600" fill="${i === trend.length - 1 ? '#3987e5' : '#a4acbc'}">${trend[i].toFixed(2)}%</text>`,
      )
      .join('')}
  </svg>
</div>
<div class="og-foot">blog.foyzul.com</div>
`;

const FIGS = [
  ['fig-delegate-scanning', fig1],
  ['fig-cache-ttl', fig2],
  ['fig-re-reads', fig3],
  ['og-dos-donts', og, 'card--og'],
];

const dir = mkdtempSync(join(tmpdir(), 'figs-'));
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const [name, body, cls] of FIGS) {
  const html = join(dir, `${name}.html`);
  writeFileSync(html, page_(body, cls));
  await page.goto(`file://${html}`);
  await page.evaluate(() => document.fonts.ready);
  const png = await page.locator('.card').screenshot();
  const out = join(OUT, `${name}.webp`);
  const { width, height, size } = await sharp(png).webp({ quality: 92 }).toFile(out);
  console.log(`${name}.webp  ${width}×${height}  ${(size / 1024).toFixed(0)} KB`);
}

await browser.close();
