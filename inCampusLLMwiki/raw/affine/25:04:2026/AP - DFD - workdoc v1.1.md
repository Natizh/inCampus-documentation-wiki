# AP - DFD - workdoc v1.1

# AP - DFD workdoc

Prompt used:

```
You are the InCampus Architecture Analysis Assistant working in the current architecture-analysis phase.

Project context:
InCampus is a mobile app designed to help university students find low-pressure opportunities to share ordinary campus moments with nearby students. It is local, simple, believable, safe, and explicitly not a dating app. The current rollout focus is Tongji University, Jiading Campus.

Current phase:
The project has already completed use case analysis, use case narratives, and use case relationship review. We are now in the Lecture 9 architecture-analysis phase.

Your task in this session:
I will provide the narratives of the use cases belonging to one assigned subgroup/subsection. Your job is to analyze that material and produce a structured logical-analysis package that supports:
- functional decomposition
- structured analysis progression
- context DFD preparation
- Level-1 DFD preparation
- candidate logical data stores
- candidate logical data flows
- later consistency work for data dictionary and CRUD matrix

Important modeling constraints:
- Stay faithful to the current project material.
- Do not invent missing product behavior.
- If something is not fixed in the documentation, label it explicitly as one of:
  - Unresolved
  - Provisional
  - Assumption for modeling only
- Never silently turn uncertainty into fact.
- Keep the analysis logical, not technical.
- Focus on what work is performed, what data moves, what must be stored, what external entities interact with the system, and what business events trigger system behavior.
- Do not drift into APIs, controllers, services, implementation tables, backend design, deployment, or code architecture.
- Do not create one DFD process per use case.
  Use cases and subgrouping are only starting points for reasoning, not the final process structure.

Scope discipline:
Stay inside the approved MVP and only include behaviors grounded in the supplied material. If something appears outside MVP or is not clearly supported, do not include it as confirmed behavior.

Source hierarchy:
Use this priority order:
1. current project documents and supplied narratives
2. the explicit weekly task/instruction
3. Lecture 9 methodology
4. cautious inference

If sources seem inconsistent, do not guess silently. Call out the inconsistency and keep the analysis conservative.

Progression to follow:
Do not jump directly to a polished DFD.
Follow this reasoning sequence:
1. define the subgroup boundary and interfaces
2. identify key business events
3. derive logical function groups
4. identify candidate logical processes
5. identify candidate external entities
6. identify candidate logical data stores
7. identify candidate logical data flows
8. note dependencies with adjacent subgroup areas
9. label unresolved points clearly

Existing data stores:
Some proposed data stores already exist in the shared database/store list from the Campus Administration section. Reuse those stores whenever they are logically suitable. Do not create duplicates. If an existing store is similar but incomplete or slightly inaccurate for this subgroup, propose a modification instead of creating a new duplicate store.

What to do with the narratives:
Read all assigned use cases and their full narratives carefully. Your first goal is to understand:
- what event triggers the interaction
- who initiates it
- what the actor is trying to achieve
- how the system responds
- what data enters the system
- what data leaves the system
- what data must be read, created, updated, or deleted
- what exceptions, constraints, and conditions appear
- what adjacent subgroup interfaces are involved

Then transform the narrative material into a structured logical model.

Required output format:
Produce one coherent analysis package for the assigned subgroup with the following sections.

1. Owned scope and subgroup boundary
- define what is included in this subgroup
- define the main interfaces with adjacent subgroup areas
- state any scope ambiguity

2. Key business events
For each event, provide:
- event name
- trigger
- initiating actor or external entity
- goal / expected response
- notes from the narrative
- uncertainty label if needed

3. Proposed logical function groups
Group the behavior into a small set of logical function areas.
These are not final DFD process names yet, but they should help structure the reasoning.

4. Candidate logical processes
Identify candidate logical processes derived from the events and function groups.
For each process, provide:
- process name
- purpose
- main input data
- main output data
- main stores read
- main stores updated
- linked events/use cases
Important:
- do not force one process per use case
- merge or reorganize use cases when that produces a cleaner logical model

5. Candidate external entities
List the external actors/entities that interact with this subgroup and describe their logical interaction with the system.

6. Candidate logical data stores
For each store, provide:
- store ID if already available
- store name
- whether it is reused, modified, or newly proposed
- brief logical purpose
- key data logically contained
- why this subgroup needs it
If a store is only inferred and not confirmed by documentation, mark it clearly.

7. Candidate logical data flows
List the main logical flows in a structured way.
For each flow, provide:
- source
- destination
- flow name
- data content
- event/process context
Keep the flows logical, concise, and traceable to the narratives.

8. First rough DFD sketch (textual, not final diagram)
Provide a rough working sketch for the subgroup using textual arrows or step-by-step notation.
For each important event, show:
- trigger / external entity
- logical process involved
- store(s) read or updated
- resulting output or response
This is only a draft for reasoning clarity, not a polished final DFD.

9. Interface notes with adjacent areas
State where this subgroup depends on or exchanges data with other areas such as:
- Access and Profile
- Discovery and Participation
- Hosting and Lifecycle
- Safety and Moderation
- Notifications and System Flows
- Campus Administration
Only mention interfaces that are actually supported by the supplied material.

10. Unresolved points / Provisional points / Assumptions for modeling only
Create a dedicated section listing every uncertainty explicitly.
Do not hide gaps in evidence.

11. Consistency and mergeability check
End with a short review of:
- scope consistency
- naming consistency for processes, stores, and flows
- duplicate-store risk
- unsupported assumptions
- traceability back to the supplied narratives and project material
- readiness for later integration into context DFD, Level-1 DFD, data dictionary, and CRUD matrix

Output quality requirements:
- Be precise, conservative, and mergeable.
- Prefer structured reasoning over polished presentation.
- Do not rewrite the whole project vision.
- Do not solve the whole project from scratch.
- Do not present speculative behavior as confirmed.
- When evidence is weak, say so clearly.

When I send the subgroup narratives, start the analysis using this exact method.
```

