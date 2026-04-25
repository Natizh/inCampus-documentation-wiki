# Create Activity

### Use Case ID

**Create Activity**

### Use Case Name

**Create Activity**

### Related Requirements

**FR:** FR-0301, FR-0302, FR-0303, FR-0304, FR-0305 **NFR:** NFR-10, NFR-11, NFR-13

### Initiating Actor

Student Host

### Actor's Goal

Create a new campus activity by defining its category, details, location, participant limit, and participation mode, so that other students on the same campus can discover and join it.

### Participating Actors

* System (validates input, publishes activity to campus feed)

### Preconditions

* The student has a verified, active account and is signed in.
* The student has a campus associated with their account.
* Campus-specific structured options (activity categories, campus locations) have been configured for the student's campus.

### Postconditions

* A new activity is created and associated with the student's campus.
* The student is recorded as the host of the activity.
* The activity is visible on the campus activity feed to other students of the same campus within a few seconds (NFR-11).
* The activity's participation mode (open or approval-based), participant limit, and all specified details are stored.

### Main Success Scenario

1. The student initiates the activity creation flow.
2. The system presents the list of predefined activity categories available for the student's campus (FR-0301).
3. The student selects an activity category.
4. The system presents input fields for additional activity details.
5. The student provides additional details or context for the activity (FR-0302).
6. The student specifies the scheduled date and start time for the activity.
7. The system validates that the date and time are present and valid (not in the past, not missing).
8. The student specifies a meeting point by selecting from the predefined list of campus locations or from a campus map view (FR-0304).
9. The student sets the maximum number of participants, from 1-to-1 up to a predefined small group limit (FR-0303).
10. The student defines the participation mode: open (anyone can join directly) or approval-based (join requests require host approval) (FR-0305).
11. The student confirms and submits the activity.
12. The system validates the submitted information (all mandatory fields present, values within allowed ranges).
13. The system creates the activity, associates it with the student as host and with the student's campus, and publishes it to the campus activity feed.
14. The system confirms to the student that the activity has been created successfully.

### Alternate Scenarios

**A1. Missing or invalid mandatory fields** At step 12, the system detects that one or more mandatory fields are missing or contain invalid values (e.g., no category selected, no date, participant limit out of range). The system informs the student which fields need to be corrected. The activity is not created. The student can fix the input and resubmit.

**A2. Invalid date or time** At step 7, the system detects that the scheduled date/time is in the past or otherwise invalid (FR-2502). The system informs the student that the date and time must be valid and in the future. The student can correct the value and continue.

**A3. No campus locations or categories available** At step 2 or step 8, the system finds that no activity categories or no campus locations have been configured for the student's campus. The system informs the student that activity creation is not available at this time. The activity creation flow is interrupted. *(This scenario should be rare if campus setup has been completed correctly.)*

**A4. Student abandons creation before submission** At any step before step 11, the student exits or cancels the activity creation flow. No activity is created. No data is published to the campus feed.

### Potential Connections with Other Use Cases

* **Connected UC:** Set Activity Date and Time **Relationship type:** Possible `<<include>>` or embedded subflow **Reason:** Steps 6–7 correspond directly to the "Set Activity Date and Time" use case (US-25, FR-2501, FR-2502). If that use case is modeled as a reusable sub-interaction within Create Activity, it could be an `<<include>>`. Alternatively, date/time setting may simply be documented as part of the Create Activity flow. The team should decide whether it justifies a separate included use case or remains an internal step. **Confidence:** High (connection exists), medium (whether it warrants a formal `<<include>>`)
* **Connected UC:** Manage Campus Structured Options **Relationship type:** Precondition dependency **Reason:** The activity categories and campus locations available during creation depend on what the campus admin has configured through this use case (FR-2302). If no options are configured, activity creation is blocked (see A3). **Confidence:** High
* **Connected UC:** Browse and Filter Activities **Relationship type:** Postcondition consequence **Reason:** Once created, the activity appears on the campus activity feed and becomes discoverable through browsing and filtering. **Confidence:** High
* **Connected UC:** Join Activity **Relationship type:** State dependency (downstream) **Reason:** The participation mode (open vs. approval-based) and participant limit defined during creation directly govern how the Join Activity use case behaves. **Confidence:** High
* **Connected UC:** View Activity Details **Relationship type:** Postcondition consequence **Reason:** The details specified during creation (category, description, location, time, participant limit) are what other students see when viewing the activity. **Confidence:** High
* **Connected UC:** Manage Join Requests **Relationship type:** State dependency (downstream) **Reason:** If the host selected approval-based participation, the Manage Join Requests flow becomes active for this activity once requests arrive. **Confidence:** High
* **Connected UC:** Delete Activity **Relationship type:** State dependency (downstream) **Reason:** Only the host who created the activity can delete it before it starts (FR-2601, FR-2603). The Delete Activity use case depends on the host role established here. **Confidence:** High
* **Connected UC:** Update Activity Status **Relationship type:** State dependency (downstream) **Reason:** The host can later change the activity status (e.g., cancel, mark completed). This depends on the activity having been created. **Confidence:** High

### Note

* The use case table lists "Set Activity Date and Time" as a separate use case (from US-25). In this narrative, steps 6–7 cover date/time input inline because it is a natural part of the creation flow. The team should decide in Phase 4 whether to extract it as a formal `<<include>>` or keep it as internal steps of Create Activity.
* FR-0304 mentions selection "from a predefined list of campus locations or from a map of the campus." The MVP scope confirms that an interactive map is not required for the first version, but a campus map view is mentioned in the FR. This is treated conservatively: the step refers to both options as stated in the FR, but the team may narrow this to list-only for MVP.
* NFR-13 (concurrent request handling) is listed as related in the project table. Its primary relevance is to the Join Activity flow, but it is included here because the participant limit defined at creation time is the constraint that NFR-13 enforces downstream.
