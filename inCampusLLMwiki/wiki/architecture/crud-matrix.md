# CRUD Matrix And Invariants

This page summarizes the architecture CRUD matrix and the stable business invariants derived from it.

## Source Snapshot

Current source:

```text
raw/affine/03-05-2026/updates/CRUD matrix v1.5.md
```

Current matrix version: `1.5`, dated 2026-05-01.

Status: Draft sourced CRUD baseline.

## CRUD Operation Legend

| Symbol | Meaning |
| --- | --- |
| `C` | Create a persistent record. |
| `R` | Read state or data for logic, presentation, or validation. |
| `U` | Update an existing persistent record. |
| `D` | Delete a persistent record. |
| `*` | Conditional or branch-specific operation. |

## Process-Level CRUD Summary

| Process | Primary reads | Primary creates/updates/deletes | Notes |
| --- | --- | --- | --- |
| Configure New Campus | none modeled | creates `DS-CA-001`, `DS-CA-002` | Campus initialization. |
| Manage Campus Options | `DS-CA-001`, `DS-CA-002` | CRUD on `DS-CA-002` | Restricted to authorized campus context. |
| Sign Up / Verify | `DS-AP-003` | creates/updates `DS-AP-001` | University verification mechanism remains abstract. |
| Sign In | `DS-AP-001` | none | Session/token behavior is outside logical DFD scope. |
| Select Campus | `DS-CA-001`, `DS-AP-001` | updates `DS-AP-001` | Store-definition wording still needs cleanup. |
| Set Up Minimal Profile | authenticated context only | creates `DS-AP-002` | No separate `DS-AP-001` read is required by the current matrix. |
| Edit Minimal Profile | `DS-AP-002` | updates `DS-AP-002` | Same profile lifecycle as setup. |
| View Minimal Profile | `DS-AP-002`, `DS-SM-001` | none | Block check is mandatory before profile exposure. |
| Create Activity | `DS-CA-002`, `DS-AP-001` | creates `DS-HL-001` | Date/time is part of create activity for DFD purposes. |
| Manage Join Requests | `DS-AP-002`, `DS-HL-001`, `DS-HL-002` | updates `DS-HL-001`, `DS-HL-002` | Outcome notification belongs to NSF. |
| Update Activity Status | `DS-HL-001`, conditionally `DS-HL-002` | updates `DS-HL-001` | Cancellation context is exposed to NSF. |
| Delete Activity | `DS-HL-001`, `DS-HL-002` | deletes `DS-HL-001`, linked `DS-HL-002` records | Hard-delete; no confirmed deletion notification. |
| Browse/Filter Activities | `DS-HL-001`, `DS-SM-001` | none | Blocked users' activities are filtered. |
| View Activity Details | `DS-HL-001`, `DS-AP-002`, `DS-SM-001` | none | Details inaccessible when block exists. |
| Join Activity | `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates/reads `DS-HL-002`, updates `DS-HL-001` | Join/request trigger goes to NSF. |
| Withdraw Join Request | `DS-HL-002` | deletes `DS-HL-002`, updates `DS-HL-001` | CRUD Matrix `v1.5` says no host notification for pending request withdrawal; D&P/NSF workdocs conflict. |
| Leave Joined Activity | `DS-HL-001`, `DS-HL-002` | deletes `DS-HL-002`, updates `DS-HL-001` | Host leave notification belongs to NSF. |
| View Personal List | `DS-HL-001`, `DS-HL-002` | none | Read-only upcoming/past composition. |
| Submit Report | `DS-AP-001`, `DS-AP-002` | creates `DS-SM-002` | Activity target validation details remain limited. |
| Review Report | `DS-AP-001`, `DS-AP-002`, `DS-HL-001`, `DS-SM-002` | updates `DS-SM-002` | AP/HL consequences are routed to native workflows. |
| Block User | `DS-AP-001`, `DS-AP-002`, `DS-SM-001` | creates/reads `DS-SM-001`; conditional H&L trigger | Pending-request effects remain H&L-owned. |
| Notify: Join Event | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Suppressed if block exists. |
| Notify: Withdraw Event | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | source-conflicting `DS-NS-001` create | The row remains in the matrix, but the `v1.5` invariant says pending request withdrawal must not notify the host. Treat as unresolved. |
| Notify: Leave Event | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Host notification after joined participant leaves. |
| Notify: App. Outcome | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Participant notification after approval/decline. |
| Notify: Cancellation | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Fan-out to joined participants not suppressed by block state. |
| Open Notification | `DS-NS-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | none | Read-only navigation/access check. |
| Notify: Activity Reminder | `DS-AP-001`, `DS-HL-001`, `DS-HL-002` | creates `DS-NS-001` | Active MVP architecture branch; no block check by default. |
| Update Campus Insight Consent | `DS-AP-001` | updates `DS-AP-001` | Student grants or revokes identifiable campus insight access; normal app access is unaffected. |
| View Consent-Based Student Insights | `DS-CA-001`, `DS-AP-001`; conditionally `DS-AP-002`, `DS-HL-001`, `DS-HL-002` | none | Future campus admin insight view; identifiable reads require authorized campus scope and consent. |

