# View Activity Details

### Use Case ID

**View Activity Details**

### Use Case Name

**View Activity Details**

### Related Requirements

**FR:** FR-0302, FR-0402 **NFR:** NFR-35

### Initiating Actor

Student (in guest/participant role)

### Actor's Goal

View the essential details of a specific activity before deciding whether to join, so that the student can assess whether it fits their time, interest, and availability.

### Participating Actors

* System (retrieves and presents activity information)

### Preconditions

* The student has a verified, active account and is signed in.
* The student has a campus associated with their account.
* The activity exists, belongs to the student's campus, and is currently visible (not deleted, not hidden due to participant limit reached per FR-0403).

### Postconditions

* The student has viewed the essential details of the activity.
* No system state is changed (this is a read-only use case).

### Main Success Scenario

1. The student selects a specific activity from the campus activity feed or from another entry point within the app (e.g., a shared activity link, the personal activity list, a notification).
2. The system retrieves the activity information.
3. The system displays the essential details of the activity, including at least: title, activity category, host identity (minimal profile reference), scheduled date and time, location, current number of participants, participation mode (open or approval-based), and any additional activity details provided by the host (FR-0402, FR-0302).
4. The system presents the information in a clear and scannable layout so that the student can quickly assess relevance (NFR-35).
5. The student reads the details and decides how to proceed (join, request to join, go back, or take another action).

### Alternate Scenarios

**A1. Activity no longer available** At step 2, the system determines that the activity has been deleted, cancelled, or is otherwise no longer accessible. The system informs the student that the activity is no longer available. No details are displayed.

**A2. Activity reached participant limit** At step 2, the activity exists but has reached the participant limit set by the host (FR-0403). The system may still display the activity details if the student accessed it through a direct link or notification, but indicates that the activity is full and that joining is not possible. *(Note: FR-0403 states the post should not appear in the feed when full, but direct access from a link or notification is not explicitly addressed — treated conservatively.)*

**A3. Student is blocked by the host or has blocked the host** At step 2, the system detects a block relationship between the student and the activity host. The system prevents the student from viewing the activity details and informs the student that the activity is not accessible. *(Note: the exact behavior when a blocked user tries to view activity details is not specified in the current FRs — treated conservatively.)*

**A4. Activity accessed through a shared link** At step 1, the student opens the activity detail view by tapping a shared activity link received through a message (FR-0803). The system resolves the link and displays the activity details. The flow continues from step 2.

### Potential Connections with Other Use Cases

* **Connected UC:** Browse and Filter Activities **Relationship type:** Precondition dependency / navigation flow **Reason:** The most common entry point for viewing activity details is the campus activity feed. The student first discovers the activity through Browse and Filter Activities, then selects it to view details. **Confidence:** High
* **Connected UC:** Join Activity **Relationship type:** Postcondition trigger (downstream) **Reason:** After viewing the details, the student may decide to join or request to join the activity. View Activity Details is the natural precursor to the Join Activity use case. Steps 1–2 of Join Activity overlap with or directly follow this use case. **Confidence:** High
* **Connected UC:** View Student Minimal Profile **Relationship type:** Possible `<<extend>>`**Reason:** While viewing the activity details, the student may want to view the host's minimal profile (FR-1403) to help decide whether to join. This is an optional extension — the student can view details without viewing the host profile. **Confidence:** Medium
* **Connected UC:** Send Message **Relationship type:** Candidate connection (entry point) **Reason:** The activity detail view may be the context where a student decides to share the activity link with another student through a message (FR-0802). The detail view provides the activity reference that is then shared. **Confidence:** Medium
* **Connected UC:** Report User or Activity **Relationship type:** Possible `<<extend>>`**Reason:** The activity detail view is a natural context from which a student could report an inappropriate activity (FR-1701). This is an optional, conditional action extending the base viewing flow. **Confidence:** Medium
* **Connected UC:** Create Activity **Relationship type:** State dependency (upstream) **Reason:** The details displayed are those defined by the host during activity creation. The quality and completeness of what the student sees depends on what was specified during Create Activity. **Confidence:** High
* **Connected UC:** Update Activity Status **Relationship type:** State dependency **Reason:** The activity status (e.g., open, cancelled, completed) displayed to the student reflects any status changes made by the host. If the status has changed since the student last viewed the feed, the detail view should show the current status. **Confidence:** High
* **Connected UC:** View Personal Activity List **Relationship type:** Navigation flow **Reason:** A student may also access activity details from their personal activity list (upcoming or past events) rather than from the feed, as an alternative entry point at step 1. **Confidence:** High
* **Connected UC:** Notify Participant of Activity Cancellation **Relationship type:** Navigation flow (entry point) **Reason:** FR-2804 specifies that when a participant taps a cancellation notification, the system opens the relevant activity and displays its cancelled status. This is another entry point into the View Activity Details flow. **Confidence:** High

### Note

* FR-0403 states that an activity should not be displayed in the feed when the participant limit is reached. However, the behavior when a student accesses a full activity through a direct link, notification, or shared message link is not explicitly specified. Scenario A2 handles this conservatively by allowing details to be shown with a "full" indication, but the team should clarify the intended behavior.
* The exact layout and information hierarchy of the activity detail view is a UI-level decision and is not prescribed by this narrative. NFR-35 requires the presentation to be clear and scannable, but the specific design is left to the team.
* Whether the activity detail view includes the list of current participants or only the count is not fully specified. FR-0402 mentions "current number of participants," which implies a count rather than a full list. This is treated as the baseline; showing participant profiles may be an additional feature not currently in scope.
* The block-related behavior in scenario A3 is inferred from the general safety direction (FR-1802) but is not explicitly confirmed for the activity detail context. This is flagged as an open question.
