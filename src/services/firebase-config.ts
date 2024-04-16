// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

//  Firebase configuration

const FirebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,

  authDomain: "expense-tracker-9fa0f.firebaseapp.com",

  projectId: "expense-tracker-9fa0f",

  storageBucket: "expense-tracker-9fa0f.appspot.com",

  messagingSenderId: "576710678743",

  appId: "1:576710678743:web:3f6ff41a3e8e4e9b41b892",
};

// Initialize Firebase

const app = initializeApp(FirebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);
auth.useDeviceLanguage();

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, provider);
};

export const db = getFirestore(app);
