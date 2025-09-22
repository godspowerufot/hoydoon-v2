export const PropertySkeleton = () => {
  return (
    <div className="space-y-4 w-full  mt-[3rem] lg:mt-0 max-w-sm rounded-xl border border-gray p-4 shadow-sm bg-white">
      <div className="h-48 rounded-md shimmer" />
      <div className="h-4 rounded shimmer w-3/4" />
      <div className="h-4 rounded shimmer w-1/2" />
      <div className="h-3 rounded shimmer w-5/6" />
      <div className="flex space-x-2 mt-2">
        <div className="h-3 w-1/4 rounded shimmer" />
        <div className="h-3 w-1/4 rounded shimmer" />
        <div className="h-3 w-1/4 rounded shimmer" />
      </div>
    </div>
  );
};
export const SkeletonCard = () => {
  return (
    <>
      {/* Desktop Version */}
      <div className="relative lg:flex hidden lg:w-[380px] h-[600px] bg-white overflow-hidden flex-col rounded-[20px] space-y-4 animate-pulse">
        {/* Thumbnail placeholder */}
        <div className="h-[550px] rounded-md bg-gray" />

        {/* Title + subtitle placeholders */}
        <div className="h-6 rounded bg-gray w-3/4" />
        <div className="h-6 rounded bg-gray w-1/2" />
        <div className="h-6  rounded bg-gray w-5/6" />

        {/* Tags/metadata placeholders */}
      </div>

      {/* Mobile Version */}
    </>
  );
};
