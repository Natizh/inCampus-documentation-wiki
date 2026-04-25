# Block User

### Use Case ID

**Block User**

### Use Case Name

**Block User**

### Related Requirements

**FR:** FR-1801, FR-1802 **NFR:** NFR-32

### Initiating Actor

Student

### Actor's Goal

Block another user so that the blocked user can no longer initiate direct interaction with the student through system-supported features, allowing the student to feel safer using the app.

### Participating Actors

* System (records the block relationship, enforces interaction restrictions)

### Preconditions

* The student has a verified, active account and is signed in.
* The target user exists in the system.
* The student has not already blocked the target user.

### Postconditions

* A block relationship is recorded between the student and the target user (FR-1801).
* The blocked user is prevented from initiating further direct interaction with the student through system-supported interaction features (FR-1802).
* The block takes effect consistently across all supported interaction features without requiring the student to repeat the action (NFR-32).

### Main Success Scenario

1. The student navigates to a context where the target user is visible (e.g., an activity participant list, a join request view, a minimal profile view, a messaging conversation).
2. The student selects the option to block the target user.
3. The system displays a confirmation prompt, informing the student of the consequences of blocking (e.g., the blocked user will no longer be able to interact directly with them).
4. The student confirms the block action.
5. The system records the block relationship between the student and the target user (FR-1801).
6. The system immediately enforces the block across all system-supported interaction features (NFR-32).
7. The system confirms to the student that the user has been blocked.

### Alternate Scenarios

**A1. Student has already blocked the target user** At step 2 or step 5, the system detects that the target user is already blocked by the student. The system informs the student that this user is already blocked. No duplicate block record is created.

**A2. Student cancels the confirmation** At step 4, the student decides not to confirm the block. No block relationship is recorded. The interaction state remains unchanged.

**A3. Target user is currently a participant in the same activity as the student** At step 5, the system detects that the student and the target user are both participants in an ongoing or upcoming activity. The system records the block and enforces it for future direct interactions. *(Note: whether blocking should remove the blocked user from a shared activity, or only prevent future direct interaction, is not specified in the current FRs — treated conservatively as preventing future direct interaction only, without retroactively altering existing activity participation.)*

**A4. Target user has a pending join request on the student's activity** At step 5, the student is a host and the target user has a pending join request on one of the student's activities. The system records the block. *(Note: whether the pending request should be automatically declined or simply left for manual handling is not specified — treated conservatively as not automatically declining, but the host can decline it through Manage Join Requests.)*

**A5. Student attempts to block themselves** At step 2, the system detects that the student is attempting to block their own account. The system prevents the action and informs the student that self-blocking is not allowed.

### Potential Connections with Other Use Cases

* **Connected UC:** Join Activity **Relationship type:** Constraint dependency **Reason:** When a block relationship exists, the blocked user should be prevented from joining or requesting to join activities hosted by the blocking student. Conversely, the blocking student should be prevented from joining activities hosted by the blocked user. The Join Activity use case must check for block relationships before allowing the action. **Confidence:** High
* **Connected UC:** Manage Join Requests **Relationship type:** State dependency **Reason:** If a block is established after the blocked user has already submitted a join request, the host (blocking student) may still see the pending request. The host can decline it manually. Whether the system should auto-decline pending requests upon blocking is an open question. **Confidence:** Medium
* **Connected UC:** Send Message **Relationship type:** Constraint dependency **Reason:** FR-1802 prevents the blocked user from initiating further direct interaction. Messaging (FR-0801) is a direct interaction feature. After a block, the blocked user should not be able to send messages to the blocking student. **Confidence:** High
* **Connected UC:** View Student Minimal Profile **Relationship type:** Candidate connection (constraint) **Reason:** Whether the blocked user can still view the blocking student's minimal profile in activity contexts is not explicitly specified. The block may or may not affect profile visibility. This is an open question for the team. **Confidence:** Low–Medium
* **Connected UC:** View Activity Details **Relationship type:** Candidate connection (constraint) **Reason:** Whether the blocked user can still see activities hosted by the blocking student on the campus feed or in detail views is not specified. FR-1802 focuses on preventing "direct interaction," which may not include passive viewing. The team should clarify the scope of the block. **Confidence:** Low–Medium
* **Connected UC:** Report User or Activity **Relationship type:** Complementary action **Reason:** A student may choose to both report and block another user in response to inappropriate behavior. The two actions are independent but often used together. US-17 (report) and US-18 (block) address related but distinct safety mechanisms. **Confidence:** High
* **Connected UC:** Browse and Filter Activities **Relationship type:** Candidate connection (filtering consequence) **Reason:** Whether activities hosted by a blocked user should be hidden from the blocking student's feed (or vice versa) is not specified. This would be an additional filtering rule beyond what is described in the current FRs for Browse and Filter Activities. The team should decide whether blocking affects feed visibility. **Confidence:** Medium
* **Connected UC:** Notify Host of Join Event **Relationship type:** Constraint dependency (prevention) **Reason:** If the block prevents the blocked user from joining or requesting to join, no join notification would be triggered for that user. The block acts upstream of the notification. **Confidence:** Medium
* **Connected UC:** Notify Participant of Activity Cancellation **Relationship type:** Candidate connection (edge case) **Reason:** If a blocked user is still a participant in an activity (joined before the block), and the host cancels the activity, the cancellation notification should presumably still be sent to the blocked user. Whether the block affects system-initiated notifications (as opposed to user-initiated interactions) is an open question. **Confidence:** Low–Medium

### Note

* The **scope of what "direct interaction" means** in the context of FR-1802 is the most important unresolved question for this use case. The current FR states that the blocked user is prevented from "initiating further direct interaction \[...] through system-supported interaction features." This clearly covers messaging (FR-0801) and likely covers join requests to the blocking student's activities. However, it is unclear whether the block also affects: passive visibility (seeing each other's activities on the feed), profile viewing, or system-initiated notifications. The team should define the exact scope of the block before finalizing this narrative.
* Whether the **block is mutual or one-directional** is not specified. FR-1801 says "a student can block another user" and FR-1802 says the "blocked user" is prevented from initiating interaction. This suggests the block is one-directional: the blocking student blocks the target, and the target is restricted. Whether the blocking student is also restricted from interacting with the blocked user (symmetrical block) is not stated. This narrative treats the block as one-directional per the FR wording, but the team should confirm.
* Whether the student can **unblock** a previously blocked user is not addressed by any current FR or US. If unblocking is intended as part of the MVP, a separate requirement and potentially a separate use case should be added. This is flagged as an open question.
* The **entry points** for the block action (step 1) are not specified. The narrative lists plausible contexts (activity participant list, profile view, messaging conversation) but the exact locations where the block option is available depend on UI decisions not yet made.
* Scenario A3 (block while sharing an activity) and A4 (block while a join request is pending) highlight edge cases where the interaction between block enforcement and existing activity participation is ambiguous. The current FRs do not prescribe retroactive effects of blocking on existing participations. This narrative treats the block conservatively as affecting future interactions only, but the team should clarify.
