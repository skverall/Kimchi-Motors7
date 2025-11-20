import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// --- FIREBASE CONFIGURATION ---
// IMPORTANT: Your Firebase config is now handled by environment variables.
// You need to set REACT_APP_FIREBASE_CONFIG in your Vercel project settings.
// It should be the full JSON string of your Firebase config.
const firebaseConfigJSON = process.env.REACT_APP_FIREBASE_CONFIG;

if (!firebaseConfigJSON) {
  throw new Error("Firebase configuration is missing. Please set the REACT_APP_FIREBASE_CONFIG environment variable in your deployment settings. It should be the full JSON string of your Firebase config.");
}

const firebaseConfig = JSON.parse(firebaseConfigJSON);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = process.env.REACT_APP_ID || 'default-app-id';
