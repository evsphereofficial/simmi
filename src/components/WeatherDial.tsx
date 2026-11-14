'use client';
import { useEffect, useRef, useState } from 'react';
import { weather } from '@/motion/night';
import { weather as sky } from '@/data/site';

// Five switches that drive the actual night scene: rain swells, thunder cracks the sky,
// the horizon goes golden. Same driver, same uniforms — the buttons talk to the moon.
export function WeatherDial() {
  const [active, setActive] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const fire = (id: string) => {
    weather(id as 'rain' | 'thunder' | 'breeze' | 'golden' | 'winter');
    setActive(id);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), 3600);
  };

  return (
    <div className="wx">
      {sky.map((w) => (
        <button
          key={w.id}
          type="button"
          className={`wx__btn${active === w.id ? ' is-on' : ''}`}
          data-fill
          data-cursor="change the sky"
          onClick={() => fire(w.id)}
          aria-pressed={active === w.id}
        >
          <span className="wx__fill" data-fill-el aria-hidden="true" />
          <span className="wx__label">{w.label}</span>
          <span className="wx__line">{w.line}</span>
        </button>
      ))}
    </div>
  );
}
