import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Reasons } from '@/components/Reasons';
import { TimelineRail } from '@/components/TimelineRail';
import { letter } from '@/data/site';

// Indices treated as display lines: the opening, the apology itself, and her own words.
const DISPLAY = new Set([0, 2]);
const QUOTE = 7;

export default function Home() {
  return (
    <article className="page">
      <section className="hero" data-sky="dusk">
        <div className="hero__moon" aria-hidden="true" />
        <p className="hero__kicker kicker" data-reveal="fade" data-intro>for my moon child</p>
        <h1 className="hero__name" data-split="chars" data-intro>Simmi</h1>
        <div className="hero__meta" data-reveal="fade" data-intro>
          <p className="hero__sub">
            one night, under your moon, because your name is one. nothing here will ask you for
            anything. it only waits, the way I do.
          </p>
          <a className="hero__scroll" href="#letter" data-cursor="read">
            read it slowly
            <span className="hero__scroll-line" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="letter" id="letter" data-sky="night" aria-labelledby="letter-title">
        <div className="letter__inner">
          <p className="letter__date" data-reveal="up">{letter.date}</p>
          <h2 className="letter__title" id="letter-title" data-split="lines">{letter.kicker}</h2>

          <div className="letter__body">
            {letter.paragraphs.map((p, i) => (
              <p
                key={i}
                className={[
                  'letter__p',
                  DISPLAY.has(i) ? 'letter__p--display' : '',
                  i === QUOTE ? 'letter__p--quote' : '',
                ].join(' ')}
                data-split="lines"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="letter__close" data-reveal="up">
            <p className="letter__signoff">{letter.signoff}</p>
            <p className="letter__signature">{letter.signature}</p>
          </div>
        </div>
      </section>

      <section className="timeline" data-sky="night" aria-labelledby="story-title">
        <header className="section-head">
          <p className="kicker" data-reveal="fade">the months, in order</p>
          <h2 id="story-title" data-split="lines">What would have been ten months</h2>
          <p className="section-head__sub" data-reveal="up">
            six moments. the fourth one still keeps me up. the last one is tonight.
          </p>
        </header>
        <TimelineRail />
      </section>

      <section className="block" data-sky="night" aria-labelledby="reasons-title">
        <header className="section-head">
          <p className="kicker" data-reveal="fade">ten of them, and there were more</p>
          <h2 id="reasons-title" data-split="lines">Why it has always been you</h2>
        </header>
        <Reasons />
      </section>

      <section className="closing" data-sky="dawn" aria-labelledby="doors-title">
        <header className="section-head">
          <p className="kicker" data-reveal="fade">before you go</p>
          <h2 id="doors-title" data-split="lines">Two more rooms in the night</h2>
        </header>
        <div className="closing__doors">
          <Link href="/world/" className="door" data-fill data-cursor="step inside">
            <span className="door__fill" data-fill-el aria-hidden="true" />
            <span className="door__title">her world</span>
            <span className="door__sub">
              your colours, your stones, your weather, your songs, all arranged in one room.
            </span>
            <span className="door__go">
              step inside
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M1 7h11M8 3l4 4-4 4" />
              </svg>
            </span>
          </Link>
          <Link href="/vault/" className="door" data-fill data-cursor="open">
            <span className="door__fill" data-fill-el aria-hidden="true" />
            <span className="door__title">sealed letters</span>
            <span className="door__sub">
              five envelopes, waxed shut. open one on the night you need it.
            </span>
            <span className="door__go">
              break a seal
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M1 7h11M8 3l4 4-4 4" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </article>
  );
}
