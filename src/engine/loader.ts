// First-load sequence. The counting and the exit belong to the layout's inline script (they must
// run before the JS bundle arrives), so this module only WAITS for that handoff and then hides
// the node. Markup (#loader) lives in the layout; its look is authored per project.
import { prefersReducedMotion } from './env';

/** Resolves when the inline script has added .is-loaded (the exit has started), with a cap so a
 *  missing script can never wedge the boot. */
function waitMarked(root: HTMLElement): Promise<void> {
  if (document.documentElement.classList.contains('is-loaded')) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => { obs.disconnect(); clearTimeout(timer); resolve(); };
    const obs = new MutationObserver(() => {
      if (document.documentElement.classList.contains('is-loaded')) done();
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const timer = setTimeout(done, 2600);
  });
}

/** Resolves when the CSS exit has finished (the loader is invisible), or after a short cap. */
function waitExit(root: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    if (getComputedStyle(root).visibility === 'hidden') return resolve();
    const done = () => { root.removeEventListener('animationend', onEnd); clearTimeout(timer); resolve(); };
    const onEnd = (e: AnimationEvent) => { if (e.target === root) done(); };
    root.addEventListener('animationend', onEnd);
    const timer = setTimeout(done, 700);
  });
}

export async function runLoader(): Promise<void> {
  const root = document.getElementById('loader');
  if (!root) { document.documentElement.classList.add('is-loaded'); return; }
  await waitMarked(root);
  if (!prefersReducedMotion()) await waitExit(root);
  finish(root);
}

// Hide rather than remove: in React apps the loader node belongs to React.
function finish(root: HTMLElement) {
  root.hidden = true;
  document.documentElement.classList.add('is-loaded');
}
