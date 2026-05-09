# Decisions

This page records durable project and wiki decisions.
Use it for decisions that should survive beyond the current chat or weekly AFFiNE document.

## Decision Log

### D-20260413-001: Use AFFiNE for live collaboration and this repository for stable project memory

Status: Adopted.

AFFiNE is the team's live collaborative workspace.
This repository stores immutable raw snapshots and a derived, structured wiki.

Reason: AFFiNE documents can keep changing week by week, while the wiki needs stable continuity across project phases.

### D-20260413-002: Keep `raw/` immutable

Status: Adopted.

Files exported into `raw/` should not be rewritten.
When a source changes, add a new dated snapshot.

Reason: historical snapshots make requirements evolution traceable.

### D-20260413-003: Maintain a derived wiki in `wiki/`

Status: Adopted.

The wiki stores synthesized project knowledge, not raw exported documents.
Wiki pages may be updated when newer source snapshots or explicit team decisions change the stable understanding.

Reason: the team needs navigable project memory, not a pile of weekly files.

### D-20260413-004: Use Codex as the primary wiki writer

Status: Adopted.

Codex manages wiki structure, `wiki/index.md`, `wiki/log.md`, and main derived pages.
Copilot and Trae may help with secondary tasks, but they do not govern the wiki.

Reason: one primary writing agent keeps structure and conventions consistent.

### D-20260413-005: Do not add RAG infrastructure yet

Status: Adopted.

The wiki will use index-first navigation and ordinary file search.
No databases, embeddings, vector search, or RAG infrastructure should be added unless explicitly requested later.

Reason: the current project stage needs lightweight maintainability more than tooling complexity.

### D-20260413-006: Current documentation priority is use-case work

Status: Superseded as the current phase; retained as historical phase record.

The current phase prioritizes [[wiki/requirements/use-cases|use cases]], [[wiki/requirements/use-case-narratives|use case narratives]], and [[wiki/requirements/traceability|traceability]] among user stories, functional requirements, non-functional requirements, and use cases.

Reason: this matches the team's current requirements phase.

Later source note:
`raw/affine/25-04-2026/Architecture workdoc/index.md` and the subgroup workdocs move the current project work into architecture analysis. Requirements/use-case traceability remains the baseline input, but current wiki priority is now [[wiki/architecture/overview|architecture]], DFDs, data stores, and CRUD consistency.

### D-20260413-007: Follow the staged use-case workflow from the AFFiNE snapshot

Status: Source-derived working rule.

The current use-case workflow is:
1. Start from MVP user stories.
2. Identify actor and actor goal.
3. Propose candidate user-goal use cases.
4. Review the candidates by merging overlaps, splitting broad use cases, and removing duplicates.
5. Assign final use case IDs only once the set is stable.
6. Complete [[wiki/requirements/use-case-narratives|narratives]] using related requirements, actor, goal, participating actors, preconditions, postconditions, main success scenario, and alternate scenarios.
7. Decide include/extend relationships only after narratives are stable.
8. Generate the final use case diagram at the end.

Reason: this is explicitly described in `raw/affine/13-04-2026/Home.md`.

Note: `Home.md` contains an `OUTDATED` marker, so this should be confirmed against later AFFiNE exports if the process changes.

Later source note:
`raw/affine/15-04-2026/high-level-use-case-diagram-v1.2/usecase-diag-v1.2.puml` provides a draft high-level use case diagram with candidate and confirmed relationship labels, but it does not by itself supersede the staged workflow or finalize UML relationship types.

Current source note:
`raw/affine/25-04-2026/updates/usecase-diag-v1.4.puml` supersedes `v1.2` as relationship history, but it is no longer the latest diagram export.

Later source note:
`raw/affine/08-05-2026/use-case-diagram-v1.6.md` is the latest diagram export, but its version log and embedded diagram body are internally inconsistent. Treat it as current source evidence for intended cleanup, not as a final implementation contract, while preserving the `v1.4` mismatch as unresolved history rather than silently resolved.

