# Upload Activity Photo

### Use Case ID

Upload Activity Photo

### Use Case Name

Upload Activity Photo

### Related Requirements

**FR:** FR-1301

**NFR:** NFR-26 

### Initiating Actor

Student

### Actor’s Goal

Upload a photo to the page of an activity already attended so that the student can preserve a memory of that shared campus moment. 

### Participating Actors

* &#x20;System 

### Preconditions

* &#x20;The student is authenticated in the app and can access the relevant activity page within their allowed app context. 
* &#x20;The activity has already concluded, since the photo upload flow is defined for a concluded activity. 
* &#x20;The student has attended the activity and is viewing, or can open, the relevant past activity. 

### Postconditions

* &#x20;The uploaded photo is associated with the relevant activity page. 
* &#x20;The activity page reflects the newly added photo. 
* &#x20;The student can later revisit that activity and find the stored memory there. 

### Main Success Scenario

1. &#x20;The student opens a concluded activity they attended. 
2. &#x20;The system shows the activity page with the option to upload a photo for that activity. 
3. &#x20;The student selects a photo to upload. 
4. &#x20;The system stores the photo and links it to the selected activity page. 
5. &#x20;The system refreshes the activity page and shows the uploaded photo as part of that activity’s memory content. 

### Alternate Scenarios

**A1. Activity not concluded**

&#x20;At step 1, the selected activity is not yet concluded.

&#x20;The system does not allow the upload flow for that activity and keeps the photo upload action unavailable or rejects the attempt. 

**A2. Student did not attend the activity**

&#x20;At step 1 or step 2, the student tries to access the upload action for an activity outside the intended attended-activity context.

&#x20;The system denies the upload action for that activity and leaves the activity page unchanged. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** View Personal Activity List 
* **Relationship type:** precondition dependency 
* **Reason:** A realistic way to reach a concluded attended activity is through the student’s personal area containing past and participated events. 
* **Confidence:** high 
* **Connected UC-ID:** Manage Join Requests 
* **Relationship type:** state dependency 
* **Reason:** That use case already includes activity status management, and a concluded/completed activity state is a logical prerequisite for enabling photo upload. 
* **Confidence:** medium 

### Note

This use case is grounded on the project artifacts that explicitly identify **US-13**, **FR-1301**, **NFR-26**, and the existing use case name **Upload Activity Photo**. However, the exact wording of **FR-1301** was not visible in the retrieved excerpts, so the narrative was kept strictly aligned with the visible user story and non-functional constraint, without adding unsupported rules. Also, this functionality is currently marked as **postMVP**, not MVP.
