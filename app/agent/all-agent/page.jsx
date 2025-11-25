"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ProfileCard } from "@/app/components/layouts/profilecard";
import Link from "next/link";
import FagsSection from "@/app/components/layouts/FaqSection";
import Button from "@/app/components/common/Button";
import FAQComponent from "@/app/components/layouts/faq";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import Spinner from "@/app/components/common/Spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { getLocationRegion } from "@/utils/lib";
import Pagination from "@/app/components/common/pagination";
import { HiChevronDown } from "react-icons/hi";

const Dropdown = ({ selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Rent", "Buy", "Sell"];

  return (
    <div className="relative  2xl:w-[25rem] font-bricolage">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[2rem] text-sm justify-between items-center w-full bg-[#F9FAFB] border border-[#8F8F8F] rounded-[10px] p-2 text-[#8F8F8F]"
      >
        {selectedOption}
        <HiChevronDown className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute text-sm z-10 mt-1 w-full bg-white border border-[#8F8F8F] rounded-[10px] ">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className={`w-full  text-sm text-left px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300 ${
                selectedOption === option
                  ? "bg-primary text-white"
                  : "text-[#8F8F8F]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Breadcrumb = ({ onRegionUpdate }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Language");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("Specialty");
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Buy");
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const [region, setRegion] = useState("");
  const router = useRouter();

  const options = ["Rent", "Buy", "Sell"];
  const languages = ["English", "Somalia", "Arabic"];

  const updateQueryParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(key, value);
    newParams.set("page", "1");
    router.push(`/agent/all-agent?${newParams.toString()}`);
  };

  // Expose updateQueryParam to parent via callback
  useEffect(() => {
    if (onRegionUpdate) {
      onRegionUpdate({ updateQueryParam, setRegion });
    }
  }, [onRegionUpdate]);

  return (
    <div className=" py-2 md:pt-[3rem] px-1 md:px-[5rem] 2xl:px-[0rem]  items-start md:flex-col md:items-center justify-between">
      <div className="flex flex-col  md:flex-row justify-between items-start md:items-center w-full mt-4 p-2 gap-2 md:gap-6 mb-[2rem]">
        <h1 className="text-black text-[22px] sm:text-[24px] md:text-[2rem] font-semibold w-full md:w-auto">
          Real Estate Agents in Hoydoon
        </h1>

        <p className="text-gray font-normal font-bricolage text-sm sm:text-base md:text-lg leading-snug md:leading-normal md:text-left w-full md:w-[460px]">
          Leverage a local agent's expertise with access to millions of
          listings, guiding you through every step.
        </p>
      </div>

      <div className="hidden md:flex flex-col md:flex-row items-center gap-3 md:gap-4 2xl:gap-6 w-full mt-4">
        <div className="relative w-full md:w-[300px] 2xl:min-w-[350px]">
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Search agent by location "
            className="w-full h-[54px] bg-[#F9FAFB] border border-[#8F8F8F] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-none"
          />
          <button
            onClick={() => updateQueryParam("region", region.toLowerCase())}
            disabled={!region}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-lg"
            aria-label="Search agent by location"
          >
            <Image
              alt="search arrow"
              width={14}
              height={14}
              src="/arrow-left.png"
            />
          </button>
        </div>

        <div className="w-full md:w-auto bg-[#F9FAFB] border border-[#8F8F8F] rounded-xl p-1.5 flex items-center justify-between">
          {options.map((option) => (
            <button
              key={option}
              className={`px-6 py-2.5 rounded-lg transition-all duration-300 ${
                selectedOption === option
                  ? "bg-primary text-white"
                  : "text-[#8F8F8F] hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelectedOption(option);
                updateQueryParam("listingType", option.toLowerCase());
              }}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-auto md:min-w-[220px] 2xl:min-w-[250px]">
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              updateQueryParam("spokenLanguage", e.target.value.toLowerCase());
            }}
            className="w-full h-[54px] appearance-none bg-[#F9FAFB] border border-[#8F8F8F] rounded-xl px-4 py-3 text-[#8F8F8F] focus:outline-none focus:ring-1 focus:ring-none"
          >
            <option value="">Select Language...</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
            <Image
              src="/arrow-downed.svg"
              alt="dropdown arrow"
              width={14}
              height={14}
            />
          </span>
        </div>
      </div>

      <div className="flex md:hidden flex-row md:flex-wrap items-center gap-2 w-full">
        <div className="relative flex items-center border border-[#8F8F8F] bg-[#F9FAFB] rounded-md px-2 py-1 flex-1 min-w-[128px] max-w-[122px]">
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Agege, Lagos..."
            className="bg-[#F9FAFB] placeholder:text-[#8F8F8F] focus:outline-none text-black text-sm w-full"
          />
          <button
            onClick={() => updateQueryParam("region", region.toLowerCase())}
            disabled={!region}
            className="ml-2 cursor-pointer bg-primary text-white p-2 rounded-md"
          >
            <Image alt="arrow" width={14} height={14} src="/arrow-left.png" />
          </button>
        </div>

        <div className="relative 2xl:w-[25rem] font-bricolage">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-[2rem] text-sm justify-between items-center w-full bg-[#F9FAFB] border border-[#8F8F8F] rounded-[10px] p-2 text-[#8F8F8F]"
          >
            {selectedOption}
            <HiChevronDown className="w-5 h-5" />
          </button>

          {isOpen && (
            <div className="absolute text-sm z-10 mt-1 w-[76px] bg-white border border-[#8F8F8F] rounded-[10px] shadow-md">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                    updateQueryParam("listingType", option.toLowerCase());
                  }}
                  className={`w-full text-sm text-left px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300 ${
                    selectedOption === option
                      ? "bg-primary text-white"
                      : "text-[#8F8F8F]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1 min-w-[90px] max-w-[90px] font-bricolage">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex justify-between items-center w-[90px] h-[2rem] text-xs bg-[#F9FAFB] border border-[#8F8F8F] rounded-[10px] px-2 text-[#8F8F8F]"
          >
            {selectedLanguage}
            <HiChevronDown className="w-4 h-4" />
          </button>
          {isLangOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-[#8F8F8F] rounded-[10px] ">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setIsLangOpen(false);
                    updateQueryParam("spokenLanguage", lang.toLowerCase());
                  }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-primary hover:text-white transition-all duration-300 ${
                    selectedLanguage === lang
                      ? "bg-primary text-white"
                      : "text-[#8F8F8F]"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = useMemo(() => {
    return Object.fromEntries(searchParams?.entries() ?? []);
  }, [searchParams]);

  const {
    data: allAgent,
    isLoading: isAllLoading,
    refetch,
  } = useGetAgentsQuery(query);

  const [displayListings, setDisplayListings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [regionUpdater, setRegionUpdater] = useState(null);

  const handleConnect = async () => {
    try {
      const { region: userRegion } = await getLocationRegion();

      console.log(userRegion);
      if (userRegion && regionUpdater) {
        // Update the input field in Breadcrumb
        regionUpdater.setRegion(userRegion);
        // Update the URL query params
        regionUpdater.updateQueryParam("region", userRegion.toLowerCase());
      }
    } catch (e) {
      console.error("Failed to fetch region", e);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      router.push(`/agent/all-agent?${newParams.toString()}`);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!isAllLoading && allAgent) {
      const firstThreeListings = allAgent;
      setDisplayListings(firstThreeListings);
      setTotalPages(allAgent.totalPages || 1);
      setCurrentPage(Number(searchParams.get("page")) || 1);
    }
  }, [allAgent, isAllLoading]);

  if (isAllLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-8  max-w-[1240px]   ">
      <Breadcrumb onRegionUpdate={setRegionUpdater} />
      <div className="md:ml-[5rem] my-3 mt-[45px] 2xl:px-[0rem]  2xl:ml-[2rem] gap-y-3  grid md:w-[88%] 2xl:w-[95%]  grid-cols-1 md:grid-cols-2 sm:gap-4 md:gap-8 place-items-center">
        {isAllLoading
          ? Array.from({ length: 6 }, (_, index) => (
              <ProfileCardSkeleton key={index} />
            ))
          : displayListings.map((agent) => (
              <ProfileCard
                key={agent._id}
                {...agent}
                sales={Number(agent.numberOfListings)}
              />
            ))}
      </div>
      {displayListings.length === 0 ? (
        <div className="w-full col-span-2 flex justify-center items-center py-10">
          <p className="text-[#8F8F8F] md:text-2xl text-sm font-light">
            No agents have been created.
          </p>
        </div>
      ) : (
        <>
          {displayListings.length > 0 && displayListings.length < 6 && (
            <div className="w-full md:col-span-2 md:hidden justify-start">
              <Link href="/agent/all-agent">
                <p className="text-[#09858D] mt-5 text-xs md:text-2xl font-medium">
                  See all 2500 rent estate agents in Lagos
                </p>
              </Link>
            </div>
          )}
          <Pagination
            totalPages={totalPages}
            display={allAgent}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <section className="  bg-[#eeeeeec7] 2xl:bg-white  w-full   md:w-full font-bricolage md:flex  flex-col justify-center flex-1 items-center ">
        <div className="flex  md:gap-[4%] flex-col-reverse md:w-[90%]  2xl:w-[80rem] 2xl:pl-[2.5em] md:pl-5 md:my-[5em] md:flex-row  items-center  2xl:justify-center md:justify-around ">
          <span className="flex flex-col gap-y-1 md:gap-y-0 w-full md:w-[45em] 2xl:w-[60em] ">
            <h1 className="text-black  text-2xl mt-4  md:mt-0  md:text-[2.6rem]  md:leading-[1.1em] font-[600] 2xl:w-[80%]">
              Connect with local agent
            </h1>
            <p className="text-gray text-xs md:text-xl mt-2 2xl:mt-[1em] font-bricolage md:w-[38rem] 2xl:text-[22px] ">
              Benefit from local expertise. We'll connect you with a Hoydoon
              Premier Agent who understands your market and can guide you
              through the process.
            </p>
            <Button
              onClick={handleConnect}
              className="text-base !w-[115px] font-light mt-4"
            >
              Connect
            </Button>
          </span>

          <span className=" mt-[3rem]  md:mt-0">
            <Image
              alt="image1"
              width={500}
              quality={100}
              className="2xl:w-[48rem] w-[45rem] 2xl:h-[30rem]"
              height={400}
              src={"/agent3.png"}
            />
          </span>
        </div>
      </section>
      <FagsSection />
    </div>
  );
};

export default Page;
