"use client";

import { useId, useMemo, useState } from "react";
import {
  earthVitalSigns,
  vitalSignDomains,
  vitalSignTrend,
  type EarthVitalSign,
  type VitalSignDomainId,
} from "@/lib/vital-signs";

// The /vitals dashboard surface: a filterable, sortable grid of planetary
// indicators, each drawn as a hover-readable sparkline with its historical
// series and dashed projection to 2050. Pure React state + inline SVG — no
// render loop, no chart library — to match the hand-built visuals used across
// the site. Colours come from each sign's accent; chrome uses currentColor so
// the charts adapt to the light/dark theme automatically.

type DomainFilter = VitalSignDomainId | "all";
type SortMode = "default" | "name" | "change";

const sortModes: { id: SortMode; label: string }[] = [
  { id: "default", label: "By domain" },
  { id: "change", label: "Most changed" },
  { id: "name", label: "A–Z" },
];

const domainName = new Map(vitalSignDomains.map((domain) => [domain.id, domain.name]));

function withAlpha(hex: string, alpha: string) {
  return `${hex}${alpha}`;
}

export function VitalSignsDashboard() {
  const [domain, setDomain] = useState<DomainFilter>("all");
  const [sort, setSort] = useState<SortMode>("default");

  const visibleSigns = useMemo(() => {
    const filtered =
      domain === "all"
        ? earthVitalSigns
        : earthVitalSigns.filter((sign) => sign.domain === domain);

    if (sort === "name") {
      return [...filtered].sort((a, b) => a.label.localeCompare(b.label));
    }

    if (sort === "change") {
      return [...filtered].sort(
        (a, b) =>
          (vitalSignTrend(b)?.changeMagnitude ?? 0) -
          (vitalSignTrend(a)?.changeMagnitude ?? 0),
      );
    }

    return filtered;
  }, [domain, sort]);

  // When showing everything in default order, lay the cards out under their
  // domain headings; otherwise render one flat, ranked grid.
  const grouped = domain === "all" && sort === "default";

  return (
    <div className="flex flex-col gap-7">
      <Toolbar
        domain={domain}
        sort={sort}
        onDomainChange={setDomain}
        onSortChange={setSort}
        count={visibleSigns.length}
      />

      {grouped ? (
        <div className="flex flex-col gap-12">
          {vitalSignDomains.map((group) => {
            const signs = earthVitalSigns.filter((sign) => sign.domain === group.id);
            if (signs.length === 0) return null;

            return (
              <section key={group.id} className="flex flex-col gap-5">
                <div
                  className="flex flex-col gap-1 border-l-2 pl-4"
                  style={{ borderColor: group.accent }}
                >
                  <h2
                    className="text-xl font-semibold tracking-normal sm:text-2xl"
                    style={{ color: group.accent }}
                  >
                    {group.name}
                  </h2>
                  <p className="max-w-2xl text-sm leading-6 text-slate-400">{group.blurb}</p>
                </div>
                <CardGrid signs={signs} />
              </section>
            );
          })}
        </div>
      ) : (
        <CardGrid signs={visibleSigns} />
      )}
    </div>
  );
}

