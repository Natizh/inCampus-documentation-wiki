# Send Message

### Use Case ID

Send Message

### Use Case Name

Send Message 

### Related Requirements

**FR:** FR-0801, FR-0802, FR-0803

**NFR:** NFR-20, NFR-21

### Initiating Actor

Student 

### Actor’s Goal

Send a direct message to another student, and optionally share a specific activity link, so that the student can communicate with other students and direct them to a relevant activity inside the app.

### Participating Actors

* &#x20;Student 
* &#x20;Recipient Student 
* &#x20;System 

### Preconditions

* &#x20;The initiating student has access to the app as a university-affiliated user. 
* &#x20;The initiating student has identified another student as the intended recipient of the message. 
* &#x20;If the student wants to share an activity link, that activity already exists in the system as a shareable in-app activity reference. 

### Postconditions

* &#x20;A direct message from the sender to the intended recipient exists in the system. 
* &#x20;If an activity link was included, the message contains the shared activity link associated with that message. 
* &#x20;The content of the message and any shared activity link remain accessible only to the sender and the intended recipient(s). 

### Main Success Scenario

1. &#x20;The student opens the messaging function. 
2. &#x20;The student selects another student as the recipient of the message. 
3. &#x20;The system provides the ability to compose a direct text message. 
4. &#x20;The student writes the message and, if desired, adds a specific activity link to share through the messaging function. 
5. &#x20;The student sends the message. 
6. &#x20;The system stores the message and, if present, the shared activity link, preserving them consistently after successful sending. 

### Alternate Scenarios

**A1. Text-only message**

&#x20;At step 4, the student decides not to include any activity link.

&#x20;The system sends and preserves only the direct text message.

**A2. Direct interaction is blocked**

&#x20;At step 5, the system determines that the sender is not allowed to initiate further direct interaction with that student because of a blocking rule.

&#x20;The system prevents the direct interaction from being initiated.

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Block User 
* **Relationship type:** state dependency 
* **Reason:** the blocking use case changes whether a student is allowed to initiate further direct interaction, which directly affects whether Send Message can complete successfully. 
* **Confidence:** high 
* **Connected UC-ID:** View Activity Details 
* **Relationship type:** candidate connection, possible `<<extend>>`
* **Reason:** FR-0803 states that when a student selects a shared activity link in a message, the system opens the corresponding activity inside the app, which strongly suggests a later transition from messaging to activity viewing. 
* **Confidence:** high 
* **Connected UC-ID:** Join Activity 
* **Relationship type:** candidate connection, postcondition dependency 
* **Reason:** sharing a specific activity link can lead the recipient to open that activity and then decide to request to join or join directly, but that participation step is outside this use case. 
* **Confidence:** medium 

### Note

The current project documents define this use case conservatively as direct text messaging plus optional sharing of a specific activity link. They do not specify conversation threads, read receipts, delivery status, edit/delete message behavior, file attachments, or a hard rule that messaging is limited only to students met in previous events. The phrase “probably the students I met in previous events” appears in the user story, but it is not formalized as a functional rule, so it was not turned into a mandatory condition here.
