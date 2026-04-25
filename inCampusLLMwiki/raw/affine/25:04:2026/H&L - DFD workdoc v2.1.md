# H\&L - DFD workdoc v2.1

# H\&L - DFD WorkDoc

# Hosting and Lifecycle Subgroup

## Version Log

| Version | Date       | Section modified                   | Description of change                                                                                                                                            | Reason for change                                                                                                                                                                                                       | Source document used as reference                   |
| ------- | ---------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 1.0     | 2026-04-20 | Full document                      | Initial Hosting and Lifecycle logical modeling note.                                                                                                             | First subgroup-level DFD analysis package.                                                                                                                                                                              | H\&L subgroup narratives and original H\&L workflow |
| 2.1     | 2026-04-24 | Sections 2, 5, 6, 9, 10, 11, 12    | Replaced direct writes to `DS-NS-001` with notification triggers sent to the Notifications and System Flow subgroup.                                             | The CRUD Matrix assigns notification-record creation to NSF processes, not to H\&L processes.                                                                                                                           | CRUD Matrix; NSF WorkDoc                            |
| 2.1     | 2026-04-24 | Sections 3, 9, 10, 12              | Clarified Campus Admin involvement as a moderation-triggered override through native H\&L workflows, not as a routine actor for join-request decisions.          | Review Report may trigger AP/HL native workflows, but H\&L should not silently give Campus Admin routine ownership of host operations.                                                                                  | CRUD Matrix; SM WorkDoc alignment                   |
| 2.1     | 2026-04-24 | Sections 5, 9, 11                  | Closed the deletion ambiguity: activity deletion is a hard-delete and cascades to all linked participation/request records.                                      | The CRUD Matrix defines `Delete Activity` as `RD` on both `DS-HL-001` and `DS-HL-002`, with hard-delete cascade as a system invariant.                                                                                  | CRUD Matrix                                         |
| 2.1     | 2026-04-24 | Sections 5, 10, 11, 12             | Added the activity reminder dependency: H\&L owns the activity schedule and participation truth consumed by NSF for reminder notifications.                      | Receive Activity Reminder is now included in MVP and depends on `DS-HL-001` and `DS-HL-002`, but NSF owns the reminder notification consequence.                                                                        | NSF WorkDoc; activity reminder decision note        |
| 2.1     | 2026-04-24 | Sections 5, 8, 11                  | Refined the activity-status wording and removed unsupported “in-progress/ongoing” language.                                                                      | Current project decisions exclude ongoing as a state and stabilize the core status set around open/full/completed/cancelled/deleted, with pending approval as a participant-facing state rather than an activity state. | Final Merge decisions; CRUD Matrix                  |
| 2.1     | 2026-04-24 | Sections 6, 8                      | Updated final store names to match the CRUD Matrix: `DS-HL-001 ActivityStore` and `DS-HL-002 ParticipationStore`.                                                | Naming consistency across WorkDocs, CRUD Matrix, and merge package.                                                                                                                                                     | CRUD Matrix                                         |
| 2.1     | 2026-04-24 | Deletion and cancellation behavior | Clarified that Delete Activity does not trigger notifications. Cancellation triggers participant notification only when the activity has joined by participants. | Team decision; aligns H\&L lifecycle behavior with NSF notification ownership.                                                                                                                                          | Team clarification + CRUD Matrix + NSF WorkDoc      |

***

## 1. Why this document exists

This note records the reasoning adopted to analyze the **Hosting and Lifecycle** subgroup during the architecture-analysis phase. Its purpose is to explicitly define how the subgroup was read, delimited, decomposed, and connected to the rest of the system before finalizing the workflow diagram.

Because this subgroup represents the operational core of the app, it is crucial to establish strict logical boundaries. This document defines how activities are created, how host-controlled participation decisions are recorded, how lifecycle changes are represented, and how those changes become upstream business truth for other subgroups such as Discovery and Participation and Notifications and System Flow.

This WorkDoc remains at a logical level. It does not describe APIs, controllers, services, scheduler implementation, push providers, or database implementation details.

***

## 2. Material considered and reading strategy

The analysis is based on the use-case narratives and logical workflow breakdowns belonging to the subgroup:

