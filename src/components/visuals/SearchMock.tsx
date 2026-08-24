import { Search } from 'lucide-react';

/** Search-result card used by the SEO capability. */
export function SearchMock() {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-[0_25px_55px_rgba(21,26,53,.12)]">
      <div className="flex items-center gap-3 rounded-full border border-[#e3e6ee] px-4 py-3 text-xs text-[#7a8199]">
        <Search size={14} /> best wellness studio in Dhaka <span className="ml-auto text-[#8e31b5]">⌕</span>
      </div>
      <div className="mt-6 rounded-2xl border border-[#e3e6ee] p-4">
        <div className="flex items-center gap-2 text-[10px] text-[#7a8199]">
          <div className="h-5 w-5 rounded-full bg-[#d8b0e7]" /> zenithwellness.com
        </div>
        <h4 className="mt-3 font-display text-lg font-bold text-[#8e31b5]">Zenith Wellness | Feel better, live brighter</h4>
        <p className="mt-2 text-xs leading-5 text-[#5c6178]">Find a calmer, stronger version of yourself with expert care...</p>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-[#f1e1f6] px-2 py-1 text-[9px] text-[#8e31b5]">4.9 rating</span>
          <span className="rounded-full bg-[#f1e1f6] px-2 py-1 text-[9px] text-[#8e31b5]">Open today</span>
        </div>
      </div>
      <div className="mt-3 h-2 w-2/3 rounded bg-[#e8eaf2]" />
      <div className="mt-2 h-2 w-1/2 rounded bg-[#e8eaf2]" />
    </div>
  );
}

export default SearchMock;
