'use client';

import React from 'react';

const LoadingBalls = () => {
    return (
        <div className="flex items-center justify-center space-x-3 p-8 rounded-2xl bg-primary/10 backdrop-blur-md">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="w-4 h-4 bg-primary rounded-full animate-squishy-bounce"
                    style={{
                        animationDelay: `${i * 0.15}s`,
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes squishy-bounce {
          0%, 100% {
            transform: translateY(0) scale(1, 1);
            animation-timing-function: ease-out;
          }
          45% {
            transform: translateY(-20px) scale(1, 1);
            animation-timing-function: ease-in;
          }
          85% {
            transform: translateY(0) scale(1.2, 0.8);
          }
          90% {
            transform: translateY(0) scale(1.3, 0.7);
          }
          95% {
            transform: translateY(0) scale(1.1, 0.9);
          }
        }
        .animate-squishy-bounce {
          animation: squishy-bounce 1.2s infinite;
        }
      `}</style>
        </div>
    );
};

export default LoadingBalls;
