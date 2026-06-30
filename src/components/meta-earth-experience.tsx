"use client";

import { EarthHero } from "@/components/earth-hero";
import { HomeOverview } from "@/components/home-overview";
import { SiteFooter } from "@/components/site-footer";

export function MetaEarthExperience() {
  return (
    <>
      <EarthHero />
      <HomeOverview />
      <div className="bg-black px-6 pb-24 text-white sm:px-10 sm:pb-28">
        <SiteFooter />
      </div>
    </>
  );
}
