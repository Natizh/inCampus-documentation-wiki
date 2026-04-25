# SM - DFD

# V2.0

review: This version reflects the clarified logic:

* **community rules are static content**, so `Provide Community Rules` has **no dedicated data store**
* **report review is based on&#x20;****`DS-SM-002 Report Records`**, not on a mandatory live read of `Activities`
* `DS-SM-002` is no longer shown as **Provisional**
* `DS-AP-001` and `DS-AP-002` are treated as **upstream reused stores**
* only the **concrete adjacent-subgroup interface** that is already justified is drawn explicitly: **Discovery and Participation** querying block status
* the block is now treated as **symmetric in practice**, it prevents new join/request interactions in both directions, auto-declines pending requests when the block is created, does not retroactively remove existing shared participation, restricts activity details and profile exposure, and is modeled as **upstream interaction prevention rather than notification suppression**.

```mermaid
graph LR
  %% ===== EXTERNAL ACTORS =====
  Student([Student])
  CampusAdmin([Campus Admin])
  DP([Discovery and Participation])
  HL([Hosting and Lifecycle])

  %% ===== PROCESSES =====
  P1[1.0 View Community Rules]
  P2[2.0 Submit User/Activity Report]
  P3[3.0 Review Report]
  P4[4.0 Block User and Enforce Restrictions]

  %% ===== DATA STORES =====
  DS1[(DS-SM-001: Block Relationships)]
  DS2[(DS-SM-002: Report Records)]
  DS3[(DS-AP-001: Student Account)]
  DS4[(DS-AP-002: Student Profile)]

  %% ===== 1.0 View Community Rules =====
  Student -->|Request for Community Rules| P1
  P1 -->|Community Rules Content| Student

  %% ===== 2.0 Submit User/Activity Report =====
  Student -->|Report Submission: Target, Reason, Details| P2
  P2 -->|Reporter and Target Account Check| DS3
  DS3 -->|Account Validation Result| P2
  P2 -->|Target User ID When Needed| DS4
  DS4 -->|Profile Data| P2
  P2 -->|New Report Record| DS2
  P2 -->|Submission Confirmation| Student

  %% ===== 3.0 Review Report =====
  CampusAdmin -->|Request to View Report List and Select Report| P3
  P3 -->|Query Report List and Details| DS2
  DS2 -->|Report Data| P3
  P3 -->|Reported User ID When Needed| DS4
  DS4 -->|Profile Data| P3
  CampusAdmin -->|Review Outcome and Moderation Action| P3
  P3 -->|Update Review Status, Outcome, Action| DS2
  P3 -->|Report List and Report Details| CampusAdmin

  %% ===== 4.0 Block User and Enforce Restrictions =====
  Student -->|Block Request for Target User| P4
  P4 -->|Reporter and Target Account Check| DS3
  DS3 -->|Account Validation Result| P4
  P4 -->|Target User ID for Confirmation| DS4
  DS4 -->|Profile Data| P4
  P4 -->|Create or Read Block Relationship| DS1
  DS1 -->|Existing Block Status| P4
  P4 -->|Block Confirmation or Error| Student

  %% ===== CROSS-SUBGROUP ENFORCEMENT =====
  DP -->|Block Check for Join, Feed Visibility, and Activity Details| P4
  P4 -->|Block Status and Visibility Restriction| DP
  P4 -->|Pending Request Auto-Decline Trigger| HL

  %% ===== COLOR RULES =====
  style DP fill:#FFF9C4
  style HL fill:#FFF9C4
  style DS3 fill:#FFF9C4
  style DS4 fill:#FFF9C4
```

![](assets/2_q9pP0tZORyXnCBvI-SAEIngCEp1LDEc1WHNnKRgmw=.png)

# V1.0

![](assets/IxL88iczNh9emH4StVVnV48E1e19ROaBI4E8EZkp_rU=.png)

code:
flowchart TD

%% External

Student(\[Student])

CampusAdmin(\[Campus Admin])

%% Process

P\_SM\_01\["Provide Community Rules"]

P\_SM\_02\["Submit User/Activity Report"]

P\_SM\_03\["Manage Report Review"]

P\_SM\_04\["Enforce Block Relationship"]

%% Data store

DS\_SM\_002\[("DS-SM-002 Report Records \<i>(Provisional)\</i>")]

DS\_SM\_001\[("DS-SM-001 Block Relationships")]

DS\_AP\_001\[("DS-AP-001 Student Account")]

DS\_AP\_002\[("DS-AP-002 Student Profile")]

%% external—process

Student -->|Request for community rules|P\_SM\_01

P\_SM\_01 -->|Community rules content|Student

Student -->|Report submission: target, reason, details|P\_SM\_02

P\_SM\_02 -->|Submission confirmation|Student

CampusAdmin -->|Request to view report list and select report|P\_SM\_03

P\_SM\_03 -->|Report list and report details|CampusAdmin

CampusAdmin -->|Review outcome and moderation action|P\_SM\_03

Student -->|Block request for target user|P\_SM\_04

P\_SM\_04 -->|Block confirmation or error|Student

%% process—data store

P\_SM\_02 -->|New report record|DS\_SM\_002

P\_SM\_03 -->|Query report list and details|DS\_SM\_002

DS\_SM\_002 -->|Report data|P\_SM\_03

P\_SM\_03 -->|Update report record: review status, outcome, action|DS\_SM\_002

P\_SM\_04 -->|Read student account for target existence and self-block check|DS\_AP\_001

DS\_AP\_001 -->|Account validation result|P\_SM\_04

P\_SM\_04 -->|Create or read block relationship|DS\_SM\_001

DS\_SM\_001 -->|Existing block status|P\_SM\_04

%% read profile for report

P\_SM\_03 -->|Read reported user identity|DS\_AP\_002

DS\_AP\_002 -->|Profile data|P\_SM\_03

%% submit profile for report

P\_SM\_02 -->|Read target user or activity identity|DS\_AP\_002

DS\_AP\_002 -->|Profile data|P\_SM\_02

%% cross process research

P\_SM\_04 -.->|Internal enforcement query from other subgroups|P\_SM\_04

