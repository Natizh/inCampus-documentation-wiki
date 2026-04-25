# Track Participation Points

### Use Case ID

**Track Participation Points**

### Use Case Name

**Track Participation Points**

### Related Requirements

**FR:** FR-1201 **NFR:** NFR-25

### Initiating Actor

System (automated trigger)

### Actor's Goal

Award or deduct participation points to a student based on verified attendance or non-attendance of a joined activity, so that the system encourages reliable participation and discourages no-shows or last-minute cancellations.

### Participating Actors

* Student (receives points and can view point balance; does not initiate the action)
* System (detects attendance outcome, calculates and records point changes)

### Preconditions

* The student has a verified, active account.
* The student had joined an activity as a confirmed participant.
* The activity has concluded (its scheduled time has passed or it has been marked as completed).
* An attendance outcome has been determined for the student (attended, did not attend, or cancelled last minute).

### Postconditions

* The student's point balance has been updated according to the attendance outcome (FR-1201).
* If the student attended: points have been awarded.
* If the student did not attend or cancelled last minute: points have been deducted.
* The point change is recorded and traceable to the corresponding participation outcome (NFR-25).

### Main Success Scenario

**Path A — Student attended the activity:**

1. The system detects that the activity has concluded.
2. The system determines the attendance outcome for the student: attendance is verified.
3. The system calculates the points to award based on verified attendance.
4. The system adds the points to the student's point balance.
5. The system records the point change with a reference to the activity and the participation outcome (NFR-25).
6. The updated point balance is available to the student.

**Path B — Student did not attend or cancelled last minute:**

1. The system detects that the activity has concluded.
2. The system determines the attendance outcome for the student: the student did not attend or cancelled last minute.
3. The system calculates the points to deduct.
4. The system deducts the points from the student's point balance.
5. The system records the point change with a reference to the activity and the participation outcome (NFR-25).
6. The updated point balance is available to the student.

### Alternate Scenarios

**A1. Attendance outcome cannot be determined** At step 2, the system is unable to determine whether the student attended or not (e.g., the verification mechanism did not capture a result). The system does not award or deduct points. The outcome is recorded as unresolved. *(Note: the mechanism for verifying attendance is not specified in the current FRs — see Note section.)*

**A2. Activity was cancelled before it took place** At step 1, the system detects that the activity was cancelled by the host before the scheduled time. No attendance outcome is applicable. No points are awarded or deducted. The student's balance remains unchanged.

**A3. Student left the activity before it started** At step 2, the system determines that the student withdrew from the activity (through Leave Joined Activity) before the activity's scheduled start time. The student is no longer a confirmed participant. No points are awarded or deducted, as the student left within the allowed timeframe. *(Note: the boundary between a timely withdrawal and a "last-minute cancellation" that triggers point deduction is not defined — treated conservatively.)*

**A4. Student's point balance would go below zero** At step 4 (Path B), the deduction would bring the student's balance below zero. The system applies the deduction. *(Note: whether the balance can go negative or is floored at zero is not specified — treated conservatively as allowing the deduction.)*

### Potential Connections with Other Use Cases

* **Connected UC:** Join Activity **Relationship type:** Precondition dependency (upstream) **Reason:** Points are only tracked for students who joined an activity as confirmed participants. The participation record created by Join Activity is the basis for later determining attendance and awarding or deducting points. **Confidence:** High
* **Connected UC:** Update Activity Status **Relationship type:** Triggering dependency **Reason:** When the host marks the activity as completed (or when the system detects that the activity time has passed), this may be the event that triggers the attendance verification and point calculation process. **Confidence:** High
* **Connected UC:** Leave Joined Activity **Relationship type:** State dependency **Reason:** If the student left the activity before it started, the attendance outcome changes. A timely withdrawal should not result in point deduction, while a last-minute cancellation should (FR-1201). The boundary between the two is not yet defined. **Confidence:** High
* **Connected UC:** Withdraw Join Request **Relationship type:** State dependency (exclusion) **Reason:** If the student withdrew a pending request (before being approved), they were never a confirmed participant. Point tracking does not apply. **Confidence:** High
* **Connected UC:** Notify Participant of Activity Cancellation **Relationship type:** State dependency **Reason:** If the activity was cancelled by the host, participants should not be penalized for non-attendance. The cancellation state, communicated through this use case, should exempt participants from point deduction. **Confidence:** High
* **Connected UC:** View Personal Activity List **Relationship type:** Information dependency **Reason:** The student's past activity list (FR-0902) could serve as a context where point changes are visible alongside the activity history, reinforcing traceability (NFR-25). **Confidence:** Medium
* **Connected UC:** Upload Activity Photo **Relationship type:** Candidate connection (attendance evidence) **Reason:** Photo uploads after an activity (US-13, FR-1301) occur only for concluded activities. In the absence of a specified attendance verification mechanism, photo participation could potentially serve as a form of attendance evidence. This is speculative and not confirmed by the current FRs. **Confidence:** Low

### Note

* **US-12 is classified as postMVP.** This use case narrative is provided for completeness and future planning, but it is not part of the current MVP scope. Implementation should be deferred accordingly.
* The most significant unresolved question for this use case is the **attendance verification mechanism**. FR-1201 refers to "verified attendance," but no FR or NFR specifies how attendance is verified. Possible mechanisms include: host confirmation, mutual confirmation between host and participant, location-based check-in, QR code scan, or time-based proximity detection. The team must decide this before implementation. This narrative keeps the mechanism abstract ("the system determines the attendance outcome").
* The **exact point values** for awards and deductions are not specified. FR-1201 describes the principle (award for attendance, deduct for no-show or last-minute cancellation) but does not prescribe amounts. The team should define a point scheme.
* The **boundary between a timely withdrawal and a "last-minute cancellation"** is not defined. FR-1201 mentions "cancels last minute" as a trigger for deduction, but does not specify the cutoff (e.g., less than 1 hour before start, less than 30 minutes). This is an open design decision.
* Whether the student can **view their point balance and point history** is implied by the concept but not explicitly covered by a dedicated FR. The team may want to add a requirement for a point balance view if this use case is brought into scope.
* NFR-25 requires that point changes be "traceable to the corresponding participation outcome." This implies a record/log structure linking each point change to a specific activity and outcome, which is relevant for system design but left abstract in this narrative.