in addition to the narratives of all the uc in the subgroup

***

# InCampus — Access and Profile Subgroup

## Explanatory Logical Modeling Note for Workflow and DFD Preparation

## Version Log

| Version | Date       | Section modified                     | Description of the change                                                                                                                                                        | Reason for the change                                                                                                                                                      | Source document used as reference                             |
| ------- | ---------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1.0     | 2026-04-24 | Whole document                       | Initial AP logical modeling note derived from the Access and Profile use-case narratives.                                                                                        | Establish the subgroup boundary, logical processes, data stores, and DFD preparation notes.                                                                                | AP use-case narratives / AP WorkDoc draft                     |
| 1.1     | 2026-04-24 | Sections 2, 6, 7, 8, 12, 14          | Reworded AP stores from “missing/proposed” stores to confirmed AP stores already stabilized in the current CRUD Matrix.                                                          | The CRUD Matrix now includes `DS-AP-001`, `DS-AP-002`, and `DS-AP-003` as final Access and Profile stores.                                                                 | CRUD Matrix                                                   |
| 1.1     | 2026-04-24 | Sections 5.4, 6.3, 9, 10, 11, 12, 13 | Added mandatory `DS-SM-001 Block Relationships` check for `View Student Minimal Profile`.                                                                                        | The CRUD Matrix defines minimal-profile viewing as a read of `DS-AP-002` plus a block check through `DS-SM-001`; blocked users must not view each other’s profile details. | CRUD Matrix; Final Merge and Integration                      |
| 1.1     | 2026-04-24 | Sections 5.3, 9, 11                  | Clarified that `Set Up Minimal Profile` and `Edit Minimal Profile` belong to the same profile lifecycle but have different CRUD behavior: setup creates, edit reads and updates. | The CRUD Matrix separates the two processes because their CRUD operations differ.                                                                                          | CRUD Matrix                                                   |
| 1.1     | 2026-04-24 | Sections 5.3, 9, 11                  | Removed the need to model a separate `DS-AP-001` read inside profile setup/edit; authenticated account context is treated as a precondition unless later explicitly modeled.     | The CRUD Matrix does not assign an `AP-001` read to `Set Up Minimal Profile` or `Edit Minimal Profile`.                                                                    | CRUD Matrix                                                   |
| 1.1     | 2026-04-24 | Sections 5.1, 11, 12                 | Kept the university verification mechanism abstract instead of treating it as a confirmed external integration.                                                                  | The business rule is confirmed, but the technical or organizational verification mechanism is still unresolved.                                                            | AP WorkDoc; project context                                   |
| 1.1     | 2026-04-24 | Sections 5.2, 7.1, 8, 12             | Flagged selected-campus storage as a remaining alignment issue: the CRUD operation updates `DS-AP-001`, while one store definition mentions campus selection under `DS-AP-002`.  | The WorkDoc must not silently resolve a contradiction inside higher-priority documentation.                                                                                | CRUD Matrix                                                   |
| 1.1     | 2026-04-24 | Section 11                           | Added explicit AP diagram correction notes.                                                                                                                                      | The AP diagram must stay coherent with the CRUD Matrix and Final Merge interpretation.                                                                                     | AP subgroup diagram; CRUD Matrix; Final Merge and Integration |

