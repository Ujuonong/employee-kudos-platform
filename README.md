# Kudos Board

A simple, elegant web application for recognizing and appreciating your colleagues. Share appreciation with your team while maintaining a professional public feed.

## 🎯 Features

- **Send Kudos**: Write personalized appreciation messages to your colleagues
- **Public Feed**: View a real-time feed of appreciation messages from the team
- **Character Limit**: Keep messages concise with a 280-character limit
- **Persistent Storage**: All kudos are saved to browser's localStorage
- **Admin Moderation**: Hide inappropriate messages with admin mode toggle
- **Responsive Design**: Beautiful UI that works on all devices
- **Timestamp Tracking**: See when each kudos was created
- **Pre-loaded Team Members**: Default set of colleagues to recognize

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### How to Use

1. **Open the Application**
   - Open `index.html` in your web browser
   - You'll see the Kudos Board with a form on the left and feed on the right

2. **Send a Kudos**
   - Select a colleague from the "Recognize" dropdown
   - Write your appreciation message (max 280 characters)
   - Click "Submit kudos" button
   - Your message will appear in the public feed

3. **View Recent Kudos**
   - Check the "Recent kudos" section on the right
   - Messages are sorted by newest first
   - Only visible messages appear in the public dashboard

4. **Admin Moderation** (Optional)
   - Check the "Admin moderation" toggle in the top right
   - Click "Hide" button on any kudos card to remove it from the public feed
   - Hidden messages can be unhidden by toggling admin mode again

## 📁 Project Structure

```
TASK 2/
├── index.html          # Main HTML structure
├── app.js              # Application logic and functionality
├── styles.css          # Styling and layout
└── README.md           # This file
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and form structure
- **CSS3**: Modern styling with flexbox and grid layout
- **Vanilla JavaScript**: No frameworks, pure JS logic

### Key Components

#### app.js
- `loadKudos()`: Retrieves kudos from localStorage or loads default data
- `saveKudos()`: Persists kudos data to localStorage
- `renderFeed()`: Displays kudos cards in the feed
- `populateRecipients()`: Populates the colleague dropdown
- `formatTimestamp()`: Formats dates in a readable format

#### index.html
- Form panel for sending kudos
- Feed panel for viewing messages
- Admin moderation toggle

#### styles.css
- Gradient backgrounds and modern design
- Responsive grid layout
- Smooth interactions and hover effects

## 📊 Data Structure

Each kudos entry contains:
```javascript
{
  id: "unique-identifier",
  senderUserId: "me",
  senderName: "Your Name",
  recipientUserId: "alex",
  recipientName: "Alex Chen",
  message: "Your appreciation message",
  createdAt: "2024-01-15T10:30:00.000Z",
  is_visible: true
}
```

## 💾 Storage

- Data is stored in browser's localStorage under the key `kudos-board-state-v1`
- Each browser/device maintains its own data
- Clearing browser data will reset the board
- Initial data includes seed kudos entries

## 👥 Default Team Members

- Alex Chen
- Maria Gomez
- David Kim
- Sophia Patel

You can modify the `recipients` array in `app.js` to add or change team members.

## 🎨 Customization

### Add More Colleagues
Edit the `recipients` array in `app.js`:
```javascript
const recipients = [
  { id: "john", name: "John Doe" },
  { id: "jane", name: "Jane Smith" },
  // Add more team members...
];
```

### Change Character Limit
Update the `maxlength` attribute in `index.html`:
```html
<textarea id="message" maxlength="500" ...></textarea>
```

### Modify Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  background: #f4f7fb;
  color: #14213d;
}
```

## 📝 Notes

- Messages are limited to 280 characters to keep them concise and professional
- The admin mode allows moderation of inappropriate content
- All data persists between sessions in the same browser
- Empty state message appears when no visible kudos exist

## 🤝 Contributing

Feel free to enhance this project with features like:
- Emoji reactions to kudos
- Categories for different types of recognition
- Export functionality
- Cloud synchronization
- User authentication

## 📄 License

Open source - feel free to use and modify as needed!

---

**Enjoy spreading appreciation! 🎉**