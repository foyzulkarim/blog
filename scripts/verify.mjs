import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4321';
const OUT = '/private/tmp/claude-501/-Users-foyzul-personal-blog/bd91311e-ca9e-4b0f-bd28-3101ec377c1d/scratchpad/shots';
mkdirSync(OUT, { recursive: true });

const PAGES = [
  '/',
  '/agentic-software-engineering/',
  '/agentic-software-engineering-slides/',
  '/topics/',
  '/about/',
  '/404/',
];
const SIZES = [
  { name: '1440', width: 1440, height: 1000 },
  { name: '768', width: 768, height: 1000 },
  { name: '380', width: 380, height: 800 },
];

const fails = [];
const notes = [];
function check(ok, label, detail) {
  if (!ok) fails.push(`${label} — ${detail}`);
  return ok;
}

// WCAG relative luminance from an rgb() string.
function lum(rgb) {
  const [r, g, b] = rgb.match(/[\d.]+/g).slice(0, 3).map(Number);
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

const browser = await chromium.launch();

for (const scheme of ['light', 'dark']) {
  const context = await browser.newContext({ colorScheme: scheme });
  const page = await context.newPage();

  for (const path of PAGES) {
    for (const size of SIZES) {
      await page.setViewportSize({ width: size.width, height: size.height });
      const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
      check(res.ok() || path === '/404/', `HTTP ${path}`, `status ${res.status()}`);

      const m = await page.evaluate(() => {
        const de = document.documentElement;
        const main = document.querySelectorAll('main');
        const h1 = document.querySelectorAll('h1');
        const bleed = [...document.querySelectorAll('.bleed')].map(
          (el) => Math.round(el.getBoundingClientRect().width),
        );
        const body = getComputedStyle(document.body);
        const firstProse = document.querySelector('.page p, .post p');
        return {
          scrollW: de.scrollWidth,
          clientW: de.clientWidth,
          mains: main.length,
          h1s: h1.length,
          bleedMax: bleed.length ? Math.max(...bleed) : 0,
          bodyFont: body.fontSize,
          proseFont: firstProse ? getComputedStyle(firstProse).fontSize : null,
          bodyFamily: body.fontFamily,
        };
      });

      const tag = `${scheme} ${size.name} ${path}`;
      check(m.scrollW <= m.clientW, `h-overflow ${tag}`, `scrollW ${m.scrollW} > clientW ${m.clientW}`);
      check(m.mains === 1, `one <main> ${tag}`, `found ${m.mains}`);
      check(m.h1s === 1, `one <h1> ${tag}`, `found ${m.h1s}`);
      check(m.bodyFont === '19px', `19px body ${tag}`, `got ${m.bodyFont}`);
      if (m.bleedMax) {
        check(m.bleedMax <= 1280, `bleed <=1280 ${tag}`, `got ${m.bleedMax}`);
        if (size.name === '1440') notes.push(`bleed width @1440 ${path}: ${m.bleedMax}px`);
      }
      if (size.name === '1440' && path === '/' && scheme === 'light') {
        notes.push(`body font-family: ${m.bodyFamily.split(',')[0]}`);
        notes.push(`prose computed size: ${m.proseFont}`);
      }
    }
  }

  // skip link must be the first focusable element
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => {
    const el = document.activeElement;
    return { cls: el.className, text: el.textContent.trim(), visible: el.getBoundingClientRect().left >= 0 };
  });
  check(first.cls.includes('skip-link'), `skip link first (${scheme})`, `focused "${first.text}"`);
  check(first.visible, `skip link visible on focus (${scheme})`, `left ${first.visible}`);

  // contrast floors (spec §5.6 / correction C7)
  const contrast = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    const probe = (v) => {
      const c = document.createElement('canvas');
      c.width = c.height = 1;
      const ctx = c.getContext('2d');
      ctx.fillStyle = cs.getPropertyValue(v).trim();
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      return `rgb(${d[0]}, ${d[1]}, ${d[2]})`;
    };
    return {
      surface: probe('--surface'),
      primary: probe('--text-primary'),
      secondary: probe('--text-secondary'),
      faint: probe('--text-faint'),
      accent: probe('--accent'),
    };
  });
  const r = (k) => ratio(contrast[k], contrast.surface).toFixed(2);
  notes.push(`${scheme} contrast — primary ${r('primary')}:1, secondary ${r('secondary')}:1, faint ${r('faint')}:1, accent ${r('accent')}:1`);
  check(+r('primary') >= 7, `${scheme} primary contrast`, `${r('primary')}:1`);
  check(+r('secondary') >= 4.5, `${scheme} secondary contrast`, `${r('secondary')}:1`);
  check(+r('faint') >= 4.5, `${scheme} faint contrast`, `${r('faint')}:1`);
  check(+r('accent') >= 4.5, `${scheme} accent contrast`, `${r('accent')}:1`);

  // diagram scrollers are keyboard reachable
  await page.goto(BASE + '/agentic-software-engineering/', { waitUntil: 'networkidle' });
  const scrollers = await page.evaluate(() =>
    [...document.querySelectorAll('.diagram-scroll')].map((el) => ({
      tabindex: el.getAttribute('tabindex'),
      label: !!el.getAttribute('aria-label'),
    })),
  );
  check(scrollers.length === 6, `6 diagram scrollers (${scheme})`, `found ${scrollers.length}`);
  check(
    scrollers.every((s) => s.tabindex === '0' && s.label),
    `scrollers focusable+labelled (${scheme})`,
    JSON.stringify(scrollers),
  );

  // SVG integrity. MDX parses a line-wrapped child of <text> as markdown and
  // injects a <p>, which breaks the surrounding SVG and silently swallows the
  // rest of the diagram. Guard against it returning.
  const svgHealth = await page.evaluate(() =>
    [...document.querySelectorAll('.diagram')].map((s) => ({
      kids: s.children.length,
      htmlInside: s.querySelectorAll('p, div, span').length,
      shapes: s.querySelectorAll('rect, line, path, text').length,
    })),
  );
  check(
    svgHealth.every((s) => s.htmlInside === 0),
    `no HTML nodes inside SVG (${scheme})`,
    JSON.stringify(svgHealth),
  );
  check(
    svgHealth.every((s) => s.shapes >= 8),
    `diagrams fully populated (${scheme})`,
    JSON.stringify(svgHealth.map((s) => s.shapes)),
  );

  // screenshots
  for (const size of SIZES) {
    await page.setViewportSize({ width: size.width, height: size.height });
    for (const [path, name] of [['/', 'index'], ['/agentic-software-engineering/', 'post']]) {
      await page.goto(BASE + path, { waitUntil: 'networkidle' });
      await page.screenshot({
        path: `${OUT}/${name}-${size.name}-${scheme}.png`,
        fullPage: size.name === '380' ? false : false,
      });
    }
  }

  await context.close();
}

await browser.close();

console.log('--- NOTES ---');
notes.forEach((n) => console.log('  ' + n));
console.log('--- RESULT ---');
if (fails.length) {
  console.log(`FAIL (${fails.length})`);
  fails.forEach((f) => console.log('  ✗ ' + f));
  process.exit(1);
}
console.log('ALL CHECKS PASSED');