***

## 1. Why this document exists

This note records, in a single place, the reasoning adopted to analyse the **Access and Profile** subgroup during the architecture-analysis phase. Its purpose is not to jump directly to the final diagram, but to make explicit how the subgroup was read, delimited, decomposed, and connected to the rest of the system before drawing or updating the actual workflow.

For this reason, the document stays at a **logical level**. It does not discuss APIs, controllers, database implementation, deployment, or technical architecture. Instead, it reconstructs the work performed by the subgroup in terms of business events, persistent information, dependencies with adjacent areas, and candidate flows that support the AP workflow diagram and the integrated DFD package.

This corrected version also aligns the WorkDoc with the current documentation hierarchy. The **CRUD Matrix** is treated as the highest-priority source for final store names and CRUD behavior. The **Final Merge and Integration** document is treated as the second-highest-priority source for cross-subgroup interpretation. The AP subgroup diagram is used as supporting evidence and must be corrected where it conflicts with higher-priority documents.

The text is intentionally semi-discursive. The goal is not only to list outcomes, but also to preserve the reasoning behind them, so that later diagramming, CRUD review, and DFD integration remain consistent.

***

## 2. Material considered and reading strategy

The analysis was based first on the use-case narratives belonging to the subgroup and then checked against the current project artifacts, especially the CRUD Matrix, the Final Merge and Integration document, and the AP subgroup diagram.

The subgroup was reconstructed from the following use cases:

* **Sign Up with University Email**
* **Sign In**
* **Select Campus**
* **Set Up Profile**
* **Edit Profile**
* **View Student Minimal Profile**

The current confirmed store landscape includes the following relevant stores:

* **DS-CA-001: Campus Configuration / CampusStore**
* **DS-CA-002: Campus Structured Options / CampusOptionsStore**
* **DS-AP-001: Student Account / UserAccountStore**
* **DS-AP-002: Student Minimal Profile / UserProfileStore**
* **DS-AP-003: University Identity Rules / DomainRulesStore**
* **DS-SM-001: Block Relationships / BlockListStore**

The procedure adopted was deliberately progressive. The subgroup was not treated as a simple sum of use cases, because doing so would have produced one process per use case and a weak DFD. Instead, the narratives were read to understand what actually happens in this area of the product: what starts the interaction, which state is created or reused, what information must persist, and which parts of the subgroup are only interfaces toward other areas.

From that reading, the subgroup was reorganized into a smaller number of logical responsibilities. Only after that reorganization was it possible to decide which stores are reused, which stores are owned by AP, which stores are supporting checks from adjacent subgroups, and which flows matter most in the workflow diagram.

***

## 3. Subgroup boundary and internal coherence

The first result of the analysis is that the **Access and Profile** subgroup is internally coherent. The six use cases listed above are not isolated functions. Taken together, they describe a single logical area that manages three connected concerns.

The first concern is **admission into the system**. A student must be able to register using a university email, pass a verification step, and later sign in again through the verified account. This part of the subgroup establishes who is allowed to enter the app and under which conditions access is granted.

The second concern is **post-registration onboarding and affiliation**. Once a verified account exists, the system must determine the university from the email domain and bind the student to the correct campus. This is not a generic profile preference: it is a structural association that later determines which campus-local content the student will see.

