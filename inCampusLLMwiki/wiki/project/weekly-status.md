# Weekly Status

This page preserves lightweight continuity across weekly work.
It summarizes the latest stable project state without replacing [[wiki/log|Wiki Log]].

## Current Snapshot

Date: 2026-04-25

Latest ingested source batch:

```text
raw/affine/25:04:2026/
```

Batch contents:
- `Architecture workdoc/index.md`
- `DFD integration and Merge/index.md`
- `CRUD matrix (1).md`
- `updates/usecase-diag-v1.4.puml`
- subgroup DFD workdocs and diagram exports for CA, AP, H&L, D&P, SM, and NSF

Latest full requirements and narrative baseline remains:

```text
raw/affine/13:04:2026/
```

Phase: Architecture-analysis phase.

Current priorities:
- [[wiki/architecture/overview|architecture-analysis baseline]]
- [[wiki/architecture/data-flow|DFD/data-flow modeling]]
- [[wiki/architecture/data-stores|logical store ownership]]
- [[wiki/architecture/crud-matrix|CRUD consistency]]
- requirements and use-case traceability cleanup where architecture scope supersedes older source tables

## Latest Stable Understanding

InCampus is a mobile app for reducing isolation in university campus life by helping students find low-pressure opportunities to share ordinary campus moments with nearby students.

The MVP centers on:
- campus-based onboarding
- minimal profiles
- activity creation
- campus activity browsing
- joining or requesting to join
- activity status management
- basic trust and safety through rules, reports, and blocking

See [[wiki/requirements/use-cases|Use Cases]] for the canonical use case inventory.

The current use case source set contains 31 use case narrative files.
The requirements set contains 28 user stories, 65 functional requirements, and 44 non-functional requirements.

The 2026-04-25 architecture export adds the current architecture-analysis baseline.
It stabilizes six Level-1 process areas, ten logical data stores, current subgroup DFD interpretations, CRUD invariants, and a newer `usecase-diag-v1.4` relationship source.

## Scope Snapshot

Original baseline MVP user stories:
- US-01 through US-09
- US-14 through US-28

Original baseline postMVP user stories:
- US-10: friends/connections and social indicators
- US-11: activity reminders
- US-12: participation points
- US-13: activity photo upload

Current architecture-scope overlay:
- US-08 / Send Message is excluded from the current D&P MVP model and postponed.
- US-11 / Receive Activity Reminder is active in MVP notification modeling.
- The requirements tables need cleanup before the baseline scope labels are fully reconciled.

## Active Work Areas

- Review [[wiki/architecture/data-flow|the unified DFD structure]] against subgroup workdocs.
- Keep [[wiki/architecture/data-stores|store ownership]] and CRUD behavior aligned.
- Reconcile source-table scope labels for Send Message and Activity Reminder.
- Decide whether `usecase-diag-v1.4` is a final relationship model or still a current working diagram.
- Keep [[wiki/requirements/traceability|traceability]] aligned across US, FR, NFR, use cases, and architecture processes.

## New Since Initial Wiki Setup

- First real AFFiNE snapshot ingested.
- [[wiki/requirements/use-cases|Use case inventory]] now contains the sourced use case list, actors, source user stories, related requirements, scope, and priority scores.
- [[wiki/requirements/traceability|Traceability]] now links the 28 user stories to sourced use case names and requirement IDs.
- [[wiki/requirements/use-case-narratives|Narrative page]] now records modeling status and major unresolved narrative questions.
- A partial 2026-04-15 AFFiNE export added a draft high-level use case diagram with explicit candidate and confirmed relationship labels.
- The 2026-04-25 AFFiNE export added architecture workdocs, current subgroup DFD corrections, CRUD Matrix `v1.4`, and `usecase-diag-v1.4`.
- New [[wiki/architecture/overview|architecture wiki pages]] now summarize the current DFD, store, and CRUD baseline.

## Important Ambiguities

- `Home.md` contains an `OUTDATED` marker; use it as context and prefer dedicated requirement/use case files for detailed traceability.
- Requirement IDs are inconsistent across source files in some places, especially leading zeroes such as `FR-101` vs `FR-0101`.
- Use case names are currently the practical identifiers; a final numeric UC-ID scheme is not established.
- `usecase-diag-v1.4` is the latest current relationship source, but formal UC IDs and final implementation-contract status remain unresolved.
- Some narrative files include explicit open questions that need team decisions before implementation.
- The 2026-04-25 batch contains stale internal leftovers around withdrawal notification wording, deletion notification triggers, and archive wording. The wiki follows the latest workdocs and CRUD Matrix when those conflict.

## Next Update Pattern

When a new AFFiNE export is ingested, update this page with:
- export batch name
- documents ingested
- major changes to project understanding
- new or changed use cases
- new traceability gaps
- decisions made or still unresolved
- architecture-source version changes, when the batch contains DFD, CRUD, or design-model updates

Also append a matching entry to [[wiki/log|Wiki Log]].
