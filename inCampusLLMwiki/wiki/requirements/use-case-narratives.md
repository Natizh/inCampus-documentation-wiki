# Use Case Narratives

This page tracks the narrative state of the sourced use cases.
It does not copy every raw narrative; it consolidates readiness, modeling notes, and unresolved questions.

## Source Snapshot

Primary narrative batch:

```text
raw/affine/13:04:2026/Use Cases/
```

Previous relationship diagram batch:

```text
raw/affine/15:04:2026/high-level-use-case-diagram-v1.2/
```

This previous diagram batch is retained as source history only. Current relationship discussion should use the 2026-04-25 `v1.4` diagram source.

Current architecture batch:

```text
raw/affine/25:04:2026/
```

The primary snapshot contains 31 use case narrative files.
Most use the structure requested in the AFFiNE workflow:
- related requirements
- initiating actor
- actor goal
- participating actors
- preconditions
- postconditions
- main success scenario
- alternate scenarios
- potential connections with other use cases
- notes

The 2026-04-25 architecture batch adds current DFD, CRUD, data-store, and use-case relationship modeling on top of these narratives.

## Current Narrative Status

Status: Draft narratives exist.

The narratives are useful for requirements review, but they should not yet be treated as final implementation specifications because:
- final numeric UC IDs are unresolved
- `usecase-diag-v1.4` is current but its final implementation-contract status is unresolved
- several narratives explicitly flag open questions
- some traceability IDs are inconsistent across sources
- older requirements-table scope labels need reconciliation for Send Message and Activity Reminder

## Narrative Inventory

