"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import PropertyGalleryModal from "./modals/property";
import { ImageGallerySkeleton } from "@/app/components/Loader/RentDetailsSkeleton";

const DynamicImageGrid = ({
  handleFavoriteClick,
  images,
  video,
  coordinates,
  statuses = [],
  listingId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once images are available or confirmed empty
    if (images !== undefined && images !== null) {
      setIsLoading(false);
    }
  }, [images]);

  // Show skeleton while loading
  if (isLoading

  ) {
    return <ImageGallerySkeleton />;
  }

  // Only show "No images available" after loading is complete
  if (images?.length === 0) {
    return <div className="text-center lg:text-3xl">No images available</div>;
  }

  const hasStatuses = statuses?.some((status) => status); // Check if any status exists

  const renderStatusBadge = (status) => {
    if (!status) return null;

    return (
      <div className="flex gap-2 font-[500] items-center justify-center absolute bottom-2 right-2 bg-white px-2 py-1 text-base 2xl:text-xl rounded shadow">
        <Image
          alt="logo"
          width={30}
          priority
          quality={100}
          height={30}
          className="h-6 w-7 2xl:w-7 2xl:h-7"
          src="/sold.png"
        />
        <p>{status}</p>
      </div>
    );
  };

  const renderImage = (img, i, className, width, height) => {
    return (
      <div key={i} className="relative" onClick={() => setIsModalOpen(true)}>
        <Image
          src={img?.url || "/house1.png"}
          alt={`Gallery Image ${i + 1}`}
          width={width}
          height={height}
          className={className}
        />
        {hasStatuses && renderStatusBadge(statuses[i])}
      </div>
    );
  };

  const renderVideo = (vid, className) => {
    return (
      <div className="relative cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <video
          src={vid.url}
          className={`${className} object-cover`}
          muted
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/30 p-3 rounded-full">
            <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 20 20">
              <path d="M4 4l12 6-12 6z" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const renderLayout = () => {
    const hasVideo = !!video?.url;
    const count = images.length;

    // Default layout if video exists but no images (unlikely based on listing schema but for safety)
    if (hasVideo && count === 0) {
      return (
        <div className="hidden lg:grid grid-cols-1 gap-4 px-4 md:px-0 pt-4">
          {renderVideo(video, "w-full h-[450px] rounded-lg")}
        </div>
      );
    }

    const gridTemplate = {
      1: () => (
        <div className={`hidden lg:grid ${hasVideo ? 'grid-cols-2' : 'grid-cols-1'} gap-4 px-4 md:px-0 pt-4`}>
          {hasVideo && renderVideo(video, "w-full h-[450px] rounded-lg")}
          {renderImage(
            images[0],
            0,
            "w-full h-[450px] object-cover rounded-lg",
            800,
            500
          )}
        </div>
      ),
      2: () => (
        <div className={`hidden lg:grid ${hasVideo ? 'grid-cols-3' : 'grid-cols-2'} gap-4 p-4 lg:py-4 lg:px-0`}>
          {hasVideo && renderVideo(video, "w-full h-[450px] rounded-lg")}
          {images.map((img, i) =>
            renderImage(
              img,
              i,
              "w-full h-[450px] object-cover rounded-lg",
              500,
              400
            )
          )}
        </div>
      ),
      default: () => (
        <div className="hidden lg:grid grid-cols-5 gap-4 lg:pb-2 p-4 lg:p-0">
          <div className="col-span-2 row-span-2">
            {hasVideo
              ? renderVideo(video, "w-full h-[450px] rounded-lg")
              : renderImage(
                images[0],
                0,
                "w-full h-[450px] object-cover rounded-lg",
                500,
                400
              )
            }
          </div>
          {images
            .slice(hasVideo ? 0 : 1, hasVideo ? 6 : 7)
            .map((img, i) =>
              renderImage(
                img,
                hasVideo ? i : i + 1,
                "w-full h-[218px] object-cover rounded-lg",
                250,
                218
              )
            )}
        </div>
      ),
    };

    // Use specific templates only if no video, otherwise fallback to default for better flexibility
    if (!hasVideo && gridTemplate[count]) {
      return gridTemplate[count]();
    }

    return gridTemplate.default();
  };

  return (
    <>
      {renderLayout()}
      <PropertyGalleryModal
        image={images}
        video={video}
        listingId={listingId}
        coordinates={coordinates}
        handleFavoriteClick={handleFavoriteClick}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DynamicImageGrid;
