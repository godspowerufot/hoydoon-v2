/**
 * Gets the user's country/region based on geolocation
 * @returns {Promise<{country: string, coordinates: {lat: number, lng: number}}>}
 */
export async function getLocationRegion() {
  // Check if already processing to prevent concurrent calls
  if (typeof window !== "undefined") {
    try {
      const isProcessing = sessionStorage.getItem("location_processing");
      if (isProcessing === "true") {
        // Wait and retry once
        await new Promise(resolve => setTimeout(resolve, 1000));
        const cached = sessionStorage.getItem("user_location_region");
        if (cached) {
          try {
            return JSON.parse(cached);
          } catch (e) {
            console.error("Error parsing cached location:", e);
          }
        }
      }

      // Check cache first
      const cachedLocation = sessionStorage.getItem("user_location_region");
      if (cachedLocation) {
        try {
          return JSON.parse(cachedLocation);
        } catch (e) {
          console.error("Error parsing cached location:", e);
          try {
            sessionStorage.removeItem("user_location_region");
          } catch (removeError) {
            console.warn("Could not remove invalid cache:", removeError);
          }
        }
      }

      // Set processing flag
      try {
        sessionStorage.setItem("location_processing", "true");
      } catch (storageError) {
        console.warn("SessionStorage unavailable:", storageError);
        // Continue without caching
      }
    } catch (error) {
      console.warn("SessionStorage access failed:", error);
      // Continue without caching
    }
  }

  let country = "default"; // Default value instead of null
  let coordinates = null;

  try {
    // Skip geolocation API and go straight to IP-based for faster results
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    coordinates = { lat: data.latitude, lng: data.longitude };
    country = data.country_name?.toLowerCase() || "default";

  } catch (error) {
    console.error("IP-based geolocation failed:", error.message);
    // Keep default values
  }

  const result = {
    country,
    coordinates,
  };

  // Cache the result and clear processing flag
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("user_location_region", JSON.stringify(result));
      sessionStorage.removeItem("location_processing");
    } catch (storageError) {
      console.warn("Could not cache location result:", storageError);
      // Continue without caching - not critical
    }
  }

  return result;
}