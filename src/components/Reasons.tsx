'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { reasons } from '@/data/site';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Ten rows, one open at a time. Framer Motion owns the height animation here because
// it is layout state, not choreography — GSAP never touches these nodes.
export function Reasons() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="reasons">
      {reasons.map((r) => {
        const isOpen = open === r.n;
        return (
          <li className="reason" key={r.n}>
            <button
              type="button"
              className="reason__row"
              aria-expanded={isOpen}
              aria-controls={`reason-${r.n}`}
              onClick={() => setOpen(isOpen ? null : r.n)}
            >
              <span className="reason__n">{r.n}</span>
              <span className="reason__title">{r.title}</span>
              <span className="reason__plus" aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`reason-${r.n}`}
                  className="reason__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p>{r.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
