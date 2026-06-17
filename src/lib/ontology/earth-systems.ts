// Earth Systems domain of the Sapiens Scientia ontology.
//
// This is the canonical four-tier nested-systems taxonomy (Microsystems /
// Mesosystems / Macrosystems / Megasystems), its semantic groups, and the
// display label of every entity. It is one of three domains that make up the
// full ontology (see `./index.ts`): Earth Systems, Sapiens Platforms, and
// Digital Systems.
//
// Two views are projected from this domain:
//   • `src/lib/scales.ts`        → the Ladder of Scale (groups + members)
//   • `src/lib/earth-systems.ts` → the homepage Earth Systems node tree
//
// The Earth Systems view is a deliberately curated projection (its own order,
// nesting, and inclusion — e.g. it omits Data Centers), so it is not generated
// mechanically. Instead it references canonical entities by id and resolves
// their labels via the registry in `./index.ts`, so a rename happens once.
//
// When you change the taxonomy, regenerate the human-readable doc with
// `npm run gen:ontology` (writes docs/ONTOLOGY.md).

import type { PlatformId } from "../platform-couplings";

export type OntologyTierId = "micro" | "meso" | "macro" | "mega";

/** A single system in the taxonomy. May nest to express containment. */
export type OntologyEntity = {
  id: string;
  label: string;
  /** Child systems contained by this one (e.g. Homo sapiens ⊂ Mammals). */
  children?: OntologyEntity[];
};

/** A semantic grouping of entities within a tier. */
export type OntologyGroup = {
  id: string;
  name: string;
  members: OntologyEntity[];
};

export type OntologyTier = {
  id: OntologyTierId;
  name: string;
  ordinal: string;
  color: string;
  rangeLabel: string;
  principle: string;
  platforms: PlatformId[];
  groups: OntologyGroup[];
};

