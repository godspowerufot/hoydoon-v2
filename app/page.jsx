"use client";
import Image from "next/image";
import Link from "next/link";
import ArticlesSection from "./components/common/Article";
import { useEffect, useRef } from "react";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { useState } from "react";
import SearchBar from "./components/common/searchcomponent";
import { useIsMobile } from "@/hooks/usemobile";
import Button from "./components/common/Button";
import { flattenListings } from "@/utils";
import { toast } from "react-toastify";
import { truncateDescription } from "@/utils/index";
import HoverCard from "@/app/components/common/card";
import FagsSection from "../app/components/layouts/FaqSection";
import { SkeletonCard } from "./components/Loader";
import TestimonialGrid from "@/app/components/layouts/testimonialsgrid";
function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(null);

  const goToSlide = (index) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!startX.current) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX.current - endX;

    if (diffX > 50) {
      goToSlide(currentIndex + 1); // Swipe left
    } else if (diffX < -50) {
      goToSlide(currentIndex - 1); // Swipe right
    }

    startX.current = null;
  };
  // Go to next slide
  // Go to next slide (with loop)
  const prev = () => {
    goToSlide(currentIndex + 1);
  };

  // Go to previous slide (with loop)
  const next = () => {
    goToSlide(currentIndex - 1);
  };

  console.log(images, "dataa stricture");
  return (
    <>
      <main className="relative w-full md:max-w-[1200px] flex-col flex justify-center items-center">
        <div
          style={{
            backgroundImage: `url('${images[currentIndex]?.imageUrl}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="md:mt-[1rem] md:hidden relative p-5 sm:p-6 md:p-8 w-full md:max-w-[1200px]  h-[26rem] 2xl:w-[88rem] 2xl:h-[47rem]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0 bg-black opacity-15 transition-opacity duration-500" />

          <div className="z-111 absolute bg-primarytransparent p-2 sm:p-2  2xl:mt-[20rem] rounded-2xl top-[55%] right-0 h-fit w-full">
            <div className="bg-white px-3 pt-3 sm:p-6 md:p-8 rounded-2xl h-fit w-full max-w-full md:w-[56rem] 2xl:w-[65rem]">
              <h1 className="text-black text-[0.9rem] sm:text-base md:text-2xl 2xl:text-[2rem] font-[600]">
                {truncateDescription(images[currentIndex]?.title, 15)}
              </h1>
              <p className="text-gray text-[8px] sm:text-sm md:text-[1rem] 2xl:text-[1.05rem] 2xl:w-[55rem] mt-2 2xl:mt-5">
                {truncateDescription(images[currentIndex]?.description, 55)}
              </p>

              <div className="flex flex-wrap -mt-[10px] sm:flex-nowrap w-full sm:w-[60%] 2xl:w-[75%] font-bricolage items-center gap-3 sm:gap-0">
                <div className="flex flex-col-reverse flex-1 px-2 py-3">
                  <span className="text-[8px] sm:text-base 2xl:text-[1.2rem] font-semibold text-black mt-[3px]">
                    {images[currentIndex]?.squareFeet || "_"}
                  </span>
                  <div className="text-[0.5rem] sm:text-sm 2xl:text-[1rem] text-gray">
                    Size
                  </div>
                </div>

                <div className="h-3 sm:h-10 w-[1px] bg-black my-1 mx-1 sm:-mx-[15%]"></div>

                <div className="flex flex-col-reverse flex-1 px-2 py-3">
                  <span className="text-[8px] sm:text-base 2xl:text-[1.2rem] font-semibold text-black mt-[3px]">
                    {images[currentIndex]?.region || "_"}
                  </span>
                  <div className="text-[0.5rem] sm:text-sm 2xl:text-[1rem] text-gray">
                    Location
                  </div>
                </div>

                <div className="h-3 sm:h-10 w-[1px] bg-black my-1 mx-1"></div>

                <div className="flex flex-col-reverse flex-1 px-2 py-3">
                  <span className="flex flex-row gap-[0.2em] items-center mt-[3px] text-[0.75rem] sm:text-base 2xl:text-[1.2rem] font-semibold text-black">
                    <Image
                      alt="logo"
                      width={20}
                      height={20}
                      src="/star.png"
                      className="h-2 w-2"
                    />
                    <p className="text-[8px] sm:text-sm">
                      {images[currentIndex]?.rating.toFixed(1)}
                    </p>
                    <p className="text-gray font-[500] text-[0.5rem] sm:text-xs hidden md:block">
                      ({images[currentIndex]?.reviewCount} reviews)
                    </p>
                  </span>
                  <div className="text-[0.5rem] sm:text-sm 2xl:text-[1rem] text-gray">
                    Reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}

        <div
          style={{
            backgroundImage: `url('${images[currentIndex]?.imageUrl}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="md:mt-[1rem] rounded-none  hidden md:block relative p-8  w-full h-[35rem] md:rounded-2xl"
        >
          <div className="absolute  rounded-none inset-0 bg-black opacity-15 transition-opacity duration-500  md:rounded-2xl" />
          <div className="    z-111 absolute    bg-primarytransparent p-5 rounded-2xl bottom-[1.25rem] left-[1.25rem] h-fit   w-fit">
            <div className=" bg-white md:max-w-[1000px] p-8 md:rounded-2xl   h-[18rem]   w-[58rem] ">
              <h1 className="text-black text-base  md:text-2xl 2xl:text-[2rem] font-[600]">
                {images[currentIndex]?.title}{" "}
              </h1>
              <p className="text-gray md:text-[1rem] mb-[2rem] 2xl:text-[1.05rem] font-[400]  2xl:w-[55rem] 2xl:mt-5 mt-3 text-[10px] ">
                {truncateDescription(images[currentIndex]?.description, 50)}
              </p>

              <div className="flex  w-[60%]  2xl:w-[75%] font-bricolage items-center mt-5 ">
                {/* Property Details */}
                <div className="flex flex-col-reverse w-1/2 flex-1 px-1 py-3">
                  <span className="text-base   mt-[3px] 2xl:text-[1.2rem] font-semibold text-black">
                    {images[currentIndex]?.squareFeet || "_"}
                  </span>
                  <div className="text-sm 2xl:text-[1rem] text-gray">Size</div>
                </div>

                {/* Vertical Divider */}
                <div className="h-10 w-[1px] - bg-black -mx-[15%] my-1"></div>

                <div className="flex ml-[20%] flex-col-reverse w-[40%] flex-1 px-2 py-3">
                  <span className="text-base  mt-[3px]  2xl:text-[1.2rem]  font-semibold text-black">
                    {images[currentIndex]?.region || "_"}
                  </span>
                  <div className="text-sm 2xl:text-[1rem] text-gray">
                    Location
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

                <div className="flex w-max flex-col-reverse ml-[3%] flex-1 px-2 py-3">
                  <span className="text-[0.9em]  2xl:text-[1.2rem] font-semibold text-black">
                    <span className="flex  mt-[3px] md:flex-row flex-col gap-[0.2em]  w-full  items-center -ml-[15%] justify-center">
                      <Image
                        alt="logo"
                        width={20}
                        loading="lazy"
                        objectFit="cover"
                        height={20} // Reduced size of logo
                        src={"/star.png"}
                        className="h-5 w-5 "
                      />
                      <p className="text-base">
                        {" "}
                        {images[currentIndex]?.rating.toFixed(1)}
                      </p>
                      <p className="text-gray  font-[500] md:block  hidden">
                        ({images[currentIndex]?.reviewCount} reviews)
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
          {/* Navigation Buttons at Bottom Right */}
          <div className="absolute bottom-5 right-5 flex gap-3 ">
            {/* Previous Button */}
            <div
              onClick={next}
              className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-3 w-12 h-12 shadow-md cursor-pointer hover:bg-gray-200"
            >
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
            <div
              onClick={prev}
              className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-3 w-12 h-12 shadow-md cursor-pointer hover:bg-gray-200"
            >
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
        <div className="mt-4 md:hidden flex gap-2 z-50">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? "bg-primary scale-110"
                  : "bg-gray opacity-60"
              }`}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default function Home() {
  const {
    data: allListings,
    isLoading: isAllLoading,
    refetch: refetchAll,
  } = useGetAllListingsQuery({ category: "Featured" });
  const {
    data: luxuryListings,
    isLoading: isLuxuryLoading,
    refetch: refetchLuxury,
  } = useGetAllListingsQuery({ category: "luxury" });

  const isMobile = useIsMobile();

  const [displayListings, setDisplayListings] = useState([]);
  const [luxuryDisplayListings, setLuxuryDisplayListings] = useState([]);

  useEffect(() => {
    refetchAll(); // Refetch all listings on mount
    refetchLuxury(); // Refetch luxury listings on mount
  }, [refetchAll, refetchLuxury]);

  useEffect(() => {
    if (!isAllLoading && allListings) {
      const firstThreeListings = allListings.listings?.slice(0, 3);
      setDisplayListings(firstThreeListings);
    }
  }, [allListings, isAllLoading]);

  useEffect(() => {
    if (!isLuxuryLoading && luxuryListings?.listings) {
      const flatListings = flattenListings(luxuryListings.listings);

      const slides = flatListings.map((listing) => ({
        imageUrl: listing.imageUrls?.[0]?.url || "",
        title: listing.title || "",
        rating: listing.averageRating || 0,
        reviewCount: listing.reviewCount || 0,
        region: listing.region || "_",
        squareFeet: listing.item?.squareFeet ?? "_",
        description: listing.item?.description || "",
      }));

      setLuxuryDisplayListings(slides);
    }
  }, [luxuryListings, isLuxuryLoading]);

  return (
    <>
      <header className="relative h-[40vh] md:h-[100vh] p-2 md:p-0 w-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-screen h-full  bg-cover bg-center z-[-1]"
          style={{
            backgroundImage:
              "url('https://hoydoonstorage.blob.core.windows.net/web-images/headertwo.webp')",
          }}
        ></div>
        {/* Content Section */}
        <div className="flex flex-col items-center relative z-[1]  2xl:mt-[8rem] mt-[2rem] md:mt-[4rem]  p-3 md:p-0  md:gap-4 h-full ">
          {/* Main Heading */}
          <h1 className="text-white text-center    relative  font-bricolage font-semibold leading-tight  text-[2.1em] md:text-[clamp(4em,4vw,4em)] md:w-[65%] max-w-[700px] 2xl:max-w-[700px]">
            Where Every House Feels Like Home
          </h1>

          {/* Subheading */}
          <h2 className="text-[#FFFFFFB2]  hidden  md:-mt-2 text-center  md:flex item-center justify-center font-[300]  text-[clamp(1em,2vw,1.4em)] md:w-[47rem]">
            From urban flats to rural getaways, Hoydoon effortlessly links you
            to the home of your dreams with trust and ease.
          </h2>
          <h2 className="text-[#FFFFFFB2]  md:hidden md:-mt-2 text-center  flex item-center justify-center font-[300]  text-sm md:text-[clamp(1em,2vw,1.4em)] md:w-[47rem]">
            Hoydoon connects you to your dream home — easily and reliably.{" "}
          </h2>

          {/* Search Bar (Large Screens) */}
          <SearchBar />

          {/* Mobile Search Bar */}
        </div>
        {/* Statistics Section */}
        <div className="absolute hidden  bottom-7 md:flex font-bricolage md:mt-10 justify-center items-center w-full pt-10 px-4">
          <div className="flex items-center rounded-lg ml-15 justify-between md:w-4/5 md:max-w-[50rem]">
            {/* Hosts Section */}
            <div className="flex items-center text-start gap-2 px-4">
              <span className="text-2xl font-medium text-white">10M+</span>
              <span className="text-base leading-[16px] w-[150px] font-light text-white">
                Hosts welcome guests worldwide
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="h-12 w-[1px] bg-white"></div>

            {/* Unique Stays Section */}
            <div className="flex  items-center text-start gap-2 px-4">
              <span className="text-xl font-medium text-white">15M+</span>
              <span className="text-base leading-[16px] font-light w-[150px] text-white">
                Unique stays across 150K+ cities
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="h-12 w-[1px] bg-white"></div>

            {/* Guest Arrivals Section */}
            <div className="flex  items-center text-start gap-2 px-4">
              <span className="text-2xl font-medium text-white">12M+</span>
              <span className="text-base leading-[16px] font-light w-[150px] text-white">
                Guest arrivals to date every month
              </span>
            </div>
          </div>
        </div>
      </header>
      <div></div>
      <section className="w-screen p-5 md:p-0 font-bricolage md:flex  justify-center flex-col flex-1 items-center bg-[#eeeeeec7]">
        <div className="flex  flex-col-reverse   md:my-[5em] md:flex-row  items-center  2xl:justify-center md:justify-between ">
          <span className="flex  gap-4 flex-col w-full md:max-w-[45.3em] 2xl:max-w-[48em]  ">
            <h1 className="text-black  text-[24px]  mt-4 md:mt-0 md:text-[2.6rem] 2xl:text-5xl  md:leading-[1.1em] leading-[29px] font-[600] 2xl:w-[80%]">
              Find your ideal property with simple tools and guidance.
            </h1>
            <p className="text-gray text-sm md:text-xl  mt-2 md:mt-4  font-[300] 2xl:mt-[2.2em] font-bricolage  w-full md:w-9/10 2xl:text-[20px] 2xl:w-[70%]">
              Enjoy fast and easy access to a variety of properties that suit
              your needs. Use our smart filters to find the perfect places
              within your budget and preferences. We’ve done the hard work for
              you, so no need to stress about the search.
            </p>

            <Button
              className="text-base font-light  !w-[130px] !p-[0.6rem]"
              onClick={() => {
                toast.info("Coming soon!");
              }}
            >
              <span>Explore</span>
            </Button>
          </span>

          <span className="mt-4  md:mt-0">
            <Image
              alt="image1"
              width={480}
              quality={100}
              height={300} // Reduced size of logo
              src={
                "https://hoydoonstorage.blob.core.windows.net/web-images/house-app.webp"
              }
            />
          </span>
        </div>
      </section>
      <section className=" hidden p-2 md:p-0   font-bricolage md:flex justify-center flex-col flex-1 items-center">
        <div className="flex  gap-[4rem]  md:my-[5em]   flex-col md:flex-row  items-center justify-center">
          <span className="flex   md:pl-1  2xl:pl-[0rem] flex-col w-full md:w-6/10 ">
            <h1 className="text-black  text-[26px] md:text-5xl font-[600]">
              Get the Hoydoon App
            </h1>
            <p className="text-gray  text-base md:text-xl mt-4 font-[300]  font-bricolage  w-fit md:w-[40rem]">
              Download our highly-rated real estate app for iOS or Android to
              receive instant alerts when your dream home becomes available.
            </p>
            <Link
              href="
https://expo.dev/artifacts/eas/fYMekk7hs69zo5CgvmfQ1N.apk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="text-base font-light mt-5 ">Download</Button>
            </Link>
          </span>

          <span className="mt-4 md:mt-0">
            <Image
              alt="image1"
              width={500} // Reduced size of logo
              height={500} // Reduced size of logo
              src={"/app.svg"}
              className="md:w-[500px] w-[200px]"
            />
          </span>
        </div>
      </section>

      <section className=" p-2 md:p-0  md:mt-[2.5em] md:mb-[5em] w-full font-bricolage md:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col   items-start gap-6 md:gap-0 justify-center max-w-[1200px] w-full">
          <div className="flex flex-col  md:flex-row justify-between items-center w-full  mx-auto">
            <h1 className="text-black text-[24px] mt-[32px] md:mt-0  md:text-[2.5rem] font-[600] w-full md:w-auto">
              Featured Properties for Rent
            </h1>
            <p className="text-gray font-light text-sm md:max-w-[30rem] md:text-xl font-bricolage w-full md:w-auto text-start md:text-right">
              Discover a home where every detail enhances your lifestyle crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col mt-[0.5em] md:mt-[2.5em]  gap-5 items-start md:flex-row justify-start mb-2">
            {isAllLoading
              ? // Show skeleton loaders
                Array.from({ length: isMobile ? 1 : 3 }, (_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              : // Show actual cards
                (isMobile ? displayListings.slice(0, 1) : displayListings).map(
                  (items, index) => (
                    <HoverCard
                      _id={items?._id}
                      key={items?._id || index}
                      imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                      altText={
                        items?.imageUrls?.[0]?.altText ||
                        "Property image showcasing a beautiful home"
                      }
                      price={items?.item.price || "Price not available"}
                      area={items?.item.squareFeet || ""}
                      bathrooms={items?.item?.bathrooms}
                      bedrooms={items?.item?.bedrooms}
                      description={
                        items?.item.description ||
                        "No description available for this property."
                      }
                      title={items?.item.title || "Untitled Property"}
                      rent={items?.item.rent || "Rent details not provided"}
                    />
                  )
                )}

            {!isAllLoading && (
              <Link
                href="/"
                className="text-[#09858D] md:hidden mt-2 text-sm md:my-5 md:text-2xl font-[500] "
              >
                see housing for sale
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="mt-5 w-screen md:mb-[5em]   md:w-full font-bricolage md:flex justify-center flex-col flex-1 items-center">
        <div className="flex flex-col items-start gap-6 md:gap-0 justify-center max-w-[1200px] w-full">
          <div className="flex flex-col md:py-0 md:flex-row  p-3 md:p-0 md:gap-10 justify-between items-center w-full  mx-auto">
            <h1 className="text-black text-[24px] md:text-[2.5rem] font-[600] w-full md:w-auto">
              Explore Luxurious Living Spaces
            </h1>
            <p className="text-gray font-light text-sm md:max-w-[30rem] md:text-xl font-bricolage w-full md:w-auto text-start md:text-right">
              Discover a home where every detail enhances your lifestyle crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className=" md:mt-[2em] w-full">
            <Carousel images={luxuryDisplayListings} />
          </div>{" "}
        </div>
      </section>

      {/* <CarouselWithSlideEffect/> */}
      {/* carousel */}

      {/* testimonials */}
      <section className=" p-2   pt-[2.5rem] md:mt-[4em] md:mb-[5em]  md:p-0 font-bricolage  flex justify-center flex-col  items-center">
        <div className="flex  flex-col    md:flex-row  md:max-w-[1200px] md:gap-0  justify-around items-start w-full   ">
          <span className="flex    2xl:w-full  flex-col font-bricolage gap-3">
            <h1 className="text-black   text-[26px] md:text-[2.5rem] 2xl:text-5xl font-[600]  mr-5">
              What People Are Saying
            </h1>
            <p className="text-gray  md:block hidden text-sm md:text-xl font-bricolage w-full md:w-[30em]">
              Hear directly from our users about their experiences. Whether
              they’re finding trusted agents or securing great deals, our
              community speaks for itself..
            </p>
            <p className="text-gray font-light md:hidden block text-sm md:text-xl font-bricolage w-full md:w-[30em]">
              Discover what our clients have to say in our customer testimonials
              section. We take pride in the positive feedback and experiences
              shared by those we’ve had.
            </p>
          </span>
          <span className=" hidden md:flex flex-col font-bricolage gap-3 ">
            <p className="text-gray  md:p-0 text-sm 2xl:text-[20px] md:text-xl font-bricolage w-full md:w-[24em]">
              Discover a home where every detail enhances your lifestyle—crafted
              to fit your taste and needs.
            </p>
            <a
              href="/helpcenter
          "
            >
              {" "}
              <Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px] ">
                <p className="text-gray"> Explore </p>
              </Button>
            </a>
          </span>
        </div>
        <TestimonialGrid />
      </section>

      {/* testimonials */}
      <FagsSection />

      {/* New-articles */}
      <ArticlesSection />
    </>
  );
}
