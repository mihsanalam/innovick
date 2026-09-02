import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CursorFollower } from '@/components/common/CursorFollower';

import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { Founder } from '@/components/sections/Founder';
import { Capabilities } from '@/components/sections/Capabilities';
import { Work } from '@/components/sections/Work';
import { Flow } from '@/components/sections/Flow';
import { Diagnose } from '@/components/sections/Diagnose';
import { Team } from '@/components/sections/Team';
import { VideoReviews } from '@/components/sections/VideoReviews';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

/**
 * The landing page, assembled.
 *
 * Section order is deliberate: two light sections, then a dark one. The dark
 * bands are where the important buttons and claims live, so they land harder.
 * Reorder by moving a line — every section owns its own background and padding.
 *
 * Every animation lives inside the section that owns it, so this file stays a
 * table of contents and nothing more.
 */
export function Home() {
  return (
    <div className="page-shell">
      <CursorFollower />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />      {/* tinted */}
        <Founder />
        <Capabilities />
        <Work />          {/* tinted */}
        <Flow />          {/* white — the floating "momentum" band */}
        <Diagnose />      {/* dark — the switchboard, and the first dark band */}
        <Team />
        <VideoReviews />  {/* tinted */}
        <FAQ />
        <Contact />       {/* dark */}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
