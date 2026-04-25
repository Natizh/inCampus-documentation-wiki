# View Community Rules

### Use Case ID

View Community Rules

### Use Case Name

View Community Rules

### Related Requirements

**FR:** FR-1901

**NFR:** NFR-33

### Initiating Actor

Student

### Actor’s Goal

View the community rules so that the student understands what behavior is expected before using the app’s participation features and while joining activities.

### Participating Actors

* &#x20;Student 
* &#x20;System 

### Preconditions

* &#x20;The user has access to the app as a student within the university-affiliated user scope of the MVP. 
* &#x20;The community rules are available in the app as part of the MVP trust-and-safety scope. 
* &#x20;The student is in a context where they want to understand expected behavior before using participation features or while already using the app. 

### Postconditions

* &#x20;The student has been given access to the community rules. 
* &#x20;The student can read the rules in the app before using participation features or while using the app. 
* &#x20;No participation state, activity state, or profile state is changed by this use case. 

### Main Success Scenario

1. &#x20;The student reaches a point in the app where they want to understand the expected behavior for using the platform. 
2. &#x20;The student requests access to the community rules. 
3. &#x20;The system provides the student with access to the community rules. 
4. &#x20;The system presents the rules in a form that is easy to locate, read, and understand. 
5. &#x20;The student reads the rules and understands the expected behavior before continuing to use participation features or other relevant app interactions. 

### Alternate Scenarios

**A1. Rules viewed before participation**

&#x20;At step 1, the student has not yet used a participation feature and wants to check the expected behavior first.

&#x20;The system provides access to the community rules before the student proceeds with that feature. 

**A2. Rules viewed during app use**

&#x20;At step 1, the student is already using the app and wants to consult the rules again.

&#x20;The system provides access to the community rules while the student uses the app.

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Join / Request to Join Activity 
* **Relationship type:** precondition dependency 
* **Reason:** FR-1901 explicitly states that students must have access to the community rules before they use participation features, and joining or requesting to join is one of those features. 
* **Confidence:** high 
* **Connected UC-ID:** Report User or Activity 
* **Relationship type:** candidate connection, shared decision basis 
* **Reason:** the community rules define expected behavior, and reporting is used when a student believes another user or activity is inappropriate or unsuitable; the rules can therefore inform a student’s understanding of what should be reported, even though the documents do not make this flow mandatory. 
* **Confidence:** medium 
* **Connected UC-ID:** Review Report 
* **Relationship type:** candidate connection, shared decision basis 
* **Reason:** reports concern unsafe or unsuitable behavior, and the rules define expected behavior in the app community; however, the current artifacts do not explicitly state that report review formally includes this use case. 
* **Confidence:** low 

### Note

The current project artifacts define this use case very conservatively: students must be able to access the community rules before using participation features and while using the app, and the rules must be easy to locate, read, and understand. They do not specify the actual rule content, whether explicit acknowledgment is required, whether rules are versioned, or whether a violation workflow is directly linked from the rules page, so those points were intentionally left unresolved.
