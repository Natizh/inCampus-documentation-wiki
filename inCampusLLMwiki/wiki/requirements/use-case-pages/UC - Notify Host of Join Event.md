# Notify Host of Join Event

Status: Draft sourced use case; NSF architecture branch.

Scope: MVP.

Initiating actor: System.

Source user story: US-06.

Related requirements: FR-0601, FR-0602, FR-0603; NFR-14, NFR-15.

Goal: Notify the activity host promptly when a student requests to join or directly joins the host's activity.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]
- [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]]

Architecture note: the 2026-05-09 NSF UCR and notification-handling sequence model this as an NSF-owned consequence over `DirectJoinCompleted` or `JoinRequestSubmitted`. NSF resolves host, activity, and participation context from upstream stores, checks block suppression and recipient account validity, and writes `DS-NS-001` only when the notification is allowed. Opening the resulting notification remains read-only.

Open point: notification channel, retry behavior, notification history, and final formal include relationship are unresolved.

Source:
- [[raw/affine/13-04-2026/Use Cases/Notify Host of Join Event|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - N&S v1.2|UCR - N&S v1.2]]
- [[raw/affine/09-05-2026/sequence diagrams/Notification Event Handling (JoinRequestSubmitted) — Sequence Diagram v1.1/index|Notification Event Handling sequence diagram v1.1]]
