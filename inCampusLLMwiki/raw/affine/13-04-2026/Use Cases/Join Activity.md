# Join Activity

Use Case ID

**Join Activity**

### Related Requirements

**FR:** FR-0305, FR-2001, FR-2002, FR-0502 **NFR:** NFR-13, NFR-34

### Initiating Actor

Student (in guest/participant role)

### Actor's Goal

Join a campus activity — either directly or by submitting a join request when approval is required — so that the student can participate in a shared campus moment with low friction.

### Participating Actors

* Student Host (indirectly: defined the participation mode; directly involved only if approval is required)
* Notification service (triggers notification to host upon join event)

### Preconditions

* The student has a verified, active account and is signed in.
* The student has a campus associated with their account.
* The activity exists, is visible on the campus feed, and has not reached its participation or request limit.
* The activity has not been cancelled, deleted, or already started/completed.
* The student is not the host of the activity.
* The student has not already joined or submitted a pending request for this activity.

### Postconditions

**If the activity allows direct joining:**

* The student is registered as a confirmed participant of the activity.
* The activity's participant count is incremented.
* If the participant limit is now reached, the activity is no longer open to new joins.
* A notification is sent to the host indicating a new participant.

**If the activity requires approval:**

* A pending join request is recorded for the student on that activity.
* The request count is incremented.
* If the maximum number of pending requests is reached, new requests are blocked.
* A notification is sent to the host indicating a new join request.

### Main Success Scenario

**Path A — Direct join (open participation):**

1. The student selects an activity from the campus feed or activity detail view.
2. The system displays the activity details and indicates that direct joining is allowed.
3. The student confirms the intention to join.
4. The system verifies that the activity has not reached the participant limit (concurrency-safe check per NFR-13).
5. The system registers the student as a confirmed participant and updates the participant count.
6. The system confirms the successful join to the student.
7. The system triggers a notification to the host indicating that a new participant has joined (→ Notify Host of Join Event).

**Path B — Request to join (approval-based participation):**

1. The student selects an activity from the campus feed or activity detail view.
2. The system displays the activity details and indicates that joining requires host approval.
3. The student confirms the intention to request to join.
4. The system verifies that neither the request limit nor the participant limit has been reached (concurrency-safe check per NFR-13).
5. The system records a pending join request for the student on the activity and updates the request count.
6. The system confirms to the student that the request has been submitted and is pending host review.
7. The system triggers a notification to the host indicating a new join request (→ Notify Host of Join Event).

### Alternate Scenarios

**A1. Participant limit already reached** At step 4 (Path A) or step 4 (Path B), the system detects that the activity has already reached the maximum number of participants (or, for Path B, the maximum number of pending requests). The system informs the student that the activity is full or that no more requests can be submitted. The join or request action is not executed.

**A2. Activity no longer available** At step 1 or step 4, the activity has been cancelled, deleted, or its scheduled time has passed since the student last viewed it. The system informs the student that the activity is no longer available. No join or request is recorded.

**A3. Student has already joined or already has a pending request** At step 3 or step 4, the system detects that the student already has an active participation record or a pending request for this activity. The system informs the student that they have already joined or already submitted a request. No duplicate record is created.

**A4. Student is blocked by the host (or vice versa)** At step 4, the system detects that a block relationship exists between the student and the host. The system prevents the join or request and informs the student that the action cannot be completed. *(Note: the exact user-facing message for this case is not yet specified — treated conservatively.)*

**A5. Concurrent join conflict** At step 4, two or more students attempt to take the last available slot simultaneously. The system ensures that only one student is registered (per NFR-13). The other student(s) receive the "activity full" response as in A1.

### Potential Connections with Other Use Cases

* **Connected UC:** Browse and Filter Activities **Relationship type:** Precondition dependency **Reason:** The student typically discovers the activity through the browse/filter flow before initiating the join action. **Confidence:** High
* **Connected UC:** View Activity Details **Relationship type:** Precondition dependency / shared subflow **Reason:** The student views activity details as part of deciding whether to join. Steps 1–2 of the join flow overlap with or follow from this use case. **Confidence:** High
* **Connected UC:** Notify Host of Join Event **Relationship type:** Possible `<<extend>>` or postcondition consequence **Reason:** After a successful join or request submission, the system triggers a notification to the host. This is a mandatory consequence of the join action (US-06, FR-0601/FR-0602). Whether this is modeled as an `<<include>>` (mandatory reusable sub-interaction) or as a postcondition consequence depends on whether the notification flow is shared with other use cases in a reusable way. **Confidence:** High (connection exists), medium (exact relationship type)
* **Connected UC:** Manage Join Requests **Relationship type:** State dependency **Reason:** In Path B (approval-based), the join request remains pending until the host acts on it through the Manage Join Requests use case. The outcome of that use case (approve/decline) changes the student's participation state. **Confidence:** High
* **Connected UC:** Notify Participant of Application Outcome **Relationship type:** Postcondition dependency (downstream) **Reason:** After the host approves or declines a request (via Manage Join Requests), the system notifies the student. This chain begins with the join request created in this use case. **Confidence:** High
* **Connected UC:** View Personal Activity List **Relationship type:** Postcondition dependency **Reason:** After a successful direct join, the activity appears in the student's personal list of upcoming activities. **Confidence:** High
* **Connected UC:** Withdraw Join Request / Leave Joined Activity **Relationship type:** State dependency (downstream) **Reason:** Once a student has joined or submitted a request, they may later withdraw or leave. These use cases depend on the state created by Join Activity. **Confidence:** High
* **Connected UC:** View Student Minimal Profile **Relationship type:** Candidate connection (possible `<<extend>>`) **Reason:** Before joining, the student may want to view the host's minimal profile. This is an optional extension of the join decision flow. **Confidence:** Medium
* **Connected UC:** Block User **Relationship type:** Constraint dependency **Reason:** A block relationship between the student and the host prevents the join action (see A4). The Block User use case creates a state that this use case must check. **Confidence:** Medium

### Note

* The use case table in the project index does not yet assign formal UC-IDs. The ID "UC-JOIN" is provisional and should be replaced once the team stabilizes the ID scheme.
* Alternate scenario A4 (block check during join) is inferred from FR-1802 and the general safety direction. The exact behavior and user-facing message have not been specified in the current requirements — this is treated conservatively.
* Whether the host notification (step 7) should be modeled as a separate `<<include>>` or `<<extend>>` use case, or simply documented as a postcondition consequence, is a candidate decision for Phase 4 (relationship analysis). It is flagged here but not finalized.
