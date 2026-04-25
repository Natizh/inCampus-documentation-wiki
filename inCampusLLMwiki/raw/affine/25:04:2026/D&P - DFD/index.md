# D\&P - DFD

# V3.0

![](assets/9QyEs33RVlrQxW45kKB0NlY1s4TXqSJdXe2erffXW-M=.png)

```mermaid
---
config:

---
flowchart LR
  %% ===== EXTERNAL ACTORS / ADJACENT SUBSYSTEMS =====
  Student([Student])
  NotifSys([Notifications and System Flow Subgroup])

  %% ===== PROCESSES =====
  P1[1.0 Browse and Filter Activities]
  P2[2.0 View Activity Details]
  P3[3.0 Join Activity]
  P4[4.0 Withdraw Join Request]
  P5[5.0 Leave Joined Activity]
  P6[6.0 View Personal Activity List]

  %% ===== DATA STORES =====
  DS1[(DS-HL-001: Activities)]
  DS2[(DS-HL-002: Activity Participations)]
  DS3[(DS-AP-002: Student Profile)]
  DS4[(DS-SM-001: Block Relationships)]

  %% ===== 1.0 Browse and Filter Activities =====
  Student -->|Filter Criteria and Campus Context| P1
  P1 -->|Campus ID and Filter Parameters| DS1
  DS1 -->|Candidate Activity Records| P1
  P1 -->|Viewer ID and Host IDs| DS4
  DS4 -->|Block Visibility Constraints| P1
  P1 -->|Visible Filtered Activity List| Student

  %% ===== 2.0 View Activity Details =====
  Student -->|Activity ID| P2
  P2 -->|Activity ID| DS1
  DS1 -->|Activity Data and Host ID| P2
  P2 -->|Viewer ID and Host ID| DS4
  DS4 -->|Block Status| P2
  P2 -->|Host ID| DS3
  DS3 -->|Host Minimal Profile| P2
  P2 -->|Activity Details with Host Profile if Allowed| Student

  %% ===== 3.0 Join Activity =====
  Student -->|Activity ID and Join Intent| P3
  P3 -->|Activity ID| DS1
  DS1 -->|Activity State, Limits, Mode, Host ID| P3
  P3 -->|Student ID and Activity ID| DS2
  DS2 -->|Existing Participation or Request Status| P3
  P3 -->|Student ID and Host ID| DS4
  DS4 -->|Block Status| P3
  P3 -->|New Participation Record or Pending Request| DS2
  P3 -->|Updated Participant or Request Count| DS1
  P3 -->|Join Result| Student
  P3 -->|Join or Request Notification Trigger| NotifSys

  %% ===== 4.0 Withdraw Join Request =====
  Student -->|Request ID and Withdraw Action| P4
  P4 -->|Request ID| DS2
  DS2 -->|Pending Request State| P4
  P4 -->|Request Deletion| DS2
  P4 -->|Updated Request Count or Availability| DS1
  P4 -->|Withdrawal Confirmation| Student
  P4 -->|Withdrawal Notification Trigger| NotifSys

  %% ===== 5.0 Leave Joined Activity =====
  Student -->|Activity ID and Leave Action| P5
  P5 -->|Student ID and Activity ID| DS2
  DS2 -->|Joined Participation State| P5
  P5 -->|Activity ID| DS1
  DS1 -->|Activity State, Start Time, Host ID| P5
  P5 -->|Participation Deletion| DS2
  P5 -->|Updated Participant Count or Availability| DS1
  P5 -->|Leave Confirmation| Student
  P5 -->|Leave Notification Trigger| NotifSys

  %% ===== 6.0 View Personal Activity List =====
  Student -->|Student ID| P6
  P6 -->|Student ID| DS2
  DS2 -->|User Participation Records| P6
  P6 -->|Activity IDs| DS1
  DS1 -->|Activity Summary Data and Lifecycle State| P6
  P6 -->|Upcoming and Past Activity Lists| Student

  %% ===== STYLE =====
  style NotifSys fill:#FFF9C4
  style DS1 fill:#FFF9C4
  style DS2 fill:#FFF9C4
  style DS3 fill:#FFF9C4
  style DS4 fill:#FFF9C4


```

# V2.0

review: databases names did not match and there was a mismatch with database **DS-TBD: Block Relationships**. colored the sections not strictly regarding this subsection

