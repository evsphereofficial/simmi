// The night scene facade: owns the state bag, eases toward it on the gsap ticker, and
// lazily imports the Three.js scene (scene.ts) so first paint never waits for WebGL.
// The night driver writes to glTarget; this module only composes and renders.
import { gsap } from 'gsap';
import { prefersReducedMotion } from './env';
import type { Scene, SceneState } from './scene';

/* ---------------------------------------------------------------- state bag */

export const glTarget = {
  phase: 0.15, // 0 new → 0.5 full → 1 new again
  x: 0.34, // NDC -1..1 (moon centre)
  y: -0.14,
  radius: 0.2, // fraction of viewport height
  rain: 0.6, // 0..1 streak intensity
  golden: 0, // 0..1 sunset warmth
  glow: 1, // halo strength multiplier
};

const current: SceneState = { ...glTarget, flash: 0 };

/** Night driver writes here; the scene eases toward it every tick. */
export function setNightTarget(t: Partial<typeof glTarget>) {
  Object.assign(glTarget, t);
}

/** A lightning flash: spikes the sky, decays over a second. */
export function triggerFlash(strength = 1) {
  gsap.killTweensOf(current, 'flash');
  gsap.fromTo(current, { flash: strength }, { flash: 0, duration: 1.1, ease: 'power2.out', overwrite: true });
}

/* ---------------------------------------------------------------- lifecycle */

let scene: Scene | null = null;
let loading: Promise<Scene | null> | null = null;
let started = false;

export function glSupported(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function ensureScene() {
  if (scene || loading || prefersReducedMotion() || !glSupported()) return;
  loading = import('./scene')
    .then((m) => {
      scene = m.createScene();
      if (scene) {
        scene.canvas.className = 'gl-canvas';
        document.getElementById('gl')?.appendChild(scene.canvas);
        addEventListener('resize', scene.resize);
        document.documentElement.classList.add('gl-on');
      }
      return scene;
    })
    .catch(() => null);
}

export function initGL() {
  ensureScene();
}

export function mountGL() {
  if (started) return;
  started = true;
  ensureScene();
  addEventListener('resize', onResize);
  gsap.ticker.add(tick);
}

function onResize() {
  scene?.resize();
}

export function unmountGL() {
  // The scene is persistent by design: it belongs to the root layout, not to a page.
}

export function hideGL(fade = 0.6) {
  if (!scene) return;
  gsap.to(scene.canvas, { autoAlpha: 0, duration: fade, ease: 'power2.out' });
}

export function clearBackground() {
  setNightTarget({ phase: 0.15, x: 0.34, y: -0.14, radius: 0.2, rain: 0.6, golden: 0, glow: 1 });
}

/* ---------------------------------------------------------------- frame */

const MOBILE_RADIUS = 0.62; // phones get a smaller moon so it never swallows the screen

let mqMobile: MediaQueryList | null = null;

function tick(time: number) {
  const r = gsap.ticker.deltaRatio();
  const k = 1 - Math.pow(0.94, r); // ease toward targets: nothing ever snaps
  const c = current;
  const t = glTarget;
  mqMobile ??= matchMedia('(max-width: 767px)');

  c.phase += (t.phase - c.phase) * k;
  c.x += (t.x - c.x) * k;
  c.y += (t.y - c.y) * k;
  c.radius += (t.radius * (mqMobile.matches ? MOBILE_RADIUS : 1) - c.radius) * k;
  c.rain += (t.rain - c.rain) * k;
  c.golden += (t.golden - c.golden) * k;
  c.glow += (t.glow - c.glow) * k;

  scene?.render(c, time);
}
