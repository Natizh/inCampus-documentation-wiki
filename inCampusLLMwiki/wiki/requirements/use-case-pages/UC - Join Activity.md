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

Architecture note: the 2026-04-25 D&P and NSF workdocs resolve blocked-user handling as a mandatory block check that prevents join/request interaction. Join/request events emit a trigger to NSF; D&P does not write notification records directly.

Open point: implementation-level concurrency handling for join/request counts is outside the current logical DFD.

Source:
- [[raw/affine/13:04:2026/Use Cases/Join Activity|Raw use case narrative]]
- [[raw/affine/25:04:2026/D&P - DFD workdoc v5|D&P architecture workdoc v5]]
- [[raw/affine/25:04:2026/NSF - DFD workdoc v7|NSF architecture workdoc v7]]
