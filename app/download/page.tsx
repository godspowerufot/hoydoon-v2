'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAppDownloadLink } from '@/utils';
import LoadingBalls from '@/app/components/common/LoadingBalls';

export default function DownloadPage() {
    const router = useRouter();

    useEffect(() => {

        const link = getAppDownloadLink();

        // Redirect to the appropriate store
        window.location.href = link;

        console.log(link);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white space-y-6">
            <LoadingBalls />
            <div className="text-center">
                <h1 className="text-2xl font-meduim mb-4 text-primary">Redirecting to App Store...</h1>
            </div>
        </div>
    );
}
