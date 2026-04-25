# Traceability

This page links user stories, functional requirements, non-functional requirements, use cases, and current architecture-scope overlays.

## Source Snapshot

Primary requirements source batch:

```text
raw/affine/13:04:2026/
```

Current architecture source batch:

```text
raw/affine/25:04:2026/
```

Primary sources:
- `Requirements/User Story.md`
- `Requirements/Functional Requirements.md`
- `Requirements/Non-Functional Requirements.md`
- `Use Cases/*.md`
- `Home.md` for use case ranking and source-US mapping
- `CRUD matrix (1).md`, subgroup DFD workdocs, and `updates/usecase-diag-v1.4.puml` for architecture-scope overlays

## Source Counts

| Artifact type | Count | Source |
| --- | ---: | --- |
| User stories | 28 | `Requirements/User Story.md` |
| Functional requirements | 65 | `Requirements/Functional Requirements.md` |
| Non-functional requirements | 44 | `Requirements/Non-Functional Requirements.md` |
| Use case narrative files | 31 | `Use Cases/` |

## ID Normalization Note

The source files are inconsistent about leading zeroes in requirement IDs.

Examples:
- `User Story.md` and `Home.md` sometimes use `FR-101`, `FR-301`, or `FR-501`.
- `Functional Requirements.md` uses `FR-0101`, `FR-0301`, and `FR-0501`.

In the matrix below, IDs are shown in the zero-padded form used by `Functional Requirements.md` when the mapping is direct and unambiguous.
This is a normalization for readability, not a change to the raw source.

## Architecture Scope Overlay

The original requirements tables still provide the baseline traceability.

The 2026-04-25 architecture batch adds two scope overlays that need source-table cleanup:
- `US-08 / Send Message` is excluded from the current D&P MVP model and postponed.
- `US-11 / Receive Activity Reminder` is included as an active MVP notification branch in NSF and CRUD Matrix `v1.4`.

Until the requirements tables are updated, the matrix preserves the original source story IDs and marks these scope differences explicitly.

## User Story Traceability Matrix

