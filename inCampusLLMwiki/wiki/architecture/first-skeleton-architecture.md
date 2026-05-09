# First Skeleton Architecture

This page records the first-skeleton implementation architecture derived from the `raw/affine/09-05-2026/` final pre-skeleton batch.

Status: Draft sourced first-skeleton contract.

## Source Snapshot

Primary sources:
- `system architecture/01 Design Scope and Architectural Choice v1.1.md`
- `system architecture/System Architecture Diagram/index v1.1.md`
- `updates/CRUD matrix v1.6.md`
- `updates/Entities & Attributes v1.2.md`
- `updates/Databases v1.1.md`
- `updates/Relationship Table v1.1.md`
- `updates/use-case-diagram-v1.7.md`
- sequence, collaboration, and state-chart diagram workdocs under `raw/affine/09-05-2026/`

The source documents are dated 2026-05-08 and were ingested from the 2026-05-09 AFFiNE export folder.

## Architecture Choice

The first code skeleton uses a multi-tenant modular monolith with event-driven internal flows.

Core implications:
- InCampus runs as one central platform rather than separate deployments per campus.
- `CampusID` is the tenant boundary for student accounts, activities, structured options, reports, admin operations, and campus-scoped insight access.
- The backend is one application organized into six internal modules: Access and Profile, Campus Administration, Hosting and Lifecycle, Discovery and Participation, Safety and Moderation, and Notifications and System Flow.
- Event-driven internal flows are used for accepted business events, especially notification-producing consequences.
- The internal event dispatcher is an implementation abstraction inside the monolith, not a public API contract.

## Canonical Stores

The first skeleton has exactly ten canonical stores:
- `DS-CA-001` Campus Configuration
- `DS-CA-002` Campus Structured Options
- `DS-AP-001` Student Account
- `DS-AP-002` Student Profile
- `DS-AP-003` University Identity Rules
- `DS-HL-001` Activities
- `DS-HL-002` Activity Participations
- `DS-SM-001` Block Relationships
- `DS-SM-002` Report Records
- `DS-NS-001` Notification Records

No `DS-CA-003`, Campus Admin Store, Admin Account Store, or separate Campus Admin database is introduced for the first skeleton.

Campus Admin identity is represented by runtime `AuthenticatedAdminContext` with:
- `adminId`
- `email`
- `role`
- `authorizedCampusIds`
- `selectedCampusId`

The exact admin authentication implementation remains provisional, but every admin operation must be authorized against campus scope.

## MVP Scope Decisions

Current first-skeleton MVP behavior includes:
- `Receive Activity Reminder` as an MVP notification branch.
- `Update Campus Insight Consent` as an MVP Access and Profile use case.
- `View Consent-Based Student Insights` as an MVP Campus Administration/admin-portal use case.
- `Set Activity Date and Time` as part of `Create Activity` for the first-skeleton use-case diagram and architecture model.

Current first-skeleton MVP behavior excludes:
- `Send Message`
- `View Friends and Social Indicators`
- `Track Participation Points`
- `Upload Activity Photo`

## Internal Event Catalog

Accepted first-skeleton internal events:
- `DirectJoinCompleted`
- `JoinRequestSubmitted`
- `JoinRequestApproved`
- `JoinRequestDeclined`
- `JoinedParticipantLeft`
- `ActivityCancelled`
- `ActivityReminderDue`

Ordinary activity and participation events carry:
- `eventId`
- `eventType`
- `occurredAt`
- `activityId`
- `triggeringAccountId`
- `participationId`, when applicable
- `outcome`, when applicable

`ActivityReminderDue` carries:
- `eventId`
- `eventType`
- `occurredAt`
- `activityId`
- `scheduledStartAt`
- `reminderThresholdMinutes`

`PendingRequestWithdrawn` is not an active notification-producing event. If it appears in implementation notes, it is optional, internal, non-notifying, has no NSF handler, and creates no `DS-NS-001` record.

## Behavioral Model Highlights

The 2026-05-09 batch adds first-skeleton sequence and collaboration diagrams for:
- Sign Up and Select Campus, including `CampusInsightSharingConsent`
- Join Activity
- Manage Join Requests
- Notification Event Handling for `JoinRequestSubmitted`
- Report and Review Report
- Configure New Campus
- View Consent-Based Student Insights

Stable interaction rules:
- Join Activity checks reciprocal block state, activity lifecycle/capacity, duplicate active participation/request records, and then creates either `RecordType=participation, Status=confirmed` or `RecordType=request, Status=pending`.
- Manage Join Requests is host-owned; approval produces or represents `RecordType=participation, Status=confirmed`, and decline leaves `RecordType=request, Status=declined`.
- NSF consumes notification-producing events and is the only writer of `DS-NS-001`.
- Notification opening is read-only and does not add read/unread state.
- Submit Report stores the report target reference and campus scope without a full activity read; Review Report may later read current activity context and show an unavailable/deleted fallback.
- Moderation user consequences are routed to AP-native workflows; activity removal is routed to H&L-native hard-delete workflow.
- View Consent-Based Student Insights is read-only over existing AP/H&L stores and requires admin campus authorization plus student consent.

## State Models

The batch includes state charts for:
- `ActivityParticipation`
- `StudentProfile`
- `ReportRecord`

Stable state-model rules:
- `Participation.RecordType = request | participation`.
- `Participation.Status = pending | confirmed | declined`.
- `joined`, `left`, `withdrawn`, `cancelled`, and `deleted` are not persisted participation statuses.
- Pending request withdrawal is a non-persisted terminal outcome with no host notification.
- `StudentProfile` has no explicit profile status in the first skeleton; suspended visibility is derived from the owning `DS-AP-001` account state, not stored on `DS-AP-002`.
- `ReportRecord.ReviewStatus` uses `submitted`, `under_review`, and `resolved`; diagram states such as `ActionRequired` and `Closed` are abstractions, not additional persisted statuses.

Open state-model point:
- A true `Activity` lifecycle state chart was not found in this batch. The workdoc still describes the activity status vocabulary, but the delivered SCD package named Activity actually modeled `ActivityParticipation`.

## Open Points

- Exact admin authentication implementation behind `AuthenticatedAdminContext`.
- Exact campus setup fields and validation rules beyond the current configuration summary.
- Exact consent UI placement, consent-change UX, and explanatory copy.
- Exact insight fields, aggregation/identifiability rules, and least-privilege admin view content.
- Exact notification delivery mechanism, retry behavior, and notification-list UX.
- Exact report evidence fields, review notes, and `ReviewOutcome` domain values.
- Exact maximum participants limit and selected schema/index mechanisms for concurrency.

## Related Pages

- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/architecture/data-stores|Architecture Data Stores]]
- [[wiki/architecture/data-model|Architecture Data Model]]
- [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]]
- [[wiki/requirements/use-cases|Use Cases]]
- [[wiki/requirements/traceability|Traceability]]
