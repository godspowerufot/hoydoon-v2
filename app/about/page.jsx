"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProfileCard } from "../components/layouts/profilecard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../components/common/Button";
import { toast } from "react-toastify";
import HoverCard from "../components/common/card";
import MapComponent from "../components/layouts/listingmap";
import Input from "../components/common/inputs/input";
import {
  useGetAgentsQuery,
  useGetAllListingsQuery,
} from "@/store/slices/api/authapi";
const Content = () => {
  return (
    <div>
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/about-us.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className=" mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Welcome to Hoydoon!{" "}
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon is a modern, all-in-one property platform designed to serve
          everyone in the real estate space—from first-time buyers and renters
          to experienced investors, agents, and homeowners. We believe that
          property should be approachable for all, no matter your level of
          experience or goal.{" "}
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          By blending intuitive, user-friendly technology with real-time local
          insights, we simplify every step of the property journey. Whether
          you're searching for your next home, managing listings, exploring
          investment opportunities, or just starting out, Hoydoon makes the
          process seamless, efficient, and accessible.{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Our platform is built to adapt to your needs—putting smart tools,
          helpful resources, and expert support right at your fingertips, so you
          can move forward with confidence, clarity, and control.{" "}
        </p>
      </div>
      <div className=" mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold "> Who We Are </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          At Hoydoon, we believe that navigating the property market—whether
          you're searching for a new home, a reliable tenant, or the ideal
          buyer—should be a straightforward, secure, and even enjoyable
          experience. That belief drives everything we do.
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Our mission is to empower individuals and families by providing the
          tools, guidance, and platform they need to succeed at every stage of
          their real estate journey. Whether you're buying your first home,
          renting a place that fits your lifestyle, or listing a property for
          sale, Hoydoon is here to make the process easier, more transparent,
          and truly connected.{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          With a focus on innovation, trust, and user-first design, we’re
          building more than just a property platform—we’re creating a space
          where people can make confident decisions and move forward with
          clarity and peace of mind.
        </p>
      </div>
      <div className=" mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Our Leadership 
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          At our core, we are a collective of bold, forward-thinking
          individuals—innovators driven by curiosity and a passion for
          redefining what’s possible. We don’t just embrace change—we lead it.
          Unafraid to challenge the status quo, we seek out uncharted paths and
          turn unconventional ideas into impactful realities. Our culture
          thrives on this spirit of exploration, where questioning norms isn’t
          just welcomed—it’s expected{" "}
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Our leadership plays a vital role in fueling this mindset. By
          championing creative risk-taking and rewarding originality, they
          foster an environment where initiative is recognized and celebrated.
          Whether it’s a new solution to a longstanding challenge or a
          disruptive concept that rewrites the rules, we value the courage it
          takes to step forward and think differently{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          But innovation doesn’t flourish in isolation—it grows in a culture of
          belonging. That’s why we’re deeply committed to creating an inclusive,
          supportive workplace where every voice matters. Here, team members are
          not only encouraged to contribute but are empowered to lead, learn,
          and reach their full potential. We believe that when people feel
          respected, inspired, and connected, they don’t just do their best
          work—they thrive, both in their careers and in their personal growth{" "}
        </p>
      </div>
      {/* section2 */}
      <div className="relative my-[3rem] w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/value-us.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className=" mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">Our Values </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          At Hoydoon, our foundation is built on trust, innovation, and a deep
          sense of community. We believe that navigating the property market
          should feel transparent and secure, which is why we prioritize honest
          listings, reliable information, and safe, respectful interactions
          across our platform. Users can explore, connect, and transact with
          confidence, knowing that integrity is at the heart of everything we
          do.
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          At the same time, we are constantly evolving—driven by innovation—to
          improve the way people find, rent, buy, and manage property. Through
          intuitive design, smart tools, and continuous feature updates, we
          strive to make the experience simpler, faster, and more empowering for
          everyone{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          But beyond the technology, Hoydoon is about people. We’re not just a
          property marketplace—we’re a growing community where individuals,
          families, and professionals come together to support one another,
          share insights, and help each other find their place in the world.{" "}
        </p>
      </div>

      <div className=" mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold "> Join Us! </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          whether you're ready to buy, sell, rent, or simply explore your
          options, Hoydoon is here to guide you with the tools, support, and
          confidence you need to take your next step. Our platform is designed
          to be intuitive and accessible, making it easy to connect with
          listings, people, and opportunities that truly match your goals. By
          combining smart technology with a people-first approach, we help
          simplify what can often feel like a complicated process—so you can
          focus on what matters most: finding a place that feels right for you
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Download the Hoydoon app, set up your account, and become part of a
          growing, trusted community where real estate is built on honesty,
          ease, and human connection.{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Your next move starts here—with Hoydoon{" "}
        </p>
      </div>
    </div>
  );
};

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
      <div className=" mt-[4.5rem]">
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
      <div className="grid mt-[4.5rem]  gap-y-3  w-full  grid-col-1 lg:grid-cols-2    gap-2 lg:gap-10 ">
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

const Sell = () => {
  const [formData, setFormData] = useState({
    location: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      ...(formData.location && { location: formData.location }),
    }).toString();

    router.push(`/agent/all-agent?${queryParams}`);
  };
  return (
    <div>
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/seller.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Get Personalized Proposals — No Cost!
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Need help buying, selling, or renting a property? Get free,
          personalized quotes from experienced local agents who understand your
          market and are ready to guide you every step of the way. Simply share
          a few details about your needs, and you’ll be matched with trusted
          professionals offering competitive rates and expert advice. It’s fast,
          easy, and completely obligation-free—so you can compare options and
          choose the right agent with confidence.{" "}
        </p>
      </div>
      <section className="mt-10   lg:my-[4em] w-full  font-bricolage flex justify-center  flex-col lg:flex-row gap-7 2xl:gap-[3rem] lg:max-w-[1200px] flex-1 items-center">
        <div className="lg:w-[24rem]  lg:h-[32rem]    rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
          {/* Image Section */}
          <div className="relative h-52 w-full">
            <Image
              src="/sell1.png" // Replace with actual image path
              alt="Agents talking"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Text Content */}
          <div className="p-6  2xl:px-7">
            <h4 className="text-gray-800 font-[500] text-base">
              Hoydoon’s Selling
            </h4>
            <h2 className="text-xl font-bold text-black mt-2">
              Choose the perfect agent for your needs.
            </h2>
            <p className="text-[#8F8F8F] font-bricolage text-sm lg:text-[14px] mt-5">
              Complete a quick questionnaire to discover the best agents in your
              area. Review their pricing, services, and ratings to find the one
              that fits your needs perfectly.
            </p>

            <Link href={"/agent/all-agent"}>
              <Button className="!w-full 2xl:mt-[4.5rem] mt-6 text-base 2xl:text-xl lg:h-[3rem]  h-[3rem] lg:!p-2">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:w-[24rem]  lg:h-[32rem]   rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
          {/* Image Section */}
          <div className="relative h-52 w-full">
            <Image
              src="/sell2.png" // Replace with actual image path
              alt="Agents talking"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Text Content */}
          <div className="p-6">
            <h4 className="text-gray-800 font-[500] text-base">
              Hoydoon’s Marketplace
            </h4>
            <h2 className="text-xl font-bold text-black mt-2">
              Cut costs and save big.{" "}
            </h2>
            <p className="text-[#8F8F8F] text-sm lg:text-[14px] mt-5">
              When you choose to buy and sell with us, youll benefit from a
              significantly reduced fee—only half of what most traditional
              brokerages typically charge—helping you save more while receiving
              exceptional service.{" "}
            </p>
            <Link className=" hidden lg:block " href={"/agent/all-agent"}>
              <button className="w-full   rounded-full items-center justify-center flex bg-transparent border-[#1E1E1E]  border-solid border-[1px] text-black  mt-3 text-base 2xl:text-xl h-[3rem]  2xl:h-[4rem] p-3">
                Visit Seller marketplace
              </button>
            </Link>
            <Link className="lg:hidden block " href={"/agent/all-agent"}>
              <Button className="w-full 2xl:mt-[4.5rem] mt-8 text-base 2xl:text-xl  text-gray lg:h-[4rem]  h-[3rem] lg:p-3">
                Visit Seller marketplace
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:w-[24rem] w-full lg:h-[32rem]   rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
          {/* Image Section */}
          <div className="relative h-52 w-full">
            <Image
              src="/sell3.png" // Replace with actual image path
              alt="Agents talking"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Text Content */}
          <div className="p-6">
            <h4 className="text-gray-800 font-[500] text-base">
              Hoydoon’s Value
            </h4>
            <h2 className="text-xl font-bold text-black mt-2">
              Track your home value with Hoydoon.
            </h2>
            <p className="text-[#8F8F8F] text-base lg:text-[14px] 2xl:text-base mt-5">
              Track your Hoydoon valuation over time and see how it compares to
              other homes in your area.{" "}
            </p>

            <div className="  rounded-full relative  w-full lg:w-[21rem] mt-[1.5rem] 2xl:w-[25rem]">
              <Input
                label=""
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="2xl:h-[4rem]  p-5 !rounded-[24px] mt-[4.5rem]"
                placeholder="Enter your home address"
              />

              <div
                onClick={handleSearch}
                className="absolute right-2 top-[12%]  2xl:top-[12%] bg-primary ml-[6em] p-3  h-[35px] w-[35px] 2xl:w-[50px] 2xl:h-[50px] rounded-full flex items-center justify-center"
              >
                <Image
                  alt="logo"
                  width={30}
                  loading="lazy"
                  height={30}
                  quality={100} // Ensures maximum quality
                  src={"/arrow-left.png"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex  lg:max-w-[1200px] 2xl:gap-[1%]  gap-[1.5rem]  lg:gap-[4rem]  flex-col-reverse   2xl:w-[95rem] 2xl:pl-[2.5em] lg:pl-5 lg:mt-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
        <span className="flex flex-col  gap-5 w-full lg:w-[45em]  ">
          <h1 className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
            Ready to sell your home?.
          </h1>
          <p className="text-gray text-sm lg:text-xl mt-3 2xl:mt-[2em] font-bricolage lg:w-[40rem]">
            Ready to sell your home? Let us help you maximize its value and make
            the process stress-free. Schedule a consultation today and take the
            first step toward a successful sale
          </p>

          <Button className="text-base py-2 w-[205px] font-light mt-5 ">
            <Link href="/sell/sell-home"> Get Started</Link>
          </Button>
        </span>

        <span className=" mt-[4.5rem]  lg:mt-0">
          <Image
            alt="image1"
            width={500}
            quality={100}
            className=" 2xl:w-[50rem] lg:w-[50rem]  object-contain  w-fit lg:h-[28rem] 2xl:h-[36rem]"
            height={400} // Reduced size of logo
            src={"/sell-1.png"}
          />
        </span>
      </div>
    </div>
  );
};
const Buy = () => {
  const { data: allListings, isLoading: isAllLoading } = useGetAllListingsQuery(
    {}
  );
  const [searchLocation, setSearchLocation] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const { data: listing } = useGetAllListingsQuery(
    { location: searchLocation }, // e.g. "Lekki" or Zip
    { skip: !searchLocation, pollingInterval: 60000 }
  );
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    setSearchLocation(inputValue.trim());
  };
  const flattenListings = (listings) => {
    return listings.flatMap((item) =>
      Array.isArray(item.listings) ? flattenListings(item.listings) : item
    );
  };
  useEffect(() => {
    if (listing?.listings) {
      const flatListings = flattenListings(listing.listings);

      // Extract coordinates
      // Extract coordinates for active listings
      const coords = flatListings
        ?.map((item) => item.item?.coordinate) // Get coordinate object from item
        .filter((coord) => coord?.latitude && coord?.longitude); // Ensure valid coordinates

      setCoordinates(coords); // Store coordinates for Google Maps
    }
  }, [listing]);

  return (
    <div>
      {" "}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/rent.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Find Your Perfect Dream Home Today!
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Discover the perfect place to call home—whether you're searching for a
          cozy apartment, a spacious family house, or a modern condo in the
          heart of the city. Explore beautiful locations, thoughtfully designed
          interiors, and a wide range of properties featuring the modern
          amenities you need for comfort and convenience. From vibrant
          neighborhoods to peaceful retreats, find a space that fits your
          lifestyle and your future. Your dream home is just a click away—start
          your search and make your move today!
        </p>
      </div>
      <div className="mt-[4.5rem]">
        <div className="flex flex-col items-start gap-6 justify-center max-w-[1200px] w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full  mx-auto">
            <h1 className="text-black text-[24px] mt-[32px] lg:mt-0  lg:text-[2.5rem] font-[600] w-full lg:w-auto">
              Hoydoon Houses for Sale
            </h1>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage w-full lg:w-auto text-start lg:text-right">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col flex-wrap mt-[0.5em] lg:mt-[1em] gap-5 items-start lg:flex-row justify-start mb-2">
            {(allListings?.listings || []).slice(0, 9).map((items, index) => (
              <HoverCard
                _id={items?._id}
                key={index}
                imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                altText={
                  items?.imageUrls?.[0]?.altText ||
                  "Property image showcasing a beautiful home"
                }
                price={items?.item?.price || "Price not available"}
                area={items?.item?.squareFeet || ""}
                bathrooms={items?.item?.bathrooms}
                bedrooms={items?.item?.bedrooms}
                description={
                  items?.item?.description ||
                  "No description available for this property."
                }
                title={items?.item?.title || "Untitled Property"}
                rent={items?.item?.rent || "Rent details not provided"}
              />
            ))}
            <Link
              href="/"
              className="text-[#09858D] lg:hidden mt-2 text-sm lg:my-5 lg:text-2xl font-[500] "
            >
              see all luxury houses for sale
            </Link>
          </div>
        </div>
      </div>
      <div className="w-screen  mt-[4.5rem] lg:mb-[2rem] h-[2px] bg-[#D9D9D9] " />
      {/* testimonials */}
      <div className="flex  gap-[4%]  flex-col-reverse  w-full  lg:flex-row  items-center   lg:justify-around ">
        <span className="flex  p-4 flex-col w-full lg:w-[45em] 2xl:w-[60em] ">
          <h1 className="text-black  mt-4 lg:mt-0 text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
            Get the Local Information
          </h1>
          <p className="text-gray text-sm lg:text-xl mt-3 2xl:mt-[1em] font-bricolage  w-full lg:w-9/10 2xl:text-[20px] 2xl:w-[70%]">
            Curious about local schools? Wondering if there are pet-friendly
            rentals? Find all the key information you need about the area that
            catches your interest.
          </p>

          <div className="  relative w-full  lg:w-[87%] mt-[1.5rem] 2xl:w-[75%]">
            <Input
              label=""
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="2xl:h-[4rem] rounded-[24px]"
              placeholder="Address, Neighborhood, Zip code..."
            />

            <div
              onClick={handleSearch}
              className="absolute right-2 top-[8%] 2xl:top-[13%] bg-primary ml-[6em] p-3  h-[40px] w-[40px] 2xl:w-[50px] 2xl:h-[50px] rounded-full flex items-center justify-center"
            >
              <Image
                alt="logo"
                width={30}
                loading="lazy"
                height={30}
                quality={100} // Ensures maximum quality
                src={"/search.png"}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </span>

        <span className="mt-8  w-screen lg:w-[40rem] h-[25rem] 2xl:w-[50rem] 2xl:h-[35rem] rounded-2xl lg:mt-0">
          <MapComponent coordinates={coordinates} />
        </span>
      </div>
    </div>
  );
};
const TalkToAgent = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");
    try {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("phone", phoneNumber);
      formData.append("requestType", "agent");
      formData.append(
        "message",
        description || "I want to find an agent. Address: " + address
      );

      const res = await fetch("/api/find-agent", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setFullName("");
        setEmail("");
        setAddress("");
        setPhoneNumber("");
        toast.success("Message successfully Sent");
      } else {
        const data = await res.json();
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      toast.error(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/talk.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          Choose the Perfect Agent for your Needs
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon makes finding the right real estate agent simple and
          stress-free. Whether you're buying, selling, or renting, we connect
          you with trusted professionals tailored to your needs. Browse detailed
          profiles, compare expertise, and read reviews to make an informed
          choice. Start your real estate journey with the perfect agent today!
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Complete a quick questionnaire to discover the best agents in your
          area. Review their pricing, services, and ratings to find the one that
          fits your needs perfectly
        </p>
      </div>
      <div className="mt-[4.5rem]">
        <div className="flex justify-center flex-col w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:p-4">
            <Input
              label=""
              type="text"
              placeholder="Enter your full name"
              className="border  h-[3.5rem] placeholder:font-[400] border-gray-300 !rounded-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              label=""
              type="text"
              placeholder="Please enter Email Address"
              className="border h-[3.5rem]  placeholder:font-[400]  border-gray-300 !rounded-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label=""
              type="text"
              placeholder="Please enter your address"
              className="border  h-[3.5rem] placeholder:font-[400] border-gray-300 !rounded-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              label=""
              type="tel"
              placeholder="Please enter your phone number"
              className="border h-[3.5rem] placeholder:font-[400]  border-gray-300 !rounded-none"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex items-center lg:justify-center justify-start">
          <Button
            onClick={handleSubmit}
            className="text-base rounded-none w-full font-light mt-5 lg:w-[300px] "
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
        <p className="text-gray  font-light text-base  font-bricolage  w-full leading-5 mt-4">
          By submitting this form, you agree that Hoydoon, its affiliates, or
          associated third parties may contact you, including through calls or
          texts using automated systems. You also agree to our Terms of Service
          and Privacy Policy. Message and data rates may apply. Providing
          consent is not a condition for accessing real estate services.{" "}
        </p>
      </div>
      <div className="flex  lg:max-w-[1200px] 2xl:gap-[1%]  gap-[1.5rem]  lg:gap-[4rem]  flex-col-reverse   2xl:w-[95rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
        <span className="flex flex-col  gap-5 w-full lg:w-[45em]  ">
          <h1 className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
            Ready to sell your home?.
          </h1>
          <p className="text-gray text-sm lg:text-xl mt-3 2xl:mt-[2em] font-bricolage lg:w-[40rem]">
            Ready to sell your home? Let us help you maximize its value and make
            the process stress-free. Schedule a consultation today and take the
            first step toward a successful sale
          </p>

          <Button className="text-base py-2 w-[205px] font-light mt-5 ">
            <Link href="/sell/sell-home"> Get Started</Link>
          </Button>
        </span>

        <span className=" mt-[4.5rem]  lg:mt-0">
          <Image
            alt="image1"
            width={500}
            quality={100}
            className=" 2xl:w-[50rem] lg:w-[50rem]  object-contain  w-fit lg:h-[28rem] 2xl:h-[36rem]"
            height={400} // Reduced size of logo
            src={"/sell-1.png"}
          />
        </span>
      </div>{" "}
      <div className="flex  lg:max-w-[1200px] 2xl:gap-[1%]  gap-[1.5rem]  lg:gap-[4rem]  flex-col-reverse   2xl:w-[95rem] 2xl:pl-[2.5em] lg:pl-5 lg:mt-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
        <span className="flex flex-col  gap-5 w-full lg:w-[45em]  ">
          <h1 className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
            Ready to sell your home?.
          </h1>
          <p className="text-gray text-sm lg:text-xl mt-3 2xl:mt-[2em] font-bricolage lg:w-[40rem]">
            Ready to sell your home? Let us help you maximize its value and make
            the process stress-free. Schedule a consultation today and take the
            first step toward a successful sale
          </p>

          <Button className="text-base py-2 w-[205px] font-light mt-5 ">
            <Link href="/sell/sell-home"> Get Started</Link>
          </Button>
        </span>

        <span className=" mt-[4.5rem]  lg:mt-0">
          <Image
            alt="image1"
            width={500}
            quality={100}
            className=" 2xl:w-[50rem] lg:w-[50rem]  object-contain  w-fit lg:h-[28rem] 2xl:h-[36rem]"
            height={400} // Reduced size of logo
            src={"/sell-1.png"}
          />
        </span>
      </div>
    </div>
  );
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("about");

  const allCoordinates = {
    about: [],
    agents: [],
    buy: [],
    sell: [],
  };

  const setCoordinates = (coords) => {
    console.log("Updating coordinates:", coords);
  };

  return (
    <div className="lg:max-w-[1200px] container mx-auto lg:mt-[4rem] px-4 lg:px-0">
      {/* ✅ Wrap this part in a relative container */}
      <div className="relative border-b mt-4 border-gray">
        <div className="flex justify-between">
          {/* Left Tabs */}
          <div className="flex flex-wrap gap-6">
            {[
              { id: "about", label: "About Us" },
              { id: "agents", label: "Our Agents" },
              { id: "buy", label: "Buy with  Hoydoon" },
              { id: "sell", label: "Sell with  Hoydoon" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`relative py-5 text-sm lg:text-[18px] transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-black font-bold"
                    : "text-[#8F8F8F]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute left-0 bottom-[-1px] w-full h-[2px] bg-primary"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Floating Button on the Border Line */}
        <button
          className="absolute right-0 translate-y-1/2 bg-primary text-white px-3 py-3 lg:w-[250px] lg:h-[50px] text-sm lg:text-[18px] hover:opacity-90 transition "
          style={{ bottom: "24px" }} // align exactly with the border line
          onClick={() => {
            setActiveTab("Talk");
          }}
        >
          Talk to a Hoydoon Agent
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-5 ">
        {activeTab === "about" && (
          <div className="">
            <Content />
          </div>
        )}

        {activeTab === "agents" && (
          <div className="">
            <Agent />
          </div>
        )}
        {activeTab === "buy" && (
          <div className="">
            <Buy />
          </div>
        )}

        {activeTab === "sell" && (
          <div className="">
            <Sell />
          </div>
        )}
        {activeTab === "Talk" && (
          <div className="">
            <TalkToAgent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
