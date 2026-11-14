import { launch } from 'file:///C:/Users/Rehan/.agents/skills/awwwards/scripts/browser.mjs';

const url = process.argv[2] || 'http://127.0.0.1:4400/world/';
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => {
  window.__lcps = [];
  window.__marks = [];
  const t0 = performance.now();
  window.__mark = (name) => window.__marks.push({ name, at: Math.round(performance.now() - t0) });
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        const el = e.element;
        window.__lcps.push({
          at: Math.round(e.startTime),
          size: Math.round(e.size),
          tag: el ? el.tagName : null,
          cls: el ? (el.className || '').toString().slice(0, 60) : null,
          txt: el ? (el.textContent || '').trim().slice(0, 50) : null,
        });
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {}
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__marks.push({ name: 'paint:' + e.name, at: Math.round(e.startTime) }); }).observe({ type: 'paint', buffered: true });
  } catch {}
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__marks.push({ name: 'resource:' + (e.name.split('/').pop() || '').slice(0, 40), at: Math.round(e.responseEnd) }); }).observe({ type: 'resource', buffered: true });
  } catch {}
});

const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });

const t0 = Date.now();
await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch((e) => console.log('load timeout', e.message));
const loadMs = Date.now() - t0;

// poll for loader gone + is-loaded
await page.waitForFunction(() => document.documentElement.classList.contains('is-loaded'), null, { timeout: 30000 }).catch(() => console.log('never is-loaded'));
const loaderMs = Date.now() - t0;
await page.waitForTimeout(2500);

const out = await page.evaluate(() => ({
  lcps: window.__lcps,
  marks: window.__marks,
  loaded: document.documentElement.classList,
  heroH1: (() => { const h = document.querySelector('h1,h2'); if (!h) return null; const cs = getComputedStyle(h); return { tag: h.tagName, txt: (h.textContent || '').slice(0, 40), vis: cs.visibility, op: cs.opacity }; })(),
  nav: performance.getEntriesByType('navigation').map((n) => ({ ttfb: Math.round(n.responseStart), dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd) })),
  transfer: Math.round(performance.getEntriesByType('resource').reduce((s, r) => s + (r.transferSize || 0), 0)),
  js: Math.round(performance.getEntriesByType('resource').filter((r) => r.name.endsWith('.js') || r.name.includes('.js?')).reduce((s, r) => s + (r.transferSize || 0), 0)),
  css: Math.round(performance.getEntriesByType('resource').filter((r) => r.name.includes('.css')).reduce((s, r) => s + (r.transferSize || 0), 0)),
}));
console.log('loadMs', loadMs, 'loaderMs', loaderMs);
console.log(JSON.stringify(out, null, 2));
await browser.close();
