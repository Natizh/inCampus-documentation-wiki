# Receive Activity Reminder

Status: Draft sourced use case; MVP first-skeleton branch.

Scope: MVP in `User Story v1.3`, `Use cases v1.2`, `use-case-diagram-v1.7.md`, and the current architecture batch.

Initiating actor: Student.

Source user story: US-11.

Related requirements: FR-1101; NFR-24.

Goal: Receive a reminder notification shortly before the start of an activity already joined.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]
- [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]]
- [[wiki/requirements/use-case-pages/UC - View Personal Activity List|View Personal Activity List]]

Architecture note: NSF workdoc `v7`, CRUD Matrix `v1.6`, `Use cases v1.2`, and `use-case-diagram-v1.7.md` model the reminder as a system/time-triggered branch for students still joined in a scheduled upcoming activity. The branch is suppressed if the student is no longer joined or if the activity is cancelled. It does not need a block check by default because it concerns the recipient's own joined activity.

Open point: reminder delivery channel and notification-list UX details are not specified. The current architecture model routes a tapped reminder to the relevant upcoming activity view when the context still exists.

Source:
- [[raw/affine/13-04-2026/Use Cases/Receive Activity Reminder|Raw use case narrative]]
- [[raw/affine/03-05-2026/updates/Recent Structural modifications|Recent Structural modifications]]
- [[raw/affine/03-05-2026/updates/NSF - DFD workdoc v7|NSF architecture workdoc v7]]
- [[raw/affine/09-05-2026/updates/User Story v1.3|User Story v1.3]]
- [[raw/affine/09-05-2026/updates/Use cases v1.2|Use cases v1.2]]
- [[raw/affine/09-05-2026/updates/CRUD matrix v1.6|CRUD matrix v1.6]]
- [[raw/affine/09-05-2026/updates/use-case-diagram-v1.7|Use case diagram v1.7]]
