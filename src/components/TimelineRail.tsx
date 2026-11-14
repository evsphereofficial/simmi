'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePage } from '@/engine/next';
import { ease, prefersReducedMotion } from '@/engine';
import { timeline } from '@/data/site';

// The rail draws itself as she scrolls, and each node lights as the night passes it.
// The event about the fainting night is marked data-flash for the driver.
export function TimelineRail() {
  const root = useRef<HTMLOListElement>(null);

  usePage(() => {
    const list = root.current;
    if (!list) return;
    const events = gsap.utils.toArray<HTMLElement>(list.querySelectorAll('.rail__event'));

    // reduced motion: the finished state is the only state. Nothing is ever hidden,
    // so every node is lit and the rail is simply drawn.
    if (prefersReducedMotion()) {
      events.forEach((el) => el.classList.add('is-lit'));
      return;
    }

    const line = list.querySelector<HTMLElement>('.rail__draw');

    const draws = gsap.fromTo(line, { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: list, start: 'top 72%', end: 'bottom 62%', scrub: 0.6 },
    });
    const lits = events.map((el) =>
      ScrollTrigger.create({
        trigger: el, start: 'top 66%', once: true,
        onEnter: () => el.classList.add('is-lit'),
      })
    );
    // a soft settle for each event as it arrives. The copy only rises: no
    // opacity gate, so the text is never a blank patch if a tween is caught
    // mid-flight or left unplayed (the section must read at a glance).
    const settles = events.map((el) =>
      gsap.from(el.querySelectorAll('.rail__when, h3, .rail__body'), {
        y: 28, duration: 1, stagger: 0.07, ease: ease.out,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      })
    );

    return () => { draws.scrollTrigger?.kill(); draws.kill(); lits.forEach((t) => t.kill()); settles.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); }); };
  });

  return (
    <ol className="rail" ref={root}>
      <span className="rail__draw" aria-hidden="true" />
      {timeline.map((ev) => (
        <li className="rail__event" key={ev.id} data-flash={ev.flash ? '' : undefined}>
          <span className="rail__node" aria-hidden="true" />
          <p className="rail__when">{ev.when}</p>
          <h3>{ev.title}</h3>
          <p className="rail__body">{ev.body}</p>
        </li>
      ))}
    </ol>
  );
}
