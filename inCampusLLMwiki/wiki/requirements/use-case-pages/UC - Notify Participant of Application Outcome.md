# Notify Participant of Application Outcome

Status: Draft sourced use case; NSF architecture branch.

Scope: MVP.

Initiating actor: Activity host.

Source user story: US-07.

Related requirements: FR-0701, FR-0702, FR-0703, FR-0704, FR-2002; NFR-18, NFR-19.

Goal: Inform a participant when a pending join request is approved or declined.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]]
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]

Architecture note: the 2026-04-25 NSF workdoc models this as a notification consequence owned by NSF. H&L produces the approval/decline state change, NSF resolves recipient/context, checks block suppression, and writes `DS-NS-001` if allowed.

Open point: exact user-facing notification channel and notification-list UX remain unresolved. Notification opening is now modeled as a read-only current-context check.

Source:
- [[raw/affine/13:04:2026/Use Cases/Notify Participant of Application Outcome|Raw use case narrative]]
- [[raw/affine/25:04:2026/NSF - DFD workdoc v7|NSF architecture workdoc v7]]
