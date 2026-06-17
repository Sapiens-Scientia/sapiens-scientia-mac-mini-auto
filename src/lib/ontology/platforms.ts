// Sapiens Platforms domain of the Sapiens Scientia ontology.
//
// The three interpretive platforms (Persona / Societas / Terra) that read the
// Earth Systems and Digital Systems domains. Each platform carries its base
// definition (from `../platform-couplings`), any sub-modules (e.g. Persona
// contains Soma, Salus, Morbus, and Domus), and its SCOPE: the Earth and Digital entities it
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
    ...platformDefinitions.persona,
    modules: [
      {
        id: "soma",
        name: "Sapiens Scientia Soma",
        href: "/platforms/persona/soma",
        tagline: "Soma studies the body, anatomy, physiology, histology, form, and function.",
      },
      {
        id: "salus",
        name: "Sapiens Scientia Salus",
        href: "/platforms/persona/salus",
        tagline: "Salus studies health, care, welfare, flourishing, and preservation.",
      },
      {
        id: "morbus",
        name: "Sapiens Scientia Morbus",
        href: "/platforms/persona/morbus",
        tagline: "Morbus studies disease, pathology, dysfunction, suffering, and clinical categories.",
      },
      {
        id: "domus",
        name: "Sapiens Scientia Domus",
        href: "/platforms/persona/domus",
        tagline: "Domus studies the home as a human habitat: biological, social, technological, economic, and ecological.",
      },
    ],
    studies: {
      earth: ["cells", "microbes", "bacteria", "viruses", "healthcare-system", "people", "homo-sapiens", "homes"],
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
