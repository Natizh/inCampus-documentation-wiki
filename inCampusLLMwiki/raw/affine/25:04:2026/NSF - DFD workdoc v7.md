# NSF - DFD workdoc v7

# InCampus — Notifications and System Flow Subgroup

## Explanatory Logical Modeling Note for Workflow and DFD Preparation

## Version log

| Version | Date       | Section modified                    | Description of the change                                                                                                                                                                                                                                                                                                                                                                                    | Reason for the change                                                                                                                                                                      | Source document used as reference                                             |
| ------- | ---------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| V1      | 2026-04-20 | Whole document                      | First subgroup note produced from the three original notification narratives. Candidate stores and flows were identified.                                                                                                                                                                                                                                                                                    | Initial logical analysis for the NSF subgroup.                                                                                                                                             | NSF WorkDoc draft                                                             |
| V2      | 2026-04-20 | Sections 3, 7, 9, 10                | Integrated `DS-HL-001 Activities` and `DS-HL-002 Activity Participations` as upstream stores from Hosting and Lifecycle, while keeping `DS-NS-001 Notification Records` as the only subgroup-owned store.                                                                                                                                                                                                    | Avoided duplicate lifecycle/participation stores and improved mergeability with Hosting and Lifecycle.                                                                                     | NSF WorkDoc draft; shared DB inventory                                        |
| V3      | 2026-04-20 | Sections 9, 16                      | Reconciled store names with the current shared DB inventory and distinguished reused stores from subgroup-owned stores.                                                                                                                                                                                                                                                                                      | Reduced naming drift and duplicate-store risk.                                                                                                                                             | Shared DB inventory                                                           |
| V4      | 2026-04-22 | Sections 7.4, 10.12, 11.6, 13       | Closed notification-open ambiguity by modeling `Open Notification` as a read-only operation over the notification record and current referenced business context. Deleted-target behavior was frozen as an unavailable fallback rather than reconstructed business state.                                                                                                                                    | The CRUD Matrix finalizes `Open Notification` as read-only over `DS-NS-001`, `DS-HL-001`, `DS-HL-002`, and `DS-SM-001`.                                                                    | CRUD Matrix v1.2; Final Merge and Integration                                 |
| V5      | 2026-04-24 | Sections 2, 5, 7, 9, 10, 11, 13, 17 | Aligned the WorkDoc with the current CRUD Matrix and Final Merge. Added `Notify: Withdraw Event` and `Notify: Leave Event`; added mandatory block checks for all cross-user notification creation flows; temporarily downgraded `Receive Activity Reminder` because the then-current CRUD Matrix did not yet include it.                                                                                     | CRUD Matrix v1.3 did not include activity reminders and required block suppression for all cross-user notifications. This row is retained as historical traceability and superseded by V6. | CRUD Matrix v1.3; Final Merge and Integration; NSF subgroup diagram           |
| V6      | 2026-04-24 | Sections 2, 5, 7, 10, 11, 13, 17    | Reinstated `Receive Activity Reminder` as an active MVP notification branch, according to the priority decision dated 2026-04-22. The reminder is modeled as a system/time-triggered notification created only for students still joined in a scheduled upcoming activity; it is suppressed when the participant is no longer joined and superseded by the cancellation flow when the activity is cancelled. | The user-provided priority note explicitly states that the reminder branch is now included in the MVP and reflected in the NSF DFD and CRUD Matrix.                                        | User priority note 2026-04-22; NSF subgroup DFD V3; CRUD Matrix update v1.4   |
| V7      | 2026-04-24 | diagram alignment                   | Updated the current NSF workflow so that `Notify: Withdraw Event` and `Notify: Leave Event` are represented as separate branches, all cross-user notification creation flows read `DS-SM-001`, `Receive Activity Reminder` remains an MVP branch without block check, and `Open Notification` re-checks current context before routing.                                                                      | The current workflow diagram still merged withdrawal and leave and did not consistently show the CRUD-required block checks on every cross-user notification branch.                       | Current NSF workflow V3; CRUD Matrix v1.3/v1.4; user priority note 2026-04-22 |

***

## 1. Why this document exists

This note records, in one coherent place, the reasoning adopted to analyse the **Notifications and System Flow** subgroup during the architecture-analysis phase. Its purpose is not to jump directly to the final merged diagram, but to make explicit how this subgroup should be interpreted, delimited, and connected to the already established shared stores before drawing the real workflow and before merging all subgroup DFDs.

For this reason, the document stays at a **logical level**. It does not discuss APIs, push-notification providers, controllers, services, queues, or technical implementation choices. Instead, it reconstructs the subgroup in terms of business events, persistent notification information, event consequences, recipient identification, access checks, and dependencies on adjacent areas.

The goal is not just to list outputs, but to preserve the reasoning that makes the later DFD, CRUD matrix, and data dictionary more consistent and easier to merge.

***

## 2. Material considered and reading strategy

