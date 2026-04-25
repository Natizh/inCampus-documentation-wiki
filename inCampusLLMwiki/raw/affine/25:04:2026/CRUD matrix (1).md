# CRUD matrix

# Architectural Specification & CRUD Matrix: InCampus

Version Log

| Version      | Date       | Author  | Changes                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------ | ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `1.0`        | 2026-04-20 | Team    | Initial draft of the CRUD matrix based on process and data store analysis.                                                                                                                                                                                                                                                                                                                                         |
| `1.1`        | 2026-04-22 | Gemini  | **Architectural Alignment & Admin Override:** Corrected the `Review Report` process to respect data ownership. Explicitly modeled Admin override actions (ban/delete) as triggers to AP and HL native processes, removing direct `U*`/`D*` on AP/HL stores.                                                                                                                                                        |
| `1.2`        | 2026-04-22 | ChatGPT | **closure for notification context opening**: finalized the last previously ambiguous row by confirming that `Open Notification Context` is a read-only process over the referenced business context. Fixed the row to `R` on `DS-HL-001`, `DS-HL-002`, `DS-SM-001`, and `DS-NS-001`; removed branch ambiguity (`R*`) and documented that opening a notification does not implicitly update notification state. \| |
| `1.3`&#xA;   | 2026-04-22 | Gemini  | Removed direct `U*` on `HL-002` from `Block User` process (SM triggers HL instead). Updated `Withdraw Join Request` logic and Rule 4 to reflect team decision on host notifications, adding corresponding `Notify` row.                                                                                                                                                                                            |
| `1.4`        | 2026-04-24 | Fra     | **MVP Activity Reminder Alignment:** Added `Notify: Activity Reminder` as an active Notifications row. The reminder reads upstream activity schedule/lifecycle state and still-joined participation state, creates only the notification consequence in `DS-NS-001`, and is suppressed if the participant is no longer joined or if the activity has been cancelled and superseded by cancellation flow.           |

***

## 1. System Context & Data Store Definitions

*To assist code generation and architectural understanding, the opaque Data Store IDs (**`DS-**-***`**) are mapped to their logical domain entities below.*

### Campus Administration (CA)

* **`DS-CA-001`****&#x20;(CampusStore):** Stores core campus configurations and basic details.
* **`DS-CA-002`****&#x20;(CampusOptionsStore):** Stores structured options for a campus (e.g., categories, locations).

### Access and Profile (AP)

* **`DS-AP-001`****&#x20;(UserAccountStore):** Stores user authentication, account verification state, and platform access status (suspended/banned).
* **`DS-AP-002`****&#x20;(UserProfileStore):** Stores the student's minimal public profile and campus selection.
* **`DS-AP-003`****&#x20;(DomainRulesStore):** Stores university-domain verification rules.

### Hosting and Lifecycle (HL)

* **`DS-HL-001`****&#x20;(ActivityStore):** Stores the core activity details, status, and lifecycle constraints.
* **`DS-HL-002`****&#x20;(ParticipationStore):** Stores join requests, participant statuses, and headcount tracking.

### Safety and Moderation (SM)

* **`DS-SM-001`****&#x20;(BlockListStore):** Stores user-to-user block relationships.
* **`DS-SM-002`****&#x20;(ReportStore):** Stores user-submitted moderation reports and admin review outcomes.

### Notifications and System Flow (NS)

* **`DS-NS-001`****&#x20;(NotificationStore):** Stores system and cross-user notifications. *Constraint: Does not duplicate business state from HL or AP.*

***

## 2. Operation Legend

* **`C`** = Create (Creates a new persistent record)
* **`R`** = Read (Reads state/data for logic, presentation, or validation)
* **`U`** = Update (Modifies an existing persistent record)
* **`D`** = Delete (Physical hard-delete/removal of a record)
* **`*`** = Conditional/Branch-specific operation based on business rules.

***

## 3. CRUD Matrix

