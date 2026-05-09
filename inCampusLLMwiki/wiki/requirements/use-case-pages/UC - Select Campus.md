# Select Campus

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student.

Source user story: US-16.

Related requirements: FR-0105, FR-1601; NFR-30.

Goal: Confirm or select the correct campus from the campuses associated with the student's university during onboarding.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Sign Up with University Email|Sign Up with University Email]]
- [[wiki/requirements/use-case-pages/UC - Configure New Campus|Configure New Campus]]

Architecture note: the 2026-05-09 AP UCR and combined onboarding sequence model Select Campus as an AP-owned read/update over `DS-CA-001` and `DS-AP-001.SelectedCampusID`. The main first-skeleton sequence shows sign-up, campus selection, profile setup, and consent in one flow for readability, but the final onboarding order and single-campus auto-confirm handling remain unresolved.

Open point: the exact onboarding order and whether students can later change campus are unresolved.

Source:
- [[raw/affine/13-04-2026/Use Cases/Select Campus|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - A&P v1.2|UCR - A&P v1.2]]
- [[raw/affine/09-05-2026/sequence diagrams/Sign Up and Select Campus — Sequence Diagram v1.1/Sign Up and Select Campus — Sequence Diagram v1.1|Sign Up and Select Campus sequence diagram v1.1]]
- [[raw/affine/09-05-2026/collaboration diagrams/Sign Up and Select Campus — Collaboration Diagram v1.1/Sign Up and Select Campus — Collaboration Diagram v1.1|Sign Up and Select Campus collaboration diagram v1.1]]