| US | Scope | Source story summary | FR links | NFR links | Linked use cases | Status |
| --- | --- | --- | --- | --- | --- | --- |
| US-01 | MVP | Student signs up with university email for safer university-only access. | FR-0101, FR-0102, FR-0103, FR-0104, FR-0105 | NFR-01, NFR-02, NFR-03, NFR-04, NFR-05 | [[wiki/requirements/use-case-pages/UC - Sign Up with University Email|Sign Up with University Email]] | Draft traced |
| US-02 | MVP | Campus admin reviews reports about inappropriate users or activities. | FR-0201, FR-0202, FR-0203 | NFR-06, NFR-07, NFR-08, NFR-09 | [[wiki/requirements/use-case-pages/UC - Review Report|Review Report]] | Draft traced |
| US-03 | MVP | Student creates an activity with category, details, and participant limit. | FR-0301, FR-0302, FR-0303, FR-0304, FR-0305 | NFR-10, NFR-11, NFR-13 | [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]] | Draft traced |
| US-04 | MVP | Student browses and filters activities by preference. | FR-0401, FR-0402, FR-0403, FR-0404, FR-0405, FR-0406 | NFR-11, NFR-16, NFR-17 | [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]] | Draft traced |
| US-05 | MVP | Host reviews join requests and manages activity status. | FR-0305, FR-0501, FR-0502, FR-0503, FR-1403, FR-2001, FR-2002 | NFR-12, NFR-13 | [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]]; [[wiki/requirements/use-case-pages/UC - Update Activity Status|Update Activity Status]] | Draft traced |
| US-06 | MVP | Host receives notification when someone requests to join or directly joins. | FR-0601, FR-0602, FR-0603, FR-2001 | NFR-14, NFR-15 | [[wiki/requirements/use-case-pages/UC - Notify Host of Join Event|Notify Host of Join Event]] | Draft traced |
| US-07 | MVP | Participant receives approval or decline notification. | FR-0701, FR-0702, FR-0703, FR-0704, FR-2002 | NFR-18, NFR-19 | [[wiki/requirements/use-case-pages/UC - Notify Participant of Application Outcome|Notify Participant of Application Outcome]] | Draft traced |
| US-08 | Baseline MVP; deferred in current architecture model | Student sends messages and may share activity links. | FR-0801, FR-0802, FR-0803 | NFR-20, NFR-21 | [[wiki/requirements/use-case-pages/UC - Send Message|Send Message]] | Draft traced; postponed by 2026-04-25 D&P workdoc |
| US-09 | MVP | Student sees upcoming participation and past events. | FR-0901, FR-0902 | NFR-22 | [[wiki/requirements/use-case-pages/UC - View Personal Activity List|View Personal Activity List]] | Draft traced |
| US-10 | postMVP | Student views friends/connections and friend participation indicators. | FR-1001, FR-1002 | NFR-23 | [[wiki/requirements/use-case-pages/UC - View Friends and Social Indicators|View Friends and Social Indicators]] | Draft traced; deferred |
| US-11 | Baseline postMVP; active MVP architecture branch | Student receives a reminder before a joined activity starts. | FR-1101 | NFR-24 | [[wiki/requirements/use-case-pages/UC - Receive Activity Reminder|Receive Activity Reminder]] | Draft traced; active NSF reminder branch in 2026-04-25 architecture batch |
| US-12 | postMVP | Student receives or loses participation points based on attendance. | FR-1201 | NFR-25 | [[wiki/requirements/use-case-pages/UC - Track Participation Points|Track Participation Points]] | Draft traced; deferred |
| US-13 | postMVP | Student uploads a photo after attending an activity. | FR-1301 | NFR-26 | [[wiki/requirements/use-case-pages/UC - Upload Activity Photo|Upload Activity Photo]] | Draft traced; deferred |
| US-14 | MVP | Student creates and edits a minimal profile after registration. | FR-1401, FR-1402, FR-1403 | NFR-27, NFR-28 | [[wiki/requirements/use-case-pages/UC - Set Up Profile|Set Up Profile]]; [[wiki/requirements/use-case-pages/UC - Edit Profile|Edit Profile]]; related downstream: [[wiki/requirements/use-case-pages/UC - View Student Minimal Profile|View Student Minimal Profile]] | Draft traced |
| US-15 | MVP | Student signs in to a verified account with password. | FR-1501 | NFR-29 | [[wiki/requirements/use-case-pages/UC - Sign In|Sign In]] | Draft traced |
| US-16 | MVP | Student confirms or selects campus during onboarding. | FR-0105, FR-1601 | NFR-30 | [[wiki/requirements/use-case-pages/UC - Select Campus|Select Campus]] | Draft traced |
| US-17 | MVP | Student reports an inappropriate user or activity. | FR-0201, FR-0202, FR-0203, FR-1701 | NFR-06, NFR-08, NFR-31 | [[wiki/requirements/use-case-pages/UC - Report User or Activity|Report User or Activity]] | Draft traced |
| US-18 | MVP | Student blocks another user to avoid unwanted interaction. | FR-1801, FR-1802 | NFR-32 | [[wiki/requirements/use-case-pages/UC - Block User|Block User]] | Draft traced |
| US-19 | MVP | Student views community rules before using participation features. | FR-1901 | NFR-33 | [[wiki/requirements/use-case-pages/UC - View Community Rules|View Community Rules]] | Draft traced |
| US-20 | MVP | Student requests to join an activity or joins directly. | FR-0305, FR-0502, FR-2001, FR-2002 | NFR-13, NFR-34 | [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]] | Draft traced |
| US-21 | MVP | Student views activity details before joining. | FR-0302, FR-0402 | NFR-35 | [[wiki/requirements/use-case-pages/UC - View Activity Details|View Activity Details]] | Draft traced |
| US-22 | MVP | Student views another student's minimal profile in activity contexts. | FR-0501, FR-1403 | NFR-28, NFR-36 | [[wiki/requirements/use-case-pages/UC - View Student Minimal Profile|View Student Minimal Profile]] | Draft traced |
| US-23 | MVP | Campus admin configures a new campus through guided steps. | FR-2301, FR-2302 | NFR-37, NFR-38 | [[wiki/requirements/use-case-pages/UC - Configure New Campus|Configure New Campus]] | Draft traced |
| US-24 | MVP | Campus admin manages campus-specific structured options. | FR-0301, FR-0304, FR-2302 | NFR-39, NFR-40 | [[wiki/requirements/use-case-pages/UC - Manage Campus Structured Options|Manage Campus Structured Options]] | Draft traced |
| US-25 | MVP | Student host sets activity date and time during creation. | FR-0402, FR-0404, FR-2501, FR-2502 | NFR-10, NFR-41 | [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]] | Draft traced; DFD treats date/time as part of [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]], formal UC treatment unresolved |
| US-26 | MVP | Host deletes an activity before it starts. | FR-2601, FR-2602, FR-2603 | NFR-12, NFR-42 | [[wiki/requirements/use-case-pages/UC - Delete Activity|Delete Activity]] | Draft traced |
| US-27 | MVP | Student withdraws a pending request or leaves a joined activity before start. | FR-0901, FR-2701, FR-2702, FR-2703, FR-2704 | NFR-13, NFR-22, NFR-43 | [[wiki/requirements/use-case-pages/UC - Withdraw Join Request|Withdraw Join Request]]; [[wiki/requirements/use-case-pages/UC - Leave Joined Activity|Leave Joined Activity]] | Draft traced |
| US-28 | MVP | Participant receives notification when a joined activity is cancelled. | FR-0503, FR-2801, FR-2802, FR-2803, FR-2804 | NFR-19, NFR-44 | [[wiki/requirements/use-case-pages/UC - Notify Participant of Activity Cancellation|Notify Participant of Activity Cancellation]]; related trigger: [[wiki/requirements/use-case-pages/UC - Update Activity Status|Update Activity Status]] | Draft traced |

