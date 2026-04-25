# View Friends and Social Indicators

### Use Case ID

View Friends and Social Indicators

### Use Case Name

View Friends and Social Indicators

### Related Requirements

**FR:** FR-1001, FR-1002

**NFR:** NFR-23 

### Initiating Actor

Student

### Actor’s Goal

View a dedicated friends and connections area and recognize when friends have joined activities in the feed, so that campus activities feel more socially understandable and easier to approach. 

### Participating Actors

* &#x20;Friends/connection relationship mechanism 
* &#x20;Activity participation records 

### Preconditions

* &#x20;The student is signed in to a verified account. 
* &#x20;The system has a dedicated friends and connections section available to the student. 
* &#x20;At least one activity feed item can be shown to the student when the feed is accessed. 

### Postconditions

* &#x20;The student can view the dedicated friends and connections section. 
* &#x20;The activity feed shows social indicators when one or more of the student’s friends have joined an activity. 
* &#x20;Relationship information and friend-participation indicators are presented clearly and without ambiguity. 

### Main Success Scenario

1. &#x20;The student opens the friends and connections area. 
2. &#x20;The system displays the dedicated section for the student’s friends and connections. 
3. &#x20;The student navigates to the activity feed or views feed items in a context where social indicators are available. 
4. &#x20;The system checks whether any of the student’s friends have joined each displayed activity. 
5. &#x20;For activities where this condition is true, the system displays a social indicator such as “2 of your friends joined.” 
6. &#x20;The student reviews the relationship information and the visible friend-participation indicators. 
7. &#x20;The use case ends with the student informed about both their connections and the social context of relevant activities. 

### Alternate Scenarios

**A1. No friends or connections to show**

&#x20;At step 2, the student has no friends or connections available in the dedicated section.

&#x20;The system still opens the section, but shows it without relationship entries.

**A2. No friends joined displayed activities**

&#x20;At step 4, the system finds that none of the student’s friends have joined a displayed activity.

&#x20;The system shows the feed without friend-participation indicators for those activities. 

### Potential Connections with Other Use Cases

* **Connected UC-ID:** Browse and Filter Activities 
* **Relationship type:** shared subflow 
* **Reason:** The social indicator is explicitly shown in the activity feed, so this use case interacts with the feed-viewing context rather than replacing it. 
* **Confidence:** high 
* **Connected UC-ID:** Join Activity 
* **Relationship type:** state dependency 
* **Reason:** Friend-participation indicators depend on whether one or more connected students have already joined an activity. 
* **Confidence:** high 
* **Connected UC-ID:** View Student Minimal Profile 
* **Relationship type:** candidate connection 
* **Reason:** A friends/connections area may plausibly expose student identities in a way that could lead to profile viewing, but this is not explicitly confirmed by the linked requirements. 
* **Confidence:** low 

### Note

This use case is linked in the current project artifacts to **US-10**, **FR-1001**, **FR-1002**, and **NFR-23**, and is marked as **postMVP** rather than MVP. I therefore kept the narrative conservative and did not assume extra behaviors such as adding friends, removing friends, or opening chat from this view. 