The subgroup was reconstructed first from the notification use-case narratives and then reconciled against the **CRUD Matrix**, the **Final Merge and Integration** document, and the current NSF subgroup diagram.

The original notification narratives covered the following use cases:

* **Notify Host of Join Event**
* **Notify Participant of Application Outcome**
* **Notify Participant of Activity Cancellation**

The current CRUD Matrix expands the active notification model beyond those three original narratives. The currently active notification rows are:

* **Notify: Join Event**
* **Notify: Withdraw Event**
* **Notify: Leave Event**
* **Notify: App. Outcome**
* **Notify: Cancellation**
* **Notify: Activity Reminder**
* **Open Notification**

For DFD readability, **Notify: Withdraw Event** and **Notify: Leave Event** may be discussed together as the broader family **host notification after withdrawal or leave**, but they must remain distinguishable when reasoning about CRUD behavior.

The analysis follows three rules.

First, this subgroup is **event-driven**. It does not own the original business action that creates the event. A join request, a direct join, a pending-request withdrawal, a joined-participation leave, a host decision on a pending request, a host cancellation of an activity, or a reminder threshold for a scheduled upcoming activity all originate outside the notification-owned store. The subgroup begins only when one of these recognized business events must be transformed into a user-visible notification consequence.

Second, the subgroup must read business state that already exists outside it. The host is identified through the activity. The applicant is identified through participation state. The cancellation recipients are identified through the set of students currently joined in the activity. Withdrawal and leave notifications also depend on the current or just-changed participation state and the host reference stored in the upstream activity record. Activity reminders depend on current scheduling/lifecycle state in `DS-HL-001` and current still-joined participation state in `DS-HL-002`.

Third, notification logic requires persistence beyond immediate delivery. The notification must remain available through `DS-NS-001 Notification Records` when later in-app opening or notification-list access is required.

The reading strategy is therefore to avoid modeling notification use cases as isolated handlers. Instead, the subgroup should be modeled as a compact logical area that:

1. receives or detects relevant upstream business events,
2. resolves recipients and contextual references by reading existing stores,
3. checks block constraints before creating cross-user notifications,
4. checks participation/lifecycle validity before creating activity reminders,
5. creates persistent notification records when the notification is allowed,
6. delivers user-visible notification outputs,
7. and supports later opening of the referenced in-app destination when the recipient interacts with the notification.

### 2.1 Scope note about Receive Activity Reminder

The team decision dated **2026-04-22** gives priority to **Receive Activity Reminder** and confirms it as part of the **MVP notification branch** in the Notifications and System Flow subgroup.

This means that the earlier temporary downgrade is superseded. The reminder branch is now active scope for this WorkDoc, the NSF subgroup DFD, the CRUD Matrix, and the Final Merge note.

The branch must remain narrowly defined:

* it sends a reminder only for students who are still joined in a scheduled upcoming activity;
* it reads current activity lifecycle and scheduling state from `DS-HL-001 Activities`;
* it reads current still-joined participation state from `DS-HL-002 Activity Participations`;
* if the student has already left or is no longer joined, the reminder is suppressed;
* if the activity has been cancelled, the reminder is suppressed and the cancellation flow supersedes it;
* the notification subgroup still creates only the notification consequence in `DS-NS-001`, without owning activity scheduling or participation truth.

***

## 3. Subgroup boundary and internal coherence

The **Notifications and System Flow** subgroup includes the work needed to transform already-existing business state changes into meaningful user-facing notification outcomes.

What belongs inside the subgroup is the following logical work:

* recognition that a notification-worthy event has occurred,
* determination of who must receive the notification,
* block-check validation before creating cross-user notifications,
* participation/lifecycle validity checks before creating activity reminders,
* composition of a minimal notification payload,
* persistence of the notification record when the notification is allowed,
* delivery of the notification to the recipient,
* and support for later reopening of the relevant in-app context from the notification.

What does **not** belong inside the subgroup is equally important.

This subgroup does **not** create activities. It does **not** create join requests. It does **not** approve or decline requests. It does **not** withdraw or leave participations. It does **not** change activity lifecycle state. It does **not** define activity scheduling data or maintain a separate reminder schedule store. It does **not** define who is a valid student user. All of those belong to adjacent areas and appear here only as upstream facts that the notification logic consumes.

The stable store ownership boundary is:

* **Access and Profile** owns account truth.
* **Hosting and Lifecycle** owns activity and participation truth.
* **Safety and Moderation** owns block truth.
* **Notifications and System Flow** owns notification consequences.

The subgroup therefore reuses upstream stores but owns only `DS-NS-001 Notification Records`.

***

## 4. Main interfaces with adjacent subgroup areas

### 4.1 Interface with Access and Profile

The notification subgroup depends on `DS-AP-001 Student Account / UserAccountStore` as an upstream identity and validity source. It needs at least the recipient reference and enough account state to know whether the recipient is a valid active user in the campus system context.

