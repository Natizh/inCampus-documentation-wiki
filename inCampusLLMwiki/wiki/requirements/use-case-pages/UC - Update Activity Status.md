# Update Activity Status

Status: Draft sourced use case; state vocabulary partially clarified.

Scope: MVP.

Initiating actor: Student host.

Source user stories: US-05, US-28.

Related requirements: FR-0503, FR-2801, FR-2802, FR-2803, FR-2804; NFR-12, NFR-44.

Goal: Manually update the status of an activity, such as marking it completed or cancelled, so the campus feed remains accurate and participants are informed of relevant changes.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]]
- [[wiki/requirements/use-case-pages/UC - Notify Participant of Activity Cancellation|Notify Participant of Activity Cancellation]]
- [[wiki/requirements/use-case-pages/UC - Delete Activity|Delete Activity]]

Architecture note: the 2026-04-25 H&L workdoc uses the conservative status vocabulary `open`, `full`, `completed`, `cancelled`, and `deleted`. `Pending Approval` is not an activity state; it is a participation state in `DS-HL-002`.

Open point: a full state-transition diagram and exact transition permissions are not finalized.

Source:
- [[raw/affine/13:04:2026/Use Cases/Update Activity Status|Raw use case narrative]]
- [[raw/affine/25:04:2026/H&L - DFD workdoc v2.1|H&L architecture workdoc v2.1]]
- [[raw/affine/25:04:2026/CRUD matrix (1)|CRUD matrix v1.4]]
