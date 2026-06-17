// Digital Systems domain of the Sapiens Scientia ontology — the "Digital Halo".
//
// The orbiting digital-knowledge infrastructure: computation, communication,
// data, and intelligence systems. Canonical source for the homepage Digital
// Systems tree (projected in `src/lib/earth-systems.ts` as `digitalSystemNodes`).

export type DigitalNode = {
  id: string;
  label: string;
  /** Accent colour for highlighted nodes (the Data Index categories). */
  color?: string;
  /** Optional link target. */
  href?: string;
  children?: DigitalNode[];
};

const DATA_INDEX = "/projects/sapiens-scientia-data-index";

export const digitalSystemsDomain: DigitalNode[] = [
  {
    id: "computational-systems",
    label: "Computational Systems",
    children: [
      { id: "cloud-infrastructure", label: "Cloud Infrastructure" },
      { id: "digital-data-centers", label: "Data Centers" },
      { id: "edge-computing", label: "Edge Computing" },
      { id: "device-networks", label: "Device Networks" },
    ],
  },
  {
    id: "communication-systems",
    label: "Communication Systems",
    children: [
      { id: "internet-backbone", label: "Internet Backbone" },
      { id: "wireless-networks", label: "Wireless Networks" },
      { id: "satellite-networks", label: "Satellite Networks" },
      { id: "sensor-networks", label: "Sensor Networks" },
    ],
  },
  {
    id: "data-systems",
    label: "Data Systems",
    children: [
      { id: "knowledge-graphs", label: "Knowledge Graphs" },
      {
        id: "databases",
        label: "Databases",
        href: DATA_INDEX,
        children: [
          { id: "general-knowledge", label: "General Knowledge", color: "#2dd4bf", href: `${DATA_INDEX}#general-knowledge` },
          { id: "scholarly-indexes", label: "Scholarly Indexes", color: "#7dd3fc", href: `${DATA_INDEX}#scholarly-indexes` },
          { id: "life-sciences", label: "Life Sciences", color: "#34d399", href: `${DATA_INDEX}#life-sciences` },
          { id: "physical-sciences", label: "Physical Sciences", color: "#a78bfa", href: `${DATA_INDEX}#physical-sciences` },
          { id: "books-archives", label: "Books & Archives", color: "#fbbf24", href: `${DATA_INDEX}#books-archives` },
          { id: "law-patents", label: "Law & Patents", color: "#fb7185", href: `${DATA_INDEX}#law-patents` },
          { id: "public-data", label: "Public Data", color: "#22d3ee", href: `${DATA_INDEX}#public-data` },
          { id: "data-index-platforms", label: "Platforms", color: "#f472b6", href: `${DATA_INDEX}#platforms` },
          { id: "registries", label: "Registries", color: "#c4b5fd", href: `${DATA_INDEX}#registries` },
        ],
      },
      { id: "data-pipelines", label: "Data Pipelines" },
      { id: "digital-twins", label: "Digital Twins" },
    ],
  },
  {
    id: "intelligence-systems",
    label: "Intelligence Systems",
    children: [
      { id: "machine-learning", label: "Machine Learning" },
      { id: "simulation-models", label: "Simulation Models" },
      { id: "decision-support", label: "Decision Support" },
      { id: "autonomous-agents", label: "Autonomous Agents" },
    ],
  },
];

/** A digital node flattened to the homepage's indentation-level shape. */
export type DigitalLeveledNode = {
  label: string;
  level: number;
  color?: string;
  href?: string;
};

/** Flatten the digital tree depth-first, encoding tree depth as `level`. */
export function flattenDigitalNodes(): DigitalLeveledNode[] {
  const nodes: DigitalLeveledNode[] = [];
  const walk = (node: DigitalNode, level: number) => {
    nodes.push({ label: node.label, level, color: node.color, href: node.href });
    node.children?.forEach((child) => walk(child, level + 1));
  };
  digitalSystemsDomain.forEach((node) => walk(node, 0));
  return nodes;
}

/** Every (id, label) pair in this domain (recursively). */
export function digitalLabelEntries(): [string, string][] {
  const entries: [string, string][] = [];
  const walk = (node: DigitalNode) => {
    entries.push([node.id, node.label]);
    node.children?.forEach(walk);
  };
  digitalSystemsDomain.forEach(walk);
  return entries;
}
