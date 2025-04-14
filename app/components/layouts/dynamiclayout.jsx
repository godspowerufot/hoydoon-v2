import Image from "next/image";
import { useState } from "react";
import PropertyGalleryModal from "./modals/property";
const DynamicImageGrid = ({ images,coordinates, statuses = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const hasStatuses = statuses?.some(status => status); // Check if any status exists

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

  const renderLayout = () => {
    const count = images.length;

    const gridTemplate = {
      1: () => (
        <div className="grid grid-cols-1 gap-4 p-4">
          {renderImage(images[0], 0, "w-full h-[400px] 2xl:h-[500px] object-cover rounded-lg", 800, 500)}
        </div>
      ),
      2: () => (
        <div className="grid grid-cols-2 gap-4 p-4">
          {images.map((img, i) => renderImage(img, i, "w-full h-[300px] object-cover rounded-lg", 500, 400))}
        </div>
      ),
      3: () => (
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
          <div className="col-span-2 row-span-2">
            {renderImage(images[0], 0, "w-full h-[380px] 2xl:h-[450px] object-cover rounded-lg", 500, 400)}
          </div>
          {renderImage(images[1], 1, "w-full h-[185px] 2xl:h-[217px] object-cover rounded-lg", 250, 200)}
          {renderImage(images[2], 2, "w-full h-[180px] object-cover rounded-lg", 300, 200)}
        </div>
      ),
      4: () => (
        <div className="grid grid-cols-2 gap-4 p-4">
          {images.slice(0, 4).map((img, i) =>
            renderImage(img, i, "w-full h-[300px] object-cover rounded-lg", 500, 300)
          )}
        </div>
      ),
      5: () => (
        <div className="grid grid-cols-4 grid-rows-2 gap-4 p-4">
          <div className="col-span-2 row-span-2">
            {renderImage(images[0], 0, "w-full h-[380px] 2xl:h-[450px] object-cover rounded-lg", 500, 400)}
          </div>
          {renderImage(images[1], 1, "w-full h-[185px] 2xl:h-[217px] object-cover rounded-lg", 250, 200)}
          {renderImage(images[2], 2, "w-full h-[180px] object-cover rounded-lg", 300, 200)}
          {renderImage(images[3], 3, "w-full h-[185px] 2xl:h-[217px] object-cover rounded-lg", 250, 200)}
          {renderImage(images[4], 4, "w-full h-[180px] object-cover rounded-lg", 300, 200)}
        </div>
      ),
      6: () => (
        <div className="grid grid-cols-3 gap-4 p-4">
          {images.slice(0, 6).map((img, i) =>
            renderImage(img, i, "w-full h-[200px] object-cover rounded-lg", 400, 250)
          )}
        </div>
      ),
      default: () => (
        <div className="grid grid-cols-5 gap-4 p-4">
          <div className="col-span-2 row-span-2">
            {renderImage(images[0], 0, "w-full h-[380px] 2xl:h-[450px] object-cover rounded-lg", 500, 400)}
          </div>
          {images.slice(1, 7).map((img, i) =>
            renderImage(img, i + 1, "w-full h-[185px] 2xl:h-[217px] object-cover rounded-lg", 250, 200)
          )}
        </div>
      )
    };

    return gridTemplate[count] ? gridTemplate[count]() : gridTemplate.default();
  };

  return (
    <>
      {renderLayout()}
      <PropertyGalleryModal
        image={images}
        coordinates={coordinates}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DynamicImageGrid;
