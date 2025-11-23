import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Loader2, ArrowUpDown } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "@/components/ui/button";
import WeddingCard from "../components/WeddingCard";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function FeedPage() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    let q;

    if (sortBy === "weddingDate") {
      q = query(collection(db, "invites"), orderBy("date", "asc"));
    } else {
      q = query(collection(db, "invites"), orderBy("createdAt", "desc"));
    }

    // Real-time listener for updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const validCards = [];
        // console.log(snapshot.docs[0]._document.data.value.mapValue.fields.date)

        snapshot.docs.forEach(async (documentSnapshot) => {
          const data = documentSnapshot.data();
          const weddingDate = new Date(data.date); // console.log(weddingDate)

          if (weddingDate < today) {
            try {
              await deleteDoc(doc(db, "invites", documentSnapshot.id));
              console.log(
                `Auto deleted wedding cuz shaadi ho chuki h ${data.venue}`
              );
            } catch (err) {
              console.log("auto delete failed", err);
            }
          } else {
            validCards.push({
              id: documentSnapshot.id,
              ...data,
            });
          }
        });
        setInvites(validCards);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching invites:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 min-h-[80vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Free Parties...
          </h2>
          <p className="text-gray-500 mt-1">
            Discover nearby Shaadies and Have Food & Fun
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ArrowUpDown size={16} />
              Sort by:{" "}
              {sortBy === "createdAt" ? "Newest Uploads" : "Upcoming Weddings"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-59">
            <DropdownMenuItem onClick={() => setSortBy("newest")}>
              Newest Uploads
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("weddingDate")}>
              Upcoming Weddings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
        </div>
      ) : invites.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {invites.map((invite) => (
            <WeddingCard key={invite.id} invite={invite} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 col-span-full flex flex-col items-center justify-center min-h-[400px]">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <PlusCircle className="h-8 w-8 text-rose-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No weddings found yet!
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">
            Looks like there are no parties happening nearby. Be the first one
            to start the celebration!
          </p>
          <Button
            asChild
            variant="outline"
            className="border-rose-200 text-rose-600 hover:bg-rose-50"
          >
            <Link to="/create">Upload an Invite</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