## Functional Areas

| Area | User stories |
| --- | --- |
| Access and Identity | US-01, US-15, US-16 |
| Activity Management | US-03, US-04, US-05, US-06, US-07, US-11, US-20, US-21, US-25, US-26, US-27, US-28 |
| Personal and Social Area | US-08, US-09, US-10, US-12, US-13 |
| Safety and Moderation | US-02, US-17, US-18, US-19 |
| User Profile | US-14, US-22 |
| Campus Config and Scalability | US-23, US-24 |

## Traceability Gaps And Ambiguities

- Formal UC IDs are not yet stable; use case names are currently the practical identifiers.
- Some source files use inconsistent FR numbering with and without leading zeroes.
- `Home.md` includes an `OUTDATED` marker, so use its ranking table carefully.
- Story points, estimated duration, and backlog order are blank in `User Story.md`.
- `Phase` is blank for all rows in `Functional Requirements.md` and `Non-Functional Requirements.md`.
- US-25 through US-28 and FR-2501 through FR-2804 have missing creator/date fields in the current source.
- NFR-41 through NFR-44 have missing creator/date fields in the current source.
- Several use case narratives contain conservative assumptions that need team confirmation before implementation.
- The postMVP stories have narratives, but the source still marks them as postMVP.
- `US-08` and `US-11` need requirements-table reconciliation against the 2026-04-25 architecture batch.
- Some architecture artifacts still contain stale wording around withdrawal notifications, deletion notification triggers, and archive behavior; see [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]].

## Gap Checks

Use this checklist during requirements reviews:

- Every confirmed user story links to at least one use case.
- Every confirmed functional requirement links to at least one user story or use case.
- Every confirmed non-functional requirement links to the use cases or product qualities it constrains.
- Every confirmed use case links back to the requirements that justify it.
- Safety, privacy, and local campus relevance are not left as vague product wishes if they affect behavior.
- Superseded requirements are marked rather than silently deleted from the wiki.

## Related Pages

- [[wiki/requirements/use-cases|Use Cases]]
- [[wiki/requirements/use-case-narratives|Use Case Narratives]]
- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/planning/workflow|Workflow]]
- [[wiki/project/decisions|Decisions]]
