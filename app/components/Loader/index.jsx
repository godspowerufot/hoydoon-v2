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
      <div className="relative lg:flex  lg:w-[380px] h-[600px] bg-white overflow-hidden flex-col rounded-[20px] space-y-4 animate-pulse">
        {/* Thumbnail placeholder */}
        <div className="h-[550px] rounded-md bg-[#ecebebd7]" />

        {/* Title + subtitle placeholders */}
        <div className="h-6 rounded bg-[#ecebebd7] w-3/4" />
        <div className="h-6 rounded bg-[#ecebebd7] w-1/2" />
        <div className="h-6  rounded bg-[#ecebebd7] w-5/6" />

        {/* Tags/metadata placeholders */}
      </div>

      {/* Mobile Version */}
    </>
  );
};

// Skeleton loader component
export const TestimonialSkeleton = () => {
  return (
    <div className="w-full lg:w-[390px] h-full lg:h-[96%] bg-[#ecebebd7] rounded-xl shadow p-6 flex flex-col justify-between animate-pulse">
      {/* Stars skeleton */}
      <div className="flex space-x-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-5 h-5 bg-[#ecebebd7]-300 rounded" />
          ))}
      </div>

      {/* Text skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-[#ecebebd7] rounded w-full"></div>
        <div className="h-3 bg-[#ecebebd7] rounded w-5/6"></div>
        <div className="h-3 bg-[#ecebebd7] rounded w-4/6"></div>
      </div>

      {/* User info skeleton */}
      <div className="flex items-center mt-4">
        <div className="w-10 h-10 bg-[#ecebebd7] rounded-full"></div>
        <div className="ml-3 space-y-1">
          <div className="h-4 bg-[#ecebebd7] rounded w-24"></div>
          <div className="h-3 bg-[#ecebebd7] rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};
export const ProfileCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center animate-pulse">
      <div className="lg:p-6 sm:h-fit flex rounded-[8px] lg:rounded-none w-full h-[120px] gap-2 lg:gap-5 lg:h-[200px] justify-start bg-[#ffffff] lg:max-w-[40rem]">
        {/* Image skeleton */}
        <div className="w-[150px] h-full rounded-tl-[8px] rounded-bl-[8px] lg:w-[140px] lg:h-[140px] lg:rounded-full bg-[#ecebebd7]" />

        {/* Content skeleton */}
        <div className="lg:mt-[1em] p-[1rem] lg:p-0 w-fit flex flex-col gap-y-1 lg:gap-y-2 lg:block font-bricolage lg:ml-[0.3em]">
          {/* Name skeleton */}
          <div className="h-4 lg:h-6 bg-[#ecebebd7] rounded w-32 lg:w-40" />

          {/* Email skeleton */}
          <div className="h-3 lg:h-4 bg-[#ecebebd7] rounded w-28 lg:w-48 mt-1" />

          {/* Price range and sales skeleton */}
          <div className="lg:mt-3 space-y-1">
            {/* Price range skeleton */}
            <div className="flex items-center gap-1">
              <div className="h-3 lg:h-4 bg-[#ecebebd7] rounded w-16 lg:w-20" />
              <div className="h-3 lg:h-4 bg-[#ecebebd7] rounded w-8 lg:w-10" />
              <div className="h-3 lg:h-4 bg-[#ecebebd7] rounded w-20 lg:w-24" />
            </div>

            {/* Total sales skeleton */}
            <div className="flex items-center gap-1">
              <div className="h-3 lg:h-4 bg-[#ecebebd7] rounded w-6 lg:w-8" />
              <div className="h-3 lg:h-4 bg-[#ecebebd7] rounded w-16 lg:w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
