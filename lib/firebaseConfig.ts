// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ai_WoT7DGJVRCtDsJOfMVzGV_71N3Wo",
  authDomain: "circuit25-levelup.firebaseapp.com",
  projectId: "circuit25-levelup",
  storageBucket: "circuit25-levelup.firebasestorage.app",
  messagingSenderId: "180527383579",
  appId: "1:180527383579:web:18c1129b3e760c281324be",
  measurementId: "G-V602FT99N6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app)