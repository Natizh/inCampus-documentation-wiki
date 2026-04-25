# CA - DFD

# V2.0

review: perfect logic, i inserted the specific subgroup it's related to instead of adjacent subgroups; campus admin before the configure should select the target campus from a list of campuses he's auth to modify, isn't it?

```mermaid
---
config:
  layout: elk
---
flowchart LR
    CampusAdmin["Campus Admin"] -- campus setup details and initial options --> P1("1.0 Configure New Campus")
    P1 -- create campus configuration --> D1["DS-CA-001 Campus Configuration"]
    P1 -- create initial structured options --> D2["DS-CA-002 Campus Structured Options"]

    CampusAdmin -- target campus selection and option updates --> P2("2.0 Manage Campus Structured Options")
    P2 -- read target campus --> D1
    D1 -- campus verification --> P2
    P2 -- read current options --> D2
    D2 -- current structured options --> P2
    P2 -- update structured options --> D2

    AccessProfile["Access and Profile"] -- read available campuses --> D1
    HostingLifecycle["Hosting and Lifecycle"] -- read approved categories and locations --> D2
    DiscoveryParticipation["Discovery and Participation"] -- read active campus context --> D1

    D1@{ shape: cyl}
    D2@{ shape: cyl}

    style AccessProfile fill:#FFF9C4
    style HostingLifecycle fill:#FFF9C4
    style DiscoveryParticipation fill:#FFF9C4
```

![](assets/w4GAeZmH89QvkqQaKsBcIMLrcUq-b7jJuVCiTOK2MEw=.png)

# V1.0

```mermaid
flowchart LR
    %% Styles
    classDef entity fill:#ffffff,stroke:#333333,stroke-width:1px
    classDef entityYellow fill:#fdf6e3,stroke:#333333,stroke-width:1px
    classDef process fill:#ffffff,stroke:#333333,stroke-width:1px,rx:15,ry:15
    classDef datastore fill:#ffffff,stroke:#333333,stroke-width:1px
    classDef datastoreYellow fill:#fdf6e3,stroke:#333333,stroke-width:1px

    %% External Entities and Adjacent Subgroups (Yellow)
    AdjSubgroups[Adjacent Subgroups]:::entityYellow

    %% Internal Entities
    CampusAdmin[Campus Admin]:::entity

    %% Logical Processes
    ConfigCampus([Configure New Campus]):::process
    ManageOpts([Manage Campus Structured Options]):::process

    %% Data Stores (Internal)
    DS_CA001[(DS-CA-001 Campus&lt;br&gt;Configuration)]:::datastore
    DS_CA002[(DS-CA-002 Campus&lt;br&gt;Structured Options)]:::datastore

    %% --- Data Flows ---

    %% Configure New Campus
    CampusAdmin -->|campus setup details & initial options| ConfigCampus
    ConfigCampus -->|create new campus configuration| DS_CA001
    ConfigCampus -->|create initial structured options| DS_CA002

    %% Manage Campus Structured Options
    CampusAdmin -->|updates to locations & categories| ManageOpts
    ManageOpts -->|read target campus| DS_CA001
    DS_CA001 -->|campus verification| ManageOpts
    ManageOpts -->|read current options| DS_CA002
    DS_CA002 -->|current structured options| ManageOpts
    ManageOpts -->|update structured options| DS_CA002

    %% Data Read by Adjacent Subgroups
    DS_CA001 -->|read active campus info| AdjSubgroups
    DS_CA002 -->|read available categories & locations| AdjSubgroups
```

![](assets/ogRq0iHE6tdEYY9bfnEEm-cZfYUaRZriOgwlIBjpzaE=.png)

