/**
 * Gets the user's country/region based on geolocation
 * @returns {Promise<{country: string, coordinates: {lat: number, lng: number}}>}
 */
export async function getLocationRegion() {
  // Check session storage first to prevent reload loops
  if (typeof window !== "undefined") {
    const cachedLocation = sessionStorage.getItem("user_location_region");
    if (cachedLocation) {
      try {
        return JSON.parse(cachedLocation);
      } catch (e) {
        console.error("Error parsing cached location:", e);
        sessionStorage.removeItem("user_location_region");
      }
    }
  }

  let country = null;
  let coordinates = null;

  const tryNavigatorGeolocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Geolocation is not supported."));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  };

  try {
    const position = await tryNavigatorGeolocation();
    const { latitude, longitude } = position.coords;
    coordinates = { lat: latitude, lng: longitude };

    // Reverse geocoding using Google Maps API
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    const data = await res.json();

    if (data.status === "OK") {
      const addressComponents = data.results[0]?.address_components || [];
      const countryComponent = addressComponents.find((comp) =>
        comp.types.includes("country")
      );
      country = countryComponent?.long_name?.toLowerCase() || null;
    } else {
      console.warn("Google Maps Geocoding API failed:", data.status);
    }
  } catch (error) {
    console.warn("Geolocation failed:", error.message);

    // 🌐 Fallback to IP-based geolocation
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      coordinates = { lat: data.latitude, lng: data.longitude };
      country = data.country_name?.toLowerCase() || null;
    } catch (ipError) {
      console.error("IP-based geolocation also failed:", ipError.message);
    }
  }

  const result = {
    country,
    coordinates,
  };

  // Cache the result
  if (typeof window !== "undefined" && (country || coordinates)) {
    sessionStorage.setItem("user_location_region", JSON.stringify(result));
  }

  return result;
}
