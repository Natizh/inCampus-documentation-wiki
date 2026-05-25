# View Consent-Based Student Insights

Status: Draft sourced use case; table/diagram-only MVP first-skeleton entry until a dedicated source narrative exists.

Scope: MVP in `User Story v1.3`, `Use cases v1.2`, and `use-case-diagram-v1.7.md`.

Initiating actor: Campus admin.

Source user story: US-30.

Related requirements: FR-2902, FR-2903, FR-3001; NFR-45, NFR-46, NFR-47.

Goal: Allow an authorized campus admin to view consent-based student interest and activity-participation insights for students within the admin's authorized campus scope.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Update Campus Insight Consent|Update Campus Insight Consent]]
- [[wiki/requirements/use-case-pages/UC - Configure New Campus|Configure New Campus]]
- [[wiki/requirements/use-case-pages/UC - Manage Campus Structured Options|Manage Campus Structured Options]]

Architecture note: identifiable insight reads require student consent, authorized campus scope, and least-privilege access. The first skeleton keeps this flow admin-only, campus-scoped, and read-only over existing AP/H&L stores; it does not add a new insight data store or formal Campus Admin entity/store. Campus Admin identity is runtime `AuthenticatedAdminContext`; exact admin authentication remains provisional.

Open points: this is intentionally tracked as a table/diagram-only use case until the team provides a dedicated narrative source. Exact insight fields, aggregation/identifiability rules, exact admin authentication implementation, and least-privilege view content remain unresolved.

Source:
- [[raw/affine/09-05-2026/updates/User Story v1.3|User Story v1.3]]
- [[raw/affine/09-05-2026/updates/Functional Requirements v1.3|Functional Requirements v1.3]]
- [[raw/affine/09-05-2026/updates/Non-Functional Requirements v1.2|Non-Functional Requirements v1.2]]
- [[raw/affine/09-05-2026/updates/Use cases v1.2|Use cases v1.2]]
- [[raw/affine/09-05-2026/use case realizations/UCR - C&A v1.1|UCR - C&A v1.1]]
- [[raw/affine/09-05-2026/updates/CRUD matrix v1.6|CRUD matrix v1.6]]
- [[raw/affine/09-05-2026/updates/Databases v1.1|Databases v1.1]]
- [[raw/affine/09-05-2026/sequence diagrams/View Consent-Based Student Insights — Sequence Diagram v1.1/index|View Consent-Based Student Insights sequence diagram v1.1]]
- [[raw/affine/09-05-2026/collaboration diagrams/View Consent-Based Student Insights — Collaboration Diagram v1.1/View Consent-Based Student Insights — Collaboration Diagram v1.1|View Consent-Based Student Insights collaboration diagram v1.1]]
