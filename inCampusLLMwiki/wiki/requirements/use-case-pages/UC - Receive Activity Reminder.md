# Receive Activity Reminder

Status: Draft sourced use case; active MVP architecture branch.

Scope: Baseline requirements postMVP; active MVP notification branch in the 2026-04-25 architecture batch.

Initiating actor: Student.

Source user story: US-11.

Related requirements: FR-1101; NFR-24.

Goal: Receive a reminder notification shortly before the start of an activity already joined.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]
- [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]]
- [[wiki/requirements/use-case-pages/UC - View Personal Activity List|View Personal Activity List]]

Architecture note: NSF workdoc `v7` and CRUD Matrix `v1.4` model the reminder as a system/time-triggered branch for students still joined in a scheduled upcoming activity. The branch is suppressed if the student is no longer joined or if the activity is cancelled.

Open point: reminder delivery channel and notification-list UX details are not specified. The current architecture model routes a tapped reminder to the relevant upcoming activity view when the context still exists.

Source:
- [[raw/affine/13:04:2026/Use Cases/Receive Activity Reminder|Raw use case narrative]]
- [[raw/affine/25:04:2026/NSF - DFD workdoc v7|NSF architecture workdoc v7]]
- [[raw/affine/25:04:2026/CRUD matrix (1)|CRUD matrix v1.4]]