The subgroup reads this store; it does not create or own it.

### 4.2 Interface with Hosting and Lifecycle

This is the strongest structural interface.

The subgroup depends on `DS-HL-001 Activities / ActivityStore` to resolve the activity reference, host reference, activity lifecycle status, activity context, and current availability of a referenced target.

The subgroup depends on `DS-HL-002 Activity Participations / ParticipationStore` to resolve who joined, who requested to join, who withdrew a pending request, who left an approved participation, who was approved or declined, and which users are currently joined and therefore must be notified in the case of cancellation.

These two stores provide the upstream business truth that notification logic reacts to. For the activity reminder branch, `DS-HL-001` provides the scheduled start time and current lifecycle state, while `DS-HL-002` provides the still-joined participant set at the reminder trigger time.

### 4.3 Interface with Safety and Moderation

The notification subgroup depends on `DS-SM-001 Block Relationships / BlockListStore` before creating any cross-user notification.

If a block relationship exists between the trigger user and the receiving user, the notification must be suppressed. This applies to join, withdrawal, leave, application outcome, and cancellation notifications.

The subgroup reads this store; it does not create or own block relationships.

### 4.4 Interface with in-app destination flows

When the recipient taps a notification, the system must reopen a relevant in-app context if that context still exists and remains accessible.

Depending on the event, the destination may be:

* the relevant activity/request-management context for the host after a join or join request,
* the activity view for the host after a withdrawal or leave,
* the relevant activity view for the applicant after approval or decline,
* or the cancelled activity view for the participant after cancellation.

This document keeps reopening logic at a logical level. It confirms the dependency but does not reassign ownership of those target views to the notification subgroup.

***

## 5. Key business events recognized by this subgroup

The narratives and the CRUD Matrix do not justify one process per use case, but they do justify the following notification-worthy event families.

### 5.1 Join event affecting the host

A student either directly joins an open activity or submits a join request to an approval-based activity. The business goal from the subgroup perspective is to inform the host promptly and give the host a usable entry point toward the relevant activity or request-management context.

The originating participation action is not owned here. The notification consequence is.

### 5.2 Pending request withdrawal affecting the host

A student withdraws a pending join request before the host has made a decision. The business goal from the subgroup perspective is to inform the host that the pending request has been withdrawn and that the relevant request/slot state has changed.

The withdrawal action belongs to Discovery and Participation. The host notification consequence belongs here.

This must be modeled carefully because the Discovery and Participation CRUD row can remain free of direct notification writes while the separate `Notify: Withdraw Event` row creates the notification record.

### 5.3 Joined participation leave affecting the host

A student leaves an activity after being approved or joined, and before the activity starts. The business goal from the subgroup perspective is to inform the host that a joined participant has left and that availability may have changed.

The leave action belongs to Discovery and Participation. The host notification consequence belongs here.

### 5.4 Participation outcome affecting the applicant

The host approves or declines a pending join request. The business goal from the subgroup perspective is to inform the applicant of the outcome and preserve the notification for later access when required.

The approval or decline decision belongs to Hosting and Lifecycle. The notification consequence belongs here.

### 5.5 Activity cancellation affecting current participants

An activity lifecycle change sets the activity to cancelled. The business goal from the subgroup perspective is to inform every currently joined participant that the appointment no longer exists as originally planned and to give them a way to reopen the activity in its cancelled state.

The cancellation decision belongs to Hosting and Lifecycle. The notification fan-out belongs here.

### 5.6 Activity reminder affecting still-joined participants

A configured reminder threshold is reached before the scheduled start time of an upcoming activity. The business goal from the subgroup perspective is to remind each student who is still joined that the activity is about to start.

This is a system/time-triggered notification consequence. It is not created from a new user action at that moment. The reminder must be suppressed if the student is no longer joined, and it must be superseded by the cancellation flow if the activity has already been cancelled.

The scheduling data and participation state remain owned upstream by Hosting and Lifecycle. The notification consequence belongs here.

### 5.7 Notification opening by recipient

A host or participant taps an existing notification. The business goal is to reopen the current referenced in-app context if it still exists and is still accessible.

This is not a creation event. It is a read-only navigation and access-check event.

***

## 6. Proposed logical function groups

Once the subgroup is interpreted through events rather than through isolated use cases, the behavior can be grouped into a small set of logical responsibilities.

### 6.1 Event consequence recognition

This function group covers the detection that an upstream business event now requires a user-visible notification consequence.

### 6.2 Recipient, context, and suppression resolution

This function group covers reading the upstream stores needed to determine who the recipient is, which activity is referenced, which participation state matters, which contextual information is needed for the notification payload, and whether the notification is allowed. For cross-user notifications, suppression is based on block rules. For activity reminders, suppression is based on current participation and lifecycle validity.

### 6.3 Notification recording and delivery