* **Create Activity**
* **Set Activity Date and Time** *(treated logically as a mandatory subflow of Create Activity)*
* **Manage Join Requests**
* **Update Activity Status**
* **Delete Activity**

The analysis also considers interactions with stores defined by adjacent subgroups:

* **DS-CA-002: CampusOptionsStore / Campus Structured Options** from Campus Administration
* **DS-AP-001: UserAccountStore / Student Account** from Access and Profile
* **DS-AP-002: UserProfileStore / Student Profile** from Access and Profile
* **DS-SM-001: BlockListStore / Block Relationships** from Safety and Moderation, only where another process triggers H\&L consequences such as pending-request handling
* **DS-NS-001: NotificationStore / Notification Records** from Notifications and System Flow, as an external store owned by NSF, not by H\&L

The reading strategy is chronological: activity creation first, then participation management, then lifecycle maintenance and deletion. However, the subgroup is not treated as a closed island. H\&L owns activity and participation truth, while other subgroups consume that truth to build feeds, notification consequences, reminder notifications, and profile-context access.

***

## 3. Subgroup boundary and internal coherence

The **Hosting and Lifecycle** subgroup is highly cohesive. It manages the host-owned lifecycle of an activity and the participation state that belongs to that activity.

This subgroup includes:

* creating a new campus activity;
* validating creation inputs against campus structured options;
* storing activity schedule, location, category, capacity, participation mode, and host reference;
* allowing the host to review pending join requests;
* updating participation records after host approval or decline;
* updating activity lifecycle state, especially cancellation and completion;
* physically deleting an activity and all linked participation/request records when the delete activity workflow is executed;
* exposing activity and participation truth to other subgroups.

This subgroup excludes:

* browsing or searching for activities, which belongs to Discovery and Participation;
* the initial act of a guest student requesting to join or directly joining, which belongs to Discovery and Participation;
* notification-record creation and delivery, which belongs to Notifications and System Flow;
* block relationship creation, which belongs to Safety and Moderation;
* profile creation and profile maintenance, which belong to Access and Profile;
* campus configuration and option maintenance, which belong to Campus Administration;
* direct text messaging, which is post-MVP.

Campus Admin involvement must be interpreted carefully. The Campus Admin may trigger H\&L-native outcomes through moderation decisions, for example activity deletion after report review. This does not mean the Campus Admin routinely owns host-only operations such as approving or declining ordinary join requests.

***

## 4. Procedure adopted to derive the logical model

### 4.1 Reading the narratives as state-changing interactions

Each H\&L narrative changes activity or participation state.

* **Create Activity** creates the primary activity record.
* **Manage Join Requests** reads pending participation records and updates them into approved or declined outcomes. It may also update headcount-related activity state.
* **Update Activity Status** updates the lifecycle state of the activity, especially cancellation or completion.
* **Delete Activity** physically removes the activity and all linked participation/request records.

This state-based reading is important because it prevents H\&L from being modeled as a general social interaction module. Its core business truth is limited to activity records and participation records.

### 4.2 Separating core subgroup logic from external dependencies

H\&L is a central crossroads, but it does not own every consequence produced from its state changes.

Upstream, it consumes:

* campus options from Campus Administration;
* host account validity and applicant profile references from Access and Profile;
* moderation-triggered requests from Safety and Moderation when a report outcome requires native H\&L action.

Downstream, it provides:

* activity records and status to Discovery and Participation;
* participation records and activity context to Notifications and System Flow;
* schedule and still-joined participation truth for activity reminders;
* activity/participation context used when notifications are opened.

### 4.3 Reorganizing the subgroup into logical responsibilities

The subgroup naturally splits into three logical phases of ownership:

1. **Activity Initialization** — creation of the activity record, including category, location, schedule, participation mode, and capacity constraints.
2. **Participation Management** — host review of pending requests and update of participation/headcount state.
3. **Lifecycle Maintenance** — lifecycle status update, cancellation, completion, and hard deletion.

***

## 5. Results obtained from the subgroup analysis

### 5.1 Activity Creation and Validation

Create Activity requires cross-subgroup reference data. The host input must be validated against **DS-CA-002 CampusOptionsStore**, especially for allowed categories and valid campus locations/meeting points.

