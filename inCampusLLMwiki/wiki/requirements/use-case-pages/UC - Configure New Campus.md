# Configure New Campus

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Campus admin.

Source user story: US-23.

Related requirements: FR-2301, FR-2302; NFR-37, NFR-38.

Goal: Configure a new campus through guided steps so the app can operate there without requiring a new system version.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Manage Campus Structured Options|Manage Campus Structured Options]]
- [[wiki/requirements/use-case-pages/UC - Select Campus|Select Campus]]
- [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]]

Architecture note: the 2026-05-09 CA UCR and first-skeleton sequence/collaboration diagrams model Configure New Campus through runtime `AuthenticatedAdminContext`. The flow creates the campus tenant boundary and initial structured options in `DS-CA-001` and `DS-CA-002` only; it does not introduce a Campus Admin store or mutate downstream AP, H&L, SM, or NSF stores.

Open point: exact setup fields, sequence, and validation rules are not specified.

Source:
- [[raw/affine/13-04-2026/Use Cases/Configure New Campus|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - C&A v1.1|UCR - C&A v1.1]]
- [[raw/affine/09-05-2026/sequence diagrams/Configure New Campus Sequence Diagram v1.1/index|Configure New Campus sequence diagram v1.1]]
- [[raw/affine/09-05-2026/collaboration diagrams/Configure New Campus Collaboration Diagram v1.1/Configure New Campus Collaboration Diagram v1.1|Configure New Campus collaboration diagram v1.1]]