This function group covers creation of the persistent notification record when allowed, generation of the minimal payload, and delivery of the notification to the recipient.

### 6.4 Notification-driven re-entry to the app

This function group covers the logical consequence of the recipient opening the notification and being redirected to the relevant in-app destination after current-state and access re-checking.

***

## 7. Candidate logical processes

The subgroup can be modeled through a small number of candidate processes that are mergeable and do not duplicate the responsibilities of adjacent subgroups.

### 7.1 Process: Detect Notification-Relevant Event

This process exists to recognize that an already-recorded upstream state change now requires notification work.

It does not create the business event. It reacts to it.

Its main inputs are event signals derived from upstream changes such as:

* new participation record or relevant participation-state change,
* pending request withdrawal,
* joined participation leave,
* participation decision outcome,
* activity status change to cancelled,
* configured reminder threshold reached for a scheduled upcoming activity.

Its outputs are normalized notification triggers that can be handled consistently by downstream notification logic.

Main stores read indirectly or directly: `DS-HL-001 Activities`, `DS-HL-002 Activity Participations`.

Main stores updated: none.

Linked events/use cases: join event, withdraw event, leave event, application outcome, cancellation, activity reminder.

### 7.2 Process: Resolve Recipient, Notification Context, and Suppression Conditions

This process exists to determine who should receive the notification, what minimum contextual payload is required, and whether the notification may be created under the relevant suppression rules.

Its main inputs are normalized notification triggers.

Its outputs are resolved notification packages, such as:

* host + activity + join/request event type,
* host + activity + withdrawn pending request context,
* host + activity + leaving participant context,
* applicant + activity + approval/decline outcome,
* each joined participant + activity + cancellation context,
* still-joined participant + upcoming activity + scheduled reminder context.

Main stores read:

* `DS-AP-001 Student Account / UserAccountStore`
* `DS-HL-001 Activities / ActivityStore`
* `DS-HL-002 Activity Participations / ParticipationStore`
* `DS-SM-001 Block Relationships / BlockListStore`

Main stores updated: none.

If a block relationship exists between the trigger user and the receiving user for a cross-user notification, the process must suppress the notification and no `DS-NS-001` record should be created for that recipient.

For activity reminders, the key suppression checks are different: the student must still be joined in `DS-HL-002`, and the referenced activity in `DS-HL-001` must still be scheduled/upcoming and not cancelled. If either condition fails, no reminder notification record is created.

Linked events/use cases: all active notification creation events.

### 7.3 Process: Create and Deliver Notification

This process exists to convert an allowed resolved recipient/context package into a stored notification artifact and deliverable notification message.

Its main inputs are allowed resolved recipient/context packages.

Its main outputs are:

* a stored notification record,
* a delivered notification payload,
* and, where applicable, an accessible historical record for later in-app viewing or reopening.

Main stores read: none necessarily beyond the input package.

Main stores updated: `DS-NS-001 Notification Records / NotificationStore`.

Linked events/use cases: join event, withdraw event, leave event, application outcome, cancellation, activity reminder.

### 7.4 Process: Open Referenced In-App Context from Notification

This process exists to support the later user action of tapping a notification and reopening the relevant app context.

Its main inputs are a notification-open action and the selected notification reference.

Its main outputs are context navigation results toward the relevant activity-related area, or an unavailable fallback state when the referenced target no longer exists.

Main stores read:

* `DS-NS-001 Notification Records / NotificationStore`
* `DS-HL-001 Activities / ActivityStore`
* `DS-HL-002 Activity Participations / ParticipationStore`
* `DS-SM-001 Block Relationships / BlockListStore`

Main stores updated: none.

Opening a notification must not implicitly update notification state, activity state, or participation state. Read/unread behavior is not modeled here unless the team explicitly adds it later.

Linked events/use cases: all active notification use cases with different destinations.

***

## 8. Candidate external entities

### 8.1 Student Host

The host is not usually the initiator of notification logic, but is one of its main recipients. The host receives notifications about join/request events, pending request withdrawals, and joined participant leaves.

### 8.2 Participant / Applicant Student

The participant or applicant receives application-outcome notifications and cancellation notifications. The participant may later reopen the referenced activity context from the notification.

### 8.3 Notification Delivery Mechanism

The narratives refer to a notification service or mechanism. At this stage it should remain externalized and abstract. The subgroup sends notification payloads to it, but the technical form is unresolved and should stay unresolved.

***

## 9. Candidate logical data stores

This section reflects the current integrated store set and distinguishes reused stores from the one store owned by the notification subgroup.

### 9.1 `DS-AP-001`: Student Account / UserAccountStore

**Status in this subgroup:** reused current store.

This store holds the core account and access data for each student user, including account identity, verification state, and account validity state.

The subgroup needs it because notification logic must resolve the recipient as a valid campus user and use a stable recipient reference. It is an upstream store for identity, not a subgroup-owned notification store.

No duplication should be introduced here.

