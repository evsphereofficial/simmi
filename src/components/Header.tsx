'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '@/data/site';

// The four-corner frame: mark top-left, nav top-right, the hour bottom-left,
// a handwritten note bottom-right. Steps aside while scrolling down.
export function Header() {
  const path = usePathname();
  const current = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <header className="frame" data-frame>
      <Link href="/" className="frame__mark" aria-label="For Simmi, home">
        <svg className="frame__moon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" className="frame__moon-dim" />
          <path d="M12 3a9 9 0 0 0 0 18 7.5 9 0 0 1 0-18Z" className="frame__moon-lit" />
        </svg>
        <span>for Simmi</span>
      </Link>

      <nav className="frame__nav" aria-label="Sections">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="roll"
            aria-current={current(item.href) ? 'page' : undefined}
          >
            <span>{item.label}</span>
            <span aria-hidden="true">{item.label}</span>
          </Link>
        ))}
      </nav>

      <p className="frame__hour">
        <span className="frame__hour-dot" aria-hidden="true" />
        <span data-hour-label>dusk</span>
      </p>

      <p className="frame__note" aria-hidden="true">written at night, meant in daylight</p>
    </header>
  );
}
