import { launch } from 'file:///C:/Users/Rehan/.agents/skills/awwwards/scripts/browser.mjs';

const url = process.argv[2] || 'http://127.0.0.1:4400/';
const out = process.argv[3] || 'C:/Users/Rehan/simmi/.shots/crop';
const clips = {
  desktop: { viewport: { width: 1440, height: 900 }, clips: [
    { name: 'bl', x: 0, y: 760, width: 720, height: 140 },
    { name: 'br', x: 720, y: 760, width: 720, height: 140 },
    { name: 'top', x: 0, y: 0, width: 720, height: 90 },
  ] },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, clips: [
    { name: 'm-top', x: 0, y: 0, width: 390, height: 70 },
    { name: 'm-bl', x: 0, y: 760, width: 390, height: 84 },
  ] },
};

const browser = await launch();
for (const [kind, cfg] of Object.entries(clips)) {
  const ctx = await browser.newContext(cfg);
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(5000);
  for (const c of cfg.clips) {
    const { name, ...clip } = c;
    await page.screenshot({ path: `${out}-${kind}-${name}.png`, clip });
    console.log('wrote', `${out}-${kind}-${name}.png`);
  }
  await ctx.close();
}
await browser.close();
