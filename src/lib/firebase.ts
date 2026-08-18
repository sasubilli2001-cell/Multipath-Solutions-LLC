import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with your actual Firebase configuration
// You can find these values in your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyBgUwoFqSkxOb1CE_IyROaigaxjFIWHTY0",
  authDomain: "multipathsolutionsllc-53624.firebaseapp.com",
  projectId: "multipathsolutionsllc-53624",
  storageBucket: "multipathsolutionsllc-53624.firebasestorage.app",
  messagingSenderId: "549240607292",
  appId: "1:549240607292:web:78cad4de0778a5e875e939",
  measurementId: "G-72HNEC74FW"
};

// Initialize Firebase only if there are no existing apps
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, storage, googleProvider };
