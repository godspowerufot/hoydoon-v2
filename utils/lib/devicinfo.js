export async function sendDeviceInfo() {
    const deviceID = `device-${btoa(navigator.userAgent + navigator.platform)}`;
    const operatingSystem = navigator.userAgent;
    const name = navigator.userAgent;

    let location = "Location unavailable";
    let region = "Region unavailable";

    if (navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;
            location = `Latitude: ${latitude}, Longitude: ${longitude}`;

            // Reverse geocoding using Google Maps API
            const apiKey=process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your key
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );

            const data = await response.json();

            if (data.status === "OK") {
                const addressComponents = data.results[0]?.address_components || [];
                const country = addressComponents.find(comp => comp.types.includes("country"))?.long_name || "";

                region = `${country}`.toLowerCase();
            } else {
                console.warn("Geocoding API error:", data.status);
            }

        } catch (error) {
            console.error("Error getting location or region:", error);
        }
    }

    console.log("Device info:", {
        deviceID,
        operatingSystem,
        name,
        location,
        region,
    });

    return {
        deviceID,
        operatingSystem,
        name,
        location,
        region,
    };
}
