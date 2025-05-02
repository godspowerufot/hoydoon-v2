'use client'
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import FAQComponent from "./components/layouts/faq";
import PropertyCard from "./components/common/property";
import ArticlesSection from "./components/common/Article";
import { useEffect } from "react";
import { useGetAllListingsQuery, useGetFavoritesQuery } from "@/store/slices/api/authapi";
import { useState } from "react";
import SearchBar from "./components/common/searchcomponent";
import {useIsMobile} from "@/hooks/usemobile"
import Button from "./components/common/Button";
import TestimonialCard from "./components/layouts/testimonials";

export default function Home() {
  const { data: allListings, isLoading: isAllLoading, refetch } = useGetAllListingsQuery( );
  const isMobile = useIsMobile();

  const [displayListings, setDisplayListings] = useState([]);


  useEffect(() => {
    refetch(); // Refetch data on every mount
  }, [refetch]);

  useEffect(() => {
    if (!isAllLoading && allListings) {
      const firstThreeListings = allListings.listings?.slice(0, 3);
      setDisplayListings(firstThreeListings); // Store in state
    }
  }, [allListings, isAllLoading]);

  if (isAllLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
        <div className="loader border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }


  return (
    <>
      <header className="relative  h-[60vh] lg:h-[100vh] p-2 lg:p-0 w-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full  bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/header.svg')" }}
        ></div>

        {/* Content Section */}
        <div className="flex flex-col items-center relative z-[1]  2xl:mt-[8rem] mt-[4rem]  p-3 lg:p-0  gap-4 h-full ">
          {/* Main Heading */}
          <h1 className="text-white text-center w-[20rem]   relative  font-bricolage font-semibold leading-tight  text-[2.1em] lg:text-[clamp(4em,4vw,4em)] lg:w-[60%] max-w-[700px] 2xl:max-w-[700px]">
            Where Every House Feels Like Home
          </h1>

          {/* Subheading */}
          <h2 className="text-[#FFFFFFB2]  hidden  lg:-mt-2 text-center  lg:flex item-center justify-center font-[300]  text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
            From urban flats to rural getaways, Hoydoon effortlessly links you
            to the home of your dreams with trust and ease.
          </h2>
          <h2 className="text-[#FFFFFFB2]  lg:hidden lg:-mt-2 text-center  flex item-center justify-center font-[300]  text-sm lg:text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
          Hoydoon connects you to your dream home — easily and reliably. </h2>



          {/* Search Bar (Large Screens) */}
     <SearchBar/>

          {/* Mobile Search Bar */}

        </div>

        {/* Statistics Section */}
        <div className="absolute hidden  bottom-7 lg:flex font-bricolage lg:mt-10 justify-center items-center w-full pt-10 px-4">
          <div className="flex items-center rounded-lg w-9/10 ml-15 justify-between md:w-4/5 lg:w-[50rem]">
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

      {/* this hold the images */}
      <section className=" w-screen  p-5 lg:p-0 font-bricolage lg:flex  justify-center flex-col flex-1 items-center bg-[#eeeeeec7]">
        <div className="flex  gap-[4%] flex-col-reverse 2xl:pl-[3.4em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex flex-col w-full lg:w-[45em] 2xl:w-[60em] ">
            <h1 className="text-black  text-[24px]  mt-3 lg:mt-0 lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
              Find your ideal property with simple tools and guidance.
            </h1>
            <p className="text-gray text-sm lg:text-xl  mt-1 lg:mt-4  font-[300] 2xl:mt-[2.2em] font-bricolage  w-full lg:w-9/10 2xl:text-[20px] 2xl:w-[70%]">
              Enjoy fast and easy access to a variety of properties that suit
              your needs. Use our smart filters to find the perfect places
              within your budget and preferences. We’ve done the hard work for
              you, so no need to stress about the search.
            </p>

            <Button className="text-base font-light mt-5 ">
              <Link href="/explore">Explore</Link>
            </Button>
          </span>

          <span className="mt-4 lg:mt-0">
            <Image
              alt="image1"
              width={500}
              quality={100}
              height={400} // Reduced size of logo
              src={"/house-app.png"} 
            />
          </span>
        </div>
      </section>
      <section className=" hidden p-2 lg:p-0  lg:mt-[100px]  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex  gap-[4rem] 2xl:gap-[17rem]  flex-col lg:flex-row  items-center justify-center">
          <span className="flex   lg:pl-1  2xl:pl-[0rem] flex-col w-full lg:w-6/10 ">
            <h1 className="text-black  text-[26px] lg:text-5xl font-[600]">
              Get the Hoydoon App
            </h1>
            <p className="text-gray  text-base lg:text-xl mt-4 font-[300]  font-bricolage  w-fit lg:w-[40rem]">
              Download our highly-rated real estate app for iOS or Android to
              receive instant alerts when your dream home becomes available.
            </p>

            <Button className="text-base font-light mt-5 ">
              <Link href="/download">Download</Link>
            </Button>
          </span>

          <span className="mt-4 lg:mt-0">
            <Image
              alt="image1"
              width={500} // Reduced size of logo
              height={500} // Reduced size of logo
                src={"/app.svg"}
                className="lg:w-[500px] w-[200px]https://hoydoon-backend.azurewebsites.net/api/v1/favorites"
              />
              </span>
            </div>
            </section>

            <section className="   lg:mt-[4em] p-5 lg:p-0 w-full font-bricolage lg:flex justify-center flex-col flex-1 items-center">
            <div className="flex flex-col   items-start justify-center">
              <div className="flex lg:ml-[4rem] 2xl:ml-[2.2rem] flex-col md:flex-row lg:my-[2rem] lg:flex-row md:gap-10 justify-end items-center md:items-start">
              <h1 className="text-black text-[24px] 2xl:-ml-[1em] lg:text-[2.5rem] font-[600] w-full">
                Featured Properties for Rent
              </h1>
              <p className="text-gray text-sm lg:-ml-[10rem] 2xl:mr-[4rem]  lg:text-xl font-bricolage w-full lg:w-[50rem] 2xl:ml-0 2xl:w-[50rem]">
                Discover a home where every detail enhances your lifestyle crafted to fit your taste and needs.
              </p>
              </div>
              <div className="flex flex-col mt-[0.5em] lg:mt-[1em] lg:ml-[2rem] 2xl:-ml-[2rem] h-fit min-w-[70%] items-start lg:flex-row justify-start mb-2">
      {(isMobile ? displayListings.slice(0, 1) : displayListings).map((items, index) => (
        <PropertyCard
          _id={items?._id}
          key={index}
          imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
          altText={items?.imageUrls?.[0]?.altText || "Property image showcasing a beautiful home"}
          price={items?.item.price || "Price not available"}
          area={items?.item.squareFeet || ""}
          bathrooms={items?.item?.bathrooms}
          bedrooms={items?.item?.bedrooms}
          description={items?.item.description || "No description available for this property."}
          title={items?.item.title || "Untitled Property"}
          rent={items?.item.rent || "Rent details not provided"}
        />
      ))}
        <Link  href="/" className="text-[#09858D] lg:hidden my-5 text-2xl font-[500] ">
              see {displayListings.length} lagos housing for sale
            </Link>
    </div>
            </div>
            </section>

            <section className="mt-5 w-screen     lg:my-[4em] lg:w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
            <div className="flex lg:max-w-[87rem] 2xl:max-w-[90rem]    flex-col items-center justify-center">
            <div className="flex  p-5 lg:p-0 lg:ml-[5rem] xxl:ml-[7rem]  2xl:ml-[1rem] flex-col md:flex-row lg:my-[2rem] lg:flex-row md:gap-10 justify-end items-center md:items-start">
              <h1 className="text-black text-[24px] lg:text-[2.5rem] font-[600] w-full">
              Explore Luxurious Living Spaces 
              </h1>
              <p className="text-gray lg:-ml-[10rem] 2xl:mr-[4rem] text-base lg:text-xl font-bricolage w-full lg:w-[50rem] 2xl:ml-0 2xl:w-[50rem]">
                Discover a home where every detail enhances your lifestyle crafted to fit your taste and needs.
              </p>
              </div>
             
              <div  
              style={{
                backgroundImage: "url('/carousel.jpg')",
                backgroundSize: "cover", // Makes the image fill the entire container
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center", // Ensures the image is centered
            }}
            className="lg:mt-[1rem] rounded-none  hidden lg:block relative p-8 2xl:w-[88rem] 2xl:h-[47rem]   lg:w-[73rem] h-[40rem] lg:rounded-2xl"
          >
            <div className="absolute rounded-none inset-0 bg-black opacity-15 transition-opacity duration-500  lg:rounded-2xl" />
            <div className=" lg:-ml-[0.7rem] 2xl:ml-[2rem]  z-111 absolute    bg-primarytransparent p-5 2xl:p-10 rounded-2xl 2xl:mt-[20rem] lg:mt-[16rem] h-fit   w-fit">
              <div className=" bg-white p-8 lg:rounded-2xl   h-[18rem]  2xl:w-[65rem] w-[56rem] ">
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
            {/* Navigation Buttons at Bottom Right */}
            <div className="absolute bottom-5 right-5 flex gap-3 ">
              {/* Previous Button */}
              <div className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-3 w-12 h-12 shadow-md cursor-pointer hover:bg-gray-200">
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
              <div className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-3 w-12 h-12 shadow-md cursor-pointer hover:bg-gray-200">
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
          <div
  style={{
    backgroundImage: "url('/carousel.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}
  className="lg:mt-[1rem] lg:hidden relative p-4 sm:p-6 lg:p-8 w-full max-w-full lg:w-[73rem] h-[26rem] 2xl:w-[88rem] 2xl:h-[47rem] "
>
  <div className="absolute inset-0 bg-black opacity-15 transition-opacity duration-500 " />
  
  <div className="lg:-ml-[0.7rem] 2xl:ml-[2rem] z-111 absolute bg-primarytransparent p-2 sm:p-2 2xl:p-10 2xl:mt-[20rem] rounded-2xl top-[46%] right-0 h-fit w-full">
    <div className="bg-white px-3 pt-3 sm:p-6 lg:p-8 rounded-2xl h-fit w-full max-w-full lg:w-[56rem] 2xl:w-[65rem]">
      <h1 className="text-black text-[0.9rem] sm:text-base lg:text-2xl 2xl:text-[2rem] font-[600]">
        Laurel Canyon Nest
      </h1>
      <p className="text-gray text-[8px] sm:text-sm lg:text-[1rem] 2xl:text-[1.05rem]  2xl:w-[55rem] mt-2 2xl:mt-5">
        A charming 3-bedroom home featuring a bright, open-concept living area designed for both comfort and connection. The spacious layout flows seamlessly from the kitchen to the dining and living spaces, making it perfect for gatherings. Step outside to a private backyard, ideal for relaxing, entertaining, or enjoying a bit of gardening. This home offers the perfect blend of functionality and tranquility for everyday living.
      </p>

      <div className="flex flex-wrap mt-[2px] sm:flex-nowrap w-full sm:w-[60%] 2xl:w-[75%] font-bricolage items-center  gap-3 sm:gap-0">
        {/* Property Details */}
        <div className="flex flex-col-reverse flex-1 px-2 py-3">
          <span className="text-[8px] sm:text-base 2xl:text-[1.2rem] font-semibold text-black mt-[3px]">
            1,200sqft
          </span>
          <div className="text-[0.5rem] sm:text-sm 2xl:text-[1rem] text-gray">
            Size
          </div>
        </div>

        <div className="h-3 sm:h-10 w-[1px] bg-black my-1 mx-1 sm:-mx-[15%]"></div>

        <div className="flex flex-col-reverse flex-1 px-2 py-3">
          <span className="text-[8px] sm:text-base 2xl:text-[1.2rem] font-semibold text-black mt-[3px]">
            Berbera, Somalia
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
              loading="lazy"
              objectFit="cover"
              src="/star.png"
              className="h-2 w-2"
            />
            <p className="text-[8px] sm:text-sm">5.0</p>
            <p className="text-gray font-[500] text-[0.5rem] sm:text-xs hidden lg:block">
              (200 reviews)
            </p>
          </span>
          <div className="text-[0.5rem] sm:text-sm 2xl:text-[1rem] text-gray">
            Reviews
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Navigation Buttons at Bottom Right */}
  <div className="absolute bottom-5 right-5 flex gap-3">
    {/* Previous Button */}
    <div className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-2 sm:p-3 w-6 h-6 sm:w-12 sm:h-12 shadow-md cursor-pointer hover:bg-gray-200">
      <Image
        alt="left arrow"
        width={20}
        height={20}
        loading="lazy"
        src="/left.png"
        className="w-[5px]"
      />
    </div>

    {/* Next Button */}
    <div className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-2 sm:p-3 w-6 h-6 sm:w-12 sm:h-12 shadow-md cursor-pointer hover:bg-gray-200">
      <Image
        alt="right arrow"
        width={20}
        height={20}
        loading="lazy"
        src="/right.png"
        className="w-[5px]"
      />
    </div>
  </div>
</div>

        </div>
      </section>


{/* <CarouselWithSlideEffect/> */}
      {/* carousel */}

      {/* testimonials */}
      <section className=" p-2 pt-[2.5rem] lg:pt-0  2xl:p-6 lg:p-0 font-bricolage  flex justify-center flex-col  items-center">
        <div className="flex  flex-col lg:flex-row md:flex-row 2xl:mt-4  lg:gap-12  justify-around items-start w-full   ">
          <span className="flex   lg:ml-[1rem] xxl:ml-[3rem] lg:pl-[1rem] 2xl:w-full  flex-col 2xl:-ml-[2rem]  font-bricolage gap-3">
            <h1 className="text-black   text-[26px] lg:text-[2.5rem] 2xl:text-5xl font-[600]  mr-5">
              What People Are Saying
            </h1>
            <p className="text-gray  lg:block hidden text-sm lg:text-xl font-bricolage w-full lg:w-[30em]">
              Discover a home where every detail enhances your lifestyle—crafted
              to fit your taste and needs.
            </p>
            <p className="text-gray lg:hidden block text-sm lg:text-xl font-bricolage w-full lg:w-[30em]">
            Discover what our clients have to say in our customer testimonials section. We take pride in the positive feedback and experiences shared by those we’ve had.
            </p>
          </span>
          <span className=" hidden lg:flex flex-col font-bricolage gap-3 ">
            <p className="text-gray  lg:p-0 text-base 2xl:text-[20px] lg:text-xl font-bricolage w-full lg:w-[24em]">
              Discover a home where every detail enhances your lifestyle—crafted
              to fit your taste and needs.
            </p>
            <Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px] ">
              <p className="text-gray" >
                {" "}
                Explore{" "}
              </p>
            </Button>
          </span>
        </div>
        <div className="mt-5 lg:mt-0 w-full justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-[90%] auto-rows-auto">
  <span className="mt-[10rem]    hidden lg:flex gap-y-5 flex-col ">
  <TestimonialCard />
  <TestimonialCard />
  <TestimonialCard />
    </span>
    <span className="flex gap-y-5 flex-col" >
    <TestimonialCard />
  <TestimonialCard />
  <TestimonialCard />
    </span>
    <span className="mt-[10rem] hidden lg:flex gap-y-5 flex-col ">
  <TestimonialCard />
  <TestimonialCard />
  <TestimonialCard />
    </span>
 
</div>


      </section>

      {/* testimonials */}
      <section className=" mt-[20px]  w-full  lg:mt-[7%]   flex flex-1 justify-center items-center  flex-col   p-2 lg:p-0 font-bricolage ">
        <div className="lg:flex  hidden flex-col lg:flex-row md:flex-row   2xl:gap-[14rem] lg:gap-[6rem]  justify-around  items-start lg:items-center  ">
          <span className="flex flex-col  font-bricolage lg:ml-[1rem] 2xl:ml-[1rem]  gap-2">
            <h1 className="text-black  lg:text-[2.5rem] 2xl:text-5xl font-[600] mr-3 ">
              Your Questions, Our Answers
            </h1>
            <p className="text-gray   lg:p-0 text-base  lg:text-xl font-bricolage w-full lg:w-[30em]">
              Whether you’re curious about our services, need help with specific
              issues..
            </p>
          </span>
          <span className=" hidden lg:flex flex-col font-bricolage gap-3 text-gray">
            <p className="text-gray    lg:p-0 text-base lg:text-xl font-bricolage w-full lg:w-[25em]">
              Welcome to our FAQ center, where you can find answers to all your
              most pressuring questions
            </p>
            <Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px] ">
              <p className="text-gray" >
                {" "}
                Explore{" "}
              </p>
            </Button>
          </span>
        </div>
        <div className="-mt-[3rem]  lg:ml-[8rem] 2xl:ml-[4rem]  justify-center items-center max-md:w-full w-full gap-6 flex flex-col-reverse max-md:justify-center max-md:items-center lg:flex-row ">
   
          <div className="z-[4] lg:block relative max-md:w-full  lg:h-[50em]  lg:left-[30px] 2xl:left-[10px] lg:top-[11em]">
          <div className="lg:hidden flex  flex-col lg:flex-row md:flex-row   2xl:gap-[14rem] lg:gap-[6rem]  justify-around items-start lg:items-center  ">
          <span className="flex flex-col  font-bricolage lg:ml-[1rem] 2xl:ml-[1rem]  gap-2">
            <h1 className="text-black  text-[1.5rem] 2xl:text-5xl font-[600] mr-3 ">
              Your Questions, Our Answers
            </h1>
           
          </span>
          <span className=" flex flex-col  my-4 mb-8 font-bricolage gap-3 text-gray">
            <p className="text-gray     font-[300] lg:p-0 text-[1.1rem] lg:text-xl font-bricolage w-full lg:w-[25em]">
              Welcome to our FAQ center, where you can find answers to all your
              most pressuring questions
            </p>
        
          </span>
        </div>
            <FAQComponent />
          </div>
          <div className="relative mt-[4rem] lg:0 ml-10 lg:-ml-[7em] justify-center items-center  flex w-3/5 lg:w-auto">
            <Image
              alt="image1"
              width={420}
              loading="lazy"
              height={500}
              src={"/q1.png"}
              className="z-[3]  w-[16rem] h-[21rem] lg:w-[27rem] 2xl:w-[600px] rounded-[20px] relative  left-[0.5rem] 2xl:left-[2rem] lg:h-[34rem]  object-cover "
            />{" "}
            <Image
              alt="image1"
              width={400}
              loading="lazy"
              height={300}
              src={"/q2.png"}
              className=" z-2  top-[0.5rem]  w-[12rem] h-[18rem]  bottom-[2em] lg:h-[30rem]   lg:w-[35rem]   2xl:mt-[17%] lg:-top-[3rem] 2xl:-top-[3rem] lg:-left-[11em] -left-[2.8em]  2xl:-left-[9rem] lg:mt-[11%]  relative rounded-[20px]   object-cover "
            />
          </div>
        </div>
      </section>


      {/* New-articles */}
      <ArticlesSection />
    </>
  );
}
