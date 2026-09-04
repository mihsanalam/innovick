import { useRef, useState } from 'react';
import { Link } from 'wouter';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Check } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Reveal } from '@/components/common/Reveal';
import { MiniChart } from '@/components/visuals/MiniChart';
import { PhoneMock } from '@/components/visuals/PhoneMock';
import { SearchMock } from '@/components/visuals/SearchMock';
import { capabilities, type CapabilityVisual } from '@/data/services';
import { serifAccent } from '@/lib/theme';

/**
 * Capability → its own service page under /services. Titles map 1:1 onto the
 * six services' slugs; anything unmapped falls back to the /services index.
 */
const capabilitySlug: Record<string, string> = {
  'Strategic Marketing': 'strategic-marketing',
  'Eye-Catching Design': 'creative-design',
  'Web Development': 'web-development',
  'Robust SEO': 'seo',
};

/** Keeps the data file JSX-free — the mock is chosen here instead. */
function Visual({ kind }: { kind: CapabilityVisual }) {
  switch (kind) {
    case 'chart': return <MiniChart />;
    case 'phone': return <PhoneMock />;
    case 'website': return <PhoneMock website />;
    case 'search': return <SearchMock />;
  }
}

/**
 * Left column is sticky, so it never moves — a ScrollTrigger per visual just
 * swaps which entry is open while the right column scrolls past underneath it.
 *
 * NOTE: any `overflow: hidden` on an ancestor would silently break the sticky
 * rail. `.page-shell` uses `overflow-x: clip` for exactly that reason.
 */
export function Capabilities() {
  const stickyRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.cap-panel').forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 62%',
        end: 'bottom 62%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });
  }, { scope: stickyRef });

  return (
    <section ref={stickyRef} id="capabilities" className="bg-white py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <span className="font-mono-custom text-[10px] font-bold tracking-[.18em] text-[#8e31b5]">WHAT WE RUN FOR YOU</span>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-semibold leading-[1.02] tracking-[-.07em] text-[#151a35]">
            Four disciplines,<br />
            <span className="font-normal italic tracking-[-.02em]" style={{ fontFamily: serifAccent }}>one operating system.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
          {/* The rail — pinned in place, only the open entry changes */}
          <div className="hidden lg:block">
            <div className="sticky top-29">
              {capabilities.map((item, i) => {
                const open = active === i;
                return (
                  <div key={item.title} className={`border-l-2 pl-6 transition-colors duration-500 ${open ? 'border-[#151a35]' : 'border-[#e8eaf2]'}`}>
                    <button
                      onClick={() => document.getElementById(`cap-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                      className="block w-full py-4 text-left"
                      data-testid={`button-capability-${i}`}
                    >
                      <span className={`font-display text-2xl font-semibold tracking-tighter transition-colors duration-500 ${open ? 'text-[#151a35]' : 'text-[#b3b7c6]'}`}>
                        {item.title}
                      </span>
                    </button>
                    {/* 0fr â†’ 1fr gives a height-auto transition without measuring anything in JS. */}
                    <div className={`grid transition-all duration-500 ease-out ${open ? 'grid-rows-[1fr] pb-7 opacity-100' : 'grid-rows-[0fr] pb-0 opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="max-w-sm text-sm leading-7 text-[#5c6178]">{item.blurb}</p>
                        <ul className="mt-4 space-y-2.5">
                          {item.bullets.map(bullet => (
                            <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#3a4055]">
                              <Check size={15} className="mt-1 shrink-0 text-[#8e31b5]" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={capabilitySlug[item.title] ? `/services/${capabilitySlug[item.title]}` : '/services'}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#151a35] transition hover:gap-3"
                          data-testid={`link-capability-${i}`}
                        >
                          Explore this service <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The visuals — these are what scrolls */}
          <div>
            {capabilities.map((item, i) => (
              <div key={item.title} id={`cap-${i}`} className="cap-panel pb-10 lg:pb-24">
                <div className="mb-6 lg:hidden">
                  <span className="font-mono-custom text-xs font-bold text-[#8e31b5]">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tighter text-[#151a35]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#5c6178]">{item.blurb}</p>
                </div>
                <div className="flex min-h-95 items-center justify-center rounded-4xl border border-[#eceef5] bg-[#f5f6fa] p-6 md:min-h-110 md:p-12">
                  <div className="w-full"><Visual kind={item.visual} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Capabilities;
