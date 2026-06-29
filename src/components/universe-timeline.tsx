"use client";

import Link from "next/link";

const milestones = [
  { label: "Big Bang", age: "13.8 Gyr", color: "#f59e0b" },
  { label: "First Stars", age: "13.4 Gyr", color: "#fbbf24" },
  { label: "Earth Forms", age: "4.54 Gyr", color: "#22d3ee" },
  { label: "First Life", age: "3.7 Gyr", color: "#34d399" },
  { label: "Animals", age: "540 Myr", color: "#a78bfa" },
  { label: "Homo Sapiens", age: "300k yr", color: "#38bdf8" },
  { label: "Agriculture", age: "12k yr", color: "#818cf8" },
  { label: "Knowledge Age", age: "now", color: "#ec4899" },
];

export function UniverseTimeline() {
  return (
    <aside
      aria-label="Universe timeline"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] px-3 pb-3 sm:px-5 sm:pb-4"
    >
      <div className="pointer-events-auto mx-auto max-w-7xl border border-white/10 bg-black/58 p-2.5 text-white shadow-[0_-18px_60px_rgba(0,0,0,0.46)] backdrop-blur-xl sm:p-3">
        <div className="mb-2 flex items-center justify-between gap-3 px-1">
          <Link
            href="/chronos"
            className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sky-200 transition-colors hover:text-sky-50 sm:text-xs"
          >
            Universe Timeline
          </Link>
          <span className="hidden text-[0.62rem] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
            Big Bang to present
          </span>
        </div>

        <div className="scrollbar-hidden overflow-x-auto">
          <div className="min-w-[48rem]">
            <div className="grid grid-cols-8 overflow-hidden border border-white/10 bg-white/[0.025]">
              {milestones.map((milestone) => (
                <Link
                  key={milestone.label}
                  href="/chronos"
                  className="group min-h-12 border-r border-black/35 px-2.5 py-2 last:border-r-0"
                  style={{
                    background: `linear-gradient(135deg, ${milestone.color}e6, ${milestone.color}82)`,
                  }}
                >
                  <span className="block truncate text-[0.63rem] font-bold uppercase tracking-[0.12em] text-black/85 group-hover:text-black sm:text-[0.68rem]">
                    {milestone.label}
                  </span>
                  <span className="mt-1 block text-[0.62rem] font-medium text-black/62">
                    {milestone.age}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-8 border-t border-white/15 text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[0.62rem]">
              <span className="pt-1 text-left">Cosmos</span>
              <span className="pt-1 text-center">Stars</span>
              <span className="pt-1 text-center">Earth</span>
              <span className="pt-1 text-center">Life</span>
              <span className="pt-1 text-center">Mind</span>
              <span className="pt-1 text-center">Species</span>
              <span className="pt-1 text-center">Civilization</span>
              <span className="pt-1 text-right">Present</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
