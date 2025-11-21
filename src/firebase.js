import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKqUa40QE6aIwIIzEl82A7j3gsVV74xWE",
  authDomain: "shadicrasherreal.firebaseapp.com",
  projectId: "shadicrasherreal",
  storageBucket: "shadicrasherreal.firebasestorage.app",
  messagingSenderId: "326593181412",
  appId: "1:326593181412:web:56788efd9d7d2bf9d69ef1",
  measurementId: "G-235411PL0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- CRITICAL EXPORTS (This is what was missing) ---
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);