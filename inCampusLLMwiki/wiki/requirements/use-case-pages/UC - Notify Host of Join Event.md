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

Architecture note: the 2026-04-25 NSF workdoc models this as a notification consequence owned by NSF. The join/request flow emits a trigger, NSF resolves host/context, checks `DS-SM-001` for block suppression, and writes `DS-NS-001` if allowed.

Open point: notification channel, retry behavior, notification history, and final formal include relationship are unresolved.

Source:
- [[raw/affine/13:04:2026/Use Cases/Notify Host of Join Event|Raw use case narrative]]
- [[raw/affine/25:04:2026/NSF - DFD workdoc v7|NSF architecture workdoc v7]]
