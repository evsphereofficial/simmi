import { launch } from 'file:///C:/Users/Rehan/.agents/skills/awwwards/scripts/browser.mjs';

const url = process.argv[2] || 'http://127.0.0.1:4400/';
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(4000);

const list = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('h1,h2,h3,p,a').forEach((e) => {
    const cs = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    if (r.height > 0 && (cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05)) {
      const chain = [];
      let n = e;
      while (n && n !== document.body) {
        const c = getComputedStyle(n);
        if (c.visibility === 'hidden' || parseFloat(c.opacity) < 0.05) {
          chain.push(`${n.tagName}.${(n.className || '').toString().slice(0, 40)}[v=${c.visibility} o=${c.opacity}]`);
        }
        n = n.parentElement;
      }
      out.push({
        tag: e.tagName,
        cls: (e.className || '').toString().slice(0, 60),
        txt: (e.textContent || '').trim().slice(0, 60),
        v: cs.visibility,
        o: cs.opacity,
        chain: chain.slice(1),
      });
    }
  });
  return out;
});

console.log(`hidden: ${list.length}`);
list.forEach((l, i) => {
  console.log(`\n${i + 1}. ${l.tag} o=${l.o} v=${l.v} cls="${l.cls}"\n   "${l.txt}"`);
  l.chain.forEach((c) => console.log(`     inherited from ${c}`));
});
await browser.close();