### 9.2 `DS-HL-001`: Activities / ActivityStore

**Status in this subgroup:** reused current store.

This store is the central activity record and contains the host identity, activity identity, main activity configuration, and activity lifecycle state.

The subgroup needs it because the host must be determined from the activity, the notification must reference the correct activity, cancellation logic depends on the activity lifecycle transition, and notification opening must check whether the referenced activity still exists.

No duplicate activity-lifecycle or notification-context activity store should be proposed inside this subgroup.

### 9.3 `DS-HL-002`: Activity Participations / ParticipationStore

**Status in this subgroup:** reused current store.

This store holds the relationship between students and activities, including participation state such as pending request, approved, declined, joined, withdrawn, left, or cancelled where applicable.

The subgroup needs it because:

* join-event notifications depend on the creation or update of participation state,
* withdrawal notifications depend on withdrawn pending-request state,
* leave notifications depend on left joined-participation state,
* application-outcome notifications depend on the decision outcome stored here,
* cancellation notifications depend on the set of currently joined recipients stored here,
* notification opening may need current participation context.

No duplicate participation-state store should be proposed inside this subgroup.

### 9.4 `DS-SM-001`: Block Relationships / BlockListStore

**Status in this subgroup:** reused current store.

This store contains user-to-user block relationships.

The subgroup needs it because all cross-user notifications must be suppressed if a block relationship exists between the trigger user and the receiving user. `Open Notification` must also re-check block/access state before routing the user into a referenced context.

The subgroup reads this store; it does not create or own it.

### 9.5 `DS-NS-001`: Notification Records / NotificationStore

**Status in this subgroup:** subgroup-owned current store.

This store contains the notifications generated by system-detected business events. At minimum it logically contains:

* recipient reference,
* related activity reference,
* notification type,
* minimal payload content,
* creation time,
* and the state needed to keep the notification available for later access in the app when required.

This store must not duplicate activity, participation, account, or block truth. It stores notification consequences and references to upstream business context.

***

## 10. Candidate logical data flows

The most important flows can now be written in a way that is directly compatible with the current CRUD Matrix and store inventory.

### 10.1 Join event trigger

**Source:** `DS-HL-002 Activity Participations` and/or upstream participation-handling process**Destination:** Detect Notification-Relevant Event**Flow name:** Join Event Signal**Data content:** activity reference, joining student reference, resulting participation state, event type: direct join or join request**Context:** host notification after join/request

### 10.2 Pending request withdrawal trigger

**Source:** `DS-HL-002 Activity Participations` and/or upstream withdrawal process**Destination:** Detect Notification-Relevant Event**Flow name:** Pending Request Withdrawal Signal**Data content:** activity reference, withdrawing student reference, withdrawn pending-request state**Context:** host notification after pending-request withdrawal

### 10.3 Joined participation leave trigger

**Source:** `DS-HL-002 Activity Participations` and/or upstream leave process**Destination:** Detect Notification-Relevant Event**Flow name:** Joined Participation Leave Signal**Data content:** activity reference, leaving student reference, previous joined state, leave event before activity start**Context:** host notification after joined participant leaves

### 10.4 Host resolution

**Source:** `DS-HL-001 Activities`**Destination:** Resolve Recipient, Notification Context, and Block State**Flow name:** Activity Host Context**Data content:** activity reference, host reference, activity summary data**Context:** host notifications after join/request, withdrawal, or leave

### 10.5 Application outcome trigger

**Source:** `DS-HL-002 Activity Participations` and/or upstream join-request decision process**Destination:** Detect Notification-Relevant Event**Flow name:** Participation Outcome Signal**Data content:** activity reference, applicant reference, updated participation state, decision outcome**Context:** participant outcome notification

### 10.6 Cancellation trigger

**Source:** `DS-HL-001 Activities` and/or upstream lifecycle-management process**Destination:** Detect Notification-Relevant Event**Flow name:** Activity Cancellation Signal**Data content:** activity reference, updated lifecycle state = cancelled**Context:** cancellation notification

### 10.7 Joined recipient set

**Source:** `DS-HL-002 Activity Participations`**Destination:** Resolve Recipient, Notification Context, and Block State**Flow name:** Joined Participant Set**Data content:** activity reference, all student references currently in joined state**Context:** cancellation fan-out

### 10.8 Recipient validity and account reference

**Source:** `DS-AP-001 Student Account`**Destination:** Resolve Recipient, Notification Context, and Block State**Flow name:** Recipient Account Context**Data content:** student reference, account validity / active state, campus-linked account identity**Context:** all notification cases

### 10.9 Block-state check

**Source:** `DS-SM-001 Block Relationships`**Destination:** Resolve Recipient, Notification Context, and Block State**Flow name:** Trigger-Recipient Block State**Data content:** trigger user reference, recipient user reference, block relationship existence**Context:** suppression of all cross-user notifications and access re-checking for `Open Notification`

