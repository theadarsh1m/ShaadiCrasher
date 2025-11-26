import React from "react";
import { Link } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ user }) {
  const { handleLogin, handleLogout } = useAuth();

  return (
    <nav className="bg-white px-4 py-3 shadow-sm sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 p-1.5 text-rose-600 no-underline"
        >
          <img
            src="ShaadiCrasherLogo.png"
            alt="logo"
            className="size-8 scale-x-135"
          />
          <h1 className="text-2xl font-bold">Shaadi Crasher</h1>
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            {/* user photo if available */}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
            ) : (
              <UserCircle size={32} className="text-gray-600" />
            )}
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {user.displayName
                ? user.displayName.split(" ")[0]
                : "Mai hu kaun"}
            </span>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <LogOut size={20} />
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="link"
            onClick={handleLogin}
            className="group text-xl font-bold text-gray-600 hover:text-rose-600 hover:no-underline cursor-pointer"
            size="lg"
          >
            <UserCircle className="size-[25px]" />
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:bg-rose-600 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
              SignUp/Login
            </span>
          </Button>
        )}
      </div>
    </nav>
  );
}
