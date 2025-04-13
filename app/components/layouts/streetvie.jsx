"use client";
import React, { useEffect, useRef } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY";

const StreetViewComponent = ({ coordinates }) => {
  const ref = useRef(null);
console.log("streetview",coordinates.latitude,coordinates.longitude)
  const position =
    coordinates && coordinates.length > 0 &&
    !isNaN(coordinates?.latitude) &&
    !isNaN(coordinates?.longitude)
      ? { lat: coordinates.latitude, lng: coordinates.longitude }
      : { lat: 6.5244, lng: 3.3792 }; // fallback to Lagos

  useEffect(() => {
    if (window.google && ref.current) {
      new window.google.maps.StreetViewPanorama(ref.current, {
        position,
        pov: {
          heading: 100,
          pitch: 0,
        },
        zoom: 1,
      });
    }
  }, [position]);

  return (
    <APIProvider apiKey={API_KEY}>
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "500px",
        }}
      />
    </APIProvider>
  );
};

export default StreetViewComponent;
