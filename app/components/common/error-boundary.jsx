"use client";

import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error("ErrorBoundary caught an error:", error);
        console.error("Error Info:", errorInfo);

        // Detect iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Log platform-specific information
        console.error("Platform:", {
            isIOS,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
        });

        this.setState({
            error,
            errorInfo,
        });

        // You can also send error to a logging service here
        // Example: logErrorToService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                            <svg
                                className="w-6 h-6 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
                            Oops! Something went wrong
                        </h2>

                        <p className="text-gray-600 text-center mb-6">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Refresh Page
                            </button>

                            <button
                                onClick={() => window.history.back()}
                                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>

                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <details className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="text-xs text-red-600 overflow-auto max-h-40">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
