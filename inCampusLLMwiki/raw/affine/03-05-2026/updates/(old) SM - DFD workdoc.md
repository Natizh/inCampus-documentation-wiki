# (old) SM - DFD workdoc

# SM - DFD workdoc

## Version Log

| Version | Date       | Author | Changes                                                                                                                                              |
| ------- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1.0`   | 2024-05-20 | Team   | Initial draft of the Safety and Moderation DFD workdoc.                                                                                              |
| `1.1`   | 2024-05-22 | Gemini | **Architectural Alignment:** Clarified that Review Report triggers native workflows in HL and AP domains rather than performing direct CRUD updates. |

Safety and Moderation subgroup:

* View Community Rules
* Report User or Activity
* Review Report
* Block User

The output is structured to support context DFD, Level‑1 DFD, data dictionary, and CRUD matrix preparation.

**1. Owned Scope and Subgroup Boundary**

**Subgroup responsibility**

&#x20;Provide trust‑and‑safety mechanisms that allow students to understand community expectations, report inappropriate content or behaviour, block unwanted contact, and enable campus administrators to review reports and take moderation action.

**Boundary summary**

* **Inside subgroup**: Rule presentation, report submission, report review workflow, block relationship recording and enforcement.
* **Outside subgroup**: Activity creation, participation flows, messaging, profile management, notifications (except for constraints enforced by blocking).
* **Interfaces with adjacent subgroups**:
* **Discovery and Participation** – Block enforcement affects join requests, feed visibility, and activity details access.
* **Hosting and Lifecycle** – Block enforcement affects host‑participant interactions and auto-declines pending requests.
* **Notifications and System Flows** – Block enforcement strictly suppresses cross-user notifications.
* **Access and Profile** – Reads student account/profile data for identification and enforcement. Admin moderation actions may update account status.

**2. Key Business Events**

|          |                                                                                 |              |
| -------- | ------------------------------------------------------------------------------- | ------------ |
| EV‑SM‑01 | Student requests to view the community rules.                                   | Student      |
| EV‑SM‑02 | Student submits a report about a user or activity.                              | Student      |
| EV‑SM‑03 | Campus admin accesses the report review area.                                   | Campus Admin |
| EV‑SM‑04 | Campus admin selects a specific report for review.                              | Campus Admin |
| EV‑SM‑05 | Campus admin records a review outcome and optionally applies moderation action. | Campus Admin |
| EV‑SM‑06 | Student initiates block of another user.                                        | Student      |
| EV‑SM‑07 | Student confirms block action.                                                  | Student      |

**3. Proposed Logical Function Groups**

Based on event‑response analysis, the subgroup naturally decomposes into three logical function groups:

**FG‑SM‑1: Community Rules Access**

&#x20;Responds to EV‑SM‑01. Retrieves and presents community rule content.

**FG‑SM‑2: Report Handling**

&#x20;Responds to EV‑SM‑02 (submission), EV‑SM‑03/04/05 (review).

&#x20;Sub‑functions:

* Collect and validate report reason/details
* Persist submitted report
* Present report list to admin
* Display report details for review
* Record review outcome and moderation action

**FG‑SM‑3: Block Management**

&#x20;Responds to EV‑SM‑06/07.

&#x20;Sub‑functions:

* Validate block eligibility (no self‑block, no duplicate)
* Record block relationship
* Enforce block constraints across system interaction points

**4. Candidate Logical Processes**

Processes are derived from the function groups, merged where they share a common event‑response boundary.

|         |                             |                                                                                                                                                            |                              |                           |
| ------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------- |
| P‑SM‑01 | Provide Community Rules     | Retrieve and present the community rules content to the student.                                                                                           | EV‑SM‑01                     | FG‑SM‑1                   |
| P‑SM‑02 | Submit User/Activity Report | Accept report reason and details from student; validate completeness; create and store a report record.                                                    | EV‑SM‑02                     | FG‑SM‑2 (submission part) |
| P‑SM‑03 | Manage Report Review        | Present list of submitted reports to campus admin; allow selection and display of report details; record review outcome and any moderation action applied. | EV‑SM‑03, EV‑SM‑04, EV‑SM‑05 | FG‑SM‑2 (review part)     |
| P‑SM‑04 | Enforce Block Relationship  | Validate block request; record block relationship; apply interaction restrictions when queried by other processes (e.g., during join attempt, messaging).  | EV‑SM‑06, EV‑SM‑07           | FG‑SM‑3                   |

**Notes on process granularity**

* P‑SM‑02 and P‑SM‑03 are separate because they are triggered by different external entities (Student vs. Campus Admin) and operate on distinct timeframes.
* P‑SM‑04 is modelled as a service process that both creates block records and enforces them when called by other system processes. For DFD purposes, enforcement logic is internal; other processes query the block store.

**5. Candidate External Entities**

|       |              |                                                    |                                                                        |
| ----- | ------------ | -------------------------------------------------- | ---------------------------------------------------------------------- |
| EE‑01 | Student      | A registered student user of the app.              | Views rules; submits reports; initiates block.                         |
| EE‑02 | Campus Admin | An authorised administrator for a specific campus. | Accesses and reviews reports; records outcomes and moderation actions. |

**6. Candidate Logical Data Stores**

**Existing stores used** (from provided DS list):

|           |                         |                                                                                                                                             |                                                          |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| DS‑SM‑001 | Block Relationships     | Stores block records between student pairs. Created/read by P‑SM‑04. Read by other processes (e.g., join, messaging) for enforcement.       | P‑SM‑04 (CRUD); P‑SM‑02, P‑SM‑03 (read‑only for context) |
| DS‑AP‑001 | Student Account         | Contains student identity and account status. Read to validate student existence and campus affiliation during report submission and block. | P‑SM‑02, P‑SM‑04 (read)                                  |
| DS‑AP‑002 | Student Profile         | Contains minimal profile data. Read for display in report details (reported user identity) and block confirmation.                          | P‑SM‑02 (read), P‑SM‑03 (read)                           |
| DS-HL-001 | Activities              | Read for context during moderation review. (Deletion is handled via a trigger to Hosting & Lifecycle).                                      | P-SM-03 (read)                                           |
| DS-HL-002 | Activity Participations | (Handled natively by Hosting & Lifecycle cascading hard-delete when an activity is removed).                                                |                                                          |

**Confirmed logical store:**

|           |                |                                                                                                                                                    |                                          |
| --------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| DS‑SM‑002 | Report Records | Stores submitted reports, including reporter, reported user/activity, reason, details, review status, review outcome, and moderation action trace. | P‑SM‑02 (create), P‑SM‑03 (read, update) |

**Reason for new store**

&#x20;No existing store in the provided list is designed to hold report‑specific data. `DS-SM-002` is now fully confirmed as the central store for moderation outcomes.

**7. Candidate Logical Data Flows**

Flows are described between external entities, processes, and data stores. Direction is indicated as *incoming* (to process), *outgoing* (from process), or *bidirectional* (for queries/responses).

|         |                           |                                                                    |                                                                       |
| ------- | ------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| F‑SM‑01 | Student → P‑SM‑01         | Request for community rules                                        | Triggers rule presentation.                                           |
| F‑SM‑02 | P‑SM‑01 → Student         | Community rules content                                            | Displayed in app.                                                     |
| F‑SM‑03 | Student → P‑SM‑02         | Report submission (target user/activity, reason, optional details) | Incoming report data.                                                 |
| F‑SM‑04 | P‑SM‑02 → DS‑SM‑002       | New report record                                                  | Created upon successful submission.                                   |
| F‑SM‑05 | P‑SM‑02 → Student         | Submission confirmation                                            | Indicates report recorded.                                            |
| F‑SM‑06 | Campus Admin → P‑SM‑03    | Request to view report list / select report                        | Access to review area.                                                |
| F‑SM‑07 | P‑SM‑03 → DS‑SM‑002       | Query for report list / specific report details                    | Read operation.                                                       |
| F‑SM‑08 | DS‑SM‑002 → P‑SM‑03       | Report list / report details                                       | Response data.                                                        |
| F‑SM‑09 | P‑SM‑03 → Campus Admin    | Report list / report details                                       | Display for review.                                                   |
| F‑SM‑10 | Campus Admin → P‑SM‑03    | Review outcome, moderation action (optional)                       | Admin decision input.                                                 |
| F‑SM‑11 | P‑SM‑03 → DS‑SM‑002       | Update report record (review status, outcome, action)              | Write operation.                                                      |
| F‑SM‑12 | Student → P‑SM‑04         | Block request (target user)                                        | Incoming block initiation.                                            |
| F‑SM‑13 | P‑SM‑04 → DS‑AP‑001       | Read student account (target existence, self‑block check)          | Validation.                                                           |
| F‑SM‑14 | DS‑AP‑001 → P‑SM‑04       | Account validation result                                          | Response.                                                             |
| F‑SM‑15 | P‑SM‑04 → DS‑SM‑001       | Create/read block relationship record                              | Write on confirm; read for duplicate check.                           |
| F‑SM‑16 | DS‑SM‑001 → P‑SM‑04       | Existing block status                                              | For duplicate prevention.                                             |
| F‑SM‑17 | P‑SM‑04 → Student         | Block confirmation or error message                                | Outcome of block action.                                              |
| F‑SM‑18 | Other processes → P‑SM‑04 | Query: "Is user A blocked by user B?"                              | Internal enforcement check (e.g., from Join Activity, Notifications). |
| F‑SM‑19 | P‑SM‑04 → DS‑SM‑001       | Read block relationship                                            | For query response.                                                   |
| F‑SM‑20 | DS‑SM‑001 → P‑SM‑04       | Block status                                                       | Return to calling process.                                            |

**Shared flows (cross‑subgroup)**

* F‑SM‑18 / F‑SM‑19 / F‑SM‑20 represent internal enforcement queries. These are not external flows but are critical for defining the interface between Safety & Moderation and other subgroups.

**8. Interface Notes to Adjacent Subgroups**

**Discovery and Participation**

* **Block enforcement**: When a student attempts to join/request to join an activity, the process must query P‑SM‑04 / DS‑SM‑001 to check for a block relationship. If a block exists in either direction, the join action must be prevented.
* **Resolved**: Reciprocal visibility is strictly enforced. Blocked users cannot see each other's activities in feeds, cannot access activity details, and cannot view profile details.

**Hosting and Lifecycle**

* **Join request management**: If a block relationship is created while a join request is still pending, the pending request is automatically declined.
* **Resolved**: Existing shared participation is not retroactively removed, but all new direct interactions are prevented.

**Notifications and System Flows**

* **Notification suppression**: ALL cross-user notifications (joins, leaves, application outcomes, cancellations) are strictly suppressed if a block relationship exists.

**Access and Profile**

* Reads student account/profile data for identification in reports and block validation. Updated during Report Review if an admin bans or suspends a user.

### Workdoc update - report review data sufficiency

A clarification is needed regarding the relationship between report review and activity/user data. In the finalized architecture, the Campus Admin receives the information needed for moderation primarily through the submitted report record (`DS-SM-002`). However, moderation outcomes explicitly affect other domains: if an admin decides to ban a user or delete an activity, the Review Report process registers this decision and triggers the native workflows in the Access & Profile (`DS-AP-001`) or Hosting & Lifecycle (`DS-HL-001/002`) domains to perform the physical state updates.

### Workdoc update - community rules treated as static content

A second clarification concerns the logical treatment of community rules. At the current project stage, the subgroup includes **rule presentation**, but there is no evidence of a separate rule-management workflow, rule editing process, explicit acknowledgement mechanism, or rule versioning requirement. The View Community Rules use case only requires that the rules be accessible in the app, easy to read and understand, and available before or during participation-related use. It also explicitly states that no participation state, activity state, or profile state is changed by this interaction. For this reason, the conservative modeling decision is to treat community rules as **static application content** rather than as a dedicated managed data store. Therefore, the subgroup does **not** currently require a new store such as `DS-SM-003 Community Rules`, unless future requirements introduce administrative rule management or persistent rule-version logic.

#



V1.0



Safety and Moderation subgroup:

* View Community Rules
* Report User or Activity
* Review Report
* Block User

The output is structured to support context DFD, Level‑1 DFD, data dictionary, and CRUD matrix preparation.



**1. Owned Scope and Subgroup Boundary**

**Subgroup responsibility**

&#x20;Provide trust‑and‑safety mechanisms that allow students to understand community expectations, report inappropriate content or behaviour, block unwanted contact, and enable campus administrators to review reports and take moderation action.

**Boundary summary**

* **Inside subgroup**: Rule presentation, report submission, report review workflow, block relationship recording and enforcement.
* **Outside subgroup**: Activity creation, participation flows, messaging, profile management, notifications (except for constraints enforced by blocking).
* **Interfaces with adjacent subgroups**:
* **Discovery and Participation** – Block enforcement affects join requests and visibility (unresolved scope).
* **Hosting and Lifecycle** – Block enforcement may affect host‑participant interactions.
* **Notifications and System Flows** – Block enforcement may suppress notifications; report outcomes may trigger notifications (unresolved).
* **Access and Profile** – Reads student account/profile data for identification and enforcement.



**2. Key Business Events**

|          |                                                                                 |              |
| -------- | ------------------------------------------------------------------------------- | ------------ |
| EV‑SM‑01 | Student requests to view the community rules.                                   | Student      |
| EV‑SM‑02 | Student submits a report about a user or activity.                              | Student      |
| EV‑SM‑03 | Campus admin accesses the report review area.                                   | Campus Admin |
| EV‑SM‑04 | Campus admin selects a specific report for review.                              | Campus Admin |
| EV‑SM‑05 | Campus admin records a review outcome and optionally applies moderation action. | Campus Admin |
| EV‑SM‑06 | Student initiates block of another user.                                        | Student      |
| EV‑SM‑07 | Student confirms block action.                                                  | Student      |



**3. Proposed Logical Function Groups**

Based on event‑response analysis, the subgroup naturally decomposes into three logical function groups:

**FG‑SM‑1: Community Rules Access**

&#x20;Responds to EV‑SM‑01. Retrieves and presents community rule content.

**FG‑SM‑2: Report Handling**

&#x20;Responds to EV‑SM‑02 (submission), EV‑SM‑03/04/05 (review).

&#x20;Sub‑functions:

* Collect and validate report reason/details
* Persist submitted report
* Present report list to admin
* Display report details for review
* Record review outcome and moderation action

**FG‑SM‑3: Block Management**

&#x20;Responds to EV‑SM‑06/07.

&#x20;Sub‑functions:

* Validate block eligibility (no self‑block, no duplicate)
* Record block relationship
* Enforce block constraints across system interaction points



**4. Candidate Logical Processes**

Processes are derived from the function groups, merged where they share a common event‑response boundary.

|         |                             |                                                                                                                                                            |                              |                           |
| ------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------- |
| P‑SM‑01 | Provide Community Rules     | Retrieve and present the community rules content to the student.                                                                                           | EV‑SM‑01                     | FG‑SM‑1                   |
| P‑SM‑02 | Submit User/Activity Report | Accept report reason and details from student; validate completeness; create and store a report record.                                                    | EV‑SM‑02                     | FG‑SM‑2 (submission part) |
| P‑SM‑03 | Manage Report Review        | Present list of submitted reports to campus admin; allow selection and display of report details; record review outcome and any moderation action applied. | EV‑SM‑03, EV‑SM‑04, EV‑SM‑05 | FG‑SM‑2 (review part)     |
| P‑SM‑04 | Enforce Block Relationship  | Validate block request; record block relationship; apply interaction restrictions when queried by other processes (e.g., during join attempt, messaging).  | EV‑SM‑06, EV‑SM‑07           | FG‑SM‑3                   |

**Notes on process granularity**

* P‑SM‑02 and P‑SM‑03 are separate because they are triggered by different external entities (Student vs. Campus Admin) and operate on distinct timeframes.
* P‑SM‑04 is modelled as a service process that both creates block records and enforces them when called by other system processes. For DFD purposes, enforcement logic is internal; other processes query the block store.



**5. Candidate External Entities**

|       |              |                                                    |                                                                        |
| ----- | ------------ | -------------------------------------------------- | ---------------------------------------------------------------------- |
| EE‑01 | Student      | A registered student user of the app.              | Views rules; submits reports; initiates block.                         |
| EE‑02 | Campus Admin | An authorised administrator for a specific campus. | Accesses and reviews reports; records outcomes and moderation actions. |



**6. Candidate Logical Data Stores**

**Existing stores used** (from provided DS list):

|           |                     |                                                                                                                                             |                                                          |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| DS‑SM‑001 | Block Relationships | Stores block records between student pairs. Created/read by P‑SM‑04. Read by other processes (e.g., join, messaging) for enforcement.       | P‑SM‑04 (CRUD); P‑SM‑02, P‑SM‑03 (read‑only for context) |
| DS‑AP‑001 | Student Account     | Contains student identity and account status. Read to validate student existence and campus affiliation during report submission and block. | P‑SM‑02, P‑SM‑04 (read)                                  |
| DS‑AP‑002 | Student Profile     | Contains minimal profile data. Read for display in report details (reported user identity) and block confirmation.                          | P‑SM‑02 (read), P‑SM‑03 (read)                           |

**New logical store required (unresolved mapping):**

|                         |                |                                                                                                                                                    |                                          |
| ----------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| DS‑SM‑002 (Provisional) | Report Records | Stores submitted reports, including reporter, reported user/activity, reason, details, review status, review outcome, and moderation action trace. | P‑SM‑02 (create), P‑SM‑03 (read, update) |

**Reason for new store**

&#x20;No existing store in the provided list is designed to hold report‑specific data. Attempting to merge report records into DS‑SM‑001 (block relationships) or DS‑NS‑001 (notifications) would conflate distinct concepts and violate data integrity expectations. This is flagged as an unresolved point; the team must define a dedicated report store or explicitly merge it into an existing store with clear justification.



**7. Candidate Logical Data Flows**

Flows are described between external entities, processes, and data stores. Direction is indicated as *incoming* (to process), *outgoing* (from process), or *bidirectional* (for queries/responses).

|         |                           |                                                                    |                                                                      |
| ------- | ------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| F‑SM‑01 | Student → P‑SM‑01         | Request for community rules                                        | Triggers rule presentation.                                          |
| F‑SM‑02 | P‑SM‑01 → Student         | Community rules content                                            | Displayed in app.                                                    |
| F‑SM‑03 | Student → P‑SM‑02         | Report submission (target user/activity, reason, optional details) | Incoming report data.                                                |
| F‑SM‑04 | P‑SM‑02 → DS‑SM‑002       | New report record                                                  | Created upon successful submission.                                  |
| F‑SM‑05 | P‑SM‑02 → Student         | Submission confirmation                                            | Indicates report recorded.                                           |
| F‑SM‑06 | Campus Admin → P‑SM‑03    | Request to view report list / select report                        | Access to review area.                                               |
| F‑SM‑07 | P‑SM‑03 → DS‑SM‑002       | Query for report list / specific report details                    | Read operation.                                                      |
| F‑SM‑08 | DS‑SM‑002 → P‑SM‑03       | Report list / report details                                       | Response data.                                                       |
| F‑SM‑09 | P‑SM‑03 → Campus Admin    | Report list / report details                                       | Display for review.                                                  |
| F‑SM‑10 | Campus Admin → P‑SM‑03    | Review outcome, moderation action (optional)                       | Admin decision input.                                                |
| F‑SM‑11 | P‑SM‑03 → DS‑SM‑002       | Update report record (review status, outcome, action)              | Write operation.                                                     |
| F‑SM‑12 | Student → P‑SM‑04         | Block request (target user)                                        | Incoming block initiation.                                           |
| F‑SM‑13 | P‑SM‑04 → DS‑AP‑001       | Read student account (target existence, self‑block check)          | Validation.                                                          |
| F‑SM‑14 | DS‑AP‑001 → P‑SM‑04       | Account validation result                                          | Response.                                                            |
| F‑SM‑15 | P‑SM‑04 → DS‑SM‑001       | Create/read block relationship record                              | Write on confirm; read for duplicate check.                          |
| F‑SM‑16 | DS‑SM‑001 → P‑SM‑04       | Existing block status                                              | For duplicate prevention.                                            |
| F‑SM‑17 | P‑SM‑04 → Student         | Block confirmation or error message                                | Outcome of block action.                                             |
| F‑SM‑18 | Other processes → P‑SM‑04 | Query: "Is user A blocked by user B?"                              | Internal enforcement check (e.g., from Join Activity, Send Message). |
| F‑SM‑19 | P‑SM‑04 → DS‑SM‑001       | Read block relationship                                            | For query response.                                                  |
| F‑SM‑20 | DS‑SM‑001 → P‑SM‑04       | Block status                                                       | Return to calling process.                                           |

**Shared flows (cross‑subgroup)**

* F‑SM‑18 / F‑SM‑19 / F‑SM‑20 represent internal enforcement queries. These are not external flows but are critical for defining the interface between Safety & Moderation and other subgroups.



**8. Interface Notes to Adjacent Subgroups**

**Discovery and Participation**

* **Block enforcement**: When a student attempts to join/request to join an activity, the process must query P‑SM‑04 / DS‑SM‑001 to check for a block relationship. If a block exists in either direction, the join action must be prevented.
* **Unresolved**: Whether blocked users can see each other’s activities in the browse feed.

**Hosting and Lifecycle**

* **Join request management**: If a host blocks a user who has a pending join request, the host may still see the request and decline it manually. Auto‑decline is **not** assumed.
* **Unresolved**: Block effect on existing shared activity participation.

**Notifications and System Flows**

* **Notification suppression**: If a block exists, user‑initiated notification triggers (e.g., join request notification) should be suppressed for the blocked party.
* **Unresolved**: Whether system‑initiated notifications (e.g., activity cancellation) are still sent to a blocked participant.

**Access and Profile**

* Reads student account/profile data for identification in reports and block validation. No write operations.

### Workdoc update - report review data sufficiency

A clarification is needed regarding the relationship between report review and activity data. In the current MVP reading, the Campus Admin receives the information needed for moderation primarily through the submitted report record itself, not through a mandatory live read of the activity store. This interpretation is supported by the Review Report use case, which states that the system provides submitted reports including the reason and relevant report details, and then preserves the review outcome and decision trace consistently. Therefore, **DS-SM-002: Report Records** should be treated as the core store for the review workflow. A read from **DS-HL-001: Activities** is not required for the baseline review flow and should only be introduced if the team explicitly decides that the admin must also inspect the current live state of the reported activity in addition to the information already preserved in the report. 

### Workdoc update - community rules treated as static content

A second clarification concerns the logical treatment of community rules. At the current project stage, the subgroup includes **rule presentation**, but there is no evidence of a separate rule-management workflow, rule editing process, explicit acknowledgement mechanism, or rule versioning requirement. The View Community Rules use case only requires that the rules be accessible in the app, easy to read and understand, and available before or during participation-related use. It also explicitly states that no participation state, activity state, or profile state is changed by this interaction. For this reason, the conservative modeling decision is to treat community rules as **static application content** rather than as a dedicated managed data store. Therefore, the subgroup does **not** currently require a new store such as `DS-SM-003 Community Rules`, unless future requirements introduce administrative rule management or persistent rule-version logic.

# further mod

### Block enforcement scope clarification

The block mechanism is now clarified as **symmetric in practice**. Even if the block action is initiated by one student against another, once a block relationship exists between the two users, neither side may initiate further direct interaction with the other through system-supported interaction features. This means that the block must be enforced bidirectionally at interaction points such as activity join or join-request attempts, regardless of which side originally triggered the block.

### Effect on participation and visibility

If a block relationship is created while a join request is still pending between the two users, that pending request must be automatically declined. However, the block does **not** retroactively alter existing shared participation: if the two users are already part of the same activity, that participation remains unchanged and the block applies only to future direct interactions. Visibility is also refined conservatively: blocked users should not be able to open each other’s activity details, while feed visibility may remain only in already-involved contexts. Minimal profile access may still exist, but only in a very reduced form sufficient to signal that a block relationship exists.

### Relationship with notification logic

The block mechanism should **not** be modeled as a dedicated notification-suppression policy. Instead, its effect is upstream: because the block prevents the underlying user-to-user interaction from being initiated in the first place, the corresponding user-triggered notification events do not arise. For this reason, the Safety and Moderation subgroup should expose block-enforcement constraints to adjacent interaction flows, while Notifications and System Flow should not be given separate suppression behavior solely because of blocking.