### D-20260413-008: Treat use case names as provisional identifiers until formal UC IDs are stable

Status: Source-derived working rule.

The ingested [[wiki/requirements/use-cases|use case]] files use textual names as practical identifiers.
Several notes say formal numeric UC IDs are not yet assigned or should be replaced once the team stabilizes the ID scheme.

Reason: the source workflow says final use case IDs should be defined only once the use case set is stable.

### D-20260425-001: Use a six-area Level-1 architecture decomposition

Status: Source-derived working rule.

The current architecture baseline uses six Level-1 logical process areas:
- Campus Administration
- Access and Profile
- Hosting and Lifecycle
- Discovery and Participation
- Safety and Moderation
- Notifications and System Flow

Reason: this structure is explicitly stabilized in `raw/affine/25-04-2026/DFD integration and Merge/index.md` and supported by the subgroup workdocs.

### D-20260425-002: Preserve domain ownership boundaries in DFD and CRUD work

Status: Source-derived working rule.

The current architecture baseline uses these ownership boundaries:
- Campus Administration owns campus configuration and structured options.
- Access and Profile owns account, university identity rules, and minimal profile truth.
- Hosting and Lifecycle owns activity and participation truth.
- Safety and Moderation owns block and report truth.
- Notifications and System Flow owns notification consequences.

Reason: the subgroup workdocs repeatedly warn against duplicate stores and against transferring ownership just because another process reads or writes a store for a justified flow.

### D-20260425-003: Treat activity deletion as hard deletion, not cancellation

Status: Source-derived working rule.

Deleting an activity hard-deletes the activity record in `DS-HL-001` and all linked participation/request records in `DS-HL-002`.

Cancellation remains a lifecycle status that preserves cancelled context. Deletion does not have a confirmed notification branch in the current CRUD matrix.

Reason: this is stabilized by `raw/affine/25-04-2026/CRUD matrix (1).md` and `raw/affine/25-04-2026/H&L - DFD workdoc v2.1.md`.

### D-20260425-004: Treat blocking as reciprocal visibility and interaction prevention

Status: Source-derived working rule.

A block relationship in `DS-SM-001` prevents both users from:
- seeing each other's activities in discovery;
- opening each other's activity details;
- viewing each other's minimal profiles;
- initiating new join/request interactions with each other.

Cross-user notifications are also suppressed when a block relationship exists between the trigger user and the recipient.

Reason: this is stabilized across D&P, SM, AP, NSF, and the CRUD matrix in the 2026-04-25 architecture batch.

### D-20260425-005: Keep notification persistence inside NSF

Status: Source-derived working rule.

H&L and D&P expose or emit notification-relevant event triggers, but they do not write `DS-NS-001`.

Notifications and System Flow owns:
- recipient/context resolution;
- block suppression for cross-user notifications;
- notification record creation;
- delivery output;
- read-only notification opening.

Current active notification branches include join/request, joined-participant leave, approval/decline outcome, cancellation, and activity reminder. Pending-request withdrawal is non-notifying for the first skeleton: no host notification, no NSF handler, and no `DS-NS-001` record.

Reason: NSF ownership is stabilized by NSF workdoc `v7`, D&P workdoc `v5`, H&L workdoc `v2.1`, and the CRUD matrix line. The 2026-05-09 final pre-skeleton batch resolves the older pending-withdrawal conflict through CRUD Matrix `v1.6`, sequence diagrams, collaboration diagrams, and state-chart notes.

### D-20260425-006: Apply current architecture-scope changes for Send Message and Activity Reminder

Status: Source-derived working rule.

The 2026-04-25 architecture batch changes current modeling scope in two places:
- `Send Message` is excluded from the current D&P MVP model and postponed. The 2026-05-08 requirements table now also marks `US-08` as postMVP.
- `Receive Activity Reminder` is included as an active MVP notification branch in NSF. The 2026-05-09 batch updates `User Story v1.3`, `Use cases v1.2`, and `use-case-diagram-v1.7.md` so this is no longer a source-scope conflict.

