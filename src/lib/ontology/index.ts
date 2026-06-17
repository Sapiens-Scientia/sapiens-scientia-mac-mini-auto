// The Sapiens Scientia Ontology — umbrella over three domains.
//
//   • Earth Systems    (Physical Earth) — five-tier nested-systems taxonomy
//   • Sapiens Platforms — Persona / Societas / Terra lenses (+ Persona modules)
//   • Digital Systems   (Digital Halo) — computation, comms, data, intelligence
//
// plus the cross-domain relationships that connect them (studies + couplings).
//
// This barrel also builds the global label registry so any view can resolve a
// canonical label by id via `ontologyLabel`. Edit the domain modules, then run
// `npm run gen:ontology` to refresh docs/ONTOLOGY.md.

import { earthSystemLabelEntries, ontologyTiers } from "./earth-systems";
import { digitalLabelEntries, digitalSystemsDomain } from "./digital-systems";
import { platformLabelEntries, platformOntology } from "./platforms";
import { couplingEdges, studiesEdges } from "./relationships";

export * from "./earth-systems";
export * from "./digital-systems";
export * from "./platforms";
export * from "./relationships";

// Global registry of every addressable label across all three domains. Ids are
// unique across domains; a duplicate id with a conflicting label is a bug.
const labelRegistry: Record<string, string> = (() => {
  const registry: Record<string, string> = {};
  const allEntries = [
    ...earthSystemLabelEntries(),
    ...digitalLabelEntries(),
    ...platformLabelEntries(),
  ];
  for (const [id, label] of allEntries) {
    if (registry[id] !== undefined && registry[id] !== label) {
      throw new Error(`Ontology id collision: "${id}" maps to both "${registry[id]}" and "${label}"`);
    }
    registry[id] = label;
  }
  return registry;
})();

export const ontologyLabels: Readonly<Record<string, string>> = labelRegistry;

/** Resolve a canonical label by id (any domain). Throws on unknown ids. */
export function ontologyLabel(id: string): string {
  const label = labelRegistry[id];
  if (label === undefined) {
    throw new Error(`Unknown ontology id: "${id}"`);
  }
  return label;
}

/** Resolve a list of ids to their canonical labels. */
export function ontologyLabelsFor(ids: string[]): string[] {
  return ids.map(ontologyLabel);
}

// The full ontology as a single structured object, handy for tooling and docs.
export const sapiensScientiaOntology = {
  domains: {
    earthSystems: ontologyTiers,
    sapiensPlatforms: platformOntology,
    digitalSystems: digitalSystemsDomain,
  },
  relationships: {
    studies: studiesEdges,
    couplings: couplingEdges,
  },
} as const;
