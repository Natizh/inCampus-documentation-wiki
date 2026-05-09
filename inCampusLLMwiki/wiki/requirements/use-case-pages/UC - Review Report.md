# Review Report

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Campus admin.

Source user story: US-02.

Related requirements: FR-0201, FR-0202, FR-0203; NFR-06, NFR-07, NFR-08, NFR-09.

Goal: Review a submitted report about an inappropriate user or activity so unsafe or unsuitable behavior can be assessed and handled.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Report User or Activity|Report User or Activity]]

Architecture note: the 2026-05-09 SM UCR and report/review sequence/collaboration package model Review Report through runtime `AuthenticatedAdminContext`. Review reads campus-scoped `DS-SM-002`, may load current activity context with an unavailable/deleted fallback when the target no longer exists, updates only `DS-SM-002`, and delegates native moderation consequences to AP (`warn_user`, `suspend_user`, `ban_user`) or H&L (`remove_activity`).

Open point: reporter feedback, reported-party notification, and evidence fields are unresolved.

Source:
- [[raw/affine/13-04-2026/Use Cases/Review Report|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - S&M v1.3|UCR - S&M v1.3]]
- [[raw/affine/09-05-2026/sequence diagrams/Report and Review Report Sequence Diagram v1.1/index|Report and Review Report sequence diagram v1.1]]
- [[raw/affine/09-05-2026/collaboration diagrams/Report and Review Report Collaboration Diagram v1.1/Report and Review Report Collaboration Diagram v1.1|Report and Review Report collaboration diagram v1.1]]
