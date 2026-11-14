import { launch } from 'file:///C:/Users/Rehan/.agents/skills/awwwards/scripts/browser.mjs';

const url = process.argv[2] || 'http://127.0.0.1:4400/';
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(5000);

const res = await page.evaluate(() => {
  const out = {};
  const c = document.getElementById('cursor');
  if (c) {
    const cs = getComputedStyle(c);
    const r = c.getBoundingClientRect();
    out.cursor = {
      cls: c.className,
      text: c.textContent,
      label: c.querySelector('[data-cursor-label]')?.textContent,
      rect: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      display: cs.display, visibility: cs.visibility, opacity: cs.opacity,
      transform: cs.transform, pe: cs.pointerEvents, z: cs.zIndex,
      color: getComputedStyle(c.querySelector('[data-cursor-label]') || c).color,
      ff: getComputedStyle(c.querySelector('[data-cursor-label]') || c).fontFamily,
    };
  }
  // any element whose text matches a handwriting note near the bottom-left
  const notes = [...document.querySelectorAll('*')].filter((e) => {
    if (e.children.length) return false;
    const t = (e.textContent || '').trim();
    if (!t || t.length > 60) return false;
    const r = e.getBoundingClientRect();
    return r.top > 780 && r.top < 900 && r.left < 400 && r.height > 0;
  }).map((e) => ({ cls: (e.className || '').toString(), txt: e.textContent.trim(), color: getComputedStyle(e).color, rect: e.getBoundingClientRect().toJSON() }));
  out.bottomLeft = notes;
  return out;
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
