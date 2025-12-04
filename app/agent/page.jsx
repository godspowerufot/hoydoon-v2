"use client";
/* eslint-disable */

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import { ProfileCard } from "@/app/components/layouts/profilecard";
import Link from "next/link";
import FagsSection from "../components/layouts/FaqSection";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import { useEffect, useState } from "react";
import { ProfileCardSkeleton } from "../components/Loader";
import dynamic from "next/dynamic";
const LocationSearchBar = dynamic(() =>
  import("../components/layouts/maploader")
);

export default function Page() {
  const {
    data: allAgent,
    isLoading: isAllLoading,
    refetch,
  } = useGetAgentsQuery({});
  const [displayListings, setDisplayListings] = useState([]);

  useEffect(() => {
    refetch(); // Refetch data on every mount
  }, [refetch]);

  useEffect(() => {
    if (!isAllLoading && allAgent) {
      const firstThreeListings = allAgent;
      setDisplayListings(firstThreeListings); // Store in state
    }
  }, [allAgent, isAllLoading]);

  return (
    <>
      <header className="relative h-[25rem] md:h-[85vh] w-screen">
        {/* Background Image Div */}
        <div
          className="absolute top-0 left-0 w-screen h-full bg-cover bg-center z-[-1]"
          style={{
            backgroundImage:
              "url('https://hoydoonstorage.blob.core.windows.net/web-images/agentheader.webp')",
          }}
        >
          {/* Overlay Div */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.3] z-[-1]"></div>
        </div>

        {/* Content Section */}
        <div className="flex z-[1] p-4 md:p-0 relative  gap-1 md:gap-6 justify-center items-center flex-col">
          {/* Main Heading */}
          <h1 className="w-[10em]  capitalize  mt-[2em] 2xl:mt-[9rem] md:mt-[1.4em] text-white text-[2em] md:w-full leading-[1em] text-center md:text-[5em] font-bricolage font-[600]">
            A top agent matters!{" "}
          </h1>

          {/* Subheading */}
          <h2 className="md:text-[1.5em] 2xl:text-[1.6em]  font-[400] text-center text-[#FFFFFFB2] md:w-[33em]">
            Hoydoon’s agents are highly experienced, ready to guide you to
            success in today’s market.{" "}
          </h2>

          {/* Large Screen Search Bar */}
          {/* Large Screen Search Bar */}

          <LocationSearchBar />

          {/* Small Screen Search Bar */}
        </div>
      </header>

      {/* this hold the images */}

      {/* explore */}
      <section className="   bg-white  w-screen md:bg-[#eeeeeec7]  md:py-[5em] font-bricolage md:flex justify-center flex-col md:gap-7 flex-1 items-center">
        <div className="w-full">
          <div className="flex flex-col  md:flex-col justify-between  gap-10  w-full md:max-w-[1200px]  mx-auto">
            <div className="flex flex-col p-3 md:p-0 md:flex-row md:gap-8 justify-between  items-start md:items-center w-full  flex-wrap mx-auto">
              <h1 className="text-black  font-semibold text-[24px] mt-[32px] md:mt-0  md:text-[2.5rem] font-[60 md:w-auto">
                Real Estate Agents In Hoydoon
              </h1>
              <p className="text-gray font-light text-sm md:max-w-[30rem] md:text-xl font-bricolage w-full md:w-auto text-start md:text-right">
                Leverage a local agent's expertise with access to millions of
                listings, guiding you through every step.
              </p>
            </div>

            <div className="grid  mt-2. md:mt-4  gap-y-3  w-full  grid-col-1 md:grid-cols-2    gap-2  p-4 md:p-0 md:gap-10 ">
              {isAllLoading
                ? // Show skeleton loaders
                  Array.from({ length: 6 }, (_, index) => (
                    <ProfileCardSkeleton />
                  ))
                : displayListings
                    .slice(
                      0,
                      Math.min(
                        displayListings.length < 4 ? 2 : 6,
                        displayListings.length
                      )
                    )
                    .map((agent) => (
                      <ProfileCard
                        key={agent._id}
                        {...agent}
                        sales={Number(agent.numberOfListings)}
                      />
                    ))}

              {displayListings.length > 0 && displayListings.length < 6 && (
                <div className="w-full  flex justify-start">
                  <Link href="/agent/all-agent">
                    <p className="text-[#09858D] mt-2  w-full text-sm md:text-2xl font-medium">
                      See all {displayListings.length} rent estate agents in
                      Lagos
                    </p>
                  </Link>
                </div>
              )}
            </div>
            {/* "See All" link aligned to the start */}
            <div className="w-full  md:col-span-2 p-4 md:p-0  md:flex justify-start">
              <Link href="/agent/all-agent">
                <p className="text-[#09858D] -mt-[4em] md:mt-5   w-full text-sm md:text-2xl font-medium">
                  See all agents on Hoydoon
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="  bg-white  md:-mt-[3.5em] md:bg-[#eeeeeec7]  w-full   md:w-screen font-bricolage md:flex  flex-col justify-center flex-1 items-center ">
        <div className="flex  md:gap-[4%] flex-col-reverse md:max-w-[1200px] md:my-[1em] md:flex-row  items-center   md:justify-around ">
          <span className="flex flex-col gap-y-1 md:gap-y-0 w-full md:w-[45em] 2xl:w-[60em] ">
            <h1 className="text-black  text-2xl mt-4  md:mt-0  md:text-[2.6rem]  md:leading-[1.1em] font-[600] 2xl:w-[80%]">
              Connect with local agent
            </h1>
            <p className="text-gray text-xs md:text-xl mt-2 2xl:mt-[1em] font-bricolage md:w-[38rem] 2xl:text-[22px] ">
              Benefit from local expertise. We'll connect you with a Hoydoon
              Premier Agent who understands your market and can guide you
              through the process.
            </p>
            <Button className="text-base !w-[115px] font-light mt-4 ">
              <Link href="/agent/all-agent">Connect</Link>
            </Button>
          </span>

          <span className=" mt-[2rem]  md:mt-0">
            <Image
              alt="image1"
              width={500}
              quality={100}
              className=" 2xl:w-[50rem] md:w-[50rem]  object-contain  w-fit md:h-[28rem] 2xl:h-[36rem]"
              height={400} // Reduced size of logo
              src={"/agent3.png"}
            />
          </span>
        </div>
      </section>

      <section className="  w-screen   md:bg-[#eeeeeec7] md:pt-10 md:mb-0 mb-[2em] 2xl:-mt-[5.25em] md:-pt-[2.5em] font-bricolage md:flex  flex-col j flex-1 items-center ">
        <div className="flex flex-col   p-5 md:p-0 w-full md:max-w-[1200px]  gap-5  md:gap-[4.5rem]    md:pl-5 md:my-[2em] md:flex-row  items-center md:justify-between ">
          <span className="mt-[3.5rem] md:mt-0">
            <Image
              alt="image1"
              width={500}
              quality={100}
              height={400}
              className=" 2xl:w-[59rem] md:w-[50rem] object-contain w-fit   md:h-[28rem] 2xl:h-[36rem]"
              src={"/agent4.png"}
            />
          </span>
          <span className="flex flex-col w-full  md:gap-y-5     md:w-[55em]  ">
            <h1 className="text-black  md:my-0  text-xl md:text-[2.6rem] 2xl:text-5xl  md:leading-[1.1em] font-[600] 2xl:w-[80%]">
              Rapid Finds. Ready to View
            </h1>
            <p className="text-gray  md:text-xl text-xs  2xl:mt-[1em] font-bricolage md:w-[90%] 2xl:text-[20px] 2xl:w-full">
              Never miss out. We refresh listings every minute, ensuring you see
              new homes instantly. Book on-demand tours to view them fast
            </p>

            <Button className="text-base  !w-[115px] font-light mt-5 ">
              <Link href="/rent/searchlisting">explore</Link>
            </Button>
          </span>
        </div>
      </section>
      {/* afforable component */}

      <div className="md:-mb-[5rem] md:mt-[2rem] ">
        <FagsSection />
      </div>

      {/* New-articles */}
    </>
  );
}
