import { useEffect, useState } from "react";

export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.log("Location permission denied ", err);
        setLocationError(err.message);
        setUserLocation(null);
      }
    );
  }, []);

  return { userLocation, locationError };
}
