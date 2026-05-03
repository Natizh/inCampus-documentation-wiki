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

Architecture note: the 2026-05-03 CRUD Matrix `v1.5` says pending request withdrawal deletes the pending request, updates availability/count state, and must not generate a host notification. This conflicts with D&P workdoc `v5` and NSF workdoc `v7`, which still model a withdrawal trigger/branch.

Open point: host notification behavior after pending-request withdrawal needs team confirmation against the latest CRUD and DFD sources.

Source:
- [[raw/affine/13-04-2026/Use Cases/Withdraw Join Request|Raw use case narrative]]
- [[raw/affine/03-05-2026/updates/CRUD matrix v1.5|CRUD matrix v1.5]]
- [[raw/affine/03-05-2026/updates/D&P - DFD workdoc v5|D&P architecture workdoc v5]]
- [[raw/affine/03-05-2026/updates/NSF - DFD workdoc v7|NSF architecture workdoc v7]]
