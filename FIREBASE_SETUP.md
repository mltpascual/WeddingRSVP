# Firebase Setup Guide

## Required Environment Variables

Set these in your **Vercel** project under **Settings > Environment Variables**:

| Variable | Description | Example |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `your-project-id` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `your-project.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | `1:123456789:web:abcdef123456` |

## Where to Find These Values

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon > **Project settings**
4. Scroll down to **Your apps** > Select your web app (or add one)
5. Copy the config values from the `firebaseConfig` object

## Firebase Services to Enable

### Firestore Database
1. In Firebase Console, go to **Build > Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (recommended)
4. Select your preferred region
5. Set up security rules (see below)

### Firebase Authentication
1. In Firebase Console, go to **Build > Authentication**
2. Click **Get started**
3. Enable **Email/Password** sign-in method
4. Go to the **Users** tab and add your admin account (email + password)

## Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // RSVPs collection
    match /rsvps/{rsvpId} {
      // Anyone can create (submit RSVP)
      allow create: if true;
      // Only authenticated users can read, update, delete
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Vercel Deployment

1. Push code to GitHub
2. Import the repo in Vercel
3. Set **Framework Preset** to **Vite**
4. Add all environment variables listed above
5. Deploy!

## Admin Dashboard

Access the admin dashboard at `/admin` to view and manage RSVP submissions.
