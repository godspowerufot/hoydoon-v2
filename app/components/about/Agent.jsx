"use client";
/* eslint-disable */
import { useState, useEffect } from "react";
import Link from "next/link";
import { ProfileCard } from "../layouts/profilecard";
import Image from "next/image";
import Button from "../common/Button";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";

const Agent = () => {
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
    <div>
      {/* image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/agentheader.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-5 lg:mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          A Top Agent Matters!
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon’s agents are not only highly experienced—they’re also deeply
          familiar with local market trends, pricing strategies, and negotiation
          tactics. Whether you're buying your first home, selling a property, or
          exploring rental opportunities, they’re committed to guiding you
          through every step with clarity and confidence. From the first
          consultation to closing the deal, our agents combine industry
          expertise with personalized support to help you achieve success in
          today’s competitive real estate market.
        </p>
      </div>
      <div className="grid mt-5 lg:mt-[4.5rem]  gap-y-3  w-full  grid-col-1 lg:grid-cols-2    gap-2 lg:gap-10 ">
        {displayListings
          .slice(
            0,
            Math.min(displayListings.length < 4 ? 2 : 6, displayListings.length)
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
              <p className="text-[#09858D] mt-2 lg:mt-[2em]  w-full text-sm lg:text-2xl font-medium">
                See all {displayListings.length} rent estate agents in Lagos
              </p>
            </Link>
          </div>
        )}
      </div>
      {/* "See All" link aligned to the start */}
      <div className="w-full  lg:col-span-2  lg:flex justify-start">
        <Link href="/agent/all-agent">
          <p className="text-[#09858D] mt-5  lg:mt-[2.5em]  w-full text-sm lg:text-2xl font-medium">
            See all real estate agents on Hoydoon
          </p>
        </Link>
      </div>
      <div className="flex  lg:gap-[4%] flex-col-reverse lg:max-w-[1200px] lg:mt-[5em] lg:flex-row  items-center   lg:justify-around ">
        <span className="flex flex-col gap-y-1 lg:gap-y-0 w-full lg:w-[45em] 2xl:w-[60em] ">
          <h1 className="text-black  text-2xl mt-4  lg:mt-0  lg:text-[2.6rem]  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
            Connect with local agent
          </h1>
          <p className="text-gray text-xs lg:text-xl mt-2 2xl:mt-[1em] font-bricolage lg:w-[38rem] 2xl:text-[22px] ">
            Benefit from local expertise. We'll connect you with a Hoydoon
            Premier Agent who understands your market and can guide you through
            the process.
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
    </div>
  );
};
export default Agent;
