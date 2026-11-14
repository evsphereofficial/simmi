# DESIGN.md — "One night, her moon" (for Simmi)

## Brief (Phase 0)

- **Subject:** Simmi — gothic-romantic artist, MBBS aspirant, moon child (nickname Chandra = Moon).
- **Audience of one:** Simmi. The site's job: apologize deeply for the night he fainted from a
  headache and left his DMs open (she texted all night), honor the 10 months it would have been,
  prove the love is steady and won't be given up, and hand her back her own world — her
  favorites, drawn as a place she can walk through.
- **Language:** English.
- **Assets:** none provided. All visuals procedural (Three.js scene, SVG, CSS) — no photos, no
  fake credentials, no invented facts. Unknown facts (how they met, exact dates) are flagged
  `placeholder: true` in `src/data/site.ts`.
- **Stack (user-named):** Next.js App Router + TypeScript, GSAP + Lenis engine, Three.js for the
  moon scene, Framer Motion for the vault/reasons interactions, plus SVG/CSS for washes.

## Concept (Phase 1)

Three concepts generated from different territories:

| | A. One night, her moon (name) | B. Wet on wet (material) | C. Monsoon letter (process) |
|---|---|---|---|
| Idea | The site is one night; scroll moves dusk → moonrise → full moon → dawn, and a Three.js moon waxes as you go | The site is her watercolor pad: every section a wash of her pigments bleeding on black paper | The site is one letter read through a monsoon night; thunder flashes reveal the hard paragraphs |
| Anchor | Her name means moon; she was born under a full moon | "I use water colour more cause I can control the flow better" | "Yep yep i do love thunder and rainy season" + the night he fainted |
| Signature | Scroll-driven lunar phase + sky light | Cursor pigment bloom that bleeds and dries | Lightning as the reveal mechanic |
| O/F/Fe/P | 4 / 5 / 4 / 2 = 15 | 5 / 5 / 3 / 3 = 16 | 4 / 5 / 4 / 3 = 16 |

**Pick A**, reason: only the moon is named by *her* — it survives loader, hero, letter, world,
vault and 404 without ever feeling moved in from another person. Steal from **B**: watercolor
wash edges between sections (her own medium). Steal from **C**: one scripted lightning flash
that reveals the paragraph about the night he fainted.

### Concept Card

```
Idea:        The site is a single night under Simmi's moon: scroll waxes the moon from crescent
             to full, and the apology lands at full moon.
Metaphor:    A night — dusk, moonrise, full, before dawn — the way she was born under one.
Signature:   The persistent Three.js moon: one `night` driver (scroll + idle drift + pointer)
             maps its phase, arc, sky, stars and rain; DOM section labels narrate the hour.
Emotion:     First 3 seconds: quiet, held, "someone stayed up making this for me".
Motion verb: orbits and waxes — entrances rise like moonrise (long expo.out), transitions are
             an eclipse (a circle closing), hovers flood like light.
Screenshot:  Giant Bodoni "Simmi" with a waxing silver moon behind it, rain falling, ruby scroll cue.
```

**Genericness test:** a generic model would give this a purple gradient heart page with floating
petals and a countdown. Changed: no gradient blobs, no petals-as-confetti, no countdown clock —
the romance is carried by *her* symbols (moon phases, rain, ruby, her own quoted words) and by
one coherent system instead of effects.

## Art direction (Phase 2)

### Palette (roles, not hues)

| Token | Hex | Name / role |
|---|---|---|
| `--c-bg` | `#0b0709` | night ink (black with a drop of wine) — ground |
| `--c-fg` | `#f3ecef` | moonlight — primary ink |
| `--c-muted` | `#a99ba3` | dusk mauve — secondary text (AA on ground ≈ 7:1) |
| `--c-line` | `rgb(243 236 239 / 0.16)` | hairlines |
| `--c-accent` | `#d01a2e` | ruby — her red. Fills, large display, nodes, seals. Never small body text |
| `--c-curtain` | `#160509` | closed eyelid — the eclipse curtain |

Her pigment colors (amethyst `#8b5fbf`, lavender `#b9a3e3`, sage `#9caf88`, hot pink `#ff4fa3`,
deep blue `#2b3a8f`, wheat `#e4c98f`) are **content** on /world (her swatches), not system roles.

Single committed dark theme — she is gothic romantic; light mode would break the night.

### Type

- **Display:** Bodoni Moda (Google, variable opsz, italics) — fashion-goth contrast. Used huge:
  `--t-mega: clamp(4rem, 1.2rem + 14vw, 16rem)`, line-height 0.9, tracking -0.04em, optical
  `margin-left: -0.05em`. Italic cut carries her quotes.
- **Text/UI:** Schibsted Grotesk (Google) — warm newspaper grotesk, 16–18 px, 1.5 leading,
  measure 58ch. UI text 12–14 px, tracked +0.04em uppercase only for the corner frame.
