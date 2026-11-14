'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { vaultLetters } from '@/data/site';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const KEY = 'simmi-vault-opened';

function Seal() {
  return (
    <svg className="seal__wax" viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M24 2.5c3.2 0 5 2.4 7.6 3.4 2.7 1 5.6.2 7.6 2.2s1.2 4.9 2.2 7.6c1 2.6 3.4 4.4 3.4 7.6s-2.4 5-3.4 7.6c-1 2.7-.2 5.6-2.2 7.6s-4.9 1.2-7.6 2.2c-2.6 1-4.4 3.4-7.6 3.4s-5-2.4-7.6-3.4c-2.7-1-5.6-.2-7.6-2.2s-1.2-4.9-2.2-7.6C3.5 29 1.1 27.2 1.1 24s2.4-5 3.4-7.6c1-2.7.2-5.6 2.2-7.6s4.9-1.2 7.6-2.2C19 4.9 20.8 2.5 24 2.5Z"
        fill="#d01a2e"
      />
      <circle cx="24" cy="24" r="13.5" fill="none" stroke="rgba(11,7,9,0.45)" strokeWidth="1" />
      <path d="M27.4 15.8a9 9 0 1 0 0 16.4 7.4 9 0 0 1 0-16.4Z" fill="#f3ecef" opacity="0.92" />
    </svg>
  );
}

// Five sealed letters. Open state persists on her device; "seal again" puts them back.
export function Vault() {
  const [open, setOpen] = useState<string | null>(null);
  const [opened, setOpened] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setOpened(new Set(JSON.parse(raw) as string[]));
    } catch { /* first visit */ }
  }, []);

  const remember = (id: string) => {
    setOpened((prev) => {
      const next = new Set(prev).add(id);
      try { localStorage.setItem(KEY, JSON.stringify([...next])); } catch { /* private mode */ }
      return next;
    });
  };

  const reseal = () => {
    setOpen(null);
    setOpened(new Set());
    try { localStorage.removeItem(KEY); } catch { /* private mode */ }
  };

  return (
    <>
      <ul className="seals">
        {vaultLetters.map((l) => {
          const isOpen = open === l.id;
          const wasOpened = opened.has(l.id);
          return (
            <li className="seal" key={l.id}>
              <button
                type="button"
                className="seal__btn"
                aria-expanded={isOpen}
                aria-controls={`seal-${l.id}`}
                onClick={() => {
                  if (!isOpen) remember(l.id);
                  setOpen(isOpen ? null : l.id);
                }}
                data-cursor={isOpen ? 'close' : 'break the seal'}
              >
                <Seal />
                <span className="seal__label">{l.label}</span>
                <span className="seal__state">{isOpen ? 'reading' : wasOpened ? 'opened' : 'sealed'}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`seal-${l.id}`}
                    className="seal__panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <div className="seal__paper">
                      <p className="seal__title">{l.title}</p>
                      {l.body.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
      <button type="button" className="vault__reset" onClick={reseal}>
        seal them all again
      </button>
    </>
  );
}