The third concern is the **minimal profile lifecycle**. The subgroup creates the initial minimal profile, maintains it later, and exposes it in restricted form when another student is allowed to view it in a relevant activity context.

Seen in this way, the subgroup clearly includes:

* verified access control,
* account and campus onboarding,
* minimal profile creation and maintenance,
* restricted profile visibility in allowed contexts.

At the same time, the boundary of the subgroup becomes clearer. It does **not** own campus setup, activity management, moderation, or the whole join-management area. Those areas interact with it, but they are not part of its internal core logic.

This distinction matters for the workflow diagram and for the integrated DFD. If the subgroup boundary is respected, the final DFD can show where AP consumes data from adjacent areas and where adjacent areas consume AP-owned account/profile state, without silently absorbing external work into this subgroup.

***

## 4. Procedure adopted to derive the logical model

### 4.1 Reading the narratives as state-changing interactions

Each narrative was examined with the same questions in mind: what event starts the interaction, what information the actor provides, what state the system must already know, what state changes at the end, and which later use cases depend on that state.

This immediately showed an important pattern. Some use cases in the subgroup **create** a state for the first time, while others **reuse** or **expose** a state that already exists.

For example, **Sign Up with University Email** creates the verified-account state needed later by **Sign In**. **Set Up Profile** creates the minimal profile state needed later by **Edit Profile** and **View Student Minimal Profile**. **Select Campus** creates or updates the account-to-campus association that later affects other subgroups such as discovery and activity creation.

This state-based reading was useful because it prevented a superficial decomposition. Instead of drawing six unrelated islands, the subgroup could be understood as a progression from admission to onboarding to profile availability.

### 4.2 Separating core subgroup logic from external dependencies

The second step was to distinguish what this subgroup really performs from what it merely consumes.

A good example is **Select Campus**. The narratives say that the campuses offered to the student must already have been configured upstream. This means that the Access and Profile subgroup must read campus information, but it does not create campuses and does not manage campus structure.

The same pattern appears in **View Student Minimal Profile**. The subgroup owns the controlled display of minimal profile data, but the context in which profile viewing becomes relevant may belong to another area, such as pending join requests. In addition, the current CRUD Matrix requires a block check before profile exposure. Therefore, the AP subgroup reads `DS-SM-001 Block Relationships` as an enforcement check, but it does not own block creation or moderation policy.

This step was necessary because it clarified which data stores should be considered AP-owned, which ones are upstream configuration stores, and which ones are external enforcement/support stores.

### 4.3 Reorganizing the subgroup into logical responsibilities

After the narratives had been read in terms of state and dependency, the use cases were grouped into broader logical responsibilities.

The first responsibility is **verified access and account admission**, which includes sign-up, verification gating, and later sign-in.

The second is **campus affiliation during onboarding**, which binds the verified account to a concrete campus environment.

The third is **minimal profile lifecycle management**, which begins with the initial setup and continues with later editing.

The fourth is **restricted profile exposure**, meaning the controlled retrieval and display of minimal profile data only in allowed contexts and only if block rules allow access.

This reorganization does not erase the use cases. It simply prepares a better foundation for the workflow and for the future Level-1 DFD, where the model must stay readable and should not degenerate into one bubble per use case.

***

## 5. Results obtained from the subgroup analysis

### 5.1 Verified access and account admission

The registration narrative confirms that the system must accept a university email, reject unsupported or non-university domains, perform a verification step, activate the account only after successful verification, and derive the user’s university from the verified email domain.

The CRUD Matrix confirms that **Sign Up / Verify** reads `DS-AP-003`, creates the account in `DS-AP-001`, and later updates the account verification/activation state in `DS-AP-001`.

The sign-in narrative then confirms that later access depends on the existence of that verified account state. Sign-in is therefore not an isolated process. It is a downstream reuse of the state created during sign-up. The CRUD Matrix models **Sign In** as a read-only process over `DS-AP-001`; session or token handling is excluded from this logical DFD level.

The exact mechanism used for university verification remains abstract. The confirmed business rule is university-affiliation verification through supported domain rules. The WorkDoc should not treat a specific external university identity provider as confirmed unless the team explicitly decides it later.

