# Teamspace Home

Use the following page to give AI the CONTEXT to do this week’s task. you’re not forced to do it, it’s just a suggestion! Accompany it with your current task

OUTDATED

[AGENT.md](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/aNOFJIwDiSstfUEqwcqkT)

I suggest you to export it as a Markdown and then give it to AI as it is. In addition to that I would give to it the current US or the Requirements too!!

***

## We're currently working on use cases. The complete Workflow:

We do not transform user stories into use cases directly. Each person should start from one or more MVP user stories, identify the actor and the actor’s goal, and propose a candidat&#x65;**&#x20;**&#x75;se case at the user-goal level.

1. Initially the objective is only to **extract and name** candidate **use cases**. We should not write the full narrative immediately. The link between User Stories, Functional Requirements, and relevant constraints should be used only as support to understand the interaction, business rules, inputs, outputs, conditions, and possible exceptions behind the use case.
2. After the candidate use cases are proposed, we review them. In this review, we merge overlaps, split use cases that are too broad, remove duplicates, and define the **final** **Use Case IDs** only once the set is stable. At the same time, we should already keep in mind the **Use-Case Ranking and Priority Matrix: &#x20;**&#x75;se cases are evaluated on a scale of **1 to 5** against six criteria: 
   1. significant impact on architectural design; (1)
   2. easy to implement but containing significant functionality; (2)
   3. risky, time-critical, or complex functions; (3)
   4. significant research or new/risky technology; (4)
   5. primary business functions; (5)
   6. and contribution to increasing revenue or decreasing costs. (6)