### 10.10 Stored notification record

**Source:** Create and Deliver Notification**Destination:** `DS-NS-001 Notification Records`**Flow name:** Notification Record**Data content:** recipient reference, activity reference, notification type, payload summary, timestamp, later-access state**Context:** all allowed notification cases

### 10.11 Delivered notification output

**Source:** Create and Deliver Notification**Destination:** Notification Delivery Mechanism / Recipient**Flow name:** Notification Output**Data content:** recipient-directed notification payload**Context:** all allowed notification cases

### 10.12 Notification-open request

**Source:** Host or Participant**Destination:** Open Referenced In-App Context from Notification**Flow name:** Notification Open Action**Data content:** selected notification reference**Context:** when recipient taps notification

### 10.13 Referenced context retrieval

**Source:** `DS-NS-001 Notification Records`, `DS-HL-001 Activities`, `DS-HL-002 Activity Participations`, and `DS-SM-001 Block Relationships`**Destination:** Open Referenced In-App Context from Notification**Flow name:** Notification Reference Context**Data content:** stored notification reference, current activity state, current participation state when needed, current block/access state**Context:** in-app reopening

***

### 10.14 Activity reminder trigger

**Source:** `DS-HL-001 Activities` and/or upstream time/scheduling trigger
**Destination:** Detect Notification-Relevant Event
**Flow name:** Activity Reminder Signal
**Data content:** activity reference, scheduled start time, configured reminder threshold reached, current lifecycle state
**Context:** activity reminder notification

### 10.15 Still-joined reminder recipient set

**Source:** `DS-HL-002 Activity Participations`
**Destination:** Resolve Recipient, Notification Context, and Suppression Conditions
**Flow name:** Still-Joined Reminder Recipient Set
**Data content:** activity reference, participant references currently still joined for the upcoming activity
**Context:** activity reminder notification

### 10.16 Reminder activity validity context

**Source:** `DS-HL-001 Activities`
**Destination:** Resolve Recipient, Notification Context, and Suppression Conditions
**Flow name:** Upcoming Activity Reminder Context
**Data content:** activity reference, scheduled start time, reminder-relevant summary data, current non-cancelled lifecycle state
**Context:** activity reminder notification

## 11. First rough DFD sketch (textual, not final diagram)

The sketch below is intentionally rough and written to support later diagramming rather than replace it.

### 11.1 Host notification after join event

Upstream participation action records direct join or join request → `DS-HL-002 Activity Participations` is updated → **Detect Notification-Relevant Event** receives join event signal → **Resolve Recipient, Notification Context, and Block State** reads `DS-HL-001 Activities` to identify the host, reads `DS-AP-001 Student Account` for recipient validity, and reads `DS-SM-001 Block Relationships` to enforce notification suppression → if no block exists, **Create and Deliver Notification** writes `DS-NS-001 Notification Records` → notification is delivered to the host → if the host opens the notification, **Open Referenced In-App Context from Notification** reads the notification reference and opens the relevant activity/request-management context if still accessible.

### 11.2 Host notification after pending request withdrawal

Upstream withdrawal flow deletes or marks the pending request as withdrawn and updates availability → **Detect Notification-Relevant Event** receives pending request withdrawal signal → **Resolve Recipient, Notification Context, and Block State** reads `DS-HL-001 Activities` to identify the host, reads `DS-HL-002 Activity Participations` for the withdrawn participation context, reads `DS-AP-001 Student Account` for recipient validity, and reads `DS-SM-001 Block Relationships` → if no block exists, **Create and Deliver Notification** writes `DS-NS-001 Notification Records` → withdrawal notification is delivered to the host → if the host opens the notification, the system opens the activity view rather than reconstructing a deleted pending-request detail view.

### 11.3 Host notification after joined participant leaves

Upstream leave flow removes or marks the joined participation as left and updates availability → **Detect Notification-Relevant Event** receives joined participation leave signal → **Resolve Recipient, Notification Context, and Block State** reads `DS-HL-001 Activities` to identify the host, reads `DS-HL-002 Activity Participations` for the leave context, reads `DS-AP-001 Student Account` for recipient validity, and reads `DS-SM-001 Block Relationships` → if no block exists, **Create and Deliver Notification** writes `DS-NS-001 Notification Records` → leave notification is delivered to the host → if the host opens the notification, the system opens the activity view.

### 11.4 Participant notification after approval or decline

Upstream host decision updates participation outcome → `DS-HL-002 Activity Participations` is updated → **Detect Notification-Relevant Event** receives participation outcome signal → **Resolve Recipient, Notification Context, and Block State** reads participation state, activity context, recipient account context, and block state → if no block exists, **Create and Deliver Notification** writes `DS-NS-001 Notification Records` → notification is delivered to the applicant → if the applicant opens the notification, the referenced activity context is opened only if current access still allows it.

### 11.5 Participant fan-out after activity cancellation

