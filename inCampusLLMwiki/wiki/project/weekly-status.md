# Weekly Status

This page preserves lightweight continuity across weekly work.
It summarizes the latest stable project state without replacing [[wiki/log|Wiki Log]].

## Current Snapshot

Date: 2026-05-09

Latest ingested source batch:

```text
raw/affine/09-05-2026/
```

Batch contents:
- `updates/User Story v1.3.md`
- `updates/Functional Requirements v1.3.md`
- `updates/Non-Functional Requirements v1.2.md`
- `updates/Use cases v1.2.md`
- `updates/use-case-diagram-v1.7.md`
- `updates/CRUD matrix v1.6.md`
- `updates/Entities & Attributes v1.2.md`
- `updates/Databases v1.1.md`
- `updates/Relationship Table v1.1.md`
- system architecture, sequence, collaboration, and state-chart diagrams

Latest architecture/data-model batch:

```text
raw/affine/09-05-2026/
```

Architecture/data-model contents:
- `system architecture/01 Design Scope and Architectural Choice v1.1.md`
- `system architecture/System Architecture Diagram/index v1.1.md`
- `updates/Entities & Attributes v1.2.md`
- `updates/Relationship Table v1.1.md`
- `updates/CRUD matrix v1.6.md`
- `updates/Databases v1.1.md`
- first-skeleton sequence, collaboration, and state-chart diagram packages

Previous architecture baseline:

```text
raw/affine/25-04-2026/
```

The previous batch remains the source for the integrated DFD package, subgroup diagram exports, and the previous `usecase-diag-v1.4` relationship source. The latest use-case relationship export is `raw/affine/09-05-2026/updates/use-case-diagram-v1.7.md`, which is the normative MVP first-skeleton diagram source.

Latest full narrative baseline remains:

```text
raw/affine/13-04-2026/
```

Phase: Implementation phase.

Current priorities:
- [[wiki/architecture/first-skeleton-architecture|first-skeleton implementation contract]]
- [[wiki/architecture/data-model|logical data model and relationships]]
- [[wiki/architecture/data-stores|logical store ownership]]
- [[wiki/architecture/crud-matrix|CRUD consistency and invariants]]
- [[wiki/requirements/traceability|requirements and use-case traceability during implementation]]
- recording implementation clarifications and unresolved decisions back into the wiki

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

The current use case table contains 33 entries, with 31 use case narrative files.
The requirements set contains 30 user stories, 69 functional requirements, and 47 non-functional requirements.

The 2026-04-25 architecture export added the architecture-analysis baseline.
It stabilized six Level-1 process areas, ten logical data stores, current subgroup DFD interpretations, CRUD invariants, and the previous `usecase-diag-v1.4` relationship source.

The 2026-05-03 export adds the current logical data model and CRUD Matrix `v1.5`.
It introduces ERD v1.1, entity attributes v1.1, relationship IDs, `PasswordHash` on Student Account, `CampusInsightSharingConsent`, and consent-gated campus insight access.

The 2026-05-08 export refreshes requirements and use-case tables. It adds `US-29`, `US-30`, `FR-2901` through `FR-3001`, `NFR-45` through `NFR-47`, and two consent/insight use-case table entries.

The 2026-05-09 export is the final pre-skeleton alignment package. It confirms the first-skeleton architecture as a multi-tenant modular monolith with event-driven internal flows, `CampusID` as the tenant boundary, ten canonical stores, runtime `AuthenticatedAdminContext`, CRUD Matrix `v1.6`, entity catalog `v1.2`, use-case diagram `v1.7`, and first-skeleton behavioral/state diagrams.

## Scope Snapshot

Current requirements-table MVP user stories:
- US-01 through US-07
- US-09
- US-11
- US-14 through US-30

Current requirements-table postMVP user stories:
- US-08: send messages and share activity links
- US-10: friends/connections and social indicators
- US-12: participation points
- US-13: activity photo upload

