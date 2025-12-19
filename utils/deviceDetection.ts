export const getDeviceStoreLink = (userAgent: string): string => {
    const isIphone = /iPhone|iPad|iPod/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);

    if (isIphone) {
        return "https://apps.apple.com/us/app/hoydoon/id6736393320";
    } else if (isAndroid) {
        return "https://play.google.com/store/apps/details?id=com.hoydoon.app";
    }

    // Fallback to home page or a generic app landing page if needed
    return "/";
};
