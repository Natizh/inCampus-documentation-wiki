# Wiki Log

Append-only chronological record of important wiki activity.

Use this heading format:

```markdown
## [YYYY-MM-DD] type | Short title
```

## [2026-04-13] setup | Initial InCampus project wiki

- Created the initial wiki structure for InCampus.
- Added root governance in `AGENTS.md`.
- Added `README.md` explaining AFFiNE, raw snapshots, and the derived wiki.
- Added initial project, requirements, planning, index, and log pages.
- Source basis: user-provided setup instructions in chat.
- No AFFiNE raw snapshots have been ingested yet.
- Current phase: use cases, use case narratives, and traceability.

## [2026-04-13] ingest | First AFFiNE requirements and use cases snapshot

- Ingested `raw/affine/13:04:2026/`.
- Source files included `Home.md`, three requirements tables, and 31 use case narrative files.
- Consolidated project overview, MVP scope, actors, requirements counts, use case inventory, narrative status, and traceability.
- Sourced totals: 28 user stories, 65 functional requirements, 44 non-functional requirements, 31 use case narratives.
- Updated `wiki/index.md`, `wiki/project/overview.md`, `wiki/project/decisions.md`, `wiki/project/weekly-status.md`, `wiki/requirements/use-cases.md`, `wiki/requirements/use-case-narratives.md`, `wiki/requirements/traceability.md`, and `wiki/planning/workflow.md`.
- Preserved unresolved points around formal UC IDs, include/extend relationships, activity state model, ID normalization, and several narrative-level open questions.

## [2026-04-13] update | Improve internal wiki links

- Added 31 derived use case index-card pages under `wiki/requirements/use-case-pages/`.
- Linked [[wiki/index|Wiki Index]], [[wiki/requirements/use-cases|Use Cases]], [[wiki/requirements/use-case-narratives|Use Case Narratives]], and [[wiki/requirements/traceability|Traceability]] to the individual use case pages.
- Added conservative related-use-case links inside individual use case pages where the relationship was grounded by the ingested source.
- Replaced several plain internal references with Obsidian wikilinks across project, requirements, and planning pages.
- Did not finalize include/extend relationships or create concept pages for unresolved topics.

## [2026-04-13] cleanup | Regularize graph links

- Removed mechanical backlinks from individual use case pages to broad hubs such as overview, traceability, narratives, and decisions.
- Kept one parent-index link from each use case card to [[wiki/requirements/use-cases|Use Cases]].
- Reduced overview and weekly-status links so they point to the use case inventory instead of every individual use case.
- Removed weak safety-area links that were only candidate or thematic, including community-rules links to report review and unresolved deletion-to-cancellation-notification links.
- Clarified that `UC - ...` pages are derived wiki index cards, while similarly named raw AFFiNE files are immutable source narratives.

## [2026-04-15] ingest | High-level use case diagram draft snapshot

- Ingested `raw/affine/15:04:2026/`.
- Source files included `high-level-use-case-diagram-v1.2/usecase-diag-v1.2.puml` and `high-level-use-case-diagram-v1.2/usecase-diag-v1.2.svg`.
- Treated this batch as a partial diagram-only export layered on top of the existing 2026-04-13 requirements and narrative baseline.
- Updated `wiki/index.md`, `wiki/project/weekly-status.md`, `wiki/project/decisions.md`, `wiki/requirements/use-cases.md`, and `wiki/requirements/use-case-narratives.md`.
- Recorded the draft diagram's actor specialization, package grouping, and explicit relationship labels for candidate mandatory subflows, optional branches, confirmed dependencies, state or traceability effects, and confirmed constraints.
- Preserved unresolved points around final UML relationship semantics, formal UC IDs, block scope, activity state behavior, and notification relationship types.

## [2026-04-25] ingest | Architecture DFD and CRUD baseline

- Ingested `raw/affine/25:04:2026/`.
- Source files included architecture workflow notes, subgroup DFD workdocs and diagrams, `DFD integration and Merge/index.md`, `CRUD matrix (1).md`, and `updates/usecase-diag-v1.4.puml`.
- Created `wiki/architecture/overview.md`, `wiki/architecture/data-flow.md`, `wiki/architecture/data-stores.md`, and `wiki/architecture/crud-matrix.md`.
- Updated project overview, decisions, weekly status, workflow, requirements use-case pages, use case narratives, traceability, and index.
- Recorded the current six-area Level-1 DFD baseline, ten-store logical data-store catalog, CRUD Matrix `v1.4`, store ownership boundaries, block behavior, notification ownership, activity deletion behavior, and current source-priority rules.
- Marked current architecture-scope updates: `Send Message` is deferred from the current D&P MVP model, while `Receive Activity Reminder` is active in MVP notification modeling.
- Preserved unresolved/source-cleanup points around formal UC IDs, final diagram contract status, requirements-table reconciliation for `US-08`/`US-11`, selected-campus store wording, withdrawal-notification row wording, and stale deletion/archive references in older architecture text.

## [2026-04-25] health-check | Post-ingest wiki consistency pass

- Reviewed `wiki/` for stale claims, contradictions, orphan coverage, suspicious wikilinks, and architecture-scope alignment after the 2026-04-25 AFFiNE ingest.
- Confirmed broad current architecture references point to `raw/affine/25:04:2026/`, while `raw/affine/13:04:2026/` remains the baseline requirements snapshot and `raw/affine/15:04:2026/` is treated as diagram history.
- Aligned `Send Message` wording in the use-case inventory and narrative summary with the rest of the wiki: baseline MVP in requirements, deferred in the current architecture model.
- Updated workflow export examples to match the repository's current dated snapshot convention.
- Preserved unresolved health items around requirements-table reconciliation for `US-08`/`US-11`, selected-campus store wording, and stale withdrawal/deletion/archive wording inside the 2026-04-25 architecture source batch.
