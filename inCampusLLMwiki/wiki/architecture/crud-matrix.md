# CRUD Matrix And Invariants

This page summarizes the architecture CRUD matrix and the stable business invariants derived from it.

## Source Snapshot

Current source:

```text
raw/affine/25:04:2026/CRUD matrix (1).md
```

Current matrix version: `1.4`, dated 2026-04-24.

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
| Withdraw Join Request | `DS-HL-002` | deletes `DS-HL-002`, updates `DS-HL-001` | D&P emits trigger; NSF owns host notification creation. |
| Leave Joined Activity | `DS-HL-001`, `DS-HL-002` | deletes `DS-HL-002`, updates `DS-HL-001` | Host leave notification belongs to NSF. |
| View Personal List | `DS-HL-001`, `DS-HL-002` | none | Read-only upcoming/past composition. |
| Submit Report | `DS-AP-001`, `DS-AP-002` | creates `DS-SM-002` | Activity target validation details remain limited. |
| Review Report | `DS-AP-001`, `DS-AP-002`, `DS-HL-001`, `DS-SM-002` | updates `DS-SM-002` | AP/HL consequences are routed to native workflows. |
| Block User | `DS-AP-001`, `DS-AP-002`, `DS-SM-001` | creates/reads `DS-SM-001`; conditional H&L trigger | Pending-request effects remain H&L-owned. |
| Notify: Join Event | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Suppressed if block exists. |
| Notify: Withdraw Event | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Current stable interpretation: host notification after pending-request withdrawal. |
| Notify: Leave Event | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Host notification after joined participant leaves. |
| Notify: App. Outcome | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Participant notification after approval/decline. |
| Notify: Cancellation | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Fan-out to joined participants not suppressed by block state. |
| Open Notification | `DS-NS-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | none | Read-only navigation/access check. |
| Notify: Activity Reminder | `DS-AP-001`, `DS-HL-001`, `DS-HL-002` | creates `DS-NS-001` | Active MVP architecture branch; no block check by default. |

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
- deleted

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

### Moderation Consequences

`Review Report` updates only `DS-SM-002` directly.

If the moderation outcome bans/suspends a user, SM triggers the AP-native account workflow.

If the moderation outcome removes an activity, SM triggers the H&L-native deletion workflow.

## Internal Source Contradictions

The 2026-04-25 batch contains a few leftover contradictions. The wiki uses the latest workdoc/CRUD interpretation and keeps these as cleanup items:

- The CRUD matrix row text for `Withdraw Join Request` says "No host notification", while the same matrix version includes `Notify: Withdraw Event`, the invariant section says pending request withdrawal must notify the host, and D&P/NSF workdocs model a withdrawal trigger. Stable interpretation: D&P does not write notifications, but NSF creates a host withdrawal notification if allowed.
- The integrated DFD text still mentions deletion triggers to notifications and logically archived participation records in places. H&L workdoc `v2.1` and CRUD Matrix `v1.4` instead stabilize hard-delete behavior and no confirmed deletion notification.
- Older diagrams may show direct writes from H&L/D&P to `DS-NS-001`. Current boundary: NSF alone writes notification records.

## Related Pages

- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/architecture/data-stores|Architecture Data Stores]]
- [[wiki/project/decisions|Decisions]]
