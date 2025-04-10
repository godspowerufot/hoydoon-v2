import { useState } from "react";
import Image from "next/image";

const CarouselWithSlideEffect = () => {
  const images = ["/carousel.jpg", "/carousel2.jpg", "/carousel3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="mt-[1rem] relative overflow-hidden p-8 2xl:w-[88rem] 2xl:h-[47rem] w-[73rem] h-[40rem] rounded-2xl">
      {/* Background Slider */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-full"
            style={{
              backgroundImage: `url('${img}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Overlay Filter */}
  <div className="absolute inset-0 bg-black opacity-15 transition-opacity duration-500  rounded-2xl" />
             <div className=" lg:-ml-[0.7rem] 2xl:ml-[2rem]  z-111 absolute    bg-primarytransparent p-5 2xl:p-10 2xl: rounded-2xl 2xl:mt-[23rem] lg:mt-[16rem] h-fit   w-fit">
               <div className=" bg-white p-8 rounded-2xl   h-[18rem]  2xl:w-[65rem] w-[56rem] ">
                 <h1 className="text-black text-base  lg:text-2xl 2xl:text-[2rem] font-[600]">
                   Laurel Canyon Nest
                 </h1>
                 <p className="text-gray lg:text-[1rem] mb-[2rem] 2xl:text-[1.05rem] font-[400]  2xl:w-[55rem] 2xl:mt-5 mt-3 text-[10px] ">
                   A charming 3-bedroom home featuring a bright, open-concept
                   living area designed for both comfort and connection. The
                   spacious layout flows seamlessly from the kitchen to the
                   dining and living spaces, making it perfect for gatherings.
                   Step outside to a private backyard, ideal for relaxing,
                   entertaining, or enjoying a bit of gardening. This home offers
                   the perfect blend of functionality and tranquility for
                   everyday living.
                 </p>
 
                 <div className="flex  w-[60%]  2xl:w-[75%] font-bricolage items-center mt-5 ">
                   {/* Property Details */}
                   <div className="flex flex-col-reverse w-1/2 flex-1 px-1 py-3">
                     <span className="text-base   mt-[3px] 2xl:text-[1.2rem] font-semibold text-black">
                       1,200sqft
                     </span>
                     <div className="text-sm 2xl:text-[1rem] text-gray">
                       Size
                     </div>
                   </div>
 
                   {/* Vertical Divider */}
                   <div className="h-10 w-[1px] - bg-black -mx-[15%] my-1"></div>
 
                   <div className="flex ml-[20%] flex-col-reverse w-[40%] flex-1 px-2 py-3">
                     <span className="text-base  mt-[3px]  2xl:text-[1.2rem]  font-semibold text-black">
                       Berbera, Somalia
                     </span>
                     <div className="text-sm 2xl:text-[1rem] text-gray">
                       Location
                     </div>
                   </div>
 
                   {/* Vertical Divider */}
                   <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>
 
                   <div className="flex w-max flex-col-reverse ml-[3%] flex-1 px-2 py-3">
                     <span className="text-[0.9em]  2xl:text-[1.2rem] font-semibold text-black">
                       <span className="flex  mt-[3px] lg:flex-row flex-col gap-[0.2em]  w-full  items-center -ml-[9%] justify-center">
                         <Image
                           alt="logo"
                           width={20}
                           loading="lazy"
                           objectFit="cover"
                           height={20} // Reduced size of logo
                           src={"/star.png"}
                           className="h-5 w-5 "
                         />
                         <p className="text-base">5.0 </p>
                         <p className="text-gray  font-[500] lg:block  hidden">
                           (200 reviews)
                         </p>
                       </span>
                     </span>
                     <div className="text-sm 2xl:text-[1rem] text-gray">
                       Reviews
                     </div>
                   </div>
                 </div>
               </div>
             </div>

      {/* Navigation Buttons */}
         <div className="absolute bottom-5 right-5 flex gap-3 ">
                  {/* Previous Button */}
                  <div onClick={prevSlide} className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-3 w-12 h-12 shadow-md cursor-pointer hover:bg-gray-200">
                    <Image
                      alt="logo"
                      width={20}
                      loading="lazy"
                      height={20} // Reduced size of logo
                      src={"/left.png"}
                      className="text-gray w-[9px]  text-lg"
                    />
                  </div>
                  {/* Next Button */}
                  <div onClick={nextSlide} className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-3 w-12 h-12 shadow-md cursor-pointer hover:bg-gray-200">
                    <Image
                      alt="logo"
                      width={20}
                      loading="lazy"
                      height={20} // Reduced size of logo
                      src={"/right.png"}
                      className="text-gray w-[9px]  text-lg"
                    />
                  </div>
                </div>
    </div>
  );
};

export default CarouselWithSlideEffect;
