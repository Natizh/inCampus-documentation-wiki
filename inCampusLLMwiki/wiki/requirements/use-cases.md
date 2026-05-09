# Use Cases

This page is the working home for the InCampus use case inventory.
It consolidates the current AFFiNE source snapshots without treating the use case set as final.

## Source Snapshot

Primary narrative batch:

```text
raw/affine/13-04-2026/
```

Current requirements and use-case table batch:

```text
raw/affine/09-05-2026/
```

Previous diagram batch:

```text
raw/affine/15-04-2026/
```

Current architecture batch:

```text
raw/affine/09-05-2026/
```

Primary narrative source files:
- `Home.md`
- 31 files under `Use Cases/`

Current requirements and use-case table files:
- `updates/User Story v1.3.md`
- `updates/Functional Requirements v1.3.md`
- `updates/Non-Functional Requirements v1.2.md`
- `updates/Use cases v1.2.md`
- `updates/use-case-diagram-v1.7.md`

Previous diagram source files:
- `high-level-use-case-diagram-v1.2/usecase-diag-v1.2.puml`
- `high-level-use-case-diagram-v1.2/usecase-diag-v1.2.svg`

Previous diagram files are retained as source history only. Current relationship discussion should use `use-case-diagram-v1.7.md` as the normative first-skeleton diagram source. The older `use-case-diagram-v1.6.md` export remains immediate pre-alignment history only.

Current architecture source files:
- `system architecture/01 Design Scope and Architectural Choice v1.1.md`
- `updates/CRUD matrix v1.6.md`
- `updates/Entities & Attributes v1.2.md`
- `updates/Databases v1.1.md`
- `updates/Relationship Table v1.1.md`
- sequence, collaboration, and state-chart diagram workdocs

The latest exported relationship diagram source is `raw/affine/09-05-2026/updates/use-case-diagram-v1.7.md`.

Note: `Home.md` contains an `OUTDATED` marker. The use case inventory below is grounded primarily in the dedicated use case and requirements files, with current ranking and priority data taken from `Use cases v1.2.md`. The 2026-04-15 diagram batch is used only as diagram history.

## Current Status

Status: Draft source inventory.

The source provides:
- 31 use case narrative files
- 33 current use-case table entries
- actors and goals for each narrative
- related FR and NFR anchors
- a priority/ranking table
- source user story links
- a current working use-case relationship diagram export and architecture-analysis package

The source does not yet provide:
- final numeric use case IDs
- dedicated narrative files for `Update Campus Insight Consent` or `View Consent-Based Student Insights`
- final documentation treatment for `Set Activity Date and Time`, which is folded into `Create Activity` for the first skeleton while preserved as a sourced card
- a true Activity lifecycle state-chart source

Until formal UC IDs are assigned, use the textual use case names as the practical identifiers.

## Page Roles

The pages under `wiki/requirements/use-case-pages/` are concise derived index cards for navigation and review.
They do not replace the raw AFFiNE narrative files.

The `UC -` filename prefix is intentional.
It distinguishes derived wiki pages from raw source files with similar titles, such as `Join Activity.md` in the AFFiNE export.

Do not merge or delete the raw files.
Treat raw files as immutable sources and the `UC - ...` pages as maintained wiki artifacts.

## Ranking Criteria

The `Home.md` ranking table scores use cases from 1 to 5 across six factors:

1. Significant impact on architectural design.
2. Easy to implement but containing significant functionality.
3. Risky, time-critical, or complex functions.
4. Significant research or new/risky technology.
5. Primary business functions.
6. Contribution to increasing revenue or decreasing costs.

The `Priority` column below is the total score from the source table.

## Current Use Case Relationship Diagram Snapshot

The latest exported relationship source is:

```text
raw/affine/09-05-2026/updates/use-case-diagram-v1.7.md
```

Its version log says the 2026-05-08 final pre-skeleton diagram:
- is the normative MVP first-skeleton diagram source;
- includes `Update Campus Insight Consent` and `View Consent-Based Student Insights`;
- includes `Receive Activity Reminder` as MVP;
- uses canonical Student Profile naming;
- removes the deferred/postMVP package;
- does not represent `Set Activity Date and Time` as a standalone use case because date/time remains part of `Create Activity`.

The previous `raw/affine/25-04-2026/updates/usecase-diag-v1.4.puml` remains useful as relationship history, but it is no longer the latest diagram export.

