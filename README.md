# Employee Kudos Platform

**Repository**: [https://github.com/Ujuonong/employee-kudos-platform](https://github.com/Ujuonong/employee-kudos-platform)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## Overview

The Employee Kudos Platform is an enterprise-grade web application designed to facilitate peer-to-peer employee recognition and appreciation within organizational environments. The platform provides a moderated, secure interface for team members to acknowledge and celebrate individual and collective contributions, thereby fostering a positive workplace culture and improving team morale.

**Key Objectives:**
- Enable transparent peer recognition within teams
- Maintain professional communication standards through content moderation
- Provide visibility into team appreciation activities
- Establish a cultural foundation for recognition-driven engagement

---

## Features

### Core Functionality

- **Recognition Submission System**: Intuitive form interface for team members to submit appreciation messages
- **Real-time Feed Dashboard**: Chronologically ordered display of recognition activities with reverse-chronological sorting
- **Content Moderation Framework**: Administrative controls for managing feed visibility and removing inappropriate content
- **Data Persistence Layer**: Browser-based storage mechanism for maintaining recognition records across sessions
- **Responsive User Interface**: Mobile-first, adaptive design supporting desktop and mobile platforms
- **Timestamp Logging**: ISO 8601 compliant timestamp tracking for all recognition entries
- **Team Registry Management**: Pre-configured team member roster with customizable expansion capabilities
- **Message Governance**: Character-limited messaging (280 characters) to ensure concise communications

### Administrative Capabilities

- Toggle-based moderation mode activation
- Per-message visibility control
- Content filtering and review interface
- Bulk management capabilities for recognition entries

---

## System Requirements

### Browser Compatibility

| Browser | Minimum Version | Status |
|---------|-----------------|--------|
| Google Chrome | 90+ | Fully Supported |
| Mozilla Firefox | 88+ | Fully Supported |
| Apple Safari | 14+ | Fully Supported |
| Microsoft Edge | 90+ | Fully Supported |

### Environment

- JavaScript ES6+ support
- DOM Level 3 event handling
- localStorage API availability
- No external dependencies or build tools required

---

## Installation

### Prerequisites

- Compatible web browser (see [System Requirements](#system-requirements))
- No server infrastructure required
- No build process necessary

### Deployment Steps

1. **Extract Project Files**
   ```bash
   git clone https://github.com/Ujuonong/employee-kudos-platform.git
   cd employee-kudos-platform
   ```

2. **Open Application**
   - Double-click `index.html` or open via browser:
   ```
   file:///path/to/employee-kudos-platform/index.html
   ```

3. **Verify Installation**
   - Application should load without console errors
   - Initial seed data should populate the recognition feed
   - Form fields should be interactive

---

## Usage

### User Workflows

#### 1. Submitting Recognition

**Procedure:**
1. Navigate to the "Send a kudos" form panel (left sidebar)
2. Select recipient from the "Recognize" dropdown menu
3. Compose appreciation message in the textarea field
4. Verify character count (maximum 280 characters)
5. Click "Submit kudos" button
6. Confirmation: Message will appear in the public feed within seconds

**Message Guidelines:**
- Focus on specific achievements or behaviors
- Maintain professional tone
- Reference tangible contributions
- Keep messages concise and impactful

#### 2. Viewing Recognition Feed

**Procedure:**
1. Review the "Recent kudos" panel (right sidebar)
2. Messages display in reverse chronological order (newest first)
3. Each entry displays sender, recipient, message content, and timestamp
4. Only moderated (visible) messages appear in the public dashboard

**Feed Interpretation:**
- Sender → Recipient format indicates recognition direction
- Timestamps display in localized date/time format
- Empty state message indicates no visible recognitions

#### 3. Administrative Moderation

**Procedure:**
1. Locate "Admin moderation" toggle in the header (top-right corner)
2. Click toggle to activate moderation mode
3. Review all entries with visibility status indicators
4. Click "Hide" button on any entry to remove from public feed
5. Toggle off to deactivate moderation mode

**Moderation Standards:**
- Review entries for professional appropriateness
- Remove content that violates workplace policies
- Maintain consistency in moderation decisions
- Document rationale for significant removals

---

## Architecture

### System Design

```
┌─────────────────────────────────────────────┐
│         User Interface Layer                │
│  (HTML5 Semantic Structure & Forms)         │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────┴──────────────────────────┐
│      Application Logic Layer                │
│  (Vanilla JavaScript State Management)      │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────┴──────────────────────────┐
│      Presentation Layer                     │
│  (CSS3 Styling & Responsive Layout)         │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────┴──────────────────────────┐
│      Persistence Layer                      │
│  (Browser localStorage API)                 │
└─────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Markup | HTML5 | Semantic document structure |
| Styling | CSS3 | Visual presentation and layout |
| Logic | JavaScript (ES6+) | Application state and behavior |
| Storage | localStorage | Client-side data persistence |
| Deployment | Static Files | Browser-based execution |

### Component Architecture

**app.js** - Core Application Module
- State management and data lifecycle
- Event handler registration and delegation
- Feed rendering and DOM manipulation
- localStorage integration

**index.html** - Presentation Layer
- Form interface for submission
- Feed display container
- Administrative control elements
- Accessibility attributes

**styles.css** - Styling Module
- Color scheme and typography
- Layout composition (flexbox/grid)
- Responsive breakpoints
- Interactive state styling

---

## API Reference

### Core Functions

#### `loadKudos()`
Retrieves recognition entries from persistent storage or loads default dataset.

**Returns:** `Array<KudosEntry>`
**Dependencies:** localStorage API
**Behavior:**
- Attempts to parse stored data from `STORAGE_KEY`
- Returns initial seed data if storage is empty
- Implements error recovery with fallback to default state

**Usage:**
```javascript
let kudosEntries = loadKudos();
```

---

#### `saveKudos()`
Persists current recognition entries to browser localStorage.

**Parameters:** None (uses global `kudosEntries` array)
**Returns:** `void`
**Side Effects:** Modifies localStorage state

**Usage:**
```javascript
saveKudos();
```

---

#### `renderFeed()`
Generates and injects HTML for recognition feed display.

**Behavior:**
- Filters visible entries (is_visible === true)
- Sorts chronologically (newest first)
- Generates card markup with metadata
- Injects admin controls if moderation mode enabled
- Displays empty state if no visible entries

**Returns:** `void` (DOM manipulation)

**Usage:**
```javascript
renderFeed();
```

---

#### `populateRecipients()`
Dynamically populates recipient selection dropdown.

**Behavior:**
- Clears existing options
- Iterates recipients array
- Creates option elements for each team member

**Returns:** `void` (DOM manipulation)

**Usage:**
```javascript
populateRecipients();
```

---

#### `formatTimestamp(dateString)`
Converts ISO 8601 timestamp to localized format.

**Parameters:**
- `dateString` (String): ISO 8601 formatted date

**Returns:** `String` (formatted date/time)

**Example:**
```javascript
const formatted = formatTimestamp("2024-01-15T10:30:00.000Z");
// Output: "1/15/2024, 10:30 AM"
```

---

## Data Models

### KudosEntry Schema

```typescript
interface KudosEntry {
  id: string;              // Unique identifier (UUID format recommended)
  senderUserId: string;    // Sender identifier
  senderName: string;      // Sender display name
  recipientUserId: string; // Recipient identifier
  recipientName: string;   // Recipient display name
  message: string;         // Recognition message (max 280 characters)
  createdAt: string;       // ISO 8601 timestamp
  is_visible: boolean;     // Moderation visibility flag
}
```

### Complete Example

```json
{
  "id": "seed-1",
  "senderUserId": "me",
  "senderName": "You",
  "recipientUserId": "alex",
  "recipientName": "Alex Chen",
  "message": "Thank you for stepping up and helping the team hit the launch milestone.",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "is_visible": true
}
```

---

## Configuration

### Storage Configuration

**Storage Key:** `kudos-board-state-v1`
**Storage Type:** localStorage (client-side)
**Scope:** Per-browser instance
**Retention:** Persists until browser cache cleared

**Modify Storage Key:**
```javascript
const STORAGE_KEY = "kudos-board-state-v1"; // Line 1 in app.js
```

### Team Member Configuration

**Location:** `recipients` array in app.js (lines 4-8)

**Current Configuration:**
```javascript
const recipients = [
  { id: "alex", name: "Alex Chen" },
  { id: "maria", name: "Maria Gomez" },
  { id: "david", name: "David Kim" },
  { id: "sophia", name: "Sophia Patel" },
];
```

**To Add Team Members:**
```javascript
const recipients = [
  { id: "user-unique-id", name: "Employee Full Name" },
  // Add additional members following this pattern
];
```

### Message Length Configuration

**Location:** index.html, line 30

**Current Setting:** 280 characters

**Modification:**
```html
<textarea id="message" maxlength="500" ...></textarea>
```

### Visual Theme Configuration

**Location:** styles.css, lines 1-5

**CSS Variables:**
```css
:root {
  color-scheme: light;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f4f7fb;
  color: #14213d;
}
```

---

## Development

### Project Structure

```
employee-kudos-platform/
├── index.html              # Application entry point
├── app.js                  # Application logic (main module)
├── styles.css              # Stylesheet definitions
├── README.md               # Documentation
└── .gitignore              # Git configuration
```

### Code Standards

- **Naming Conventions:** camelCase for variables/functions, CONSTANT_CASE for constants
- **Comments:** Document complex logic and business rules
- **Error Handling:** Implement try-catch for storage operations
- **DOM Manipulation:** Use getElementById and modern DOM APIs
- **Event Handling:** Attach listeners to form submit events

### Local Development

1. Clone the repository
2. Make modifications to relevant files
3. Test in browser (no build step required)
4. Verify localStorage integration
5. Commit changes with descriptive messages

---

## Contributing

### Contribution Guidelines

1. **Fork the Repository**
   - Create personal fork on GitHub

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/feature-name
   ```

3. **Implement Changes**
   - Follow code standards outlined above
   - Test thoroughly in multiple browsers
   - Verify localStorage persistence

4. **Commit with Clear Messages**
   ```bash
   git commit -m "Add feature: descriptive message"
   ```

5. **Submit Pull Request**
   - Provide detailed description of changes
   - Reference related issues if applicable

### Recommended Enhancements

- User authentication and role-based access control
- Backend API integration for enterprise deployment
- Real-time synchronization across browser instances
- Advanced search and filtering capabilities
- Emoji reactions and engagement metrics
- Recognition categorization taxonomy
- Data export and reporting functionality
- Dashboard analytics and insights

---

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Support

### Getting Help

- **Documentation:** Refer to this README for comprehensive guidance
- **Issues:** Submit bug reports via GitHub Issues
- **Discussions:** Engage with the community in GitHub Discussions
- **Contact:** Open an issue with the "support" label for assistance

### Troubleshooting

**Issue:** Data not persisting between sessions
- **Solution:** Verify browser localStorage is enabled and not in private mode

**Issue:** Dropdown not showing team members
- **Solution:** Confirm `recipients` array is properly configured in app.js

**Issue:** Moderation controls not visible
- **Solution:** Activate admin mode toggle in header; refresh page if needed

---

## Changelog

| Version | Release Date | Changes |
|---------|-------------|---------|
| 1.0.0 | January 2024 | Initial release |

---

## Acknowledgments

- Built with vanilla JavaScript, HTML5, and CSS3
- Inspired by peer recognition best practices
- Designed for modern enterprise environments

---

**Last Updated:** January 2024  
**Maintainer:** [Ujuonong](https://github.com/Ujuonong)  
**Status:** Active Development
