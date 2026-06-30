"use client";

import Link from "next/link";
import { HomeGalaxyView } from "@/components/home-galaxy-view";

export function HomeGalaxyExperience() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <HomeGalaxyView />
      </div>

      <div className="pointer-events-none absolute right-5 top-5 z-[130] flex max-w-[min(28rem,calc(100vw-2.5rem))] flex-col items-end gap-3 sm:right-6 sm:top-6">
        <Link
          href="/meta-earth"
          className="pointer-events-auto w-fit border border-sky-200/30 bg-black/58 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100 shadow-[0_16px_36px_rgba(0,0,0,0.3)] backdrop-blur-md transition-colors hover:border-sky-100/60 hover:bg-black/72 hover:text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
        >
          Enter Meta Earth
        </Link>
      </div>
    </section>
  );
}