function Toolbar({
  domain,
  sort,
  onDomainChange,
  onSortChange,
  count,
}: {
  domain: DomainFilter;
  sort: SortMode;
  onDomainChange: (next: DomainFilter) => void;
  onSortChange: (next: SortMode) => void;
  count: number;
}) {
  const chips: { id: DomainFilter; label: string; accent?: string }[] = [
    { id: "all", label: "All signs" },
    ...vitalSignDomains.map((group) => ({
      id: group.id as DomainFilter,
      label: group.name,
      accent: group.accent,
    })),
  ];

  return (
    <div className="flex flex-col gap-4 border-y border-white/10 py-5">
      <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter by domain">
        {chips.map((chip) => {
          const active = domain === chip.id;
          const accent = chip.accent ?? "#94a3b8";

          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onDomainChange(chip.id)}
              aria-pressed={active}
              className="cursor-pointer border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors"
              style={{
                borderColor: active ? accent : "rgba(255,255,255,0.12)",
                backgroundColor: active ? withAlpha(accent, "1f") : "transparent",
                color: active ? accent : undefined,
              }}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-slate-500">
          {count} {count === 1 ? "indicator" : "indicators"} shown
        </p>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono uppercase tracking-[0.12em] text-slate-500">Sort</span>
          <div className="flex flex-wrap gap-1.5">
            {sortModes.map((mode) => {
              const active = sort === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onSortChange(mode.id)}
                  aria-pressed={active}
                  className={`cursor-pointer border px-2.5 py-1 font-medium transition-colors ${
                    active
                      ? "border-white/25 bg-white/[0.08] text-white"
                      : "border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardGrid({ signs }: { signs: EarthVitalSign[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {signs.map((sign) => (
        <VitalSignCard key={sign.label} sign={sign} />
      ))}
    </div>
  );
}

function VitalSignCard({ sign }: { sign: EarthVitalSign }) {
  const trend = vitalSignTrend(sign);
  const unit = sign.historicalData?.unit ?? "";

  // Render a value with its unit attached, handling currency ($T → "$118T")
  // and dropping long descriptive units ("% used") that would crowd the caption.
  const withUnit = (value: number) => {
    if (!unit) return `${value}`;
    if (unit.startsWith("$")) return `$${value}${unit.slice(1)}`;
    if (unit.length <= 4) return `${value}${unit}`;
    return `${value}`;
  };

  return (
    <article
      className="flex flex-col gap-4 border border-white/10 bg-white/[0.025] p-5 shadow-[0_0_28px_rgba(15,23,42,0.22)] transition-colors hover:bg-white/[0.04]"
      style={{ color: undefined }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-100">{sign.label}</h3>
          <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-slate-500">
            {domainName.get(sign.domain)}
          </p>
        </div>
        {trend ? <TrendBadge direction={trend.direction} /> : null}
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-semibold tracking-tight" style={{ color: sign.accent }}>
          {sign.value}
        </p>
      </div>

      <Sparkline sign={sign} />

      {trend ? (
        <p className="font-mono text-[0.7rem] text-slate-500">
          {withUnit(trend.first.value)} ({trend.first.year}) →{" "}
          <span className="text-slate-300">
            {withUnit(trend.last.value)} ({trend.last.year})
          </span>
          {trend.projectedTo ? (
            <>
              {" · "}
              <span style={{ color: withAlpha(sign.accent, "cc") }}>
                ~{withUnit(trend.projectedTo.value)} by {trend.projectedTo.year}
              </span>
            </>
          ) : null}
        </p>
      ) : null}

      <p className="text-xs leading-6 text-slate-400">{sign.note}</p>

      {sign.earthSystemLinks && sign.earthSystemLinks.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {sign.earthSystemLinks.slice(0, 4).map((label) => (
            <span
              key={label}
              className="border px-2 py-0.5 text-[0.7rem] leading-5 text-slate-300"
              style={{
                borderColor: withAlpha(sign.accent, "33"),
                backgroundColor: withAlpha(sign.accent, "0d"),
              }}
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-3">
        <a
          href={sign.sourceHref}
          target="_blank"
          rel="noreferrer"
          className="text-[0.7rem] font-medium text-slate-400 transition-colors hover:text-white"
        >
          {sign.source} <span aria-hidden>↗</span>
        </a>
        <span className="font-mono text-[0.7rem] text-slate-600">{sign.updated}</span>
      </div>
    </article>
  );
}

function TrendBadge({ direction }: { direction: "rising" | "falling" | "flat" }) {
  const config = {
    rising: { glyph: "▲", label: "Rising", color: "#fb7185" },
    falling: { glyph: "▼", label: "Falling", color: "#38bdf8" },
    flat: { glyph: "→", label: "Stable", color: "#94a3b8" },
  }[direction];

  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 border px-2 py-0.5 text-[0.7rem] font-medium"
      style={{
        borderColor: withAlpha(config.color, "40"),
        backgroundColor: withAlpha(config.color, "14"),
        color: config.color,
      }}
      title={`${config.label} over the historical record`}
    >
      <span aria-hidden>{config.glyph}</span>
      {config.label}
    </span>
  );
}

const CHART = {
  width: 320,
  height: 132,
  padTop: 14,
  padRight: 12,
  padBottom: 22,
  padLeft: 38,
};

function Sparkline({ sign }: { sign: EarthVitalSign }) {
  const gradientId = useId();
  const data = sign.historicalData;
  const [hovered, setHovered] = useState<{ year: number; value: number } | null>(null);

  const geometry = useMemo(() => {
    if (!data) return null;

    const points = data.points;
    const projection = data.projection ?? [];
    const allPoints = [...points, ...projection];
    if (allPoints.length === 0) return null;

    const years = allPoints.map((point) => point.year);
    const values = allPoints.map((point) => point.value);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;
    const yMin = minValue - valueRange * 0.12;
    const yMax = maxValue + valueRange * 0.12;
    const yearRange = maxYear - minYear || 1;

    const plotW = CHART.width - CHART.padLeft - CHART.padRight;
    const plotH = CHART.height - CHART.padTop - CHART.padBottom;
    const getX = (year: number) => CHART.padLeft + ((year - minYear) / yearRange) * plotW;
    const getY = (value: number) =>
      CHART.height - CHART.padBottom - ((value - yMin) / (yMax - yMin)) * plotH;

    const histCoords = points.map((point) => [getX(point.year), getY(point.value)] as const);
    const histPath = `M ${histCoords.map(([x, y]) => `${x},${y}`).join(" L ")}`;
    const baselineY = CHART.height - CHART.padBottom;
    const areaPath =
      histCoords.length > 0
        ? `${histPath} L ${histCoords[histCoords.length - 1][0]},${baselineY} L ${histCoords[0][0]},${baselineY} Z`
        : "";

    let projPath = "";
    if (projection.length > 0 && points.length > 0) {
      const seam = [points[points.length - 1], ...projection];
      projPath = `M ${seam.map((point) => `${getX(point.year)},${getY(point.value)}`).join(" L ")}`;
    }

    return {
      allPoints,
      points,
      projection,
      minYear,
      maxYear,
      minValue,
      maxValue,
      getX,
      getY,
      histPath,
      areaPath,
      projPath,
      lastHistCoord: histCoords[histCoords.length - 1],
    };
  }, [data]);

  if (!data || !geometry) return null;

  const { allPoints, minYear, maxYear, minValue, maxValue, getX, getY } = geometry;
  const unit = data.unit;

  const onMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * CHART.width;
    let closest = allPoints[0];
    let best = Infinity;
    for (const point of allPoints) {
      const distance = Math.abs(getX(point.year) - x);
      if (distance < best) {
        best = distance;
        closest = point;
      }
    }
    setHovered(closest);
  };

  const format = (value: number) => (Number.isInteger(value) ? `${value}` : value.toFixed(1));

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-[0.62rem] font-mono text-slate-500">
        <span>Trend &amp; projection</span>
        <span className="text-slate-300">
          {hovered ? `${hovered.year}: ${format(hovered.value)}${unit}` : "Hover to read"}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="vital-sparkline w-full cursor-crosshair select-none overflow-visible"
        role="img"
        aria-label={`${sign.label}: ${format(minValue)}${unit} to ${format(maxValue)}${unit} between ${minYear} and ${maxYear}, with a dashed projection.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sign.accent} stopOpacity={0.32} />
            <stop offset="100%" stopColor={sign.accent} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Axis + min/max gridlines, drawn in the card's text colour so they
            survive a theme switch. */}
        <line
          x1={CHART.padLeft}
          y1={getY(minValue)}
          x2={CHART.width - CHART.padRight}
          y2={getY(minValue)}
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth={1}
          strokeDasharray="2 3"
        />
        <line
          x1={CHART.padLeft}
          y1={getY(maxValue)}
          x2={CHART.width - CHART.padRight}
          y2={getY(maxValue)}
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth={1}
          strokeDasharray="2 3"
        />
        <line
          x1={CHART.padLeft}
          y1={CHART.height - CHART.padBottom}
          x2={CHART.width - CHART.padRight}
          y2={CHART.height - CHART.padBottom}
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={1}
        />

        <text x={CHART.padLeft - 6} y={getY(maxValue) + 3} textAnchor="end" fontSize={8} fill="currentColor" opacity={0.55} fontFamily="monospace">
          {format(maxValue)}
        </text>
        <text x={CHART.padLeft - 6} y={getY(minValue) + 3} textAnchor="end" fontSize={8} fill="currentColor" opacity={0.55} fontFamily="monospace">
          {format(minValue)}
        </text>
        <text x={getX(minYear)} y={CHART.height - CHART.padBottom + 12} textAnchor="middle" fontSize={8} fill="currentColor" opacity={0.55} fontFamily="monospace">
          {minYear}
        </text>
        <text x={getX(maxYear)} y={CHART.height - CHART.padBottom + 12} textAnchor="middle" fontSize={8} fill="currentColor" opacity={0.55} fontFamily="monospace">
          {maxYear}
        </text>

        {geometry.areaPath ? <path d={geometry.areaPath} fill={`url(#${gradientId})`} /> : null}

        <path
          d={geometry.histPath}
          className="vital-sparkline-line"
          pathLength={1}
          fill="none"
          stroke={sign.accent}
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {geometry.projPath ? (
          <path
            d={geometry.projPath}
            fill="none"
            stroke={sign.accent}
            strokeOpacity={0.7}
            strokeWidth={1.7}
            strokeDasharray="3 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        {/* Seam marker where measured history hands off to projection. */}
        {geometry.lastHistCoord ? (
          <circle cx={geometry.lastHistCoord[0]} cy={geometry.lastHistCoord[1]} r={2.6} fill={sign.accent} />
        ) : null}

        {hovered ? (
          <g>
            <line
              x1={getX(hovered.year)}
              y1={CHART.padTop - 4}
              x2={getX(hovered.year)}
              y2={CHART.height - CHART.padBottom}
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1}
            />
            <circle cx={getX(hovered.year)} cy={getY(hovered.value)} r={3.4} fill={sign.accent} stroke="currentColor" strokeWidth={1} />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
