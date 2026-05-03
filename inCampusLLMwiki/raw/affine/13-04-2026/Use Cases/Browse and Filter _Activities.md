Browse and Filter 
Activities
==========

### Use Case ID

Browse and Filter Activities 

### Use Case Name

Browse and Filter Activities

### Related Requirements

**FR:** FR-0401, FR-0402, FR-0403, FR-0404, FR-0405, FR-0406

**NFR:** NFR-11, NFR-16, NFR-17

### Initiating Actor

Student guest 

### Actor’s Goal

Browse the campus activity feed and apply one or more filters so that the student can identify activities that match personal preferences and decide which one to participate in.

### Participating Actors

* &#x20;System 

### Preconditions

* &#x20;The student has access to the app as a university-affiliated user, since access is limited to university users. 
* &#x20;The student is already in the relevant campus environment, since the project uses campus-specific onboarding and campus-relevant activity visibility. 
* &#x20;The campus activity feed is available for browsing. 

### Postconditions

* &#x20;The system displays a list of available activities in the browse interface, ordered according to the predefined order. 
* &#x20;The displayed results reflect the filters currently applied by the student. 
* &#x20;Activities that have already reached the participant limit are not shown in the displayed results. 

### Main Success Scenario

1. &#x20;The student opens the activity browse interface. 
2. &#x20;The system shows the list of available activities for the campus feed. For each displayed activity, the system shows at least the title, activity category, host, time, location, current number of participants, and any additional activity details. The system does not display activities whose participant limit has already been reached. 
3. &#x20;The student applies one or more filters to narrow the activity list. Supported filters include activity category, time, and gender. 
4. &#x20;The system updates the displayed results within a short time and keeps the filtered list in the predefined order. 
5. &#x20;The student reviews the filtered activities and identifies one or more activities that match personal preferences. 

### Alternate Scenarios

**A1. No activities are currently available**

&#x20;At step 2, no available activities exist for display in the browse interface.

&#x20;The system shows an empty result state for the activity list. 

**A2. Applied filters return no matching results**

&#x20;At step 4, the selected filter combination produces no matching activities.

&#x20;The system updates the results and shows no matching activities for the current filter set, allowing the student to change the filters and browse again.

### Potential Connections with Other Use Cases

* **Connected UC-ID:** View Activity Details 
* **Relationship type:** candidate connection, possible `<<extend>>`
* **Reason:** the project also defines a separate use case for viewing the essential details of an activity before joining; this can naturally arise from browsing when the student selects one activity for closer inspection. 
* **Confidence:** high 
* **Connected UC-ID:** Join Activity 
* **Relationship type:** postcondition dependency 
* **Reason:** this use case helps the student identify a suitable activity, while the separate Join Activity use case covers requesting to join or joining directly when allowed. 
* **Confidence:** high 
* **Connected UC-ID:** Create Activity 
* **Relationship type:** state dependency 
* **Reason:** newly created activities are expected to become available on the campus activity feed within a short time, so activity creation directly affects what can be browsed here. 
* **Confidence:** high 
* **Connected UC-ID:** Update Activity Status 
* **Relationship type:** state dependency 
* **Reason:** changes to activity status affect feed accuracy, which in turn affects the correctness of what students browse and filter. 
* **Confidence:** medium 

### Note

The current project artifacts do not show a numeric UC code for this use case; the agreed textual identifier “Browse and Filter Activities” was therefore used conservatively. Also, the gender filter is kept exactly as documented in the current user story and functional requirement, without adding any extra policy or interpretation beyond the existing project material.