### 5.2 Campus affiliation during onboarding

The campus-selection narrative shows that the subgroup must read the campuses associated with the derived university, present those options clearly, and store the selected campus on the student side.

This step is important because it is the point where onboarding stops being generic and becomes campus-specific. Downstream features such as activity feed scoping and campus-local options depend on the existence of this association.

The current CRUD Matrix models **Select Campus** as reading `DS-CA-001` and reading/updating `DS-AP-001`. Therefore, for this WorkDoc, selected campus should be described operationally as part of account/onboarding state in `DS-AP-001`.

There is still a documentation alignment issue: one CRUD Matrix store definition describes `DS-AP-002` as storing the student’s minimal public profile and campus selection. This conflicts with the CRUD row for **Select Campus**, which updates `DS-AP-001`. This WorkDoc does not silently resolve that contradiction. Until the team corrects the store definition, the process-level CRUD row is treated as the more precise source for operation behavior.

### 5.3 Minimal profile lifecycle

The profile-setup narrative shows that, after registration, the system must collect minimal profile information, validate it, and store it as the student’s profile. The edit-profile narrative then shows that this same state must later be retrievable, modifiable, and resubmittable without inventing a second independent profile domain.

The logical result is that setup and edit belong to the same profile lifecycle, but they must remain distinguishable for CRUD consistency:

* **Set Up Minimal Profile** creates a new profile record in `DS-AP-002`.
* **Edit Minimal Profile** reads and updates the existing profile record in `DS-AP-002`.

The current CRUD Matrix does not require a separate `DS-AP-001` read for either profile setup or profile edit. Therefore, the verified account should be treated here as an authenticated-context precondition, not as an additional modeled account-store read, unless the team later decides to represent authenticated context explicitly as a data-store access.

### 5.4 Restricted profile visibility

The final use case of the subgroup, **View Student Minimal Profile**, confirms that the profile is not only created and maintained but also exposed to other students in certain allowed contexts. One explicit confirmed context is the host’s review of pending join requests.

This means that profile viewing belongs in the subgroup, but only as a **controlled read** of the already existing minimal profile state. The process does not change profile data. Its role is to retrieve and display the minimum necessary information without exposing more than the project currently allows.

The corrected interpretation is that profile viewing requires two reads:

* `DS-AP-002 Student Minimal Profile`, to retrieve the profile data;
* `DS-SM-001 Block Relationships`, to check whether a block relationship prevents profile exposure.

If a block relationship exists between the requesting student and the target student, the profile view must be denied. This closes the earlier ambiguity around whether blocking affects only direct interaction or also profile visibility.

***

## 6. Relationship with confirmed data stores

### 6.1 Reuse of DS-CA-001: Campus Configuration / CampusStore

This store is directly relevant and should be reused by the subgroup.

Its current function already makes it the natural upstream source for campus selection because it holds the core configuration details of each campus, including the associated university and activation status. For the Access and Profile subgroup, this is exactly the information needed to answer the question: which campuses can be shown to this student once the university has been determined from the verified email domain?

In other words, **Select Campus** should read from **DS-CA-001**. It does not create or update this store. It depends on it.

This choice is also important for later consistency. Reusing this store avoids duplicating campus-configuration logic inside the Access and Profile subgroup and keeps ownership of campus setup where it belongs.

### 6.2 Limited relevance of DS-CA-002: Campus Structured Options / CampusOptionsStore

This store should not be treated as a core store of the subgroup.

Its current description makes it clear that it is mainly about predefined campus-specific options such as activity categories and valid campus locations. Those data are central to activity creation, discovery, and similar flows, not to admission, onboarding, or profile lifecycle.

The store does have an indirect downstream connection to the subgroup: once a student is associated with a campus, other areas will later know which campus-structured options to use. However, that is not a reason to pull **DS-CA-002** into the Access and Profile core model.

For the future DFD merge, this distinction is useful. The subgroup needs to show that selected campus information becomes an input to other areas, not that the subgroup itself owns the options used there.

### 6.3 Supporting read of DS-SM-001: Block Relationships / BlockListStore

