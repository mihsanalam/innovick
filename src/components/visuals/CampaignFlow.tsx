import { ArrowUp, Check, User, Zap } from 'lucide-react';
import { purpleGradient } from '@/lib/theme';

/**
 * The pipeline diagram above the hero headline.
 *
 * The connector and its four stage labels are drawn once and then stay on
 * screen; a brighter segment sweeps along the line each cycle and the panel
 * under each label reveals, holds, clears, and comes back. Desktop only —
 * below `lg` the four columns have nowhere to go, so the hero falls back to
 * the headline alone.
 *
 * The animation itself lives in `sections/Hero.tsx`; the selectors it drives
 * are exported below so the two files can't drift apart.
 */
export const flowBadges = '.flow-n1, .flow-n2, .flow-n3, .flow-n4';
export const flowPanels = '.flow-c1, .flow-i2, .flow-i3, .flow-c4';
export const flowSweeps = '.flow-sweep-a, .flow-sweep-b';

const flowSteps = [
  'AUDIT THE AD ACCOUNT',
  'MAP THE BUYER JOURNEY',
  'SHARPEN THE OFFER',
  'SPLIT BUDGET BY CHANNEL',
  'BRIEF THE CREATIVE TEAM',
  'LAUNCH ON META + GOOGLE',
];

const flowSegments = [
  { name: 'FIRST-TIME VISITOR', meta: 'Browsed 3+ products, no order yet', active: false },
  { name: 'LOYAL REPEAT BUYER', meta: '4 orders in 90 days, high basket', active: true },
  { name: 'LAPSED CUSTOMER', meta: 'Last order 6 months ago, price led', active: false },
];

/** Viewport edge → stage 1, a rounded step down, then on to the right edge. */
const flowCorner = 'M0 1 H8 Q17 1 17 10 V42 Q17 51 26 51 H28';

function FlowNode({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[.06] px-3 py-[6px] font-mono-custom text-[10px] font-bold tracking-[.12em] text-white/80 backdrop-blur-sm ${className}`}>
      <Zap size={11} className="text-[#c27cdf]" fill="currentColor" strokeWidth={0} />
      {label}
    </span>
  );
}

export function CampaignFlow() {
  return (
    <div className="hero-flow pointer-events-none relative hidden h-[330px] w-full select-none lg:block" aria-hidden="true">
      {/* Each run is a muted base track with a brighter sweep layered on top of it. */}
      <span className="absolute left-0 top-[28px] h-px w-[32%] bg-gradient-to-r from-[#c27cdf]/0 via-[#c27cdf]/20 to-[#c27cdf]/30" />
      <span className="flow-sweep-a absolute left-0 top-[28px] h-px w-[32%] bg-gradient-to-r from-[#c27cdf]/0 via-[#c27cdf]/60 to-[#e2b6f2]/90" />
      <svg className="absolute left-[32%] top-[27px]" width="28" height="52" viewBox="0 0 28 52" fill="none">
        <path d={flowCorner} stroke="#c27cdf" strokeOpacity=".3" strokeWidth="1" />
      </svg>
      <svg className="flow-sweep-corner absolute left-[32%] top-[27px]" width="28" height="52" viewBox="0 0 28 52" fill="none">
        <path d={flowCorner} stroke="#e2b6f2" strokeOpacity=".9" strokeWidth="1" />
      </svg>
      <span className="absolute top-[78px] h-px bg-[#c27cdf]/28" style={{ left: 'calc(32% + 27px)', right: 0 }} />
      <span className="flow-sweep-b absolute top-[78px] h-px bg-[#e2b6f2]/85" style={{ left: 'calc(32% + 27px)', right: 0 }} />

      {/* 01 — the brief that starts everything */}
      <div className="absolute left-[17.5%] top-[14px]">
        <FlowNode label="CLIENT BRIEF" className="flow-n1" />
        <div className="flow-c1 mt-[16px] w-[252px] rounded-2xl border border-white/10 bg-white/[.05] p-4 backdrop-blur-md">
          <p className="text-[13px] leading-[1.45] text-white/70">
            Our Meta ads are burning budget and repeat orders have stalled. Find the leaks and fix them.
          </p>
          <span className="mt-3 ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-white" style={{ background: purpleGradient }}>
            <ArrowUp size={14} strokeWidth={2.5} />
          </span>
        </div>
      </div>

      {/* 02 — how we work the brief */}
      <div className="absolute left-[34.5%] top-[64px]">
        <FlowNode label="STRATEGY SPRINT" className="flow-n2" />
        <div className="mt-[20px] space-y-[6px]">
          {flowSteps.map(step => (
            <span key={step} className="flow-i2 flex w-fit items-center gap-2 rounded-md border border-white/8 bg-white/[.04] px-2.5 py-[5px] font-mono-custom text-[10px] font-bold tracking-[.05em] text-white/60">
              <Check size={11} className="shrink-0 text-[#c27cdf]" strokeWidth={3} />
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* 03 — who each message is actually for */}
      <div className="absolute left-[51%] top-[64px]">
        <FlowNode label="AUDIENCE SPLIT" className="flow-n3" />
        <div className="mt-[20px] w-[215px] space-y-[14px]">
          {flowSegments.map(segment => (
            <div key={segment.name} className="flow-i3">
              <div className={`flex gap-2 ${segment.active ? '' : 'opacity-40'}`}>
                <User size={12} className={`mt-[3px] shrink-0 ${segment.active ? 'text-[#c27cdf]' : 'text-white/40'}`} />
                <p className="font-mono-custom text-[10px] font-bold leading-[1.5] tracking-[.05em] text-white/70">
                  {segment.name}
                  <span className="block font-normal normal-case tracking-normal text-white/40">{segment.meta}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 04 — the creative that ships */}
      <div className="absolute left-[67.5%] top-[64px]">
        <FlowNode label="CAMPAIGN LIVE" className="flow-n4" />
        <div
          className="flow-c4 relative mt-[20px] h-[210px] w-[244px] overflow-hidden rounded-2xl p-5 shadow-[0_26px_50px_rgba(0,0,0,.45)]"
          style={{ background: 'linear-gradient(160deg,#151a35 0%,#5b1f7d 46%,#8e31b5 100%)' }}
        >
          <span className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#d79dea]/25 blur-2xl" />
          <span className="absolute -left-10 bottom-14 h-32 w-32 rounded-full bg-[#f6c871]/15 blur-2xl" />
          <span className="relative font-mono-custom text-[9px] font-bold tracking-[.16em] text-white/60">AD · META FEED</span>
          <div className="absolute inset-x-5 bottom-5">
            <p className="font-display text-[21px] font-extrabold leading-[1.08] tracking-[-.04em] text-white">
              Winter Drop,<br />40% Off
            </p>
            <p className="mt-2 text-[11px] leading-[1.4] text-white/70">Free delivery across Dhaka. Offer ends Sunday night.</p>
            <span className="mt-3 inline-flex rounded-lg bg-white/15 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">Shop now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignFlow;