The host must also be a valid user, so the process reads **DS-AP-001 UserAccountStore** for host eligibility/account validity. The result is a new activity record in **DS-HL-001 ActivityStore**.

The scheduled date and start time are part of Create Activity in the current model. They are not treated as a separate final DFD process. The schedule must be stored in **DS-HL-001** because it is later consumed by Discovery, personal activity lists, cancellation display, and the MVP activity reminder branch in NSF.

### 5.2 Join Request Management

Manage Join Requests belongs to the host-controlled side of participation management.

The host reads pending requests from **DS-HL-002 ParticipationStore**, reads activity constraints and headcount from **DS-HL-001 ActivityStore**, and reads minimal applicant profile data from **DS-AP-002 UserProfileStore** to make an informed decision.

The process updates **DS-HL-002** with the approval or decline outcome and updates **DS-HL-001** where headcount or derived availability state must change.

The approval/decline outcome may trigger a notification, but H\&L does not create the notification record. H\&L only produces the business event/state change that NSF later consumes.

### 5.3 Activity Status Updates

Update Activity Status changes the lifecycle state of an existing activity in **DS-HL-001**.

The most important branch is cancellation. When an activity is cancelled, the process updates the activity status and reads **DS-HL-002** to identify joined participants. That joined-recipient set and the updated activity state become upstream business truth for the cancellation notification flow in NSF.

Completion is also a lifecycle state update, but the available documentation does not require a notification branch for completion.

The term “ongoing” should not be used as a confirmed activity state in this WorkDoc. Current project decisions exclude ongoing as a first-version activity state.

### 5.4 Activity Deletion

Delete Activity is distinct from cancellation.

Cancellation is a status update that preserves the activity as a cancelled historical/contextual object. Deletion is a hard-delete. When the Delete Activity workflow is executed, **DS-HL-001** is physically deleted and all linked records in **DS-HL-002** are physically deleted as well.

This closes the previous ambiguity about whether participation records should be archived. In the current architecture, the native deletion workflow hard-deletes linked participation/request records.

Deletion removes the activity from discovery views because the activity record no longer exists. The current CRUD Matrix does not assign notification-record creation to Delete Activity. Therefore, this WorkDoc should not claim that H\&L creates a deletion notification. If future requirements introduce deletion notification, it must be added as a separate NSF branch and reflected in the CRUD Matrix.

### 5.5 Activity Reminder Dependency

Receive Activity Reminder is now part of the MVP as a notification branch in the Notifications and System Flow subgroup.

H\&L does not create reminder notifications. However, NSF depends on H\&L truth to decide whether a reminder should be created:

* **DS-HL-001 ActivityStore** provides scheduled start time and lifecycle state;
* **DS-HL-002 ParticipationStore** provides the set of students still joined at reminder trigger time.

A reminder is valid only if the activity is still upcoming/non-cancelled and the student is still joined. If the student has left or the activity has been cancelled, the reminder must be suppressed or superseded by the cancellation flow.

***

## 6. Relationship with the databases already proposed

### 6.1 Reuse of DS-CA-002: CampusOptionsStore

Read-only dependency. Activity creation reads this store to validate selected campus category and location/meeting point options.

### 6.2 Reuse of DS-AP-001: UserAccountStore

Read-only dependency. Activity creation reads this store to validate host eligibility/account state.

### 6.3 Reuse of DS-AP-002: UserProfileStore

Read-only dependency. Manage Join Requests reads this store to display minimal applicant profile data to the host.

### 6.4 Interface with DS-NS-001: NotificationStore

This is not a write dependency for H\&L.

Notification records are owned and created by Notifications and System Flow. H\&L produces upstream state changes and event triggers, such as participation outcome and cancellation, but NSF reads **DS-HL-001** and **DS-HL-002** and creates records in **DS-NS-001**.

### 6.5 Interface with DS-SM-001: BlockListStore

H\&L does not own block relationships. The Safety and Moderation subgroup owns **DS-SM-001**.

If a block relationship is created and project rules require pending requests to be affected, that effect should be modeled as a trigger to the native H\&L participation-update workflow. H\&L performs the participation mutation in **DS-HL-002**, while SM remains the owner of the block record.

***

## 7. Missing stores revealed by the analysis

No additional H\&L-owned store is required beyond the two already stabilized shared stores.

