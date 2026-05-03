# Notify Host of Join Event

### Use Case ID

**Notify Host of Join Event**

### Use Case Name

**Notify Host of Join Event**

### Related Requirements

**FR:** FR-0601, FR-0602, FR-0603 **NFR:** NFR-14, NFR-15

### Initiating Actor

System (automated trigger)

### Actor's Goal

Notify the activity host promptly when a student requests to join or directly joins their activity, so that the host can stay updated on participation and manage requests quickly.

### Participating Actors

* Student Host (receives and acts on the notification)
* Notification service (delivers the notification)

### Preconditions

* An activity exists and has an identified host.
* A join event has just occurred: either a student has directly joined an open activity, or a student has submitted a join request for an approval-based activity.
* The host has a verified, active account.

### Postconditions

* A notification has been delivered to the host (NFR-14).
* The notification clearly indicates the relevant activity and the type of event (new join request or new participant) (FR-0602).
* The host is able to access the relevant activity from the notification (FR-0603).

### Main Success Scenario

1. The system detects that a join event has occurred on an activity (a student has joined directly or has submitted a join request) (FR-0601).
2. The system determines the host of the affected activity.
3. The system composes a notification that includes at least: the relevant activity identity and the type of event (new join request vs. new participant) (FR-0602).
4. The system delivers the notification to the host within a short time after the join event (NFR-14).
5. The notification is presented to the host in a clear and immediately understandable way (NFR-15).
6. The host taps the notification.
7. The system opens the relevant activity inside the app and displays the appropriate view: the pending join requests list (if it was a join request) or the updated participant details (if it was a direct join) (FR-0603).

### Alternate Scenarios

**A1. Host does not tap the notification immediately** At step 6, the host does not interact with the notification at the time of delivery. The notification remains available for later access. The host can act on it at a later time. The join event and its effects on the activity (new participant or pending request) are already recorded regardless of whether the host opens the notification.

**A2. Activity is cancelled or deleted before the host opens the notification** At step 6 or 7, the host taps the notification, but the activity has been deleted or cancelled in the meantime. The system opens the activity view and displays its current status (cancelled or not found). The host is informed that the activity is no longer active. *(Note: the exact behavior for a notification referencing a deleted activity is not specified in the current FRs — treated conservatively.)*

**A3. Notification delivery fails or is delayed** At step 4, the notification service encounters a delivery issue. The system should retry delivery according to its notification reliability mechanisms. The join event itself is not affected — the participant or request is already recorded. *(Note: no specific FR addresses notification retry or failure handling — this is flagged as an open question.)*

**A4. Host has blocked the joining student** At step 1, the system detects the join event, but a block relationship exists between the host and the joining student. Under normal conditions, the Join Activity use case should have prevented the join in the first place (FR-1802). If a notification is triggered despite this, the system should handle it gracefully. *(Note: this edge case is inferred from the safety design but is not explicitly specified.)*

### Potential Connections with Other Use Cases

* **Connected UC:** Join Activity **Relationship type:** Possible `<<extend>>` from Join Activity, or postcondition consequence **Reason:** This use case is triggered as a direct consequence of a successful join or join request in the Join Activity use case. Every successful join event (steps 5–7 of Join Activity Path A, or steps 5–7 of Path B) produces the triggering condition for this use case. The team should decide whether to model this as an `<<extend>>` of Join Activity (the notification extends the join flow) or as an `<<include>>` (it is a mandatory consequence of every join). Given that the notification is always triggered and not optional, `<<include>>` from Join Activity may be more appropriate — but this is a candidate decision for Phase 4. **Confidence:** High (connection exists), medium (exact relationship type)
* **Connected UC:** Manage Join Requests **Relationship type:** Navigation flow (downstream) **Reason:** When the host taps the notification for a join request (step 7), the system opens the view where the host can approve or decline requests. This directly leads into the Manage Join Requests use case. **Confidence:** High
* **Connected UC:** Notify Participant of Application Outcome **Relationship type:** Sequence dependency **Reason:** The notification chain follows a sequence: Join Activity → Notify Host of Join Event → host reviews and decides (Manage Join Requests) → Notify Participant of Application Outcome. This use case is one link in that chain for approval-based activities. **Confidence:** High
* **Connected UC:** View Activity Details **Relationship type:** Navigation flow **Reason:** When the host taps the notification for a direct join (step 7), the system opens the activity with updated participant details. This overlaps with the View Activity Details flow from the host's perspective. **Confidence:** High
* **Connected UC:** Create Activity **Relationship type:** Precondition dependency (upstream) **Reason:** The activity and its participation mode (which determines whether the notification is about a direct join or a join request) were established during Create Activity. **Confidence:** High
* **Connected UC:** Notify Participant of Activity Cancellation **Relationship type:** Pattern similarity (parallel notification use case) **Reason:** Both use cases follow the same general notification pattern (system detects event → composes notification → delivers to recipient → recipient taps to open relevant view). If the team decides to extract a shared notification subflow, both could `<<include>>` it. This is a candidate observation for Phase 4. **Confidence:** Medium

### Note

* The initiating actor is listed as **System** because the notification is triggered automatically by a system-detected event, not by an explicit user action. The host is the receiving actor. This is consistent with the fact that US-06 describes the host as wanting to *receive* a notification, not to initiate one.
* The current FRs do not specify whether the notification is a push notification, an in-app notification, or both. NFR-14 requires delivery "within a short time," which suggests push notification behavior, but the exact mechanism is not fixed. This is left abstract.
* FR-0704 (from US-07, related to participant notifications) mentions a "personal message center or notification list" for historical notifications. Whether a similar mechanism exists for host notifications is not explicitly stated in the FRs for US-06. The team may want to align both notification use cases on this point.
* The relationship between this use case and Join Activity is one of the most important modeling decisions for Phase 4. Since the notification is mandatory (not optional or conditional), it leans toward `<<include>>` rather than `<<extend>>`, but this depends on the team's modeling conventions.
