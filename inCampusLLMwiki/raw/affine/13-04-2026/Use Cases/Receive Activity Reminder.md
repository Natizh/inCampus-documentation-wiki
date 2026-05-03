# Receive Activity Reminder

### Use Case ID

Receive Activity Reminder

### Use Case Name

Receive Activity Reminder

### Related Requirements

**FR:** FR-1101

**NFR:** NFR-24 

### Initiating Actor

Student 

### Actor’s Goal

Receive a reminder notification shortly before the start of an activity already joined, so that the student does not forget the appointment. 

### Participating Actors

* &#x20;Notification service 
* &#x20;Activity scheduling/time data 

### Preconditions

* &#x20;The student is signed in to a valid account. 
* &#x20;The student has already joined the activity. 
* &#x20;The activity has a defined start date and time that the system can use for reminder scheduling. 

### Postconditions

* &#x20;A reminder notification is triggered for the joined activity at the configured reminder time. 
* &#x20;The student receives the reminder notification for the relevant activity. 
* &#x20;The reminder event is completed without changing the student’s participation status. 

### Main Success Scenario

1. &#x20;The student has already joined an activity with a defined start date and time. 
2. &#x20;The system monitors the configured reminder time for that joined activity. 
3. &#x20;When the reminder time is reached, the system triggers a reminder notification for the student. 
4. &#x20;The system delivers the reminder notification identifying the relevant upcoming activity. 
5. &#x20;The student receives the reminder and is informed that the activity is about to start. 

### Alternate Scenarios

**A1. Student is no longer joined in the activity**

&#x20;At step 2, the student has withdrawn from or left the activity before the reminder time is reached.

&#x20;The system does not trigger the reminder notification. 

**A2. Activity is cancelled before the reminder time**

&#x20;At step 2, the activity status changes to cancelled before the reminder is triggered.

&#x20;The reminder is not delivered as an upcoming-activity reminder; the relevant cancellation flow applies instead. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Join Activity 
* **Relationship type:** precondition dependency 
* **Reason:** A reminder only makes sense for an activity the student has already joined. 
* **Confidence:** high 
* **Connected UC-ID:** Set Activity Date and Time 
* **Relationship type:** precondition dependency 
* **Reason:** The reminder depends on the existence of a defined activity start time. 
* **Confidence:** high 
* **Connected UC-ID:** View Personal Activity List 
* **Relationship type:** state dependency 
* **Reason:** The reminder concerns the same future joined activities that belong in the student’s personal upcoming activity area. 
* **Confidence:** medium 
* **Connected UC-ID:** Notify Participant of Activity Cancellation 
* **Relationship type:** state dependency 
* **Reason:** If the activity is cancelled before it starts, the cancellation notification flow supersedes the reminder situation. 
* **Confidence:** high 
* **Connected UC-ID:** Withdraw from Activity 
* **Relationship type:** state dependency 
* **Reason:** Leaving or withdrawing before the start time removes the basis for sending the reminder. 
* **Confidence:** high 

### Note

The retrieved project artifacts clearly connect this use case to **US-11**, **FR-1101**, and **NFR-24**, and classify it as **postMVP**. The exact wording of **FR-1101** was not visible in the retrieved snippets, so I handled the behavior conservatively by relying only on the confirmed user story, the linked NFR, and the use-case list entry, without adding unsupported details such as reminder-channel choice or extra post-tap behavior.
