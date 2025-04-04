import React from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY";
const MAP_ID = "a618b8ba2def9141";
const mapContainerStyle = { width: "100%", height: "500px" };

const MapComponent = ({ coordinates }) => {
  // Validate coordinates[0] and make sure lat and lng are numbers
  const defaultCenter = 
    coordinates && coordinates.length > 0 && !isNaN(coordinates[0]?.latitude) && !isNaN(coordinates[0]?.longitude)
      ? { lat: coordinates[0]?.latitude, lng: coordinates[0]?.longitude }
      : { lat: 6.5244, lng: 3.3792 }; // Fallback to Lagos, Nigeria
      const safeCoordinates = Array.isArray(coordinates) ? coordinates : [coordinates];
  return (
    <APIProvider solutionChannel="GMP_devsite_samples_v3_rgmbasicmap" apiKey={API_KEY}>
      <Map
        style={mapContainerStyle}
        defaultZoom={8}
        defaultCenter={defaultCenter}
        gestureHandling="greedy"
        disableDefaultUI={true}
        mapId={MAP_ID}
      >
        {safeCoordinates?.map((coord, index) => (
          coord?.latitude && coord?.longitude ? (
            <AdvancedMarker key={index} position={{ lat: coord?.latitude, lng: coord?.longitude }}>
              <Pin background="red" borderColor="black" glyphColor="white" />
            </AdvancedMarker>
          ) : null
        ))}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