### 7.1 DS-HL-001: ActivityStore

This is the core registry of created activities. It stores activity identity, host reference, campus/category/location choices, schedule, participant/request limits, participation mode, lifecycle status, and visibility-relevant state.

### 7.2 DS-HL-002: ParticipationStore

This is the relational store connecting students and activities. It stores pending requests, approved/joined states, declined outcomes, and records needed to calculate headcount/request availability.

No duplicate “upcoming activity,” “activity lifecycle,” “activity reminder,” or “notification context” store should be added inside H\&L.

***

## 8. Database-table definitions owned by this subgroup

| Store ID      | Final store name                                 | Subgroup              | Function                                                                                                                                                                        |
| ------------- | ------------------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DS-HL-001** | **ActivityStore / Activities**                   | Hosting and Lifecycle | Stores core activity details, host reference, campus-specific category/location choices, schedule, limits, participation mode, lifecycle status, and visibility-relevant state. |
| **DS-HL-002** | **ParticipationStore / Activity Participations** | Hosting and Lifecycle | Stores join requests, participant states, approval/decline outcomes, and headcount/request tracking information linked to activities.                                           |

***

## 9. Logical process structure that will matter for the workflow diagram

The workflow diagram should represent the following processes and data responsibilities.

### 9.1 Create Activity

**Input:** host activity details, category, location, schedule, participation mode, limits.

**Reads:**

* **DS-CA-002** for approved categories and locations;
* **DS-AP-001** for host account validity.

**Writes:**

* **DS-HL-001** to create the activity record.

**Does not write:**

* **DS-NS-001**.

### 9.2 Manage Join Requests

**Input:** host approval/decline decision.

**Reads:**

* **DS-HL-002** for pending requests;
* **DS-HL-001** for activity limits/state;
* **DS-AP-002** for minimal applicant profile.

**Writes:**

* **DS-HL-002** for participation outcome;
* **DS-HL-001** if headcount or availability state changes.

**Notification relation:**

* emits or exposes participation-outcome state for NSF;
* does not create records in **DS-NS-001**.

### 9.3 Update Activity Status

**Input:** host status update or moderation-triggered native H\&L command.

**Reads:**

* **DS-HL-001** for current activity state;
* **DS-HL-002** only in branches that need affected participant context, especially cancellation.

**Writes:**

* **DS-HL-001** to update lifecycle status.

**Notification relation:**

* cancellation exposes updated activity state and joined participant context to NSF;
* NSF owns notification creation.

### 9.4 Delete Activity

**Input:** host deletion confirmation or moderation-triggered native H\&L command.

**Reads:**

* **DS-HL-001** to validate activity ownership/status;
* **DS-HL-002** to identify linked records for deletion.

**Writes/deletes:**

* hard-deletes the activity record from **DS-HL-001**;
* hard-deletes all linked participation/request records from **DS-HL-002**.

**Notification relation:**

* no confirmed deletion-notification branch exists in the CRUD Matrix;
* deletion may affect later notification-opening behavior by making the referenced context unavailable, but NSF handles that as an unavailable fallback when opening a notification.

***

## 10. Main data dependencies and crossings with other subgroups

### 10.1 Import from Campus Administration

H\&L reads **DS-CA-002 CampusOptionsStore** to validate allowed categories and meeting locations during activity creation.

### 10.2 Import from Access and Profile

H\&L reads **DS-AP-001 UserAccountStore** to validate host eligibility and **DS-AP-002 UserProfileStore** to display applicant minimal profile information during join-request review.

### 10.3 Interface with Safety and Moderation

Safety and Moderation owns block relationships and report review outcomes. If a moderation outcome requires activity deletion, SM triggers the native H\&L deletion workflow. If a block rule affects pending requests, H\&L performs the native participation update in **DS-HL-002**.

### 10.4 Export to Discovery and Participation

Discovery and Participation reads **DS-HL-001** and **DS-HL-002** to build activity feeds, show details, support joining, support withdrawal/leave actions, and compose personal activity lists. H\&L does not own browse/filter behavior, but its records determine what D\&P can show.

### 10.5 Export to Notifications and System Flow

