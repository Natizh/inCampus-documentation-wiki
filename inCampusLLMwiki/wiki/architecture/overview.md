# Architecture Overview

This page summarizes the current first-skeleton architecture baseline derived from the latest AFFiNE architecture batch.

## Source Snapshot

Latest architecture/data-model batch:

```text
raw/affine/09-05-2026/
```

Primary source files:
- `system architecture/01 Design Scope and Architectural Choice v1.1.md`
- `system architecture/System Architecture Diagram/index v1.1.md`
- `updates/Entities & Attributes v1.2.md`
- `updates/Relationship Table v1.1.md`
- `updates/CRUD matrix v1.6.md`
- `updates/Databases v1.1.md`
- sequence, collaboration, and state-chart diagram workdocs under `raw/affine/09-05-2026/`

Previous architecture baseline:

```text
raw/affine/25-04-2026/
```

That batch remains the source for the integrated DFD package and `usecase-diag-v1.4`. The 2026-05-03 batch remains ERD history, while the 2026-05-09 batch supersedes it for the first-skeleton entity catalog, CRUD Matrix `v1.6`, relationship table, system architecture, and behavioral/state-model notes.

Latest requirements/use-case table refresh:

```text
raw/affine/09-05-2026/
```

The 2026-05-09 batch includes `User Story v1.3`, `Functional Requirements v1.3`, `Non-Functional Requirements v1.2`, `Use cases v1.2`, and the normative `use-case-diagram-v1.7.md` for the MVP first skeleton.

The architecture/data-model batch also supersedes the earlier diagram-only batch for architecture modeling:

```text
raw/affine/15-04-2026/
```

Older raw snapshots remain immutable history. Wiki pages should connect broad architecture and relationship references to the most recent grounded version. Earlier source versions should be treated as predecessors and linked only through version-history notes, not as parallel current references.

## Phase

Status: Sourced first-skeleton implementation baseline.

The 2026-05-09 batch is the final pre-skeleton documentation package. The team is now in the implementation phase, and this page captures the architecture baseline that the first code skeleton should follow.

The implementation-facing architecture baseline is centered on:
- functional decomposition
- business events
- logical data stores
- logical ERD and entity relationships
- entity attributes and constraints
- context and Level-1 DFD preparation
- CRUD consistency
- data-flow mergeability across subgroups
- first-skeleton module, event, tenant, and authorization boundaries

The first code skeleton adopts a multi-tenant modular monolith with event-driven internal flows. `CampusID` is the tenant boundary. The event dispatcher is an internal implementation abstraction, not a public API contract. See [[wiki/architecture/first-skeleton-architecture|First Skeleton Architecture]] for the current first-skeleton contract.

## Level-1 Process Structure

The current unified DFD baseline uses six internal process areas:

| Process | Area | Core responsibility |
| --- | --- | --- |
| 1.0 | Campus Administration | Configure campuses and maintain structured campus options. |
| 2.0 | Access and Profile | Manage university access, account state, campus selection, minimal profile lifecycle, and controlled profile exposure. |
| 3.0 | Hosting and Lifecycle | Own activity creation, host-side request management, activity lifecycle, and activity deletion. |
| 4.0 | Discovery and Participation | Support browsing, details, join/request, withdrawal, leave, and personal activity lists for existing activities. |
| 5.0 | Safety and Moderation | Own rules access, reports, review outcomes, and block relationships. |
| 6.0 | Notifications and System Flow | React to upstream business events, create notification records, deliver notifications, and reopen notification contexts. |

Minimum confirmed external entities:
- Student
- Campus Admin
- Notification Delivery Mechanism

The 2026-05-03 batch adds a logical ERD and entity-relationship layer over this process structure. See [[wiki/architecture/data-model|Architecture Data Model]] for entity definitions, relationship constraints, attribute deltas, and unresolved schema questions.

## Store Ownership Rule

The architecture baseline uses one stable ownership principle:

| Domain | Owns |
| --- | --- |
| Campus Administration | campus configuration and structured campus options |
| Access and Profile | account, selected campus association, minimal profile, university-domain rules, password credential state, and campus insight consent |
| Hosting and Lifecycle | activity truth and participation truth |
| Safety and Moderation | block relationships and report records |
| Notifications and System Flow | notification consequences |

Other process areas may read, and sometimes update, a store only where the CRUD matrix explicitly justifies that process behavior. Ownership does not move just because another process has justified write access.

See [[wiki/architecture/data-stores|Architecture Data Stores]] for the store catalog.

