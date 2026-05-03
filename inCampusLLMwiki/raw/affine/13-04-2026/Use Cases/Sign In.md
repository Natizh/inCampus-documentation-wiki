# Sign In

### Use Case ID

Sign In 

### Use Case Name

Sign In

### Related Requirements

**FR:** FR-1501

**NFR:** NFR-29

### Initiating Actor

Student

### Actor’s Goal

Sign in to a verified account using the verified university email address and password so that the student can access the app again without creating a new account.

### Participating Actors

* &#x20;Student 
* &#x20;System 

### Preconditions

* &#x20;A student account already exists. 
* &#x20;The account is a verified account. 
* &#x20;The student knows the verified university email address and password associated with that account. 

### Postconditions

* &#x20;The student is granted access to the existing verified account. 
* &#x20;The student can access the app again without creating a new account. 
* &#x20;Authentication credentials and sign-in data remain protected during the sign-in process. 

### Main Success Scenario

1. &#x20;The student opens the app and chooses to sign in. 
2. &#x20;The system prompts for the verified university email address and password. 
3. &#x20;The student enters the verified university email address and password. 
4. &#x20;The system validates the submitted credentials against an existing verified account. 
5. &#x20;The system signs the student in and grants access to the app through the existing account. 

### Alternate Scenarios

**A1. Invalid credentials**

&#x20;At step 4, the submitted email address or password does not match a valid account.

&#x20;The system denies sign-in and the student is not granted access to the app.

**A2. Account is not verified**

&#x20;At step 4, the submitted credentials correspond to an account that is not verified.

&#x20;The system does not allow sign-in, because this use case applies only to a verified account.

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Sign Up with University Email 
* **Relationship type:** precondition dependency 
* **Reason:** sign-in depends on the prior existence of a verified account, and account verification is established in the registration use case. 
* **Confidence:** high 
* **Connected UC-ID:** Select Campus 
* **Relationship type:** candidate connection, postcondition dependency 
* **Reason:** campus association is part of onboarding and is used to scope campus-specific content shown to the user, but the current artifacts do not state that campus selection necessarily happens inside the sign-in flow itself. 
* **Confidence:** medium
