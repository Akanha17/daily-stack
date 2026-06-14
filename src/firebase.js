// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBSASE_API_KEY,
  authDomain: "daily-stack-851ac.firebaseapp.com",
  projectId: "daily-stack-851ac",
  storageBucket: "daily-stack-851ac.firebasestorage.app",
  messagingSenderId: "575711601900",
  appId: "1:575711601900:web:90f949917cd7311a1871c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)