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

Architecture note: the 2026-04-25 architecture batch resolves the main block scope as reciprocal visibility and interaction prevention. Blocked users cannot see each other's activities in discovery, open each other's activity details, view each other's minimal profiles, or start new join/request interactions. Cross-user notifications are suppressed when a block relationship exists. Unblock behavior and exact pending-request representation remain open.

Source:
- [[raw/affine/13:04:2026/Use Cases/Block User|Raw use case narrative]]
- [[raw/affine/25:04:2026/SM - DFD workdoc v2.1|SM architecture workdoc v2.1]]
- [[raw/affine/25:04:2026/CRUD matrix (1)|CRUD matrix v1.4]]
