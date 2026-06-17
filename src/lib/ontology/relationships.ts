// Cross-domain relationships of the Sapiens Scientia ontology.
//
// The domains (Earth Systems, Sapiens Platforms, Digital Systems) are not
// independent. Two kinds of edge connect them:
//
//   • "studies"  — a platform reads/observes an Earth or Digital entity.
//                  Source of truth for the homepage platform-bridge highlights.
//   • "coupling" — a platform-to-platform feedback loop (Public health, Climate
//                  medicine, …). The rich coupling data lives in
//                  `../platform-couplings`; here it is surfaced as ontology edges.

import { platformCouplings, type PlatformId } from "../platform-couplings";
import { platformOntology } from "./platforms";

export type StudiesEdge = {
  type: "studies";
  platform: PlatformId;
  /** Which domain the target entity lives in. */
  target: "earth" | "digital";
  /** Entity id within that domain. */
  entity: string;
};

/** Platform → entity edges, flattened from each platform's declared scope. */
export const studiesEdges: StudiesEdge[] = platformOntology.flatMap((platform) => [
  ...platform.studies.earth.map(
    (entity): StudiesEdge => ({ type: "studies", platform: platform.id, target: "earth", entity }),
  ),
  ...platform.studies.digital.map(
    (entity): StudiesEdge => ({ type: "studies", platform: platform.id, target: "digital", entity }),
  ),
]);

export type CouplingEdge = {
  type: "coupling";
  slug: string;
  name: string;
  platforms: PlatformId[];
  detail: string;
};

/** Platform ↔ platform coupling edges (surfaced from `../platform-couplings`). */
export const couplingEdges: CouplingEdge[] = platformCouplings.map((coupling) => ({
  type: "coupling",
  slug: coupling.slug,
  name: coupling.name,
  platforms: coupling.links,
  detail: coupling.detail,
}));
