# D\&P - DFD workdoc v5

# D\&P - DFD WorkDoc

# InCampus — Discovery and Participation Subgroup

## Version Changelog

| Version      | Date       | Section modified                              | Description of the change                                                                                                                                                                                                                                                                                                                                                          | Reason for the change                                                                                                                                                                                            | Source document used as reference                                   |
| ------------ | ---------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| V1.0         | 2026-04-24 | Initial D\&P DFD                              | First subgroup diagram/workdoc version using provisional store names such as DS-01, DS-02, DS-03, and DS-04.                                                                                                                                                                                                                                                                       | First working model for Discovery and Participation.                                                                                                                                                             | Initial D\&P subgroup draft                                         |
| V2.0         | 2026-04-24 | Data store naming                             | Updated the diagram to use shared project store IDs for activities, participations, profiles, and block relationships.                                                                                                                                                                                                                                                             | Store names had to match the shared database inventory.                                                                                                                                                          | Shared DB inventory / CRUD Matrix                                   |
| V3.0         | 2026-04-24 | Diagram structure                             | Kept the six logical D\&P processes and highlighted adjacent stores/subsystems.                                                                                                                                                                                                                                                                                                    | The diagram needed to remain mergeable with the integrated Level-1 DFD.                                                                                                                                          | D\&P subgroup diagram                                               |
| V4.0         | 2026-04-24 | Join / withdraw / leave notification triggers | Added host notification triggers toward the Notifications and System Flow subgroup.                                                                                                                                                                                                                                                                                                | Notification creation belongs to NSF, but D\&P actions can trigger notification consequences.                                                                                                                    | CRUD Matrix; NSF WorkDoc                                            |
| V5.0 current | 2026-04-24 | Whole WorkDoc and diagram (workflow)          | Rebuilt the WorkDoc as a complete, consistent version. Closed block-check uncertainty, replaced provisional store names with final store IDs, restored missing Leave Joined Activity and View Personal Activity List sections, clarified D\&P vs NSF responsibility for notifications, and aligned withdraw/leave behavior with the current CRUD Matrix and Final Merge direction. | The uploaded WorkDoc was incomplete and still contained contradictions/uncertainty. The current version must be coherent with CRUD Matrix priority, Final Merge rules, and the corrected NSF notification logic. | CRUD Matrix; Final Merge and Integration; D\&P diagram; NSF WorkDoc |

***

## 1. Scope and assumptions

The **Discovery and Participation** subgroup covers the student-facing interaction with existing activities. It does not create activities and does not own activity lifecycle management. Its responsibility is to let students discover available activities, inspect allowed details, join or request to join, withdraw pending requests, leave joined activities before start, and view their own activity-related list.

Included use cases:

* **Browse and Filter Activities**
* **View Activity Details**
* **Join Activity**
* **Withdraw Join Request**
* **Leave Joined Activity**
* **View Personal Activity List**

Excluded use case:

* **Send Message** — excluded from the MVP and postponed to post-MVP by team decision.

Modeling level:

* logical only;
* no APIs, services, controllers, implementation tables, queues, or push-notification provider choices;
* D\&P may read and update HL stores where CRUD Matrix explicitly allows it, but ownership of activity truth remains in **Hosting and Lifecycle**.

***

## 2. Source-priority alignment summary

This WorkDoc follows the current project source priority:

1. **CRUD Matrix** — highest priority.
2. **Final Merge and Integration** — second priority.
3. **D\&P subgroup DFD** — supporting reference.
4. **D\&P WorkDoc** — corrected to match the above.

The most important alignment decisions are:

* block checks are no longer uncertain for discovery/detail/join paths;
* blocked users' activities must be filtered already in browse results;
* blocked users cannot open each other's activity details;
* join/request is blocked if a reciprocal block relationship exists;
* D\&P does not write notification records, but it sends notification triggers to NSF when a D\&P action requires a notification consequence;
* **Withdraw Join Request** and **Leave Joined Activity** are separate flows, with separate notification trigger semantics;
* **Pending Approval** is not an activity status. It is a guest participation state stored in `DS-HL-002 Activity Participations`.

***

## 3. Candidate data stores and final naming

The previous WorkDoc used provisional names such as `DS-01`, `DS-02`, `DS-03`, and `DS-04`. Those names are replaced by the final shared store IDs.