| Process                         | Domain Subgroup     | Process Description & Logic                                                                      | `CA-001` | `CA-002` | `AP-001` | `AP-002` | `AP-003` | `HL-001` | `HL-002` | `SM-001` | `SM-002` | `NS-001` |
| ------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| **Configure New Campus**        | Campus Admin        | Creates the campus and its initial structured options.                                           | C        | C        |          |          |          |          |          |          |          |          |
| **Manage Campus Options**       | Campus Admin        | Reads authorized campus context; mutates categories/locations.                                   | R        | CRUD     |          |          |          |          |          |          |          |          |
| **Sign Up / Verify**            | Access & Profile    | Reads domain rules, creates account, updates verification state.                                 |          |          | CRU      |          | R        |          |          |          |          |          |
| **Sign In**                     | Access & Profile    | Logical read of verified account state (session handling excluded here).                         |          |          | R        |          |          |          |          |          |          |          |
| **Select Campus**               | Access & Profile    | Reads derived university campuses; updates user profile campus.                                  | R        |          | RU       |          |          |          |          |          |          |          |
| **Set Up Minimal Profile**      | Access & Profile    | Creates the student's minimal profile.                                                           |          |          |          | C        |          |          |          |          |          |          |
| **Edit Minimal Profile**        | Access & Profile    | Reads and updates minimal profile record.                                                        |          |          |          | RU       |          |          |          |          |          |          |
| **View Minimal Profile**        | Access & Profile    | Read-only profile exposure. *Depends on Block check.*                                            |          |          |          | R        |          |          |          | R        |          |          |
| **Create Activity**             | Hosting & Lifecycle | Validates options/host eligibility; creates activity.                                            |          | R        | R        |          |          | C        |          |          |          |          |
| **Manage Join Requests**        | Hosting & Lifecycle | Reads profiles/requests; updates participation & activity headcount.                             |          |          |          | R        |          | RU       | RU       |          |          |          |
| **Update Activity Status**      | Hosting & Lifecycle | Updates lifecycle state; cancellation branch reads participations.                               |          |          |          |          |          | RU       | R        |          |          |          |
| **Delete Activity**             | Hosting & Lifecycle | Hard-deletes activity and ALL linked participation records.                                      |          |          |          |          |          | RD       | RD       |          |          |          |
| **Browse/Filter Activities**    | Discovery & Partic. | Feeds construction. *Blocked users' activities are filtered.*                                    |          |          |          |          |          | R        |          | R        |          |          |
| **View Activity Details**       | Discovery & Partic. | Reads activity/host profile. *Inaccessible if block exists.*                                     |          |          |          | R        |          | R        |          | R        |          |          |
| **Join Activity**               | Discovery & Partic. | Reads constraints/state; block check; creates request; updates counts.                           |          |          |          |          |          | RU       | CR       | R        |          |          |
| **Withdraw Join Request**       | Discovery & Partic. | Deletes pending request, updates availability. *No host notification.*                           |          |          |          |          |          | U        | RD       |          |          |          |
| **Leave Joined Activity**       | Discovery & Partic. | Deletes active participation, updates availability. *Host notified.*                             |          |          |          |          |          | RU       | RD       |          |          |          |
| **View Personal List**          | Discovery & Partic. | Read-only composition of upcoming/past user participations.                                      |          |          |          |          |          | R        | R        |          |          |          |
| **Submit Report**               | Safety & Moderation | Validates target/reporter; creates report record.                                                |          |          | R        | R        |          |          |          |          | C        |          |
| **Review Report**               | Safety & Moderation | Updates report outcome. (Actual admin bans or activity deletions are routed to AP/HL processes). |          |          | R        | R        |          | R        |          |          | RU       |          |
| **Block User**                  | Safety & Moderation | Validates target; creates/reads block. May affect pending requests.                              |          |          | R        | R        |          |          | U\*      | CR       |          |          |
| **Notify: Join Event**          | Notifications       | Suppressed if block exists.                                                                      |          |          | R        |          |          | R        | R        | R        |          | C        |
| **Notify: Withdraw Event**&#xA; | Notifications       | For pending requests withdrawn by user. Suppressed if block exists.                              |          |          | R        |          |          | R        | R        | R        |          | C        |
| **Notify: Leave Event**         | Notifications       | For joined users leaving before start. Suppressed if block exists.                               |          |          | R        |          |          | R        | R        | R        |          | C        |
| **Notify: App. Outcome**        | Notifications       | Suppressed if block exists.                                                                      |          |          | R        |          |          | R        | R        | R        |          | C        |
| **Notify: Cancellation**        | Notifications       | Suppressed if block exists.                                                                      |          |          | R        |          |          | R        | R        | R        |          | C        |
| **Open Notification**           | Notifications       | Reads notification, re-evaluates access permissions before routing.                              |          |          |          |          |          | R        | R        | R        |          | R        |
| **Notify: Activity Reminder**   | Notifications       |                                                                                                  |          |          | R        |          |          | R        | R        |          |          | C        |

***

## 4. System Invariants & Business Rules

### Data Deletion Constraints

1. **Activity Deletion (****`DS-HL-001`****,&#x20;****`DS-HL-002`****)**: Activity deletion is strictly a **hard-delete**. Deleting an activity must cascade to physically delete all linked participation and request records.

### Safety & Visibility (Blocking System)

1. **Reciprocal Visibility (****`DS-SM-001`****)**: If User A blocks User B, the effect is mutually restrictive.
   * Neither can see the other's activities in feeds.
   * Neither can access the other's Activity Details pages.
   * Neither can view the other's Profile Details.
2. **Notification Suppression (****`DS-NS-001`****)**: ALL cross-user notifications (joins, leaves, application outcomes, cancellations) must be strictly suppressed/aborted if a block relationship exists between the trigger user and the receiving user.

### Notification Triggers

1. **Pending Request Withdrawal**: If a user withdraws a *pending* join request, the system **must** generate a notification for the host (aligned with team decision in D\&P v4).
2. **Approved Participation Leave**: If a user leaves an activity *after* being approved (and before the activity starts), the system **must** generate a notification for the host.

### Moderation Consequences

1. **Admin User Actions**: Moderation outcomes applied to users (suspensions/bans) update the `DS-AP-001` (UserAccountStore) state.
2. **Admin Activity Actions**: Moderation outcomes resulting in activity removal act as a trigger to execute the native hard-delete workflow within the Hosting & Lifecycle module (`DS-HL-001` and `DS-HL-002`).

### Architectural Boundaries

1. **Notification Single Source of Truth**: The Notification module (`DS-NS-001`) must act purely as an event sink. It must read upstream truth from HL/AP modules and never maintain parallel state regarding activities or user participations.
2. **Notification Open Semantics**: Opening a notification is a read-only navigation and access-check operation. It shall read the notification record and the referenced current business context, without implicitly updating notification state or creating parallel activity/participation state.