Architecture-scope notes from the 2026-04-25 and 2026-05-03 batches:
- `Send Message` is excluded from the current D&P MVP model and is now postMVP in the 2026-05-08 requirements table.
- `Receive Activity Reminder` appeared in the deferred package in `v1.4`, but the 2026-05-09 final pre-skeleton sources now align it as MVP/current.

Additional architecture-scope notes from the 2026-05-03 batch:
- `Set Activity Date and Time` is no longer treated as a standalone H&L DFD process; date/time selection and validation are internal to `Create Activity` for architecture modeling.
- Sign-up includes university email verification plus password creation; `PasswordHash` belongs to `DS-AP-001 Student Account`.
- Consent-based campus insight access is grounded by `CampusInsightSharingConsent`; the 2026-05-08 requirements batch adds `US-29`, `US-30`, and two use-case table entries, while detailed narratives, admin identity modeling, authorization mechanics, and consent UI placement remain unresolved.
- Pending request withdrawal is non-notifying for the first skeleton: no host notification, no NSF handler, and no `DS-NS-001` record.

## Use Case Inventory

| Use case | Scope | Initiating actor | Source US | Related requirements | Priority | Status |
| --- | --- | --- | --- | --- | ---: | --- |
| [[wiki/requirements/use-case-pages/UC - Sign Up with University Email|Sign Up with University Email]] | MVP | Student | US-01 | FR-0101, FR-0102, FR-0103, FR-0104, FR-0105; NFR-01, NFR-02, NFR-03, NFR-04, NFR-05 | 21 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Sign In|Sign In]] | MVP | Student | US-15 | FR-1501; NFR-29 | 19 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Select Campus|Select Campus]] | MVP | Student | US-16 | FR-0105, FR-1601; NFR-30 | 20 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Update Campus Insight Consent|Update Campus Insight Consent]] | MVP | Student | US-29 | FR-2901, FR-2902, FR-2903; NFR-45, NFR-46, NFR-47 | 19 | First-skeleton table/diagram entry exists; dedicated narrative file missing |
| [[wiki/requirements/use-case-pages/UC - Set Up Profile|Set Up Profile]] | MVP | Student | US-14 | FR-1401; NFR-27 | 15 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Edit Profile|Edit Profile]] | MVP | Student | US-14 | FR-1402; NFR-27 | 11 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - View Student Minimal Profile|View Student Minimal Profile]] | MVP | Student | US-22 | FR-1403, FR-0501; NFR-28, NFR-36 | 14 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]] | MVP | Student host | US-03 | FR-0301, FR-0302, FR-0303, FR-0304, FR-0305; NFR-10, NFR-11, NFR-13 | 20 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]] | Merged into Create Activity for first skeleton | Student host | US-25 | FR-2501, FR-2502, FR-0402, FR-0404; NFR-10, NFR-41 | 14 | Draft narrative exists; preserved as sourced card, but not standalone in `use-case-diagram-v1.7.md` |
| [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]] | MVP | Student guest | US-04 | FR-0401, FR-0402, FR-0403, FR-0404, FR-0405, FR-0406; NFR-11, NFR-16, NFR-17 | 21 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - View Activity Details|View Activity Details]] | MVP | Student guest or participant | US-21 | FR-0302, FR-0402; NFR-35 | 18 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]] | MVP | Student guest | US-20 | FR-0305, FR-2001, FR-2002, FR-0502; NFR-13, NFR-34 | 23 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]] | MVP | Student host | US-05 | FR-0501, FR-0502, FR-2002, FR-1403; NFR-12, NFR-13 | 20 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Update Activity Status|Update Activity Status]] | MVP | Student host | US-05, US-28 | FR-0503, FR-2801, FR-2802, FR-2803, FR-2804; NFR-12, NFR-44 | 19 | Draft narrative exists; state vocabulary partially clarified |
| [[wiki/requirements/use-case-pages/UC - Delete Activity|Delete Activity]] | MVP | Student host | US-26 | FR-2601, FR-2602, FR-2603; NFR-12, NFR-42 | 16 | Draft narrative exists; hard-delete behavior clarified |
| [[wiki/requirements/use-case-pages/UC - Withdraw Join Request|Withdraw Join Request]] | MVP | Student | US-27 | FR-2701, FR-2703, FR-2704; NFR-43 | 14 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Leave Joined Activity|Leave Joined Activity]] | MVP | Student | US-27 | FR-2702, FR-2703, FR-2704; NFR-43, NFR-13, NFR-22 | 14 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Notify Host of Join Event|Notify Host of Join Event]] | MVP | System | US-06 | FR-0601, FR-0602, FR-0603; NFR-14, NFR-15 | 16 | Draft narrative exists; NSF ownership clarified, delivery details unresolved |
| [[wiki/requirements/use-case-pages/UC - Notify Participant of Application Outcome|Notify Participant of Application Outcome]] | MVP | Activity host | US-07 | FR-0701, FR-0702, FR-0703, FR-0704, FR-2002; NFR-18, NFR-19 | 16 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Notify Participant of Activity Cancellation|Notify Participant of Activity Cancellation]] | MVP | Student participant | US-28 | FR-0503, FR-2801, FR-2802, FR-2803, FR-2804; NFR-44, NFR-19 | 15 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - View Personal Activity List|View Personal Activity List]] | MVP | Student | US-09 | FR-0901, FR-0902; NFR-22 | 11 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Send Message|Send Message]] | postMVP; deferred in current architecture model | Student | US-08 | FR-0801, FR-0802, FR-0803; NFR-20, NFR-21 | 18 | Draft narrative exists; deferred by updated requirements table and D&P workdoc `v5` |
| [[wiki/requirements/use-case-pages/UC - View Community Rules|View Community Rules]] | MVP | Student | US-19 | FR-1901; NFR-33 | 13 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Report User or Activity|Report User or Activity]] | MVP | Student | US-17 | FR-1701, FR-0201, FR-0202, FR-0203; NFR-31, NFR-06, NFR-08 | 15 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Review Report|Review Report]] | MVP | Campus admin | US-02 | FR-0201, FR-0202, FR-0203; NFR-06, NFR-07, NFR-08, NFR-09 | 15 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Block User|Block User]] | MVP | Student | US-18 | FR-1801, FR-1802; NFR-32 | 14 | Draft narrative exists; reciprocal block effects partially resolved |
| [[wiki/requirements/use-case-pages/UC - Configure New Campus|Configure New Campus]] | MVP | Campus admin | US-23 | FR-2301, FR-2302; NFR-37, NFR-38 | 22 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - Manage Campus Structured Options|Manage Campus Structured Options]] | MVP | Campus admin | US-24 | FR-0301, FR-0304, FR-2302; NFR-39, NFR-40 | 20 | Draft narrative exists |
| [[wiki/requirements/use-case-pages/UC - View Consent-Based Student Insights|View Consent-Based Student Insights]] | MVP | Campus admin | US-30 | FR-2902, FR-2903, FR-3001; NFR-45, NFR-46, NFR-47 | 20 | First-skeleton table/diagram entry exists; sequence/collaboration diagrams exist; dedicated narrative file missing |
| [[wiki/requirements/use-case-pages/UC - View Friends and Social Indicators|View Friends and Social Indicators]] | postMVP | Student | US-10 | FR-1001, FR-1002; NFR-23 | 13 | Draft narrative exists; deferred |
| [[wiki/requirements/use-case-pages/UC - Receive Activity Reminder|Receive Activity Reminder]] | MVP | Student | US-11 | FR-1101; NFR-24 | 13 | Draft narrative exists; active NSF reminder branch in first-skeleton sources |
| [[wiki/requirements/use-case-pages/UC - Track Participation Points|Track Participation Points]] | postMVP | System | US-12 | FR-1201; NFR-25 | 15 | Draft narrative exists; deferred |
| [[wiki/requirements/use-case-pages/UC - Upload Activity Photo|Upload Activity Photo]] | postMVP | Student | US-13 | FR-1301; NFR-26 | 11 | Draft narrative exists; deferred |

