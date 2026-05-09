# Create Activity

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student host.

Source user story: US-03.

Related requirements: FR-0301, FR-0302, FR-0303, FR-0304, FR-0305; NFR-10, NFR-11, NFR-13.

Goal: Create a new campus activity by defining category, details, location, schedule, participant limit, and participation mode so other students on the same campus can discover and join it.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]]
- [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]]
- [[wiki/requirements/use-case-pages/UC - View Activity Details|View Activity Details]]
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]
- [[wiki/requirements/use-case-pages/UC - Delete Activity|Delete Activity]]

Architecture note: the 2026-05-09 H&L UCR keeps scheduled date/time selection and validation inside Create Activity, not as a separate H&L process. Create Activity reads campus-structured options, creates a campus-scoped `DS-HL-001` record with `Activity.Status = open`, and leaves later notification consequences to NSF rather than writing `DS-NS-001` directly.

Open point: map-based location support remains unresolved, and the team still needs to decide whether Set Activity Date and Time remains a separate formal use case in final UC documentation.

Source:
- [[raw/affine/13-04-2026/Use Cases/Create Activity|Raw use case narrative]]
- [[raw/affine/03-05-2026/updates/Recent Structural modifications|Recent Structural modifications]]
- [[raw/affine/09-05-2026/use case realizations/UCR - H&L v1.4|UCR - H&L v1.4]]
- [[raw/affine/09-05-2026/updates/Entities & Attributes v1.2|Entities & Attributes v1.2]]