3. Then each each of us can complete the use case narratives (the minimum quantity i'll assign will be based on the previous list) using the structure: **Related Requirements, Initiating Actor, Actor’s Goal, Participating Actors, Preconditions, Postconditions, Main Success Scenario, and Alternate Scenarios**. (here some possible **`<<include>>`** or **`<<extend>>`** ideas may already emerge, and this is normal). see the example expanding number 3 !!!

4. After the narratives are drafted, we review them again in order to identify correct **<\<include>>** and **<\<extend>>** relationships. These relationships should be decided only after the use cases themselves are clear and stable.
5. Only at the end, when the use case set, names, narratives, and relationships are coherent, we use one unified AI prompt (that we'll create later) to generate the final use-case diagram in a consistent way.

Actors: student user, student host, campus admin

Write down the US you pick to analyze (to choose the name of use cases)

| 一鸣 | Matteo | Francesco                                               | Jacopo                                                                                                                                                                                                                                       |
| -- | ------ | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    |        | US-03&#xA;US-05&#xA;US-04&#xA;US-20&#xA;US-21&#xA;US-01 | US-02&#xA;US-06&#xA;US-07&#xA;US-08&#xA;US-09&#xA;US-10&#xA;US-11&#xA;US-12&#xA;US-13&#xA;US-14 &#xA;US-15&#xA;US-16&#xA;US-17&#xA;US-18&#xA;US-19&#xA;US-22&#xA;US-23&#xA;US-24&#xA;US-25&#xA;US-26&#xA;US-27&#xA;US-28&#xA;&#xA;&#xA;&#xA; |

| Use case ID                                                                                                                                | Actors                      | Fact 1 | Fact 2 | Fact 3 | Fact 4 | Fact 5 | Fact 6 | from US-?? | Related to                                                            | priority |
| ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | ------ | ------ | ------ | ------ | ------ | ------ | ---------- | --------------------------------------------------------------------- | -------- |
| [Create Activity](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/KXEYiHa4bu2dJkA-7t66P)                             | student host                | 4      | 4      | 3      | 1      | 5      | 3      | US-03      | FR-301,FR-302,FR-303,FR-304,FR-305,NFR-10,NFR-11,NFR-13               | 20       |
| [Manage Join Requests](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/5SDVRcE2RqFf5iwqJrL_U)                        | student host                | 4      | 3      | 4      | 1      | 5      | 3      | US-05      | FR-0501,FR-0502,FR-2002,FR-1403,NFR-12,NFR-13                         | 20       |
| [Update Activity Status](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/PlCo2EP2eHDhTahwWH3hs)                      | student host                | 4      | 4      | 3      | 1      | 4      | 3      | US-05      | FR-0503,FR-2801,NFR-12                                                | 19       |
| [Join Activity](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/dat1BmcX5rVdTU4klyR7T)                               | student guest               | 5      | 4      | 4      | 1      | 5      | 4      | US-20      | FR-305,FR-2001,FR-2002,FR-502,NFR-13,NFR-34                           | 23       |
| [View Activity Details](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/7un31qdSIBX7i4fimGpfi)                       | student guest               | 3      | 5      | 2      | 1      | 4      | 3      | US-21      | FR-302,FR-402,NFR-35                                                  | 18       |
| [Sign Up with University Email](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/IAejsYojrOf9U3nJJa3La)               | Student                     | 5      | 3      | 4      | 2      | 5      | 2      | US-01      | FR-101,FR-102,FR-103,FR-104,FR-105,NFR-01,NFR-02,NFR-03,NFR-04,NFR-05 | 21       |
| [Sign In](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/1DCGJ7xlFhSTB5JViUJkq)                                     | Student                     | 3      | 4      | 3      | 2      | 5      | 2      | US-15      | FR-1501,NFR-29                                                        | 19       |
| [Select Campus](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/QjcrMwjvxxIU6hDI3FGOS)                               | Student                     | 4      | 3      | 3      | 2      | 5      | 3      | US-16      | FR-105,FR-1601                                                        | 20       |
| [Report User or Activity](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/QeIbvBamqfGKuyVnH8r4R)                     | ,campus admin,student guest | 2      | 3      | 3      | 1      | 4      | 2      | US-17      | FR-1701,NFR-31                                                        | 15       |
| [Block User](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/3izl9uB4jhEBGkNb9DnrE)                                  | Student                     | 1      | 4      | 2      | 1      | 4      | 2      | US-18      | FR-1801,FR-1802                                                       | 14       |
| [Browse and Filter &#xA;Activities](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/jWvPBr5jNN28sIgw_FxIk)           | student guest               | 4      | 5      | 2      | 1      | 5      | 4      | US-04      | FR-401,FR-402,FR-403,FR-404,FR-405,FR-406,NFR-11,NFR-16,NFR-17        | 21       |
| [Set Up Profile](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/DyNWg1D6hK9S5ZNTIHUmf)                              | Student                     | 2      | 4      | 2      | 1      | 4      | 2      | US-14      | FR-1401,NFR-27                                                        | 15       |
| [Edit Profile](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/MKhxJo-O1zbFo5Luh5of0)                                | Student                     | 1      | 4      | 1      | 1      | 3      | 1      | US-14      | FR-1402,NFR-27                                                        | 11       |
| [Review Report](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/Yjnw1ZSpQh39Llcp-xPg6)                               | Campus Admin                | 2      | 3      | 3      | 1      | 4      | 2      | US-02      | FR-0201,FR-0202,FR-0203,NFR-06,NFR-07,NFR-08,NFR-09                   | 15       |
| [Notify Host of Join Event](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/a99NSKEOTtzTCmCK1LGkj)                   | student host                | 3      | 3      | 3      | 2      | 4      | 1      | US-06      | FR-601,FR-602,FR-603                                                  | 16       |
| [Notify Participant of Application Outcome](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/aWNAW3xUO_QT6JjhcafPy)   | student guest               | 3      | 3      | 3      | 2      | 4      | 1      | US-07      | FR-701,FR-702,FR-703,FR-704                                           | 16       |
| [Send Message](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/xb6hEVpUF582K8_AZ18ub)                                | Student                     | 3      | 4      | 3      | 2      | 4      | 2      | US-08      | FR-801,FR-802,FR-803                                                  | 18       |
| [View Personal Activity List](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/sUM6VisiryuGmhgSd2GgV)                 | Student                     | 1      | 4      | 1      | 1      | 3      | 1      | US-09      | FR-901,FR-902                                                         | 11       |
| [View Friends and Social Indicators](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/QKwqXi3b-2oPppMpfi4MN)          | Student                     | 2      | 3      | 2      | 1      | 3      | 2      | US-10      | FR-1001,FR-1002                                                       | 13       |
| [Receive Activity Reminder](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/ACuOLxgsj9utcz_sMm3xL)                   | Student                     | 2      | 4      | 2      | 1      | 3      | 1      | US-11      | FR-1101                                                               | 13       |
| [Track Participation Points](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/nZUxqfEhw40iAgUokztD_)                  | Student                     | 2      | 3      | 3      | 2      | 3      | 2      | US-12      | FR-1201                                                               | 15       |
| [Upload Activity Photo](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/i5WQZzbr4PC6yJMjj0FPt)                       | Student                     | 1      | 4      | 2      | 1      | 2      | 1      | US-13      | FR-1301                                                               | 11       |
| [View Community Rules](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/_0CWh0ScECqJV9D0MrLsi)                        | Student                     | 1      | 5      | 1      | 1      | 4      | 1      | US-19      | FR-1901                                                               | 13       |
| [View Student Minimal Profile](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/kJBuM91ttwcteu4_UTp8y)                | Student                     | 2      | 4      | 2      | 1      | 4      | 1      | US-22      | FR-501,FR-1403                                                        | 14       |
| [Configure New Campus](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/Nb_gWJN_9zWwkT5GZX9Io)                        | Campus Admin                | 5      | 3      | 4      | 2      | 5      | 3      | US-23      | FR-2301,FR-2302                                                       | 22       |
| [Manage Campus Structured Options](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/KyNiQhec79z1aoY2veAdE)            | Campus Admin                | 4      | 4      | 3      | 1      | 5      | 3      | US-24      | FR-301,FR-304,FR-2302                                                 | 20       |
| [Set Activity Date and Time](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/b3N3aTKArAqjHuVf8MHYn)                  | student host                | 2      | 4      | 2      | 1      | 4      | 1      | US-25      | FR-2501,FR-2502,FR-402,FR-404                                         | 14       |
| [Delete Activity](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/hkjMM03whBG_BTUKOyquj)                             | student host                | 2      | 4      | 3      | 1      | 4      | 2      | US-26      | FR-2601,FR-2602,FR-2603                                               | 16       |
| [Withdraw Join Request](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/Y09s14lLu8Cdhe5wYcuza)                       | Student                     | 2      | 4      | 2      | 1      | 4      | 1      | US-27      | FR-2701,FR-2703,FR-2704                                               | 14       |
| [Leave Joined Activity](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/hDKwC8e1ESgGbHEwKM3nV)                       | Student                     | 2      | 4      | 2      | 1      | 4      | 1      | US-27      | FR-2702,FR-2703,FR-2704,FR-901                                        | 14       |
| [Notify Participant of Activity Cancellation](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/ldrgCfn7rfTMP50fVdGt5) | Student                     | 2      | 4      | 3      | 1      | 4      | 1      | US-28      | FR-2801,FR-2802,FR-2803,FR-2804,FR-503                                | 15       |



***

Task marked as **Done&#x20;**&#x67;oes into the **Past&#x20;**&#x73;ection every Wednesday.

[Tasks Tracker (weekly)](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/3ZgnpVIEJd)

***

# Our Pages

Now Active

[brainstorming](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/XpdG2l6AvF)

Forever Active

[Requirement Gathering](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/unZ3tsKrSfPVCILYOFwHD)

Retired

[Idea selection](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/3Ag-BcUvgQ)

[inCampus Social](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/nO_Bsf_Mzb)

## NABCD

The target users are**university students living on or around campus**, especially those who spend large parts of the day alone outside class hours.

The core problem is**social isolation during campus time**. Many students attend lectures, eat, walk around campus, and spend breaks or evenings alone, often abusing of the phone, scrolling, gaming, or staying in their room. Over time, this can normalize isolation and reduce opportunities for real social interaction, spontaneous activities, and a stronger sense of belonging to campus life. The issue is not simply being alone, but the absence of a simple andlow-friction way to find someone to share ordinary moments with: lunch, a coffee break, a walk, study time, sports, or campus events.

Today, students typically solve this in one of the following ways:

* by relying only on existing friends or roommates → too dependent on already having a social circle
* by using generic social media or messaging apps → too broad and not campus-specific
* by joining existing group chats → too socially demanding for students who want lightweight interaction, too dispersive, with too much noise and no real intent-based matching
* by doing nothing and spending time alone → 😢

## MVP

1. Campus-based onboarding
2. Minimal profile
3. Create activity
4. Browse campus activity feed
5. Join / request to join
6. Activity status management
7. Basic trust & safety
   1. rules
   2. report
   3. block

wa: publishing an activity you can decide whether put i public or just friends OR put some pramaters for the person you are looking for: “plays lord of the kings”, “handsome guy”…

[Post MVP deliverables!](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/FmUl5Cmz4v)

## Milestones (weekly)

**Milestone 1:**&#x4D;VP scope approved

**Milestone 2:**&#x55;X and architecture frozen

**Milestone 3:**&#x43;ore flow implemented

**Milestone 4:**&#x46;ull MVP implemented

**Milestone 5:**&#x54;ested and polished MVP

**Milestone 6:**&#x46;inal presentation and roadmap

## Price budget

[Price budget](https://app.affine.pro/workspace/d111b336-4261-4720-a05c-80fffe2c0b23/Xvis1l2iJt)

## The team

***

Francesco

一鸣

Matteo

!Jacopo

***

* Passion
* Love

***

