import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="lost" data-sky="new">
      <p className="kicker" data-reveal="fade" data-intro>four oh four</p>
      <h1 data-split="lines" data-intro>This moon is elsewhere</h1>
      <p data-reveal="up" data-intro>
        Whatever you were looking for drifted off the edge of the sky. The night is back this way.
      </p>
      <Link href="/" data-intro data-reveal="up">
        back to the letter
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M13 7H2M6 3L2 7l4 4" />
        </svg>
      </Link>
    </section>
  );
}
