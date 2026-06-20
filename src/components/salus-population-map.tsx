import Image from "next/image";

const WORLDPOP_SOURCE =
  "https://www.worldpop.org/blog/beta-test-our-new-global-population-data-2015-to-2030/";

export function SalusPopulationMap() {
  return (
    <figure className="salus-population-map relative overflow-hidden border">
      <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden px-3 py-12 sm:min-h-[28rem] sm:px-8 lg:min-h-[34rem] lg:px-12">
        <div className="salus-population-map__wash absolute inset-0" />
        <div className="salus-population-map__rule absolute inset-x-0 top-0 h-px" />

        <Image
          src="/images/salus/worldpop-population-2025.webp"
          alt="Global map of estimated population distribution in 2025, with brighter yellow and green areas showing greater concentrations of people."
          width={1500}
          height={619}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="salus-population-map__image relative h-auto w-full max-w-[94rem] object-contain"
          priority
        />
      </div>

      <figcaption className="salus-population-map__caption relative grid gap-3 border-t px-4 py-4 text-xs leading-5 backdrop-blur-sm sm:grid-cols-[1fr_auto] sm:items-end sm:px-5">
        <div className="max-w-2xl">
          <p className="salus-population-map__eyebrow font-semibold uppercase tracking-[0.16em]">
            Population Geography · 2025
          </p>
          <p className="salus-population-map__description mt-1">
            Estimated residential population in 100 × 100 metre grid cells. Yellow and green
            indicate greater population concentrations; blue and violet indicate lower or zero
            population.
          </p>
        </div>
        <a
          href={WORLDPOP_SOURCE}
          target="_blank"
          rel="noreferrer"
          className="salus-population-map__source pointer-events-auto underline underline-offset-4 transition"
        >
          Source: WorldPop Global 2
        </a>
      </figcaption>
    </figure>
  );
}
