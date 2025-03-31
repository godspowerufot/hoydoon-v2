export async function sendDeviceInfo() {
    // Generate a unique device ID
    const deviceID = `device-${btoa(navigator.userAgent + navigator.platform)}`;

    // Get device OS information
    const operatingSystem = navigator.userAgent;
 const name=navigator.userAgent
    // Use geolocation API to get user's location dynamically
    let location = "Location unavailable";
    if (navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            location = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        } catch (error) {
            console.error("Error getting location:", error);
        }
    }

    console.log("Device info:", {
        deviceID,
        operatingSystem,
        name,
        location})
    // Return the device info object
    return {
        deviceID,
        operatingSystem,
        name,
        location,
    };
}


