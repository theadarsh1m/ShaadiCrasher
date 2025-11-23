import React from "react";
import { CalendarDays, MapPin, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function WeddingCard({ invite }) {
  const { venue, date, imageUrl } = invite;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDonwload = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob(); // convert to raw data

      const url = window.URL.createObjectURL(blob); // temp  object URL for the Blob
      const link = document.createElement("a"); // temp object URL for the Blob
      link.href = url;
      link.download = "Free-Wedding-Card.jpg";

      document.body.appendChild(link);
      link.click(); // automatic click the anchor to trigger download

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download Card. Please try again.");
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group border-gray-200 bg-white">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={venue}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1">
          {venue}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center text-gray-600">
          <CalendarDays className="w-4 h-4 mr-2 text-rose-500" />
          <span className="text-sm">{formattedDate}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-rose-500" />
          <span className="text-sm line-clamp-1">{venue}</span>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="pt-0 flex justify-between items-center border-t border-gray-100 bg-gray-50/50 px-6 py-4">
        <Button
          variant="outline"
          size="sm"
          className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
          onClick={handleDonwload}
        >
          Download Card <Download />
        </Button>
      </CardFooter>
    </Card>
  );
}
