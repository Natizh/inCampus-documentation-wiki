# Leave Joined Activity

### Use Case ID

Leave Joined Activity

### Use Case Name

Leave Joined Activity

### Related Requirements

**FR:** FR-2702, FR-2703, FR-2704

**NFR:** NFR-43, NFR-13, NFR-22 

### Initiating Actor

Student

### Actor’s Goal

Leave an activity they had already joined before it starts, so that they can update their participation when they are no longer available. 

### Participating Actors

* &#x20;System 

### Preconditions

* &#x20;The student is authenticated and is using the mobile app within the university-access context defined for the project. 
* &#x20;The student has already joined the activity. 
* &#x20;The activity has not started yet. 

### Postconditions

* &#x20;The student is no longer counted as joined in that activity. 
* &#x20;The system updates the activity participation data accordingly. 
* &#x20;If a participant slot is freed, that availability becomes effective in the relevant activity views. 

### Main Success Scenario

1. &#x20;The student opens the app and accesses an activity they have already joined, typically from the area containing events they are going to participate in. 
2. &#x20;The system displays the activity details and the student’s current joined status. 
3. &#x20;The student selects the option to leave the activity. 
4. &#x20;The system verifies that the student is currently joined and that the activity has not started yet. 
5. &#x20;The system removes the student from the joined participants for that activity. 
6. &#x20;The system updates the activity participation data. 
7. &#x20;If the leave action frees a participant slot, the system makes that availability effective in the relevant activity views. 
8. &#x20;The system confirms that the student has left the activity. 

### Alternate Scenarios

**A1. Activity already started**

&#x20;At step 4, the activity has already started.

&#x20;The system rejects the leave action and keeps the student’s participation unchanged, because leaving is only allowed before the activity starts. 

**A2. Student is no longer joined**

&#x20;At step 4, the system finds that the student is not currently registered as joined in that activity.

&#x20;The system does not perform the leave action, refreshes the current participation state, and leaves the activity data unchanged.

### Potential Connections with Other Use Cases

* **Connected UC-ID:** View Personal Activity List 
* **Relationship type:** precondition dependency 
* **Reason:** A realistic entry point for this use case is the student’s personal area showing events they are going to participate in. 
* **Confidence:** high 
* **Connected UC-ID:** Browse and Filter Activities 
* **Relationship type:** postcondition dependency 
* **Reason:** FR-2704 states that when a leave action frees a slot, that availability must become effective in the relevant activity views, which directly affects browsing/discovery. 
* **Confidence:** high 
* **Connected UC-ID:** Manage Join Requests 
* **Relationship type:** state dependency 
* **Reason:** Host-side participation management and participant-side leaving both affect the same participation data and available slots. This is a real shared state dependency, not necessarily an include/extend relation. 
* **Confidence:** medium 

### Note

The project artifacts clearly support this use case through **US-27** and **FR-2702/2703/2704**. The exact textual content of **NFR-43** and **FR-901** was not fully visible in the retrieved excerpts, so they were kept only as traceability anchors and not used to introduce extra unsupported behavior.