- **Accent:** Caveat (Google) — handwriting for annotations that carry real information: margin
  dates ("that night"), the letter's signature, the vault's seal labels. Nowhere else.

### Grid, shape, motion

- 12 columns, gutter `clamp(1rem, 0.6rem + 1.6vw, 2.5rem)`; each section uses a different
  layout family (full-bleed hero, narrow letter column with outer margin notes, center-rail
  timeline, full-width index rows, vitrine grid, centered seal stack).
- Radius 0 everywhere (engraved, sharp) except true circles for celestial motifs (moon, phase
  dots, wax seals).
- One easing family: engine `ease` (expo.out entrances, expo.inOut curtains, power3 small UI,
  back.out 1.6 rare). Big things slower than small; stagger 20–80 ms.
- **Motion verb "orbits and waxes":** reveals rise from below the horizon with a mask; the
  curtain closes as an eclipse circle from the click point; primary buttons flood ruby from the
  pointer; nav links draw an underline; cards scale inside a clipped frame.

### Composition wireframes (per section)

```
HERO (full-bleed)                 LETTER (narrow column + margin notes)
┌────────────────────────────┐    ┌──┬──────────────────────┬──────┐
│ for Simmi        letter··· │    │  │ for the night I      │ that │
│                            │    │m │ fainted —            │ night│
│      S i m m i  (14vw)     │    │o │ [paras, line-revealed]│ 01:4 │
│   my moon child · scroll ↓ │    │o │                      │  a.m.│
│                            │    │n │  “want, not need”    │      │
└────────────────────────────┘    │  │      — yours, Caveat  │      │
                                  └──┴──────────────────────┴──────┘
TIMELINE (center rail)           REASONS (full-width index rows)
   ● month one                    01 ─ your mind ────────────── ＋
   │                              02 ─ the way you care ─────── ＋
   ● the night (⚡ flash)         03 ─ your art ─────────────── ＋  (expand → text)
   │
   ● ten months, unbegun

WORLD (vitrine grid, varied)     VAULT (centered seal stack)
┌───────┬────────┬───────┐        ✉ open when you're sad
│ colors│ moon   │ gems  │        ✉ open when you miss me
├───────┼────────┼───────┤        ✉ open when you doubt me
│weather│ music  │ stories│       ✉ open when you're angry
├───────┴────────┴───────┤        ✉ open when you're ready
│ food · fashion (menu)  │
└────────────────────────┘
```

### Driver module (one variable → everything)

`src/motion/night.ts` owns `night` (0→1 per page, continued across pages by tween, never a hard
cut) plus idle drift (`idle.t`) and pointer tilt. It fans out to:

1. Three.js uniforms: `uPhase` (illumination), `uMoonPos` (arc), `uSkyTop/Bottom`, `uStars`,
   `uRain`, `uFlash` (lightning), `uGolden` (sunset tint at the end of the letter).
2. DOM: `data-hour` on `<html>` ("dusk", "moonrise", "full", "before dawn") — the corner label
   narrates it; ambient glow opacity.
3. Section states: static sky fallbacks per `data-sky` when GL is off.

Idle: moon surface drift + star twinkle + constant light rain (the concept itself moving).
Reduced motion: no GL, no Lenis, no scrub; static designed sky per section; content visible.

## Content (real copy, no filler)

All copy lives in `src/data/site.ts`:

- **The letter** (home): 9–11 paragraphs. Opens on the night he fainted; thanks her for staying
  up; owns the worry he caused; says sorry without conditions; names the ten months; quotes her
  own words back ("want, not need"; "we can do everything together"); promises steady, calm,
  unconditional love; respects her decision without surrendering his; signs in handwriting.
- **Timeline:** 6 events — how they met (placeholder flag), the months, the breakup, the night
  she texted all night, ten months unbegun, tonight (this site).
- **Reasons:** 10 index rows, each expandable.
- **Vault:** 5 sealed letters with real messages, opened state persisted in localStorage.
- **World:** her favorites as designed content — palette with her quotes, gems, flowers,
  weather (interactive: drives the rain/flash), songs, stories incl. her Book of Fates OCs,
  a bakery menu of her foods, fashion.

## QA + ship

Production build QA with the skill's shoot/audit scripts; fresh critic subagent per pass;
scores must be ≥8 each; then OG image, favicon, sitemap, robots, canonical, 404; Vercel deploy
steps in the final message.

## Decisions log

- One page = one chapter of the night; /world and /vault are inner pages so the eclipse
  transition earns its keep.
- Framer Motion is used only where GSAP doesn't reach (vault letter layout, reasons accordion
  height), on separate elements — never both animating one node.
- Sound: none (autoplay friction); rain is visual. Could be added later as an opt-in toggle.
- The moon scene is dynamically imported after first paint (bundle budget), with a designed
  static sky fallback for no-WebGL and reduced motion.