Reason: D&P workdoc `v5` explicitly excludes Send Message from the MVP model, while NSF workdoc `v7`, CRUD Matrix `v1.6`, and the final pre-skeleton requirements/diagram sources include activity reminder as an active notification branch.

### D-20260503-001: Use the 2026-05-03 ERD/entity catalog as the current logical data model

Status: Source-derived working rule.

The current logical data model uses the 2026-05-03 ERD/entity set for entity names, relationship constraints, and attribute-level discussion.

It remains a logical model, not a physical database schema. It does not define SQL types, indexes, migrations, API contracts, provider integrations, or final weak-reference mechanics.

Reason: `raw/affine/03-05-2026/ERD - workdoc.md`, `ERD V1.1.md`, `Entities & Attributes v1.1.md`, and `Relationship Table.md` provide the first explicit entity/relationship package layered over the previous DFD/store work.

### D-20260503-002: Store password credential state on Student Account

Status: Source-derived working rule.

Sign-up includes university email verification plus password creation. The password must be stored as a secure hash on `DS-AP-001 Student Account` as `PasswordHash` and used for later email/password sign-in.

Reason: this is recorded in `raw/affine/03-05-2026/updates/Recent Structural modifications.md` and reflected in `Entities & Attributes v1.1.md`.

### D-20260503-003: Require explicit consent before identifiable campus insight access

Status: Source-derived working rule; detailed feature behavior still unresolved.

Identifiable student interests and activity-participation insight data may be exposed to authorized campus staff only when the student has explicitly consented.

The consent state belongs to `DS-AP-001 Student Account` as `CampusInsightSharingConsent`. Campus insight views must enforce campus scope, consent checks, and least-privilege access before reading identifiable profile, activity, or participation data.

The 2026-05-09 final pre-skeleton batch keeps the feature in MVP and clarifies that admin identity is runtime `AuthenticatedAdminContext`, not a first-skeleton persisted store. Detailed narratives, exact insight fields, exact admin authentication implementation, and consent UI placement remain unresolved.

Reason: this is recorded in `raw/affine/03-05-2026/updates/Recent Structural modifications.md`, `AP - DFD - workdoc v1.2.md`, `Entities & Attributes v1.1.md`, and CRUD Matrix `v1.5`.

### D-20260508-001: Model campus insight consent and admin insight access as separate use cases

Status: Source-derived working rule; narratives still missing.

The updated use-case table separates:
- [[wiki/requirements/use-case-pages/UC - Update Campus Insight Consent|Update Campus Insight Consent]] for the Student actor.
- [[wiki/requirements/use-case-pages/UC - View Consent-Based Student Insights|View Consent-Based Student Insights]] for the Campus Admin actor.

This separation preserves actor responsibility and access-control boundaries: students control consent, while authorized campus admins consume only consent-gated insight data within their campus scope.

Reason: `raw/affine/08-05-2026/Use cases v1.1.md`, `User Story v1.2.md`, `Functional Requirements v1.2.md`, and `Non-Functional Requirements v1.1.md` explicitly add these rows and tie them to `US-29`, `US-30`, `FR-2901` through `FR-3001`, and `NFR-45` through `NFR-47`.

Later source note:
`raw/affine/09-05-2026/updates/Use cases v1.2.md` and `use-case-diagram-v1.7.md` keep both use cases in MVP first-skeleton scope. The sequence and collaboration diagrams add a read-only, consent-gated Admin Insights flow over existing AP/H&L stores.

### D-20260509-001: Adopt the first-skeleton modular monolith architecture

Status: Source-derived working rule.

The first code skeleton uses a multi-tenant modular monolith with event-driven internal flows.

`CampusID` is the tenant boundary, and the backend is divided into six internal modules:
- Access and Profile
- Campus Administration
- Hosting and Lifecycle
- Discovery and Participation
- Safety and Moderation
- Notifications and System Flow

The internal event dispatcher is an implementation abstraction inside the monolith. It is not a public API contract.

Reason: `raw/affine/09-05-2026/system architecture/01 Design Scope and Architectural Choice v1.1.md` states this as the accepted first-skeleton architecture decision.

