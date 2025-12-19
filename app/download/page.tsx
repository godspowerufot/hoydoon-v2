'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDeviceStoreLink } from '@/utils/deviceDetection';

export default function DownloadPage() {
    const router = useRouter();

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const link = getDeviceStoreLink(userAgent);

        // Redirect to the appropriate store
        window.location.href = link;
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Redirecting to App Store...</h1>
            </div>
        </div>
    );
}
