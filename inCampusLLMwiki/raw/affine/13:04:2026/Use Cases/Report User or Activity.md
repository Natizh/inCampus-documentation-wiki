# Report User or Activity

### Use Case ID

Report User or Activity

### Use Case Name

Report User or Activity

### Related Requirements

**FR:** FR-1701, FR-0201, FR-0202, FR-0203

**NFR:** NFR-31, NFR-06, NFR-08 

### Initiating Actor

Student. 

### Actor’s Goal

Report an inappropriate user or activity so that unsafe or unsuitable situations can be reviewed and handled. 

### Participating Actors

* &#x20;Student 
* &#x20;System 

### Preconditions

* &#x20;The actor is a student using the app. 
* &#x20;A user or activity exists in a context where the student can identify it as inappropriate and initiate a report. This is the most conservative interpretation of the reporting capability stated in US-17. 
* &#x20;The system supports basic trust and safety features, including reporting, in the MVP. 

### Postconditions

* &#x20;A report about a user or activity has been submitted and stored by the system. 
* &#x20;The report contains the reason and relevant report details needed for later review. 
* &#x20;The submitted report is available for campus-admin review and later moderation outcome recording. 

### Main Success Scenario

1. &#x20;The Student identifies a user or activity that they consider inappropriate. 
2. &#x20;The Student starts the reporting action for that user or activity. 
3. &#x20;The system presents a reporting flow that makes the reporting action and reason submission clear and easy to complete. 
4. &#x20;The Student submits the report and provides the reason, together with the relevant report details supported by the system. 
5. &#x20;The system records the report. 
6. &#x20;The system preserves the report so it can later be accessed, reviewed, and traced by a campus admin. 

### Alternate Scenarios

**A1. Reporting flow not completed**

&#x20;At step 4, the Student does not complete the report submission.

&#x20;The system does not create a submitted report, so no report becomes available for campus-admin review. This follows conservatively from the fact that review requires submitted report data. 

**A2. Reason or report details are not properly provided**

&#x20;At step 4, the required reason or relevant report details are not adequately provided.

&#x20;The system cannot complete the reporting interaction as a valid submitted report, because later review is defined as including the reason and relevant report details. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Review Reports about Inappropriate Users or Activities 
* **Relationship type:** postcondition dependency 
* **Reason:** this use case produces the submitted report that the campus admin later accesses, reviews, marks as reviewed, and uses for moderation decisions. 
* **Confidence:** high 
* **Connected UC-ID:** Block User 
* **Relationship type:** candidate connection / postcondition dependency 
* **Reason:** the project states that, after review, the campus admin may take moderation action on a reported user or activity, and basic trust and safety in the MVP includes blocking. This makes a later connection plausible, but the documents do not explicitly state that every report can or must lead to blocking. 
* **Confidence:** medium 

### Note

The project documents clearly support that a student can submit a report about an inappropriate user or activity, that the report must carry a reason and relevant details, and that it later enters a campus-admin review flow. However, they do not specify the exact report form fields, whether attachments/evidence are supported, or the exact contexts from which the reporting action can be launched, so those points were kept abstract