## Highest Priority Use Cases

Current highest priority scores from the source ranking:

| Use case | Priority | Notes |
| --- | ---: | --- |
| [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]] | 23 | Core participation flow and highest ranked use case. |
| [[wiki/requirements/use-case-pages/UC - Configure New Campus|Configure New Campus]] | 22 | Important for campus scalability and configuration. |
| [[wiki/requirements/use-case-pages/UC - Sign Up with University Email|Sign Up with University Email]] | 21 | Core access and safety boundary. |
| [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]] | 21 | Core discovery flow. |
| [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]] | 20 | Core supply-side activity flow. |
| [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]] | 20 | Core host control flow. |
| [[wiki/requirements/use-case-pages/UC - Select Campus|Select Campus]] | 20 | Core campus scoping flow. |
| [[wiki/requirements/use-case-pages/UC - Manage Campus Structured Options|Manage Campus Structured Options]] | 20 | Supports campus-specific options. |
| [[wiki/requirements/use-case-pages/UC - View Consent-Based Student Insights|View Consent-Based Student Insights]] | 20 | Supports consent-scoped campus insight access for authorized campus admins. |

## Core MVP Flow

The sourced MVP can be read as this rough flow:

1. Student [[wiki/requirements/use-case-pages/UC - Sign Up with University Email|signs up with university email]].
2. Student [[wiki/requirements/use-case-pages/UC - Select Campus|selects or confirms campus]].
3. Student [[wiki/requirements/use-case-pages/UC - Set Up Profile|creates a minimal profile]].
4. Student host [[wiki/requirements/use-case-pages/UC - Create Activity|creates an activity]].
5. Other students [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|browse and filter activities]] and [[wiki/requirements/use-case-pages/UC - View Activity Details|view activity details]].
6. Student [[wiki/requirements/use-case-pages/UC - Join Activity|joins directly or requests to join]].
7. Host [[wiki/requirements/use-case-pages/UC - Manage Join Requests|manages join requests]] when approval is required.
8. [[wiki/requirements/use-case-pages/UC - Notify Host of Join Event|Host notifications]], joined-participant leave notifications, [[wiki/requirements/use-case-pages/UC - Notify Participant of Application Outcome|application outcome notifications]], [[wiki/requirements/use-case-pages/UC - Notify Participant of Activity Cancellation|cancellation notifications]], and [[wiki/requirements/use-case-pages/UC - Receive Activity Reminder|activity reminders]] inform people of important participation changes in the current architecture model. Pending-request withdrawal is non-notifying in the first skeleton.
9. Students [[wiki/requirements/use-case-pages/UC - Withdraw Join Request|withdraw requests]], [[wiki/requirements/use-case-pages/UC - Leave Joined Activity|leave joined activities]], and [[wiki/requirements/use-case-pages/UC - View Personal Activity List|view personal activity lists]].
10. [[wiki/requirements/use-case-pages/UC - View Community Rules|Rules]], [[wiki/requirements/use-case-pages/UC - Report User or Activity|reports]], [[wiki/requirements/use-case-pages/UC - Block User|blocking]], and [[wiki/requirements/use-case-pages/UC - Review Report|admin report review]] support basic trust and safety.