`DS-SM-001` is not owned by Access and Profile, but it must be read by the **View Student Minimal Profile** process.

This read is not moderation ownership. It is an access-control/enforcement check. The AP subgroup still owns the minimal profile data, while Safety and Moderation owns the block relationship truth. The corrected AP model must therefore show `DS-SM-001` as a supporting store for profile visibility.

***

## 7. Confirmed AP stores used by the subgroup

Earlier versions of this WorkDoc described the AP stores as missing or proposed because the subgroup analysis originally revealed them before the integrated store set was stabilized. This is now outdated. The CRUD Matrix confirms these stores as part of the final data-store set.

### 7.1 DS-AP-001: Student Account / UserAccountStore

`DS-AP-001` is the persistent account store for student identity and access state.

The subgroup needs this store to hold, at minimum, the student’s university email, verification status, activation state, platform access status, and selected campus association according to the current CRUD operation row for **Select Campus**. These are not optional details. They are the minimum persistent information required to keep sign-up, sign-in, and campus selection logically connected.

Without this store, sign-up would have nowhere stable to create the verified account, sign-in would have nowhere to read it from, and campus selection would have nowhere to record the chosen campus on the student side.

Current unresolved alignment note: one store definition also mentions campus selection under `DS-AP-002`. The process behavior should follow the CRUD row for now, while the team should later correct the store definition if needed.

### 7.2 DS-AP-002: Student Minimal Profile / UserProfileStore

`DS-AP-002` is the persistent store for minimal profile data.

The subgroup needs a place where the initial profile setup can create the minimal profile, where edit profile can retrieve and update it, and where profile viewing can later read it in controlled contexts.

The narratives do not yet define the exact profile fields in detail, and the analysis does not invent them. Still, the need for the store itself is confirmed. The lifecycle exists even if some field details remain unresolved.

### 7.3 DS-AP-003: University Identity Rules / DomainRulesStore

`DS-AP-003` holds the university identity rules used during registration, such as supported university email domains and the corresponding university association.

This store is read during **Sign Up / Verify** so that the system can validate whether the provided email belongs to a supported university and determine which university should be linked to the student account.

The exact technical verification mechanism remains unresolved, but the domain-rule store is confirmed at the logical DFD/CRUD level.

***

## 8. Current database-table entries for Access and Profile

The following records should be treated as the current Access and Profile entries in the shared data-store set. They are no longer merely “missing stores revealed by the analysis”; they are confirmed AP stores in the current CRUD Matrix.

| Store ID and name                                           | Subgroup           | Status    | Brief logical function                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------- | ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DS-AP-001: Student Account / UserAccountStore**           | Access and Profile | Confirmed | Holds core account and access data for each student user, including university email, verification status, account activation/platform access state, and selected campus association according to the current process-level CRUD row. It is created or updated during sign-up/verification and read during sign-in. It is also updated during campus selection. |
| **DS-AP-002: Student Minimal Profile / UserProfileStore**   | Access and Profile | Confirmed | Contains the minimal profile information associated with a student account. It is created during initial profile setup, later read/updated during profile editing, and read during controlled minimal-profile viewing.                                                                                                                                          |
| **DS-AP-003: University Identity Rules / DomainRulesStore** | Access and Profile | Confirmed | Holds university-domain validation rules used during registration. It is read during sign-up/verification to validate supported university domains and derive the associated university.                                                                                                                                                                        |

***

## 9. Logical process structure that will matter for the workflow diagram

The workflow diagram should not reproduce the subgroup as six separate isolated use-case lanes. The analysis suggests a more coherent structure, but the CRUD distinctions must remain visible.

