# Manage Campus Structured Options

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Campus admin.

Source user story: US-24.

Related requirements: FR-0301, FR-0304, FR-2302; NFR-39, NFR-40.

Goal: Manage campus-specific structured options such as locations and activity lists so students in that campus see relevant and usable choices.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Configure New Campus|Configure New Campus]]
- [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]]

Architecture note: the 2026-05-09 CA UCR keeps this flow campus-authorized through runtime `AuthenticatedAdminContext`. Campus Administration reads `DS-CA-001` for scope and performs campus-scoped CRUD on `DS-CA-002`; it remains the sole owner of structured options and does not mutate downstream student, activity, moderation, or notification stores.

Open point: CRUD details and whether this is only initial setup or ongoing maintenance are unresolved.

Source:
- [[raw/affine/13-04-2026/Use Cases/Manage Campus Structured Options|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - C&A v1.1|UCR - C&A v1.1]]
