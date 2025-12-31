
// Image Gallery Skeleton (Desktop)
export const ImageGallerySkeleton = () => {
    return (
        <div className="hidden md:grid grid-cols-4 grid-rows-3 gap-2 w-full h-[600px] animate-pulse">
            {/* Main large image */}
            <div className="col-span-2 row-span-3 bg-[#ecebebd7] rounded-lg shimmer" />

            {/* Smaller-images */}
            {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-[#ecebebd7] rounded-lg shimmer" />
            ))}
        </div>
    );
};

// Image Gallery Skeleton (Mobile)
export const ImageGalleryMobileSkeleton = () => {
    return (
        <div className="md:hidden w-full h-[400px] bg-[#ecebebd7] rounded-lg animate-pulse shimmer" />
    );
};

// Property Header Skeleton
export const PropertyHeaderSkeleton = () => {
    return (
        <div className="bg-gray-100 p-4 w-full rounded-lg animate-pulse">
            <div className="flex md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
                {/* Left Section */}
                <div className="flex-1 flex flex-col gap-1 md:flex">
                    {/* Title */}
                    <div className="h-8 md:h-12 bg-[#ecebebd7] rounded shimmer w-3/4" />

                    {/* Address */}
                    <div className="space-y-2 mt-2">
                        <div className="h-4 bg-[#ecebebd7] rounded shimmer w-2/3" />
                        <div className="h-4 bg-[#ecebebd7] rounded shimmer w-1/2" />
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-2 mt-4">
                        <div className="w-5 h-5 bg-[#ecebebd7] rounded shimmer" />
                        <div className="h-4 bg-[#ecebebd7] rounded shimmer w-32" />
                    </div>
                </div>

                {/* Right Section */}
                <div className="text-right flex-1 flex flex-col gap-1">
                    {/* Price */}
                    <div className="h-8 bg-[#ecebebd7] rounded shimmer w-32 ml-auto" />

                    {/* Rating */}
                    <div className="flex items-center justify-end mt-2 gap-1">
                        <div className="w-4 h-4 bg-[#ecebebd7] rounded shimmer" />
                        <div className="h-4 bg-[#ecebebd7] rounded shimmer w-12" />
                    </div>

                    {/* Mobile icons */}
                    <div className="flex md:hidden items-center justify-end gap-2 mt-2">
                        <div className="w-6 h-6 bg-[#ecebebd7] rounded shimmer" />
                        <div className="w-6 h-6 bg-[#ecebebd7] rounded shimmer" />
                        <div className="w-6 h-6 bg-[#ecebebd7] rounded shimmer" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Property Stats Skeleton
export const PropertyStatsSkeleton = () => {
    return (
        <div className="w-full my-3 md:mt-0 border-t border-b border-[#8F8F8F] py-3 animate-pulse">
            <div className="flex items-center justify-center gap-[1.1rem] flex-wrap md:gap-[6.5rem]">
                {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-1">
                        <div className="h-5 bg-[#ecebebd7] rounded shimmer w-8" />
                        <div className="h-5 bg-[#ecebebd7] rounded shimmer w-12" />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Home Highlights Skeleton
export const HomeHighlightsSkeleton = () => {
    return (
        <div className="w-full px-4 py-6 animate-pulse">
            <div className="h-6 bg-[#ecebebd7] rounded shimmer w-48 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#ecebebd7] rounded shimmer" />
                        <div className="h-4 bg-[#ecebebd7] rounded shimmer w-24" />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Description Skeleton
export const DescriptionSkeleton = () => {
    return (
        <div className="w-full px-4 py-6 animate-pulse">
            <div className="h-6 bg-[#ecebebd7] rounded shimmer w-32 mb-4" />
            <div className="space-y-3 pt-4">
                <div className="h-4 bg-[#ecebebd7] rounded shimmer w-full" />
                <div className="h-4 bg-[#ecebebd7] rounded shimmer w-full" />
                <div className="h-4 bg-[#ecebebd7] rounded shimmer w-5/6" />
                <div className="h-4 bg-[#ecebebd7] rounded shimmer w-full" />
                <div className="h-4 bg-[#ecebebd7] rounded shimmer w-4/5" />
            </div>
        </div>
    );
};

// Map Skeleton
export const MapSkeleton = () => {
    return (
        <div className="bg-gray-100 w-full rounded-lg animate-pulse">
            <div className="h-6 bg-[#ecebebd7] rounded shimmer w-24 mb-4 ml-4 md:ml-2 md:mt-8" />

            {/* Map Container */}
            <div className="w-full h-[400px] md:h-[500px] bg-[#ecebebd7] rounded-lg shimmer relative">
                {/* Bottom info card */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white w-[24rem] h-16 rounded-lg shimmer" />
            </div>
        </div>
    );
};

// Distance Information Skeleton
export const DistanceInfoSkeleton = () => {
    return (
        <div className="grid p-4 md:my-[3rem] md:p-0 grid-cols-2 md:grid-cols-3 gap-4 mt-6 animate-pulse">
            {Array(5).fill(0).map((_, i) => (
                <div
                    key={i}
                    className={`flex items-start gap-2 ${i === 4 ? 'hidden md:flex' : ''}`}
                >
                    <div className="w-5 h-5 bg-[#ecebebd7] rounded shimmer" />
                    <div className="flex flex-col gap-1 flex-1">
                        <div className="h-4 bg-[#ecebebd7] rounded shimmer w-3/4" />
                        <div className="h-3 bg-[#ecebebd7] rounded shimmer w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// Related Listings Skeleton
export const RelatedListingsSkeleton = () => {
    return (
        <div className="hidden md:block w-full mt-[1.5rem] -mb-[2rem] animate-pulse">
            <section className="mt-[3rem] hidden font-bricolage md:flex flex-col flex-1">
                <div className="flex flex-col items-start gap-6 justify-center w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start w-full mx-auto">
                        <div className="h-10 bg-[#ecebebd7] rounded shimmer w-96" />
                        <div className="h-16 bg-[#ecebebd7] rounded shimmer w-80" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-4 mt-[1em] w-full">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="relative flex w-full lg:w-[380px] h-[600px] bg-white overflow-hidden flex-col rounded-[20px] space-y-4">
                                <div className="h-[550px] rounded-md bg-[#ecebebd7] shimmer" />
                                <div className="h-6 rounded bg-[#ecebebd7] shimmer w-3/4" />
                                <div className="h-6 rounded bg-[#ecebebd7] shimmer w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Breadcrumb Skeleton
export const BreadcrumbSkeleton = () => {
    return (
        <div className="hidden md:flex items-center justify-around py-2 md:w-full mt-[5rem] bg-gray-100 animate-pulse">
            <div className="flex w-full gap-2 items-center">
                <div className="w-4 h-4 bg-[#ecebebd7] rounded shimmer" />
                <div className="h-4 bg-[#ecebebd7] rounded shimmer w-32" />
                <div className="h-4 bg-[#ecebebd7] rounded shimmer w-24" />
                <div className="h-4 bg-[#ecebebd7] rounded shimmer w-40" />
            </div>

            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#ecebebd7] rounded shimmer" />
                <div className="w-8 h-8 bg-[#ecebebd7] rounded shimmer" />
                <div className="w-8 h-8 bg-[#ecebebd7] rounded shimmer" />
            </div>
        </div>
    );
};

// Contact Agent Skeleton
export const ContactAgentSkeleton = () => {
    return (
        <div className="w-full p-4 md:p-6 bg-gray-100 rounded-lg animate-pulse">
            <div className="h-6 bg-[#ecebebd7] rounded shimmer w-48 mb-4" />
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 h-64 bg-[#ecebebd7] rounded-lg shimmer" />
                <div className="w-full md:w-1/2 space-y-4">
                    <div className="h-12 bg-[#ecebebd7] rounded shimmer" />
                    <div className="h-12 bg-[#ecebebd7] rounded shimmer" />
                    <div className="h-32 bg-[#ecebebd7] rounded shimmer" />
                    <div className="h-12 bg-[#ecebebd7] rounded shimmer" />
                </div>
            </div>
        </div>
    );
};
