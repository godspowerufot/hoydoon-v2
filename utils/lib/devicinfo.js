export async function sendDeviceInfo() {
  const deviceID = `device-${btoa(navigator.userAgent + navigator.platform)}`;
  const operatingSystem = navigator.userAgent;
  const name = navigator.userAgent;

  let location = undefined;
  let region = undefined;

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
    location = `Latitude: ${latitude}, Longitude: ${longitude}`;

    // Reverse geocoding using Google Maps API
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    const data = await res.json();

    if (data.status === "OK") {
      const addressComponents = data.results[0]?.address_components || [];
      const country =
        addressComponents.find((comp) => comp.types.includes("country"))
          ?.long_name || "";
      region = country.toLowerCase();
    } else {
      console.warn("Google Maps Geocoding API failed:", data.status);
    }
  } catch (error) {
    console.warn("Geolocation failed:", error.message);

    // 🌐 Fallback to IP-based geolocation
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      location = `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
      region = data.country_name?.toLowerCase();
    } catch (ipError) {
      console.error("IP-based geolocation also failed:", ipError.message);
    }
  }

  const deviceInfo = {
    deviceID,
    operatingSystem,
    name,
    location,
    region,
  };

  console.log("Device info:", deviceInfo);
  return deviceInfo;
}
