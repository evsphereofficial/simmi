import { launch } from 'file:///C:/Users/Rehan/.agents/skills/awwwards/scripts/browser.mjs';

const url = process.argv[2] || 'http://127.0.0.1:4400/';
const points = (process.argv[3] || '35,857;1310,859;180,1650;120,1640').split(';');
const mobile = process.argv.includes('--mobile');

const browser = await launch();
const ctx = await browser.newContext(mobile
  ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
  : { viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(5000);

const res = await page.evaluate((pts) => pts.map((p) => {
  const [x, y] = p.split(',').map(Number);
  const stack = document.elementsFromPoint(x, y).slice(0, 5).map((e) => ({
    tag: e.tagName,
    cls: (e.className || '').toString().slice(0, 44),
    txt: (e.textContent || '').trim().slice(0, 60),
    color: getComputedStyle(e).color,
    rect: (() => { const r = e.getBoundingClientRect(); return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`; })(),
  }));
  return { p, stack };
}), points);
console.log(JSON.stringify(res, null, 2));
await browser.close();
