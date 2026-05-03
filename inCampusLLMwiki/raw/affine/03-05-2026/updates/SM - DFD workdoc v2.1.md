# SM - DFD workdoc v2.1

# SM - DFD WorkDoc

# InCampus — Safety and Moderation Subgroup

## Version Log

| Version | Date       | Author  | Section modified                               | Description of change                                                                                                                                                                                                                                                                                                                   | Reason for change                                                                                           | Source document used as reference                             |
| ------- | ---------- | ------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `1.0`   | 2026-04-20 | Team    | Full document                                  | Initial Safety and Moderation DFD workdoc drafted from subgroup use cases.                                                                                                                                                                                                                                                              | First logical modeling draft for rules, reports, review, and block behavior.                                | SM use-case narratives                                        |
| `1.1`   | 2026-04-22 | Gemini  | Report review boundary                         | Clarified that `Review Report` records moderation outcomes in `DS-SM-002` and triggers native AP/HL workflows for bans or activity removals instead of directly owning AP/HL updates.                                                                                                                                                   | Aligns moderation with domain ownership boundaries.                                                         | CRUD Matrix v1.1                                              |
| `2.0`   | 2026-04-24 | team    | Community rules, report review, block behavior | Clarified that community rules are static content, confirmed `DS-SM-002` as the report store, and resolved block visibility and pending-request effects.                                                                                                                                                                                | Closed earlier unresolved points and improved mergeability.                                                 | SM subgroup diagram V2, CRUD Matrix                           |
| `2.1`   | 2026-04-24 | ChatGPT | Full WorkDoc cleanup and alignment             | Removed duplicated old V1 content; aligned process names, stores, and CRUD effects with the current CRUD Matrix; corrected the notification interface so NSF reads `DS-SM-001` to suppress cross-user notifications; clarified conditional HL interaction for pending requests; preserved unresolved implementation details explicitly. | The WorkDoc must follow the current CRUD Matrix and remain coherent with NSF/D\&P/HL integration decisions. | CRUD Matrix, Final Merge and Integration, SM subgroup diagram |

***

## 1. Purpose of this document

This WorkDoc records the logical analysis of the **Safety and Moderation** subgroup for workflow and DFD preparation. It explains what this subgroup owns, which stores it creates or updates, which stores it reads from other domains, and which adjacent subgroup interfaces must be respected during integration.

The document stays at a logical level. It does not define APIs, controllers, database schema, moderation dashboards, push-notification implementation, or administrative authentication mechanics.

***

## 2. Material considered and source priority

This revision treats the following sources in this priority order:

1. **CRUD Matrix** — highest priority.
2. **Final Merge and Integration document** — second-highest priority.
3. **SM subgroup diagram** — supporting reference.
4. **Original SM WorkDoc** — corrected where needed.

The subgroup includes four use cases:

* **View Community Rules**
* **Report User or Activity**
* **Review Report**
* **Block User**

The confirmed MVP trust-and-safety scope remains:

* rules,
* report,
* block,
* manual campus-admin review.

***

## 3. Owned scope and subgroup boundary

### 3.1 Subgroup responsibility

The **Safety and Moderation** subgroup provides the MVP trust-and-safety mechanisms that allow students to understand community expectations, report inappropriate users or activities, block unwanted interaction, and allow campus administrators to review reports and record moderation outcomes.

### 3.2 Inside the subgroup

The subgroup owns:

* presentation of community rules as static app content;
* creation of report records;
* review and outcome recording for submitted reports;
* creation and lookup of block relationships;
* exposure of block-state information to adjacent flows that must enforce blocking.

### 3.3 Outside the subgroup

The subgroup does **not** own:

* activity creation;
* activity lifecycle changes;
* participation-state management;
* profile creation or editing;
* user-account lifecycle;
* notification record creation;
* physical deletion of activities or participations.

When moderation decisions affect other domains, the Safety and Moderation subgroup records the decision and triggers the relevant native workflow. It does not directly take ownership of those domains.

***

## 4. Key business events

