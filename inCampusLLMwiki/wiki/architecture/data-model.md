# Architecture Data Model

This page summarizes the current logical ERD, entity catalog, and relationship model.

## Source Snapshot

Current source:

```text
raw/affine/09-05-2026/updates/Entities & Attributes v1.2.md
raw/affine/09-05-2026/updates/Relationship Table v1.1.md
raw/affine/09-05-2026/updates/Databases v1.1.md
raw/affine/09-05-2026/updates/CRUD matrix v1.6.md
raw/affine/09-05-2026/system architecture/01 Design Scope and Architectural Choice v1.1.md
raw/affine/09-05-2026/state chart diagrams/
```

Status: Draft sourced logical data model.

The ERD is not a physical database schema. It does not define SQL types, indexes, migrations, API contracts, cascade syntax, provider integrations, or final weak-reference mechanics.

## Entity Model

| Entity | Store alignment | Current role |
| --- | --- | --- |
| Campus | `DS-CA-001` | Core configured campus and university association. |
| Campus Location | `DS-CA-002` typed option | Campus-specific meeting-point option used during activity creation. |
| Activity Category | `DS-CA-002` typed option | Campus-specific activity category used for creation and filtering. |
| Student Account | `DS-AP-001` | University access identity, verification state, password credential state, selected campus association, platform access, and campus insight consent. |
| Student Profile | `DS-AP-002` | Minimal public profile shown only in allowed activity/campus contexts after block checks. |
| University Identity Rule | `DS-AP-003` | Email-domain and optional student-ID validation rule for sign-up. |
| Activity | `DS-HL-001` | Campus-scoped hosted activity with schedule, category, meeting point, participation mode, limits, counters, and lifecycle status. |
| Participation | `DS-HL-002` | Request or confirmed participation record resolving the student-activity many-to-many relationship. |
| Block Relationship | `DS-SM-001` | Directed block record with reciprocal visibility, interaction, profile, and cross-user notification effects. |
| Report Record | `DS-SM-002` | Moderation report with target, campus scope, review state, outcome, and moderation action trace. |
| Notification Record | `DS-NS-001` | Notification consequence and navigation reference; not a duplicate source for activity, participation, account, or block state. |

Campus Admin identity is represented for the first skeleton as runtime `AuthenticatedAdminContext`, not as a persisted entity or store. Any possible future persisted admin model remains out of scope until a later source or team decision confirms it.

## Key Attribute Updates

- `Student Account` now includes `PasswordHash`, aligning sign-up with university email verification plus password creation for later email/password login.
- `Student Account` includes `CampusInsightSharingConsent` for MVP consent-based campus insight access; refusal or revocation does not block normal app use.
- `Student Account.SelectedCampusID` is the current selected-campus association in the AP CRUD interpretation, although older store wording still needs cleanup.
- `Activity` stores both structured references and snapshot labels for category and meeting point: `CategoryID` / `CategoryLabel` and `MeetingPointID` / `MeetingPointLabel`.
- `Participation.RecordType` distinguishes `request` from `participation`; `Participation.Status` uses `pending`, `confirmed`, and `declined`.
- `Activity.Status` uses `open`, `full`, `completed`, and `cancelled`. `deleted` is hard-delete behavior, not a persisted activity status in the ERD.
- `Notification Record` stores references such as related activity, related participation, target context, and optional triggering account. Opening a notification must re-check current context and route to a fallback if the target no longer exists. No read/unread state is modeled for the first skeleton.
- `Report Record` uses first-skeleton `ModerationAction` values: `none`, `warn_user`, `suspend_user`, `ban_user`, and `remove_activity`. Reviewer identity comes from runtime `AuthenticatedAdminContext`.

## Relationship And Constraint Highlights

- Campus contains campus locations and activity categories, scopes activities and report review, and registers student accounts after campus selection.
- Student account owns a student profile. The account can exist before profile setup; profile completion and exact required fields remain unresolved.
- Activity is hosted by one student account, scoped to one campus, classified by one activity category, and assigned one campus location as meeting point.
- Participation resolves the student-account to activity many-to-many relationship and carries request/participation lifecycle state.
- Activity deletion cascades to linked participation/request records as hard deletion in the current architecture model.
- Pending request withdrawal removes or deactivates request state without host notification and without a `DS-NS-001` record.
- Block relationships are stored as directed records but enforced reciprocally across supported visibility and interaction behaviors.
- Report records require exactly one target type: user or activity. The user target and activity target references are mutually exclusive.
- University identity rules validate student email domains, but the ERD does not model a strong foreign key from student account to identity rule.
- Notification records are event sinks. They reference upstream context but do not duplicate upstream truth.

## Consent-Based Student Insight Access

The 2026-05-01 structural note introduces a controlled campus-insight direction, and the 2026-05-08 requirements tables add explicit student/admin traceability:
- identifiable student interests and activity-participation insight data may be exposed to authorized campus staff only when the student has explicitly consented;
- consent is stored on `DS-AP-001 Student Account` as `CampusInsightSharingConsent`;
- `US-29` / [[wiki/requirements/use-case-pages/UC - Update Campus Insight Consent|Update Campus Insight Consent]] covers the student-side consent control;
- `US-30` / [[wiki/requirements/use-case-pages/UC - View Consent-Based Student Insights|View Consent-Based Student Insights]] covers the campus-admin-side insight access;
- any insight view must enforce campus scope, consent checks, and least-privilege access before reading profile, activity, or participation data;
- refusal does not block normal app use and does not weaken moderation/report-review access already required for safety workflows.

No additional insight store, exact insight fields, or detailed narrative flow is confirmed beyond these logical consent and read-access rules. The first-skeleton admin identity model is runtime `AuthenticatedAdminContext`; its exact authentication implementation remains provisional.

## Open Points

- Whether `University` should become a separate entity.
- Whether `University Identity Rule` remains validation-only or later becomes a strong FK target.
- Whether a future post-skeleton release needs a persisted Campus Admin entity or store.
- Exact admin authentication implementation behind `AuthenticatedAdminContext`.
- Exact consent-based insight fields and whether/how they are aggregated or identifiable in admin views.
- Exact profile fields, including whether `Languages`, `ShortBio`, and `Major` are final.
- Exact notification payload schema, delivery mechanism, retry behavior, and notification-list UX.
- Whether notification related references use nullable foreign keys or weak-reference semantics.
- Exact uniqueness rules for block pairs and student/activity participation records.
- Exact report payload fields, reason-code domain, review outcome domain, evidence handling, and action trace details.
- Concurrency handling for activity participant and request counters.
- UI placement for `CampusInsightSharingConsent`.
- True `Activity` lifecycle state chart source; the 2026-05-09 state-chart package delivered `ActivityParticipation`, `StudentProfile`, and `ReportRecord` charts.

## Related Pages

- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/architecture/data-stores|Architecture Data Stores]]
- [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]]
- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/project/decisions|Decisions]]
