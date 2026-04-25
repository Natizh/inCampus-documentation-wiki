# Architecture Data Stores

This page records the current logical store catalog for architecture analysis.

## Source Snapshot

Current source:

```text
raw/affine/25:04:2026/CRUD matrix (1).md
raw/affine/25:04:2026/DFD integration and Merge/index.md
raw/affine/25:04:2026/*DFD workdoc*.md
```

Status: Draft sourced data-store baseline.

## Store Catalog

| Store ID | Store name | Owning area | Logical purpose |
| --- | --- | --- | --- |
| `DS-CA-001` | CampusStore / Campus Configuration | Campus Administration | Stores core campus configuration, university association, and activation status. |
| `DS-CA-002` | CampusOptionsStore / Campus Structured Options | Campus Administration | Stores campus-specific options such as categories and valid meeting locations. |
| `DS-AP-001` | UserAccountStore / Student Account | Access and Profile | Stores account identity, university email, verification state, platform access state, and selected campus association according to the current process-level CRUD row. |
| `DS-AP-002` | UserProfileStore / Student Minimal Profile | Access and Profile | Stores minimal student profile data used for setup, edit, and controlled profile viewing. |
| `DS-AP-003` | DomainRulesStore / University Identity Rules | Access and Profile | Stores supported university-domain rules used during sign-up/verification. |
| `DS-HL-001` | ActivityStore / Activities | Hosting and Lifecycle | Stores activity details, host reference, campus/category/location choices, schedule, limits, participation mode, lifecycle status, and visibility-relevant state. |
| `DS-HL-002` | ParticipationStore / Activity Participations | Hosting and Lifecycle | Stores join requests, participation states, approval/decline outcomes, and headcount/request tracking. |
| `DS-SM-001` | BlockListStore / Block Relationships | Safety and Moderation | Stores user-to-user block relationships used for reciprocal visibility, interaction, profile, and notification constraints. |
| `DS-SM-002` | ReportStore / Report Records | Safety and Moderation | Stores reports, report reasons/details, review status, review outcomes, and moderation-action trace. |
| `DS-NS-001` | NotificationStore / Notification Records | Notifications and System Flow | Stores notification consequences and references to upstream business context. It must not duplicate activity, participation, account, or block truth. |

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

## Alignment Issues

Selected campus storage still has a wording mismatch:
- the AP process-level CRUD row says `Select Campus` reads `DS-CA-001` and reads/updates `DS-AP-001`;
- one store definition says `DS-AP-002` stores campus selection.

The current AP workdoc follows the process-level CRUD behavior and treats selected campus association as account/onboarding state in `DS-AP-001` until the team cleans up the store definition.

## Related Pages

- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/architecture/crud-matrix|CRUD Matrix And Invariants]]
- [[wiki/requirements/traceability|Traceability]]