NSF reads **DS-HL-001** and **DS-HL-002** to resolve activity context, host reference, participation outcomes, joined-recipient sets, cancellation context, and reminder eligibility.

H\&L should be described as producing or exposing business-state changes for NSF, not as writing notification records directly.

***

## 11. Open points that should remain explicit before diagramming

### 11.1 Closed: participant management on deletion

The previous open point about whether linked participation records are archived or cascade-deleted is now closed. The current architecture uses hard-delete: deleting an activity physically deletes all linked participation/request records.

### 11.2 Closed: Set Activity Date and Time as separate DFD process

The previous uncertainty around Set Activity Date and Time can be closed for DFD purposes. Scheduling remains a required part of Create Activity, not a separate H\&L process in the subgroup DFD.

### 11.3 Partially closed: activity state vocabulary

The previous wording around “in-progress” or “ongoing” should be removed. Ongoing is not part of the first-version state model.

The current WorkDoc should use the following status vocabulary conservatively:

* **open** — visible/joinable according to participation mode and limits;
* **full** — not shown in discovery as joinable;
* **completed** — preserved as past activity context where relevant;
* **cancelled** — preserved as cancelled context, especially for participants/host;
* **deleted** — not a visible state, but the result of hard deletion.

“Pending approval” is not an activity lifecycle state. It is a guest/student participation state relative to an approval-based activity.

A full formal STD can still be designed later, but the WorkDoc no longer needs to mark the basic state vocabulary as completely unresolved.

### 11.4 Still open: exact authorization mechanism for Campus Admin override

The project confirms that moderation outcomes may trigger H\&L native actions, but the exact authorization and routing mechanism for Campus Admin override is not specified in this WorkDoc.

This should remain explicit and should not be turned into a technical design assumption.

### 11.5 Still open: whether deletion should ever notify users

The current CRUD Matrix does not include a deletion-notification branch. Therefore deletion should not be modeled as creating a notification. If the team later decides that deletion should notify users, this must be added as a separate NSF row and reflected in the CRUD Matrix.

***

## 12. Information especially useful for the future all-together DFD merge

When merging this subgroup into the Level-1 DFD, preserve these rules.

* H\&L owns **activity truth** and **participation truth**.
* H\&L writes **DS-HL-001** and **DS-HL-002**.
* D\&P reads H\&L stores for feed, details, join, withdrawal/leave, and personal-list flows.
* NSF reads H\&L stores for notification context, participant sets, and reminder eligibility.
* SM may trigger native H\&L workflows for moderation consequences, but SM does not directly mutate H\&L stores except where explicitly modeled through a native process.
* H\&L should not directly write **DS-NS-001**.
* Delete Activity must be modeled as a hard-delete on both activity and linked participation/request records.

### Diagram correction note

The existing diagram is structurally close, but it needs a small alignment correction:

* Replace direct arrows from H\&L processes to **DS-NS-001 Notification Records** with arrows to a **Notifications and System Flow** boundary or process labeled as notification trigger/event context.
* Remove or qualify the “create deletion notification” flow unless a separate deletion-notification branch is explicitly added to the CRUD Matrix.
* Replace “remove or archive participation records” with “hard-delete linked participation/request records.”
* Treat Campus Admin arrows as moderation-triggered native H\&L commands, not routine host-equivalent operations.

This is not a full redesign, but it is important for source-priority alignment.

***

## 13. Compact concluding view

The **Hosting and Lifecycle** subgroup is the operational core of the app. It manages the creation, maintenance, status evolution, and deletion of activities.

It relies on Campus Administration for valid categories/locations and Access and Profile for host/account/profile context. Internally, it owns **DS-HL-001 ActivityStore** and **DS-HL-002 ParticipationStore**.

The key architectural correction is that H\&L does not own notification persistence. It produces the activity and participation state changes that Notifications and System Flow consumes. Therefore, notification consequences such as application outcome, cancellation, leave/withdraw events, and reminders must remain in NSF, while H\&L remains the source of activity and participation truth.

Activity deletion is a hard-delete operation and does not generate user notifications.

Participant notification is required only when an activity is cancelled while one or more students are already joined. In that case, H\&L updates the activity status to cancelled, reads the joined participant set from DS-HL-002, and emits a cancellation notification trigger to NSF. NSF owns the creation of notification records.
