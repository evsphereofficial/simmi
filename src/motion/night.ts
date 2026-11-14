// The driver: one variable (the night) fans out to every concept-bearing visual —
// the Three.js scene's uniforms, the hour label in the corner, the flash on the timeline.
// Scroll sets the base state per page; the ticker composes base + emphasis + idle on top,
// so nothing ever snaps and the concept keeps moving while she reads.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, scrollState, prefersReducedMotion, isMobile } from '@/engine';
import type { ScrollState } from '@/engine';
import { setNightTarget, triggerFlash } from '@/engine/gl';
import { idle } from './idle';

type Range = {
  phase: [number, number]; // 0 new → 0.5 full
  x: [number, number]; // NDC
  y: [number, number];
  radius: [number, number]; // fraction of viewport height
  rain: [number, number];
  golden: [number, number];
  hours: [string, string];
};

// Each page is a chapter of the same night; the ranges meet so navigation never jumps.
const ranges: Record<string, Range> = {
  '/': {
    phase: [0.15, 0.5], x: [0.34, 0.62], y: [-0.14, 0.42], radius: [0.2, 0.17],
    rain: [0.6, 0.38], golden: [0, 0.16], hours: ['dusk', 'before dawn'],
  },
  '/world/': {
    phase: [0.5, 0.5], x: [0.5, 0.34], y: [0.5, 0.55], radius: [0.13, 0.13],
    rain: [0.34, 0.3], golden: [0, 0.06], hours: ['full', 'full'],
  },
  '/vault/': {
    phase: [0.5, 0.52], x: [-0.5, -0.44], y: [0.34, 0.38], radius: [0.24, 0.28],
    rain: [0.24, 0.16], golden: [0, 0], hours: ['the small hours', 'the small hours'],
  },
  '/not-found/': {
    phase: [0.04, 0.02], x: [0.3, 0.3], y: [0.2, 0.2], radius: [0.13, 0.13],
    rain: [0.85, 0.85], golden: [0, 0], hours: ['no moon', 'no moon'],
  },
};

const base = { phase: 0.15, x: 0.34, y: -0.14, radius: 0.2, rain: 0.6, golden: 0 };
const emph = { rain: 0, golden: 0 };
let hour: [string, string] = ranges['/'].hours;

// Phones play the same chapters compressed. The moon starts where she reads as
// part of the composition, then leaves through the top edge as the first screen
// scrolls away; the exit is anchored to that screen, not to the page's length,
// so on the letter and the vault it can never sit behind the hero copy for the
// whole read. Vault radius is stored pre-divided: gl.ts scales every radius by
// MOBILE_RADIUS (0.62) on phones, so 0.07 on screen means 0.07 / 0.62 here.
const mobileRanges: Record<string, Range> = {
  '/': {
    phase: [0.15, 0.5], x: [0.34, 0.5], y: [-0.14, 1.6], radius: [0.2, 0.2],
    rain: [0.6, 0.38], golden: [0, 0.16], hours: ['dusk', 'before dawn'],
  },
  '/world/': {
    phase: [0.5, 0.5], x: [0.5, 0.5], y: [0.74, 1.6], radius: [0.13, 0.13],
    rain: [0.34, 0.3], golden: [0, 0.06], hours: ['full', 'full'],
  },
  '/vault/': {
    phase: [0.5, 0.52], x: [-0.45, -0.45], y: [0.78, 1.6], radius: [0.24, 0.07 / 0.62],
    rain: [0.24, 0.16], golden: [0, 0], hours: ['the small hours', 'the small hours'],
  },
  '/not-found/': {
    phase: [0.04, 0.02], x: [0.3, 0.3], y: [0.5, 0.5], radius: [0.13, 0.13],
    rain: [0.85, 0.85], golden: [0, 0], hours: ['no moon', 'no moon'],
  },
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const at = (r: [number, number], p: number) => r[0] + (r[1] - r[0]) * p;

/* ---- weather (buttons on /world drive the same night) ---- */

export function weather(kind: 'rain' | 'thunder' | 'breeze' | 'golden' | 'winter') {
  if (prefersReducedMotion()) return;
  gsap.killTweensOf(emph);
  if (kind === 'thunder') triggerFlash(1.05);
  const to = kind === 'rain' ? { rain: 0.5, golden: -0.05 }
    : kind === 'thunder' ? { rain: 0.45, golden: 0 }
    : kind === 'breeze' ? { rain: -0.28, golden: 0.04 }
    : kind === 'golden' ? { rain: -0.3, golden: 0.95 }
    : { rain: -0.34, golden: -0.06 };
  const hold = kind === 'golden' ? 6 : 2.5;
  gsap.to(emph, { ...to, duration: 0.8, ease: 'power2.out' });
  gsap.to(emph, { rain: 0, golden: 0, duration: 2.4, delay: hold, ease: 'power2.inOut' });
}

/* ---- the frame label ---- */

function setHour(p: number) {
  const label = hour[0] === hour[1] ? hour[0] : p < 0.5 ? hour[0] : hour[1];
  const el = document.documentElement;
  if (el.dataset.hour !== label) {
    el.dataset.hour = label;
    const node = document.querySelector<HTMLElement>('[data-hour-label]');
    if (node && node.textContent !== label) node.textContent = label;
  }
}

/* ---- boot ---- */

export function startNight() {
  const compose = () => {
    if (prefersReducedMotion()) return;
    const drift = Math.sin(idle.t * 0.24) * 0.012; // slow breath, never still
    setNightTarget({
      phase: clamp01(base.phase + drift * 0.5),
      x: base.x + idle.x * 0.07,
      y: base.y + idle.y * 0.05 + drift,
      radius: base.radius,
      rain: clamp01(base.rain + emph.rain),
      golden: clamp01(base.golden + emph.golden),
    });
  };

  if (!prefersReducedMotion()) gsap.ticker.add(compose);

  onPage(({ path }) => {
    const key = path.endsWith('/') && path !== '/' ? path : path === '/' ? '/' : `${path}/`;
    const m = isMobile();
    const table = m ? mobileRanges : ranges;
    const range = table[key] ?? table['/'];
    // The first screen of the current page: the moon's exit is measured
    // against this, so a one-screen chapter (the letter, the vault) still
    // lets her read without the moon parked behind the copy.
    const first = document.querySelector<HTMLElement>('main .hero, main .vault, main .block, main .lost');
    const apply = (s: ScrollState) => {
      const exit = m
        ? clamp01(s.y / Math.max(40, (first?.offsetHeight ?? innerHeight) * 0.5))
        : 0;
      const p = m ? Math.max(clamp01(s.progress * 3), exit) : s.progress;
      base.phase = at(range.phase, p);
      base.x = at(range.x, p);
      base.y = at(range.y, p);
      base.radius = at(range.radius, p);
      base.rain = at(range.rain, p);
      base.golden = at(range.golden, p);
      hour = range.hours;
      setHour(p);
      if (prefersReducedMotion()) setNightTarget({ phase: base.phase }); // label only; no GL exists
    };
    apply(scrollState());
    const off = onScroll(apply);

    // the paragraph about the night he fainted earns the sky's reaction
    const flashEl = document.querySelector('[data-flash]');
    const st = flashEl && !prefersReducedMotion()
      ? ScrollTrigger.create({ trigger: flashEl, start: 'top 68%', once: true, onEnter: () => triggerFlash(1) })
      : null;

    return () => { off(); st?.kill(); };
  });
}
