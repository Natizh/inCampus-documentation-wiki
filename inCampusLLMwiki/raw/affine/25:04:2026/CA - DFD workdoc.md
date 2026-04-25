# CA - DFD workdoc

# Campus Administration Subgroup

## Explanatory Logical Modeling Note for Workflow and DFD Preparation

## 1. Why this document exists

This note records the reasoning adopted to analyze the **Campus Administration** subgroup during the architecture-analysis phase. Its purpose is to explicitly define how the subgroup was read, delimited, decomposed, and connected to the rest of the system before finalizing the workflow diagram.

Because this subgroup acts as the foundational data provider for much of the application, it is critical to stay at a **logical level**. We are defining how administrative configuration enters the system, where it persists, and how it becomes available to other domains like student onboarding and activity creation.

***

## 2. Material considered and reading strategy

The analysis is based on the use-case narratives and logical workflow breakdowns belonging to the subgroup:

* **Configure New Campus**
* **Manage Campus Structured Options**

The analysis also formally establishes the two logical stores that this subgroup owns and maintains:

* **DS-CA-001: Campus Configuration**
* **DS-CA-002: Campus Structured Options**

The procedure adopted was to read the administrative functions not as isolated data-entry screens, but as the **primary source of truth** for the application's environment. We looked at what triggers these setup events, what state is permanently created, and which adjacent subgroups fundamentally depend on that state to function.

***

## 3. Subgroup boundary and internal coherence

The **Campus Administration** subgroup is highly cohesive and distinct from the rest of the application. It represents the "back-office" or structural setup of the app.

The core concern of this subgroup is **system initialization and structural maintenance**. For students to use the app in a campus context, the system must first know that the campus exists, what university it belongs to, and what predefined options (like meeting spots or activity categories) are valid there. The driving philosophy, as noted in the use case, is that a new campus is introduced via *configuration* (data entry), not by deploying a new version of the app.

Seen in this way, the subgroup clearly includes:

* The initial setup and activation of a targeted campus.
* The ongoing CRUD (Create, Read, Update, Delete) management of campus-specific data (locations, categories).

At the same time, the boundary of the subgroup is strictly limited to **configuration**. It does not handle student accounts, it does not handle activity hosting, and it does not manage social interactions. It simply builds the sandbox in which those other interactions take place.

***

## 4. Procedure adopted to derive the logical model

### 4.1 Reading the narratives as state-changing interactions

Each narrative was examined to see how the system state is altered.

* **Configure New Campus** creates a brand-new state from nothing. It tells the system "This campus is now active and here are its initial parameters."
* **Manage Campus Structured Options** modifies an existing state. It updates the predefined rules for a campus that was already initialized.

This state-based reading is crucial because it defines the lifecycle of our logical stores: creation happens in the first event, while reading and updating happen in the second.

### 4.2 Separating core subgroup logic from external dependencies

Unlike the Access and Profile subgroup, Campus Administration has virtually zero *upstream* data dependencies. It is the top of the data river. Its primary role is to be a data *provider* for external dependencies (other subgroups). The Campus Admin actor is the sole external entity driving data into this subgroup.

### 4.3 Reorganizing the subgroup into logical responsibilities

The subgroup naturally splits into two primary business events:

1. **Event 1: A new campus needs to be initialized.** (Triggered by the Campus Admin starting the guided workflow).
2. **Event 2: Existing campus structured options require updates.** (Triggered by the Campus Admin accessing management functions to add/modify/remove locations or categories).

***

## 5. Results obtained from the subgroup analysis

### 5.1 Campus Initialization

The configuration narrative confirms that the system presents a multi-step workflow to capture campus-specific details and initial structured options. This logical process validates the inputs and saves the new campus, making it active. The logical result is that we must persist a core identity record for the campus.

### 5.2 Structured Options Maintenance

Once a campus exists, its environment needs maintenance. Meeting points might change; new activity categories might be added. The system must retrieve the current options for a *targeted* campus, accept modifications from the admin, and immediately propagate these updated choices. The logical result is that structured options must be stored in a way that is distinctly tied to a specific campus configuration but remains highly editable.

***

## 6. Relationship with the databases already proposed

This subgroup is the absolute **owner** of the first two stores listed in the project's shared database table. It does not just reuse them; it defines and manages them.

### 6.1 Ownership of DS-CA-001: Campus Configuration

This store holds the core identity, university association, and activation status of a campus. It is created during "Configure New Campus" and is subsequently read by almost every other onboarding and administrative process.

### 6.2 Ownership of DS-CA-002: Campus Structured Options

This store holds the lists of valid categories and locations/meeting points. It is populated initially during campus configuration, and then actively updated, read, or deleted during "Manage Campus Structured Options".

***

## 7. Missing stores revealed by the analysis

Because this subgroup is cleanly scoped to administrative setup, the two identified stores (DS-CA-001 and DS-CA-002) fully cover the requirements described in the narratives. No additional internal data stores are required for this subgroup to function at the MVP level.

***

## 8. Database-table definitions owned by this subgroup

The following records are explicitly managed by this subgroup and made available to the rest of the application:

| Name                                     | Subgroup              | Briefly describe the function                                                                                                                                                                                                                                                                                  |
| ---------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DS-CA-001: Campus Configuration**      | Campus Administration | This store holds the core configuration details for each campus (e.g., campus name, associated university, activation status). It is created when a new campus is initialized and is essential for the system to know which campuses are active and how they are set up.                                       |
| **DS-CA-002: Campus Structured Options** | Campus Administration | This store contains the campus-specific structured data used by students, such as predefined activity categories and valid campus locations/meeting points. It is created during initial campus configuration and subsequently updated, created, or deleted by the "Manage Campus Structured Options" process. |

