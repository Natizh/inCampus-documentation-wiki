# Notify Participant of Activity Cancellation

### Use Case ID

Notify Participant of Activity Cancellation

### Use Case Name

Notify Participant of Activity Cancellation

### Related Requirements

**FR:** FR-0503, FR-2801, FR-2802, FR-2803, FR-2804

**NFR:** NFR-44, NFR-19 

### Initiating Actor

Student

### Actor’s Goal

Receive a clear and timely notification when an activity already joined is cancelled, so that the student immediately knows the appointment no longer exists.

### Participating Actors

* &#x20;Notification service 
* &#x20;InCampus mobile app 

### Preconditions

* &#x20;The activity exists in the system. 
* &#x20;The student is currently joined in that activity. 
* &#x20;The activity status can be updated to **cancelled** through the related activity-status management flow. 

### Postconditions

* &#x20;A cancellation notification has been triggered for each student currently joined in the cancelled activity. 
* &#x20;The notification contains at least the activity name, the scheduled time, and the information that the activity has been cancelled. 
* &#x20;If the student opens the notification, the app shows the relevant activity with its cancelled status. 

### Main Success Scenario

1. &#x20;The system detects that the status of an activity has been changed to **cancelled**. 
2. &#x20;The system identifies the students currently joined in that activity. 
3. &#x20;For each joined student, the system triggers a cancellation notification. 
4. &#x20;The system includes in the notification at least the activity name, the scheduled time, and the cancellation information. 
5. &#x20;The student receives the notification. 
6. &#x20;The student taps the notification. 
7. &#x20;The system opens the relevant activity inside the app and displays its cancelled status. 

### Alternate Scenarios

**A1. No joined participants**

&#x20;At step 2, the system finds that no students are currently joined in the activity.

&#x20;No participant notification is triggered, and the use case ends.

**A2. Notification not opened**

&#x20;At step 6, the student does not tap the notification.

&#x20;The use case ends after the notification is delivered; the activity remains cancelled in the system.

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Update Activity Status 
* **Relationship type:** possible `<<extend>>`
* **Reason:** This notification use case becomes relevant only when the activity-status update sets the activity to **cancelled**. 
* **Confidence:** high 
* **Connected UC-ID:** Join Activity 
* **Relationship type:** state dependency 
* **Reason:** The set of recipients depends on which students are currently joined in the activity. 
* **Confidence:** high 
* **Connected UC-ID:** Leave Joined Activity 
* **Relationship type:** state dependency 
* **Reason:** A student who has already left the activity before cancellation should no longer be part of the notification target set. 
* **Confidence:** high 



