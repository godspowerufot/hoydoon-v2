"use client";
/* eslint-disable */

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import { ProfileCard } from "@/app/components/layouts/profilecard";
import Link from "next/link";
import FagsSection from "../components/layouts/FaqSection";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/app/components/common/Spinner";
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

  if (isAllLoading) {
    return <Spinner />;
  }
  return (
    <>
      <header className="relative h-[25rem] lg:h-[85vh] w-screen">
        {/* Background Image Div */}
        <div
          className="absolute top-0 left-0 w-screen h-full bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/webp/agentheader.webp')" }}
        >
          {/* Overlay Div */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.3] z-[-1]"></div>
        </div>

        {/* Content Section */}
        <div className="flex z-[1] p-4 lg:p-0 relative  gap-1 lg:gap-6 justify-center items-center flex-col">
          {/* Main Heading */}
          <h1 className="w-[10em]  capitalize  mt-[1em] 2xl:mt-[9rem] lg:mt-[1.4em] text-white text-[2em] lg:w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
            A top agent matters!{" "}
          </h1>

          {/* Subheading */}
          <h2 className="lg:text-[1.5em] 2xl:text-[1.6em]  font-[400] text-center text-[#FFFFFFB2] lg:w-[33em]">
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
      <section className="   bg-white  w-screen lg:bg-[#eeeeeec7]  lg:py-[5em] font-bricolage lg:flex justify-center flex-col lg:gap-7 flex-1 items-center">
        <div className="w-full">
          <div className="flex flex-col  lg:flex-col justify-between  gap-10  w-full lg:max-w-[1200px]  mx-auto">
            <div className="flex flex-col p-3 lg:p-0 lg:flex-row lg:gap-8 justify-between  items-start lg:items-center w-full  mx-auto">
              <h1 className="text-black  font-semibold text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[60 lg:w-auto">
                Real Estate Agents In Hoydoon
              </h1>
              <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
                Leverage a local agent's expertise with access to millions of
                listings, guiding you through every step.
              </p>
            </div>

            <div className="grid  mt-2. lg:mt-4  gap-y-3  w-full  grid-col-1 lg:grid-cols-2    gap-2  p-4 lg:p-0 lg:gap-10 ">
              {displayListings
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
                    <p className="text-[#09858D] mt-2  w-full text-sm lg:text-2xl font-medium">
                      See all {displayListings.length} rent estate agents in
                      Lagos
                    </p>
                  </Link>
                </div>
              )}
            </div>
            {/* "See All" link aligned to the start */}
            <div className="w-full  lg:col-span-2 p-4 lg:p-0  lg:flex justify-start">
              <Link href="/agent/all-agent">
                <p className="text-[#09858D] -mt-[4em] lg:mt-5   w-full text-sm lg:text-2xl font-medium">
                  See all agents on Hoydoon
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="  bg-white  lg:-mt-[3.5em] lg:bg-[#eeeeeec7]  w-full   lg:w-screen font-bricolage lg:flex  flex-col justify-center flex-1 items-center ">
        <div className="flex  lg:gap-[4%] flex-col-reverse lg:max-w-[1200px] lg:my-[1em] lg:flex-row  items-center   lg:justify-around ">
          <span className="flex flex-col gap-y-1 lg:gap-y-0 w-full lg:w-[45em] 2xl:w-[60em] ">
            <h1 className="text-black  text-2xl mt-4  lg:mt-0  lg:text-[2.6rem]  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
              Connect with local agent
            </h1>
            <p className="text-gray text-xs lg:text-xl mt-2 2xl:mt-[1em] font-bricolage lg:w-[38rem] 2xl:text-[22px] ">
              Benefit from local expertise. We'll connect you with a Hoydoon
              Premier Agent who understands your market and can guide you
              through the process.
            </p>
            <Button className="text-base !w-[115px] font-light mt-4 ">
              <Link href="/agent/all-agent">Connect</Link>
            </Button>
          </span>

          <span className=" mt-[2rem]  lg:mt-0">
            <Image
              alt="image1"
              width={500}
              quality={100}
              className=" 2xl:w-[50rem] lg:w-[50rem]  object-contain  w-fit lg:h-[28rem] 2xl:h-[36rem]"
              height={400} // Reduced size of logo
              src={"/agent3.png"}
            />
          </span>
        </div>
      </section>

      <section className="  w-screen   lg:bg-[#eeeeeec7] lg:pt-10 lg:mb-0 mb-[2em] 2xl:-mt-[5.25em] lg:-pt-[2.5em] font-bricolage lg:flex  flex-col j flex-1 items-center ">
        <div className="flex flex-col   p-5 lg:p-0 w-full lg:max-w-[1200px]  gap-5  lg:gap-[4.5rem]    lg:pl-5 lg:my-[2em] lg:flex-row  items-center lg:justify-between ">
          <span className="mt-[3.5rem] lg:mt-0">
            <Image
              alt="image1"
              width={500}
              quality={100}
              height={400}
              className=" 2xl:w-[59rem] lg:w-[50rem] object-contain w-fit   lg:h-[28rem] 2xl:h-[36rem]"
              src={"/agent4.png"}
            />
          </span>
          <span className="flex flex-col w-full  lg:gap-y-5     lg:w-[55em]  ">
            <h1 className="text-black  lg:my-0  text-xl lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
              Rapid Finds. Ready to View
            </h1>
            <p className="text-gray  lg:text-xl text-xs  2xl:mt-[1em] font-bricolage lg:w-[90%] 2xl:text-[20px] 2xl:w-full">
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

      <div className="lg:-mb-[5rem] lg:mt-[2rem] ">
        <FagsSection />
      </div>

      {/* New-articles */}
    </>
  );
}
