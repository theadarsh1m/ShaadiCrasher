import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyz093y5dziJMPYatZ8snfdTXOb_ZkhDQ",
  authDomain: "shaadicrasher.firebaseapp.com",
  projectId: "shaadicrasher",
  storageBucket: "shaadicrasher.firebasestorage.app",
  messagingSenderId: "409620917438",
  appId: "1:409620917438:web:ad09d999b06b2b657502ef",
  measurementId: "G-378RBNKLJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);