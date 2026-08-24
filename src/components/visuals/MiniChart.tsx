/** Campaign-overview card used by the Strategic Marketing capability. */
export function MiniChart() {
  return (
    <div className="relative h-[340px] overflow-hidden rounded-[2rem] bg-[#151a35] p-5 text-white shadow-[0_25px_55px_rgba(21,26,53,.22)]">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#b565d6]/40 blur-3xl" />
      <div className="relative flex items-center justify-between text-xs text-white/60">
        <span>CAMPAIGN OVERVIEW</span>
        <span className="rounded-full bg-white/10 px-2 py-1">Last 60 days</span>
      </div>
      <div className="relative mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-[10px] text-white/60">Net Orders</p>
          <b className="mt-2 block text-lg">22,145</b>
          <span className="text-[10px] text-[#d79dea]">+38.4%</span>
        </div>
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-[10px] text-white/60">Revenue</p>
          <b className="mt-2 block text-lg">$213,291</b>
          <span className="text-[10px] text-[#f6c871]">+24.8%</span>
        </div>
      </div>
      <div className="line-chart relative mt-8 h-32 rounded-2xl p-3">
        <svg viewBox="0 0 400 120" className="h-full w-full overflow-visible">
          <path d="M0 98 C45 88, 65 94, 96 70 S145 84, 171 52 S215 64, 246 38 S290 54, 322 20 S366 30, 400 5" fill="none" stroke="#d79dea" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 98 C45 88, 65 94, 96 70 S145 84, 171 52 S215 64, 246 38 S290 54, 322 20 S366 30, 400 5 V120 H0Z" fill="url(#miniChartFill)" opacity=".18" />
          <defs>
            <linearGradient id="miniChartFill" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#d79dea" />
              <stop offset="1" stopColor="#d79dea" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default MiniChart;