Upstream lifecycle management sets activity status to cancelled → `DS-HL-001 Activities` is updated → **Detect Notification-Relevant Event** receives cancellation signal → **Resolve Recipient, Notification Context, and Block State** reads `DS-HL-002 Activity Participations` to determine all joined participants, reads `DS-AP-001 Student Account` as needed, and checks `DS-SM-001 Block Relationships` per recipient → **Create and Deliver Notification** writes one or more notification records into `DS-NS-001 Notification Records` for recipients not suppressed by block state → cancellation notifications are delivered to joined participants → if a participant opens the notification, **Open Referenced In-App Context from Notification** opens the referenced activity in cancelled state if it still exists and is accessible.

### 11.6 Participant reminder before activity start

Time/scheduling trigger -> Detect Notification-Relevant Event -> read `DS-HL-001` for scheduled start time and current lifecycle state -> read `DS-HL-002` for students still joined -> read `DS-AP-001` for recipient account validity -> if the participant is still joined and the activity is not cancelled, create reminder notification in `DS-NS-001` -> deliver reminder to participant.

If the participant is no longer joined, no reminder is created. If the activity is cancelled, the reminder is suppressed and the cancellation notification flow remains authoritative.

### 11.7 Opening a notification

Host or participant selects a stored notification → **Open Referenced In-App Context from Notification** reads `DS-NS-001 Notification Records` → the process reads current context from `DS-HL-001 Activities` and `DS-HL-002 Activity Participations` when needed → the process reads `DS-SM-001 Block Relationships` to re-evaluate access → if the target exists and access is still allowed, the user is routed to the relevant in-app context → if the referenced activity or participation context no longer exists, the system routes the user to an unavailable fallback state and does not reconstruct missing business state.

***

## 12. Interface notes with adjacent areas

The subgroup depends most strongly on **Hosting and Lifecycle**, secondarily on **Access and Profile**, and conditionally on **Safety and Moderation**.

The dependency on Hosting and Lifecycle is structural. This subgroup cannot determine host identity, application outcome, cancellation recipient set, withdrawal context, leave context, reminder eligibility, still-joined reminder recipients, or notification-open target state without reading the activity and participation stores already owned there.

The dependency on Access and Profile is also important. The notification subgroup must use stable and valid student account references rather than treating recipients as free-floating identities.

The dependency on Safety and Moderation is required because cross-user notification creation must be suppressed when a block relationship exists, and notification opening must re-check current access rules before navigation.

The subgroup may connect downstream to activity-detail, request-management, or cancelled-activity views when a notification is opened, but that connection should be represented as a navigation consequence, not as ownership transfer.

***

## 13. Open points that should remain explicit before diagramming

Some points remain open and should stay open rather than being silently fixed.

### 13.1 Exact delivery mechanism — open

The narratives support notification delivery, but they do not fix whether the mechanism is push-only, in-app only, or both.

### 13.2 Exact field structure of Notification Records — open

The logical existence of `DS-NS-001 Notification Records` is confirmed, but the full payload schema should not be overstated at this stage.

### 13.3 Notification-list UX parity — partially open

The persistence of notification records is confirmed for modeled notification types because each allowed notification creation flow writes to `DS-NS-001`. However, exact UX parity between host-side and participant-side historical notification access remains open unless a separate requirement fixes it.

### 13.4 Deleted-target behavior after notification opening — closed

If the referenced activity or participation context no longer exists, the system shall not reconstruct missing business state and shall route the user to an unavailable fallback state.

### 13.5 Retry/failure handling — open

The narratives acknowledge delivery failure or delay as a concern, but no firm requirement currently fixes retry logic, failure records, or delivery guarantees.

### 13.6 Receive Activity Reminder — closed as active MVP scope

The scope decision is now closed: **Receive Activity Reminder is included in the MVP** for the Notifications and System Flow subgroup.

The closed rule is narrow and should not be expanded silently:

* reminders are generated only for students still joined in a scheduled upcoming activity;
* reminders are suppressed if the student has already left or is no longer joined;
* reminders are suppressed or superseded by the cancellation flow if the activity has been cancelled;
* NSF reads upstream activity and participation truth but does not create a separate reminder schedule store or duplicate upcoming-activity state.

***

## 14. Consistency and mergeability check

The corrected version is more mergeable because it aligns with the updated scope decision: activity reminder is now an active MVP branch and must be reflected in the CRUD Matrix and Final Merge.

The subgroup boundary is now cleaner because only one store is treated as subgroup-owned: `DS-NS-001 Notification Records / NotificationStore`.

Naming consistency is improved because the note reuses the integrated store IDs and names:

* `DS-AP-001 Student Account / UserAccountStore`
* `DS-HL-001 Activities / ActivityStore`
* `DS-HL-002 Activity Participations / ParticipationStore`
* `DS-SM-001 Block Relationships / BlockListStore`
* `DS-NS-001 Notification Records / NotificationStore`

