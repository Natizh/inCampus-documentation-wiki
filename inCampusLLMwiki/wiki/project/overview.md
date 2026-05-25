# Project Overview

## Stable Identity

InCampus is a mobile app designed to reduce isolation in university campus life.

It helps students find low-pressure opportunities to share ordinary campus moments with other nearby students, such as:
- lunch
- coffee breaks
- study sessions
- sports
- small campus activities

The current rollout focus is Tongji University, Jiading Campus.

The project is being developed by a student team. The current documentation pass is complete enough to serve as the baseline for the first implementation skeleton.

## Product Stance

InCampus is not a dating app.

The product should feel:
- local
- simple
- believable
- safe
- easy to use

The app should support ordinary social participation without making the interaction feel high-pressure.

## Source Snapshot

Latest ingested snapshot:

```text
raw/affine/09-05-2026/
```

Latest requirements and use-case table source:

```text
raw/affine/09-05-2026/
```

Latest full narrative baseline:

```text
raw/affine/13-04-2026/
```

Baseline requirements files:
- `Home.md`
- 31 Markdown files in `Use Cases/`

Latest requirements/use-case table files:
- `updates/User Story v1.3.md`
- `updates/Functional Requirements v1.3.md`
- `updates/Non-Functional Requirements v1.2.md`
- `updates/Use cases v1.2.md`
- `updates/use-case-diagram-v1.7.md`

Latest architecture files:
- `system architecture/01 Design Scope and Architectural Choice v1.1.md`
- `system architecture/System Architecture Diagram/index v1.1.md`
- `updates/Entities & Attributes v1.2.md`
- `updates/Relationship Table v1.1.md`
- `updates/CRUD matrix v1.6.md`
- `updates/Databases v1.1.md`
- sequence, collaboration, and state-chart diagram workdocs under `raw/affine/09-05-2026/`

Previous architecture baseline files from `raw/affine/25-04-2026/` remain important for the integrated DFD package, diagram exports, and `updates/usecase-diag-v1.4.puml`. The 2026-05-03 batch remains important for ERD history, while the 2026-05-09 batch supersedes it for first-skeleton CRUD, entity catalog, relationship table, and system architecture choices.

Note: `Home.md` contains an `OUTDATED` marker near the top. Treat workflow, MVP scope, and ranking information from that page as useful project context, but prefer the dedicated requirements and use case files for detailed [[wiki/requirements/traceability|traceability]].

## Problem Context

The source describes the target users as university students living on or around campus, especially students who spend large parts of the day alone outside class hours.

The core problem is social isolation during campus time. The project frames the problem around the absence of a simple, low-friction way to find someone to share ordinary campus moments with.

The source contrasts InCampus with existing alternatives:
- relying only on existing friends or roommates
- using generic social media or messaging apps
- joining broad group chats
- doing nothing and spending time alone

## Current MVP Scope

The source lists these MVP areas:

1. Campus-based onboarding.
2. Minimal profile.
3. Create activity.
4. Browse campus activity feed.
5. Join or request to join.
6. Activity status management.
7. Basic trust and safety: rules, report, block.

See [[wiki/requirements/use-cases|Use Cases]] for the canonical use case inventory and individual use case pages.

The 2026-05-08 requirements table marks 25 user stories as MVP and 5 user stories as postMVP.

The 2026-04-25 architecture batch adds a current architecture-scope overlay:
- `US-11: Receive Activity Reminder` is now modeled as an active MVP notification branch.
- `US-08: Send Message` is excluded/postponed from the current D&P MVP model.

The 2026-05-03 batch adds a data-model and structural overlay:
- sign-up now includes university email verification plus password creation, with `PasswordHash` on `DS-AP-001 Student Account`;
- consent-based campus insight access is introduced as a controlled extension through `CampusInsightSharingConsent`;
- `Set Activity Date and Time` is confirmed as internal to `Create Activity` for architecture modeling;
- the batch first exposed the pending-request withdrawal conflict later resolved by the 2026-05-09 first-skeleton sources in favor of non-notifying behavior.

The 2026-05-08 requirements refresh adds:
- `US-29`: student control over consent-based campus insight sharing;
- `US-30`: authorized campus admin viewing of consent-based student insights within campus scope;
- `FR-2901` through `FR-3001`;
- `NFR-45` through `NFR-47`;
- two table/diagram-only use cases, retained in the 2026-05-09 first-skeleton package until dedicated narrative source files exist: [[wiki/requirements/use-case-pages/UC - Update Campus Insight Consent|Update Campus Insight Consent]] and [[wiki/requirements/use-case-pages/UC - View Consent-Based Student Insights|View Consent-Based Student Insights]].

