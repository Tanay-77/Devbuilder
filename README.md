# 🚀 Developer Learning Platform

A modern web application for learning web development through hands-on projects with Firebase authentication.

## ✨ Features

- 🔐 **Firebase Authentication** with Google OAuth
- 📧 **Email/Password Authentication**
- 💻 **VS Code-style Autocomplete** in code editor
- 🎨 **Cartoon Avatar Generation**
- 📱 **Responsive Design**
- 🚀 **Real-time User Management**
- 💾 **Cloud Firestore Database**
- 🎯 **Interactive Coding Projects** with live preview
- 📊 **Progress Tracking** and achievements
- 🎉 **Confetti Celebrations** for milestones

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore)
- **Deployment**: Netlify
- **Icons**: Lucide React
- **Animations**: Canvas Confetti

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/developer-learning-platform.git
cd developer-learning-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase configuration

# Start development server
npm run dev
```

## 🌐 Live Demo

[View Live Application](https://devbuilder.netlify.app)

## Firebase Setup

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Enable **Google** authentication:
   - Click on Google provider
   - Enable it and add your project's authorized domains
   - Save the configuration

### 3. Set up Firestore Database

1. Go to **Firestore Database** in your Firebase console
2. Click "Create database"
3. Choose "Start in test mode" (you can configure security rules later)
4. Select a location for your database

### 4. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 5. Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Replace the placeholder values with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-actual-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
VITE_FIREBASE_APP_ID=your-actual-app-id
```

### 6. Update Firebase Configuration

Update `src/config/firebase.ts` to use environment variables:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Authentication Features

### Google OAuth
- One-click sign-in with Google accounts
- Automatic profile picture and name retrieval
- Secure token-based authentication

### Email/Password
- Traditional email/password registration
- Password strength validation
- Secure password hashing

### User Management
- Automatic user profile creation
- Cartoon avatar generation
- User data stored in Firestore
- Real-time authentication state management

## Security Considerations

### Firestore Security Rules

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add more rules for other collections as needed
  }
}
```

### Environment Variables

- Never commit your `.env` file to version control
- Use different Firebase projects for development and production
- Regularly rotate your API keys

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to authorized domains in Firebase Console
   - Go to Authentication > Settings > Authorized domains

2. **"Firebase: Error (auth/popup-blocked)"**
   - Ensure pop-ups are allowed in the browser
   - Try using redirect instead of popup for sign-in

3. **Environment variables not loading**
   - Ensure `.env` file is in the project root
   - Restart the development server after adding environment variables
   - Check that variable names start with `VITE_`

## License

MIT License - see LICENSE file for details.