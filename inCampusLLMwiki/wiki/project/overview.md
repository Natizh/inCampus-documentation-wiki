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

The project is being developed by a student team and is expected to evolve from requirements analysis to full app design and development.

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
raw/affine/25:04:2026/
```

Latest full requirements and narrative baseline:

```text
raw/affine/13:04:2026/
```

Baseline requirements files:
- `Home.md`
- `Requirements/User Story.md`
- `Requirements/Functional Requirements.md`
- `Requirements/Non-Functional Requirements.md`
- 31 Markdown files in `Use Cases/`

Latest architecture files:
- `Architecture workdoc/index.md`
- `DFD integration and Merge/index.md`
- `CRUD matrix (1).md`
- `updates/usecase-diag-v1.4.puml`
- subgroup DFD workdocs and diagram exports for CA, AP, H&L, D&P, SM, and NSF

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

The original requirements table marks 24 user stories as MVP and 4 user stories as postMVP.

The 2026-04-25 architecture batch adds a current architecture-scope overlay:
- `US-11: Receive Activity Reminder` is now modeled as an active MVP notification branch.
- `US-08: Send Message` is excluded/postponed from the current D&P MVP model.

The requirements tables need cleanup before these scope changes are treated as fully reconciled source counts.

PostMVP user stories from the original requirements baseline:
- US-10: friends/connections and social indicators
- US-11: activity reminder notification
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
| User stories | 28 | `Requirements/User Story.md` |
| Functional requirements | 65 | `Requirements/Functional Requirements.md` |
| Non-functional requirements | 44 | `Requirements/Non-Functional Requirements.md` |
| Use case narrative files | 31 | `Use Cases/` |

## Current Phase

The team is currently in the architecture-analysis phase.

The 2026-04-25 source says the use-case analysis, use-case narratives, and relationship review have been used as input for architecture analysis.

Current architecture work focuses on:
- functional decomposition
- subgroup DFDs
- a unified Level-1 DFD
- logical data stores
- CRUD consistency
- traceability back to use cases and requirements

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
- final implementation contract status for the latest `v1.4` use-case relationship diagram
- final activity state-transition diagram, beyond the current architecture vocabulary
- exact MVP handling of map-based campus locations
- exact minimal profile fields and whether a profile photo is included
- whether profile completion is mandatory before app use
- exact authentication mechanism: email verification vs university identity redirection
- notification channels and history model
- exact unblock behavior
- report form fields, evidence handling, reporter feedback, and moderation action set
- attendance verification and point scheme for postMVP participation points
- whether activity end time is explicit, derived, or absent
- whether students can change campus after onboarding
- requirements-table reconciliation for `US-08` and `US-11`
- internal architecture-source cleanup for stale deletion/archive and withdrawal-notification wording

## Related Pages

- [[wiki/project/decisions|Decisions]]
- [[wiki/project/weekly-status|Weekly Status]]
- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/requirements/use-cases|Use Cases]]
- [[wiki/requirements/use-case-narratives|Use Case Narratives]]
- [[wiki/requirements/traceability|Traceability]]
