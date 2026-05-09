# Architecture Data Stores

This page records the current logical store catalog for architecture analysis.

## Source Snapshot

Current source:

```text
raw/affine/09-05-2026/updates/CRUD matrix v1.6.md
raw/affine/09-05-2026/updates/Databases v1.1.md
raw/affine/09-05-2026/updates/Entities & Attributes v1.2.md
raw/affine/09-05-2026/updates/Relationship Table v1.1.md
raw/affine/09-05-2026/system architecture/01 Design Scope and Architectural Choice v1.1.md
```

Status: Draft sourced data-store baseline.

## Store Catalog

| Store ID | Store name | Owning area | Logical purpose |
| --- | --- | --- | --- |
| `DS-CA-001` | CampusStore / Campus Configuration | Campus Administration | Stores core campus configuration, university association, and activation status. |
| `DS-CA-002` | CampusOptionsStore / Campus Structured Options | Campus Administration | Stores campus-specific options such as categories and valid meeting locations. |
| `DS-AP-001` | UserAccountStore / Student Account | Access and Profile | Stores account identity, password hash, university email, verification state, platform access state, selected campus association, and campus insight consent according to the current process-level CRUD row. |
| `DS-AP-002` | StudentProfileStore / Student Profile | Access and Profile | Stores Student Profile data used for setup, edit, controlled profile viewing, and consent-gated insight reads. Only minimal public profile data is exposed in ordinary student contexts. |
| `DS-AP-003` | DomainRulesStore / University Identity Rules | Access and Profile | Stores supported university-domain rules used during sign-up/verification. |
| `DS-HL-001` | ActivityStore / Activities | Hosting and Lifecycle | Stores activity details, host reference, campus/category/location choices, schedule, limits, participation mode, lifecycle status, and visibility-relevant state. |
| `DS-HL-002` | ParticipationStore / Activity Participations | Hosting and Lifecycle | Stores join requests, participation states, approval/decline outcomes, and headcount/request tracking. |
| `DS-SM-001` | BlockListStore / Block Relationships | Safety and Moderation | Stores user-to-user block relationships used for reciprocal visibility, interaction, profile, and notification constraints. |
| `DS-SM-002` | ReportStore / Report Records | Safety and Moderation | Stores reports, report reasons/details, review status, review outcomes, and moderation-action trace. |
| `DS-NS-001` | NotificationStore / Notification Records | Notifications and System Flow | Stores notification consequences and references to upstream business context. It must not duplicate activity, participation, account, or block truth. |

The entity catalog also models `Campus Location` and `Activity Category` as entity-level structures, but both are typed uses of `DS-CA-002 Campus Structured Options`, not separate confirmed stores.

No `DS-CA-003`, Campus Admin Store, Admin Account Store, or separate Campus Admin database is introduced for the first skeleton. Campus Admin identity is runtime `AuthenticatedAdminContext`.

## Reuse Rules

Campus Administration exports structural truth:
- AP reads `DS-CA-001` for campus selection.
- H&L reads `DS-CA-002` for approved activity categories and meeting locations.
- D&P depends on active campus context for campus-scoped discovery.

Access and Profile exports identity and profile truth:
- H&L reads `DS-AP-001` for host validity and `DS-AP-002` for applicant minimal profile during join-request management.
- D&P reads `DS-AP-002` for host minimal profile when activity details are accessible.
- SM reads AP stores for reporter/target validation and identity context.
- NSF reads `DS-AP-001` for recipient account validity.
- Consent-based campus-insight processes may read AP/H&L data only after checking `DS-AP-001.CampusInsightSharingConsent`, campus authorization scope, and least-privilege constraints.

Hosting and Lifecycle owns activity and participation truth:
- D&P reads `DS-HL-001` and `DS-HL-002` for feed, details, join, withdrawal, leave, and personal lists.
- D&P has justified write access to H&L stores for join, withdrawal, and leave effects, but ownership remains H&L.
- NSF reads H&L stores for notification context, recipient sets, cancellation, reminder eligibility, and notification opening.

Safety and Moderation exports enforcement truth:
- D&P reads `DS-SM-001` for feed filtering, detail access, and join/request prevention.
- AP reads `DS-SM-001` before exposing minimal profiles.
- NSF reads `DS-SM-001` for cross-user notification suppression and notification-open access checks.

Notifications and System Flow owns only notification consequences:
- NSF writes `DS-NS-001`.
- H&L and D&P emit or expose notification triggers but do not write notification records directly.

## Do Not Add Duplicate Stores

The current batch explicitly warns against adding duplicate stores for:
- notification-owned activity lifecycle state
- notification-owned participation state
- notification recipient context
- reminder schedule or upcoming-events truth
- community rules management
- separate activity lifecycle stores

Community rules are static MVP content in the current SM model. No `DS-SM-003` is confirmed.

Activity reminder uses:
- `DS-HL-001` for schedule/lifecycle truth
- `DS-HL-002` for still-joined participation truth
- `DS-NS-001` only for the notification consequence

Do not add a duplicate store for campus insight access. The 2026-05-09 source confirms student/admin use-case rows and a consent-gated admin insight flow, but the current model still uses a consent attribute plus conditional read-only access over existing AP/H&L stores, not a new store.

## Alignment Issues

Selected campus storage is treated as account/onboarding state on `DS-AP-001 Student Account`. Older wording that implied profile-owned campus selection is superseded for the first skeleton.

Campus admin identity for the first skeleton is resolved as runtime context:
- `AuthenticatedAdminContext` carries `adminId`, `email`, `role`, `authorizedCampusIds`, and `selectedCampusId`;
- it is not a canonical data store;
- exact admin authentication implementation remains provisional;
- any future persisted admin store remains out of scope unless a later source confirms it.

Pending request withdrawal is non-notifying in the first skeleton:
- D&P still removes or deactivates the pending request from `DS-HL-002` and updates `DS-HL-001` availability transactionally;
- NSF has no user-facing handler for pending request withdrawal;
- no `DS-NS-001` record is created.

## Related Pages

- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/architecture/data-model|Architecture Data Model]]
- [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]]
- [[wiki/requirements/traceability|Traceability]]