export const ontologyTiers: OntologyTier[] = [
  {
    id: "micro",
    name: "Microsystems",
    ordinal: "Tier I",
    color: "#38bdf8",
    rangeLabel: "Quarks to cells · 10⁻¹⁸–10⁻⁵ m",
    principle:
      "The constituent scale. Matter resolves into particles, atoms, and molecules; life resolves into cells and the microbes, bacteria, and viruses that share the body. Everything larger on the ladder is assembled from here.",
    platforms: ["salus"],
    groups: [
      {
        id: "nanosystems",
        name: "Nanosystems",
        members: [
          { id: "elementary-particles", label: "Elementary Particles" },
          { id: "atoms", label: "Atoms" },
          { id: "molecules", label: "Molecules" },
        ],
      },
      {
        id: "microsystems-group",
        name: "Microsystems",
        members: [
          { id: "cells", label: "Cells" },
          { id: "microbes", label: "Microbes" },
          { id: "bacteria", label: "Bacteria" },
          { id: "viruses", label: "Viruses" },
        ],
      },
    ],
  },
  {
    id: "meso",
    name: "Mesosystems",
    ordinal: "Tier II",
    color: "#a78bfa",
    rangeLabel: "Organisms · 10⁻⁴–10¹ m",
    principle:
      "The organismal scale — the scale of a single living body. Multicellular life, mammals, and Homo sapiens itself. This is the scale a human directly inhabits, and the reference point the entire ladder is read from.",
    platforms: ["salus"],
    groups: [
      {
        id: "multicellular-life",
        name: "Multicellular life",
        members: [
          {
            id: "multicellular-life-forms",
            label: "Multicellular Life Forms",
            children: [
              {
                id: "mammals",
                label: "Mammals",
                children: [{ id: "homo-sapiens", label: "Homo sapiens" }],
              },
            ],
          },
        ],
      },
      {
        id: "lived-environments",
        name: "Lived environments",
        members: [
          { id: "homes", label: "Homes" },
          { id: "buildings", label: "Buildings" },
          { id: "schools", label: "Schools" },
          { id: "hospitals", label: "Hospitals" },
          { id: "workplaces", label: "Workplaces" },
          { id: "farms", label: "Farms" },
          { id: "neighborhoods", label: "Neighborhoods" },
          { id: "local-ecosystems", label: "Local ecosystems" },
          { id: "watersheds", label: "Watersheds" },
        ],
      },
    ],
  },
  {
    id: "macro",
    name: "Macrosystems",
    ordinal: "Tier III",
    color: "#818cf8",
    rangeLabel: "Cities & systems · 10¹–10⁶ m",
    principle:
      "The collective scale. Many humans, coordinated by institutions and infrastructure: nations, legal and economic systems, healthcare, technology, energy, transport, and the built and digital environment. Society as a system.",
    platforms: ["societas", "salus"],
    groups: [
      {
        id: "people-institutions",
        name: "People & institutions",
        members: [
          { id: "nations", label: "Nations" },
          { id: "people", label: "People" },
          { id: "legal-system", label: "Legal System" },
          { id: "economic-system", label: "Economic System" },
          { id: "financial-system", label: "Financial System" },
          { id: "business-industrial-system", label: "Business & Industrial System" },
        ],
      },
      {
        id: "provisioning-systems",
        name: "Provisioning systems",
        members: [
          { id: "healthcare-system", label: "Healthcare System" },
          { id: "agricultural-systems", label: "Agricultural Systems" },
          { id: "energy-generation-system", label: "Energy Generation System" },
          { id: "waste-management-system", label: "Waste Management System" },
        ],
      },
      {
        id: "built-digital-fabric",
        name: "Built & digital fabric",
        members: [
          { id: "infrastructure", label: "Infrastructure" },
          { id: "transportation-pipes-cables", label: "Transportation, Pipes, & Cables" },
          { id: "technology", label: "Technology" },
          { id: "information-systems", label: "Information Systems" },
          { id: "data-centers", label: "Data Centers" },
        ],
      },
    ],
  },
  {
    id: "mega",
    name: "Megasystems",
    ordinal: "Tier IV",
    color: "#34d399",
    rangeLabel: "Planet & star · 10⁷–10¹¹ m",
    principle:
      "The planetary scale. The Earth systems that contain everything below them — atmosphere, hydrosphere, geosphere, biosphere, soils, and climate — and the Sun that powers them. The boundary conditions of all human life.",
    platforms: ["terra"],
    groups: [
      {
        id: "planetary-spheres",
        name: "Planetary spheres",
        members: [
          { id: "atmosphere", label: "Atmosphere" },
          { id: "hydrosphere", label: "Hydrosphere" },
          { id: "geosphere", label: "Geosphere" },
          { id: "biosphere", label: "Biosphere" },
          { id: "soil-system", label: "Soil System" },
          { id: "ecosystems", label: "Ecosystems" },
        ],
      },
      {
        id: "flows-forcings",
        name: "Flows & forcings",
        members: [
          { id: "the-sun", label: "The Sun" },
          { id: "climate-system", label: "Climate System" },
          { id: "freshwater", label: "Freshwater" },
          { id: "fossil-fuels", label: "Fossil Fuels" },
          { id: "anthropogenic-waste", label: "Anthropogenic Waste" },
        ],
      },
    ],
  },
];

/** Depth-first flatten of a group's members (and their nested children) to labels. */
export function flattenMemberLabels(members: OntologyEntity[]): string[] {
  const labels: string[] = [];
  const walk = (entity: OntologyEntity) => {
    labels.push(entity.label);
    entity.children?.forEach(walk);
  };
  members.forEach(walk);
  return labels;
}

/** Every (id, label) pair in this domain: tiers, groups, and entities (recursively). */
export function earthSystemLabelEntries(): [string, string][] {
  const entries: [string, string][] = [];
  const walkEntity = (entity: OntologyEntity) => {
    entries.push([entity.id, entity.label]);
    entity.children?.forEach(walkEntity);
  };
  for (const tier of ontologyTiers) {
    entries.push([tier.id, tier.name]);
    for (const group of tier.groups) {
      entries.push([group.id, group.name]);
      group.members.forEach(walkEntity);
    }
  }
  return entries;
}
