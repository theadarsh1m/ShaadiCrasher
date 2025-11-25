import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Menu from "./Menu";

export default function Header({ sortBy, setSortBy, userLocation }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Free Parties...
        </h2>
        <p className="text-gray-500 mt-1">
          Discover nearby Shaadies and Have Food & Fun
        </p>
      </div>

      <Menu sortBy={sortBy} setSortBy={setSortBy} userLocation={userLocation} />

      <Button
        asChild
        className="bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-100 hover:shadow-rose-200 transition-all rounded-full px-6"
      >
        <Link to="/create" className="flex items-center gap-2">
          <PlusCircle size={18} />
          Add Invite
        </Link>
      </Button>
    </div>
  );
}
