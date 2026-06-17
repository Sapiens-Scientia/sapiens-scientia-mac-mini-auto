// Homepage Earth/Digital system trees and platform-bridge highlights.
//
// All taxonomy data here is projected from the canonical ontology
// (`src/lib/ontology`): the Earth Systems tree is a curated projection (its own
// order, nesting, and inclusion — e.g. it omits Data Centers) that resolves
// labels by id; the Digital Systems tree and the platform bridges are derived
// directly from the Digital Systems domain and the platform scope edges. Edit
// the ontology, not this file, to change labels or membership.

import {
  flattenDigitalNodes,
  ontologyLabel,
  ontologyLabelsFor,
  platformOntology,
} from "@/lib/ontology";

// Resolve an ontology entity to a homepage node at the given indentation level.
function ontologyNode(id: string, level: number): ConceptNode {
  return { label: ontologyLabel(id), level };
}

// Resolve a list of ontology ids to their canonical labels.
function ontologyHighlights(ids: string[]): string[] {
  return ontologyLabelsFor(ids);
}

export type DataCenterSite = {
  name: string;
  lat: number;
  lon: number;
};

export type ConceptNode = {
  color?: string;
  href?: string;
  label: string;
  level: number;
};

export type ConceptHighlight = {
  color: string;
  labels: string[];
};

export type HumanPlatformBridge = {
  color: string;
  digitalHighlights: string[];
  earthHighlights: string[];
  href: string;
  id: "salus" | "societas" | "terra";
  subtitle: string;
  title: string;
};

export type DataIndexEntry = {
  name: string;
  href: string;
};

export type DataIndexCategory = {
  color: string;
  name: string;
  entries: DataIndexEntry[];
};

export const dataCenterSites: DataCenterSite[] = [
  { name: "Northern Virginia", lat: 39.04, lon: -77.49 },
  { name: "Dallas", lat: 32.78, lon: -96.8 },
  { name: "Silicon Valley", lat: 37.39, lon: -122.08 },
  { name: "Sao Paulo", lat: -23.55, lon: -46.63 },
  { name: "Dublin", lat: 53.35, lon: -6.26 },
  { name: "Frankfurt", lat: 50.11, lon: 8.68 },
  { name: "Mumbai", lat: 19.07, lon: 72.88 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Tokyo", lat: 35.68, lon: 139.76 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
];

export const earthSystemNodes: ConceptNode[] = [
  ontologyNode("nano", 0),
  ontologyNode("elementary-particles", 1),
  ontologyNode("atoms", 1),
  ontologyNode("molecules", 1),

  ontologyNode("micro", 0),
  ontologyNode("cells", 1),
  ontologyNode("microbes", 1),
  ontologyNode("bacteria", 1),
  ontologyNode("viruses", 1),

  ontologyNode("meso", 0),
  ontologyNode("multicellular-life-forms", 1),
  ontologyNode("mammals", 2),
  ontologyNode("homo-sapiens", 3),
  ontologyNode("homes", 1),
  ontologyNode("buildings", 1),
  ontologyNode("schools", 1),
  ontologyNode("hospitals", 1),
  ontologyNode("workplaces", 1),
  ontologyNode("farms", 1),
  ontologyNode("neighborhoods", 1),
  ontologyNode("local-ecosystems", 1),
  ontologyNode("watersheds", 1),

  ontologyNode("macro", 0),
  ontologyNode("nations", 1),
  ontologyNode("legal-system", 1),
  ontologyNode("economic-system", 1),
  ontologyNode("healthcare-system", 1),
  ontologyNode("people", 1),
  ontologyNode("technology", 1),
  ontologyNode("information-systems", 1),
  ontologyNode("infrastructure", 1),
  ontologyNode("transportation-pipes-cables", 1),
  ontologyNode("business-industrial-system", 1),
  ontologyNode("financial-system", 1),
  ontologyNode("agricultural-systems", 1),
  ontologyNode("energy-generation-system", 1),
  ontologyNode("waste-management-system", 1),

  ontologyNode("mega", 0),
  ontologyNode("the-sun", 1),
  ontologyNode("atmosphere", 1),
  ontologyNode("climate-system", 1),
  ontologyNode("freshwater", 1),
  ontologyNode("fossil-fuels", 1),
  ontologyNode("anthropogenic-waste", 1),
  ontologyNode("soil-system", 1),
  ontologyNode("ecosystems", 1),
  ontologyNode("biosphere", 1),
  ontologyNode("hydrosphere", 1),
  ontologyNode("geosphere", 1),
];

// Derived from each platform's declared scope in the ontology, so the bridge
// highlights always match the canonical entity labels.
export const humanPlatformBridges: HumanPlatformBridge[] = platformOntology.map(
  (platform) => ({
    id: platform.id,
    title: platform.name,
    subtitle: platform.label,
    href: platform.href,
    color: platform.color,
    earthHighlights: ontologyHighlights(platform.studies.earth),
    digitalHighlights: ontologyHighlights(platform.studies.digital),
  }),
);

// The Digital Halo, projected from the Digital Systems domain of the ontology.
export const digitalSystemNodes: ConceptNode[] = flattenDigitalNodes();

export const digitalDataIndexHighlights: ConceptHighlight[] = [
  { color: "#22d3ee", labels: ontologyHighlights(["databases", "public-data"]) },
  { color: "#2dd4bf", labels: ontologyHighlights(["general-knowledge"]) },
  { color: "#7dd3fc", labels: ontologyHighlights(["scholarly-indexes"]) },
  { color: "#34d399", labels: ontologyHighlights(["life-sciences"]) },
  { color: "#a78bfa", labels: ontologyHighlights(["physical-sciences"]) },
  { color: "#fbbf24", labels: ontologyHighlights(["books-archives"]) },
  { color: "#fb7185", labels: ontologyHighlights(["law-patents"]) },
  { color: "#f472b6", labels: ontologyHighlights(["data-index-platforms"]) },
  { color: "#c4b5fd", labels: ontologyHighlights(["registries"]) },
];

export function platformBridgeHighlights(
  activeBridge: HumanPlatformBridge | null,
  side: "earth" | "digital",
): ConceptHighlight[] {
  if (!activeBridge) {
    return [];
  }

  return [
    {
      color: activeBridge.color,
      labels: side === "earth" ? activeBridge.earthHighlights : activeBridge.digitalHighlights,
    },
  ];
}
