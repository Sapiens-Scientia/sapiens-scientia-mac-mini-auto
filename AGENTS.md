# Agent Instructions

This repository is the public website implementation for Sapiens Scientia.

Agents working here should preserve the separation between implementation code and project doctrine. Build and refactor the website in this repo, but treat the companion docs repo as the source of truth for platform taxonomy, naming, ontology, conceptual framing, brand voice, and durable handoffs.

## Companion docs repo

- GitHub: `https://github.com/Sapiens-Scientia/sapiens-scientia-docs`
- Local checkout: `/Users/benpundykair/Projects_macbookair/SapiensScientia_local/Sapiens Scientia Docs/sapiens-scientia-docs`

## Working rules

- Check the docs repo before changing platform names, ontology terms, major narrative language, or conceptual architecture.
- Keep website-specific implementation details in this repo.
- Record durable conceptual changes in the docs repo, usually in `docs/DECISIONS.md` or `docs/CODEX_HANDOFF.md`.
- Preserve the current naming model unless the docs repo is intentionally updated: `Salus`, `Societas`, `Terra`, and `Morbus`.
- Do not copy large sections of docs content into the website repo unless the content is meant to be public website copy.
- If implementation reveals a constraint or mismatch, update the docs handoff so future agents can see it.

## Current relationship

`sapiensscientia.com` consumes the conceptual direction defined in `sapiens-scientia-docs`. The relationship is documented rather than enforced by submodules, generated content, or build-time dependencies.
