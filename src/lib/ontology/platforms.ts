// Sapiens Platforms domain of the Sapiens Scientia ontology.
//
// The three interpretive platforms (Salus / Societas / Terra) that read the
// Earth Systems and Digital Systems domains. Each platform carries its base
// definition (from `../platform-couplings`), any sub-modules (e.g. Salus
// contains Soma and Morbus), and its SCOPE: the Earth and Digital entities it
// studies — the canonical source for the homepage platform-bridge highlights.

import { platformDefinitions, type PlatformId } from "../platform-couplings";

export type PlatformModule = {
  id: string;
  name: string;
  href: string;
  tagline: string;
};

/** What a platform studies, as ids into the Earth Systems / Digital Systems domains. */
export type PlatformScope = {
  earth: string[];
  digital: string[];
};

export type PlatformOntologyEntry = {
  id: PlatformId;
  name: string;
  shortName: string;
  label: string;
  domain: string;
  href: string;
  color: string;
  modules: PlatformModule[];
  studies: PlatformScope;
};

export const platformOntology: PlatformOntologyEntry[] = [
  {
    ...platformDefinitions.salus,
    modules: [
      {
        id: "soma",
        name: "Sapiens Scientia Soma",
        href: "/platforms/salus/soma",
        tagline: "The healthy human body — anatomy, physiology, histology.",
      },
      {
        id: "morbus",
        name: "Sapiens Scientia Morbus",
        href: "/platforms/salus/morbus",
        tagline: "The disease ontology — how the body fails and is classified.",
      },
    ],
    studies: {
      earth: ["cells", "microbes", "bacteria", "viruses", "healthcare-system", "people", "homo-sapiens"],
      digital: ["life-sciences", "databases", "knowledge-graphs", "decision-support"],
    },
  },
  {
    ...platformDefinitions.societas,
    modules: [],
    studies: {
      earth: [
        "nations",
        "legal-system",
        "economic-system",
        "healthcare-system",
        "people",
        "technology",
        "information-systems",
        "infrastructure",
        "transportation-pipes-cables",
        "business-industrial-system",
        "financial-system",
        "agricultural-systems",
        "energy-generation-system",
        "waste-management-system",
      ],
      digital: ["public-data", "data-index-platforms", "law-patents", "general-knowledge"],
    },
  },
  {
    ...platformDefinitions.terra,
    modules: [],
    studies: {
      earth: [
        "the-sun",
        "atmosphere",
        "climate-system",
        "freshwater",
        "fossil-fuels",
        "anthropogenic-waste",
        "soil-system",
        "ecosystems",
        "biosphere",
        "hydrosphere",
        "geosphere",
      ],
      digital: ["public-data", "digital-twins", "simulation-models", "sensor-networks"],
    },
  },
];

export const platformOntologyById: Record<PlatformId, PlatformOntologyEntry> =
  Object.fromEntries(platformOntology.map((entry) => [entry.id, entry])) as Record<
    PlatformId,
    PlatformOntologyEntry
  >;

/** Every (id, label) pair in this domain: platforms and their modules. */
export function platformLabelEntries(): [string, string][] {
  const entries: [string, string][] = [];
  for (const platform of platformOntology) {
    entries.push([platform.id, platform.shortName]);
    for (const mod of platform.modules) {
      entries.push([mod.id, mod.name]);
    }
  }
  return entries;
}