### D-20260509-002: Keep Campus Admin identity as runtime context for the first skeleton

Status: Source-derived working rule.

The first skeleton does not introduce `DS-CA-003`, a Campus Admin Store, an Admin Account Store, or a separate Campus Admin database.

Campus Admin identity is represented by runtime `AuthenticatedAdminContext`:
- `adminId`
- `email`
- `role`
- `authorizedCampusIds`
- `selectedCampusId`

Reason: the 2026-05-09 system architecture, CRUD Matrix `v1.6`, entity catalog `v1.2`, and CA/SM sequence/collaboration diagrams all reaffirm this boundary.

### D-20260509-003: Treat pending-request withdrawal as non-notifying

Status: Source-derived working rule.

Pending request withdrawal removes or deactivates `RecordType=request, Status=pending` participation/request state and updates availability transactionally, but it does not notify the host.

For the first skeleton:
- no host notification is generated;
- no NSF handler exists for this branch;
- no `DS-NS-001 Notification Record` is created;
- any optional `PendingRequestWithdrawn` implementation event must be marked internal and non-notifying.

Reason: CRUD Matrix `v1.6`, the updated sequence/collaboration diagrams, and `ActivityParticipation SCD v1.1` resolve the previous 2026-05-03 same-batch conflict.

### D-20260509-004: Use `use-case-diagram-v1.7.md` as the normative first-skeleton use-case diagram

Status: Source-derived working rule.

`use-case-diagram-v1.7.md` supersedes the internally inconsistent `v1.6` export for the first skeleton.

Current diagram implications:
- `Receive Activity Reminder` is MVP.
- `Update Campus Insight Consent` and `View Consent-Based Student Insights` are MVP.
- `Set Activity Date and Time` is not represented as a standalone use case; date/time remains part of `Create Activity`.
- Deferred/postMVP use cases are excluded from the MVP first-skeleton diagram.

Reason: `raw/affine/09-05-2026/updates/use-case-diagram-v1.7.md` explicitly labels itself the normative MVP first-skeleton diagram source.

### D-20260503-004: Treat Set Activity Date and Time as internal to Create Activity for architecture modeling

Status: Source-derived working rule; formal UC treatment still unresolved.

For H&L DFD and CRUD purposes, `Set Activity Date and Time` is part of `Create Activity`, not a separate H&L process and not a separate data store driver.

The use case inventory still preserves the sourced narrative and include-style relationship history until the team decides whether to merge it in final UC documentation.

Reason: this structural change is recorded in `raw/affine/03-05-2026/updates/Recent Structural modifications.md` and matches H&L workdoc `v2.1`.

## Unresolved Decisions

- Final formal use case ID scheme.
- Final formal use-case documentation treatment for [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]], which is preserved as a sourced card but merged into [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]] for first-skeleton diagram and architecture purposes.
- Whether host and participant notification behaviors remain separate formal use cases even though NSF owns notification consequences in the DFD.
- Requirement ID normalization where source files differ on leading zeroes, such as `FR-101` vs `FR-0101`.
- True `Activity` lifecycle state chart source; the 2026-05-09 SCD package provided `ActivityParticipation`, `StudentProfile`, and `ReportRecord` charts.
- Safety and moderation details beyond report, review, rules, block, and native AP/HL moderation triggers.
- Privacy and data retention requirements.
- Exact campus insight narrative detail, consent UI placement, insight fields, aggregation/identifiability rules, and least-privilege UI content beyond the current table entries.
- Exact admin authentication implementation behind runtime `AuthenticatedAdminContext`.
- Whether a future post-skeleton release needs a persisted Campus Admin entity/store.
- Scope of first Tongji University, Jiading Campus rollout beyond the current MVP feature list.
- Technical implementation stack.

Resolve these from future AFFiNE snapshots or explicit team decisions.

## Related Pages

- [[wiki/project/overview|Project Overview]]
- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/planning/workflow|Workflow]]
- [[wiki/requirements/traceability|Traceability]]
