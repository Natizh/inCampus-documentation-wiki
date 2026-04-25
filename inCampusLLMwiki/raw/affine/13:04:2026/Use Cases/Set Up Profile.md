# Set Up Profile

### Use Case ID

**Set Up Profile**

### Use Case Name

**Set Up Profile**

### Related Requirements

**FR:** FR-1401 **NFR:** NFR-27

### Initiating Actor

Student

### Actor's Goal

Create a minimal profile immediately after account registration, so that other students can recognize the student enough to feel safe joining or accepting activities.

### Participating Actors

* System (presents profile fields, validates input, stores profile)

### Preconditions

* The student has completed registration with a verified university email address.
* The student's account has been activated.
* The student has not yet created a profile (this is the initial profile creation, not an edit).

### Postconditions

* A minimal profile has been created and associated with the student's account.
* The profile information is stored and ready to be displayed in relevant activity contexts where profile viewing is allowed (FR-1403).
* The onboarding flow can proceed to the next step.

### Main Success Scenario

1. The system presents the minimal profile creation flow as part of the post-registration onboarding.
2. The system displays the required and optional profile fields to the student.
3. The student fills in the profile fields with the requested information.
4. The student confirms and submits the profile.
5. The system validates that all mandatory profile fields have been completed and that the values are within acceptable formats and constraints.
6. The system creates the minimal profile and associates it with the student's account.
7. The system confirms to the student that the profile has been created successfully.
8. The onboarding flow proceeds to the next step.

### Alternate Scenarios

**A1. Missing mandatory profile fields** At step 5, the system detects that one or more mandatory fields have not been completed. The system informs the student which fields are missing or incomplete. The profile is not created. The student can correct the input and resubmit.

**A2. Invalid field values** At step 5, the system detects that one or more field values do not meet the expected format or constraints (e.g., text too long, unsupported characters). The system informs the student which fields need correction. The profile is not created. The student can fix the values and resubmit.

**A3. Student abandons profile creation before submission** At any step before step 4, the student exits or closes the profile creation flow without submitting. No profile is created. The student will be prompted to complete profile creation the next time they access the onboarding flow. *(Note: whether the app allows the student to proceed without a profile or blocks further onboarding is not explicitly specified — treated conservatively as blocking.)*

### Potential Connections with Other Use Cases

* **Connected UC:** Sign Up with University Email **Relationship type:** Precondition dependency **Reason:** Profile creation occurs after the student has registered and verified their email. The account must exist and be activated before a profile can be created. Set Up Profile is part of the onboarding sequence that follows Sign Up. **Confidence:** High
* **Connected UC:** Select Campus **Relationship type:** Shared onboarding sequence **Reason:** Both Set Up Profile and Select Campus occur during the post-registration onboarding flow. The exact ordering between them is not fixed in the current project material, but they are part of the same sequence. **Confidence:** High (connection exists), medium (exact ordering)
* **Connected UC:** Edit Profile **Relationship type:** Sequential dependency **Reason:** Set Up Profile creates the initial profile; Edit Profile (FR-1402) allows the student to modify it later. Edit Profile cannot occur until Set Up Profile has been completed at least once. **Confidence:** High
* **Connected UC:** View Student Minimal Profile **Relationship type:** Postcondition consequence **Reason:** The profile created here is what other students see when they view the student's minimal profile in relevant activity contexts (FR-1403). The quality and completeness of the viewed profile depends on what was provided during Set Up Profile (and any subsequent edits). **Confidence:** High
* **Connected UC:** Join Activity **Relationship type:** Precondition dependency (downstream) **Reason:** A student's minimal profile is shown to the host when reviewing join requests (FR-0501). If no profile has been created, the host would have no information to evaluate. The profile created here supports the trust and safety goal of the participation flow. **Confidence:** High
* **Connected UC:** Manage Join Requests **Relationship type:** State dependency (downstream) **Reason:** When the host reviews pending join requests, the system shows the minimal profiles of requesting students (FR-0501). The profile content created during Set Up Profile is what the host sees in that context. **Confidence:** High
* **Connected UC:** Create Activity **Relationship type:** Precondition dependency (downstream) **Reason:** When a student creates an activity, their profile is associated with the activity as the host identity. Other students viewing the activity details see the host's minimal profile. A completed profile is a prerequisite for meaningful participation in the system. **Confidence:** Medium
* **Connected UC:** Sign In **Relationship type:** State dependency **Reason:** On subsequent sign-ins, the profile already exists and does not need to be created again. If the student somehow signs in without having completed profile creation (e.g., abandoned onboarding), the system may need to redirect them to complete Set Up Profile before granting full access. This edge case is not explicitly specified in the current FRs. **Confidence:** Medium

### Note

* The exact minimum profile fields are **not yet fixed** in the current project material. The AGENT context explicitly lists this as an unresolved decision. This narrative describes the profile creation flow abstractly without prescribing specific fields. The team should decide the mandatory and optional fields before this narrative is considered stable.
* Whether a profile photo is required, optional, or omitted in the first version is also unresolved. If photos are included, how authenticity would be enforced is an additional open question. This narrative does not assume a photo field.
* NFR-27 requires the profile creation flow to be "simple enough for a newly registered student to complete without guidance." This implies a small number of fields and a straightforward flow, consistent with the "minimal profile" concept. The team should ensure the final field set respects this constraint.
* Whether the app blocks further onboarding and app usage until the profile is created (scenario A3) is not explicitly stated. US-14 says "immediately after the registration of the account I can create \[...] a minimal profile," which implies it is part of onboarding, but does not clarify whether it is strictly mandatory before any other action. This is treated conservatively as a blocking step.
* NFR-28 (security of profile information) is related to how the profile is displayed, not to the creation flow itself. It is not listed under Related Requirements for this use case but is relevant downstream in View Student Minimal Profile.
