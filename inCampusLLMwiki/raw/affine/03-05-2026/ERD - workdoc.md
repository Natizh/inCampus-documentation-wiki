# ERD - workdoc

# InCampus High-Level ERD Draft

## Purpose

This document explains the ERD draft for InCampus. The Mermaid version has been expanded from the first high-level version into a more specific logical ERD: it now includes the documented entity attributes, primary keys, foreign keys, main relationships, and cardinalities.

This is still not a physical database schema. It does not define indexes, concrete SQL types, implementation-level cascade syntax, API contracts, migrations, or final storage mechanics for weak references. Detailed defaults, domains, nullability, and constraints are kept in this Markdown file and in `work/entity-attributes-catalog.md` rather than as Mermaid inline comments, to keep the Mermaid source compatible with Mermaid Chart.

## Mermaid Naming Note

Mermaid `erDiagram` identifiers use underscores to keep the diagram renderable. The official entity names are:

| Mermaid Identifier         | Official Entity Name     |
| -------------------------- | ------------------------ |
| `Campus`                   | Campus                   |
| `Campus_Location`          | Campus Location          |
| `Activity_Category`        | Activity Category        |
| `Student_Account`          | Student Account          |
| `Student_Profile`          | Student Profile          |
| `University_Identity_Rule` | University Identity Rule |
| `Activity`                 | Activity                 |
| `Participation`            | Participation            |
| `Block_Relationship`       | Block Relationship       |
| `Report_Record`            | Report Record            |
| `Notification_Record`      | Notification Record      |

## Modeled Entities

| Entity                   | PK                 | Relevant FK / Reference Fields Included In Relationships                                                      |
| ------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| Campus                   | `CampusID`         | None                                                                                                          |
| Campus Location          | `LocationID`       | `CampusID`                                                                                                    |
| Activity Category        | `CategoryID`       | `CampusID`                                                                                                    |
| Student Account          | `StudentAccountID` | `SelectedCampusID`                                                                                            |
| Student Profile          | `ProfileID`        | `StudentAccountID`                                                                                            |
| University Identity Rule | `DomainRuleID`     | None modeled as FK                                                                                            |
| Activity                 | `ActivityID`       | `CampusID`, `HostAccountID`, `CategoryID`, `MeetingPointID`                                                   |
| Participation            | `ParticipationID`  | `ActivityID`, `StudentAccountID`                                                                              |
| Block Relationship       | `BlockID`          | `InitiatorAccountID`, `BlockedAccountID`                                                                      |
| Report Record            | `ReportID`         | `ReporterAccountID`, `CampusScopeID`, `ReportedAccountID`, `ReportedActivityID`                               |
| Notification Record      | `NotificationID`   | `RecipientAccountID`, `TriggeringAccountID`, `RelatedActivityID`, `RelatedParticipationID`, `TargetContextID` |

## Relationship Summary

| Entity A          | Relationship         | Entity B            | Cardinality                                   | Notes                                                                                                   |
| ----------------- | -------------------- | ------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Campus            | contains             | Campus Location     | 1:N                                           | `CampusLocation.CampusID` references `Campus.CampusID`.                                                 |
| Campus            | contains             | Activity Category   | 1:N                                           | `ActivityCategory.CampusID` references `Campus.CampusID`.                                               |
| Campus            | scopes               | Activity            | 1:N                                           | `Activity.CampusID` is required.                                                                        |
| Campus            | scopes review        | Report Record       | 1:N                                           | `ReportRecord.CampusScopeID` is required for review scope.                                              |
| Campus            | registers            | Student Account     | 0..1:N during onboarding; 1:N after selection | `StudentAccount.SelectedCampusID` is nullable until campus selection.                                   |
| Student Account   | owns                 | Student Profile     | 1:0..1                                        | Account may exist before profile/onboarding completion.                                                 |
| Student Account   | hosts                | Activity            | 1:N                                           | `Activity.HostAccountID` is required and immutable after creation.                                      |
| Activity Category | classifies           | Activity            | 1:N                                           | `Activity.Category.CategoryID` references `ActivityCategory.CategoryID`; `CategoryLabel` is a snapshot. |
| Campus Location   | is meeting point for | Activity            | 1:N                                           | `Activity.MeetingPointID` references `CampusLocation.LocationID`; `MeetingPointLabel` is a snapshot.    |
| Activity          | receives             | Participation       | 1:N                                           | `Participation.ActivityID` is required; cascade-delete on activity hard-delete.                         |
| Student Account   | submits              | Participation       | 1:N                                           | `Participation.StudentAccountID` is required.                                                           |
| Student Account   | initiates            | Block Relationship  | 1:N                                           | Initiator side of the directed block record.                                                            |
| Student Account   | is blocked in        | Block Relationship  | 1:N                                           | Target side of the directed block record.                                                               |
| Student Account   | submits              | Report Record       | 1:N                                           | `ReportRecord.ReporterAccountID` is required.                                                           |
| Student Account   | is reported in       | Report Record       | 0..1:N                                        | Optional target, only when `TargetType = user`.                                                         |
| Activity          | is reported in       | Report Record       | 0..1:N                                        | Optional target, only when `TargetType = activity`.                                                     |
| Student Account   | receives             | Notification Record | 1:N                                           | `NotificationRecord.RecipientAccountID` is required.                                                    |
| Student Account   | triggers             | Notification Record | 0..1:N                                        | `TriggeringAccountID` is nullable for system/time-triggered notifications.                              |
| Activity          | is referenced by     | Notification Record | 0..1:N                                        | `RelatedActivityID` is nullable / weak.                                                                 |
| Participation     | is referenced by     | Notification Record | 0..1:N                                        | `RelatedParticipationID` is nullable / weak.                                                            |

