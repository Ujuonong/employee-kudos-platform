# Kudos Feature Specification

Task 2

QUESTION 1: Donnot implement just plan: Create a feature for our internal web app that allows users to give 'kudos' to their colleagues. A user should be able to select another user from a list, write a short message of appreciation, and submit it. There should also be a public feed on the main dashboard where all recently submitted kudos are visible. donnot implement i want you do write the planing first 

QUESTION 2: i will alsolike you to add this to the planing: Edit the generated requirements to add a new user story for an administrator to be able to hide or delete inappropriate kudos messages

QUESTION 3: Review the existing proposed database schema and update the design document to support the moderation requirements for the Kudos feature.

Specifically, modify the **Kudos** table/entity to include a new field:

- **Field name:** `is_visible`
- **Data type:** Boolean
- **Default value:** `true`
- **Purpose:** Determines whether a Kudos entry is visible in the public dashboard feed. A value of `true` means the Kudos is visible, while `false` means it is hidden from public view for moderation purposes.
Update the relevant database schema section of the design document and ensure that the field is properly reflected in:

1. The Kudos table definition.
2. The explanation of each field.
3. The moderation-related behavior of the public Kudos feed.
4. Any relevant assumptions or design considerations.
Do not implement the database change, create a migration, modify application code, or run any commands.

This is a **design-document-only update**.
 
 QUESTION 4: now i want you to implement this . no mistakes
  
## 1. Overview
The Kudos feature allows employees to send appreciation messages to colleagues through an internal web app. Submitted messages are displayed in a public feed on the main dashboard, and administrators can moderate inappropriate content by hiding or deleting entries.

## 2. Goals
- Enable users to send short appreciation messages to colleagues
- Show recent visible kudos on the dashboard feed
- Support moderation actions for administrators

## 3. User Roles
- End User: Can submit a kudos and view the public feed
- Administrator: Can hide, restore, or delete kudos entries

## 4. Functional Requirements
### 4.1 Submission
- Users must select a recipient from a predefined list
- Users must enter a non-empty message up to 280 characters
- A submitted kudos is saved and shown in the feed if visible

### 4.2 Public Feed
- The dashboard displays the most recent visible kudos entries
- Only entries with is_visible = true are shown in the public feed
- Newly submitted kudos appear at the top of the feed

### 4.3 Moderation
- Administrators can hide a visible kudos entry from public view
- Administrators can restore a hidden entry
- Administrators can permanently delete an inappropriate kudos entry

## 5. Data Model
### Kudos
- id: Unique identifier
- senderUserId: The user who submitted the kudos
- recipientUserId: The colleague receiving the kudos
- message: The appreciation message
- createdAt: Timestamp of submission
- is_visible: Boolean flag controlling public visibility; defaults to true

## 6. Design Notes
- The public feed should read only entries where is_visible is true
- The moderation UI should be available only when admin mode is enabled
- The implementation should preserve the message history even when an entry is hidden

## 7. Acceptance Criteria
- A user can submit a kudos successfully
- The kudos appears in the public dashboard feed when visible
- An administrator can hide or delete inappropriate kudos
- A hidden kudos can be restored by an administrator
