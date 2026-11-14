import { launch } from 'file:///C:/Users/Rehan/.agents/skills/awwwards/scripts/browser.mjs';

const url = process.argv[2] || 'http://127.0.0.1:4400/world/';
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => {
  window.__lcps = [];
  window.__cls = [];
  const t0 = performance.now();
  const push = (name) => window.__cls.push({ name, at: Math.round(performance.now() - t0) });
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        const el = e.element;
        window.__lcps.push({ at: Math.round(e.startTime), size: Math.round(e.size), tag: el ? el.tagName : null, cls: el ? (el.className || '').toString().slice(0, 50) : null, txt: el ? (el.textContent || '').trim().slice(0, 40) : null });
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {}
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) push('paint:' + e.name); }).observe({ type: 'paint', buffered: true });
  } catch {}
  // watch loader hidden
  const iv = setInterval(() => {
    const l = document.getElementById('loader');
    if (l && l.hidden) { push('loader.hidden'); clearInterval(iv); }
    const h = document.documentElement.classList;
    if (h.contains('is-booted') && !window.__booted) { window.__booted = 1; push('is-booted'); }
    if (h.contains('gl-on') && !window.__glon) { window.__glon = 1; push('gl-on'); }
    if (h.contains('is-loaded') && !window.__loaded) { window.__loaded = 1; push('is-loaded'); }
  }, 20);
  // watch <html> class changes
  try {
    const prev = { v: document.documentElement.getAttribute('class') || '' };
    new MutationObserver(() => {
      const now = document.documentElement.getAttribute('class') || '';
      if (now !== prev.v) { prev.v = now; push('html.class: ' + now); }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  } catch (e) { push('observer-error:' + e.message); }
});

const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });

const t0 = Date.now();
await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
const loadMs = Date.now() - t0;
await page.waitForTimeout(12000);

const out = await page.evaluate(() => ({ lcps: window.__lcps, marks: window.__cls, nav: performance.getEntriesByType('navigation').map((n) => ({ ttfb: Math.round(n.responseStart), dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd) })) }));
console.log('loadMs', loadMs);
console.log(JSON.stringify(out, null, 2));
await browser.close();
