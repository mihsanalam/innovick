import { Check, Sparkles } from 'lucide-react';
import { SlotNumber } from '@/components/visuals/RoiCalculator';

/**
 * C1 · Live form preview.
 *
 * Sits beside the contact form (sticky on desktop) and mirrors the form state
 * in real time: name, contact details, picked services, budget tier — plus a
 * completeness meter and a mini bar chart that grow as fields fill in. Filling
 * the form becomes a game with visible progress instead of a chore.
 *
 * Pure presentation: it receives the form state as props and never owns it.
 */
export interface PreviewForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  audience: string;
  budget: string;
  about: string;
  notes: string;
}

/** Heights (as % of the track) each mini bar can reach when complete. */
const BAR_HEIGHTS = [42, 68, 52, 84, 62, 95];

export function FormPreviewCard({ form, services }: { form: PreviewForm; services: string[] }) {
  const name = `${form.firstName} ${form.lastName}`.trim();
  const fields = [form.firstName, form.lastName, form.email, form.phone, form.audience, form.budget, form.about, form.notes];
  const filled = fields.filter(v => v.trim().length > 0).length + (services.length > 0 ? 1 : 0);
  const pct = Math.round((filled / (fields.length + 1)) * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e6e8f0] bg-white p-6 soft-shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-mono-custom text-[10px] font-bold uppercase tracking-[.16em] text-[#8e31b5]">
          <Sparkles size={13} /> Live preview
        </span>
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8e31b5] opacity-40" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#8e31b5]" />
        </span>
      </div>

      {/* What we'll receive */}
      <p className="mt-5 font-display text-xl font-semibold tracking-[-.02em] text-[#151a35]">
        {name || <span className="text-[#c3c8d8]">Your name</span>}
      </p>

      <dl className="mt-3 space-y-1.5 text-sm">
        {(
          [
            ['Email', form.email],
            ['Phone', form.phone],
            ['Budget', form.budget],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-3">
            <dt className="font-mono-custom text-[9px] font-bold uppercase tracking-[.14em] text-[#7a8199]">{label}</dt>
            <dd className={`truncate text-right ${value ? 'font-medium text-[#151a35]' : 'text-[#c3c8d8]'}`}>
              {value || '—'}
            </dd>
          </div>
        ))}
      </dl>

      {/* Services picked so far */}
      <div className="mt-4 border-t border-[#eceef5] pt-4">
        <span className="font-mono-custom text-[9px] font-bold uppercase tracking-[.14em] text-[#7a8199]">
          Services
        </span>
        {services.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {services.map(s => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-full bg-[#8e31b5]/10 px-2.5 py-1 text-[11px] font-semibold text-[#8e31b5]"
              >
                <Check size={11} strokeWidth={3} /> {s}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-1.5 text-sm text-[#c3c8d8]">Pick your services →</p>
        )}
      </div>

      {/* Completeness meter + mini chart */}
      <div className="mt-4 border-t border-[#eceef5] pt-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono-custom text-[9px] font-bold uppercase tracking-[.14em] text-[#7a8199]">
            Request strength
          </span>
          <span className="font-display text-sm font-semibold text-[#151a35]">
            <SlotNumber value={pct} className="tabular-nums" />%
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eceef5]">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%`, background: 'linear-gradient(115deg, #8E31B5 0%, #B565D6 100%)' }}
          />
        </div>

        <div className="mt-3 flex h-10 items-end gap-1.5" aria-hidden="true">
          {BAR_HEIGHTS.map((h, i) => (
            <i
              key={i}
              className="flex-1 rounded-t bg-[#b565d6] transition-[height] duration-500 ease-out"
              style={{ height: `${Math.max(6, (pct / 100) * h)}%`, opacity: 0.3 + (i / BAR_HEIGHTS.length) * 0.7 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormPreviewCard;
