# Select Campus

### Use Case ID

**Select Campus**

### Use Case Name

**Select Campus**

### Related Requirements

**FR:** FR-0105, FR-1601 **NFR:** NFR-30

### Initiating Actor

Student

### Actor's Goal

Confirm or select the correct campus from the campuses associated with the student's university during onboarding, so that the student accesses the correct campus environment and only sees campus-relevant content.

### Participating Actors

* System (determines university from email domain, presents campus options, associates campus with account)

### Preconditions

* The student has completed registration with a verified university email address.
* The system has already determined the student's university from the verified email domain (FR-0105).
* At least one campus is configured and associated with the student's university in the system.

### Postconditions

* The student's account is associated with the selected campus (FR-1601).
* All campus-specific content shown to the student (activity feed, categories, locations) is scoped to the selected campus.
* The onboarding flow can proceed to the next step.

### Main Success Scenario

1. The system identifies the campuses associated with the student's university based on the verified email domain (FR-0105).
2. The system presents the list of available campuses to the student in a clear and unambiguous way (NFR-30).
3. The student selects the campus where they are based.
4. The student confirms the selection.
5. The system associates the student's account with the selected campus (FR-1601).
6. The system confirms the campus association and proceeds with the onboarding flow.

### Alternate Scenarios

**A1. Only one campus available** At step 2, the system determines that only one campus is associated with the student's university. The system presents that campus as the default and asks the student to confirm. The flow continues from step 4.

**A2. Student selects the wrong campus and corrects before confirmation** At step 4, the student realizes the selection is incorrect before confirming. The student changes the selection. The flow continues from step 3.

**A3. No campuses configured for the university** At step 1, the system finds that no campuses have been configured for the student's university. The system informs the student that campus selection is not available at this time and that the onboarding cannot be completed. The student's account remains without a campus association. *(This scenario should be rare and indicates a configuration gap.)*

### Potential Connections with Other Use Cases

* **Connected UC:** Sign Up with University Email **Relationship type:** Precondition dependency **Reason:** The campus selection step occurs during onboarding, after the student has registered and verified their university email. The verified email domain is what allows the system to determine the university and present the correct campuses (FR-0105). Select Campus depends on the successful completion of Sign Up. **Confidence:** High
* **Connected UC:** Set Up Profile **Relationship type:** Shared onboarding sequence **Reason:** Both Select Campus and Set Up Profile (US-14, FR-1401) occur during the onboarding flow after registration. The exact ordering within onboarding is not fully specified, but they are part of the same post-registration sequence. **Confidence:** High (connection exists), medium (exact ordering)
* **Connected UC:** Configure New Campus **Relationship type:** Precondition dependency (upstream, admin side) **Reason:** The campuses available for selection must have been previously configured by a campus admin through the Configure New Campus use case (FR-2301, FR-2302). If no campus has been configured, scenario A3 occurs. **Confidence:** High
* **Connected UC:** Browse and Filter Activities **Relationship type:** Postcondition consequence **Reason:** The campus selected here determines which activities the student will see in the campus activity feed. All content scoping downstream depends on this association (FR-1601). **Confidence:** High
* **Connected UC:** Create Activity **Relationship type:** Postcondition consequence **Reason:** When the student later creates an activity, it is associated with the campus selected during this step. The campus-specific categories and locations available during creation are determined by this association. **Confidence:** High
* **Connected UC:** Sign In **Relationship type:** State dependency **Reason:** After the initial onboarding (which includes campus selection), subsequent sign-ins use the already-stored campus association. Sign In does not repeat campus selection but depends on the state created here. **Confidence:** High

### Note

* US-16 mentions "confirm or select," suggesting that in some cases the campus may be pre-suggested (e.g., if only one campus exists for the university, or if a default is inferred). The narrative handles this conservatively through scenario A1.
* The exact position of Select Campus within the onboarding sequence (before or after profile setup, immediately after email verification or at first sign-in) is not fully fixed in the current project material. This narrative treats it as part of the post-registration onboarding flow without prescribing the exact order.
* Whether the student can change their campus association after onboarding is not addressed by the current user stories or FRs. This is left unresolved.
