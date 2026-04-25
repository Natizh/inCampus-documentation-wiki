# Delete Activity

### Use Case ID

**Delete Activity**

### Use Case Name

**Delete Activity**

### Related Requirements

**FR:** FR-2601, FR-2602, FR-2603 **NFR:** NFR-12, NFR-42

### Initiating Actor

Student Host

### Actor's Goal

Delete an activity they created before it has started, so that the activity is removed from the campus feed and is no longer discoverable or joinable by other students, in case it was created by mistake or should no longer be published.

### Participating Actors

* System (validates authorization, executes deletion, updates feed and activity views)

### Preconditions

* The student host has a verified, active account and is signed in.
* The activity exists and was created by this student host.
* The activity has not yet started.

### Postconditions

* The activity is removed from the campus activity feed and from activity discovery views (FR-2602).
* The activity is no longer accessible through normal activity views.
* Any participation data associated with the activity (joined participants, pending requests) is handled consistently with the deletion (NFR-42).

### Main Success Scenario

1. The student host navigates to one of their own activities.
2. The system displays the activity details, including the option to delete the activity.
3. The student host selects the delete action.
4. The system asks the host to confirm the deletion.
5. The student host confirms.
6. The system verifies that the authenticated student is the creator of the activity (FR-2603, NFR-12).
7. The system verifies that the activity has not yet started.
8. The system deletes the activity.
9. The system removes the activity from the campus activity feed and from all activity discovery views (FR-2602).
10. The system confirms to the host that the activity has been successfully deleted.

### Alternate Scenarios

**A1. Student is not the creator of the activity** At step 6, the system detects that the authenticated student is not the host who created the activity. The system denies the deletion and informs the student that only the activity creator can delete it (FR-2603). No change is applied.

**A2. Activity has already started or is in the past** At step 7, the system determines that the activity's scheduled start time has already passed. The system informs the host that the activity can no longer be deleted because it has already started or concluded (FR-2601). No change is applied. The host may instead use Update Activity Status to mark it as completed or cancelled, if applicable.

**A3. Host cancels the confirmation** At step 5, the host decides not to confirm the deletion. The activity remains unchanged. No deletion is executed.

**A4. Activity has joined participants at the time of deletion** At step 8, the system detects that one or more students are currently joined in the activity or have pending join requests. The system proceeds with the deletion and removes the activity from the feed and discovery views. *(Note: whether the system should notify affected participants of the deletion is not explicitly specified in the current FRs. FR-2602 only addresses feed and discovery removal. See Note section.)*

**A5. Activity has already been cancelled** At step 7, the system determines that the activity status is already "cancelled." The system may still allow the host to delete a cancelled activity to remove it entirely from views, or may inform the host that the activity is already cancelled and deletion is unnecessary. *(Note: the interaction between cancelled status and deletion is not specified — treated conservatively.)*

**A6. Activity was already deleted** At step 2 or step 8, the system detects that the activity no longer exists (e.g., concurrently deleted from another session). The system informs the host that the activity could not be found. No action is taken.

### Potential Connections with Other Use Cases

* **Connected UC:** Create Activity **Relationship type:** Precondition dependency **Reason:** The activity must have been created before it can be deleted. The host role established at creation is what authorizes this action (FR-2603). **Confidence:** High
* **Connected UC:** Update Activity Status **Relationship type:** Alternative path / mutual consideration **Reason:** Both use cases allow the host to close or remove an activity before it starts, but they are distinct: deletion removes the activity entirely from all views (FR-2602), while cancellation changes the status but keeps the activity record visible. The team should clarify when the host would delete vs. cancel, and whether deletion is allowed on an already-cancelled activity. **Confidence:** High
* **Connected UC:** Browse and Filter Activities **Relationship type:** Postcondition consequence **Reason:** After deletion, the activity must no longer appear on the campus activity feed (FR-2602). The feed is immediately affected by this action. **Confidence:** High
* **Connected UC:** View Activity Details **Relationship type:** Postcondition consequence **Reason:** After deletion, the activity is no longer accessible through normal activity views (FR-2602). Any attempt to access the deleted activity (e.g., from a cached link, a notification, or a shared message link) should result in a "not found" or "no longer available" response. **Confidence:** High
* **Connected UC:** Join Activity **Relationship type:** State dependency (blocking) **Reason:** Once the activity is deleted, no further joins or join requests are possible. If a student was in the process of joining at the moment of deletion, the system should handle the conflict gracefully (related to NFR-13 concurrency considerations). **Confidence:** High
* **Connected UC:** Manage Join Requests **Relationship type:** State dependency **Reason:** If pending join requests exist at the time of deletion, those requests become moot. The host can no longer approve or decline them. The system should handle the state of pending requests consistently when the activity is deleted. **Confidence:** Medium
* **Connected UC:** Withdraw Join Request / Leave Joined Activity **Relationship type:** State dependency **Reason:** If a student had joined or had a pending request, and the activity is deleted, the withdraw/leave actions are no longer relevant. The activity should no longer appear in the student's personal activity list. **Confidence:** Medium
* **Connected UC:** View Personal Activity List **Relationship type:** Postcondition consequence **Reason:** After deletion, the activity should no longer appear in the personal activity lists of students who had joined or had pending requests. How this removal is communicated to those students is an open question. **Confidence:** High
* **Connected UC:** Notify Participant of Activity Cancellation **Relationship type:** Candidate connection (open question) **Reason:** The current FRs for deletion (FR-2601–FR-2603) do not mention notifying participants when an activity is deleted. However, the Notify Participant of Activity Cancellation use case (US-28) covers notification for cancellation. The team should decide whether deletion of an activity with participants should also trigger a notification, possibly reusing or extending the cancellation notification mechanism. **Confidence:** Medium (connection is plausible but not confirmed by current FRs)
* **Connected UC:** Send Message **Relationship type:** State dependency (edge case) **Reason:** If a student previously shared the activity link through a message (FR-0802), and the activity is later deleted, tapping the shared link should result in a "not available" response. This is an edge case but relevant to consistency. **Confidence:** Low–Medium

### Note

* The most significant open question for this use case is **what happens to participants and their pending requests when an activity is deleted**. The current FRs (FR-2601–FR-2603) address only the host's ability to delete and the removal from the feed and discovery views. They do not specify whether joined participants or students with pending requests should be notified. The team should decide whether deletion of an activity with participants should: (a) be blocked (forcing the host to cancel first), (b) trigger a notification to affected participants (reusing or adapting the cancellation notification mechanism), or (c) silently remove the activity without explicit notification. This narrative treats the question conservatively by proceeding with deletion and flagging the gap.
* The relationship between deletion and cancellation is not fully specified. Whether a host can delete an already-cancelled activity, or whether deletion is only available for active/open activities, should be clarified when the activity state model is finalized.
* FR-2601 states that the host can delete "before the activity has started." The exact definition of "started" (scheduled start time has passed, or the host has explicitly marked it as started) depends on the final state model and is treated here as the scheduled start time having passed.
* NFR-12 confirms that only the creator and campus admins have permission to modify the activity. Whether campus admins can also delete an activity (e.g., as part of moderation) is not explicitly stated in FR-2601–FR-2603 but is implied by NFR-12. This narrative focuses on the host-initiated flow; admin-initiated deletion would be a variation to address if needed.