The duplicate-store risk is low, provided that no notification-specific copies of lifecycle, participation, scheduling, reminder, recipient, or payload-context state are introduced later.

Unsupported assumptions have been reduced. Delivery mechanism, retry logic, and exact notification-list UX remain explicitly open.

Traceability to the current architectural model is stronger because the document now covers the active notification creation rows, including `Notify: Activity Reminder`, and the read-only notification-opening row in the CRUD Matrix.

This version is ready to support:

* a corrected NSF workflow diagram,
* subgroup merge into the wider DFD,
* later data dictionary work,
* and a cleaner CRUD matrix because store ownership, upstream reads, block suppression, and notification creation are now explicit.

***

## 15. Compact concluding view

The **Notifications and System Flow** subgroup should not be treated as an isolated mini-module that owns its own parallel business data. It is a reactive logical area that reads upstream business truth and turns it into visible notification consequences for users.

The current integrated model supports this reading.

* `DS-AP-001 Student Account / UserAccountStore` remains an upstream identity source.
* `DS-HL-001 Activities / ActivityStore` remains the upstream activity and lifecycle source.
* `DS-HL-002 Activity Participations / ParticipationStore` remains the upstream participation-state source.
* `DS-SM-001 Block Relationships / BlockListStore` remains the upstream block-enforcement source.
* `DS-NS-001 Notification Records / NotificationStore` is the one store clearly owned by this subgroup.

The activity reminder branch does not change the stable ownership rule. It only adds one more notification consequence fed by upstream activity schedule and participation truth.

The stable rule for the future all-together DFD merge is:

**Hosting and Lifecycle owns activity and participation truth. Access and Profile owns account truth. Safety and Moderation owns block truth. Notifications and System Flow owns notification consequences.**

That separation should remain stable in all subsequent diagrams.

***

## 16. Explicit modifications to apply to the current DB/store table

This section is operational and lists what should be reflected in the shared DB/store table if subgroup reuse notes are maintained there.

### 16.1 Keep as subgroup-owned store

Keep:

* `DS-NS-001: Notification Records / NotificationStore`

Its description should emphasize that it stores notification consequences and references to upstream business context, but does not duplicate activity, participation, account, or block truth.

### 16.2 Reused stores to tag for NSF if cross-subgroup reuse is tracked

#### `DS-AP-001: Student Account / UserAccountStore`

Recommended note:

> NSF reuses this store as the upstream source for recipient identity and account validity. The subgroup reads it, but it does not create or own it.

#### `DS-HL-001: Activities / ActivityStore`

Recommended note:

> NSF reuses this store as the upstream source of host reference, activity reference, lifecycle status, and current activity target availability for notification-triggering events and notification opening.

#### `DS-HL-002: Activity Participations / ParticipationStore`

Recommended note:

> NSF reuses this store as the upstream source of participation state, applicant outcome, withdrawal/leave context, and joined-recipient sets used by notification flows.

#### `DS-SM-001: Block Relationships / BlockListStore`

Recommended note:

> NSF reuses this store to suppress cross-user notifications when a block relationship exists and to re-check access when a notification is opened.

### 16.3 Do not add

Do **not** add any of the following as separate stores:

* a separate activity lifecycle store for notifications,
* a separate participation state store for notifications,
* a separate notification recipient store,
* a separate notification payload context store,
* a separate reminder schedule store,
* a separate upcoming-events store.

These would fragment data already covered by the integrated store set. The activity reminder branch must reuse `DS-HL-001` for schedule/lifecycle truth and `DS-HL-002` for still-joined participation truth.

***

## 17. Diagram alignment note

The NSF diagram package V3 includes an **activity reminder notification branch**. Under the current priority note, that branch is now valid active MVP scope and should be preserved in the corrected NSF diagram.

The corrected NSF diagram should preserve these active branches:

* notify host of join / join request,
* notify host of pending request withdrawal,
* notify host of joined participant leave,
* notify participant of application approval / decline,
* notify participant of activity cancellation,
* notify participant of activity reminder,
* open notification context.

The corrected NSF diagram should also add or preserve `DS-SM-001 Block Relationships` reads for all cross-user notification creation flows. The activity reminder branch does not require a block read by default because it is a system-to-recipient reminder about the recipient's own joined upcoming activity; its suppression rule is based on still-joined participation and non-cancelled activity state.

For the reminder branch, the diagram must show:

* time / scheduling trigger or reminder threshold reached;
* read from `DS-HL-001 Activities` for scheduled start time and current lifecycle state;
* read from `DS-HL-002 Activity Participations` for the still-joined participant set;
* read from `DS-AP-001 Student Account` for recipient account validity;
* create in `DS-NS-001 Notification Records` only if the participant is still joined and the activity is not cancelled;
* reminder notification delivered to the participant;
* open notification context routing to the upcoming activity view when the reminder is tapped.
