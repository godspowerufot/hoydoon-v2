/**
 * Gets the user's country/region based on geolocation
 * @returns {Promise<{country: string, coordinates: {lat: number, lng: number}}>}
 */
export async function getLocationRegion() {
  // Default fallback values
  const defaultLocation = {
    country: "default",
    coordinates: { lat: 0, lng: 0 }
  };

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
          const parsed = JSON.parse(cachedLocation);
          console.log("Using cached location:", parsed.country);
          return parsed;
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

  let country = "default";
  let coordinates = { lat: 0, lng: 0 };

  try {
    // Try IP-based geolocation with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // Check if we got rate limited
    if (data.error) {
      console.warn("IP geolocation API error:", data.reason || data.error);
      throw new Error(data.reason || "API rate limit exceeded");
    }

    coordinates = { lat: data.latitude || 0, lng: data.longitude || 0 };
    country = data.country_name?.toLowerCase() || "default";

    console.log("IP geolocation successful:", country);

  } catch (error) {
    console.warn("IP-based geolocation failed, using default:", error.message);
    // Use default values - app will continue to work
  }

  const result = { country, coordinates };

  // Cache the result
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("user_location_region", JSON.stringify(result));
      sessionStorage.removeItem("location_processing");
    } catch (storageError) {
      console.warn("Could not cache location:", storageError);
    }
  }

  return result;
}