| Event ID   | Event                                                                 | Initiating actor | Logical response                                                                    |
| ---------- | --------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------- |
| `EV-SM-01` | Student requests community rules.                                     | Student          | System presents static community rules content.                                     |
| `EV-SM-02` | Student submits a report about a user or activity.                    | Student          | System validates reporter/target context and creates a report record.               |
| `EV-SM-03` | Campus Admin accesses report review area.                             | Campus Admin     | System provides report list from report records.                                    |
| `EV-SM-04` | Campus Admin selects a specific report.                               | Campus Admin     | System provides report details and relevant target context.                         |
| `EV-SM-05` | Campus Admin records a review outcome and optional moderation action. | Campus Admin     | System updates the report record and, if required, triggers AP/HL native workflows. |
| `EV-SM-06` | Student initiates a block request.                                    | Student          | System validates target and existing block state.                                   |
| `EV-SM-07` | Student confirms block action.                                        | Student          | System creates the block relationship and exposes the block state for enforcement.  |

***

## 5. Proposed logical function groups

### 5.1 `FG-SM-1` — Community Rules Access

This group covers the read-only presentation of community rules. At the current project stage, rules are treated as static application content, not as a separate managed data store.

### 5.2 `FG-SM-2` — Report Handling

This group covers:

* collecting report reason and details;
* validating reporter/target context;
* creating a report record;
* allowing Campus Admin review;
* recording review status, outcome, and moderation-action trace.

### 5.3 `FG-SM-3` — Block Management and Enforcement Interface

This group covers:

* validating block eligibility;
* preventing self-block and duplicate block records;
* creating block relationships;
* exposing block status to adjacent processes such as browsing, activity details, join, profile exposure, and notification resolution.

***

## 6. Candidate logical processes aligned with the CRUD Matrix

| Process ID | Process name                      | Purpose                                                                                                         | Main stores read                                   | Main stores updated                                                     | CRUD alignment note                                                                                                                                                 |
| ---------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `P-SM-01`  | View Community Rules              | Present community rules to the student.                                                                         | None modeled as persistent store.                  | None.                                                                   | No `DS-SM-003` is introduced. Rules are static content at MVP level.                                                                                                |
| `P-SM-02`  | Submit Report                     | Accept report target, reason, and details; validate reporter and relevant target context; create report record. | `DS-AP-001`, `DS-AP-002`                           | `DS-SM-002`                                                             | Matches CRUD: `R` on AP stores, `C` on `DS-SM-002`.                                                                                                                 |
| `P-SM-03`  | Review Report                     | Let Campus Admin inspect reports, record review outcome, and register moderation actions.                       | `DS-AP-001`, `DS-AP-002`, `DS-HL-001`, `DS-SM-002` | `DS-SM-002`                                                             | Matches CRUD: `Review Report` updates only the report store; AP/HL effects are routed to native processes.                                                          |
| `P-SM-04`  | Block User and Expose Block State | Validate target, create/read block relationship, and expose block state for enforcement.                        | `DS-AP-001`, `DS-AP-002`, `DS-SM-001`              | `DS-SM-001`; conditional trigger toward HL for pending-request handling | Matches CRUD: `CR` on `DS-SM-001`; pending-request effect must be interpreted as a branch effect routed through HL ownership, not as SM owning participation state. |

***

## 7. Candidate external entities

| Entity                        | Role in this subgroup                                                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Student                       | Views community rules, submits reports, initiates block actions.                                                                       |
| Campus Admin                  | Reviews submitted reports and records moderation outcomes.                                                                             |
| Discovery and Participation   | Reads block state to filter feeds, prevent activity-detail access, and prevent join/request interactions.                              |
| Hosting and Lifecycle         | Receives native workflow triggers when moderation decisions require activity deletion or when block handling affects pending requests. |
| Notifications and System Flow | Reads block state to suppress cross-user notifications where required by the integrated architecture.                                  |
| Access and Profile            | Provides account/profile context and owns user-account consequences such as bans or suspensions.                                       |

***

## 8. Candidate logical data stores

### 8.1 `DS-SM-001` — BlockListStore / Block Relationships

**Status:** owned by Safety and Moderation.

This store contains user-to-user block relationships. The relationship is initiated by one student, but its enforced effect is reciprocal in practice: once a block exists between two users, both sides are restricted from supported direct interaction paths.

Used by:

* `Block User` for create/read operations;
* D\&P processes for feed, activity-detail, and join checks;
* AP profile exposure for profile-access checks;
* NSF notification processes for cross-user notification suppression.

### 8.2 `DS-SM-002` — ReportStore / Report Records

**Status:** owned by Safety and Moderation.

This store contains submitted reports and review outcomes, including:

