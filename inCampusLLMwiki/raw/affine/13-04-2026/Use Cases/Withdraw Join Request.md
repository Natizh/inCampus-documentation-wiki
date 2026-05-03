# Withdraw Join Request

### Use Case ID

Withdraw Join Request

### Use Case Name

Withdraw Join Request

### Related Requirements

**FR:** FR-2701, FR-2703, FR-2704

**NFR:** NFR-43

### Initiating Actor

Student 

### Actor’s Goal

Withdraw a pending join request from an activity before the host makes a decision, so that the student can update their participation when they are no longer available.

### Participating Actors

* &#x20;Student 
* &#x20;System 

### Preconditions

* &#x20;The student has already submitted a join request for the activity. 
* &#x20;The join request is still pending. 
* &#x20;The host has not yet made a decision on that request. 

### Postconditions

* &#x20;The pending join request no longer exists for that student and activity. 
* &#x20;The system updates the activity participation data accordingly. 
* &#x20;If the withdrawal frees a request slot or participant slot, that availability becomes effective in the relevant activity views, without conflicting participation states across the system. 

### Main Success Scenario

1. &#x20;The student opens the relevant activity context where their pending join request can be managed. 
2. &#x20;The system shows that the student has a pending join request for that activity. 
3. &#x20;The student chooses to withdraw the pending join request. 
4. &#x20;The system verifies that the request is still pending and that the host has not yet made a decision. 
5. &#x20;The system removes the pending join request. 
6. &#x20;The system updates the activity participation data. 
7. &#x20;If the withdrawal frees a slot, the system makes that availability effective in the relevant activity views and keeps the participation state consistent for the student, the host, and the system. 

### Alternate Scenarios

**A1. Host decision already made**

&#x20;At step 4, the host has already approved or declined the request.

&#x20;The system does not allow the withdrawal of that pending request, because the request is no longer in the state required by FR-2701. 

**A2. Request no longer pending**

&#x20;At step 4, the request is no longer pending, for example because it was already withdrawn or otherwise changed.

&#x20;The system does not execute the withdrawal and preserves a consistent participation state across the relevant views.

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Join / Request to Join Activity 
* **Relationship type:** precondition dependency 
* **Reason:** this use case can exist only if the student has previously submitted a join request for an activity. 
* **Confidence:** high 
* **Connected UC-ID:** Review Join Requests 
* **Relationship type:** state dependency 
* **Reason:** withdrawing a pending request changes the set of pending requests that the host can review and may also affect request-slot availability. 
* **Confidence:** high 
* **Connected UC-ID:** Browse and Filter Activities 
* **Relationship type:** state dependency 
* **Reason:** FR-2704 states that when withdrawal frees a slot, that availability must become effective in the relevant activity views, which can affect activity visibility and availability to other students. 
* **Confidence:** medium 
* **Connected UC-ID:** View Activity Details 
* **Relationship type:** state dependency 
* **Reason:** when the withdrawal frees availability, the activity’s displayed participation-related state should reflect the updated availability in relevant views. 
* **Confidence:** medium 

### Note

US-27 combines two distinct behaviors: withdrawing a pending join request and leaving an already joined activity. Here I treated only the first behavior, because you asked specifically for **Withdraw Join Request**. I therefore excluded FR-2702 and did not force FR-0901 or NFR-22 into this narrative, since those artifacts are more clearly tied to the broader/personal-event-area side of US-27 and not strictly required to define the withdrawal of a pending request itself.