The 2026-05-09 final pre-skeleton batch supersedes the previous scope conflicts:
- the first code skeleton uses a multi-tenant modular monolith with event-driven internal flows; see [[wiki/architecture/first-skeleton-architecture|First Skeleton Architecture]];
- `Receive Activity Reminder` is now MVP in `User Story v1.3`, `Use cases v1.2`, and the first-skeleton diagram;
- `Set Activity Date and Time` is folded into `Create Activity` for the first-skeleton diagram and architecture model, while its derived card remains as source-history context;
- pending request withdrawal is non-notifying: no host notification, no NSF handler, and no `DS-NS-001` record;
- Campus Admin identity is runtime `AuthenticatedAdminContext`, not a first-skeleton canonical store.

PostMVP user stories in the 2026-05-09 requirements table:
- US-08: send messages and share activity links
- US-10: friends/connections and social indicators
- US-12: participation points
- US-13: upload activity photo after an activity

## Actors

The source identifies these main actors:
- Student
- Student host
- Student guest or participant
- Campus admin
- System, for automated notification and point-tracking triggers in some use case narratives

## Requirements Snapshot

Current sourced requirements:

| Artifact type | Count | Source |
| --- | ---: | --- |
| User stories | 30 | `User Story v1.3.md` |
| Functional requirements | 69 | `Functional Requirements v1.3.md` |
| Non-functional requirements | 47 | `Non-Functional Requirements v1.2.md` |
| Current use-case table entries | 33 | `Use cases v1.2.md` |
| Use case narrative files | 31 | `Use Cases/` |

## Current Phase

The team is currently in the implementation phase.

The 2026-04-25 source moved the project from use-case work into architecture analysis. The 2026-05-03 and 2026-05-08 batches extended and refreshed that package. The 2026-05-09 batch closes the current documentation cycle as a first-skeleton implementation baseline with CRUD Matrix `v1.6`, entity catalog `v1.2`, use-case diagram `v1.7`, system architecture `v1.1`, and behavioral/state diagrams.

Current implementation work focuses on:
- the first code skeleton aligned with the documented modular-monolith baseline
- module and store boundaries consistent with the documented ownership model
- event handling and notification consequences aligned with the first-skeleton event catalog
- persistence and lifecycle behavior aligned with the current data model and CRUD invariants
- traceability from implementation back to use cases and requirements

See [[wiki/architecture/overview|Architecture Overview]] for the current architecture baseline.

## Weekly Milestones

The source lists these weekly milestones without exact dates:

1. MVP scope approved.
2. UX and architecture frozen.
3. Core flow implemented.
4. Full MVP implemented.
5. Tested and polished MVP.
6. Final presentation and roadmap.

## Unresolved

The following points are not yet fully decided or are only partially specified in the ingested material:

- formal numeric use case ID scheme
- final formal UC ID scheme beyond the `DUC-*` labels used in the first-skeleton diagram
- true Activity lifecycle state chart source; the 2026-05-09 SCD package only provided `ActivityParticipation`, `StudentProfile`, and `ReportRecord`
- exact MVP handling of map-based campus locations
- exact minimal profile fields and whether a profile photo is included
- whether profile completion is mandatory before app use
- exact authentication mechanism details beyond current university email verification plus password-hash model
- notification channels and history model
- exact unblock behavior
- report form fields, evidence handling, reporter feedback, and moderation action set
- campus insight narrative detail, consent UI placement, exact insight fields, and admin authentication implementation behind `AuthenticatedAdminContext`
- whether a future post-skeleton release needs a persisted Campus Admin entity/store; no such store exists in the first skeleton
- attendance verification and point scheme for postMVP participation points
- whether activity end time is explicit, derived, or absent
- whether students can change campus after onboarding
- final documentation treatment for the preserved [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]] card now that `use-case-diagram-v1.7.md` folds it into Create Activity

## Related Pages

- [[wiki/project/decisions|Decisions]]
- [[wiki/project/weekly-status|Weekly Status]]
- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/requirements/use-cases|Use Cases]]
- [[wiki/requirements/use-case-narratives|Use Case Narratives]]
- [[wiki/requirements/traceability|Traceability]]