| Logical process                  | Main purpose                                                                           | Stores read                               | Stores created/updated | CRUD alignment note                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------- |
| **Sign Up / Verify**             | Admit a student into the system through university-domain validation and verification. | `DS-AP-003`                               | `DS-AP-001`            | Reads domain rules, creates account, updates verification/activation state.                         |
| **Sign In**                      | Allow later access based on verified account state.                                    | `DS-AP-001`                               | None                   | Logical read only; session/token handling excluded from this DFD level.                             |
| **Select Campus**                | Bind a verified account to one configured campus.                                      | `DS-CA-001`, `DS-AP-001`                  | `DS-AP-001`            | Current CRUD row updates account-side campus association. Store-definition ambiguity remains noted. |
| **Set Up Minimal Profile**       | Create the student’s initial minimal profile.                                          | None modeled beyond authenticated context | `DS-AP-002`            | Creates the profile record. No separate `DS-AP-001` read is required by the current CRUD Matrix.    |
| **Edit Minimal Profile**         | Maintain the existing minimal profile.                                                 | `DS-AP-002`                               | `DS-AP-002`            | Reads and updates the profile record.                                                               |
| **View Student Minimal Profile** | Expose minimal profile data in allowed contexts only.                                  | `DS-AP-002`, `DS-SM-001`                  | None                   | Read-only profile exposure; must be denied if block rules prevent visibility.                       |

The subgroup begins with **account admission**. A student submits registration data, the system checks university eligibility, a verification outcome is produced, and the account becomes valid only after that outcome succeeds.

From there, the flow moves into **onboarding affiliation**. The system uses the university information to retrieve possible campuses from the configured-campus store and then records the selected campus as part of the student’s account state according to the current CRUD row.

A parallel but connected branch covers the **minimal profile lifecycle**. Once the verified account exists, the profile can be created. Later, the same stored profile can be edited. This is a maintenance branch of an already established state, not a separate isolated subsystem.

A final read-only branch covers **context-limited profile viewing**. When another student requests to see a minimal profile in a valid context, the system retrieves the profile from its store, checks the block relationship store, and exposes only the allowed subset if access is permitted.

This progression can be summarized as follows:

1. **Registration creates account eligibility and verified access state.**
2. **Campus selection binds the account to one configured campus.**
3. **Profile setup creates the student’s minimal profile.**
4. **Profile edit maintains that same stored profile.**
5. **Profile view reads the stored profile in a restricted context after block-check validation.**

***

## 10. Main data dependencies and crossings with other subgroups

One of the most useful outcomes of the analysis is the clarification of where this subgroup touches the rest of the system.

The strongest upstream dependency is with **Campus Administration**. The subgroup needs already configured campuses and should therefore read campus configuration rather than create its own campus data.

The strongest downstream dependency is with the **activity-related area**. Once a student has a selected campus, other subgroups can scope the activity feed and campus-specific options accordingly.

Another important downstream dependency is with **join-request management**. The profile-viewing use case confirms that a host may inspect the minimal profile of a requesting student while reviewing participation requests.

A further cross-subgroup dependency is with **Safety and Moderation**. The AP subgroup must consume block relationship data when deciding whether a minimal profile can be displayed to another student. This does not transfer block ownership to AP; it only enforces visibility rules using the block truth owned by Safety and Moderation.

These dependencies suggest an important implementation-neutral principle for the future integrated DFD: the Access and Profile subgroup should export stable states rather than absorb adjacent logic. The stable exported states are, above all:

* verified student account,
* selected campus association,
* available minimal profile subject to visibility constraints.

Those states are what other subgroups will later consume.

***

## 11. AP diagram alignment notes

The current AP diagram is useful as a supporting diagram, but it should be updated to stay consistent with the CRUD Matrix and Final Merge interpretation.

The following corrections should be applied when the AP diagram is revised:

1. **Profile setup and profile edit should not be represented as one undifferentiated CRUD action.** They may remain visually grouped as a lifecycle area, but the diagram or its labels must distinguish setup as profile creation and edit as profile read/update.
2. **The profile setup/edit branch should not show an explicit&#x20;****`DS-AP-001`****&#x20;read unless the team decides to model authenticated context as a store read.** According to the current CRUD Matrix, profile setup creates `DS-AP-002`, and profile edit reads/updates `DS-AP-002`.
3. **View Student Minimal Profile must read&#x20;****`DS-SM-001 Block Relationships`****.** The diagram should show a block-check input before the limited profile display is returned.
4. **The university verification mechanism should be labeled as abstract or unresolved.** The business rule is confirmed, but a concrete external university identity integration is not confirmed.
5. **Campus selection should read&#x20;****`DS-CA-001`****&#x20;and update&#x20;****`DS-AP-001`****&#x20;according to the current CRUD row.** The separate ambiguity in the store definition should remain documented rather than silently fixed inside the diagram.

