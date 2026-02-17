import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import PropertyGalleryModal from "./modals/property";
import { ImageGalleryMobileSkeleton } from "@/app/components/Loader/RentDetailsSkeleton";

const DynamicImageMobile = ({
  handleFavoriteClick,
  images,
  video,
  coordinates,
  statuses = [],
  listingId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Detect screen size once
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1024);
    }
  }, []);

  // Set loading to false once images are available
  useEffect(() => {
    if (images !== undefined && images !== null) {
      setIsLoading(false);
    }
  }, [images]);

  // Auto-slide
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || images.length <= 1 || !isMobile) return;

    const interval = setInterval(() => {
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
        setCurrentIndex(0);
      } else {
        slider.scrollBy({ left: slider.offsetWidth, behavior: "smooth" });
        setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images, isMobile]);

  // Update index on scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !isMobile) return;

    const handleScroll = () => {
      const slideWidth = slider.offsetWidth;
      const index = Math.round(slider.scrollLeft / slideWidth);
      setCurrentIndex(index);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const hasStatuses = statuses?.some((status) => status);

  const renderStatusBadge = (status) => {
    if (!status) return null;
    return (
      <div className="absolute bottom-4 right-4 bg-white flex items-center gap-2 px-2 py-1 text-sm font-medium rounded shadow">
        <Image src="/sold.png" alt="status" width={24} height={24} />
        <p>{status}</p>
      </div>
    );
  };

  const renderMobileSlider = () => (
    <div
      className="overflow-x-auto lg:hidden snap-x snap-mandatory flex no-scrollbar w-full h-full"
      ref={sliderRef}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className="w-full h-[40vh] snap-center shrink-0 relative"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={img?.url || "/house1.png"}
            alt={`Image ${i + 1}`}
            fill
            className="object-cover w-full h-full"
          />

          {/* Image Counter */}
          {i === currentIndex && (
            <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-[12px]  h-[34px]  justify-center items-center flex w-[46px] text-sm font-light">
              {currentIndex + 1}/{images.length}
            </div>
          )}

          {/* Status Badge */}
          {hasStatuses && renderStatusBadge(statuses[i])}
        </div>
      ))}
    </div>
  );

  // Show skeleton while loading
  if (isLoading) {
    return <ImageGalleryMobileSkeleton />;
  }

  // Only show "No images available" after loading is complete
  if (!images || images.length === 0) {
    return <div className="text-center lg:text-3xl">No images available</div>;
  }

  return (
    <>
      {isMobile && renderMobileSlider()}
      <PropertyGalleryModal
        image={images}
        video={video}
        listingId={listingId}
        handleFavoriteClick={handleFavoriteClick}
        coordinates={coordinates}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DynamicImageMobile;
