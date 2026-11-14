import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { WeatherDial } from '@/components/WeatherDial';
import { fashion, flowers, gems, menu, music, palette, stories } from '@/data/site';

export const metadata: Metadata = {
  title: 'her world',
  description:
    'The world Simmi loves: her palette, her stones, her flowers, her weather on request, her songs, her stories and the menu of the bakery she dreams of.',
};

const BLOOM = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8" fill="none" stroke="#ff6b7c" strokeWidth="1" />
    <circle cx="12" cy="12" r="4.8" fill="none" stroke="#ff6b7c" strokeWidth="1" />
    <circle cx="12" cy="12" r="1.7" fill="#d01a2e" />
  </svg>
);

export default function World() {
  return (
    <article className="page">
      <header className="whero" data-sky="night">
        <p className="kicker" data-reveal="fade" data-intro>everything you love, in one room</p>
        <h1 data-split="chars" data-intro>Her world</h1>
        <p data-reveal="up" data-intro>
          Not a list, a room. Your colours and your stones on the wall, your weather behind
          switches, your songs on the shelf, your menu in the kitchen. Touch anything that looks
          like it moves.
        </p>
      </header>

      <section className="block" data-sky="night" aria-labelledby="colors-title">
        <header className="section-head">
          <p className="kicker" data-reveal="fade">red, and the colours you added to every drawing</p>
          <h2 id="colors-title" data-split="lines">The palette</h2>
        </header>
        <div className="swatches" data-reveal="up">
          {palette.map((c) => (
            <figure className="swatch" key={c.name}>
              <span className="swatch__chip" style={{ background: c.hex }} aria-hidden="true" />
              <figcaption className="swatch__meta">
                <span className="swatch__name">{c.name}</span>
                <span className="sr-only">{c.hex}</span>
                <span className="swatch__note">{c.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="block twins" data-sky="night" aria-label="stones and flowers">
        <div>
          <header className="section-head">
            <p className="kicker" data-reveal="fade">on your hands, in your hair</p>
            <h2 data-split="lines">Stones & metal</h2>
          </header>
          <ul className="chips" data-reveal="up">
            {gems.map((g, i) => (
              <li className={`chip chip--${['ruby', 'amethyst', 'silver'][i]}`} key={g.name}>
                <strong>{g.name}</strong>
                <span>{g.line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <header className="section-head">
            <p className="kicker" data-reveal="fade">peonies first, always</p>
            <h2 data-split="lines">Flowers</h2>
          </header>
          <ul className="petals">
            {flowers.map((f) => (
              <li className="petal" key={f.name}>
                {BLOOM}
                <span>
                  <span className="petal__name">{f.name}</span>
                  <span className="petal__line">{f.line}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block" data-sky="night" aria-labelledby="wx-title">
        <header className="section-head">
          <p className="kicker" data-reveal="fade">every season but summer</p>
          <h2 id="wx-title" data-split="lines">Weather, on request</h2>
          <p className="section-head__sub" data-reveal="up">
            These are real switches. Press one and the sky out there changes: the same rain, the
            same thunder, the same gold you love at five minutes to seven.
          </p>
        </header>
        <WeatherDial />
      </section>

      <section className="block" data-sky="night" aria-labelledby="music-title">
        <header className="section-head">
          <p className="kicker" data-reveal="fade">what plays while you paint</p>
          <h2 id="music-title" data-split="lines">The soundtrack</h2>
        </header>
        <div className="tunes">
          {music.map((m) => (
            <div className="tune" key={m.group} data-reveal="up">
              <div>
                <p className="tune__group">{m.group}</p>
                <p className="tune__note">{m.note}</p>
              </div>
              <ul className="tune__songs">
                {m.songs.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="block" data-sky="night" aria-labelledby="stories-title">
        <header className="section-head">
          <p className="kicker" data-reveal="fade">what you read until 3 a.m.</p>
          <h2 id="stories-title" data-split="lines">Stories</h2>
        </header>
        <div className="stories">
          <div className="story">
            <h3>manhwa</h3>
            <ul>{stories.manhwa.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div className="story">
            <h3>screen</h3>
            <ul>{stories.screen.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div className="story">
            <h3>games</h3>
            <ul>{stories.games.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>

        <div className="fates" data-reveal="up">
          <div className="fates__head">
            <span className="fates__seal" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M14.4 4.6a8 8 0 1 0 0 14.8 6.7 8 0 0 1 0-14.8Z" fill="#f3ecef" />
              </svg>
            </span>
            <div>
              <p className="fates__title">{stories.fates.title}</p>
              <p className="fates__line">{stories.fates.line}</p>
            </div>
          </div>
          <div className="fates__cast">
            {stories.fates.characters.map((c) => (
              <div className="fates__char" key={c.name}>
                <span className="fates__name">{c.name}</span>
                <span className="fates__role">{c.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" data-sky="dawn" aria-labelledby="menu-title">
        <header className="section-head">
          <p className="kicker" data-reveal="fade">the bakery menu, before the bakery exists</p>
          <h2 id="menu-title" data-split="lines">What you would order</h2>
        </header>
        <div className="menu">
          {menu.map((item) => (
            <div className="menu__row" key={item.name} data-reveal="up">
              <span className="menu__name">{item.name}</span>
              <span className="menu__dots" aria-hidden="true" />
              <span className="menu__note">{item.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="block" data-sky="dawn" aria-labelledby="wear-title">
        <header className="section-head">
          <p className="kicker" data-reveal="fade">romantic goth, balletcore, y2k, all of it</p>
          <h2 id="wear-title" data-split="lines">The wardrobe</h2>
        </header>
        <div className="wear" data-reveal="up">
          {fashion.map((f) => (
            <div className="wear__item" key={f.name}>
              <span className="wear__name">{f.name}</span>
              <span className="wear__line">{f.line}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 'clamp(2.5rem, 6vh, 4rem)' }}>
          <Link className="link" href="/">back to the letter</Link>
        </p>
      </section>

      <Footer />
    </article>
  );
}