## Stable Invariants

### Data Deletion

Activity deletion is hard deletion:
- delete the activity from `DS-HL-001`;
- delete all linked participation/request records from `DS-HL-002`;
- do not model deletion as cancellation;
- do not create a deletion notification unless future requirements add a separate NSF branch.

### Activity State

The current architecture uses these activity states conservatively:
- open
- full
- completed
- cancelled

`deleted` is not a persisted activity status in the current ERD. It is the result of hard deletion from `DS-HL-001` with linked participation/request deletion from `DS-HL-002`.

`Pending Approval` belongs to participation state in `DS-HL-002`, not activity lifecycle state in `DS-HL-001`.

### Blocking

Blocking is reciprocal for supported visibility and interaction effects:
- neither user sees the other's activities in discovery;
- neither user opens the other's activity details;
- neither user views the other's minimal profile details;
- neither user initiates new join/request interactions with the other.

Existing shared participation is not automatically removed by block creation. Pending requests may be affected, but the mutation belongs to H&L.

### Notifications

`DS-NS-001` is an event-consequence store. It does not duplicate upstream activity, participation, account, or block truth.

Cross-user notifications must be suppressed if a block relationship exists between trigger user and recipient.

Opening a notification is read-only:
- read the stored notification reference;
- read current activity/participation context when needed;
- re-check block/access state;
- route to the current context if available;
- otherwise show an unavailable fallback.

Pending request withdrawal notification behavior is not stable across the latest sources. CRUD Matrix `v1.5` says a pending request withdrawal must not generate a host notification and that host notification is created only when an already joined participant leaves. D&P workdoc `v5` and NSF workdoc `v7` still model a withdrawal trigger/branch. Treat this as unresolved until the team confirms whether the DFD branch should be removed or the CRUD row should be corrected.

### Consent-Based Campus Insight Access

`CampusInsightSharingConsent` belongs to `DS-AP-001 Student Account`.

The current matrix adds two consent-related processes:
- `Update Campus Insight Consent`: AP reads/updates the consent value on the student account.
- `View Consent-Based Student Insights`: a future campus-admin read path that may read identifiable profile/activity/participation insight data only when campus authorization and consent checks pass.

This does not confirm a full admin-insight product feature. It only stabilizes the consent attribute and the access-control rule that any future insight feature must obey.

### Moderation Consequences

`Review Report` updates only `DS-SM-002` directly.

If the moderation outcome bans/suspends a user, SM triggers the AP-native account workflow.

If the moderation outcome removes an activity, SM triggers the H&L-native deletion workflow.

## Internal Source Contradictions

The 2026-04-25 and 2026-05-03 batches contain a few leftover contradictions. The wiki uses the latest workdoc/CRUD interpretation where source priority is clear and keeps the rest as cleanup items:

- `Withdraw Join Request` notification behavior changed from the previous wiki interpretation. The 2026-05-03 CRUD Matrix `v1.5` says pending request withdrawal must not notify the host, but D&P/NSF workdocs still model a withdrawal trigger. Stable interpretation is pending team confirmation.
- The integrated DFD text still mentions deletion triggers to notifications and logically archived participation records in places. H&L workdoc `v2.1` and CRUD Matrix `v1.5` instead stabilize hard-delete behavior and no confirmed deletion notification.
- Older diagrams may show direct writes from H&L/D&P to `DS-NS-001`. Current boundary: NSF alone writes notification records.

## Related Pages

- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/architecture/data-stores|Architecture Data Stores]]
- [[wiki/architecture/data-model|Architecture Data Model]]
- [[wiki/project/decisions|Decisions]]
