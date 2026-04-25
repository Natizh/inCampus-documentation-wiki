# Configure New Campus

### Use Case ID

Configure New Campus

### Use Case Name

Configure New Campus

### Related Requirements

**FR:** FR-2301, FR-2302

**NFR:** NFR-37, NFR-38

### Initiating Actor

Campus Admin

### Actor’s Goal

Configure the campus-specific setup of the app through guided steps so that the app can operate correctly for the new campus without requiring a new system version. 

### Participating Actors

* &#x20;Campus Admin 
* &#x20;System 

### Preconditions

* &#x20;The actor is a campus admin for a new campus. 
* &#x20;The system supports onboarding a new campus through configuration rather than through a separate system version. 
* &#x20;The app is designed to be adaptable to different campuses, and campus-specific options are part of the configurable campus setup. 

### Postconditions

* &#x20;A campus configuration for the new campus is stored in the system. 
* &#x20;The campus-specific structured options needed by the app for that campus are created, updated, or removed as part of the setup. 
* &#x20;The new campus can operate in the app without requiring a new system version. 

### Main Success Scenario

1. &#x20;The Campus Admin starts the guided workflow to configure a new campus within the app. 
2. &#x20;The system presents the campus setup process as a small number of guided steps. 
3. &#x20;The Campus Admin enters or selects the campus-specific setup information required by the workflow. 
4. &#x20;The system allows the Campus Admin to create, update, and remove campus-specific structured options used in the app, such as activity categories and campus locations. 
5. &#x20;The Campus Admin confirms the configuration. 
6. &#x20;The system saves the targeted campus configuration and applies the structured options to that campus. 
7. &#x20;The system makes the new campus available in the app through configuration, without requiring a new system version. 

### Alternate Scenarios

**A1. Unauthorized actor**

&#x20;At step 1, the actor is not an authorized campus admin.

&#x20;The system does not allow access to the campus configuration workflow.

&#x20;This alternate is justified conservatively because the use case is explicitly assigned to the Campus Admin actor, but the exact authorization mechanism is not specified in the project documents. 

**A2. Campus-specific options are incomplete or need revision**

&#x20;At step 4, the Campus Admin realizes that some campus-specific structured options are missing, incorrect, or no longer needed.

&#x20;The system allows the Campus Admin to create, update, or remove those options before completing the configuration. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Manage Campus Structured Options 
* **Relationship type:** possible `<<include>>`
* **Reason:** FR-2302 is shared by both use cases, and configuring a new campus plausibly requires managing campus-specific structured options such as locations and activity categories. 
* **Confidence:** high 
* **Connected UC-ID:** Register Account 
* **Relationship type:** postcondition dependency 
* **Reason:** the project states that the system determines the user’s university and presents associated campuses during onboarding; once a new campus is configured, that campus can become part of the campus environment available to relevant users. 
* **Confidence:** medium 
* **Connected UC-ID:** Confirm / Select Campus During Onboarding 
* **Relationship type:** postcondition dependency 
* **Reason:** US-16 and FR-0105 show that onboarding depends on campuses associated with a university being available in the system; a newly configured campus can therefore affect this later use case. 
* **Confidence:** medium 
* **Connected UC-ID:** Create Activity 
* **Relationship type:** state dependency 
* **Reason:** activity creation uses campus-specific structured options, including predefined lists and campus locations; these are affected by campus configuration and by the related campus-options use case. 
* **Confidence:** medium 

### Note

The project documents clearly justify the actor, goal, FRs, NFRs, and the fact that the workflow is guided and configuration-based rather than version-based. They do **not** specify the exact fields, sequence, or validation rules inside the setup workflow, so these were kept abstract. The documents also state that future campus adaptation may include uploading a campus map, labeling it, and making it interactive, but they explicitly say this is not needed for the MVP, so those details were not included as mandatory steps here
