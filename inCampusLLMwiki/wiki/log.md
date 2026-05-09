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

- Ingested `raw/affine/13-04-2026/`.
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

- Ingested `raw/affine/15-04-2026/`.
- Source files included `high-level-use-case-diagram-v1.2/usecase-diag-v1.2.puml` and `high-level-use-case-diagram-v1.2/usecase-diag-v1.2.svg`.
- Treated this batch as a partial diagram-only export layered on top of the existing 2026-04-13 requirements and narrative baseline.
- Updated `wiki/index.md`, `wiki/project/weekly-status.md`, `wiki/project/decisions.md`, `wiki/requirements/use-cases.md`, and `wiki/requirements/use-case-narratives.md`.
- Recorded the draft diagram's actor specialization, package grouping, and explicit relationship labels for candidate mandatory subflows, optional branches, confirmed dependencies, state or traceability effects, and confirmed constraints.
- Preserved unresolved points around final UML relationship semantics, formal UC IDs, block scope, activity state behavior, and notification relationship types.

## [2026-04-25] ingest | Architecture DFD and CRUD baseline

- Ingested `raw/affine/25-04-2026/`.
- Source files included architecture workflow notes, subgroup DFD workdocs and diagrams, `DFD integration and Merge/index.md`, `CRUD matrix (1).md`, and `updates/usecase-diag-v1.4.puml`.
- Created `wiki/architecture/overview.md`, `wiki/architecture/data-flow.md`, `wiki/architecture/data-stores.md`, and `wiki/architecture/crud-matrix.md`.
- Updated project overview, decisions, weekly status, workflow, requirements use-case pages, use case narratives, traceability, and index.
- Recorded the current six-area Level-1 DFD baseline, ten-store logical data-store catalog, CRUD Matrix `v1.4`, store ownership boundaries, block behavior, notification ownership, activity deletion behavior, and current source-priority rules.
- Marked current architecture-scope updates: `Send Message` is deferred from the current D&P MVP model, while `Receive Activity Reminder` is active in MVP notification modeling.
- Preserved unresolved/source-cleanup points around formal UC IDs, final diagram contract status, requirements-table reconciliation for `US-08`/`US-11`, selected-campus store wording, withdrawal-notification row wording, and stale deletion/archive references in older architecture text.

## [2026-04-25] health-check | Post-ingest wiki consistency pass

- Reviewed `wiki/` for stale claims, contradictions, orphan coverage, suspicious wikilinks, and architecture-scope alignment after the 2026-04-25 AFFiNE ingest.
- Confirmed broad current architecture references point to `raw/affine/25-04-2026/`, while `raw/affine/13-04-2026/` remains the baseline requirements snapshot and `raw/affine/15-04-2026/` is treated as diagram history.
- Aligned `Send Message` wording in the use-case inventory and narrative summary with the rest of the wiki: baseline MVP in requirements, deferred in the current architecture model.
- Updated workflow export examples to match the repository's current dated snapshot convention.
- Preserved unresolved health items around requirements-table reconciliation for `US-08`/`US-11`, selected-campus store wording, and stale withdrawal/deletion/archive wording inside the 2026-04-25 architecture source batch.

## [2026-05-03] maintenance | Windows-safe raw snapshot folders

- Renamed raw date folders from the legacy colon-separated date format to DD-MM-YYYY for Windows compatibility and updated all references.

## [2026-05-03] ingest | ERD, entity catalog, and CRUD v1.5 snapshot

- Ingested `raw/affine/03-05-2026/`.
- Source files included ERD workdocs, `Entities & Attributes v1.1.md`, `Relationship Table.md`, `updates/CRUD matrix v1.5.md`, `updates/Databases.md`, updated subgroup workdocs, and `updates/Recent Structural modifications.md`.
- Created `wiki/architecture/data-model.md`.
- Updated architecture overview, data flow, data stores, CRUD matrix, project overview, decisions, weekly status, requirements/use-case overlays, traceability, index, and selected use case pages.
- Recorded ERD/entity model `v1.1`, CRUD Matrix `v1.5`, password credential alignment, consent-based campus insight access, current activity status/deletion wording, and Set Activity Date and Time as internal to Create Activity for architecture modeling.
- Preserved unresolved points around pending-request withdrawal notification behavior, Campus Admin entity/store modeling, consent UI placement, final admin insight feature scope, exact profile fields, notification payload/delivery details, report schema, and final UC treatment for Set Activity Date and Time.

## [2026-05-03] health-check | Post-03-05 wiki consistency pass

- Reviewed `wiki/` for stale source references, contradictions, broken internal wikilinks/raw links, missing index/log continuity, outdated current-focus wording, and unresolved-point clarity after the `raw/affine/03-05-2026/` ingest.
- Confirmed internal wikilinks and local raw links resolve across the current wiki pages.
- Updated `wiki/planning/workflow.md` so the architecture workflow cites both the 2026-04-25 DFD baseline and the 2026-05-03 ERD/entity and CRUD `v1.5` extension.
- Added `wiki/architecture/data-model.md` to the maintained architecture-page list in the workflow page to match the current wiki structure.
- Preserved unresolved/source-conflict items around pending-request withdrawal notifications, campus-admin identity/store modeling, consent UI placement, and requirements-table reconciliation for `US-08`, `US-11`, and `US-25`.

