# NSF - DFD

# V4.0

![](assets/YIEceGumvDtFjlp7wou7_5C-J6M8JnOlKPEUBJpV2es=.png)

```mermaid
---
config:
  layout: elk
---
flowchart LR
    JoinArea["Join / request flow"] -- join event --> P1("Notify host of join event")
    WithdrawArea["Withdrawal flow"] -- pending request withdrawn --> P5("Notify host of withdrawal event")
    LeaveArea["Leave flow"] -- joined participant leaves --> P6("Notify host of leave event")
    ReviewArea["Join request review flow"] -- approval or decline outcome --> P2("Notify participant of application outcome")
    LifecycleArea["Activity lifecycle management"] -- cancelled status --> P3("Notify participant of activity cancellation")
    ReminderArea["Time / scheduling flow"] -- configured reminder threshold reached --> P7("Notify participant of activity reminder")

    P1 -- read activity --> D2["DS-HL-001 Activities"]
    D2 -- host reference and activity context --> P1
    P1 -- read participation change --> D3["DS-HL-002 Activity Participations"]
    D3 -- new join or pending request --> P1
    P1 -- read recipient account --> D1["DS-AP-001 Student Account"]
    D1 -- host account validity --> P1
    P1 -- read block relationship --> D5["DS-SM-001 Block Relationships"]
    D5 -- trigger-recipient block state --> P1
    P1 -- create notification record if not blocked --> D4["DS-NS-001 Notification Records"]
    P1 -- host notification --> Notify["Notification Delivery Mechanism"]
    Notify -- delivered notification --> Host["Host Student"]

    P5 -- read activity --> D2
    D2 -- host reference and activity context --> P5
    P5 -- read withdrawn participation --> D3
    D3 -- withdrawn pending request state --> P5
    P5 -- read recipient account --> D1
    D1 -- host account validity --> P5
    P5 -- read block relationship --> D5
    D5 -- trigger-recipient block state --> P5
    P5 -- create notification record if not blocked --> D4
    P5 -- host withdrawal notification --> Notify
    Notify -- delivered withdrawal notification --> Host

    P6 -- read activity --> D2
    D2 -- host reference and activity context --> P6
    P6 -- read left participation --> D3
    D3 -- left joined participation state --> P6
    P6 -- read recipient account --> D1
    D1 -- host account validity --> P6
    P6 -- read block relationship --> D5
    D5 -- trigger-recipient block state --> P6
    P6 -- create notification record if not blocked --> D4
    P6 -- host leave notification --> Notify
    Notify -- delivered leave notification --> Host

    P2 -- read activity --> D2
    D2 -- activity reference --> P2
    P2 -- read participation outcome --> D3
    D3 -- approved or declined request --> P2
    P2 -- read recipient account --> D1
    D1 -- participant account validity --> P2
    P2 -- read block relationship --> D5
    D5 -- trigger-recipient block state --> P2
    P2 -- create notification record if not blocked --> D4
    P2 -- participant outcome notification --> Notify
    Notify -- delivered outcome notification --> Participant["Participant Student"]

    P3 -- read activity --> D2
    D2 -- cancelled activity context --> P3
    P3 -- read joined participant set --> D3
    D3 -- joined recipients --> P3
    P3 -- read recipient accounts --> D1
    D1 -- participant account validity --> P3
    P3 -- read block relationships --> D5
    D5 -- host-participant block states --> P3
    P3 -- create notification records for non-blocked recipients --> D4
    P3 -- cancellation notification --> Notify
    Notify -- delivered cancellation notification --> Participant

    P7 -- read activity --> D2
    D2 -- scheduled start time and current non-cancelled state --> P7
    P7 -- read still-joined participant set --> D3
    D3 -- participants still joined at trigger time --> P7
    P7 -- read recipient accounts --> D1
    D1 -- participant account validity --> P7
    P7 -- create reminder notification record if still joined and not cancelled --> D4
    P7 -- activity reminder notification --> Notify
    Notify -- delivered reminder notification --> Participant

    Host -- notification open action --> P4("Open notification context")
    Participant -- notification open action --> P4
    P4 -- read notification --> D4
    D4 -- stored notification reference --> P4
    P4 -- read activity --> D2
    D2 -- current activity state --> P4
    P4 -- read participation when needed --> D3
    D3 -- current participation state --> P4
    P4 -- read block relationship --> D5
    D5 -- current access state --> P4
    P4 -- open activity / request / cancelled view or unavailable fallback --> Host
    P4 -- open activity / cancelled / upcoming view or unavailable fallback --> Participant

    D1@{ shape: cyl}
    D2@{ shape: cyl}
    D3@{ shape: cyl}
    D4@{ shape: cyl}
    D5@{ shape: cyl}

    style JoinArea fill:#FFF9C4
    style WithdrawArea fill:#FFF9C4
    style LeaveArea fill:#FFF9C4
    style ReviewArea fill:#FFF9C4
    style LifecycleArea fill:#FFF9C4
    style ReminderArea fill:#FFF9C4
    style Notify fill:#FFF9C4
    style D1 fill:#FFF9C4
    style D2 fill:#FFF9C4
    style D3 fill:#FFF9C4
    style D5 fill:#FFF9C4
```