***

## 9. Logical process structure that will matter for the workflow diagram

The upcoming workflow diagram should represent a straight-forward administrative flow:

1. **Configure New Campus:** Receives setup details and initial options from the Campus Admin -> Creates new record in **DS-CA-001** -> Creates initial records in **DS-CA-002**.
2. **Manage Campus Structured Options:** Receives target campus selection -> Reads campus verification from **DS-CA-001** -> Reads current options from **DS-CA-002** -> Receives location/category updates from the Campus Admin -> Updates **DS-CA-002**.

This is the fundamental data flow that must be preserved in the visual diagram.

***

## 10. Main data dependencies and crossings with other subgroups

This subgroup is an **exporter** of state. Its data crossings with adjacent subgroups are entirely downstream:

* **Export to Access and Profile:** The "Select Campus" onboarding flow must read from **DS-CA-001** to know which campuses exist for a given university email.
* **Export to Hosting and Lifecycle:** The "Create Activity" flow must read from **DS-CA-002** to validate that a student host is selecting an approved activity category and a valid campus meeting point.
* **Export to Discovery and Participation:** Activity feeds are inherently scoped by the active campus identity established in **DS-CA-001**.

This means the integrated DFD must show data flowing *out* of DS-CA-001 and DS-CA-002 into the logical processes of other subgroups.

***

## 11. Open points that should remain explicit before diagramming

While the administrative data flows are clean, a few assumptions and constraints must remain clearly labeled:

1. **Admin Authorization Mechanism:** The narratives state that the actor must be an "authorized campus admin," but the project material does not specify how an admin gets authorized or signs in. This is marked as an *Assumption for modeling only*: we assume the admin is already authenticated when triggering these processes.
2. **Interactive Maps Excluded:** The narratives and project constraints explicitly state that complex interactive campus maps are excluded from the MVP. The UI for managing locations is assumed to be a structured list mechanism. The logical model reflects list/textual data updates, not geographic coordinate data processing.
3. **Specific Configuration Fields:** The exact fields required to initialize a campus (beyond University Name and Campus Name) are left abstract as "campus-specific setup information."

Keeping these points visible ensures that the final DFD does not over-promise functionality (like geographic mapping systems) that the MVP does not support.

***

## 12. Information especially useful for the future all-together DFD merge

When merging Campus Administration into the context and Level-1 DFDs, pay close attention to the following:

* **The External Entity:** The `Campus Admin` is the sole external entity interacting directly with these logical processes.
* **Global Read Access:** `DS-CA-001` and `DS-CA-002` will have multiple outbound arrows pointing to processes owned by other subgroups. Ensure consistent naming (e.g., "Active campus info", "Approved categories & locations") when drawing these cross-boundary data flows.
* **No Circular Dependencies:** Campus Administration does not read data from Student Profiles, Activities, or Participations. It remains isolated and foundational.

***

## 13. Compact concluding view

The analysis confirms that the **Campus Administration** subgroup serves as the structural bedrock for the InCampus app. By providing a guided configuration workflow rather than requiring new software builds, it allows the system to scale to new campuses flexibly.

The subgroup logically owns two critical data stores: **DS-CA-001 (Campus Configuration)** and **DS-CA-002 (Campus Structured Options)**. It provides two main processes to create and maintain these stores. The resulting data is then strictly exported as read-only context to downstream subgroups like Access and Profile and Hosting and Lifecycle.

By strictly defining this boundary, the upcoming DFD can cleanly map the administrative inputs without tangling them into the complex social logic of the student-facing app.

# CA - DFD workdoc update

## Mini revision: authorized campus selection constraint

### Scope of this update

A small but important modeling refinement was introduced in the Campus Administration workdoc regarding campus targeting in administrative flows. The earlier reading could suggest either that each Campus Admin manages only one implicit campus, or that the admin may freely choose any campus in the system. This has now been clarified more precisely: the Campus Admin may still perform a campus selection step, but only from a restricted list of campuses for which that admin is explicitly authorized. As a result, the logical flow for “Manage Campus Structured Options” remains valid, but the campus-selection input is no longer interpreted as open access to all campuses supported by the application. Instead, the process reads and verifies the selected campus within the admin’s authorization scope before retrieving and updating the corresponding structured options.

***

## What changes logically

The subgroup still keeps the same overall structure:

* **Configure New Campus** remains the initialization process that creates a new campus configuration and its first structured options.
* **Manage Campus Structured Options** remains the maintenance process that reads an existing campus context and updates that campus's structured options.
* **DS-CA-001: Campus Configuration** and **DS-CA-002: Campus Structured Options** remain the only owned stores of the subgroup.

So the architecture does **not** change at the ownership level.

What changes is only the interpretation of the campus-selection step inside the second process.

Previously, the workdoc described the flow in a generic way as:

* receive target campus selection
* read campus verification from DS-CA-001
* read current options from DS-CA-002
* receive updates
* update DS-CA-002

That sequence is still valid, but the first step must now be read as:

* receive **authorized-campus selection**, not open campus selection

In other words, the process does not expose the entire campus universe to the actor. It exposes only the subset of campuses that the current Campus Admin is allowed to manage.
