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
  const r = await window.axe.run(document, { resultTypes: ['violations'] });
  return r.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.slice(0, 6).map((n) => ({ target: n.target, html: n.html.slice(0, 220), summary: (n.failureSummary || '').slice(0, 300) })),
  }));
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
