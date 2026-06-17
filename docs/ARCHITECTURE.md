# Architecture

This document describes how the Sapiens Scientia website is built and where future agents should look before changing implementation structure.

## Stack

- Framework: Next.js App Router.
- Language: TypeScript.
- UI: React and Tailwind CSS.
- 3D: React Three Fiber, Drei, and Three.js.
- Fonts: Geist via `geist/font`.
- Package manager: npm with `package-lock.json`.

Useful commands:

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Source Layout

| Path | Role |
|---|---|
| `src/app/` | App Router pages, metadata, API routes, robots, and sitemap. |
| `src/components/` | Shared page sections, interactive components, 3D scene components, and navigation/footer. |
| `src/lib/` | Editorial data models, taxonomy, route constants, simulations, and shared domain helpers. |
| `src/hooks/` | Client hooks for live data and UI state. |
| `public/` | Static fonts, images, and textures. |
| `docs/` | Durable internal project memory. |

## Rendering Model

The site is mostly static pages with client-side interactive islands.

- `src/app/page.tsx` renders the homepage shell and imports `EarthHero`.
- `EarthHero` is a client component because it owns the 3D canvas, theme state, timeline state, and pointer interlock between overlays and orbit controls.
- Content pages use server components where possible, with client components for interactive visualizations.
- `src/app/api/vital-signs/route.ts` provides a route for vital-sign data.

## Homepage Structure

The homepage is the most sensitive surface.

- `src/components/earth-hero.tsx`: full-screen hero shell and React Three Fiber canvas.
- `src/components/earth-scene.tsx`: Three.js objects and animation.
- `src/components/earth-overlay.tsx`: panels, clock, timeline, popouts, and bridge connectors.
- `src/components/home-nav.tsx`: compact nav shown over the hero.
- `src/components/home-overview.tsx`: content below the hero.

When editing the homepage, verify in a browser. Build and lint can pass even if the canvas is visually blank or incorrectly sized.

## Shared Page System

`src/components/page-kit.tsx` provides shared pieces for content-heavy pages:

- `PageShell`
- `PageHeader`
- `SourceList`

Pages using this shell include `/scales`, `/chronos`, and `/vitals`.

## Data And Content Sources

Most durable content lives in `src/lib/` modules instead of page-local arrays.

| Module | Feeds |
|---|---|
| `platforms.ts` | Platform names, labels, colors, and cross-platform couplings. |
| `scales.ts` | Ladder of Scale tiers, rungs, platform affinity, and sources. |
| `chronos.ts` | Arc of Time eons, moments, platforms, and sources. |
| `earth-systems.ts` | Homepage Earth/Digital system nodes and platform bridge highlights. |
| `data-index.ts` | Data Index categories, entries, slugs, and counts. |
| `vital-signs.ts` | Planetary vital-sign domains, indicator values, history, projection, and sources. |
| `morbus.ts` | Morbus disease groups, exemplars, axes, crosswalks, and counts. |
| `projects.ts` | Public project links and EarthView route/external URL. |

Prefer updating these modules over duplicating content in individual pages.

## Theme Model

Theme state is driven by:

- `src/app/layout.tsx`: pre-paint script applies `.light-theme` to `<html>`.
- `src/lib/use-theme.ts`: client hook reads and toggles the current theme.
- `src/app/globals.css`: dark defaults plus `.light-theme` overrides.

The 3D scene receives the active theme and changes background, lights, labels, and digital sphere colors.

## Local Development Notes

- Fresh Codex worktrees may not have `node_modules`; run `npm install` before checks.
- Use `npm run dev -- -p <port>` when the default port is busy.
- If using `127.0.0.1` with Next dev, keep `allowedDevOrigins` in `next.config.ts` current.
- Browser verification matters for Three.js surfaces and responsive overlay layout.
