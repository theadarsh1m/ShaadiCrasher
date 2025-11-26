import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeedPage from "./pages/FeedPage";
import Footer from "./components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "./context/AuthContext";
import CreatePage from "./pages/CreatePage";
import MapPage from "./pages/MapPage";

export default function App() {
  const { user, loading } = useAuth(); // getting from authContext

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Skeleton Navbar */}
        <div className="h-16 border-b bg-white px-4 flex items-center justify-between">
          <Skeleton className="h-8 w-40 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        {/* Skeleton Content */}
        <div className="flex-1 max-w-5xl mx-auto w-full px-6 pt-12 lg:pt-24 flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 space-y-6">
            <Skeleton className="h-16 w-3/4 rounded-lg" />
            <Skeleton className="h-6 w-full rounded-md" />
            <Skeleton className="h-6 w-2/3 rounded-md" />
            <Skeleton className="h-14 w-40 rounded-full mt-4" />
          </div>
          <div className="hidden lg:block w-1/2">
            <Skeleton className="h-80 w-80 rounded-2xl mx-auto" />
          </div>
          <Skeleton className="h-70 w-full rounded-md mt-10" />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#f43f5e",
            color: "white",
            fontWeight: "bold",
          },
        }}
      />
      <Routes>
        {/* if user show feed */}
        <Route path="/" element={user ? <Navigate to="/feed" /> : <Hero />} />
        <Route
          path="/feed"
          element={user ? <FeedPage /> : <Navigate to="/" />}
        />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
