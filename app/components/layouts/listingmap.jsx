"use client";
import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = "a618b8ba2def9141";

function InnerMap({ coordinates }) {
  const map = useMap(); // <-- get map instance

  const safeCoordinates = Array.isArray(coordinates)
    ? coordinates
    : [coordinates];

  const mainLocation =
    safeCoordinates.length > 0 &&
    !isNaN(safeCoordinates[0]?.latitude) &&
    !isNaN(safeCoordinates[0]?.longitude)
      ? { lat: safeCoordinates[0].latitude, lng: safeCoordinates[0].longitude }
      : { lat: 6.5244, lng: 3.3792 }; // Lagos fallback

  useEffect(() => {
    if (!map) return; // wait until map loads

    // Auto zoom when coordinates change
    map.setZoom(14);
    map.panTo(mainLocation);
  }, [map, coordinates]);

  return (
    <>
      <Map
        gestureHandling="greedy"
        zoom={10}
        center={mainLocation}
        mapId={MAP_ID}
        style={{ width: "100%", height: "400px" }}
        disableDefaultUI={true}
      />

      {safeCoordinates.map((coord, i) =>
        coord?.latitude && coord?.longitude ? (
          <AdvancedMarker
            key={i}
            position={{ lat: coord.latitude, lng: coord.longitude }}
          >
            <Pin background="red" borderColor="black" glyphColor="white" />
          </AdvancedMarker>
        ) : null
      )}
    </>
  );
}

export default function MapComponent({ coordinates }) {
  return (
    <APIProvider apiKey={API_KEY}>
      <InnerMap coordinates={coordinates} />
    </APIProvider>
  );
}
