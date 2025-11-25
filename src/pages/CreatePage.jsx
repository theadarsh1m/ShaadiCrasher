import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, UploadCloud, Loader2 } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import UploadImage from "@/components/UploadImage";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreatePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setOpen(false);
  };

  const OLA_API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY;
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [venueLocation, setVenueLocation] = useState(null);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const uploadToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);

    try {
      const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!query || query.length < 3) {
        setSuggestions([]);
        return;
      }

      if (venueLocation && query === venueLocation.name) {
        return;
      }

      try {
        const reqId = crypto.randomUUID();

        const res = await axios.get(
        `https://api.olamaps.io/places/v1/autocomplete`,
        {
          params: {
            input: query,
            api_key: OLA_API_KEY,
          },
          headers: {
            "X-Request-Id": reqId,
          },
        }
      );

        console.log(res.data)
        setSuggestions(res.data.predictions || []);
        setShowSuggestions(true);
      } catch (err) {
        console.log("err while fetching suggestion form ola maps api", err);
      }
    };
    fetchPlaces();
  }, [query]);

  const handleSelectPlace = (place) => {
    const placeName = place.structured_formatting.main_text;

    setQuery(placeName);
    setSuggestions([]);
    setShowSuggestions(false);

    setVenueLocation({
      name: placeName,
      address: place.description,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file)
      return toast.error(
        "Hold on Crashers! Even free food needs a ticket. Upload Card Image"
      );
    if (!venueLocation) return toast.error("Venue correct to h na..?");
    if (!selectedDate) {
      return toast.error("Pick a wedding date!");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1);

    if (selectedDate < today) {
      return toast.error(
        "we can't crash weddings in the past!  Check wedding date"
      );
    }

    if (selectedDate > maxDate) {
      return toast.error(
        "Too far away! We'll starve by then. Must be within 1 month"
      );
    }

    setLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);

      await addDoc(collection(db, "invites"), {
        venue: venueLocation.name,
        date: selectedDate.toISOString(),
        address: venueLocation.address,
        location: {
          lat: venueLocation.lat,
          lng: venueLocation.lng,
        },
        imageUrl: imageUrl,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        createdAt: serverTimestamp(),
      });
      toast.success("Posted !");
      navigate("/feed");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <div className="flex items-center mb-6 text-rose-600 font-semibold">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/feed")}
            className="mr-2 hover:bg-rose-50 text-rose-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          ADD NEW INVITE
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="venue">Venue Location</Label>
            <Input
              name="venue"
              id="venue"
              placeholder="e.g. Vrindavan Lawn, Kidwai Nagar"
              required
              className="focus-visible:ring-rose-500"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVenueLocation(null);
              }}
            />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-xl mt-1 max-h-60 overflow-auto">
              {suggestions.map((place) => (
                <div
                  key={place.place_id}
                  className="p-3 hover:bg-rose-50 cursor-pointer text-sm border-b border-gray-50 last:border-none transition-colors"
                  onClick={() => handleSelectPlace(place)}
                >
                  <p className="font-medium text-gray-800">
                    {place.structured_formatting.main_text}
                    {/* {console.log(place.structured_formatting.main_text)} */}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {place.structured_formatting.secondary_text}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="date">Wedding Date</Label>
            <div className="relative">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setOpen(true)}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "Select Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange} // ← main fix
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <UploadImage setFile={setFile} />

          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-lg py-6 cursor-pointer"
            disabled={!file || loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Post Invite"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
