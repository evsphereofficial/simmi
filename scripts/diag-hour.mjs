import { launch } from 'file:///C:/Users/Rehan/.agents/skills/awwwards/scripts/browser.mjs';

const url = process.argv[2] || 'http://127.0.0.1:4400/world/';
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(3000);

const info = await page.evaluate(() => {
  const el = document.querySelector('[data-hour-label]');
  if (!el) return { missing: true };
  const out = { chain: [], rect: null, text: el.textContent };
  let n = el;
  while (n && n !== document.documentElement) {
    const c = getComputedStyle(n);
    out.chain.push({
      tag: n.tagName,
      cls: (n.className || '').toString().slice(0, 50),
      bg: c.backgroundColor,
      bgImage: c.backgroundImage.slice(0, 60),
      color: c.color,
      fs: c.fontSize,
      fw: c.fontWeight,
      pos: c.position,
    });
    n = n.parentElement;
  }
  const r = el.getBoundingClientRect();
  out.rect = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  out.htmlBg = getComputedStyle(document.documentElement).backgroundColor;
  out.bodyBg = getComputedStyle(document.body).backgroundColor;
  out.classes = document.documentElement.className;
  out.hour = document.documentElement.dataset.hour;
  return out;
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
