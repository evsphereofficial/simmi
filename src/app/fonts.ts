import { Bodoni_Moda, Caveat, Schibsted_Grotesk } from 'next/font/google';

// Display: high-contrast fashion serif — the gothic romantic voice.
export const display = Bodoni_Moda({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

// Text: warm newspaper grotesk for reading and UI.
export const text = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});

// Accent: handwriting, only for annotations that carry real information.
export const hand = Caveat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-hand',
  display: 'swap',
});