## [2026-05-08] ingest | Requirements and consent insight refresh

- Ingested `raw/affine/08-05-2026/`.
- Source files included `User Story v1.2.md`, `Functional Requirements v1.2.md`, `Non-Functional Requirements v1.1.md`, `Use cases v1.1.md`, and `use-case-diagram-v1.6.md`.
- Updated requirements counts to 30 user stories, 69 functional requirements, 47 non-functional requirements, 33 current use-case table entries, and 31 narrative files.
- Added derived use-case cards for `Update Campus Insight Consent` and `View Consent-Based Student Insights`.
- Updated project overview, weekly status, decisions, workflow, use cases, use case narratives, traceability, architecture notes, and index.
- Recorded that consent-based insight access now has explicit student/admin user stories and use-case table entries, while detailed narratives, admin identity/authorization modeling, exact insight fields, and consent UI placement remain unresolved.
- Preserved internal source contradictions around `use-case-diagram-v1.6.md`, `Receive Activity Reminder` scope, `Set Activity Date and Time` formal UC treatment, and pending-request withdrawal notification behavior.

## [2026-05-08] health-check | Post-08-05 wiki consistency pass

- Reviewed `wiki/` for stale counts, source-priority claims, new consent/insight use-case links, and post-ingest traceability after the `raw/affine/08-05-2026/` refresh.
- Confirmed 30 user stories, 69 functional requirements, 47 non-functional requirements, 33 current use-case table entries, and 31 narrative files against the current raw and derived sources.
- Confirmed `raw/affine/08-05-2026/` is treated as the latest requirements/use-case table source, `raw/affine/13-04-2026/` remains the full narrative baseline, and `raw/affine/03-05-2026/` remains the latest ERD/CRUD architecture source.
- Confirmed the new use-case cards and main hub pages resolve their current internal wikilinks, and that `US-29`, `US-30`, `FR-2901` through `FR-3001`, and `NFR-45` through `NFR-47` remain traced.
- Corrected a stale decisions-page note so `usecase-diag-v1.4` is kept as relationship history while `use-case-diagram-v1.6.md` remains the latest but internally inconsistent export.
- Preserved unresolved points around `use-case-diagram-v1.6.md`, `US-11`, `US-25`, and the missing dedicated narratives for the two new consent/insight use cases.

## [2026-05-09] ingest | Final pre-skeleton alignment batch

- Ingested `raw/affine/09-05-2026/`.
- Source files included `User Story v1.3.md`, `Functional Requirements v1.3.md`, `Non-Functional Requirements v1.2.md`, `Use cases v1.2.md`, `use-case-diagram-v1.7.md`, `CRUD matrix v1.6.md`, `Entities & Attributes v1.2.md`, `Databases v1.1.md`, `Relationship Table v1.1.md`, `01 Design Scope and Architectural Choice v1.1.md`, the UCR package, and the first-skeleton sequence/collaboration/state-chart diagrams.
- Created `wiki/architecture/first-skeleton-architecture.md`.
- Updated architecture, project, requirements, and workflow hub pages so `raw/affine/09-05-2026/` is the current first-skeleton architecture and requirements/use-case table source.
- Recorded the modular-monolith architecture choice, `CampusID` tenant boundary, runtime `AuthenticatedAdminContext`, canonical ten-store model, event catalog, atomic participation/capacity rules, `use-case-diagram-v1.7.md` as the normative first-skeleton diagram source, and pending-request withdrawal as non-notifying.
- Updated affected `UC - ...` cards to align with the 09-05 UCR and sequence/collaboration sources for onboarding, campus setup, participation, notifications, reporting/review, and consent-based insights.
- Preserved unresolved points around exact admin authentication implementation, exact consent UI placement, exact insight fields and least-privilege view content, exact campus setup fields/validation rules, final UC treatment for `Set Activity Date and Time`, and the missing true `Activity` lifecycle state chart source.

## [2026-05-09] health-check | Post-09-05 recovery consistency pass

- Resumed and completed an interrupted 09-05 ingest without restarting from scratch; treated the dirty wiki pages as partial progress and preserved valid prior edits.
- Re-read the modified wiki pages, compared them against the 09-05 raw batch, and continued the ingest in conservative batches instead of rewriting the previous pass.
- Corrected stale source/version references that still pointed at the 08-05 or 03-05 current-state assumptions where the 09-05 batch had already superseded them.
- Aligned use-case cards with the available 09-05 UCR, sequence, collaboration, and state-chart sources where those sources materially clarified first-skeleton behavior.
- Confirmed current internal `wiki/...` links and current `raw/affine/09-05-2026/...` links resolve across the wiki after the recovery pass.
- Preserved unresolved points rather than guessing where the 09-05 sources still remain provisional, especially around admin authentication, insight detail scope, consent UX, and the missing true `Activity` lifecycle SCD.