```mermaid




graph LR
  %% ===== EXTERNAL ACTORS =====
  Student([Student])
  NotifSys([Notification Subsystem])

  %% ===== PROCESSES =====
  P1[1.0 Browse and Filter Activities]
  P2[2.0 View Activity Details]
  P3[3.0 Join Activity]
  P4[4.0 Withdraw Join Request]
  P5[5.0 Leave Joined Activity]
  P6[6.0 View Personal Activity List]

  %% ===== DATA STORES =====
  DS1[(DS-HL-001: Activities)]
  DS2[(DS-HL-002: Activity Participations)]
  DS3[(DS-AP-002: Student Profile)]
  DS4[(DS-SM-001: Block Relationships)]

  %% ===== 1.0 Browse and Filter Activities =====
  Student -->|Filter Criteria| P1
  P1 -->|Campus ID and Filter Parameters| DS1
  DS1 -->|Matching Activities| P1
  P1 -->|Filtered Activity List| Student

  %% ===== 2.0 View Activity Details =====
  Student -->|Activity ID| P2
  P2 -->|Activity ID| DS1
  DS1 -->|Activity Data| P2
  P2 -->|Student ID and Host ID| DS4
  DS4 -->|Block Status| P2
  P2 -->|Host ID| DS3
  DS3 -->|Host Profile Data| P2
  P2 -->|Activity Details with Host Profile| Student

  %% ===== 3.0 Join Activity =====
  Student -->|Activity ID and Join Request| P3
  P3 -->|Activity ID| DS1
  DS1 -->|Activity Limits and Participation Mode| P3
  P3 -->|Student ID and Activity ID| DS2
  DS2 -->|Existing Participation Status| P3
  P3 -->|Student ID and Host ID| DS4
  DS4 -->|Block Status| P3
  P3 -->|New Participation or Pending Request| DS2
  P3 -->|Updated Participant or Request Count| DS1
  P3 -->|Join Outcome| Student
  P3 -->|Host Notification Trigger| NotifSys

  %% ===== 4.0 Withdraw Join Request =====
  Student -->|Request ID| P4
  P4 -->|Request ID| DS2
  DS2 -->|Request Status| P4
  P4 -->|Request Removal| DS2
  P4 -->|Updated Request Count| DS1
  P4 -->|Withdrawal Confirmation| Student
  P4 -->|Host Notification Trigger| NotifSys

  %% ===== 5.0 Leave Joined Activity =====
  Student -->|Activity ID and Leave Request| P5
  P5 -->|Student ID and Activity ID| DS2
  DS2 -->|Participation Status| P5
  P5 -->|Activity ID| DS1
  DS1 -->|Activity Start Time| P5
  P5 -->|Participation Removal| DS2
  P5 -->|Updated Participant Count| DS1
  P5 -->|Leave Confirmation| Student
  P5 -->|Host Notification Trigger| NotifSys

  %% ===== 6.0 View Personal Activity List =====
  Student -->|Student ID| P6
  P6 -->|Student ID| DS2
  DS2 -->|Participation Records| P6
  P6 -->|Activity IDs| DS1
  DS1 -->|Activity Summary Data| P6
  P6 -->|Upcoming and Past Activity Lists| Student

  %% ===== COLOR RULES =====
  style NotifSys fill:#FFF9C4
  style DS1 fill:#FFF9C4
  style DS2 fill:#FFF9C4
  style DS3 fill:#FFF9C4
  style DS4 fill:#FFF9C4


```

![](assets/2Wi3mP3ENx5hf8OZbYznQ8qSQISemAxM8Mdaoct4YPA=.png)

# V1.0

```mermaid
graph LR
  %% ===== ATTORI ESTERNI =====
  Student([Studente])
  NotifSys([Notifications Subsystem])
 
  %% ===== PROCESSI =====
  P1[1.0 Browse and Filter Activities]
  P2[2.0 View Activity Details]
  P3[3.0 Join Activity]
  P4[4.0 Withdraw Join Request]
  P5[5.0 Leave Joined Activity]
  P6[6.0 View Personal Activity List]
 
  %% ===== DATA STORE =====
  DS1[(DS-01 Activities)]
  DS2[(DS-02 Participations and Requests)]
  DS3[(DS-03 User Profiles)]
  DS4[(DS-04 Block Relationships)]
 
  %% ===== UC 1.0 Browse and Filter Activities =====
  Student -->|filter criteria| P1
  P1 -->|campus id and filter params| DS1
  DS1 -->|matching activities| P1
  P1 -->|filtered activity list| Student
 
  %% ===== UC 2.0 View Activity Details =====
  Student -->|activity id| P2
  P2 -->|activity id| DS1
  DS1 -->|activity data| P2
  P2 -->|student id and host id| DS4
  DS4 -->|block status| P2
  P2 -->|host id| DS3
  DS3 -->|host minimal profile| P2
  P2 -->|activity details with host profile| Student
 
  %% ===== UC 3.0 Join Activity =====
  Student -->|activity id and join intent| P3
  P3 -->|activity id| DS1
  DS1 -->|activity limits and mode| P3
  P3 -->|student id and activity id| DS2
  DS2 -->|existing participation status| P3
  P3 -->|student id and host id| DS4
  DS4 -->|block status| P3
  P3 -->|new participation or pending request| DS2
  P3 -->|updated participant or request count| DS1
  P3 -->|join result| Student
  P3 -->|host notification trigger| NotifSys
 
  %% ===== UC 4.0 Withdraw Join Request =====
  Student -->|request id| P4
  P4 -->|request id| DS2
  DS2 -->|request state| P4
  P4 -->|request deletion| DS2
  P4 -->|updated request count| DS1
  P4 -->|withdraw confirmation| Student
  P4 -->|host notification trigger| NotifSys
 
  %% ===== UC 5.0 Leave Joined Activity =====
  Student -->|activity id and leave intent| P5
  P5 -->|student id and activity id| DS2
  DS2 -->|participation state| P5
  P5 -->|activity id| DS1
  DS1 -->|activity start time| P5
  P5 -->|participation deletion| DS2
  P5 -->|updated participant count| DS1
  P5 -->|leave confirmation| Student
  P5 -->|host notification trigger| NotifSys
 
  %% ===== UC 6.0 View Personal Activity List =====
  Student -->|student id| P6
  P6 -->|student id| DS2
  DS2 -->|participation records| P6
  P6 -->|activity ids| DS1
  DS1 -->|activity display data| P6
  P6 -->|upcoming and past lists| Student


```

![](assets/c2uepP8SPiONkBF__q9OfgXKQJq7kokFE3fXXIzbKG0=.png)

