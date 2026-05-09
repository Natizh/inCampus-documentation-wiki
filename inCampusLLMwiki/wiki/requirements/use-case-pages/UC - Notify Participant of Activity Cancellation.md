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

Architecture note: the 2026-05-09 H&L and NSF sources separate cancellation from deletion. Cancellation updates `Activity.Status` to `cancelled`, exposes confirmed-participant context to NSF through `ActivityCancelled`, and NSF creates cancellation notifications for recipients not suppressed by block state. Deletion remains hard-delete behavior and does not have a confirmed notification branch.

Open point: exact notification channel and retry/failure behavior remain unresolved.

Source:
- [[raw/affine/13-04-2026/Use Cases/Notify Participant of Activity Cancellation|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - N&S v1.2|UCR - N&S v1.2]]
- [[raw/affine/09-05-2026/use case realizations/UCR - H&L v1.4|UCR - H&L v1.4]]
- [[raw/affine/09-05-2026/updates/CRUD matrix v1.6|CRUD matrix v1.6]]
