import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const userLocation = { lat: 6.5244, lng: 3.3792 }; // Replace with dynamic values

const placeTypes = [
  "transit_station",
  "bank",
  "shopping_mall",
  "school",
  "pharmacy",
];

async function getNearbyPlaces() {
  const results = await Promise.all(
    placeTypes.map(async (type) => {
      const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.lat},${userLocation.lng}&radius=3000&type=${type}&key=${API_KEY}`;

      const placeRes = await axios.get(placeSearchUrl);
      const firstPlace = placeRes.data.results[0];

      if (!firstPlace) return { type, duration: "Not found", distance: "N/A" };

      const dest = `${firstPlace.geometry.location.lat},${firstPlace.geometry.location.lng}`;
      const matrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation.lat},${userLocation.lng}&destinations=${dest}&key=${API_KEY}`;

      const distRes = await axios.get(matrixUrl);
      const element = distRes.data.rows[0].elements[0];

      return {
        type,
        duration: element.duration.text,
        distance: element.distance.text,
      };
    })
  );

  return results;
}
