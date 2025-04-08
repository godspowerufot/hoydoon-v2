/* eslint-disable */
"use client";
import Image from "next/image";

export default function PropertyGalleryModal({ isOpen, onClose, image }: any) {
  if (!isOpen) return null;

  const images = image || [];
  const rowPattern = [2, 3, 1]; // The layout pattern to repeat
  let imageIndex = 0;

  const generateRows = () => {
    const rows = [];

    while (imageIndex < images.length) {
      for (let i = 0; i < rowPattern.length && imageIndex < images.length; i++) {
        const numInRow = rowPattern[i];
        const rowImages = images.slice(imageIndex, imageIndex + numInRow);
        imageIndex += numInRow;

        const widthClass = {
          1: "w-full",
          2: "w-1/2",
          3: "w-1/3",
        }[numInRow];

        rows.push(
          <div key={imageIndex} className="flex gap-2">
            {rowImages.map((img:any, idx:number) => (
              <Image
                key={idx}
                src={img?.url || "/house1.png"}
                alt={`Property ${imageIndex + idx + 1}`}
                width={600}
                height={400}
                className={`${widthClass} h-auto object-cover rounded-none`}
              />
            ))}
          </div>
        );
      }
    }

    return rows;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-5/6 py-5 px-[4rem] shadow-lg relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          ✕
        </button>

        {/* Tabs and Icons */}
        <div className="flex border-b mb-3">
          <div className="flex space-x-6">
            <button className="border-b-2 border-primary text-black pb-2">Photos</button>
            <button className="text-gray pb-2">Map</button>
            <button className="text-gray pb-2">Street view</button>
          </div>

          <div className="ml-auto mb-3 flex space-x-2">
            <div className="flex pl-[33rem] 2xl:pl-[50rem] items-center gap-2">
              <div className="p-2 border border-[#8F8F8F] rounded-md">
                <Image src="/favorite.png" alt="Favorite" width={16} height={16} className="w-4 h-4" />
              </div>
              <div className="p-2 border border-[#8F8F8F] rounded-md">
                <Image src="/upload.png" alt="Download" width={16} height={16} className="w-4 h-4" />
              </div>
              <div className="p-2 border border-[#8F8F8F] rounded-md">
                <Image src="/image2.png" alt="Share" width={16} height={16} className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Gallery Layout */}
        <div className="space-y-3 mt-[2rem]">{generateRows()}</div>
      </div>
    </div>
  );
}
