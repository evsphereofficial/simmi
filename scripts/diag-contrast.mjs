import { launch } from 'file:///C:/Users/Rehan/.agents/skills/awwwards/scripts/browser.mjs';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const url = process.argv[2] || 'http://127.0.0.1:4400/world/';
const require = createRequire('C:/Users/Rehan/simmi/noop.js');
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(3000);
await page.addScriptTag({ content: axeSource });
const res = await page.evaluate(async () => {
  const r = await window.axe.run(document, { runOnly: { type: 'rule', values: ['color-contrast'] } });
  return r.violations.flatMap((v) => v.nodes.map((n) => ({ target: n.target, html: n.html, data: n.data, any: n.any.map((a) => a.message) })));
});
console.log(JSON.stringify(res, null, 2));

// What is visually behind the hour label?
const behind = await page.evaluate(() => {
  const el = document.querySelector('[data-hour-label]');
  const r = el.getBoundingClientRect();
  const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
  const stack = document.elementsFromPoint(cx, cy).map((e) => {
    const c = getComputedStyle(e);
    return { tag: e.tagName, cls: (e.className || '').toString().slice(0, 40), bg: c.backgroundColor, z: c.zIndex };
  });
  const sel = document.querySelector('.frame__hour-dot');
  const sc = sel ? getComputedStyle(sel) : null;
  return { stack, dot: sc ? { bg: sc.backgroundColor, rect: sel.getBoundingClientRect().toJSON() } : null };
});
console.log(JSON.stringify(behind, null, 2));
await browser.close();
