# View Personal Activity List

### Use Case ID

View Personal Activity List

### Use Case Name

View Personal Activity List

### Related Requirements

**FR:** FR-0901, FR-0902

**NFR:** NFR-22 

### Initiating Actor

Student

### Actor’s Goal

View a clear personal area that separates upcoming events the student is going to participate in from past events associated with the student, so that the student can easily understand their activity situation. 

### Participating Actors

* &#x20;Activity participation records 
* &#x20;Personal event area 

### Preconditions

* &#x20;The student is signed in to the app. 
* &#x20;The student has access to their personal area. 
* &#x20;The system has stored activity-participation data associated with the student, even if one or both lists may be empty. 

### Postconditions

* &#x20;The student can view a personal list of events they are going to participate in. 
* &#x20;The student can view a separate personal list of past events associated with them. 
* &#x20;The two categories remain clearly separated in the personal event area. 

### Main Success Scenario

1. &#x20;The student opens the personal activity area. 
2. &#x20;The system retrieves the events the student is going to participate in. 
3. &#x20;The system retrieves the past events associated with the student. 
4. &#x20;The system displays the upcoming participation list. 
5. &#x20;The system displays the past-events list separately from the upcoming list. 
6. &#x20;The student reviews the two lists. 
7. &#x20;The use case ends with the student informed about both future participation and past activity history. 

### Alternate Scenarios

**A1. No upcoming participation events**

&#x20;At step 2, the system finds no events the student is going to participate in.

&#x20;The system shows the personal area without upcoming entries, while still keeping the section distinct from past events.

**A2. No past events available**

&#x20;At step 3, the system finds no past events associated with the student.

&#x20;The system shows the personal area without past entries, while still keeping the upcoming participation section separate. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Join Activity 
* **Relationship type:** state dependency 
* **Reason:** The upcoming participation list depends on activities the student has successfully joined or been admitted to. 
* **Confidence:** high 
* **Connected UC-ID:** Notify Participant of Application Outcome 
* **Relationship type:** postcondition dependency 
* **Reason:** After an approval outcome, the relevant activity can become part of the student’s personal upcoming list. 
* **Confidence:** medium 
* **Connected UC-ID:** Withdraw from Activity 
* **Relationship type:** state dependency 
* **Reason:** Withdrawing from a pending request or leaving a joined activity changes what should appear in the personal participation list. 
* **Confidence:** high 
* **Connected UC-ID:** Receive Activity Reminder 
* **Relationship type:** precondition dependency 
* **Reason:** Reminder notifications for joined activities logically depend on the existence of future activities associated with the student. 
* **Confidence:** medium 

### Note

The documents clearly link this use case to **US-09**, **FR-0901**, **FR-0902**, and **NFR-22**. However, they do not further define what counts as “past events associated with the student” beyond the requirement text, so I kept that notion intentionally broad and conservative.
