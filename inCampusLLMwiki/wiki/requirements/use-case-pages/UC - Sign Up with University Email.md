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

Architecture note: the 2026-05-03 structural update confirms sign-up credential alignment: university email verification proves academic eligibility, while the password is stored as `PasswordHash` on `DS-AP-001 Student Account` for later email/password sign-in.

Open point: exact verification mechanics beyond the current university-email-plus-password model remain unresolved.

Source:
- [[raw/affine/13-04-2026/Use Cases/Sign Up with University Email|Raw use case narrative]]
- [[raw/affine/03-05-2026/updates/Recent Structural modifications|Recent Structural modifications]]
- [[raw/affine/03-05-2026/Entities & Attributes v1.1|Entities & Attributes v1.1]]
