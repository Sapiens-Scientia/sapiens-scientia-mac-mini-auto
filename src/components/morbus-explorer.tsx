"use client";

import { useState } from "react";
import { morbusDiseases } from "@/lib/morbus";

export function MorbusExplorer() {
  const [selectedId, setSelectedId] = useState("ibd");
  const [selectedAxisIndex, setSelectedAxisIndex] = useState<number | null>(null);

  const activeDisease = morbusDiseases.find((d) => d.id === selectedId) || morbusDiseases[0];

  return (
    <div className="flex flex-col gap-8 border border-white/10 bg-white/[0.015] p-6 sm:p-8">
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-5">
        {morbusDiseases.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              setSelectedId(d.id);
              setSelectedAxisIndex(null);
            }}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
              selectedId === d.id
                ? "border-b-2 border-emerald-300 text-emerald-100 bg-white/[0.04]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              {activeDisease.group}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-100">{activeDisease.name}</h3>
          <p className="text-base leading-7 text-slate-300">{activeDisease.description}</p>
        </div>

        <div className="rounded border border-white/10 bg-white/[0.025] p-5 flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Ontology Crosswalks</h4>
          <div className="grid gap-2">
            {activeDisease.crosswalks.map((cw) => (
              <div key={cw.name} className="flex justify-between gap-4 text-sm">
                <span className="font-semibold text-emerald-200">{cw.name}</span>
                <span className="text-slate-300 text-right">{cw.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-300/90">
          Decomposition Along Morbus Axes (Click to inspect)
        </h4>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeDisease.axes.map((axis, index) => {
            const isSelected = selectedAxisIndex === index;
            return (
              <button
                key={axis.axis}
                onClick={() => setSelectedAxisIndex(isSelected ? null : index)}
                className={`text-left p-4 border transition-all cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? "border-emerald-300 bg-emerald-300/[0.06] shadow-[0_0_18px_rgba(52,211,153,0.15)]"
                    : "border-white/10 bg-white/[0.02] hover:border-emerald-200/30 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
                    {axis.axis}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {isSelected ? "▲ CLOSE" : "▼ INSPECT"}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-200">{axis.value}</p>
                {isSelected && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-300 border-t border-emerald-300/20 pt-2">
                    {axis.explanation}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
