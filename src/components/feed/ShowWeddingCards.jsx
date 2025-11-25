import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import WeddingCard from "../WeddingCard";
import { Link } from "react-router-dom";

export default function ShowWeddingCards({ loading, invites }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
      </div>
    );
  }

  if (invites.length === 0) {
    return (
      <div className="p-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 col-span-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <PlusCircle className="h-8 w-8 text-rose-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No weddings found yet!
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto mb-6">
          No parties or Weddings are happening nearby.  sed. Why don't you add one piliz
        </p>
        <Button asChild variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
          <Link to="/create">Upload an Invite</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {invites.map((invite) => (
        <WeddingCard key={invite.id} invite={invite} />
      ))}
    </div>
  );
}
