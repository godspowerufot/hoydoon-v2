"use client";
import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY";
const MAP_ID = "a618b8ba2def9141";
const mapContainerStyle = { width: "100%", height: "400px" };

const MapContent = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !coordinates) return;

    const safeCoordinates = Array.isArray(coordinates)
      ? coordinates
      : [coordinates];

    // Filter valid coordinates
    const validCoords = safeCoordinates.filter(
      (coord) => coord?.latitude && coord?.longitude
    );

    if (validCoords.length === 0) return;

    if (validCoords.length === 1) {
      // Single marker - center and zoom to it
      map.setZoom(14);
      map.panTo({
        lat: validCoords[0].latitude,
        lng: validCoords[0].longitude,
      });
    } else {
      // Multiple markers - fit bounds to show all markers
      const bounds = new google.maps.LatLngBounds();
      validCoords.forEach((coord) => {
        bounds.extend({ lat: coord.latitude, lng: coord.longitude });
      });
      map.fitBounds(bounds, { padding: 50 });
    }
  }, [coordinates, map]);

  const safeCoordinates = Array.isArray(coordinates)
    ? coordinates
    : [coordinates];

  return (
    <>
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
    </>
  );
};

const MapComponent = ({ coordinates }) => {
  const safeCoordinates = Array.isArray(coordinates)
    ? coordinates
    : [coordinates];

  const mainLocation =
    safeCoordinates.length > 0 &&
    !isNaN(safeCoordinates[0]?.latitude) &&
    !isNaN(safeCoordinates[0]?.longitude)
      ? { lat: safeCoordinates[0].latitude, lng: safeCoordinates[0].longitude }
      : { lat: 6.5244, lng: 3.3792 }; // Lagos fallback

  const [mapCenter] = useState(mainLocation);

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
        <MapContent coordinates={coordinates} />
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