# V3.0

review:

Added a new **activity reminder notification branch** to NSF with the process **“Notify participant of activity reminder.”**

* This branch models **Receive Activity Reminder** as part of the **current MVP subgroup scope**, even though the earlier requirements tables still classify **US-11 / FR-1101 / NFR-24** as postMVP and must be updated separately.
* Added a **time / scheduling trigger area** so the reminder is modeled as a system-detected event rather than as a manually initiated action.
* The reminder branch now reads **DS-HL-001 Activities** for the scheduled start time and current lifecycle state, and reads **DS-HL-002 Activity Participations** to identify only participants who are **still joined** at trigger time.
* Incorporated the alternate-scenario suppression rules:
  &#x20; \* **no reminder if the student is no longer joined**;
  &#x20; \* **no reminder if the activity is already cancelled**;
  &#x20; \* the **cancellation flow supersedes** the reminder flow.
* Updated **Open notification context** so that, when the participant taps the reminder, it opens the **relevant upcoming activity view**.
* Made the structural dependency explicit: reminder logic depends on activity scheduling data already defined upstream in **Create Activity / Set Activity Date and Time**, depending the current UC taxonomy.

```mermaid
---
config:
  layout: elk
---
flowchart LR
    JoinArea["Join / request flow"] -- join event --> P1("Notify host of join event")
    P1 -- read activity --> D2["DS-HL-001 Activities"]
    D2 -- host reference and activity context --> P1
    P1 -- read participation change --> D3["DS-HL-002 Activity Participations"]
    D3 -- new join or pending request --> P1
    P1 -- read recipient account --> D1["DS-AP-001 Student Account"]
    D1 -- host account validity --> P1
    P1 -- create notification record --> D4["DS-NS-001 Notification Records"]
    P1 -- host notification --> Notify["Notification Subsystem"]
    Notify -- delivered notification --> Host["Host Student"]

    WithdrawArea["Withdrawal flow"] -- withdrawal event --> P5("Notify host of withdrawal event")
    P5 -- read activity --> D2
    D2 -- updated activity context and released slot --> P5
    P5 -- read participation change --> D3
    D3 -- withdrawn participation state --> P5
    P5 -- read recipient account --> D1
    D1 -- host account validity --> P5
    P5 -- read block relationship --> D5["DS-SM-001 Block Relationships"]
    D5 -- host-student block state --> P5
    P5 -- create notification record --> D4
    P5 -- host withdrawal notification --> Notify
    Notify -- delivered withdrawal notification --> Host

    ReviewArea["Join request review flow"] -- approval or decline outcome --> P2("Notify participant of application outcome")
    P2 -- read activity --> D2
    D2 -- activity reference --> P2
    P2 -- read participation outcome --> D3
    D3 -- approved or declined request --> P2
    P2 -- read recipient account --> D1
    D1 -- participant account validity --> P2
    P2 -- create notification record --> D4
    P2 -- participant outcome notification --> Notify
    Notify -- delivered outcome notification --> Participant["Participant Student"]

    LifecycleArea["Activity lifecycle management"] -- cancelled status --> P3("Notify participant of activity cancellation")
    P3 -- read activity --> D2
    D2 -- cancelled activity context --> P3
    P3 -- read joined participant set --> D3
    D3 -- joined recipients --> P3
    P3 -- read recipient accounts --> D1
    D1 -- participant account validity --> P3
    P3 -- create notification record --> D4
    P3 -- cancellation notification --> Notify
    Notify -- delivered cancellation notification --> Participant

    ReminderArea["Time / scheduling flow"] -- configured reminder threshold reached --> P6("Notify participant of activity reminder")
    P6 -- read activity --> D2
    D2 -- scheduled start time and current non-cancelled state --> P6
    P6 -- read still-joined participant set --> D3
    D3 -- participants still joined at trigger time --> P6
    P6 -- read recipient accounts --> D1
    D1 -- participant account validity --> P6
    P6 -- create notification record --> D4
    P6 -- activity reminder notification --> Notify
    Notify -- delivered reminder notification --> Participant

    Host -- notification open action --> P4("Open notification context")
    Participant -- notification open action --> P4
    P4 -- read notification --> D4
    D4 -- stored notification reference --> P4
    P4 -- read activity --> D2
    D2 -- current activity state --> P4
    P4 -- read participation when needed --> D3
    D3 -- current participation state --> P4
    P4 -- open activity view --> Host
    P4 -- open activity or cancelled view --> Participant
    P4 -- open upcoming activity view --> Participant

    D1@{ shape: cyl}
    D2@{ shape: cyl}
    D3@{ shape: cyl}
    D4@{ shape: cyl}
    D5@{ shape: cyl}

    style JoinArea fill:#FFF9C4
    style WithdrawArea fill:#FFF9C4
    style ReviewArea fill:#FFF9C4
    style LifecycleArea fill:#FFF9C4
    style ReminderArea fill:#FFF9C4
    style Notify fill:#FFF9C4
    style D1 fill:#FFF9C4
    style D2 fill:#FFF9C4
    style D3 fill:#FFF9C4
    style D5 fill:#FFF9C4
```

