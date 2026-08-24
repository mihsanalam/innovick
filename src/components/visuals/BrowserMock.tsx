import type { LucideIcon } from 'lucide-react';

/** Browser window inside each project card. */
export function BrowserMock({ project, bg, icon: Icon }: { project: string; bg: string; icon: LucideIcon }) {
  return (
    <div className={`portfolio-visual relative h-60 overflow-hidden rounded-[1.35rem] bg-gradient-to-br ${bg} p-4`}>
      <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border-[24px] border-white/15" />
      <div className="browser-window relative mx-auto max-w-[340px] overflow-hidden rounded-xl bg-white shadow-[0_18px_35px_rgba(10,13,31,.28)]">
        <div className="flex items-center gap-1.5 border-b border-[#eceef5] bg-[#f8f9fc] px-3 py-2">
          <i className="h-1.5 w-1.5 rounded-full bg-[#e48c96]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#e9c77b]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#93c894]" />
          <span className="ml-3 h-2 w-24 rounded-full bg-[#e6e8f0]" />
        </div>
        <div className="grid grid-cols-[52px_1fr] gap-3 p-3">
          <div className="space-y-2 rounded-lg bg-[#1b2140] p-2">
            <span className="block h-2 w-7 rounded bg-[#c98bdd]" />
            <span className="block h-1.5 w-6 rounded bg-white/30" />
            <span className="block h-1.5 w-6 rounded bg-white/30" />
            <span className="block h-1.5 w-6 rounded bg-white/30" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="h-2.5 w-24 rounded bg-[#151a35]" />
              <Icon size={17} className="text-[#8e31b5]" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[1, 2, 3].map(n => (
                <span key={n} className="h-10 rounded-lg bg-[#f0e6f6]" />
              ))}
            </div>
            <div className="mt-3 flex items-end gap-1.5">
              {[22, 34, 27, 44, 39, 54, 47, 68].map((height, n) => (
                <i key={n} className="flex-1 rounded-t bg-[#b565d6]" style={{ height }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="absolute bottom-4 left-5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {project} · Active
      </span>
    </div>
  );
}

export default BrowserMock;
