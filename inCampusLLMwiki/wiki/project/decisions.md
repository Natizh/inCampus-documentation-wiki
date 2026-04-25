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
`raw/affine/25:04:2026/Architecture workdoc/index.md` and the subgroup workdocs move the current project work into architecture analysis. Requirements/use-case traceability remains the baseline input, but current wiki priority is now [[wiki/architecture/overview|architecture]], DFDs, data stores, and CRUD consistency.

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

Reason: this is explicitly described in `raw/affine/13:04:2026/Home.md`.

Note: `Home.md` contains an `OUTDATED` marker, so this should be confirmed against later AFFiNE exports if the process changes.

Later source note:
`raw/affine/15:04:2026/high-level-use-case-diagram-v1.2/usecase-diag-v1.2.puml` provides a draft high-level use case diagram with candidate and confirmed relationship labels, but it does not by itself supersede the staged workflow or finalize UML relationship types.

Current source note:
`raw/affine/25:04:2026/updates/usecase-diag-v1.4.puml` supersedes `v1.2` for current relationship discussion, while formal UC IDs and final implementation-contract status remain unresolved.

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

Reason: this structure is explicitly stabilized in `raw/affine/25:04:2026/DFD integration and Merge/index.md` and supported by the subgroup workdocs.

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

Reason: this is stabilized by `raw/affine/25:04:2026/CRUD matrix (1).md` and `raw/affine/25:04:2026/H&L - DFD workdoc v2.1.md`.

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

Current active notification branches include join/request, pending-request withdrawal, joined-participant leave, approval/decline outcome, cancellation, and activity reminder.

Reason: this is stabilized by NSF workdoc `v7`, D&P workdoc `v5`, H&L workdoc `v2.1`, and CRUD Matrix `v1.4`.

### D-20260425-006: Apply current architecture-scope changes for Send Message and Activity Reminder

Status: Source-derived working rule; requirements tables need cleanup.

The 2026-04-25 architecture batch changes current modeling scope in two places:
- `Send Message` is excluded from the current D&P MVP model and postponed.
- `Receive Activity Reminder` is included as an active MVP notification branch in NSF.

Reason: D&P workdoc `v5` explicitly excludes Send Message from the MVP model, while NSF workdoc `v7` and CRUD Matrix `v1.4` explicitly include activity reminder as an active notification branch.

## Unresolved Decisions

- Final formal use case ID scheme.
- Final implementation-contract status of the latest `v1.4` use-case relationship diagram.
- Whether [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]] remains a separate formal use case even though it is modeled as part of [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]] for DFD purposes.
- Whether host and participant notification behaviors remain separate formal use cases even though NSF owns notification consequences in the DFD.
- Requirement ID normalization where source files differ on leading zeroes, such as `FR-101` vs `FR-0101`.
- Exact state-transition diagram beyond the current architecture vocabulary.
- Safety and moderation details beyond report, review, rules, block, and native AP/HL moderation triggers.
- Privacy and data retention requirements.
- Scope of first Tongji University, Jiading Campus rollout beyond the current MVP feature list.
- Technical implementation stack.
- Requirements-table reconciliation for `US-08` and `US-11`.
- Cleanup of stale wording inside the 2026-04-25 architecture batch, especially withdrawal notification text and deletion/archive leftovers.

Resolve these from future AFFiNE snapshots or explicit team decisions.

## Related Pages

- [[wiki/project/overview|Project Overview]]
- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/planning/workflow|Workflow]]
- [[wiki/requirements/traceability|Traceability]]
