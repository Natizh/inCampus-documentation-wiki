# Join Activity

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student guest.

Source user story: US-20.

Related requirements: FR-0305, FR-2001, FR-2002, FR-0502; NFR-13, NFR-34.

Goal: Join a campus activity directly or by submitting a join request when approval is required.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]]
- [[wiki/requirements/use-case-pages/UC - View Activity Details|View Activity Details]]
- [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]]
- [[wiki/requirements/use-case-pages/UC - Notify Host of Join Event|Notify Host of Join Event]]
- [[wiki/requirements/use-case-pages/UC - Withdraw Join Request|Withdraw Join Request]]
- [[wiki/requirements/use-case-pages/UC - Leave Joined Activity|Leave Joined Activity]]

Architecture note: the 2026-05-09 D&P UCR and Join Activity sequence make block checks, activity status/capacity checks, and duplicate active-record checks mandatory before any write. Inside the write transaction, the flow re-checks capacity and existing active state, creates either `RecordType=participation, Status=confirmed` or `RecordType=request, Status=pending`, updates counters transactionally, and emits `DirectJoinCompleted` or `JoinRequestSubmitted` for later NSF handling. D&P does not write notification records directly.

Open point: implementation-level concurrency handling for join/request counts is outside the current logical DFD.

Source:
- [[raw/affine/13-04-2026/Use Cases/Join Activity|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - D&P v1.2|UCR - D&P v1.2]]
- [[raw/affine/09-05-2026/sequence diagrams/Join Activity — Sequence Diagram v1.1/index|Join Activity sequence diagram v1.1]]
- [[raw/affine/09-05-2026/updates/CRUD matrix v1.6|CRUD matrix v1.6]]