| Narrative | Scope | Main narrative purpose | Important unresolved point |
| --- | --- | --- | --- |
| [[wiki/requirements/use-case-pages/UC - Sign Up with University Email|Sign Up with University Email]] | MVP | Student creates an account with university-affiliated access. | Exact authentication mechanism is not fixed: email verification vs university identity redirection. |
| [[wiki/requirements/use-case-pages/UC - Sign In|Sign In]] | MVP | Student signs back in to a verified account. | No major narrative note captured in the source file. |
| [[wiki/requirements/use-case-pages/UC - Select Campus|Select Campus]] | MVP | Student confirms or selects the campus associated with their university. | Exact onboarding order and whether campus can later be changed are unresolved. |
| [[wiki/requirements/use-case-pages/UC - Set Up Profile|Set Up Profile]] | MVP | Student creates a minimal profile after registration. | Minimal profile fields, photo handling, and whether profile setup blocks app use are unresolved. |
| [[wiki/requirements/use-case-pages/UC - Edit Profile|Edit Profile]] | MVP | Student edits an existing minimal profile. | Exact editable fields are unresolved. |
| [[wiki/requirements/use-case-pages/UC - View Student Minimal Profile|View Student Minimal Profile]] | MVP | Student views another student's minimal profile in relevant activity contexts. | Exact profile fields and visibility limits need final definition. |
| [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]] | MVP | Student host creates a campus activity with category, details, location, limit, and participation mode. | Whether map-based location is in MVP is not fully settled; date/time may be separate or internal. |
| [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]] | MVP | Host sets scheduled date and start time during activity creation. | Whether this is a separate use case, an include relationship, or internal creation steps is unresolved. |
| [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]] | MVP | Student browses campus feed and filters activities. | Gender filter is present in source; policy and product treatment are not expanded. |
| [[wiki/requirements/use-case-pages/UC - View Activity Details|View Activity Details]] | MVP | Student reviews activity details before joining. | Block-related access is now resolved as denied in the architecture batch; behavior for full activities reached through direct links remains less specified. |
| [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]] | MVP | Student joins directly or submits a join request. | Blocked-user handling is resolved as interaction prevention; notification creation belongs to NSF. |
| [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]] | MVP | Host reviews pending requests and approves or declines. | Ordering, batch handling, and states beyond approve/decline are not specified. |
| [[wiki/requirements/use-case-pages/UC - Update Activity Status|Update Activity Status]] | MVP | Host updates activity status, including cancellation or completion. | Current status vocabulary is clearer, but a full state-transition diagram and cancellation edge cases remain open. |
| [[wiki/requirements/use-case-pages/UC - Delete Activity|Delete Activity]] | MVP | Host deletes an activity before it starts. | Architecture batch resolves deletion as hard-delete with linked participation/request deletion; deletion notifications remain unconfirmed. |
| [[wiki/requirements/use-case-pages/UC - Withdraw Join Request|Withdraw Join Request]] | MVP | Student withdraws a pending request before host decision. | Narrowed from US-27 to pending-request withdrawal only. |
| [[wiki/requirements/use-case-pages/UC - Leave Joined Activity|Leave Joined Activity]] | MVP | Student leaves an already joined activity before it starts. | Source treats this separately from withdrawal, but both derive from US-27. |
| [[wiki/requirements/use-case-pages/UC - Notify Host of Join Event|Notify Host of Join Event]] | MVP | System notifies host when someone requests to join or directly joins. | Notification channel, retry behavior, history, and include relationship are unresolved. |
| [[wiki/requirements/use-case-pages/UC - Notify Participant of Application Outcome|Notify Participant of Application Outcome]] | MVP | Participant is informed when a request is approved or declined. | Tapping this notification is not specified, unlike some other notification use cases. |
| [[wiki/requirements/use-case-pages/UC - Notify Participant of Activity Cancellation|Notify Participant of Activity Cancellation]] | MVP | Participant is notified when a joined activity is cancelled. | Relationship to status update use case should be finalized during relationship modeling. |
| [[wiki/requirements/use-case-pages/UC - View Personal Activity List|View Personal Activity List]] | MVP | Student sees upcoming participation separately from past events. | Definition of "past events associated with the student" is broad and not further defined. |
| [[wiki/requirements/use-case-pages/UC - Send Message|Send Message]] | Baseline MVP; deferred in current architecture model | Student sends direct text messages and may share activity links. | Deferred by the 2026-04-25 D&P workdoc; detailed messaging behavior remains unspecified. |
| [[wiki/requirements/use-case-pages/UC - View Community Rules|View Community Rules]] | MVP | Student views rules before and during participation features. | Rule content, acknowledgment, versioning, and violation linkage are not specified. |
| [[wiki/requirements/use-case-pages/UC - Report User or Activity|Report User or Activity]] | MVP | Student submits a report about an inappropriate user or activity. | Report fields, evidence support, and launch contexts are not specified. |
| [[wiki/requirements/use-case-pages/UC - Review Report|Review Report]] | MVP | Campus admin reviews submitted reports and records outcomes. | Moderation action set, reporter feedback, reported-party notification, and evidence fields are unresolved. |
| [[wiki/requirements/use-case-pages/UC - Block User|Block User]] | MVP | Student blocks another user from further direct interaction. | Reciprocal visibility/interactions are resolved; unblock and exact pending-request representation remain open. |
| [[wiki/requirements/use-case-pages/UC - Configure New Campus|Configure New Campus]] | MVP | Campus admin configures a new campus through guided steps. | Exact fields, sequence, and validation rules are not specified. |
| [[wiki/requirements/use-case-pages/UC - Manage Campus Structured Options|Manage Campus Structured Options]] | MVP | Campus admin manages campus locations, activity categories, and similar structured choices. | CRUD details and whether this is only initial setup or ongoing maintenance are unresolved. |
| [[wiki/requirements/use-case-pages/UC - View Friends and Social Indicators|View Friends and Social Indicators]] | postMVP | Student views friends/connections and feed indicators. | Adding/removing friends and chat/profile transitions are not specified. |
| [[wiki/requirements/use-case-pages/UC - Receive Activity Reminder|Receive Activity Reminder]] | MVP architecture branch; baseline postMVP | Student receives a reminder shortly before joined activity start. | Active NSF branch in the architecture batch; delivery channel remains open and requirements tables need scope cleanup. |
| [[wiki/requirements/use-case-pages/UC - Track Participation Points|Track Participation Points]] | postMVP | System awards or deducts points based on participation outcome. | Attendance verification, point values, last-minute cutoff, and balance/history views are unresolved. |
| [[wiki/requirements/use-case-pages/UC - Upload Activity Photo|Upload Activity Photo]] | postMVP | Student uploads a photo after an activity concludes. | Photo rules, moderation, visibility, and retention are not specified. |