***

## 12. Open points that should remain explicit before diagramming

A few points remain open and should stay open rather than being silently fixed in the workflow diagram.

The exact mechanism used for university verification is still abstract in the project material. The business rule is clear, but the technical or organizational form of verification is not fully fixed.

The exact minimal profile fields are also not fully specified. The subgroup clearly requires a minimal profile store, but the diagram should not pretend that the full field structure is already finalized.

The exact ordering between **Select Campus** and **Set Up Profile** inside onboarding is not completely fixed either. The current logical analysis is compatible with both being part of the same onboarding area, but the final ordered workflow may still depend on a team decision.

The complete set of contexts in which profile viewing is allowed is not yet fully enumerated. One explicit confirmed case exists — pending join requests — but the workflow should remain careful not to overstate further contexts as already confirmed.

The selected-campus storage description still needs cleanup across documents. The current process-level CRUD behavior updates `DS-AP-001`, while one data-store definition says `DS-AP-002` stores campus selection. Until the team corrects this, the WorkDoc follows the process-level CRUD row for process behavior and marks the store-definition wording as an alignment issue.

The block effect on minimal-profile viewing is **not** open anymore. It is now closed: blocked users cannot view each other’s profile details.

***

## 13. Information especially useful for the future all-together DFD merge

When the subgroup diagrams are merged later, the most important thing will not be visual prettiness but consistency. This note already highlights a few elements that will matter during that merge.

First, the **ownership of stores** should remain clear. Campus configuration belongs upstream and should not be duplicated inside Access and Profile. Student account and minimal profile remain clearly owned by this subgroup. Block relationships remain owned by Safety and Moderation, even when AP reads them for profile-visibility enforcement.

Second, the **naming of exported states** should remain stable. If the later DFDs refer to verified account, selected campus, and minimal profile using different names in different subgroup diagrams, the integrated model will become much harder to reconcile.

Third, the **direction of dependencies** should remain explicit. For example, the Access and Profile subgroup consumes campus configuration from Campus Administration, activity-related subgroups consume campus association from Access and Profile, and AP consumes block relationship truth from Safety and Moderation when deciding profile visibility.

Fourth, the subgroup provides a good example of why logical modeling should stay separate from implementation. The future system may eventually have sessions, tokens, auth providers, and many technical details, but the integrated DFD should still be centered on the business-level work and data movement already established here.

Fifth, the final integrated DFD should preserve the interpretation that AP is the stable source of account and minimal-profile truth. It should not let Notifications, Discovery, or Safety duplicate AP-owned business truth.

***

## 14. Compact concluding view

The analysis shows that the **Access and Profile** subgroup is not simply a collection of small entry screens. It is the area that establishes who may enter the system, to which campus context that user belongs, and what minimal identity information will later be available in trust-sensitive activity contexts.

The subgroup reuses **DS-CA-001: Campus Configuration / CampusStore** as the upstream campus source. **DS-CA-002: Campus Structured Options / CampusOptionsStore** remains outside the subgroup core because it mainly supports activity categories and meeting-point validation in activity-related flows.

The subgroup owns three confirmed AP stores: **DS-AP-001: Student Account / UserAccountStore**, **DS-AP-002: Student Minimal Profile / UserProfileStore**, and **DS-AP-003: University Identity Rules / DomainRulesStore**. These should no longer be described as merely missing or proposed stores.

The corrected model also includes **DS-SM-001: Block Relationships / BlockListStore** as a required supporting read for minimal-profile viewing. This closes the profile-visibility ambiguity: blocked users must not be able to view each other’s profile details.

The remaining points are limited and explicit: the exact university verification mechanism, the exact minimal profile fields, the exact onboarding order between campus selection and profile setup, the complete list of allowed profile-viewing contexts, and the cross-document wording issue about whether selected campus belongs in `DS-AP-001` or `DS-AP-002`.

With these corrections, the AP WorkDoc is coherent enough to support the AP workflow update, the integrated DFD merge, the data dictionary, and the CRUD Matrix review.