![](assets/VMmEVudHAWelCNe92KwDzgFA7qCS93yZSqVBQuMpmSA=.svg)

# V2.0

review:
Added a new **withdrawal notification branch** to NSF with the process **“Notify host of withdrawal event.”**

* &#x20;This branch now covers both cases: a student **withdraws a pending request** or **leaves an already joined activity**. 
* &#x20;Added a read from **DS-SM-001 Block Relationships** because the **block check must happen inside NSF**. 
* &#x20;Updated the withdrawal notification logic so it includes: 
  * &#x20;who withdrew, 
  * &#x20;from which activity, 
  * &#x20;and that **a slot was freed**. 
* &#x20;Updated **Open notification context** so that, when the host taps the notification, it opens the **activity view**. 
* &#x20;Added the priority rule: **the first valid event wins**, and later conflicting notification events are suppressed.

```mermaid
---
config:
  layout: elk
---
flowchart LR
    JoinArea["Join / request flow"] -- join event --> P1("Notify host of join event")
    P1 -- read activity --> D2["DS-HL-001 Activities"]
    D2 -- host reference and activity context --> P1
    P1 -- read participation change --> D3["DS-HL-002 Activity Participations"]
    D3 -- new join or pending request --> P1
    P1 -- read recipient account --> D1["DS-AP-001 Student Account"]
    D1 -- host account validity --> P1
    P1 -- create notification record --> D4["DS-NS-001 Notification Records"]
    P1 -- host notification --> Notify["Notification Subsystem"]
    Notify -- delivered notification --> Host["Host Student"]

    WithdrawArea["Withdrawal flow"] -- withdrawal event --> P5("Notify host of withdrawal event")
    P5 -- read activity --> D2
    D2 -- updated activity context and released slot --> P5
    P5 -- read participation change --> D3
    D3 -- withdrawn participation state --> P5
    P5 -- read recipient account --> D1
    D1 -- host account validity --> P5
    P5 -- read block relationship --> D5["DS-SM-001 Block Relationships"]
    D5 -- host-student block state --> P5
    P5 -- create notification record --> D4
    P5 -- host withdrawal notification --> Notify
    Notify -- delivered withdrawal notification --> Host

    ReviewArea["Join request review flow"] -- approval or decline outcome --> P2("Notify participant of application outcome")
    P2 -- read activity --> D2
    D2 -- activity reference --> P2
    P2 -- read participation outcome --> D3
    D3 -- approved or declined request --> P2
    P2 -- read recipient account --> D1
    D1 -- participant account validity --> P2
    P2 -- create notification record --> D4
    P2 -- participant outcome notification --> Notify
    Notify -- delivered outcome notification --> Participant["Participant Student"]

    LifecycleArea["Activity lifecycle management"] -- cancelled status --> P3("Notify participant of activity cancellation")
    P3 -- read activity --> D2
    D2 -- cancelled activity context --> P3
    P3 -- read joined participant set --> D3
    D3 -- joined recipients --> P3
    P3 -- read recipient accounts --> D1
    D1 -- participant account validity --> P3
    P3 -- create notification record --> D4
    P3 -- cancellation notification --> Notify
    Notify -- delivered cancellation notification --> Participant

    Host -- notification open action --> P4("Open notification context")
    Participant -- notification open action --> P4
    P4 -- read notification --> D4
    D4 -- stored notification reference --> P4
    P4 -- read activity --> D2
    D2 -- current activity state --> P4
    P4 -- read participation when needed --> D3
    D3 -- current participation state --> P4
    P4 -- open activity view --> Host
    P4 -- open activity or cancelled view --> Participant

    D1@{ shape: cyl}
    D2@{ shape: cyl}
    D3@{ shape: cyl}
    D4@{ shape: cyl}
    D5@{ shape: cyl}

    style JoinArea fill:#FFF9C4
    style WithdrawArea fill:#FFF9C4
    style ReviewArea fill:#FFF9C4
    style LifecycleArea fill:#FFF9C4
    style Notify fill:#FFF9C4
    style D1 fill:#FFF9C4
    style D2 fill:#FFF9C4
    style D3 fill:#FFF9C4
    style D5 fill:#FFF9C4
```

