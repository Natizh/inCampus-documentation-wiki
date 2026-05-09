# Block User

Status: Draft sourced use case; block effects partially resolved by architecture batch.

Scope: MVP.

Initiating actor: Student.

Source user story: US-18.

Related requirements: FR-1801, FR-1802; NFR-32.

Goal: Block another user so the blocked user can no longer initiate further direct interaction through supported interaction features.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Send Message|Send Message]]

Open point: block scope, mutuality, unblock, passive visibility, and existing participation effects are unresolved.

Architecture note: the 2026-05-09 SM UCR and CRUD sources resolve the main block scope as reciprocal visibility and interaction prevention. Blocked users cannot see each other's activities in discovery, open each other's activity details, view each other's minimal profiles, or start new join/request interactions. Cross-user notifications are suppressed when a block relationship exists. If block creation affects a pending join request, SM delegates the consequence to H&L through native workflow rather than mutating `DS-HL-002` directly. Unblock behavior and the exact H&L mutation remain open.

Source:
- [[raw/affine/13-04-2026/Use Cases/Block User|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - S&M v1.3|UCR - S&M v1.3]]
- [[raw/affine/09-05-2026/updates/CRUD matrix v1.6|CRUD matrix v1.6]]
