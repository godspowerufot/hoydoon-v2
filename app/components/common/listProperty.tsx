"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PropertyCardProps {
  imageSrc: string;
  altText: string;
  price: number | string;
  area: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ imageSrc, altText, price, area }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const baseDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && imgContainerRef.current && imgRef.current && detailsRef.current && baseDetailsRef.current) {
      const card = cardRef.current;
      const imgContainer = imgContainerRef.current;
      const img = imgRef.current;
      const details = detailsRef.current;
      const baseDetails = baseDetailsRef.current;
      const mm = gsap.matchMedia();
      gsap.set(details, { opacity: 0, display:"none", y: 20 });

      card.addEventListener("mouseenter", () => {
        gsap.to(imgContainer, { height: 400, duration: 0.5, ease: "power2.out" }); // Shrink height to 300px
        gsap.to(img, { scale: 0.95, duration: 0.5, ease: "power2.out" }); // Slight scale for smooth transition
        gsap.to(details, { opacity: 1, y: 0, display:"block", duration: 0.5, ease: "power2.out", delay: 0.2 });
        gsap.to(baseDetails, {  display:"none", duration: 0.3, ease: "power2.out" });
      });

      card.addEventListener("mouseleave", () => {
        mm.add(
          {
            "(max-width: 640px)": () => {
              gsap.to(imgContainer, { height: 350, duration: 0.5, ease: "power2.out" }); // Small screens
            },
            "(min-width: 641px) and (max-width: 1024px)": () => {
              gsap.to(imgContainer, { height: 450, duration: 0.5, ease: "power2.out" }); // Medium screens
            },
            "(min-width: 1025px)": () => {
              gsap.to(imgContainer, { height: 550, duration: 0.5, ease: "power2.out" }); // Large screens
            }
          },
          () => {
            // Common animations after detecting screen size
            gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(details, { opacity: 0, display: "none", y: 20, duration: 0.3, ease: "power2.out" });
            gsap.to(baseDetails, { display: "block", duration: 0.3, ease: "power2.out", delay: 0.1 });
          }
        );
      });
    }
  }, []);

  return (
    <div ref={cardRef} className="flex flex-col h-fit lg:w-[26rem]  2xl:w-[31rem] font-bricolage snap-center shrink-0 cursor-pointer overflow-hidden p-4 rounded-lg relative">
      {/* Image Container */}
      <div ref={imgContainerRef} className="overflow-hidden rounded-lg w-full h-[450px]  2xl:h-[500px] transition-all duration-300">
        <Image
          ref={imgRef}
          alt={altText}
          width={300}
          height={500}
          quality={100}
          src={imageSrc}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300"
        />
      </div>

      {/* Base Price & Area (Always Visible) */}
   

       {/* Content Inside Image */}
             <span  ref={detailsRef} className="  mt-[2rem] transition-all duration-300  mb-2  ml-5 w-9/10 text-black flex-col">
                 <h1 className="text-black text-base lg:text-[25px] font-bold">
                   Whispering Pines Estate
                 </h1>
                 <span className="flex-col flex mt-3">
                   <span className="flex gap-1">
                     <h4 className="text-gray text-label flex items-center justify-center font-light">
                       From
                     </h4>
                     <h2 className="font-bold">$2500.00</h2>
                     <h4 className="ml-9 text-label text-gray font-light">
                       Area from 190 - 245 m²
                     </h4>
                   </span>
                   <p className="text-gray text-[16px] mt-4">
                     A cozy 3-bedroom home with an open living area and a private
                     backyard. Perfect for comfort and relaxation.
                   </p>
                   <div className=" mt-9  flex justify-between items-center ">
                     <div className="text-base  flex justify-center font-bricolage items-center  rounded-full font-light h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1] ">
                       Luxury Oasis
                     </div>
                     <Image
                 alt="image1"
                 width={50}
                 height={50}
                 src={'/export.png'}
                 className="rounded-full "
               />
                   </div>
                 </span>
               </span>
               <div ref={baseDetailsRef} className="mt-4 text-black transition-all duration-300">
        <span className="flex gap-3">
          <h4 className="text-gray font-light">From</h4>
          <h2 className="font-bold">${price}</h2>
        </span>
        <h4 className="text-gray font-light">{area} Area from 190 - 245 m²</h4>

        
      </div>
    </div>
  );
};

export default PropertyCard;
