# Architecture Overview

This page summarizes the current architecture-analysis baseline derived from the latest AFFiNE architecture batch.

## Source Snapshot

Latest architecture batch:

```text
raw/affine/25:04:2026/
```

Primary source files:
- `Architecture workdoc/index.md`
- `DFD integration and Merge/index.md`
- `CRUD matrix (1).md`
- `updates/usecase-diag-v1.4.puml`
- subgroup DFD workdocs for CA, AP, H&L, D&P, SM, and NSF
- subgroup diagram exports under `AP - DFD/`, `CA - DFD/`, `D&P - DFD/`, `H&L DFD/`, `SM - DFD/`, and `NSF - DFD/`

The architecture batch supersedes the earlier diagram-only batch for architecture modeling:

```text
raw/affine/15:04:2026/
```

Older raw snapshots remain immutable history. Wiki pages should connect broad architecture and relationship references to the most recent grounded version. Earlier source versions should be treated as predecessors and linked only through version-history notes, not as parallel current references.

## Phase

Status: Draft sourced architecture-analysis baseline.

The batch states that the team has moved from use-case/narrative review into a Lecture 9 architecture-analysis phase. The current work product is a logical modeling package, not implementation architecture.

The architecture work is centered on:
- functional decomposition
- business events
- logical data stores
- context and Level-1 DFD preparation
- CRUD consistency
- data-flow mergeability across subgroups

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

## Store Ownership Rule

The architecture baseline uses one stable ownership principle:

| Domain | Owns |
| --- | --- |
| Campus Administration | campus configuration and structured campus options |
| Access and Profile | account, selected campus association, minimal profile, and university-domain rules |
| Hosting and Lifecycle | activity truth and participation truth |
| Safety and Moderation | block relationships and report records |
| Notifications and System Flow | notification consequences |

Other process areas may read, and sometimes update, a store only where the CRUD matrix explicitly justifies that process behavior. Ownership does not move just because another process has justified write access.

See [[wiki/architecture/data-stores|Architecture Data Stores]] for the store catalog.

## Current Architecture Decisions

- `Pending Approval` is not an activity status. It is a guest participation state in `DS-HL-002 Activity Participations`.
- Activity status vocabulary should conservatively use `open`, `full`, `completed`, `cancelled`, and `deleted`.
- `Set Activity Date and Time` is treated for DFD purposes as a required part of `Create Activity`, not a separate H&L process.
- Activity deletion is distinct from cancellation. Deletion is hard deletion of `DS-HL-001` and linked `DS-HL-002` records; cancellation preserves cancelled activity context.
- H&L and D&P do not create notification records. They expose or emit event triggers consumed by NSF.
- `Receive Activity Reminder` is now active MVP architecture scope for NSF, despite older requirements tables marking US-11 as postMVP.
- `Send Message` is excluded/postponed from the current D&P MVP model, despite older requirements tables marking US-08 as MVP.
- Block behavior is reciprocal for visibility and interaction: blocked users cannot see each other's activities in discovery, open each other's activity details, view each other's minimal profiles, or start new join/request interactions.
- Cross-user notifications must be suppressed when a block relationship exists between the trigger user and the recipient.

## Use Case Relationship Snapshot

The latest exported use-case relationship source is:

```text
raw/affine/25:04:2026/updates/usecase-diag-v1.4.puml
```

It supersedes the previous `v1.2` diagram for current relationship discussion. The diagram groups use cases by functional area and explicitly labels green arrows as include and yellow dashed arrows as extend. Because formal UC IDs remain unresolved and the broader project is still in draft modeling, the wiki records `v1.4` as the current working diagram version, not as a final implementation contract.

Current `v1.4` relationship highlights:
- Include-style working links: campus configuration to structured options, activity creation to date/time, join to host notification, manage requests to profile view, browse to activity details, notification handoffs, report to review report, block to join.
- Extend-style working links: activity details to deferred social/photo features, personal activity list to reminder and points.
- Deferred package: friends/social indicators, activity reminder, participation points, and activity photo. Note that the architecture workdoc separately brings activity reminder into MVP notification modeling scope.

## Source Priority Notes

The 2026-04-25 batch contains a few internal leftovers from earlier versions.

Use the current workdocs and CRUD matrix for stable derived knowledge when they conflict with older diagrams:
- AP workdoc `v1.1` supersedes the AP diagram where the diagram still misses the profile-view block check or shows unnecessary account reads for profile setup/edit.
- H&L workdoc `v2.1` and CRUD Matrix `v1.4` supersede the H&L diagram where the diagram still shows direct notification writes, deletion notifications, or archive wording.
- SM workdoc `v2.1` supersedes the SM diagram note that only D&P is a concrete adjacent block-state consumer.
- NSF workdoc `v7` and NSF diagram `V4.0` are the current notification baseline.
- D&P workdoc `v5` and D&P diagram `V3.0` are the current discovery/participation baseline.

## Related Pages

- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/architecture/data-stores|Architecture Data Stores]]
- [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]]
- [[wiki/project/decisions|Decisions]]
- [[wiki/requirements/use-cases|Use Cases]]
- [[wiki/requirements/traceability|Traceability]]
