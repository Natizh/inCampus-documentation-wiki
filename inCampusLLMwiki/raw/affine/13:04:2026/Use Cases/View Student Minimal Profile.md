# View Student Minimal Profile

### Use Case ID

View Student Minimal Profile

### Use Case Name

View Student Minimal Profile

### Related Requirements

**FR:** FR-1403, FR-0501

**NFR:** NFR-28, NFR-36

### Initiating Actor

Student

### Actor’s Goal

View another student’s minimal profile in a relevant activity context so that the student can decide whether they feel comfortable joining or accepting an activity.

### Participating Actors

* &#x20;Student 
* &#x20;Other Student 
* &#x20;System 

### Preconditions

* &#x20;The initiating student has access to the app as a university-affiliated user. 
* &#x20;A relevant activity context exists in which profile viewing is allowed by the system. 
* &#x20;The other student has a minimal profile available in the system. 

### Postconditions

* &#x20;The system displays the other student’s minimal profile to the initiating student in the relevant activity context. 
* &#x20;The displayed information is limited to minimal profile information and does not expose more personal data than necessary for that purpose. 
* &#x20;No change is made to the viewed student’s profile data as a result of the viewing action. 

### Main Success Scenario

1. &#x20;The student reaches a relevant activity context involving another student. 
2. &#x20;The system indicates that the other student’s minimal profile can be viewed in that context. 
3. &#x20;The student requests to view the other student’s minimal profile. 
4. &#x20;The system retrieves the minimal profile information associated with that student. 
5. &#x20;The system displays the other student’s minimal profile within the current activity context. 
6. &#x20;The student reviews the minimal profile information and uses it to decide whether they feel comfortable joining or accepting the activity. 

### Alternate Scenarios

**A1. Profile view from pending join requests**

&#x20;At step 1, the relevant activity context is the host’s view of pending join requests.

&#x20;The system shows the minimal profiles of the requesting students as part of the pending join request list.

**A2. Viewing not allowed in the current context**

&#x20;At step 2, the current context is not one in which the system allows profile viewing.

&#x20;The system does not expose the other student’s minimal profile information. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Review Join Requests 
* **Relationship type:** shared subflow 
* **Reason:** FR-0501 explicitly states that the host sees the minimal profiles of requesting students while reviewing pending join requests, so profile viewing is materially embedded in that interaction. 
* **Confidence:** high 
* **Connected UC-ID:** Create Minimal Profile 
* **Relationship type:** precondition dependency 
* **Reason:** this use case depends on the existence of a minimal profile that was previously created by another student. 
* **Confidence:** high 
* **Connected UC-ID:** Edit Minimal Profile 
* **Relationship type:** state dependency 
* **Reason:** what is shown in this use case depends on the current state of the minimal profile, which may have been changed through profile editing. 
* **Confidence:** high 
* **Connected UC-ID:** Join / Request to Join Activity 
* **Relationship type:** candidate connection, precondition dependency 
* **Reason:** US-22 states that profile viewing supports the decision of whether to feel comfortable joining an activity, so it can realistically precede the join/request action, even though the documents do not state that it must always do so. 
* **Confidence:** medium 
* **Connected UC-ID:** View Activity Details 
* **Relationship type:** candidate connection, shared context dependency 
* **Reason:** the user story says the profile is viewed in relevant activity contexts, and another established use case already covers understanding an activity before joining; these two interactions can plausibly occur in the same decision moment. 
* **Confidence:** medium 

### Note

The project documents clearly confirm that students can view another student’s minimal profile in relevant activity contexts and that one explicit context is the host’s review of pending join requests. However, the exact minimum profile fields are still unresolved, and the exact text of NFR-36 is not fully recoverable from the available retrieved snippets. For that reason, this narrative keeps the profile content abstract and relies only on the confirmed rule that no more personal data than necessary should be exposed.

