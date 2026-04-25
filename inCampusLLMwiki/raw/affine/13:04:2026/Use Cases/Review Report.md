# Review Report

Review Report 

### Use Case Name

Review Report

### Related Requirements

**FR:** FR-0201, FR-0202, FR-0203

**NFR:** NFR-06, NFR-07, NFR-08, NFR-09

### Initiating Actor

Campus Admin

### Actor’s Goal

Review a submitted report about an inappropriate user or activity so that unsafe or unsuitable behavior can be assessed and handled.

### Participating Actors

* &#x20;Campus Admin 
* &#x20;System 

### Preconditions

* &#x20;A report about a user or an activity has already been submitted to the system. 
* &#x20;The actor is an authorized campus admin. 
* &#x20;The report is available in the moderation area for campus-admin review. 

### Postconditions

* &#x20;The report has been reviewed by the campus admin. 
* &#x20;The system has recorded the review outcome and preserved it consistently. 
* &#x20;If the campus admin decides that action is needed, the system has applied a moderation action to the reported user or activity. 

### Main Success Scenario

1. &#x20;The campus admin opens the report-review area. 
2. &#x20;The system provides access to submitted reports about users or activities, including the reason and relevant report details. 
3. &#x20;The campus admin selects one report for review. 
4. &#x20;The system displays the report information clearly so the campus admin can assess the case. 
5. &#x20;The campus admin reviews the report and determines the review outcome. 
6. &#x20;The system allows the campus admin to mark the report as reviewed and records the review outcome. 
7. &#x20;The campus admin takes moderation action on the reported user or activity when needed. 
8. &#x20;The system stores the report record, the review outcome, and the decision trace consistently. 

### Alternate Scenarios

**A1. No moderation action is needed**

&#x20;At step 7, the campus admin concludes that no moderation action should be taken after the review.

&#x20;The system still records the report as reviewed and preserves the review outcome.

**A2. Unauthorized access attempt**

&#x20;At step 1, the actor is not an authorized campus admin.

&#x20;The system denies access to report-review functions and protects report data from unauthorized access. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Report User or Activity 
* **Relationship type:** precondition dependency 
* **Reason:** Review Report can only start after a student has submitted a report about a user or an activity. 
* **Confidence:** high 
* **Connected UC-ID:** View Community Rules 
* **Relationship type:** candidate connection, shared decision basis 
* **Reason:** reports concern inappropriate or unsuitable behavior, and the project also includes community rules that define expected behavior; however, the documents do not explicitly state that the campus admin consults that use case during review. 
* **Confidence:** medium 

### Note

The current project documents clearly define report access, review, outcome recording, and the possibility of moderation action, but they do not define the exact set of moderation actions, whether reporter feedback is sent, whether the reported party is notified, or what evidence fields beyond “reason and relevant report details” are always available. Those points were therefore left unresolved.
