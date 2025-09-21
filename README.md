# 📅 Recurlytics

Recurlytics is a simple web app that connects with **Google Calendar** and provides analytics on recurring events.  
It helps you discover patterns, track gaps between events, and predict what’s next.

Built with **React + TypeScript + shadcn/ui**, deployed easily on **Netlify** (or Vercel).  

## ✨ Features

- 🔐 **Google OAuth** login using [Google Identity Services](https://developers.google.com/identity/oauth2/web).
- 📂 Fetches **all available calendars** (primary + secondary).
- 📋 Lets you **select a calendar** and view its events.
- 🗓️ Displays event summaries, dates, and times.
- 💾 **Persists login state** in local storage (no need to reconnect every refresh).
- ⚡ Immediate event fetching (no lag on first click).

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Calendar API**: [Google Calendar API](https://developers.google.com/calendar/api)
- **Auth**: [Google Identity Services (GIS)](https://developers.google.com/identity/oauth2/web)
- **Build Tool**: [Vite](https://vite.dev/)

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/recurlytics.git
cd recurlytics
npm install
```

### 2. Set up Google Cloud
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project
- Enable **Google Calendar API**
- Configure **OAuth Consent Screen**
  - User type: External
  - Add yourself as a Test User
- Create **OAuth Client ID** (Web Application)
  - Add `http://localhost:5173` as an Authorized redirect URI (for dev)

### 3. Configure environment variables
Create a .env file in the project root:
```bash
VITE_OAUTH_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
```

### 4. Run the app
```bash
npm run dev
```
Then go visit [http://localhost:5173](http://localhost:5173)

## 📖 Learn More

- [Google Calendar API](https://developers.google.com/calendar/api)
- [Google Identity Services](https://developers.google.com/identity/oauth2/web)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vite](https://vite.dev/)

## 📝 License

This project is licensed under the MIT License.