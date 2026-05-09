# CRUD Matrix And Invariants

This page summarizes the architecture CRUD matrix and the stable business invariants derived from it.

## Source Snapshot

Current source:

```text
raw/affine/09-05-2026/updates/CRUD matrix v1.6.md
raw/affine/09-05-2026/updates/Use cases v1.2.md
raw/affine/09-05-2026/updates/Non-Functional Requirements v1.2.md
```

Current matrix version: `1.6`, dated 2026-05-08.

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
| Set Up Student Profile | authenticated context only | creates `DS-AP-002` | No separate `DS-AP-001` read is required by the current matrix. |
| Edit Student Profile | `DS-AP-002` | updates `DS-AP-002` | Same profile lifecycle as setup. |
| View Student Profile | `DS-AP-002`, `DS-SM-001` | none | Block check is mandatory before profile exposure. |
| Create Activity | `DS-CA-002`, `DS-AP-001` | creates `DS-HL-001` | Date/time is part of create activity for DFD purposes. |
| Manage Join Requests | `DS-AP-002`, `DS-HL-001`, `DS-HL-002` | updates `DS-HL-001`, `DS-HL-002` | Outcome notification belongs to NSF. |
| Update Activity Status | `DS-HL-001`, conditionally `DS-HL-002` | updates `DS-HL-001` | Cancellation context is exposed to NSF. |
| Delete Activity | `DS-HL-001`, `DS-HL-002` | deletes `DS-HL-001`, linked `DS-HL-002` records | Hard-delete; no confirmed deletion notification. |
| Browse/Filter Activities | `DS-HL-001`, `DS-SM-001` | none | Blocked users' activities are filtered. |
| View Activity Details | `DS-HL-001`, `DS-AP-002`, `DS-SM-001` | none | Details inaccessible when block exists. |
| Join Activity | `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates/reads `DS-HL-002`, updates `DS-HL-001` | Join/request trigger goes to NSF. |
| Withdraw Join Request | `DS-HL-002` | deletes or deactivates `DS-HL-002`, updates `DS-HL-001` | No host notification, no NSF handler, and no `DS-NS-001` record for pending request withdrawal. |
| Leave Joined Activity | `DS-HL-001`, `DS-HL-002` | deletes `DS-HL-002`, updates `DS-HL-001` | Host leave notification belongs to NSF. |
| View Personal List | `DS-HL-001`, `DS-HL-002` | none | Read-only upcoming/past composition. |
| Submit Report | `DS-AP-001`, `DS-AP-002` | creates `DS-SM-002` | Activity target validation details remain limited. |
| Review Report | `DS-AP-001`, `DS-AP-002`, `DS-HL-001`, `DS-SM-002` | updates `DS-SM-002` | AP/HL consequences are routed to native workflows. |
| Block User | `DS-AP-001`, `DS-AP-002`, `DS-SM-001` | creates/reads `DS-SM-001`; conditional H&L trigger | Pending-request effects remain H&L-owned. |
| Notify: Join Event | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Suppressed if block exists. |
| Notify: Leave Event | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Host notification after joined participant leaves. |
| Notify: App. Outcome | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Participant notification after approval/decline. |
| Notify: Cancellation | `DS-AP-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | creates `DS-NS-001` | Fan-out to joined participants not suppressed by block state. |
| Open Notification | `DS-NS-001`, `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | none | Read-only navigation/access check; no read/unread state is modeled. |
| Notify: Activity Reminder | `DS-AP-001`, `DS-HL-001`, `DS-HL-002` | creates `DS-NS-001` | Active MVP architecture branch; no block check by default. |
| Update Campus Insight Consent | `DS-AP-001` | updates `DS-AP-001` | Student grants or revokes identifiable campus insight access; normal app access is unaffected. |
| View Consent-Based Student Insights | `DS-CA-001`, `DS-AP-001`; conditionally `DS-AP-002`, `DS-HL-001`, `DS-HL-002` | none | Runtime `AuthenticatedAdminContext`; identifiable reads require authorized campus scope and consent; no new admin or insight store. |

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

### Transaction And Concurrency

Join, request, approve, withdraw, leave, cancellation, and deletion operations that affect capacity, participation records, or counters must be atomic.

The first skeleton must re-check capacity and active request/participation state inside the write transaction. A uniqueness constraint must prevent duplicate active records for the same `ActivityID` and `StudentAccountID`. Conflicting concurrent operations receive a safe rejection, and counters must be derived or updated transactionally.

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

Pending request withdrawal is non-notifying. It must not generate a host notification, must not have an NSF handler, and must not create a `DS-NS-001` record. Host leave notification exists only when an already joined participant leaves.

### Consent-Based Campus Insight Access

`CampusInsightSharingConsent` belongs to `DS-AP-001 Student Account`.

The current matrix adds two consent-related processes:
- `Update Campus Insight Consent`: AP reads/updates the consent value on the student account.
- `View Consent-Based Student Insights`: a campus-admin read path that may read identifiable profile/activity/participation insight data only when campus authorization and consent checks pass.

The 2026-05-09 source confirms the student/admin use-case table entries, first-skeleton sequence/collaboration flows, and runtime admin context. It does not yet confirm detailed narratives, exact insight fields, or exact admin authentication implementation.

### Moderation Consequences

`Review Report` updates only `DS-SM-002` directly.

If the moderation outcome bans/suspends a user, SM triggers the AP-native account workflow.

If the moderation outcome removes an activity, SM triggers the H&L-native deletion workflow.

First-skeleton `ModerationAction` values are `none`, `warn_user`, `suspend_user`, `ban_user`, and `remove_activity`.

## Internal Source Cleanup Notes

The 2026-04-25 and 2026-05-03 batches contain a few older leftovers. The wiki uses the 2026-05-09 CRUD Matrix `v1.6`, system architecture, and first-skeleton diagrams where source priority is clear:

- Pending request withdrawal is non-notifying; older D&P/NSF withdrawal notification wording is superseded for the first skeleton.
- The integrated DFD text still mentions deletion triggers to notifications and logically archived participation records in places. H&L workdoc `v2.1` and CRUD Matrix `v1.6` instead stabilize hard-delete behavior and no confirmed deletion notification.
- Older diagrams may show direct writes from H&L/D&P to `DS-NS-001`. Current boundary: NSF alone writes notification records.

## Related Pages

- [[wiki/architecture/overview|Architecture Overview]]
- [[wiki/architecture/data-flow|Architecture Data Flow]]
- [[wiki/architecture/data-stores|Architecture Data Stores]]
- [[wiki/architecture/data-model|Architecture Data Model]]
- [[wiki/project/decisions|Decisions]]
