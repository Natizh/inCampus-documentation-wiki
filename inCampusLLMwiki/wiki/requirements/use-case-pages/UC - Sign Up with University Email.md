# Sign Up with University Email

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student.

Source user story: US-01.

Related requirements: FR-0101, FR-0102, FR-0103, FR-0104, FR-0105; NFR-01, NFR-02, NFR-03, NFR-04, NFR-05.

Goal: Create an account using a university email and password so that only university-affiliated users can access the app and the student can sign in again later.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Select Campus|Select Campus]]
- [[wiki/requirements/use-case-pages/UC - Set Up Profile|Set Up Profile]]

Architecture note: the 2026-05-09 AP UCR and combined onboarding sequence keep sign-up AP-owned. Sign-up validates university rules in `DS-AP-003`, creates or updates `DS-AP-001`, and stores the password as `PasswordHash` for later email/password sign-in. Campus selection, profile setup, and consent remain downstream onboarding steps rather than sign-up-owned data stores.

Open point: exact verification mechanics beyond the current university-email-plus-password model remain unresolved.

Source:
- [[raw/affine/13-04-2026/Use Cases/Sign Up with University Email|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - A&P v1.2|UCR - A&P v1.2]]
- [[raw/affine/03-05-2026/updates/Recent Structural modifications|Recent Structural modifications]]
- [[raw/affine/09-05-2026/updates/Entities & Attributes v1.2|Entities & Attributes v1.2]]
- [[raw/affine/09-05-2026/sequence diagrams/Sign Up and Select Campus — Sequence Diagram v1.1/Sign Up and Select Campus — Sequence Diagram v1.1|Sign Up and Select Campus sequence diagram v1.1]]
