# 💬 Zap Chat

A real-time-style chat app built with React.

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Run the app

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The app opens at **http://localhost:5173**

---

## Demo Accounts

Sign in with any of these pre-seeded accounts (username = password):

| Name          | Username | Password |
|---------------|----------|----------|
| Alex Rivera   | alex     | alex     |
| Jordan Kim    | jordan   | jordan   |
| Sam Torres    | sam      | sam      |
| Casey Morgan  | casey    | casey    |
| Riley Patel   | riley    | riley    |

Or create your own account via "Sign up".

---

## Features

- 🔐 Login / Registration with validation
- 👥 5 pre-seeded users with existing conversations
- 💬 Real-time-style messaging (simulated auto-replies with typing indicator)
- 🟢 Online / Offline status indicators
- 🔴 Unread message badges
- 🕒 Message timestamps & date dividers
- ✓✓ Read receipts
- 🔍 Search/filter contacts
- 📝 Multi-line input (Shift+Enter for new line)
- 😊 Emoji insertion

---

## Project Structure

```
src/
├── App.js                  # Root component & state management
├── data.js                 # Users, messages, helpers
├── index.js                # Entry point
├── index.css               # Global styles & CSS variables
└── components/
    ├── AuthScreen.js        # Login / Register screen
    ├── AuthScreen.module.css
    ├── Sidebar.js           # Contact list
    ├── Sidebar.module.css
    ├── ChatPanel.js         # Chat messages & input
    ├── ChatPanel.module.css
    └── Avatar.js            # Reusable avatar component
```

## Build for Production

```bash
npm run build
```

Output goes to the `build/` folder — ready to deploy anywhere.
