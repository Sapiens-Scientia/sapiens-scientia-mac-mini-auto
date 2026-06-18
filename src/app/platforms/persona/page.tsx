import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PlatformCouplingLinks } from "@/components/platform-coupling-links";
import { ScaleRungLinks } from "@/components/scale-rung-links";

export const metadata: Metadata = {
  title: "Persona | Sapiens Scientia",
  description:
    "Sapiens Scientia Persona: the platform for the human person as an embodied, vulnerable, home-dwelling, health-seeking, disease-susceptible, socially embedded organism.",
};

const personaModules = [

  {
    id: "salus",
    title: "Salus (Health)",
    color: "text-sky-400 border-sky-400/20 bg-sky-400/[0.02] hover:bg-sky-400/[0.04] hover:border-sky-400/35",
    tagline: "Health, care, welfare, flourishing, and preservation.",
    detail: "Salus models the positive states of human health: medicine, therapeutics, healthcare delivery systems, public health interventions, and personal/collective welfare.",
    href: "/platforms/persona/salus",
  },

  {
    id: "domus",
    title: "Domus (Home)",
    color: "text-blue-400 border-blue-400/20 bg-blue-400/[0.02] hover:bg-blue-400/[0.04] hover:border-blue-400/35",
    tagline: "Home, household, dwelling, domestic life, and intimate habitat.",
    detail: "Domus models the direct physical, social, and technological interfaces where individual bodies sleep, eat, care, and adapt.",
    href: "/platforms/persona/domus",
  },
];

export default function PersonaPlatformPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white sm:px-10">
      <SiteNav />

      <section className="mx-auto flex max-w-7xl flex-col gap-12">
        <header className="max-w-4xl">
          <p className="mb-3 text-xl font-medium uppercase tracking-[0.24em] text-blue-400">
            Human Individual Platform
          </p>
          <h1 className="text-5xl font-semibold tracking-normal sm:text-7xl">
            Persona
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-slate-300">
            Persona is the interpretive platform for the human person: an embodied, vulnerable,
            home-dwelling, health-seeking, disease-susceptible, socially embedded organism.
          </p>
        </header>

        {/* Modules Section */}
        <section className="border-t border-white/10 pt-10">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Platform Modules
            </h2>
            <p className="mt-3 text-base text-slate-400">
              Persona acts as the portal for four key sub-disciplines mapping human-scale reality.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {personaModules.map((mod) => (
              <Link
                key={mod.id}
                href={mod.href}
                className={`border p-6 flex flex-col justify-between transition-all duration-300 ${mod.color}`}
              >
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{mod.title}</h3>
                  <p className="mt-2 text-xs font-mono tracking-wide uppercase opacity-75">{mod.tagline}</p>
                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    {mod.detail}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
                  <span>Open Module</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <PlatformCouplingLinks platform="persona" />

        <ScaleRungLinks platform="persona" />
      </section>
      <SiteFooter />
    </main>
  );
}
