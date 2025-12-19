'use client';

import React from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

const AppDownloadQR = () => {
    // The URL that the QR code will point to. 
    // This should be the full URL to the /download page on the production domain.
    // For now, we'll use a relative path or a placeholder that the user can update.
    const downloadUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/download`
        : 'https://www.hoydoon.com/download';

    return (
        <div className="relative inline-block">
            {/* Base Image */}
            <div className="relative">
                <Image
                    src="/phoneqr2.png"
                    alt="Download Hoydoon App"
                    width={500} // Adjust based on actual image dimensions
                    height={500} // Adjust based on actual image dimensions
                    className="w-[334px] h-[625px]"
                    priority
                />

                {/* QR Code Overlay */}
                {/* Positioned "in the middle of the phoneqr image and by the right" */}
                <div
                    className="absolute"
                    style={{
                        top: '50%',
                        left: '-15%', // Adjust this percentage to fine-tune "by the right"
                        transform: 'translateY(-50%)',
                        backgroundColor: 'white',
                        padding: '8px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                    }}
                >
                    <QRCodeSVG
                        value={downloadUrl}
                        size={250} // Adjust size as needed
                        level="H" // High error correction
                        includeMargin={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppDownloadQR;
