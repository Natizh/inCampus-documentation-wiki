# Set Activity Date and Time

### Use Case ID

**Set Activity Date and Time**

### Use Case Name

**Set Activity Date and Time**

### Related Requirements

**FR:** FR-2501, FR-2502, FR-0402, FR-0404 **NFR:** NFR-10, NFR-41

### Initiating Actor

Student Host

### Actor's Goal

Specify the scheduled date and start time of an activity during activity creation, so that other students can understand when the activity will happen and decide whether they can join.

### Participating Actors

* System (presents date/time input, validates the values)

### Preconditions

* The student host is currently inside the activity creation flow.
* The activity creation flow has not yet been submitted.

### Postconditions

* The activity has a valid scheduled date and start time associated with it.
* The date and time values are stored as part of the activity and will be displayed to other students in activity details (FR-0402) and available as a filter criterion (FR-0404).

### Main Success Scenario

1. The system presents a date and time input as part of the activity creation flow (NFR-41).
2. The student host selects or enters the scheduled date for the activity.
3. The student host selects or enters the start time for the activity.
4. The system validates that both date and time are present and that the values are valid (FR-2502).
5. The system validates that the scheduled date and time are in the future.
6. The system accepts the values and the activity creation flow continues to the next step.

### Alternate Scenarios

**A1. Date or time is missing** At step 4, the system detects that the date, the time, or both have not been provided. The system informs the student host that both date and time are required (FR-2502). The submission of the activity is prevented until the values are provided.

**A2. Date or time is invalid** At step 4, the system detects that the entered values are not valid (e.g., malformed date, impossible time value). The system informs the student host that the date and time must be in a valid format. The student host can correct the values.

**A3. Scheduled date and time are in the past** At step 5, the system detects that the specified date and time have already passed. The system informs the student host that the activity must be scheduled in the future. The student host can select a new date and time.

**A4. Student host changes the date or time before submission** At any point before the activity is submitted, the student host modifies the previously entered date or time. The system re-validates the new values. If valid and in the future, the updated values replace the previous ones in the creation flow.

### Potential Connections with Other Use Cases

* **Connected UC:** Create Activity **Relationship type:** Possible `<<include>>` or embedded subflow **Reason:** Set Activity Date and Time is a mandatory step within the Create Activity flow. Every activity requires a date and time (FR-2502 prevents submission without them). This use case can be modeled as an `<<include>>` reused by Create Activity, or as internal steps of Create Activity. The team extracted it as a separate use case (from US-25), which suggests it warrants its own identity, but the relationship with Create Activity should be formalized in Phase 4. **Confidence:** High
* **Connected UC:** View Activity Details **Relationship type:** Postcondition consequence **Reason:** The date and time specified here are part of the essential details displayed to other students when they view the activity (FR-0402). The accuracy and clarity of what is shown depends on what was set during this step. **Confidence:** High
* **Connected UC:** Browse and Filter Activities **Relationship type:** Postcondition consequence **Reason:** The scheduled date and time enable time-based filtering of activities (FR-0404). Students can filter activities by start time or end time, which relies on the values set here. **Confidence:** High
* **Connected UC:** Receive Activity Reminder **Relationship type:** State dependency (downstream) **Reason:** The reminder notification is triggered 5 minutes before the activity's start time (FR-1101, US-11). The start time set in this use case is the reference point for that trigger. *(Note: Receive Activity Reminder is postMVP.)***Confidence:** High
* **Connected UC:** Delete Activity **Relationship type:** State dependency (constraint reference) **Reason:** FR-2601 states the host can delete an activity "before the activity has started." The start time set here defines the boundary after which deletion is no longer permitted. **Confidence:** High
* **Connected UC:** Update Activity Status **Relationship type:** State dependency **Reason:** The scheduled date and time may influence which status transitions are valid. For example, marking an activity as completed may only be appropriate after the scheduled time has passed. The time set here provides the reference point. **Confidence:** Medium
* **Connected UC:** Notify Participant of Activity Cancellation **Relationship type:** Information dependency **Reason:** The cancellation notification must include "the scheduled time" of the activity (FR-2803). This information originates from the date and time set during this use case. **Confidence:** High
* **Connected UC:** Notify Participant of Application Outcome **Relationship type:** Information dependency **Reason:** The notification about application approval or decline must include "event time" (FR-0703). This information originates from the date and time set here. **Confidence:** High
* **Connected UC:** Track Participation Points **Relationship type:** State dependency (downstream) **Reason:** The activity's scheduled time is the reference for determining when the activity has concluded and when attendance outcomes can be evaluated. *(Note: Track Participation Points is postMVP.)***Confidence:** Medium

### Note

* The project table lists this as a separate use case derived from US-25, with its own priority score (14). However, this use case is functionally a **mandatory sub-step of Create Activity** — it cannot occur outside of the activity creation flow, and it must always be completed for any activity to be valid. The team should decide in Phase 4 whether to model this as a formal `<<include>>` within Create Activity or to merge it back as internal steps of Create Activity. The arguments for keeping it separate are: it has its own US (US-25), its own FRs (FR-2501, FR-2502), and its own NFR (NFR-41). The argument for merging is that it has no independent existence outside Create Activity.
* Whether the host can specify an **end time** in addition to the start time is not addressed by the current FRs. FR-2501 mentions "scheduled date and start time." FR-0404 mentions filtering by "start time, end time," which implies an end time exists, but no FR describes how it is set. This is an open question: the end time might be derived (e.g., default duration), explicitly set by the host, or left undefined. This narrative covers only the start date and time as specified by FR-2501.
* NFR-41 requires the input to be "clear and easy to complete, so that student hosts can schedule an activity quickly without ambiguity." This implies a well-designed date/time picker rather than free-text entry, but the specific UI mechanism is a design decision left to the team.
* NFR-10 is listed as related because it applies to the overall activity creation flow, requiring "only a small number of clear steps." The date and time step should be integrated smoothly within that constraint.
* Whether the host can **edit the date and time after the activity has been published** (but before it starts) is not addressed by the current FRs. FR-2501 and FR-2502 apply only to the creation context. Editing a published activity's time would require a separate requirement. This is flagged as an open question.
