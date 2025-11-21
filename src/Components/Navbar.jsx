import React from "react";
import { Link } from "react-router-dom";
import { Heart, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white px-4 py-3 shadow-sm sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 p-1.5 text-rose-600 no-underline"
        >
          <Heart className="fill-current" size={24} />
          <h1 className="text-2xl font-bold">Shaadi Crasher</h1>
        </Link>
        <button className="flex items-center gap-2 text-xl font-bold text-gray-600 hover:text-rose-600 transition-colors cursor-pointer">
          <UserCircle size={25} />
          Login
        </button>
      </div>
    </nav>
  );
}
