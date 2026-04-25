# Notify Participant of Activity Cancellation

Status: Draft sourced use case; NSF architecture branch.

Scope: MVP.

Initiating actor: Student participant.

Source user story: US-28.

Related requirements: FR-0503, FR-2801, FR-2802, FR-2803, FR-2804; NFR-44, NFR-19.

Goal: Receive a clear and timely notification when an activity already joined is cancelled.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Update Activity Status|Update Activity Status]]

Architecture note: the 2026-04-25 H&L and NSF workdocs separate cancellation from deletion. Cancellation updates activity status, exposes joined participant context to NSF, and NSF creates cancellation notifications for recipients not suppressed by block state. Deletion does not have a confirmed notification branch.

Open point: exact notification channel and retry/failure behavior remain unresolved.

Source:
- [[raw/affine/13:04:2026/Use Cases/Notify Participant of Activity Cancellation|Raw use case narrative]]
- [[raw/affine/25:04:2026/NSF - DFD workdoc v7|NSF architecture workdoc v7]]
- [[raw/affine/25:04:2026/H&L - DFD workdoc v2.1|H&L architecture workdoc v2.1]]