## Important Constraints

* `University Identity Rule` validates `Student Account` through domain matching: `StudentAccount.UniversityEmail` must match a supported `UniversityIdentityRule.EmailDomain`.
* No strong FK is modeled between `Student Account` and `University Identity Rule` because `Student Account` does not contain `DomainRuleID`.
* The direct N:M relation between `Student Account` and `Activity` is not drawn. It is resolved by `Participation`.
* `Participation.RecordType` domain: `request`, `participation`.
* `Participation.Status` domain: `pending`, `confirmed`, `declined`.
* `Activity.Status` domain: `open`, `full`, `completed`, `cancelled`.
* `deleted` is not modeled as `Activity.Status`; activity deletion is hard-delete lifecycle behavior.
* A strict unique constraint applies to `(Participation.ActivityID, Participation.StudentAccountID)`, permanently preventing users from re-applying if they have been declined.
* `Pending Approval` is not an activity status. It belongs to `Participation.Status`.
* `BlockRelationship.InitiatorAccountID` must not equal `BlockedAccountID`.
* The pair `(InitiatorAccountID, BlockedAccountID)` should be unique.
* A stored block is enforced symmetrically for activity visibility, detail access, profile access, new join/request interaction, and cross-user notification suppression.
* Report target XOR rule: exactly one of `ReportedAccountID` and `ReportedActivityID` must be present.
* If `ReportRecord.TargetType = user`, `ReportedAccountID` is required and `ReportedActivityID` must be empty.
* If `ReportRecord.TargetType = activity`, `ReportedActivityID` is required and `ReportedAccountID` must be empty.
* `Notification Record` is an event sink. It stores notification consequences and references current business context, but it must not duplicate `Activity`, `Participation`, `Student Account`, or `Block Relationship` state.
* Opening a notification is read-only navigation plus current-state/access re-check.
* `NotificationRecord.TargetContextID` is a navigation/context reference, not necessarily a strict FK.
* If a referenced activity or participation no longer exists, navigation should use `NotificationFallbackView`.

## Open Points Preserved

* Whether `University` should become a separate entity.
* Whether `University Identity Rule` remains only a validation rule or later becomes a strong FK target.
* Whether `Campus Admin` is an entity, an external identifier, or a role on another account model.
* `ReportRecord.ReviewedByAdminID` exists, but no `Campus Admin` or `Admin Account` entity is currently defined.
* Whether `NotificationRecord.TargetContextID` is a strict FK or only a route/navigation reference.
* Whether notification related references should use nullable FK or weak-reference semantics in the implementation.
* Whether all MVP notifications always use `PushAndInApp` or whether flexible `NotificationChannels` will be needed.
* Exact schema-level uniqueness for `(BlockRelationship.InitiatorAccountID, BlockRelationship.BlockedAccountID)`.

## Assumptions Made

* `StudentAccount.SelectedCampusID` is the selected-campus reference, following the current attribute catalog and AP CRUD interpretation.
* `Student Account 1:0..1 Student Profile` is used because an account can exist before profile setup is completed.
* `Activity.Category.CategoryID` is modeled as the real category reference; `CategoryLabel` is included in the expanded Mermaid as a snapshot fallback label.
* `Activity.MeetingPointID` references `Campus Location`; `MeetingPointLabel` is included in the expanded Mermaid as a snapshot fallback label.
* Notification references to activity and participation are shown as optional relationships because the source allows deleted/unavailable referenced context.

## Intentionally Excluded

* Physical database details such as exact SQL types, indexes, unique constraints implementation, and migration syntax.
* Separate grouped pseudo-attributes such as `BusinessContextReferences`, `TargetContext`, `Category`, and `MeetingPoint`; their leaf fields are included where useful.
* Validation-only relationship line between `University Identity Rule` and `Student Account`.
* Direct N:M line between `Student Account` and `Activity`.
* A `Campus Admin` or `Admin Account` entity.
* A separate `University` entity.
* Detailed notification delivery provider, retry, read/unread, or push-provider model.
* Detailed admin authorization model.
