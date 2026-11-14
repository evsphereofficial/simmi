import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Vault } from '@/components/Vault';

export const metadata: Metadata = {
  title: 'sealed letters',
  description:
    'Five letters sealed in wax for Simmi, for the sad nights, the missing nights, the angry ones, the nights she doubts she is loved, and the night she is ready to talk.',
};

export default function VaultPage() {
  return (
    <article className="page">
      <header className="vault" data-sky="night">
        <div className="vault__inner">
          <p className="kicker" data-reveal="fade" data-intro>five envelopes, waxed shut</p>
          <h1 data-split="chars" data-intro>Sealed letters</h1>
          <p className="vault__intro" data-reveal="up" data-intro>
            Each one waits for a specific night. Take whichever one matches yours: they remember
            what you have opened, on your device only, and nobody else can see it.
          </p>
          <Vault />
        </div>
      </header>
      <Footer />
    </article>
  );
}
