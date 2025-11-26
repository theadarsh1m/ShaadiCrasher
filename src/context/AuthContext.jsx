import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, setDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";

const AuthContext = createContext(); // create context

// custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // login timestamp
        await setDoc(
          doc(db, "loginLogs", currentUser.uid),
          {
            email: currentUser.email,
            lastLogin: serverTimestamp(),
          },
          { merge: true }
        );

        // website visits
        await addDoc(collection(db, "visitLogs"), {
          email: currentUser.email,
          visitedAt: serverTimestamp(),
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
