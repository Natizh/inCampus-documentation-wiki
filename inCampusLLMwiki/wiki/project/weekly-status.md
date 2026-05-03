# Weekly Status

This page preserves lightweight continuity across weekly work.
It summarizes the latest stable project state without replacing [[wiki/log|Wiki Log]].

## Current Snapshot

Date: 2026-05-03

Latest ingested source batch:

```text
raw/affine/03-05-2026/
```

Batch contents:
- `ERD - workdoc.md`
- `ERD V1.1.md`
- `Entities & Attributes v1.1.md`
- `Relationship Table.md`
- `updates/CRUD matrix v1.5.md`
- `updates/Databases.md`
- updated AP, H&L, D&P, SM, NSF, and old SM workdocs under `updates/`
- `updates/Recent Structural modifications.md`

Previous architecture baseline:

```text
raw/affine/25-04-2026/
```

The previous batch remains the source for the integrated DFD package, subgroup diagram exports, and the current `usecase-diag-v1.4` relationship source.

Latest full requirements and narrative baseline remains:

```text
raw/affine/13-04-2026/
```

Phase: Architecture-analysis phase.

Current priorities:
- [[wiki/architecture/overview|architecture-analysis baseline]]
- [[wiki/architecture/data-flow|DFD/data-flow modeling]]
- [[wiki/architecture/data-stores|logical store ownership]]
- [[wiki/architecture/data-model|logical ERD and entity relationships]]
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

The 2026-04-25 architecture export added the architecture-analysis baseline.
It stabilized six Level-1 process areas, ten logical data stores, current subgroup DFD interpretations, CRUD invariants, and a newer `usecase-diag-v1.4` relationship source.

The 2026-05-03 export adds the current logical data model and CRUD Matrix `v1.5`.
It introduces ERD v1.1, entity attributes v1.1, relationship IDs, `PasswordHash` on Student Account, `CampusInsightSharingConsent`, and consent-gated future campus insight access.

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
- US-25 / Set Activity Date and Time is treated as internal to Create Activity for H&L DFD/CRUD modeling, while final UC documentation treatment remains unresolved.
- The requirements tables need cleanup before the baseline scope labels are fully reconciled.

Current same-batch conflict:
- CRUD Matrix `v1.5` says pending request withdrawal must not generate a host notification.
- D&P workdoc `v5` and NSF workdoc `v7` still model a withdrawal trigger/branch.
- Treat the pending-withdrawal notification branch as unresolved until the team confirms source priority.

## Active Work Areas

- Review [[wiki/architecture/data-flow|the unified DFD structure]] against subgroup workdocs.
- Keep [[wiki/architecture/data-stores|store ownership]] and CRUD behavior aligned.
- Reconcile source-table scope labels for Send Message and Activity Reminder.
- Confirm pending-request withdrawal notification behavior against CRUD Matrix `v1.5` and the D&P/NSF workdocs.
- Decide how far the consent-based campus insight access model should go in MVP or postMVP.
- Decide whether Campus Admin needs a formal entity/store or remains a role/external identifier.
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
- The 2026-05-03 AFFiNE export added ERD/entity/relationship modeling, CRUD Matrix `v1.5`, consent-based campus insight access, and recent structural modifications.

## Important Ambiguities

- `Home.md` contains an `OUTDATED` marker; use it as context and prefer dedicated requirement/use case files for detailed traceability.
- Requirement IDs are inconsistent across source files in some places, especially leading zeroes such as `FR-101` vs `FR-0101`.
- Use case names are currently the practical identifiers; a final numeric UC-ID scheme is not established.
- `usecase-diag-v1.4` is the latest current relationship source, but formal UC IDs and final implementation-contract status remain unresolved.
- Some narrative files include explicit open questions that need team decisions before implementation.
- The 2026-05-03 batch still contains an unresolved conflict around pending-withdrawal host notification behavior.
- The 2026-04-25 batch contains stale internal leftovers around deletion notification triggers and archive wording. The wiki follows the latest workdocs and CRUD Matrix when those conflicts are clear.

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
