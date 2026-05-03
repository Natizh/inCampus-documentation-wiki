# Sign Up with University Email

### Use Case ID

Sign Up with University Email

### Use Case Name

Sign Up with University Email

### Related Requirements

**FR:** FR-0101, FR-0102, FR-0103, FR-0104, FR-0105

**NFR:** NFR-01, NFR-02, NFR-03, NFR-04, NFR-05 

### Initiating Actor

Student 

### Actor’s Goal

Create an account using a university email so that only university-affiliated users can access the app and the student can feel safer using it. 

### Participating Actors

* &#x20;Student 
* &#x20;System 
* &#x20;University identity / verification mechanism 

### Preconditions

* &#x20;The user is not yet using a verified account to access the app. 
* &#x20;The app admits only users inside the university sphere. 
* &#x20;A university email is required for access. 

### Postconditions

* &#x20;A registration attempt with a supported university email has been processed by the system. 
* &#x20;If verification succeeds, the account is activated. 
* &#x20;The system determines the user’s university from the verified email domain and can present the campuses associated with that university during onboarding. 

### Main Success Scenario

1. &#x20;The Student starts the registration process. 
2. &#x20;The system asks the Student to enter a university email address. 
3. &#x20;The Student enters a university email address. 
4. &#x20;The system checks whether the email domain is supported and university-affiliated. 
5. &#x20;The system sends a verification email to the provided university email address. 
6. &#x20;The Student completes the email verification step through the supported verification mechanism. 
7. &#x20;The system activates the account only after the email address has been verified. 
8. &#x20;The system determines the user’s university from the verified email domain and presents the campuses associated with that university during onboarding. 

### Alternate Scenarios

**A1. Unsupported or non-university email domain**

&#x20;At step 4, the entered email domain is unsupported or not university-affiliated.

&#x20;The system rejects the registration attempt. 

**A2. Email not yet verified**

&#x20;At step 6, the Student does not complete verification successfully.

&#x20;The system does not activate the account. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Sign In 
* **Relationship type:** postcondition dependency 
* **Reason:** sign-in is defined for a verified account, so successful completion of this use case creates the state needed for later sign-in. 
* **Confidence:** high 
* **Connected UC-ID:** Confirm or Select Campus During Onboarding 
* **Relationship type:** postcondition dependency 
* **Reason:** FR-0105 and US-16 show that after verified registration the system determines the university and presents associated campuses during onboarding. 
* **Confidence:** high 
* **Connected UC-ID:** Create / Edit Minimal Profile 
* **Relationship type:** postcondition dependency 
* **Reason:** US-14 states that minimal profile creation and editing happen immediately after registration of the account, so this use case plausibly leads into that one. 
* **Confidence:** medium 

### Note

The business rule is clear: access must be restricted to university-affiliated users and a university email is required. However, the exact authentication mechanism is not fixed yet: the project documents explicitly say it may be implemented either through email verification or through redirection to a university login/identity page. For that reason, the narrative keeps the participating external mechanism abstract and does not assume one final technical solution.
