# Edit Profile

### Use Case ID

Edit Profile

### Use Case Name

Edit Profile

### Related Requirements

**FR:** FR-1402

**NFR:** NFR-27 

### Initiating Actor

Student

### Actor’s Goal

Edit the minimal profile after its initial creation so that other students can still recognize the student enough to feel safer when joining or accepting activities. 

### Participating Actors

* &#x20;Minimal profile data 
* &#x20;InCampus mobile app 

### Preconditions

* &#x20;The student is signed in to a verified account. 
* &#x20;The student has already created the minimal profile. 
* &#x20;The student can access the personal profile area in the app. 

### Postconditions

* &#x20;The student’s minimal profile is updated in the system. 
* &#x20;The updated minimal profile replaces the previous one for future profile views. 
* &#x20;The editing flow is completed in a simple and understandable way for the student. 

### Main Success Scenario

1. &#x20;The student opens the personal profile area. 
2. &#x20;The student chooses to edit the minimal profile. 
3. &#x20;The system displays the current minimal profile information. 
4. &#x20;The student modifies one or more editable profile fields. 
5. &#x20;The student submits the updated profile. 
6. &#x20;The system saves the updated minimal profile. 
7. &#x20;The system confirms the update and makes the new minimal profile available for later viewing in the relevant contexts. 

### Alternate Scenarios

**A1. Minimal profile not yet created**

&#x20;At step 2, the system determines that the student has not completed the initial minimal profile creation.

&#x20;The system does not continue with profile editing and the student must complete **Set Up Profile** first. 

**A2. Student abandons the edit**

&#x20;At step 4 or 5, the student leaves the flow without submitting the update.

&#x20;The system keeps the previously stored minimal profile unchanged.

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Set Up Profile 
* **Relationship type:** precondition dependency 
* **Reason:** Edit Profile is only possible after the minimal profile has been created initially. 
* **Confidence:** high 
* **Connected UC-ID:** View Student Minimal Profile 
* **Relationship type:** postcondition dependency 
* **Reason:** Any updated minimal profile data can later be shown when another student views that profile in relevant activity contexts. 
* **Confidence:** high 
* **Connected UC-ID:** Manage Join Requests 
* **Relationship type:** state dependency 
* **Reason:** The host may view another student’s minimal profile in activity-related contexts, so profile edits can affect what is seen during participation decisions. 
* **Confidence:** medium 
* **Connected UC-ID:** Sign In 
* **Relationship type:** precondition dependency 
* **Reason:** The student must be authenticated before accessing personal profile editing. 
* **Confidence:** medium 

### Note

The project artifacts clearly connect **Edit Profile** to **US-14**, **FR-1402**, and **NFR-27**. However, they do not define the exact minimal profile fields in the retrieved material, so I kept the editable content intentionally abstract and did not invent specific fields. The use-case list also treats **Edit Profile** as a distinct use case, separate from **Set Up Profile**.
