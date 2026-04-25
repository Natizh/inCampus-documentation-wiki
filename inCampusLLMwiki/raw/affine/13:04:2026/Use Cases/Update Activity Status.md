# Update Activity Status

### Use Case ID

**Update Activity Status**

### Use Case Name

**Update Activity Status**

### Related Requirements

**FR:** FR-0503, FR-2801, FR-2802, FR-2803, FR-2804 **NFR:** NFR-12, NFR-44

### Initiating Actor

Student Host

### Actor's Goal

Manually update the overall status of an activity they created (e.g., marking it as completed or changing it to cancelled), so that the campus feed remains accurate and participants are informed of relevant changes.

### Participating Actors

* Notification service (triggers notifications to participants when the activity is cancelled)
* System (validates authorization, applies status change, updates feed visibility)

### Preconditions

* The student host has a verified, active account and is signed in.
* The activity exists and was created by this student host.
* The activity's current status allows a transition to the requested new status.

### Postconditions

* The activity's status is updated to the new value selected by the host.
* The campus activity feed and activity views reflect the updated status consistently.
* If the new status is **cancelled**, all currently joined participants have been notified of the cancellation (FR-2802).
* If the new status is **completed**, the activity is recorded as concluded.

### Main Success Scenario

1. The student host navigates to one of their own activities.
2. The system displays the activity details, including its current status and the available status transitions.
3. The student host selects a new status for the activity (e.g., cancelled or completed) (FR-0503).
4. The system asks the host to confirm the status change.
5. The student host confirms.
6. The system verifies that the host is the creator of the activity (NFR-12).
7. The system verifies that the requested status transition is valid given the activity's current state.
8. The system updates the activity status.
9. The system updates the campus activity feed and all relevant activity views to reflect the new status.
10. The system confirms the status change to the host.

**If the new status is cancelled:**

1. The system detects the cancellation (FR-2801) and triggers a notification to each student currently joined in the activity (FR-2802).
2. Each cancellation notification includes at least the activity name, the scheduled time, and the information that the activity has been cancelled (FR-2803).

### Alternate Scenarios

**A1. Host is not the creator of the activity** At step 6, the system detects that the authenticated student is not the host who created the activity. The system denies the status change and informs the student that only the activity creator or a campus admin can modify the activity status (NFR-12). No change is applied.

**A2. Invalid status transition** At step 7, the system determines that the requested transition is not allowed from the activity's current state (e.g., attempting to mark a cancelled activity as completed). The system informs the host that the requested status change is not valid and explains which transitions are available. No change is applied.

**A3. Host cancels the confirmation** At step 5, the host decides not to confirm the status change. The activity status remains unchanged. No notification is sent.

**A4. Activity has no joined participants at the time of cancellation** At step 11, the system detects that no students are currently joined in the activity. The status is updated to cancelled, but no participant notification is triggered (there are no recipients).

**A5. Campus admin updates status on behalf of moderation** At step 6, a campus admin — rather than the original host — initiates a status change as part of a moderation action (NFR-12). The system allows the change because campus admins have permission to modify activity status. The rest of the flow proceeds normally from step 7.

### Potential Connections with Other Use Cases

* **Connected UC:** Create Activity **Relationship type:** Precondition dependency **Reason:** The activity must have been created before its status can be updated. The host role established at creation is what authorizes this action. **Confidence:** High
* **Connected UC:** Notify Participant of Activity Cancellation **Relationship type:** Possible `<<extend>>` or postcondition consequence **Reason:** Steps 11–12 correspond directly to the "Notify Participant of Activity Cancellation" use case (US-28, FR-2801–FR-2804). When the host sets the status to cancelled, the notification to participants is a mandatory consequence. Whether this is modeled as an `<<include>>` (always triggered when cancellation occurs) or kept as internal steps depends on whether the notification flow is reused elsewhere. The team should decide in Phase 4. **Confidence:** High (connection exists), medium (exact relationship type)
* **Connected UC:** Delete Activity **Relationship type:** Alternative path / mutual exclusion **Reason:** Both use cases allow the host to remove or close an activity before it starts, but they are distinct actions: deletion removes the activity entirely (FR-2601, FR-2602), while cancellation changes the status and keeps the activity record visible in a cancelled state. The team should clarify when the host would cancel vs. delete. **Confidence:** High
* **Connected UC:** Manage Join Requests **Relationship type:** State dependency **Reason:** If the activity status changes to cancelled, any pending join requests become moot. The system should handle the state of pending requests consistently when the activity is cancelled. This interaction is not explicitly specified in the current FRs but is a logical consequence. **Confidence:** Medium
* **Connected UC:** Browse and Filter Activities **Relationship type:** Postcondition consequence **Reason:** A status change (especially to cancelled or completed) affects the activity's visibility and presentation on the campus feed. **Confidence:** High
* **Connected UC:** View Personal Activity List **Relationship type:** Postcondition consequence **Reason:** When an activity is cancelled or completed, it affects how the activity appears in participants' personal lists (upcoming vs. past, or removed). **Confidence:** High
* **Connected UC:** Leave Joined Activity / Withdraw Join Request **Relationship type:** State dependency (mutual) **Reason:** If the activity is cancelled, students who had joined or had pending requests no longer need to withdraw or leave. Conversely, if participants leave before the host acts, the set of affected participants at cancellation time changes. **Confidence:** Medium
* **Connected UC:** Review Report **Relationship type:** Candidate connection **Reason:** A campus admin may change the activity status as a result of a moderation review (see A5). This connects the moderation flow to status management. The exact mechanism is not detailed in the current FRs. **Confidence:** Low–Medium

### Note

* The exact list of valid activity states and allowed transitions is not fully finalized in the current project material. The AGENT context mentions possible states such as open, full/pending, confirmed, completed, and cancelled, but the definitive state model has not been agreed. This narrative treats the status set conservatively and does not prescribe the full state machine. The team should finalize the state list and transition rules before this narrative is considered stable.
* FR-0503 is traced to both US-05 and US-28 in the project table. US-28 specifically covers the participant-facing cancellation notification. This narrative includes the cancellation notification steps (11–12) because they are a direct consequence of the status change, but recognizes that the team may choose to model them as a separate use case.
* Alternate scenario A5 (campus admin modifying status) is supported by NFR-12 but no specific FR describes the admin-side flow for this action. It is included conservatively.
* The interaction between cancellation and pending join requests (noted under Manage Join Requests connection) is not explicitly addressed in the current FRs. This is flagged as an open question for the team.