## Relationship Modeling Status

Use `raw/affine/25:04:2026/updates/usecase-diag-v1.4.puml` as the latest current relationship source.

Do not treat it as a final implementation contract until formal UC IDs and scope-table cleanup are resolved.

| Relationship area | Latest explicit source basis | Working status |
| --- | --- | --- |
| [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]] and [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]] | `usecase-diag-v1.4` labels the link as include; H&L workdoc treats date/time as part of Create Activity for DFD purposes. | Current include-style working link; final formal UC treatment remains unresolved. |
| [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]] and [[wiki/requirements/use-case-pages/UC - Notify Host of Join Event|Notify Host of Join Event]] | `usecase-diag-v1.4` labels the link as include; D&P/NSF workdocs separate trigger from notification persistence. | Current include-style working link; NSF owns notification consequence. |
| [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]] and [[wiki/requirements/use-case-pages/UC - View Student Minimal Profile|View Student Minimal Profile]] | `usecase-diag-v1.4` labels the link as include; AP/H&L workdocs support applicant profile viewing in request review. | Current include-style working link with mandatory block check before profile exposure. |
| [[wiki/requirements/use-case-pages/UC - Configure New Campus|Configure New Campus]] and [[wiki/requirements/use-case-pages/UC - Manage Campus Structured Options|Manage Campus Structured Options]] | `usecase-diag-v1.4` labels the link as include; CA workdoc treats options as initialized and maintained by CA. | Current include-style working link; exact admin workflow UI remains abstract. |
| [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]] and [[wiki/requirements/use-case-pages/UC - View Activity Details|View Activity Details]] | `usecase-diag-v1.4` labels the link as include. | Current include-style working link. |
| [[wiki/requirements/use-case-pages/UC - Report User or Activity|Report User or Activity]] and [[wiki/requirements/use-case-pages/UC - Review Report|Review Report]] | `usecase-diag-v1.4` labels the link as include; SM workdoc confirms reports feed admin review. | Current include-style working link. |
| [[wiki/requirements/use-case-pages/UC - Block User|Block User]] and [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]] | `usecase-diag-v1.4` labels the link as include; D&P/SM workdocs confirm block check prevents join/request interactions. | Current block constraint is resolved at architecture level. |
| Deferred social/photo/points/reminder links | `usecase-diag-v1.4` labels several deferred links as extend. | Current working diagram link; `Receive Activity Reminder` has a separate architecture-scope upgrade to active MVP NSF branch. |

## Narrative Review Checklist

Use this checklist before treating a narrative as confirmed:

- Actor is clear and matches the source user story.
- Actor goal is user-goal level, not just a UI action.
- Preconditions and postconditions are grounded in requirements.
- Main success scenario does not invent UI details.
- Alternate scenarios are supported by source requirements or explicitly marked as conservative.
- FR and NFR links match source files or are marked as normalized.
- Open questions are preserved rather than silently resolved.
- MVP vs postMVP scope is visible.

## Related Pages

- [[wiki/requirements/use-cases|Use Cases]]
- [[wiki/requirements/traceability|Traceability]]
- [[wiki/project/decisions|Decisions]]
- [[wiki/architecture/overview|Architecture Overview]]
