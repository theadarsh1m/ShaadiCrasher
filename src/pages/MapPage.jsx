import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MapPage() {
  const navigate = useNavigate();
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "invites"));
    const unsub = onSnapshot(q, (snapshot) => {
      const arr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvites(arr);
    });
    return () => unsub();
  }, []);

  return (
    <div className="h-screen w-full pt-4 relative">
      <div className="absolute top-0.5 left-4 z-999">
        <Button
          variant="outline"
          onClick={() => navigate("/feed")}
          className="bg-white cursor-pointer hover:bg-slate-300"
        >
          <ArrowLeft className="mr-1" />
          Back
        </Button>
      </div>

      {/* map container */}
      <MapContainer
        center={[26.5, 80.3]} // default loc
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* markers */}
        {invites.map((invite) => {
          const lat = invite.location?.lat;
          const lng = invite.location?.lng;

          if (!lat || !lng) return null;

          return (
            <Marker key={invite.id} position={[lat, lng]}>
              <Popup>
                <div className="font-extrabold text-base">{invite.venue}</div>
                <div className="text-sm text-gray-600">{invite.address}</div>

                <div className="mt-3 text-sm">
                  <span className="font-bold">Wedding Date:</span>{" "}
                  {new Date(invite.date).toLocaleDateString()}
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    className="text-blue-600 underline font-medium"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
