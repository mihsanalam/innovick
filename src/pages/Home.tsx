import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { Founder } from '@/components/sections/Founder';
import { Capabilities } from '@/components/sections/Capabilities';
import { Work } from '@/components/sections/Work';
import { Diagnose } from '@/components/sections/Diagnose';
import { Team } from '@/components/sections/Team';
import { VideoReviews } from '@/components/sections/VideoReviews';
import { WhyUs } from '@/components/sections/WhyUs';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

/**
 * The landing page, assembled.
 *
 * Section order is deliberate: two light sections, then a dark one. The dark
 * bands are where the important buttons and claims live, so they land harder.
 * Reorder by moving a line — every section owns its own background and padding.
 *
 * Each section keeps its own animations. What lives here is only the handful of
 * hover effects that need to reach across component boundaries.
 */
export function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Card hover lift — used by the service cards.
    gsap.utils.toArray<HTMLElement>('.card-lift').forEach(card => {
      card.addEventListener('mouseenter', () => gsap.to(card, { y: -7, boxShadow: '0 24px 60px rgba(21,26,53,.16)', duration: 0.35, ease: 'power2.out' }));
      card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, boxShadow: '0 18px 50px rgba(21,26,53,.10)', duration: 0.35, ease: 'power2.out' }));
    });

    // Push the browser mock in on hover, inside the stacked project cards.
    gsap.utils.toArray<HTMLElement>('.stack-inner .portfolio-visual').forEach(visual => {
      const browser = visual.querySelector<HTMLElement>('.browser-window');
      if (!browser) return;
      visual.addEventListener('mouseenter', () => gsap.to(browser, { scale: 1.05, duration: 0.5, ease: 'power2.out' }));
      visual.addEventListener('mouseleave', () => gsap.to(browser, { scale: 1, duration: 0.5, ease: 'power2.out' }));
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="page-shell">
      <Navbar />
      <main>
        <Hero />          {/* dark */}
        <Stats />
        <Services />
        <Founder />       {/* dark */}
        <Capabilities />
        <Work />
        <Diagnose />      {/* dark — the switchboard */}
        <Team />
        <VideoReviews />
        <WhyUs />         {/* dark */}
        <FAQ />
        <Contact />       {/* dark */}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
