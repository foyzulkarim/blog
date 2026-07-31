// Ad-hoc visual capture. `node scripts/shots.mjs <outdir>` with preview running.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] ?? './shots';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ colorScheme: scheme });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('http://localhost:4321/agentic-software-engineering/', {
    waitUntil: 'networkidle',
  });
  const figs = page.locator('figure');
  for (const [i, name] of [[0, 'lifecycle'], [2, 'foundation'], [4, 'loop'], [5, 'worktrees']]) {
    await figs.nth(i).screenshot({ path: `${OUT}/fig-${name}-${scheme}.png` });
  }
  await ctx.close();
}
await browser.close();
console.log('captured to', OUT);
