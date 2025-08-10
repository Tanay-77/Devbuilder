# 🔥 Complete Firebase Setup Guide

## Step 1: Firebase Console Setup

### 1.1 Enable Authentication Methods

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `devbuilder-50574`
3. Navigate to **Authentication** → **Sign-in method**
4. Enable the following providers:

#### Email/Password
- ✅ Enable Email/Password
- ✅ Enable Email link (passwordless sign-in) - Optional

#### Google OAuth
- ✅ Enable Google
- Set **Project support email**: Your email address
- **Important**: Add these authorized domains:
  ```
  localhost
  127.0.0.1
  musical-granita-722382.netlify.app
  devbuilder-50574.firebaseapp.com
  ```

### 1.2 Set up Firestore Database

1. Navigate to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll add security rules next)
4. Select your preferred location (choose closest to your users)

### 1.3 Apply Security Rules

1. In Firestore Database, go to **Rules** tab
2. Replace the default rules with the content from `firestore.rules`
3. Click **Publish**

The rules ensure:
- ✅ Users can only access their own data
- ✅ Authentication is required for all operations
- ✅ Proper data isolation between users
- ✅ Read-only access to public project data

## Step 2: Domain Authorization

### 2.1 Add Authorized Domains

In Firebase Console → Authentication → Settings → Authorized domains:

**Production Domains:**
```
musical-granita-722382.netlify.app
devbuilder-50574.firebaseapp.com
```

**Development Domains:**
```
localhost
127.0.0.1
```

### 2.2 OAuth Consent Screen (Google Cloud Console)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `devbuilder-50574`
3. Navigate to **APIs & Services** → **OAuth consent screen**
4. Configure:
   - **Application name**: DevBuilder
   - **User support email**: Your email
   - **Developer contact**: Your email
   - **Authorized domains**: Add your domains

## Step 3: Test Authentication

### 3.1 Test Google OAuth

1. Open your app in browser
2. Click "Continue with Google"
3. Should open Google sign-in popup/redirect
4. After successful sign-in, check:
   - ✅ User appears in Firebase Authentication users
   - ✅ User document created in Firestore `users` collection
   - ✅ No console errors

### 3.2 Test Email/Password

1. Try creating a new account with email/password
2. Try signing in with existing credentials
3. Check demo credentials work:
   - Email: `alex@example.com`
   - Password: `password123`

## Step 4: Firestore Collections Structure

Your app will automatically create these collections:

```
📁 users/
  └── {userId}/
      ├── name: string
      ├── email: string
      ├── avatar: string
      ├── joinedAt: string
      ├── completedProjects: array
      ├── totalStepsCompleted: number
      └── updatedAt: timestamp

📁 userProgress/
  └── {userId}_{projectId}/
      ├── userId: string
      ├── projectId: string
      ├── currentStep: number
      ├── completedSteps: array
      ├── startedAt: string
      ├── lastActivity: string
      ├── isCompleted: boolean
      └── updatedAt: timestamp

📁 userCode/
  └── {userId}_{projectId}_{stepId}/
      ├── userId: string
      ├── projectId: string
      ├── stepId: string
      ├── code: object
      │   ├── html: string
      │   ├── css: string
      │   └── javascript: string
      └── savedAt: timestamp

📁 userSettings/
  └── {userId}/
      ├── theme: string
      ├── notifications: boolean
      ├── autoSave: boolean
      └── updatedAt: timestamp
```

## Step 5: Troubleshooting

### Common Issues & Solutions

#### 🚨 "auth/unauthorized-domain"
**Solution**: Add your domain to Firebase authorized domains
- Go to Authentication → Settings → Authorized domains
- Add your current domain (check browser URL)

#### 🚨 "auth/popup-blocked"
**Solution**: 
- Allow popups in browser settings
- App automatically falls back to redirect method

#### 🚨 "auth/operation-not-allowed"
**Solution**: Enable Google OAuth in Firebase Console
- Authentication → Sign-in method → Google → Enable

#### 🚨 Firestore permission denied
**Solution**: Check security rules are properly deployed
- Firestore → Rules → Ensure rules match `firestore.rules`

#### 🚨 Google OAuth not working on mobile
**Solution**: App automatically uses redirect method on mobile devices

### Debug Information

The app includes debug information in development mode:
- Check browser console for detailed error messages
- Google sign-in button shows debug info in dev mode
- All authentication attempts are logged

## Step 6: Production Deployment

### 6.1 Environment Variables

For production deployment, ensure these environment variables are set:

```env
VITE_FIREBASE_API_KEY=AIzaSyBfqzEJJVtW0uorOpCnTuNGKFWS9vc3Xyw
VITE_FIREBASE_AUTH_DOMAIN=devbuilder-50574.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=devbuilder-50574
VITE_FIREBASE_STORAGE_BUCKET=devbuilder-50574.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=685128249230
VITE_FIREBASE_APP_ID=1:685128249230:web:991f104ddc494f053dbedf
VITE_FIREBASE_MEASUREMENT_ID=G-6X0GL122FX
```

### 6.2 Security Checklist

- ✅ Firestore security rules deployed
- ✅ Only necessary domains in authorized domains
- ✅ OAuth consent screen configured
- ✅ API keys restricted (optional, for production)
- ✅ Environment variables secured

## Step 7: Monitoring & Analytics

### 7.1 Firebase Analytics (Optional)

1. Enable Google Analytics in Firebase Console
2. Analytics will automatically track:
   - User sign-ups
   - Authentication events
   - App usage

### 7.2 Authentication Monitoring

Monitor in Firebase Console → Authentication:
- User sign-up trends
- Sign-in methods usage
- Authentication errors

## 🎉 Setup Complete!

Your Firebase integration is now fully configured with:
- ✅ Google OAuth authentication
- ✅ Email/password authentication  
- ✅ Secure Firestore database
- ✅ User progress tracking
- ✅ Code persistence
- ✅ Real-time data sync
- ✅ Cartoon avatar generation
- ✅ Mobile-friendly authentication

Users can now:
1. Sign up with Google or email/password
2. Complete coding projects with progress saved
3. View their dashboard with real-time stats
4. Generate new cartoon avatars
5. Access their data across devices

All user data is securely stored in Firestore with proper access controls!