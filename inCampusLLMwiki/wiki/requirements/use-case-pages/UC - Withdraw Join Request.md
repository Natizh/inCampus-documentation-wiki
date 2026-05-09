# Withdraw Join Request

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student.

Source user story: US-27.

Related requirements: FR-2701, FR-2703, FR-2704; NFR-43.

Goal: Withdraw a pending join request before the host makes a decision.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]
- [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]]
- [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]]
- [[wiki/requirements/use-case-pages/UC - View Activity Details|View Activity Details]]
- [[wiki/requirements/use-case-pages/UC - Leave Joined Activity|Leave Joined Activity]]

Open point: US-27 combines withdrawal and leaving; this page covers only pending request withdrawal.

Architecture note: the 2026-05-09 first-skeleton sources resolve pending-request withdrawal as non-notifying. Withdrawal removes or deactivates `RecordType=request, Status=pending`, re-checks the current request state inside the write transaction, updates availability/count state transactionally, and creates no host notification, no NSF handler, and no `DS-NS-001` record.

Source:
- [[raw/affine/13-04-2026/Use Cases/Withdraw Join Request|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - D&P v1.2|UCR - D&P v1.2]]
- [[raw/affine/09-05-2026/updates/CRUD matrix v1.6|CRUD matrix v1.6]]
- [[raw/affine/09-05-2026/state chart diagrams/ActivityParticipation SCD v1.1/index|ActivityParticipation SCD v1.1]]
- [[raw/affine/09-05-2026/sequence diagrams/H&L-D&P - SDiagram WorkDoc v1.1|H&L-D&P sequence workdoc v1.1]]
