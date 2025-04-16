"use client";
import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY";
const MAP_ID = "a618b8ba2def9141";
const mapContainerStyle = { width: "100%", height: "500px" };

const MapComponent = ({ coordinates }) => {
  const safeCoordinates = Array.isArray(coordinates) ? coordinates : [coordinates];

  const mainLocation =
    safeCoordinates.length > 0 &&
    !isNaN(safeCoordinates[0]?.latitude) &&
    !isNaN(safeCoordinates[0]?.longitude)
      ? { lat: safeCoordinates[0].latitude, lng: safeCoordinates[0].longitude }
      : { lat: 6.5244, lng: 3.3792 }; // Lagos fallback

  const [mapCenter, setMapCenter] = useState(mainLocation);

  useEffect(() => {
    setMapCenter(mainLocation);

    // Calculate time to nearby location (e.g., Lekki Phase 1)
    const destination = { lat: 6.4449, lng: 3.4505 }; // Example: Lekki
    if (window.google && mainLocation.lat && mainLocation.lng) {
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: mainLocation,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result?.routes?.[0]) {
            const duration =
              result.routes[0].legs?.[0]?.duration?.text || "Unknown";
            console.log(`Travel time to Lekki: ${duration}`);
          } else {
            console.warn("Directions request failed due to", status);
          }
        }
      );
    }
  }, [coordinates]);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={mapContainerStyle}
        center={mapCenter}
        gestureHandling="greedy"
        defaultZoom={8}
        disableDefaultUI={true}
        mapId={MAP_ID}
      >
        {safeCoordinates?.map((coord, index) =>
          coord?.latitude && coord?.longitude ? (
            <AdvancedMarker
              key={index}
              position={{ lat: coord.latitude, lng: coord.longitude }}
            >
              <Pin background="red" borderColor="black" glyphColor="white" />
            </AdvancedMarker>
          ) : null
        )}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