Current architecture-scope overlay:
- US-08 / Send Message is postMVP in the 2026-05-08 requirements table and excluded from the current D&P MVP model.
- US-11 / Receive Activity Reminder is MVP in `User Story v1.3`, `Use cases v1.2`, `use-case-diagram-v1.7.md`, and NSF/CRUD architecture modeling.
- US-25 / Set Activity Date and Time is treated as internal to Create Activity for H&L DFD/CRUD and first-skeleton use-case diagram modeling, while the sourced derived card remains for traceability.
- US-29 / Update Campus Insight Consent and US-30 / View Consent-Based Student Insights now ground the consent-based insight direction in explicit user stories and use-case table entries.

Resolved first-skeleton notification point:
- Pending request withdrawal must not generate a host notification, must not have an NSF handler, and must not create a `DS-NS-001` record.

## Active Work Areas

- Use [[wiki/architecture/first-skeleton-architecture|First Skeleton Architecture]] as the current first-skeleton implementation contract.
- Keep [[wiki/architecture/data-stores|store ownership]] and CRUD behavior aligned while implementing.
- Preserve pending-request withdrawal as non-notifying in code and documentation notes.
- Record implementation-driven clarifications back into the wiki instead of silently drifting from the documented baseline.
- Keep Campus Admin as runtime `AuthenticatedAdminContext` for the first skeleton; exact admin authentication remains provisional.
- Resolve the true Activity lifecycle state chart only if implementation needs it; do not invent persisted states beyond the current docs.
- Keep [[wiki/requirements/traceability|traceability]] aligned across US, FR, NFR, use cases, architecture processes, and implementation decisions.

## New Since Initial Wiki Setup

- First real AFFiNE snapshot ingested.
- [[wiki/requirements/use-cases|Use case inventory]] now contains the sourced use case list, actors, source user stories, related requirements, scope, and priority scores.
- [[wiki/requirements/traceability|Traceability]] now links the 30 user stories to sourced use case names and requirement IDs.
- [[wiki/requirements/use-case-narratives|Narrative page]] now records modeling status and major unresolved narrative questions.
- A partial 2026-04-15 AFFiNE export added a draft high-level use case diagram with explicit candidate and confirmed relationship labels.
- The 2026-04-25 AFFiNE export added architecture workdocs, current subgroup DFD corrections, CRUD Matrix `v1.4`, and `usecase-diag-v1.4`.
- New [[wiki/architecture/overview|architecture wiki pages]] now summarize the current DFD, store, and CRUD baseline.
- The 2026-05-03 AFFiNE export added ERD/entity/relationship modeling, CRUD Matrix `v1.5`, consent-based campus insight access, and recent structural modifications.
- The 2026-05-08 AFFiNE export added explicit consent/insight user stories, FR/NFR rows, two use-case table entries, and a `v1.6` diagram export with internal cleanup still needed.
- The 2026-05-09 AFFiNE export added the final pre-skeleton alignment package: modular-monolith architecture, system architecture diagram, CRUD Matrix `v1.6`, entity catalog `v1.2`, use-case diagram `v1.7`, sequence/collaboration diagrams, and state charts.

## Important Ambiguities

- `Home.md` contains an `OUTDATED` marker; use it as context and prefer dedicated requirement/use case files for detailed traceability.
- Requirement IDs are inconsistent across source files in some places, especially leading zeroes such as `FR-101` vs `FR-0101`.
- Use case names are currently the practical identifiers; a final numeric UC-ID scheme is not established.
- `use-case-diagram-v1.7.md` is the latest relationship export and the normative MVP first-skeleton diagram; formal UC IDs remain unresolved.
- Some narrative files include explicit open questions that need team decisions before implementation.
- The 2026-05-09 batch resolves the earlier pending-withdrawal host notification conflict as non-notifying.
- The 2026-04-25 batch contains stale internal leftovers around deletion notification triggers and archive wording. The wiki follows the latest workdocs and CRUD Matrix when those conflicts are clear.
- The consent/insight use cases introduced in the 2026-05-08 batch and retained in the 2026-05-09 first-skeleton package are intentionally table/diagram-only until dedicated narrative source files exist.
- The 2026-05-09 state-chart batch did not provide a true Activity lifecycle SCD; the corrected delivered chart models ActivityParticipation.

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
