import { ArrowUpDown } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Menu({ sortBy, setSortBy, userLocation }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ArrowUpDown size={16} />
          Sort by:{" "}
          {sortBy === "newest"
            ? "Newest Uploads"
            : sortBy === "weddingDate"
            ? "Upcoming Weddings"
            : "Nearest to me"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-59">
        <DropdownMenuItem onClick={() => setSortBy("newest")}>
          Newest Uploads
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setSortBy("weddingDate")}>
          Upcoming Weddings
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            if (!userLocation) {
              toast("Please allow location access to sort by nearest.");
              return;
            }
            setSortBy("nearest");
          }}
        >
          <span className="font-semibold">Nearest to me</span>{" "}
          {!userLocation && (
            <span className="text-gray-500 ml-1">(allow location)</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
