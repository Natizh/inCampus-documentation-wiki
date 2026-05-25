# Update Campus Insight Consent

Status: Draft sourced use case; table/diagram-only MVP first-skeleton entry until a dedicated source narrative exists.

Scope: MVP in `User Story v1.3`, `Use cases v1.2`, and `use-case-diagram-v1.7.md`.

Initiating actor: Student.

Source user story: US-29.

Related requirements: FR-2901, FR-2902, FR-2903; NFR-45, NFR-46, NFR-47.

Goal: Allow a student to choose whether profile-interest and activity-participation data may be shared with authorized campus staff for campus-life insight purposes.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - View Consent-Based Student Insights|View Consent-Based Student Insights]]
- [[wiki/requirements/use-case-pages/UC - Select Campus|Select Campus]]

Architecture note: the current data model stores consent on `DS-AP-001 Student Account` as `CampusInsightSharingConsent`. Refusing or revoking consent must not block ordinary app use, and authorized campus insight access must stop when consent is not granted. The first-skeleton AP UCR and Sign Up and Select Campus sequence/collaboration diagrams show consent as AP-owned, capturable during onboarding, and updateable later through account/profile settings; exact UI placement remains unresolved.

Open points: this is intentionally tracked as a table/diagram-only use case until the team provides a dedicated narrative source. Exact consent UI placement, consent-change timing, and user-facing explanation copy remain unresolved.

Source:
- [[raw/affine/09-05-2026/updates/User Story v1.3|User Story v1.3]]
- [[raw/affine/09-05-2026/updates/Functional Requirements v1.3|Functional Requirements v1.3]]
- [[raw/affine/09-05-2026/updates/Non-Functional Requirements v1.2|Non-Functional Requirements v1.2]]
- [[raw/affine/09-05-2026/updates/Use cases v1.2|Use cases v1.2]]
- [[raw/affine/09-05-2026/use case realizations/UCR - A&P v1.2|UCR - A&P v1.2]]
- [[raw/affine/09-05-2026/updates/Entities & Attributes v1.2|Entities & Attributes v1.2]]
- [[raw/affine/09-05-2026/updates/CRUD matrix v1.6|CRUD matrix v1.6]]
- [[raw/affine/09-05-2026/sequence diagrams/Sign Up and Select Campus — Sequence Diagram v1.1/Sign Up and Select Campus — Sequence Diagram v1.1|Sign Up and Select Campus sequence diagram v1.1]]
- [[raw/affine/09-05-2026/collaboration diagrams/Sign Up and Select Campus — Collaboration Diagram v1.1/Sign Up and Select Campus — Collaboration Diagram v1.1|Sign Up and Select Campus collaboration diagram v1.1]]
