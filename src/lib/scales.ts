// The Ladder of Scale, expressed as a ladder of physical scale. The five tiers
// and their member systems are projected from the canonical taxonomy in
// `src/lib/ontology` (the single source of truth, shared with the homepage
// Earth Systems tree); here they are anchored to characteristic length scales so
// the hierarchy reads as a powers-of-ten journey from elementary particles to
// the Sun.
//
// Length scales are order-of-magnitude characteristic sizes (log10 of metres),
// not precise measurements. Physical anchors follow NIST/CODATA, NASA planetary
// fact sheets, and standard cell-biology reference values.

import { platformDefinitions, type PlatformId } from "@/lib/platforms";
import { flattenMemberLabels, ontologyTiers } from "@/lib/ontology";

export type ScaleTierId = "nano" | "micro" | "meso" | "macro" | "mega";

export type ScalePlatform = {
  id: PlatformId;
  name: string;
  href: string;
  color: string;
};

export const platforms: Record<ScalePlatform["id"], ScalePlatform> = {
  salus: {
    id: "salus",
    name: platformDefinitions.salus.shortName,
    href: platformDefinitions.salus.href,
    color: platformDefinitions.salus.color,
  },
  societas: {
    id: "societas",
    name: platformDefinitions.societas.shortName,
    href: platformDefinitions.societas.href,
    color: platformDefinitions.societas.color,
  },
  terra: {
    id: "terra",
    name: platformDefinitions.terra.shortName,
    href: platformDefinitions.terra.href,
    color: platformDefinitions.terra.color,
  },
};

export type ScaleTier = {
  id: ScaleTierId;
  name: string;
  ordinal: string;
  color: string;
  rangeLabel: string;
  principle: string;
  groups: { name: string; members: string[] }[];
  platforms: ScalePlatform["id"][];
};

export const scaleTiers: ScaleTier[] = ontologyTiers.map((tier) => ({
  id: tier.id,
  name: tier.name,
  ordinal: tier.ordinal,
  color: tier.color,
  rangeLabel: tier.rangeLabel,
  principle: tier.principle,
  platforms: tier.platforms,
  groups: tier.groups.map((group) => ({
    name: group.name,
    members: flattenMemberLabels(group.members),
  })),
}));

export type ScaleRung = {
  name: string;
  /** log10 of characteristic size in metres. */
  log: number;
  sizeLabel: string;
  tier: ScaleTierId;
  note: string;
  /** Marks the human reference rung. */
  here?: boolean;
  /** Platform affinity for this rung; falls back to tier defaults when omitted. */
  platforms?: ScalePlatform["id"][];
};

// Representative entities plotted by characteristic physical size — the rungs of
// the ladder. Ordered small to large.
export const scaleRungs: ScaleRung[] = [
  { name: "Elementary particles", log: -18, sizeLabel: "< 10⁻¹⁸ m", tier: "nano", note: "Quarks and electrons carry no measured size — point-like, the floor of the ladder.", platforms: ["salus"] },
  { name: "Atoms", log: -10, sizeLabel: "~0.1 nm", tier: "nano", note: "A nucleus wrapped in an electron cloud; the smallest unit of a chemical element.", platforms: ["salus"] },
  { name: "Molecules", log: -9, sizeLabel: "~1 nm", tier: "nano", note: "Bonded atoms — water, proteins, the DNA double helix two nanometres wide.", platforms: ["salus"] },
  { name: "Viruses", log: -7, sizeLabel: "~100 nm", tier: "micro", note: "Genetic packages that borrow living cells to replicate; smaller than the cells they infect.", platforms: ["salus"] },
  { name: "Bacteria", log: -6, sizeLabel: "~1 µm", tier: "micro", note: "Single-celled microbes; trillions live within and upon the human body.", platforms: ["salus"] },
  { name: "Human cells", log: -5, sizeLabel: "~10 µm", tier: "micro", note: "The basic unit of the body — roughly thirty trillion of them per person.", platforms: ["salus"] },
  { name: "Mammals", log: 0, sizeLabel: "~1 m", tier: "meso", note: "Multicellular animals; the lineage Homo sapiens belongs to.", platforms: ["salus"] },
  { name: "Homo sapiens", log: 0.23, sizeLabel: "~1.7 m", tier: "meso", note: "You are here. The scale that reads every other rung on the ladder.", here: true, platforms: ["salus"] },
  { name: "Buildings", log: 2, sizeLabel: "~100 m", tier: "macro", note: "The built environment — where most human life is now spent.", platforms: ["societas", "salus"] },
  { name: "Cities", log: 4, sizeLabel: "~10 km", tier: "macro", note: "Dense concentrations of people, institutions, and infrastructure.", platforms: ["societas"] },
  { name: "Nations", log: 6, sizeLabel: "~1,000 km", tier: "macro", note: "Legal, economic, and political systems spanning continents.", platforms: ["societas"] },
  { name: "The Earth", log: 7.1, sizeLabel: "~12,700 km", tier: "mega", note: "The planet and its coupled spheres — atmosphere, ocean, crust, biosphere.", platforms: ["terra"] },
  { name: "The Sun", log: 9.1, sizeLabel: "~1.4M km", tier: "mega", note: "The star that supplies almost all the energy driving Earth's systems.", platforms: ["terra"] },
  { name: "Earth–Sun distance", log: 11.2, sizeLabel: "~150M km (1 AU)", tier: "mega", note: "One astronomical unit — the orbital radius that sets Earth's climate.", platforms: ["terra"] },
];

export const LADDER_LOG_MIN = -18;
export const LADDER_LOG_MAX = 11.2;
/** Orders of magnitude spanned from the smallest to the largest rung. */
export const ORDERS_OF_MAGNITUDE = Math.round(LADDER_LOG_MAX - LADDER_LOG_MIN);

export function rungSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findRungIndexBySlug(slug: string): number {
  return scaleRungs.findIndex((rung) => rungSlug(rung.name) === slug);
}

export const scaleSources = [
  { label: "NIST — CODATA Fundamental Physical Constants", href: "https://physics.nist.gov/cuu/Constants/" },
  { label: "NASA — Earth Fact Sheet", href: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html" },
  { label: "NASA — Sun Fact Sheet", href: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html" },
  { label: "BioNumbers — Cell Biology by the Numbers", href: "https://bionumbers.hms.harvard.edu/" },
];
