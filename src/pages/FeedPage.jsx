import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import Header from "@/components/feed/Header";
import ShowWeddingCards from "@/components/feed/ShowWeddingCards";
import useUserLocation from "@/hooks/useUserLocation";

export default function FeedPage() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  const { userLocation } = useUserLocation();

  const getDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;

    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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
        if (sortBy === "nearest" && userLocation) {
          validCards.sort((a, b) => {
            const distA = getDistance(
              userLocation.lat,
              userLocation.lng,
              a.location?.lat,
              a.location?.lng
            );

            const distB = getDistance(
              userLocation.lat,
              userLocation.lng,
              b.location?.lat,
              b.location?.lng
            );

            return distA - distB;
          });
        }
        setInvites(validCards);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching invites:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sortBy, userLocation]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 min-h-[80vh]">
      <Header
        sortBy={sortBy}
        setSortBy={setSortBy}
        userLocation={userLocation}
      />
      <ShowWeddingCards loading={loading} invites={invites} />
    </div>
  );
}