| Final store ID | Store name              | Status in D\&P                                                    | Purpose in this subgroup                                                                                                                                                                                                   |
| -------------- | ----------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DS-HL-001`    | Activities              | Reused upstream store, partially updated by specific D\&P actions | Read for feed construction, details, activity state, limits, host reference, lifecycle state, and display summaries. Updated only for participant/request count and availability effects during join, withdraw, and leave. |
| `DS-HL-002`    | Activity Participations | Reused upstream store, partially updated by specific D\&P actions | Read for existing participation/request state and personal lists. Created/deleted by join, withdraw, and leave flows as allowed by the CRUD Matrix.                                                                        |
| `DS-AP-002`    | Student Profile         | Reused upstream store                                             | Read only when activity details need the host's minimal profile and the block check allows exposure.                                                                                                                       |
| `DS-SM-001`    | Block Relationships     | Reused enforcement store                                          | Read for visibility filtering, activity-detail access checks, and join interaction prevention.                                                                                                                             |
| `DS-NS-001`    | Notification Records    | Not owned and not directly written by D\&P                        | Owned by NSF. D\&P sends notification triggers to the Notifications and System Flow subgroup; NSF creates notification records if its own rules allow it.                                                                  |

No additional D\&P-owned store is required.

***

## 4. Key business events

| Event ID | Event                           | Trigger                                                  | Initiating actor | Main stores read                      | Main stores updated      | Output                                                |
| -------- | ------------------------------- | -------------------------------------------------------- | ---------------- | ------------------------------------- | ------------------------ | ----------------------------------------------------- |
| E-01     | Browse campus activities        | Student opens feed or applies filters                    | Student          | `DS-HL-001`, `DS-SM-001`              | none                     | Visible filtered activity list                        |
| E-02     | View activity details           | Student selects an activity                              | Student          | `DS-HL-001`, `DS-SM-001`, `DS-AP-002` | none                     | Activity details with host minimal profile if allowed |
| E-03     | Join activity / request to join | Student submits join intent                              | Student          | `DS-HL-001`, `DS-HL-002`, `DS-SM-001` | `DS-HL-001`, `DS-HL-002` | Join result and notification trigger to NSF           |
| E-04     | Withdraw pending join request   | Student withdraws a pending request before host decision | Student          | `DS-HL-002`                           | `DS-HL-001`, `DS-HL-002` | Withdrawal confirmation and withdrawal trigger to NSF |
| E-05     | Leave joined activity           | Student leaves an already joined activity before start   | Student          | `DS-HL-001`, `DS-HL-002`              | `DS-HL-001`, `DS-HL-002` | Leave confirmation and leave trigger to NSF           |
| E-06     | View personal activity list     | Student opens personal activity list                     | Student          | `DS-HL-001`, `DS-HL-002`              | none                     | Upcoming and past activity lists                      |

***

## 5. Textual flow sketches by use case

### 5.1 UC 1.0 — Browse and Filter Activities

**Initiating actor:** Student

```
[Student] --(filter criteria + campus context)--> [1.0 Browse and Filter Activities]
[1.0] --(campus id + filter parameters)--> {DS-HL-001 Activities}
{DS-HL-001 Activities} --(candidate activity records)--> [1.0]
[1.0] --(viewer id + host ids)--> {DS-SM-001 Block Relationships}
{DS-SM-001 Block Relationships} --(block visibility constraints)--> [1.0]
[1.0] --(visible filtered activity list)--> [Student]
```

**Corrected note:** The block relationship check is no longer uncertain. Blocked users' activities must be filtered from discovery results. Discovery should not display activities owned by reciprocally blocked users.

**Visibility rule:** Activities that are full, cancelled, deleted, or completed are not part of normal discovery results. Approval-based activities that are still available remain shown as open; pending requests are a guest participation state, not an activity-level status visible to all users.

### 5.2 UC 2.0 — View Activity Details

**Initiating actor:** Student

```
[Student] --(activity id)--> [2.0 View Activity Details]
[2.0] --(activity id)--> {DS-HL-001 Activities}
{DS-HL-001 Activities} --(activity data + host id)--> [2.0]
[2.0] --(viewer id + host id)--> {DS-SM-001 Block Relationships}
{DS-SM-001 Block Relationships} --(block status)--> [2.0]
[2.0] --(host id, only if access allowed)--> {DS-AP-002 Student Profile}
{DS-AP-002 Student Profile} --(host minimal profile)--> [2.0]
[2.0] --(activity details + host minimal profile if allowed)--> [Student]
```

**Corrected note:** The block check is mandatory, not provisional. If a reciprocal block relationship exists between the viewer and the host, the activity detail page must not be opened.

**CRUD behavior:** Read-only over `DS-HL-001`, `DS-AP-002`, and `DS-SM-001`.

### 5.3 UC 3.0 — Join Activity

**Initiating actor:** Student

```
[Student] --(activity id + join intent)--> [3.0 Join Activity]
[3.0] --(activity id)--> {DS-HL-001 Activities}
{DS-HL-001 Activities} --(activity state + limits + participation mode + host id)--> [3.0]
[3.0] --(student id + activity id)--> {DS-HL-002 Activity Participations}
{DS-HL-002 Activity Participations} --(existing participation/request status)--> [3.0]
[3.0] --(student id + host id)--> {DS-SM-001 Block Relationships}
{DS-SM-001 Block Relationships} --(block status)--> [3.0]
[3.0] --(new participation record OR pending join request)--> {DS-HL-002 Activity Participations}
[3.0] --(updated participant count / request count)--> {DS-HL-001 Activities}
[3.0] --(join result)--> [Student]
[3.0] --(join/request notification trigger)--> [Notifications and System Flow]
```

**Corrected note:** The block check is mandatory. If a reciprocal block relationship exists between the student and the host, the join/request action must be prevented.

**Direct join path:** Creates a joined participation record if the activity is open, direct-join allowed, not full, and no existing conflicting participation/request exists.

**Approval-based path:** Creates a pending request record if approval is required and request limits allow it. The activity itself remains open unless its own lifecycle/count rules make it unavailable.

**Notification boundary:** D\&P only emits a join/request trigger. `DS-NS-001 Notification Records` is created by NSF, not by D\&P.

### 5.4 UC 4.0 — Withdraw Join Request

**Initiating actor:** Student

```
[Student] --(request id + withdraw action)--> [4.0 Withdraw Join Request]
[4.0] --(request id)--> {DS-HL-002 Activity Participations}
{DS-HL-002 Activity Participations} --(pending request state)--> [4.0]
[4.0] --(request deletion)--> {DS-HL-002 Activity Participations}
[4.0] --(updated request count / freed request slot)--> {DS-HL-001 Activities}
[4.0] --(withdrawal confirmation)--> [Student]
[4.0] --(withdrawal notification trigger)--> [Notifications and System Flow]
```

**Corrected note:** The previous WorkDoc was internally contradictory because it showed a host notification trigger but stated that the host does not receive a notification. The corrected interpretation is:

* D\&P does not create a notification record directly;
* D\&P emits a withdrawal event trigger to NSF;
* NSF decides whether to create the host notification record according to the notification rules, including block suppression.

**CRUD behavior in D\&P:** `DS-HL-002` is read/deleted; `DS-HL-001` is updated for availability/count effects. No direct `DS-NS-001` write happens in this subgroup.

### 5.5 UC 5.0 — Leave Joined Activity

**Initiating actor:** Student

```
[Student] --(activity id + leave action)--> [5.0 Leave Joined Activity]
[5.0] --(student id + activity id)--> {DS-HL-002 Activity Participations}
{DS-HL-002 Activity Participations} --(joined participation state)--> [5.0]
[5.0] --(activity id)--> {DS-HL-001 Activities}
{DS-HL-001 Activities} --(activity state + start time + host id)--> [5.0]
[5.0] --(participation deletion)--> {DS-HL-002 Activity Participations}
[5.0] --(updated participant count / freed slot)--> {DS-HL-001 Activities}
[5.0] --(leave confirmation)--> [Student]
[5.0] --(leave notification trigger)--> [Notifications and System Flow]
```

**Corrected note:** Leave is separate from pending-request withdrawal. Leave applies to an already joined participant before the activity starts. It triggers a host-facing leave event toward NSF.

**CRUD behavior in D\&P:** `DS-HL-002` is read/deleted; `DS-HL-001` is read/updated. No direct `DS-NS-001` write happens in this subgroup.

### 5.6 UC 6.0 — View Personal Activity List

**Initiating actor:** Student

```
[Student] --(student id)--> [6.0 View Personal Activity List]
[6.0] --(student id)--> {DS-HL-002 Activity Participations}
{DS-HL-002 Activity Participations} --(user participation records)--> [6.0]
[6.0] --(activity ids)--> {DS-HL-001 Activities}
{DS-HL-001 Activities} --(activity summary data + lifecycle state)--> [6.0]
[6.0] --(upcoming and past activity lists)--> [Student]
```

**Corrected note:** This is a read-only composition process over participation records and activity summaries. The CRUD Matrix does not require `DS-SM-001` for this process, so block filtering should not be added unless a later team decision explicitly introduces it.

***

## 6. Important consistency decisions

### 6.1 Block behavior is closed, not uncertain

The previous WorkDoc marked some block checks as uncertain. This is now closed.

Block relationships affect:

* browse/filter visibility;
* activity-detail accessibility;
* join/request interaction.

This means the D\&P diagram must read `DS-SM-001 Block Relationships` in Browse, View Details, and Join Activity.

### 6.2 D\&P does not own notification records

The Notifications and System Flow subgroup owns `DS-NS-001 Notification Records`. D\&P actions may create event triggers, but not notification records.

Therefore:

* Join Activity emits a join/request trigger to NSF.
* Withdraw Join Request emits a withdrawal trigger to NSF.
* Leave Joined Activity emits a leave trigger to NSF.

NSF then reads upstream HL/AP/SM truth and creates the notification record if allowed.

### 6.3 Pending Approval is not an activity status

For approval-based activities, `Pending Approval` is the student's participation state relative to that activity. It belongs in `DS-HL-002 Activity Participations`, not in `DS-HL-001 Activities`.

The activity can still appear as open in discovery if it remains available according to activity rules. Other students should not see that someone else has already submitted a pending request.

### 6.4 Store ownership and write access are different

`DS-HL-001` and `DS-HL-002` are owned by Hosting and Lifecycle, but D\&P has justified write access in specific student-side interaction processes:

* Join Activity;
* Withdraw Join Request;
* Leave Joined Activity.

This does not transfer store ownership to D\&P.

***

## 7. Inconsistencies corrected from the uploaded version

### 7.1 Provisional store names replaced

The uploaded WorkDoc still used `DS-01`, `DS-02`, `DS-03`, and `DS-04`. These were replaced with final shared IDs.

### 7.2 Browse missing block check

The uploaded workflow did not model block filtering in Browse and Filter Activities. This was corrected because blocked users' activities must be filtered at discovery stage.

### 7.3 Block checks marked uncertain

The uploaded WorkDoc marked View Details and Join block checks as uncertain. They are now confirmed.

### 7.4 Withdraw contradiction fixed

The uploaded WorkDoc showed a host notification trigger but said the host does not receive notification. The corrected wording separates the D\&P trigger from NSF notification creation.

### 7.5 Missing UC 5 and UC 6 sections restored

The uploaded WorkDoc ended at UC 4.0. Leave Joined Activity and View Personal Activity List were reconstructed and added.

### 7.6 Notification ownership clarified

The uploaded WorkDoc treated the Notifications Subsystem as an external destination but did not explain the ownership boundary precisely enough. The corrected version states that D\&P emits event triggers and NSF owns `DS-NS-001`.

***

## 8. Open points that remain

The corrected WorkDoc closes the major structural issues. The following points remain open because they are not fully specified in the current documentation:

1. **Exact UI layout of personal activity lists.** The logical read is clear, but the exact split between upcoming, past, cancelled, and hidden/archived items depends on UI-level decisions.
2. **Exact user-facing message for blocked/inaccessible activity details.** The DFD only models that access is denied or the activity is not shown.
3. **Detailed concurrency handling for join/request counts.** The CRUD relationship is clear, but implementation-level locking/transaction behavior is outside this logical DFD.

***

## 9. Mergeability check

The corrected D\&P WorkDoc is mergeable with the integrated architecture because:

* it uses final store IDs;
* it does not introduce duplicate stores;
* it distinguishes store ownership from process write access;
* it keeps notification record creation inside NSF;
* it models block behavior as a hard visibility and interaction constraint;
* it keeps D\&P as the student-facing discovery/participation layer rather than absorbing Hosting and Lifecycle or Notifications responsibilities.

The final structural rule to preserve is:

**Hosting and Lifecycle owns activity and participation truth. Safety and Moderation owns block relationships. Notifications and System Flow owns notification consequences. Discovery and Participation consumes and updates activity/participation state only where student-side interaction requires it.**
