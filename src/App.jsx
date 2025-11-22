import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeedPage from "./pages/FeedPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-rose-600 font-bold text-xl">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        {/* if user show feed */}
        <Route path="/"
          element={user ? <Navigate to="/feed" /> : <Hero />} />
        <Route
          path="/feed"
          element={user ? <FeedPage /> : <Navigate to="/" />}
        />

      </Routes>
    </Router>
  );
}
