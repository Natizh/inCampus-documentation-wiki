# Manage Join Requests

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student host.

Source user story: US-05.

Related requirements: FR-0501, FR-0502, FR-2002, FR-1403; NFR-12, NFR-13.

Goal: Review pending join requests and approve or decline requests so the host can control who attends the activity.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]
- [[wiki/requirements/use-case-pages/UC - View Student Minimal Profile|View Student Minimal Profile]]
- [[wiki/requirements/use-case-pages/UC - Notify Participant of Application Outcome|Notify Participant of Application Outcome]]
- [[wiki/requirements/use-case-pages/UC - Notify Host of Join Event|Notify Host of Join Event]]

Architecture note: the 2026-05-09 H&L UCR and Manage Join Requests sequence read pending `RecordType=request, Status=pending` records, current activity context, and applicant Student Profile data. Approval or decline re-checks host authority, request state, capacity, and duplicate active-record constraints inside the write transaction; approval becomes `RecordType=participation, Status=confirmed`, decline stays `RecordType=request, Status=declined`, and outcome notification remains NSF-owned.

Open point: request ordering, batch handling, and decision states beyond approve/decline are not specified.

Source:
- [[raw/affine/13-04-2026/Use Cases/Manage Join Requests|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - H&L v1.4|UCR - H&L v1.4]]
- [[raw/affine/09-05-2026/sequence diagrams/Manage Join Requests — Sequence Diagram v1.1/index|Manage Join Requests sequence diagram v1.1]]
