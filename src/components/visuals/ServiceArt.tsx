import type { LucideIcon } from 'lucide-react';

/**
 * The right-hand visual in each service card.
 *
 * The reference design used bespoke 3D product renders. We don't have those, so
 * this builds an on-brand "kit" of floating tiles with the service icon as the
 * hero — same compositional weight, no assets required.
 *
 * Got real art? Add `image: '/services/seo.png'` to an entry in
 * `src/data/services.ts` and the card renders that instead of this.
 */
export function ServiceArt({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div aria-hidden="true" className="relative aspect-[5/4] w-full select-none">
      {/* Contact shadow — makes the cluster feel like it's sitting on something. */}
      <div className="absolute inset-x-10 bottom-1 h-9 rounded-[50%] bg-[#151a35]/15 blur-2xl" />

      {/*  [H H A]
           [H H B]
           [C C D]  */}
      <div className="relative grid h-full grid-cols-3 grid-rows-3 gap-2.5">
        <div className="col-span-2 row-span-2 grid place-items-center rounded-[1.6rem] bg-gradient-to-br from-[#8e31b5] to-[#b565d6] text-white shadow-[0_22px_44px_-18px_rgba(142,49,181,.65)]">
          <Icon size={52} strokeWidth={1.4} />
        </div>

        <div className="flex flex-col justify-center gap-2 rounded-[1.15rem] bg-white px-3.5 shadow-[0_16px_30px_-18px_rgba(21,26,53,.45)]">
          <span className="h-2 w-3/4 rounded-full bg-[#151a35]" />
          <span className="h-1.5 w-1/2 rounded-full bg-[#c9cdda]" />
        </div>

        <div className="rounded-[1.15rem] bg-[#f0dff6] shadow-[0_14px_26px_-16px_rgba(21,26,53,.35)]" />

        <div className="col-span-2 flex items-center gap-2 rounded-[1.15rem] bg-white px-4 shadow-[0_16px_30px_-18px_rgba(21,26,53,.45)]">
          {[1, 0.72, 0.44].map((opacity, i) => (
            <span key={i} className="h-7 flex-1 rounded-lg bg-[#8e31b5]" style={{ opacity: opacity * 0.35 }} />
          ))}
        </div>

        <div className="rounded-[1.15rem] bg-gradient-to-br from-[#151a35] to-[#2a3157] shadow-[0_16px_30px_-18px_rgba(21,26,53,.5)]" />
      </div>
    </div>
  );
}

export default ServiceArt;