* reporter reference;
* reported user and/or reported activity reference;
* report reason;
* optional report details;
* review status;
* review outcome;
* moderation-action trace.

It is created by report submission and read/updated by report review.

### 8.3 `DS-AP-001` — UserAccountStore / Student Account

**Status:** reused upstream store from Access and Profile.

Used to validate reporter and target account existence, campus affiliation, active status, and moderation consequences when admin outcomes involve suspension or ban. Safety and Moderation reads it but does not own it.

### 8.4 `DS-AP-002` — UserProfileStore / Student Profile

**Status:** reused upstream store from Access and Profile.

Used for minimal target identity display during report submission/review and block confirmation. Safety and Moderation reads it but does not own it.

### 8.5 `DS-HL-001` — ActivityStore / Activities

**Status:** reused upstream store from Hosting and Lifecycle.

Used during report review when the report concerns an activity and the Campus Admin needs current activity context. Activity deletion or lifecycle updates remain native HL responsibilities.

### 8.6 `DS-HL-002` — ParticipationStore / Activity Participations

**Status:** adjacent HL store; conditional interface only.

The block process may cause a pending-request consequence, but Safety and Moderation should not own participation-state mutation. Any pending-request auto-decline/removal must be represented as a trigger to the native HL participation-management workflow.

### 8.7 No `DS-SM-003 Community Rules` store

At the current MVP stage, community rules are static content. There is no confirmed rule-editing workflow, rule acknowledgement, rule versioning, or admin rule-management requirement. Therefore, no dedicated community-rules data store is introduced.

***

## 9. Candidate logical data flows

| Flow ID   | Source → Destination                            | Flow name                          | Data content                                                     | Context                    |
| --------- | ----------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------- | -------------------------- |
| `F-SM-01` | Student → `P-SM-01`                             | Rules request                      | Request to view community rules                                  | View Community Rules       |
| `F-SM-02` | `P-SM-01` → Student                             | Rules content                      | Static rule content                                              | View Community Rules       |
| `F-SM-03` | Student → `P-SM-02`                             | Report submission                  | Target reference, report reason, optional details                | Submit Report              |
| `F-SM-04` | `P-SM-02` → `DS-AP-001`                         | Reporter/target account validation | Reporter reference, target user reference when applicable        | Submit Report              |
| `F-SM-05` | `P-SM-02` → `DS-AP-002`                         | Target profile context             | Minimal target identity when target is a user                    | Submit Report              |
| `F-SM-06` | `P-SM-02` → `DS-SM-002`                         | New report record                  | Reporter, target, reason, details, status = submitted            | Submit Report              |
| `F-SM-07` | `P-SM-02` → Student                             | Submission confirmation            | Report recorded confirmation                                     | Submit Report              |
| `F-SM-08` | Campus Admin → `P-SM-03`                        | Report review request              | Request list/select report                                       | Review Report              |
| `F-SM-09` | `P-SM-03` ↔ `DS-SM-002`                         | Report list/details                | Submitted report data and review state                           | Review Report              |
| `F-SM-10` | `P-SM-03` → `DS-AP-001` / `DS-AP-002`           | Reported user context              | Account/profile context when report concerns a user              | Review Report              |
| `F-SM-11` | `P-SM-03` → `DS-HL-001`                         | Reported activity context          | Activity context when report concerns an activity                | Review Report              |
| `F-SM-12` | Campus Admin → `P-SM-03`                        | Review outcome                     | Outcome, notes, optional moderation action                       | Review Report              |
| `F-SM-13` | `P-SM-03` → `DS-SM-002`                         | Updated report record              | Review status, outcome, action trace                             | Review Report              |
| `F-SM-14` | `P-SM-03` → AP/HL native process                | Moderation action trigger          | Ban/suspend user or delete activity request                      | Review Report consequence  |
| `F-SM-15` | Student → `P-SM-04`                             | Block request                      | Target user reference                                            | Block User                 |
| `F-SM-16` | `P-SM-04` → `DS-AP-001` / `DS-AP-002`           | Block validation context           | Target existence, self-block prevention, minimal target identity | Block User                 |
| `F-SM-17` | `P-SM-04` ↔ `DS-SM-001`                         | Block relationship check/create    | Existing block state; new block relationship                     | Block User                 |
| `F-SM-18` | `P-SM-04` → Student                             | Block result                       | Confirmation or error                                            | Block User                 |
| `F-SM-19` | `P-SM-04` → HL native process                   | Pending request effect trigger     | User pair and relevant pending-request context when applicable   | Block consequence          |
| `F-SM-20` | D\&P/AP/NSF → `DS-SM-001` or SM block interface | Block-state query                  | User pair / trigger-recipient pair                               | Cross-subgroup enforcement |
| `F-SM-21` | `DS-SM-001` → D\&P/AP/NSF                       | Block-state result                 | Exists / does not exist                                          | Cross-subgroup enforcement |

