# Wiki Index

This is the starting point for the InCampus project wiki.
Read this file first, then open the pages most relevant to the current task.

Status labels:
- Seeded: initial page exists and is ready to use.
- Unresolved: structure exists, but project content must come from future source snapshots or team decisions.
- Draft Sourced: page contains grounded content from raw snapshots, but the project element is not final.

## Project Hub

- [[wiki/project/overview|Project Overview]] - Product identity, MVP scope, actors, requirements counts, architecture updates, and unresolved project details. Status: Draft Sourced.
- [[wiki/project/decisions|Decisions]] - Durable decisions, source-derived working rules, architecture rules, and unresolved decision points. Status: Draft Sourced.
- [[wiki/project/weekly-status|Weekly Status]] - Current architecture-analysis status and next review focus. Status: Draft Sourced.

## Requirements Hub

- [[wiki/requirements/use-cases|Use Cases]] - Sourced inventory of 31 draft use cases, actors, requirement links, scope, current diagram version, and architecture-scope updates. Status: Draft Sourced.
- [[wiki/requirements/use-case-narratives|Use Case Narratives]] - Narrative readiness, modeling notes, relationship notes, and unresolved questions from the 31 use case files. Status: Draft Sourced.
- [[wiki/requirements/traceability|Traceability]] - Matrix linking 28 user stories, 65 FRs, 44 NFRs, draft use cases, and current architecture-scope overlays. Status: Draft Sourced.

## Architecture Hub

- [[wiki/architecture/overview|Architecture Overview]] - Current architecture-analysis baseline, source priority, Level-1 process areas, version handling, and major modeling decisions. Status: Draft Sourced.
- [[wiki/architecture/data-flow|Architecture Data Flow]] - Unified DFD structure and subgroup-level logical data-flow summary. Status: Draft Sourced.
- [[wiki/architecture/data-stores|Architecture Data Stores]] - Logical store catalog, ownership boundaries, reuse rules, and alignment issues. Status: Draft Sourced.
- [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]] - Current CRUD summary, deletion/blocking/notification invariants, and internal source contradictions. Status: Draft Sourced.

## Planning And Governance

- [[wiki/planning/workflow|Workflow]] - AFFiNE snapshot process, ingest workflow, query workflow, and staged use-case workflow. Status: Draft Sourced.
- [[wiki/log|Wiki Log]] - Append-only chronological record of ingests, updates, and lint passes.
- [[AGENTS|Root Instructions]] - Agent roles, source model, wiki rules, and current priorities.

## Use Case Pages

Use case pages are concise derived index cards.
The `UC -` prefix distinguishes these derived wiki pages from immutable raw AFFiNE source files with similar names.
The raw narrative files remain source material, not duplicate wiki pages to merge.

### Access And Onboarding

- [[wiki/requirements/use-case-pages/UC - Sign Up with University Email|Sign Up with University Email]]
- [[wiki/requirements/use-case-pages/UC - Sign In|Sign In]]
- [[wiki/requirements/use-case-pages/UC - Select Campus|Select Campus]]

### Profile

- [[wiki/requirements/use-case-pages/UC - Set Up Profile|Set Up Profile]]
- [[wiki/requirements/use-case-pages/UC - Edit Profile|Edit Profile]]
- [[wiki/requirements/use-case-pages/UC - View Student Minimal Profile|View Student Minimal Profile]]

### Activity Discovery And Participation

- [[wiki/requirements/use-case-pages/UC - Create Activity|Create Activity]]
- [[wiki/requirements/use-case-pages/UC - Set Activity Date and Time|Set Activity Date and Time]]
- [[wiki/requirements/use-case-pages/UC - Browse and Filter Activities|Browse and Filter Activities]]
- [[wiki/requirements/use-case-pages/UC - View Activity Details|View Activity Details]]
- [[wiki/requirements/use-case-pages/UC - Join Activity|Join Activity]]
- [[wiki/requirements/use-case-pages/UC - Manage Join Requests|Manage Join Requests]]
- [[wiki/requirements/use-case-pages/UC - Update Activity Status|Update Activity Status]]
- [[wiki/requirements/use-case-pages/UC - Delete Activity|Delete Activity]]
- [[wiki/requirements/use-case-pages/UC - Withdraw Join Request|Withdraw Join Request]]
- [[wiki/requirements/use-case-pages/UC - Leave Joined Activity|Leave Joined Activity]]
- [[wiki/requirements/use-case-pages/UC - View Personal Activity List|View Personal Activity List]]

### Notifications

- [[wiki/requirements/use-case-pages/UC - Notify Host of Join Event|Notify Host of Join Event]]
- [[wiki/requirements/use-case-pages/UC - Notify Participant of Application Outcome|Notify Participant of Application Outcome]]
- [[wiki/requirements/use-case-pages/UC - Notify Participant of Activity Cancellation|Notify Participant of Activity Cancellation]]

### Safety And Moderation

- [[wiki/requirements/use-case-pages/UC - View Community Rules|View Community Rules]]
- [[wiki/requirements/use-case-pages/UC - Report User or Activity|Report User or Activity]]
- [[wiki/requirements/use-case-pages/UC - Review Report|Review Report]]
- [[wiki/requirements/use-case-pages/UC - Block User|Block User]]

### Campus Administration

- [[wiki/requirements/use-case-pages/UC - Configure New Campus|Configure New Campus]]
- [[wiki/requirements/use-case-pages/UC - Manage Campus Structured Options|Manage Campus Structured Options]]

### Deferred Or Architecture-Scope Updated

- [[wiki/requirements/use-case-pages/UC - Send Message|Send Message]]
- [[wiki/requirements/use-case-pages/UC - View Friends and Social Indicators|View Friends and Social Indicators]]
- [[wiki/requirements/use-case-pages/UC - Receive Activity Reminder|Receive Activity Reminder]]
- [[wiki/requirements/use-case-pages/UC - Track Participation Points|Track Participation Points]]
- [[wiki/requirements/use-case-pages/UC - Upload Activity Photo|Upload Activity Photo]]

## Current Focus

The project is currently in the architecture-analysis phase, with requirements/use-case traceability still maintained as the baseline.
Prioritize [[wiki/architecture/overview|architecture]], [[wiki/architecture/data-flow|DFD/data-flow modeling]], [[wiki/architecture/crud-matrix|CRUD consistency]], and updates to [[wiki/requirements/traceability|traceability]] where architecture scope has superseded older requirements-table scope.

Latest ingested raw snapshot:

```text
raw/affine/25:04:2026/
```

Latest full requirements and narrative baseline remains:

```text
raw/affine/13:04:2026/
```

Current sourced totals:
- 28 user stories
- 65 functional requirements
- 44 non-functional requirements
- 31 use case narrative files

Important current gaps:
- formal UC IDs are unresolved
- `updates/usecase-diag-v1.4.puml` is the latest current use-case relationship source, but final formal UC IDs and implementation contract status remain unresolved
- `Home.md` contains an `OUTDATED` marker
- requirement ID formatting differs across some source files
- older requirements tables still need cleanup for the architecture-scope swap: `Send Message` deferred, `Receive Activity Reminder` active in MVP notification modeling
- the 2026-04-25 architecture batch contains a few stale internal leftovers around withdrawal notification wording, deletion notification triggers, and archive wording; see [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]]