![](assets/UuLiEwQd0__tJoP0NRAoex9E71lFbBTzQ4nXmu49Sls=.png)

# V1.0

```mermaid
---
config:
  layout: elk
---
flowchart LR
    JoinArea["Join / request flow"] -- join event --> P1("Notify host of join event")
    P1 -- read activity --> D2["DS-HL-001 Activities"]
    D2 -- host reference and activity context --> P1
    P1 -- read participation change --> D3["DS-HL-002 Activity Participations"]
    D3 -- new join or pending request --> P1
    P1 -- read recipient account --> D1["DS-AP-001 Student Account"]
    D1 -- host account validity --> P1
    P1 -- create notification record --> D4["DS-NS-001 Notification Records"]
    P1 -- host notification --> Notify["Notification Subsystem"]
    Notify -- delivered notification --> Host["Host Student"]

    ReviewArea["Join request review flow"] -- approval or decline outcome --> P2("Notify participant of application outcome")
    P2 -- read activity --> D2
    D2 -- activity reference --> P2
    P2 -- read participation outcome --> D3
    D3 -- approved or declined request --> P2
    P2 -- read recipient account --> D1
    D1 -- participant account validity --> P2
    P2 -- create notification record --> D4
    P2 -- participant outcome notification --> Notify
    Notify -- delivered outcome notification --> Participant["Participant Student"]

    LifecycleArea["Activity lifecycle management"] -- cancelled status --> P3("Notify participant of activity cancellation")
    P3 -- read activity --> D2
    D2 -- cancelled activity context --> P3
    P3 -- read joined participant set --> D3
    D3 -- joined recipients --> P3
    P3 -- read recipient accounts --> D1
    D1 -- participant account validity --> P3
    P3 -- create notification record --> D4
    P3 -- cancellation notification --> Notify
    Notify -- delivered cancellation notification --> Participant

    Host -- notification open action --> P4("Open notification context")
    Participant -- notification open action --> P4
    P4 -- read notification --> D4
    D4 -- stored notification reference --> P4
    P4 -- read activity --> D2
    D2 -- current activity state --> P4
    P4 -- read participation when needed --> D3
    D3 -- current participation state --> P4
    P4 -- open pending requests or activity view --> Host
    P4 -- open activity or cancelled view --> Participant

    D1@{ shape: cyl}
    D2@{ shape: cyl}
    D3@{ shape: cyl}
    D4@{ shape: cyl}

    style JoinArea fill:#FFF9C4
    style ReviewArea fill:#FFF9C4
    style LifecycleArea fill:#FFF9C4
    style Notify fill:#FFF9C4
    style D1 fill:#FFF9C4
    style D2 fill:#FFF9C4
    style D3 fill:#FFF9C4
```

![](assets/eo5RCv9inmvb0PF5PrwNzDKyodZUohWVr_7c28_980Y=.png)

