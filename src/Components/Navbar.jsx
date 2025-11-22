import React from "react";
import { Link } from "react-router-dom";
import { Heart, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <Button
          variant="link"
          className="group text-xl font-bold text-gray-600 hover:text-rose-600 hover:no-underline cursor-pointer"
          size="lg"
        >
          <UserCircle className="size-[25px]" />
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:bg-rose-600 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
            Login
          </span>
        </Button>
      </div>
    </nav>
  );
}
