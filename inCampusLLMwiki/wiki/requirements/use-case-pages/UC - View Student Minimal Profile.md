# View Student Minimal Profile

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student.

Source user story: US-22.

Related requirements: FR-1403, FR-0501; NFR-28, NFR-36.

Goal: View another student's minimal profile in a relevant activity context so the student can decide whether they feel comfortable joining or accepting an activity.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Set Up Profile|Set Up Profile]]
- [[wiki/requirements/use-case-pages/UC - Edit Profile|Edit Profile]]
- [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]]

Architecture note: the 2026-05-09 AP UCR keeps `Student Profile` as the canonical `DS-AP-002` name and requires a read of `DS-SM-001 Block Relationships` before profile exposure. Only minimal public profile data is returned in allowed activity contexts, and blocked users must not view each other's profile details.

Open point: exact profile fields and the complete set of allowed viewing contexts remain unresolved. The 2026-05-03 entity catalog provides candidate fields such as display name, major, date of birth, gender, interests, languages, and short bio, but marks several final field decisions as `To verify`.

Source:
- [[raw/affine/13-04-2026/Use Cases/View Student Minimal Profile|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - A&P v1.2|UCR - A&P v1.2]]
- [[raw/affine/09-05-2026/updates/CRUD matrix v1.6|CRUD matrix v1.6]]
- [[raw/affine/09-05-2026/updates/Entities & Attributes v1.2|Entities & Attributes v1.2]]
