# Notify Participant of Application Outcome

### Use Case ID

Notify Participant of Application Outcome

### Use Case Name

Notify Participant of Application Outcome

### Related Requirements

**FR:** FR-0701, FR-0702, FR-0703, FR-0704, FR-2002

**NFR:** NFR-18, NFR-19

### Initiating Actor

Activity Host

### Actor’s Goal

Approve or decline a pending join request so that the participant is informed of the outcome and can stay updated about their participation status.

### Participating Actors

* &#x20;Activity Host 
* &#x20;Participant 
* &#x20;Notification service / mechanism 
* &#x20;System 

### Preconditions

* &#x20;The app is operating within the MVP scope, where notifications are included and access is limited to university-affiliated users. 
* &#x20;The activity uses approval-based participation, so a pending join request exists. 
* &#x20;The host can approve or decline each pending join request. 

### Postconditions

* &#x20;The participant’s application status has been changed to either Approved or Declined. 
* &#x20;A notification about that outcome has been triggered for the applicant. 
* &#x20;The participant can later view the historical application-status notification in the personal message center or notification list. 

### Main Success Scenario

1. &#x20;The host accesses the activity’s pending join requests. 
2. &#x20;The system shows the list of pending requests for that activity. 
3. &#x20;The host approves or declines one pending join request. 
4. &#x20;The system updates the participant’s application status to either Approved or Declined and detects that status change in real time. 
5. &#x20;The system triggers a notification to the applicant. 
6. &#x20;The system includes at least the event name, the application result, and the event time in the notification. 
7. &#x20;The system stores the notification so the participant can view it later in the personal message center or notification list. 

### Alternate Scenarios

**A1. Request is not pending anymore**

&#x20;At step 3, the selected request is no longer pending.

&#x20;The host cannot complete an approve/decline decision for that request, so this notification flow is not triggered.

**A2. Historical review by participant**

&#x20;After step 7, the participant does not act on the notification immediately.

&#x20;The system still preserves the notification and makes it available later in the personal message center or notification list. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Review Join Requests 
* **Relationship type:** notification consequence 
* **Reason:** this use case is triggered by the host’s decision on a pending join request; the approval/decline action is defined in the host-side request review flow. 
* **Confidence:** high 
* **Connected UC-ID:** Join / Request to Join Activity 
* **Relationship type:** precondition dependency 
* **Reason:** a participant outcome notification only makes sense if a previous join request exists for an approval-based activity. 
* **Confidence:** high 
* **Connected UC-ID:** View Personal Event Area 
* **Relationship type:** state dependency 
* **Reason:** the application outcome changes the participant’s status, and project artifacts also define personal participation-oriented areas and lists for students. 
* **Confidence:** medium 
* **Connected UC-ID:** Notify Participant of Activity Cancellation 
* **Relationship type:** shared subflow 
* **Reason:** both use cases belong to the MVP notification area for participants and share the same general notification pattern, but they are triggered by different business events and must remain separate. 
* **Confidence:** medium 

### Note

This use case is slightly special because the participant is the beneficiary of the interaction, while the triggering business action is performed by the host. I therefore used the host as the initiating actor and treated notification delivery as the direct consequence of the approval/decline decision. Also, the current artifacts do not state what happens when the participant taps this specific notification, unlike the host-notification and cancellation-notification requirements, so that behavior was intentionally left unresolved.
