# Report User or Activity

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student.

Source user story: US-17.

Related requirements: FR-1701, FR-0201, FR-0202, FR-0203; NFR-31, NFR-06, NFR-08.

Goal: Report an inappropriate user or activity so unsafe or unsuitable situations can be reviewed and handled.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Review Report|Review Report]]

Architecture note: the 2026-05-09 SM UCR and report/review sequence clarify that Submit Report stores the target reference and campus scope in `DS-SM-002` without a full `DS-HL-001` read at submission time. The submission flow creates no catalogue-level event and no notification record.

Open point: report fields, evidence support, and launch contexts are not specified.

Source:
- [[raw/affine/13-04-2026/Use Cases/Report User or Activity|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - S&M v1.3|UCR - S&M v1.3]]
- [[raw/affine/09-05-2026/sequence diagrams/Report and Review Report Sequence Diagram v1.1/index|Report and Review Report sequence diagram v1.1]]
