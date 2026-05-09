# Delete Activity

Status: Draft sourced use case.

Scope: MVP.

Initiating actor: Student host.

Source user story: US-26.

Related requirements: FR-2601, FR-2602, FR-2603; NFR-12, NFR-42.

Goal: Delete an activity the host created before it has started so it is removed from discovery views.

Parent index: [[wiki/requirements/use-cases|Use Cases]]

Related use case links:
- [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]]
- [[wiki/requirements/use-case-pages/UC - Update Activity Status|Update Activity Status]]
- [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]]
- [[wiki/requirements/use-case-pages/UC - View Activity Details|View Activity Details]]
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]

Architecture note: the 2026-05-09 H&L and CRUD sources keep deletion as hard deletion of the activity record in `DS-HL-001` and all linked participation/request records in `DS-HL-002`. Deletion is distinct from cancellation, remains outside the persisted activity-status vocabulary, and does not have a confirmed deletion-notification branch.

Open point: whether future requirements should add deletion notification remains unresolved; it is not confirmed in the current CRUD matrix.

Source:
- [[raw/affine/13-04-2026/Use Cases/Delete Activity|Raw use case narrative]]
- [[raw/affine/09-05-2026/use case realizations/UCR - H&L v1.4|UCR - H&L v1.4]]
- [[raw/affine/09-05-2026/updates/CRUD matrix v1.6|CRUD matrix v1.6]]
