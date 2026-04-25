# Workflow

This page describes the lightweight process for maintaining the InCampus project wiki.

## Operating Model

AFFiNE is the live collaborative workspace.
This repository is the durable project memory.

Use `raw/` for immutable exported source material.
Use `wiki/` for derived, structured knowledge.

## Weekly AFFiNE Export

Recommended export path:

```text
raw/affine/DD:MM:YYYY/
```

Examples:

```text
raw/affine/13:04:2026/
raw/affine/25:04:2026/
```

Guidelines:
- Export only selected documents that matter for project continuity.
- Do not overwrite older exports.
- Keep source filenames recognizable.
- Put exported images or attachments in `raw/assets/` when needed.
- If an export is partial or messy, keep it anyway and note the limitation during ingest.

## Ingest Workflow

When Codex ingests a new snapshot:
1. Read [[wiki/index|Wiki Index]].
2. Inspect the new files in `raw/affine/...`.
3. Identify what changed or became stable.
4. Update relevant pages in `wiki/`.
5. Update [[wiki/requirements/use-cases|use cases]], [[wiki/requirements/use-case-narratives|narratives]], and [[wiki/requirements/traceability|traceability]] when affected.
6. Add or revise [[wiki/project/decisions|decisions]] when the team has clearly decided something.
7. Update [[wiki/project/weekly-status|weekly status]].
8. Update [[wiki/index|Wiki Index]] if pages changed materially or new pages were created.
9. Append an entry to [[wiki/log|Wiki Log]].

## Current Use-Case Workflow

The ingested AFFiNE snapshot describes the current requirements workflow as staged [[wiki/requirements/use-cases|use-case work]].

Source:

```text
raw/affine/13:04:2026/Home.md
```

Current workflow:
1. Start from one or more MVP user stories.
2. Identify the actor and the actor's goal.
3. Propose candidate use cases at user-goal level.
4. Review candidate use cases by merging overlaps, splitting broad use cases, and removing duplicates.
5. Define final use case IDs only once the set is stable.
6. Complete [[wiki/requirements/use-case-narratives|use case narratives]] using related requirements, initiating actor, actor goal, participating actors, preconditions, postconditions, main success scenario, and alternate scenarios.
7. Review narratives to identify include/extend relationships.
8. Generate the final use-case diagram only after the set, names, narratives, and relationships are coherent.

Important constraint:
- Do not finalize include/extend relationships too early.
- Do not treat current textual use case names as final numeric UC IDs.
- `Home.md` is marked `OUTDATED`, so confirm this workflow against later snapshots if a newer process appears.

## Current Architecture Workflow

The latest AFFiNE architecture batch moves current project work into architecture analysis.

Source:

```text
raw/affine/25:04:2026/
```

Current architecture workflow:
1. Start from the stabilized use-case subgroup areas and narratives.
2. Identify business events, logical functions, candidate processes, external entities, data stores, and data flows.
3. Reuse existing logical stores before proposing new stores.
4. Keep analysis logical, not technical.
5. Preserve subgroup boundaries and store ownership while allowing justified cross-subgroup reads/writes.
6. Merge subgroup DFDs into a six-area Level-1 DFD.
7. Check consistency with the CRUD matrix and data-store catalog.
8. Record unresolved contradictions rather than silently choosing unsupported behavior.

Current architecture pages:
- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/architecture/data-stores|Architecture Data Stores]]
- [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]]

Important constraint:
- Broad wiki references should point to the latest grounded architecture version.
- Previous raw versions remain immutable history and should be connected only through version-history notes, not treated as parallel current sources.
- When diagrams conflict with newer workdocs or CRUD Matrix `v1.4`, use the newer workdocs/CRUD interpretation and record the conflict.

## Query Workflow

When answering project questions:
1. Start from [[wiki/index|Wiki Index]].
2. Read relevant wiki pages.
3. Search `raw/` only when source verification is needed or the wiki is incomplete.
4. Label the answer clearly as known, inferred, unresolved, or needs source.
5. If the answer becomes durable knowledge, file it into the relevant wiki page.

## Lint Workflow

Occasionally ask Codex to health-check the wiki.

Useful checks:
- missing links from [[wiki/index|index]]
- stale claims
- contradictions between pages
- orphan pages
- requirements without [[wiki/requirements/use-cases|use cases]]
- [[wiki/requirements/use-cases|use cases]] without requirements
- narratives missing for confirmed use cases
- unresolved decisions that block current work
- architecture pages that point to stale source versions instead of the latest current version

Lint results should be actionable.
Do not create a large process around them.

## Maintenance Rules

- Keep the structure simple.
- Prefer updating existing pages before creating new ones.
- Create new pages only when a topic becomes stable enough to deserve its own place.
- Keep individual use case index cards under `wiki/requirements/use-case-pages/` and link them through [[wiki/requirements/use-cases|Use Cases]].
- Keep architecture summaries under `wiki/architecture/` when DFD, CRUD, or data-store knowledge becomes stable enough to reuse.
- Preserve raw snapshots.
- Keep [[wiki/log|Wiki Log]] append-only.
- Keep [[wiki/index|Wiki Index]] concise.
- Do not introduce RAG infrastructure, databases, embeddings, or autonomous agent workflows unless explicitly requested later.

## Related Pages

- [[wiki/index|Wiki Index]]
- [[wiki/log|Wiki Log]]
- [[wiki/project/decisions|Decisions]]
- [[wiki/requirements/traceability|Traceability]]
