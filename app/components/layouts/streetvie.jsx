"use client";
import React, { useEffect, useRef } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY";

const StreetViewComponent = ({ coordinates }) => {
  const ref = useRef(null);

  // Check if coordinates are valid (not an array and have latitude/longitude)
  const hasValidCoordinates =
    coordinates &&
    !Array.isArray(coordinates) &&
    !isNaN(coordinates?.latitude) &&
    !isNaN(coordinates?.longitude);

  useEffect(() => {
    if (hasValidCoordinates && window.google && ref.current) {
      const position = {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      };

      new window.google.maps.StreetViewPanorama(ref.current, {
        position,
        pov: {
          heading: 100,
          pitch: 0,
        },
        zoom: 1,
      });
    }
  }, [coordinates, hasValidCoordinates]);

  return (
    <APIProvider apiKey={API_KEY}>
      <div
        style={{
          width: "100%",
          height: "500px",
          position: "relative",
          backgroundColor: "#f0f0f0",
        }}
      >
        {hasValidCoordinates ? (
          <div ref={ref} style={{ width: "100%", height: "100%" }} />
        ) : (
          <div
            className="flex items-center justify-center text-gray-600 text-lg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#f9f9f9",
              zIndex: 10,
            }}
          >
            Unavailable for now. No Street View available for this listing.
          </div>
        )}
      </div>
    </APIProvider>
  );
};

export default StreetViewComponent;