***

## 10. Interface notes with adjacent subgroup areas

### 10.1 Discovery and Participation

D\&P must read/check block relationships when constructing feeds, opening activity details, and processing join/request actions.

Confirmed rule:

* blocked users cannot see each other's activities in feeds;
* blocked users cannot access each other's activity details;
* blocked users cannot view each other's profile details;
* blocked users cannot initiate new join/request interactions with each other.

### 10.2 Hosting and Lifecycle

HL remains the owner of activity state and participation state. SM can trigger HL when a block relationship affects pending requests, but SM should not directly own participation-state mutation.

Confirmed rule:

* if a block relationship is created while a relevant join request is still pending, that pending request must be resolved by the HL-native flow;
* existing shared participation is not retroactively removed by the block;
* future direct interactions are prevented.

### 10.3 Notifications and System Flow

NSF remains the owner of notification records and notification delivery consequences. SM owns only the block relationship store.

Confirmed rule:

* all cross-user notifications such as join events, withdrawal events, leave events, application outcomes, and cancellation notifications must check `DS-SM-001` and be suppressed if a block relationship exists between the trigger user and the recipient.

This is not modeled as SM creating or deleting notifications. It is modeled as NSF using block state as an access/suppression condition.

### 10.4 Access and Profile

AP provides student account and minimal profile context to SM. If report review results in a user ban or suspension, SM records the moderation decision in `DS-SM-002` and triggers the AP-native account-status workflow. SM does not directly own `DS-AP-001` updates.

***

## 11. Open points and assumptions

### 11.1 Admin authorization mechanism

The WorkDoc assumes the Campus Admin is already authorized to review reports. The exact admin authentication and authorization mechanism remains outside this subgroup analysis.

### 11.2 Exact report payload schema

`DS-SM-002` is confirmed, but the exact schema of report details, evidence fields, review notes, and action trace is not finalized.

### 11.3 Exact handling of pending request after block

The architectural decision is that block creation may affect pending requests and that HL owns the resulting participation-state mutation. The exact HL-native representation — for example whether the pending request is auto-declined, deleted, or marked as blocked/invalid — should be kept consistent with the HL WorkDoc.

### 11.4 Community rules management

Rules are static content for the MVP. If future requirements introduce admin-editable rules, acknowledgements, or rule versioning, a new managed rule store may be needed. It is not needed now.

***

## 12. Diagram impact

The SM subgroup diagram does **not** require a full structural redesign. Its core structure — Student, Campus Admin, four SM processes, `DS-SM-001`, `DS-SM-002`, and reused AP stores — remains valid.

However, one diagram note should be updated for consistency:

* The diagram should not say that the only concrete adjacent-subgroup interface is Discovery and Participation. Notifications and System Flow is also a confirmed adjacent consumer of block state because cross-user notifications must check `DS-SM-001` before delivery.

Recommended small diagram adjustment, if the diagram is edited later:

* add `NSF[Notifications and System Flow]` as an adjacent external system;
* add `NSF -->|Block check for cross-user notifications| P4` or directly to `DS-SM-001` depending on the diagram style;
* add `P4 -->|Block status / notification suppression condition| NSF`.

This is a minor integration correction, not a redesign.

***

## 13. Consistency and mergeability check

The Safety and Moderation subgroup is now mergeable with the current architecture under these rules:

* `DS-SM-001` is the single source of truth for block relationships.
* `DS-SM-002` is the single source of truth for submitted reports and review outcomes.
* Community rules remain static content and do not create a new store.
* Review Report does not directly mutate AP or HL stores; it records the outcome and triggers native workflows where necessary.
* Block state is enforced across D\&P, AP profile exposure, and NSF notification resolution.
* Existing shared participation is not retroactively removed by blocking; pending requests are handled through HL ownership.

The main structural principle to preserve in the final merged DFD is:

> Safety and Moderation owns trust-and-safety records and decisions; adjacent subgroups own the operational consequences in their own domains.
