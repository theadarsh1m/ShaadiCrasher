import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeedPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 min-h-[60vh]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Free Parties...</h2>
        <Button asChild className="bg-rose-600 hover:bg-rose-700">
          <Link to="/create" className="flex items-center gap-2">
            <PlusCircle size={20} />
            Add Invite
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* will connect to Firestore */}
        <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 col-span-full">
          <p className="text-gray-500 text-lg mb-2">No weddings found yet!</p>
          <p className="text-sm text-gray-400">Upload an invite.</p>
        </div>
      </div>
    </div>
  );
}