# Architecture Data Flow

This page summarizes the current logical DFD baseline from the architecture batch.

## Source Snapshot

Current source:

```text
raw/affine/25-04-2026/DFD integration and Merge/index.md
raw/affine/25-04-2026/Architecture workdoc/index.md
raw/affine/03-05-2026/updates/*DFD workdoc*.md
raw/affine/09-05-2026/updates/CRUD matrix v1.6.md
raw/affine/09-05-2026/system architecture/01 Design Scope and Architectural Choice v1.1.md
raw/affine/09-05-2026/sequence diagrams/
raw/affine/09-05-2026/collaboration diagrams/
```

Status: Draft sourced DFD baseline.

## Unified DFD Shape

The current integrated DFD is organized around six Level-1 processes:
- 1.0 Campus Administration
- 2.0 Access and Profile
- 3.0 Hosting and Lifecycle
- 4.0 Discovery and Participation
- 5.0 Safety and Moderation
- 6.0 Notifications and System Flow

The stable modeling principle is separation of ownership:
- CA owns campus truth.
- AP owns account/profile truth.
- H&L owns activity/participation truth.
- SM owns trust-and-safety truth.
- NSF owns notification consequences.

The 2026-05-09 final pre-skeleton batch adds an implementation-facing architecture layer over this logical DFD baseline: a multi-tenant modular monolith, `CampusID` tenant boundary, internal event dispatcher, runtime `AuthenticatedAdminContext`, and accepted first-skeleton event catalog. See [[wiki/architecture/first-skeleton-architecture|First Skeleton Architecture]].

## Campus Administration

Current sources:
- `CA - DFD workdoc.md`
- `CA - DFD/index.md`, current diagram version `V2.0`

Confirmed logical processes:
- Configure New Campus
- Manage Campus Structured Options

Confirmed flows:
- Campus Admin creates campus configuration in `DS-CA-001`.
- Campus Admin creates and updates structured options in `DS-CA-002`.
- Manage Campus Structured Options reads an authorized campus context before editing options.
- AP reads configured campuses from `DS-CA-001`.
- H&L reads approved categories and locations from `DS-CA-002`.
- D&P depends on active campus context from `DS-CA-001`.

Open point:
- exact admin authentication implementation is not specified.
- exact campus setup fields and validation rules are not fully specified.

First-skeleton addition:
- `View Consent-Based Student Insights` belongs to the Campus Administration/admin-portal side and performs read-only, consent-gated, campus-scoped reads over existing AP/H&L stores. It does not create a new store.

## Access and Profile

Current source:
- `AP - DFD - workdoc v1.2.md`

The AP diagram export is useful but has stale details. The workdoc is the current source for corrections.

Confirmed logical processes:
- Sign Up / Verify
- Sign In
- Select Campus
- Set Up Minimal Profile
- Edit Minimal Profile
- View Student Minimal Profile
- Update Campus Insight Sharing Consent

Confirmed flows:
- Sign Up / Verify reads `DS-AP-003` and creates/updates `DS-AP-001`, including password credential state.
- Sign In reads `DS-AP-001`.
- Select Campus reads `DS-CA-001` and reads/updates `DS-AP-001`.
- Set Up Minimal Profile creates `DS-AP-002`.
- Edit Minimal Profile reads/updates `DS-AP-002`.
- View Student Minimal Profile reads `DS-AP-002` and must read `DS-SM-001` before exposing profile data.
- Update Campus Insight Sharing Consent reads/updates `DS-AP-001.CampusInsightSharingConsent`; refusal does not block normal app use. The 2026-05-08 requirements table traces this to `US-29`.
- Consent-based campus insight views must check consent and campus scope before reading identifiable profile or participation insight data. The 2026-05-09 sequence/collaboration diagrams place the admin-side flow behind runtime `AuthenticatedAdminContext` and keep AP/H&L reads conditional and read-only.

Open points:
- exact university verification mechanism
- exact minimal profile fields
- onboarding order between campus selection and profile setup
- all allowed profile-viewing contexts
- selected-campus storage wording mismatch between `DS-AP-001` and `DS-AP-002`
- UI placement for campus insight consent
- exact admin insight view content

## Hosting and Lifecycle

Current source:
- `H&L - DFD workdoc v2.1.md`

The H&L diagram export still contains stale notification and deletion wording. The workdoc and CRUD matrix are the current source for derived wiki knowledge.

Confirmed logical processes:
- Create Activity
- Manage Join Requests
- Update Activity Status
- Delete Activity

