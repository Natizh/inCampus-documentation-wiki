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

Architecture note: the 2026-04-25 D&P and NSF workdocs model withdrawal as a separate flow that deletes the pending request, updates availability/count state, and emits a withdrawal trigger to NSF. NSF owns any host notification record.

Source:
- [[raw/affine/13:04:2026/Use Cases/Withdraw Join Request|Raw use case narrative]]
- [[raw/affine/25:04:2026/D&P - DFD workdoc v5|D&P architecture workdoc v5]]
- [[raw/affine/25:04:2026/NSF - DFD workdoc v7|NSF architecture workdoc v7]]
