// Global motion for this site: runs once on the client, before the first page initializes.
// Loader = moonrise, transition = an eclipse closing over the page, driver = the night.
import { gsap } from 'gsap';
import { ease, onScroll, setTransition } from '@/engine';
import { buttonFill } from './fill';
import { startIdle } from './idle';
import { startNight } from './night';

export function setupMotion() {
  startIdle();
  startNight();
  buttonFill();

  // the corner frame steps aside while she scrolls down, returns when she scrolls up
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 200 && y > last);
    last = y;
  });

  // Eclipse: a dark disc closes over the page from where she clicked, and opens again.
  let point = { x: innerWidth / 2, y: innerHeight / 2 };
  addEventListener('pointerdown', (e) => { point = { x: e.clientX, y: e.clientY }; }, { passive: true });
  const at = () => `${point.x}px ${point.y}px`;
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'),
        { clipPath: `circle(0% at ${at()})` },
        { clipPath: `circle(150% at ${at()})`, duration: 0.9, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'),
        { clipPath: `circle(0% at ${at()})`, duration: 0.85, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });
}