## Current Architecture Decisions

- `Pending Approval` is not an activity status. It is a guest participation state in `DS-HL-002 Activity Participations`.
- Activity status vocabulary should use `open`, `full`, `completed`, and `cancelled`. Deletion is hard-delete behavior, not a persisted activity status in the current ERD.
- `Set Activity Date and Time` is treated for DFD and first-skeleton diagram purposes as a required part of `Create Activity`, not a separate H&L process.
- Activity deletion is distinct from cancellation. Deletion is hard deletion of `DS-HL-001` and linked `DS-HL-002` records; cancellation preserves cancelled activity context.
- H&L and D&P do not create notification records. They expose or emit event triggers consumed by NSF.
- `Receive Activity Reminder` is active MVP architecture scope for NSF and is now MVP in `User Story v1.3`, `Use cases v1.2`, and `use-case-diagram-v1.7.md`.
- `Send Message` is excluded/postponed from the current D&P MVP model and is now postMVP in the 2026-05-08 requirements table.
- Block behavior is reciprocal for visibility and interaction: blocked users cannot see each other's activities in discovery, open each other's activity details, view each other's minimal profiles, or start new join/request interactions.
- Cross-user notifications must be suppressed when a block relationship exists between the trigger user and the recipient.
- Sign-up now includes university email verification plus password creation; password storage belongs to `DS-AP-001 Student Account` as `PasswordHash`.
- Consent-based campus insight access now has explicit student/admin requirements rows. `CampusInsightSharingConsent` belongs to `DS-AP-001`; identifiable insight access must check campus scope, consent, and least privilege before reading student profile or participation data.
- Campus Admin identity is runtime `AuthenticatedAdminContext`, not a canonical first-skeleton data store.
- Pending request withdrawal is non-notifying: no host notification, no NSF handler, and no `DS-NS-001` record.

## Use Case Relationship Snapshot

The latest exported use-case relationship source is:

```text
raw/affine/09-05-2026/updates/use-case-diagram-v1.7.md
```

It supersedes the internally inconsistent `v1.6` export and is the normative MVP first-skeleton diagram source. Because formal UC IDs remain unresolved across the broader project, the wiki still uses textual use-case names and derived `UC -` pages for navigation.

Current relationship highlights:
- `Set Activity Date and Time` is internal to `Create Activity` for DFD/CRUD and first-skeleton diagram purposes.
- `Receive Activity Reminder` is active MVP notification scope.
- `Update Campus Insight Consent` and `View Consent-Based Student Insights` are MVP use cases; detailed narratives remain missing, but sequence/collaboration diagrams now exist.

## Source Priority Notes

The 2026-04-25 batch contains a few internal leftovers from earlier versions.

The 2026-05-03 batch introduced a pending-withdrawal notification conflict, and the 2026-05-08 `v1.6` diagram export conflicted with itself. The 2026-05-09 final pre-skeleton batch supersedes both issues: pending request withdrawal is non-notifying, and `use-case-diagram-v1.7.md` is the normative MVP first-skeleton diagram source.

Use the current workdocs and CRUD matrix for stable derived knowledge when they conflict with older diagrams:
- AP workdoc `v1.2` and the 2026-05-03 entity catalog supersede older AP wording for password credential state, campus insight consent, selected-campus association, and profile-view block checks.
- H&L workdoc `v2.1` and CRUD Matrix `v1.5` supersede the H&L diagram where the diagram still shows direct notification writes, deletion notifications, or archive wording.
- SM workdoc `v2.1` supersedes the SM diagram note that only D&P is a concrete adjacent block-state consumer.
- NSF workdoc `v7` and NSF diagram `V4.0` are the current notification baseline.
- D&P workdoc `v5` and D&P diagram `V3.0` are the current discovery/participation baseline.
- CRUD Matrix `v1.6` supersedes `v1.5` for first-skeleton CRUD summaries, notification boundaries, admin context, and concurrency notes.
- `User Story v1.3`, `Functional Requirements v1.3`, `Non-Functional Requirements v1.2`, and `Use cases v1.2` supersede older requirements tables for counts and first-skeleton scope.

## Related Pages

- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/architecture/first-skeleton-architecture|First Skeleton Architecture]]
- [[wiki/architecture/data-stores|Architecture Data Stores]]
- [[wiki/architecture/data-model|Architecture Data Model]]
- [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]]
- [[wiki/project/decisions|Decisions]]
- [[wiki/requirements/use-cases|Use Cases]]
- [[wiki/requirements/traceability|Traceability]]