The 2026-05-09 tables and first-skeleton diagrams also include a consent/insight side path: students can [[wiki/requirements/use-case-pages/UC - Update Campus Insight Consent|update campus insight consent]], and authorized campus admins can [[wiki/requirements/use-case-pages/UC - View Consent-Based Student Insights|view consent-based student insights]] within campus scope. The source has not yet provided full narrative files for these two use cases.

## Current Modeling Issues

- Formal numeric UC IDs are not assigned.
- [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]] is modeled as part of [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]] for first-skeleton DFD/diagram purposes, but its derived card remains for source traceability.
- Host and participant notification use cases remain formal use case inventory items, while NSF owns notification consequences in the DFD model.
- [[wiki/requirements/use-case-pages/UC - Update Campus Insight Consent|Update Campus Insight Consent]] and [[wiki/requirements/use-case-pages/UC - View Consent-Based Student Insights|View Consent-Based Student Insights]] are present in the 2026-05-09 use-case table/diagram package but do not yet have dedicated narrative files.
- Pending-request withdrawal host notification behavior is resolved as non-notifying by CRUD Matrix `v1.6` and the first-skeleton behavioral/state diagrams.
- `use-case-diagram-v1.7.md` is the latest normative MVP first-skeleton diagram source.
- The activity state vocabulary is clearer in the architecture batch, but a full state-transition diagram is not final.
- Some source traceability uses inconsistent requirement ID formatting, such as `FR-301` vs `FR-0301`.
- A true Activity lifecycle state chart source is still missing; the delivered SCD package models `ActivityParticipation` instead.

## Use Case Template

Use this template when a use case is revised or finalized.

```markdown
## UC-XXX: Title

Status: Draft | Confirmed | Revised | Superseded

Primary actor:

Goal:

Scope:

Trigger:

Preconditions:

Main success scenario:
1.
2.
3.

Alternative flows:
-

Exceptions:
-

Linked user stories:
- US-XXX

Linked functional requirements:
- FR-XXX

Linked non-functional requirements:
- NFR-XXX

Source snapshots:
- raw/affine/YYYY-MM-DD-batch/file.md

Open questions:
-
```

## Related Pages

- [[wiki/requirements/use-case-narratives|Use Case Narratives]]
- [[wiki/requirements/traceability|Traceability]]
- [[wiki/project/overview|Project Overview]]
- [[wiki/project/decisions|Decisions]]
- [[wiki/architecture/overview|Architecture Overview]]
