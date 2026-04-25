# Manage Campus Structured Options

### Use Case ID

Manage Campus Structured Options

### Use Case Name

Manage Campus Structured Options

### Related Requirements

**FR:** FR-0301, FR-0304, FR-2302

**NFR:** NFR-39, NFR-40 

### Initiating Actor

Campus Admin 

### Actor’s Goal

Manage campus-specific structured options such as locations and activity lists so that students in that campus see relevant and usable choices. 

### Participating Actors

* &#x20;Campus Admin 
* &#x20;System 

### Preconditions

* &#x20;The actor is a Campus Admin. 
* &#x20;The system is operating on a targeted campus configuration. 
* &#x20;The app uses campus-specific structured options in relevant student flows, including predefined activity categories and campus-structured meeting-point selection. 

### Postconditions

* &#x20;The targeted campus’s structured options are stored in their updated state in the system. 
* &#x20;The changes are applied consistently and only to the targeted campus configuration. 
* &#x20;Relevant student flows for that campus use the updated structured options, including activity-category selection and meeting-point selection. 

### Main Success Scenario

1. &#x20;The Campus Admin opens the function for managing campus-specific structured options for a selected campus. 
2. &#x20;The system displays the current campus-specific structured options in a form that the Campus Admin can understand and update without unnecessary complexity. 
3. &#x20;The Campus Admin reviews the existing options, such as locations and activity lists, and updates the ones needed for that campus. 
4. &#x20;The Campus Admin confirms the changes. 
5. &#x20;The system saves the updated structured options for the targeted campus configuration. 
6. &#x20;The system applies those updated options to the relevant student-facing flows that rely on campus-specific structured choices. 

### Alternate Scenarios

**A1. Unauthorized actor**

&#x20;At step 1, the actor is not an authorized Campus Admin.

&#x20;The system does not allow access to the campus structured-options management function. This is a conservative consequence of the use case being explicitly assigned to the Campus Admin actor. 

**A2. Location options are represented through the currently supported campus structure**

&#x20;At step 2, the Campus Admin needs to manage meeting-point choices for the campus.

&#x20;The system supports location management through the currently supported campus-structured mechanism, while keeping the exact representation conservative because the documents allow controlled campus locations and mention that an interactive campus map is not required in the MVP. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Configure New Campus 
* **Relationship type:** possible `<<include>>`
* **Reason:** both use cases are in the same campus-configuration area, and FR-2302 is shared. Managing campus-specific structured options appears to be a plausible reusable sub-interaction inside new-campus setup. 
* **Confidence:** high 
* **Connected UC-ID:** Create Activity 
* **Relationship type:** state dependency 
* **Reason:** activity creation depends on predefined campus-specific lists and campus-structured location choices, which are exactly the kinds of structured options managed here. 
* **Confidence:** high 

### Note

The project documents clearly support the actor, the goal, the linked FRs and NFRs, and the fact that the use case concerns campus-specific structured options such as locations and activity lists. However, they do not fix the exact CRUD operations, validation rules, or whether this management always happens inside initial campus setup or can also happen later as a separate maintenance action. For that reason, the narrative keeps the interaction intentionally abstract and implementation-neutral.
