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

Architecture note: the 2026-05-09 NSF UCR keeps this as an NSF-owned consequence of `JoinRequestApproved` or `JoinRequestDeclined`. H&L produces the approval/decline state change, NSF resolves recipient and current context from upstream stores, checks block suppression, and writes `DS-NS-001` if allowed. Notification opening is read-only.

Open point: exact user-facing notification channel and notification-list UX remain unresolved. Notification opening is now modeled as a read-only current-context check.

Source:
- [[raw/affine/13-04-2026/Use Cases/Notify Participant of Application Outcome|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - N&S v1.2|UCR - N&S v1.2]]
