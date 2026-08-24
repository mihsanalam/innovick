/**
 * Phone frame used by two capabilities. `website` swaps the commerce screen for
 * a landing-page screen so one component covers both.
 */
export function PhoneMock({ website = false }: { website?: boolean }) {
  return (
    <div className="phone mx-auto w-[210px] rounded-[2.2rem] border-[7px] border-[#1b2140] bg-[#1b2140] p-1">
      <div className="phone-screen min-h-[340px] overflow-hidden rounded-[1.7rem] p-3">
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#d5d8e4]" />
        <div className="flex items-center justify-between">
          <div className="h-7 w-7 rounded-xl bg-[#8e31b5]" />
          <div className="flex gap-1">
            <i className="h-2 w-2 rounded-full bg-[#d5d8e4]" />
            <i className="h-2 w-2 rounded-full bg-[#d5d8e4]" />
          </div>
        </div>
        {website ? (
          <>
            <div className="mt-7 rounded-2xl bg-[#ece0f5] p-4">
              <div className="h-2 w-16 rounded-full bg-[#8e31b5]" />
              <div className="mt-3 h-2 w-full rounded-full bg-white/90" />
              <div className="mt-2 h-2 w-4/5 rounded-full bg-white/90" />
              <button className="mt-5 rounded-full bg-[#8e31b5] px-3 py-1 text-[8px] font-bold text-white">Start today</button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="h-16 rounded-xl bg-white shadow-sm" />
              <div className="h-16 rounded-xl bg-[#f7dfbc] shadow-sm" />
            </div>
          </>
        ) : (
          <>
            <div className="mt-7 h-32 rounded-2xl bg-gradient-to-br from-[#a950c8] to-[#e4a8ec] p-3">
              <span className="text-[9px] font-bold text-white">NEW ARRIVAL</span>
              <div className="mt-12 h-2 w-14 rounded bg-white/60" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="h-2 w-20 rounded bg-[#c6c9d6]" />
                <div className="mt-2 h-2 w-12 rounded bg-[#e3e6ee]" />
              </div>
              <b className="text-sm text-[#8e31b5]">$42.00</b>
            </div>
            <button className="mt-6 w-full rounded-xl bg-[#151a35] py-3 text-[10px] font-bold text-white">Shop now</button>
          </>
        )}
      </div>
    </div>
  );
}

export default PhoneMock;
