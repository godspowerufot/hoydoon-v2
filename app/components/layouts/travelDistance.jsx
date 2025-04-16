"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const destinations = [
  {
    label: "Public Transit",
    icon: "/bus.png",
    coords: { lat: 6.531, lng: 3.3756 },
  },
  {
    label: "Bank",
    icon: "/bank.png",
    coords: { lat: 6.5255, lng: 3.3791 },
  },
  {
    label: "Shopping mall",
    icon: "/shopping.png",
    coords: { lat: 6.5183, lng: 3.3843 },
  },
  {
    label: "School",
    icon: "/school.png",
    coords: { lat: 6.5351, lng: 3.3869 },
  },
  {
    label: "Pharmacy",
    icon: "/pharmacy.png",
    coords: { lat: 6.5202, lng: 3.3777 },
  },
];

const TravelTimesDisplay = ({ origin }) => {
  const [travelTimes, setTravelTimes] = useState([]);

  useEffect(() => {
    if (!window.google || !origin?.lat || !origin?.lng) return;

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destinations.map((d) => d.coords),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK" && response?.rows?.length > 0) {
          const updatedTimes = response.rows[0].elements.map((el, idx) => ({
            ...destinations[idx],
            duration: el.status === "OK" ? el.duration.text : "Unavailable",
          }));
          setTravelTimes(updatedTimes);
        } else {
          console.error("Distance Matrix failed:", status);
        }
      }
    );
  }, [origin]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6 2xl:text-base text-gray-700 text-sm">
      {travelTimes.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Image src={item.icon} alt={item.label} width={20} height={20} />
          <span className="text-primary font-medium">
            .... {item.duration}
          </span>{" "}
          to {item.label}
        </div>
      ))}
    </div>
  );
};

export default TravelTimesDisplay;