Confirmed flows:
- Create Activity reads `DS-CA-002` and `DS-AP-001`, then creates `DS-HL-001`.
- Date/time scheduling is part of Create Activity for DFD purposes.
- Manage Join Requests reads `DS-HL-002`, `DS-HL-001`, and `DS-AP-002`, then updates participation and activity availability/count state.
- Update Activity Status updates `DS-HL-001`; cancellation reads `DS-HL-002` for joined participant context.
- Delete Activity hard-deletes the activity record and all linked participation/request records.
- H&L exposes approval/decline and cancellation event context to NSF but does not write notification records.

Open points:
- exact Campus Admin override authorization/routing
- whether future requirements should add deletion notifications; current CRUD does not

## Discovery and Participation

Current sources:
- `D&P - DFD workdoc v5.md`
- `D&P - DFD/index.md`, current diagram version `V3.0`

Confirmed logical processes:
- Browse and Filter Activities
- View Activity Details
- Join Activity
- Withdraw Join Request
- Leave Joined Activity
- View Personal Activity List

Confirmed flows:
- Browse reads `DS-HL-001` and `DS-SM-001`; blocked users' activities are filtered from discovery.
- View Activity Details reads `DS-HL-001`, `DS-SM-001`, and `DS-AP-002`; blocked host/viewer combinations cannot open details.
- Join Activity reads `DS-HL-001`, `DS-HL-002`, and `DS-SM-001`; it creates participation or pending-request state and updates activity availability/count state.
- Withdraw Join Request reads/deletes pending request state in `DS-HL-002` and updates availability/count state in `DS-HL-001`.
- Leave Joined Activity reads/deletes joined participation state in `DS-HL-002`, updates `DS-HL-001`, and emits a leave trigger to NSF.
- View Personal Activity List reads `DS-HL-002` and `DS-HL-001`.

Current scope note:
- `Send Message` is excluded from the D&P MVP model and postponed. The 2026-05-08 requirements table now also marks `US-08` as postMVP.

Open points:
- exact personal-list UI grouping
- user-facing message for blocked or inaccessible activity details
- implementation-level concurrency handling for join/request counts

## Safety and Moderation

Current source:
- `SM - DFD workdoc v2.1.md`

Confirmed logical processes:
- View Community Rules
- Submit Report
- Review Report
- Block User and Expose Block State

Confirmed flows:
- Community rules are static MVP content and do not use a managed store.
- Submit Report reads AP account/profile context and creates `DS-SM-002`.
- Review Report reads `DS-SM-002` and relevant AP/H&L context, updates only `DS-SM-002`, and triggers native AP/H&L workflows for consequences such as bans or activity deletion.
- Block User reads AP context, reads/creates `DS-SM-001`, and exposes block state for D&P, AP profile exposure, NSF, and conditional H&L pending-request handling.

Confirmed block effects:
- reciprocal activity visibility filtering
- activity-detail access prevention
- minimal-profile access prevention
- new join/request interaction prevention
- cross-user notification suppression

Open points:
- admin authorization mechanism
- exact report payload schema
- exact H&L representation for pending-request consequences after block
- future rule-management if static rules become editable

## Notifications and System Flow

Current sources:
- `NSF - DFD workdoc v7.md`
- `NSF - DFD/index.md`, current diagram version `V4.0`

Confirmed logical processes:
- Detect Notification-Relevant Event
- Resolve Recipient, Notification Context, and Suppression Conditions
- Create and Deliver Notification
- Open Referenced In-App Context from Notification

Current active notification branches:
- Notify host of join / join request
- Notify host of joined participant leave
- Notify participant of application approval / decline
- Notify participant of activity cancellation
- Notify participant of activity reminder
- Open notification context

Excluded branch:
- Pending request withdrawal is non-notifying in the first skeleton. It has no user-facing NSF handler and creates no `DS-NS-001` record.

Confirmed flows:
- NSF reads `DS-AP-001` for recipient account validity.
- NSF reads `DS-HL-001` and `DS-HL-002` for activity, participation, recipient-set, cancellation, reminder, and notification-open context.
- NSF reads `DS-SM-001` for all cross-user notification suppression and notification-open access re-checking.
- NSF writes notification records to `DS-NS-001`.
- Opening a notification is read-only and must not update notification, activity, or participation state.
- If the referenced target no longer exists, the system routes to an unavailable fallback and does not reconstruct missing business state.

Reminder branch:
- Reminder is system/time-triggered.
- Reminder reads activity schedule and lifecycle state from `DS-HL-001`.
- Reminder reads still-joined participants from `DS-HL-002`.
- Reminder creates notification records only for valid, still-joined participants when the activity is not cancelled.
- Reminder is suppressed if the participant has left or the activity is cancelled.

Open points:
- exact delivery mechanism
- notification payload schema
- notification-list UX parity
- retry/failure handling

## Related Pages

- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/architecture/data-stores|Architecture Data Stores]]
- [[wiki/architecture/data-model|Architecture Data Model]]
- [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]]
- [[wiki/requirements/use-case-narratives|Use Case Narratives]]
