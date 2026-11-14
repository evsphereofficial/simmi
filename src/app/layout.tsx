import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { display, hand, text } from './fonts';
import '@/engine/tokens.css';
import '@/engine/engine.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s, for Simmi' },
  description: site.description,
  alternates: { canonical: './' },
  openGraph: { type: 'website', siteName: site.name, images: ['/og.png'] },
  twitter: { card: 'summary_large_image' },
};
const flags = `document.documentElement.classList.add('js','first-load');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

// The loader runs from the HTML itself, before hydration: a frame-counted counter, then a CSS
// exit. It never touches React-owned text (the count node carries suppressHydrationWarning) and
// never waits for JS to download, so the veil lifts in ~1.7s even on a throttled phone.
const loaderBoot = `(function(){
var h=document.documentElement,l=document.getElementById('loader');
function mark(){h.classList.add('is-loaded');}
if(!l){mark();return;}
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var fontsReady=!document.fonts||!document.fonts.ready;
function waitFonts(cb){if(fontsReady)return cb();document.fonts.ready.then(cb,cb);}
if(reduce){var once=false;var go=function(){if(!once){once=true;mark();}};waitFonts(go);setTimeout(go,400);return;}
var count=l.querySelector('[data-loader-count]'),bar=l.querySelector('[data-loader-bar]'),wax=l.querySelector('[data-loader-wax]');
var t0=performance.now(),shown=0;
function frame(now){
  var e=(now-t0)/1000,goal=Math.min(1,e/0.7);
  if(!fontsReady&&e<1.1)goal=Math.min(goal,0.96);
  shown+=(goal-shown)*0.2;
  if(goal===1&&shown>0.99)shown=1;
  if(count)count.textContent=Math.round(shown*100)+'%';
  if(bar)bar.style.transform='scaleX('+shown.toFixed(3)+')';
  if(wax)wax.style.clipPath='inset(0 '+(100-shown*100).toFixed(2)+'% 0 0)';
  if(shown===1){setTimeout(mark,0);return;}
  requestAnimationFrame(frame);
}
waitFonts(function(){fontsReady=true;});
requestAnimationFrame(frame);
})();`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  description: site.description,
  url: site.url,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <div id="gl" aria-hidden="true" />
        <div id="curtain" aria-hidden="true"><div className="curtain__panel" /></div>
        <div id="cursor" aria-hidden="true"><span data-cursor-label /></div>
        <div id="loader" role="status" aria-label="Loading" suppressHydrationWarning>
          <div className="loader__moon" aria-hidden="true">
            <span className="loader__moon-disc">
              <span className="loader__moon-wax" data-loader-wax />
            </span>
          </div>
          <div className="loader__inner">
            <span className="loader__name" data-loader-out>for Simmi</span>
            <span className="loader__count" data-loader-out data-loader-count suppressHydrationWarning>0%</span>
          </div>
          <div className="loader__bar" data-loader-bar />
        </div>
        <script dangerouslySetInnerHTML={{ __html: loaderBoot }} />
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Motion />
      </body>
    </html>
  );
}
