# Leave Joined Activity

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student.

Source user story: US-27.

Related requirements: FR-2702, FR-2703, FR-2704; NFR-43, NFR-13, NFR-22.

Goal: Leave an already joined activity before it starts.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]
- [[wiki/requirements/use-case-pages/UC - View Personal Activity List|View Personal Activity List]]
- [[wiki/requirements/use-case-pages/UC - Withdraw Join Request|Withdraw Join Request]]

Open point: this use case is sourced as separate from pending-request withdrawal, but both derive from US-27.

Architecture note: the 2026-05-03 CRUD Matrix `v1.5` keeps leave separate from pending-request withdrawal. It applies to an already joined participant before start, updates H&L stores, and requires a host notification through NSF if not suppressed by block state.

Source:
- [[raw/affine/13-04-2026/Use Cases/Leave Joined Activity|Raw use case narrative]]
- [[raw/affine/03-05-2026/updates/CRUD matrix v1.5|CRUD matrix v1.5]]
- [[raw/affine/03-05-2026/updates/D&P - DFD workdoc v5|D&P architecture workdoc v5]]
- [[raw/affine/03-05-2026/updates/NSF - DFD workdoc v7|NSF architecture workdoc v7]]
