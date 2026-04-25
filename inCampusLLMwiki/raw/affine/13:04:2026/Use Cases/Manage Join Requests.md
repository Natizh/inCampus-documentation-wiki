# Manage Join Requests

### Use Case ID

Manage Join Requests

### Use Case Name

Manage Join Requests

### Related Requirements

**FR:** FR-0501, FR-0502, FR-2002, FR-1403

**NFR:** NFR-12, NFR-13 

### Initiating Actor

Student Host. 

### Actor’s Goal

Review pending join requests, evaluate the requesting students in the relevant activity context, and approve or decline requests so that the host can control who attends the activity. 

### Participating Actors

* &#x20;Student Host 
* &#x20;System 

### Preconditions

* &#x20;The actor is the user who created the activity, or otherwise an authorized campus administrator allowed to approve or decline participants. 
* &#x20;The activity exists and uses approval-based participation, because direct joining is handled by a different interaction. 
* &#x20;At least one join request is pending for the activity. 

### Postconditions

* &#x20;One or more pending join requests have been reviewed by the host. 
* &#x20;For each reviewed request, the system records the outcome as approved or declined. 
* &#x20;The activity participation state remains consistent, including enforcement of request and participant limits when relevant. 

### Main Success Scenario

1. &#x20;The Student Host opens the relevant activity and accesses its pending join requests. 
2. &#x20;The system displays the list of pending join requests for that activity. 
3. &#x20;The system shows the minimal profiles of the requesting students in that activity context. 
4. &#x20;The Student Host reviews a pending request. 
5. &#x20;The Student Host chooses to approve or decline that request. 
6. &#x20;The system records the decision for that request. 
7. &#x20;The system keeps participation data consistent and, when the maximum number of requests or approved participants is reached, blocks further new join requests. 

### Alternate Scenarios

**A1. Unauthorized actor**

&#x20;At step 1, the actor is not the activity creator and is not otherwise authorized to approve or decline participants.

&#x20;The system does not allow the actor to manage join requests. 

**A2. No pending requests**

&#x20;At step 2, there are no pending join requests for the activity.

&#x20;The system shows no requests to review, so no approval or decline action is performed. 

**A3. Request capacity or participant capacity reached**

&#x20;At step 7, the activity has reached the maximum number of requests or approved participants.

&#x20;The system blocks further new join requests for that activity. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Join Activity 
* **Relationship type:** postcondition dependency 
* **Reason:** this use case exists because another student has previously requested to join an approval-based activity. The request originates in the join interaction, then is handled here. 
* **Confidence:** high 
* **Connected UC-ID:** View Student Minimal Profile 
* **Relationship type:** possible `<<include>>` / shared subflow 
* **Reason:** the host reviews the minimal profiles of requesting students while evaluating pending requests. That profile viewing capability is explicitly linked through FR-1403 and is relevant in this activity context. 
* **Confidence:** high 
* **Connected UC-ID:** Notify Participant of Application Outcome 
* **Relationship type:** notification consequence 
* **Reason:** once the host approves or declines a pending request here, the participant-outcome notification use case becomes relevant. FR-2002 is shared between the host decision and the later participant notification flow. 
* **Confidence:** high 
* **Connected UC-ID:** Notify Host of Join Event 
* **Relationship type:** precondition dependency 
* **Reason:** the host may arrive at this use case after being notified that someone requested to join the activity. That notification does not replace the review action, but can lead into it. 
* **Confidence:** medium 

### Note

The project documents clearly support the host’s ability to view pending requests, inspect minimal profiles in the relevant context, and approve or decline each request. However, they do not specify finer operational details such as batch approval, ordering of requests, sorting rules, or additional decision states beyond approve/decline, so those were left unresolved.
