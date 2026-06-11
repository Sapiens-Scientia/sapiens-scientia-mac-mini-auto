# SapiensScientia.com

Homepage for Sapiens Scientia.

## Repository role

This repository contains the public website implementation for Sapiens Scientia.

The canonical project documentation, doctrine, platform taxonomy, naming decisions, and implementation handoffs live in the companion docs repository:

- GitHub: [Sapiens-Scientia/sapiens-scientia-docs](https://github.com/Sapiens-Scientia/sapiens-scientia-docs)
- Local checkout: a sibling clone of `sapiens-scientia-docs` kept alongside this repo (the absolute path is machine-specific).

When changing platform names, ontology language, project framing, or major public-facing narrative, check the docs repo first and update it when the implementation reveals new constraints.

## Concept

A cinematic 3D visualization connecting a Physical Earth to a Digital Earth, representing the bridge between planetary infrastructure and digital knowledge.

## Related repositories

| Repository | Purpose |
|---|---|
| [sapiensscientia.com](https://github.com/Sapiens-Scientia/sapiensscientia.com) | Public website and implementation code |
| [sapiens-scientia-docs](https://github.com/Sapiens-Scientia/sapiens-scientia-docs) | Canonical documentation, doctrine, taxonomy, naming, and Codex handoffs |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```
