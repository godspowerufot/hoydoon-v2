
'use client';
import React, { useState,useEffect,useMemo } from 'react'
import Image from 'next/image';
import { ProfileCard } from '@/app/components/layouts/profilecard';
import Link from 'next/link';
import FagsSection from "@/app/components/layouts/FaqSection"
import Button from '@/app/components/common/Button';
import FAQComponent from '@/app/components/layouts/faq';
import { useGetAgentsQuery } from '@/store/slices/api/authapi';
import Spinner from '@/app/components/common/Spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/app/components/common/pagination';
import {HiChevronDown} from "react-icons/hi";
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
                selectedOption === option ? "bg-primary text-white" : "text-[#8F8F8F]"
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





const Breadcrumb = () => {
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
  newParams.set('page', '1'); // ✅ Reset page on filter change
  router.push(`/agent/all-agent?${newParams.toString()}`);
};


  return (
    <div className="w-full py-2 lg:py-6 px-1 lg:px-[3.5rem] 2xl:px-3 items-start lg:flex-col lg:items-center justify-between">
      <div className="flex p-2 flex-col w-full 2xl:ml-0 md:flex-row 2xl:gap-[20%] mt-[1rem] lg:flex-row md:gap-10 justify-end items-center md:items-start ">
        <h1 className="text-black lg:ml-1 text-[24px] lg:text-[2rem] font-[600] w-full">
          Real Estate Agents In Lagos
        </h1>
        <p className="text-gray font-[400] lg:p-0  my-1 text-sm lg:text-xl font-bricolage w-full lg:w-full">
          Leverage a local agent's expertise with access to millions of listings, guiding you through every step.
        </p>
      </div>

      <div className="hidden ml-[1rem] lg:flex flex-col lg:flex-row items-center gap-[1rem] 2xl:gap-[2rem] mt-4 lg:mt-0">
        <div className="relative bg-[#F9FAFB] w-[113px] h-[32px] 2xl:w-[30rem] hidden border-[#8F8F8F] border-solid border-[1px] lg:flex items-center bg-gray-100 rounded-[14px] px-2 py-2">
          <input
            type="text"
            placeholder="Agege, Lagos State..."
            className="bg-[#F9FAFB] placeholder:font-[400] placeholder:text-[12px] placeholder:text-gray focus:outline-none text-black text-sm w-full"
          />
          <button className="ml-2 bg-primary text-white p-3 rounded-lg">
            <Image
              alt="logo"
              width={20}
              height={10}
              quality={100}
              src={'/arrow-left.png'}
              style={{ objectFit: 'cover' }}
            />
          </button>
        </div>

        <div className="flex bg-[#F9FAFB] border-[#8F8F8F] w-[15rem] 2xl:w-[25rem] justify-between border-solid border-[1px] items-center font-bricolage rounded-[10px] p-2">
          {options.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 w-[7rem] rounded-md transition-all duration-300 ${
                selectedOption === option ? "bg-primary text-white" : "text-[#8F8F8F]"
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="relative">
          <select className="border border-[#8F8F8F] bg-[#F9FAFB] rounded-md px-4 text-[#8F8F8F] w-[18rem] 2xl:w-[20rem] py-4 text-gray-700 outline-none appearance-none">
            <option>Select Language...</option>
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
          <img src="/arrow-down.png" alt="Dropdown" className="w-[6px] h-[3px] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex lg:hidden flex-row lg:flex-wrap items-center gap-2 w-full">
        <div className="relative flex items-center border border-[#8F8F8F] bg-[#F9FAFB] rounded-md px-2 py-1 flex-1 min-w-[128px] max-w-[122px]">
          <input
            type="text"
              value={region}
  onChange={(e) => setRegion(e.target.value)}
            placeholder="Agege, Lagos..."
            className="bg-[#F9FAFB] placeholder:text-gray-400 focus:outline-none text-black text-sm w-full"
          />
          <button  onClick={() => updateQueryParam('region', region.toLowerCase())}
          disabled={!region}
 className="ml-2 cursor-pointer bg-primary text-white p-2 rounded-md">
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
updateQueryParam('listingType', option.toLowerCase())
                  }}
                  className={`w-full text-sm text-left px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300 ${
                    selectedOption === option ? "bg-primary text-white" : "text-[#8F8F8F]"
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
updateQueryParam('spokenLanguage', lang.toLowerCase())
                  }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-primary hover:text-white transition-all duration-300 ${
                    selectedLanguage === lang ? "bg-primary text-white" : "text-[#8F8F8F]"
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


  
const page = () => {
  const searchParams = useSearchParams();
   const query = useMemo(() => {
    return Object.fromEntries(searchParams?.entries() ?? []);
  }, [searchParams]);
  const { data: allAgent, isLoading: isAllLoading, refetch } = useGetAgentsQuery(query);
  const [displayListings, setDisplayListings] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      router.push(`/agent/all-agent?${newParams.toString()}`);
    }
  };

useEffect(() => {
  refetch(); // Refetch data on every mount
}, [refetch]);

useEffect(() => {
  if (!isAllLoading && allAgent) {
    const firstThreeListings = allAgent;
    setDisplayListings(firstThreeListings); // Store in state
 setTotalPages(allAgent.totalPages || 1);
        setCurrentPage(Number(searchParams.get("page")) || 1); // Store in state
       }
}, [allAgent, isAllLoading]);

  
  
if (isAllLoading) {
  return (
  <Spinner/>
  );
}

  return (
    <div className='mt-8  2xl:w-[1520px]  '> <Breadcrumb/>
  <div className="lg:ml-[5rem]  2xl:ml-[2rem] gap-y-3  grid lg:w-[88%] 2xl:w-[95%]  grid-cols-1 lg:grid-cols-2 sm:gap-4 lg:gap-8 place-items-center">
  {displayListings.map((agent) => (
          <ProfileCard  key={agent._id} {...agent} sales={Number(agent.numberOfListings)} />
        ))}
    </div>
    {displayListings.length === 0 ? (
      <div className="w-full col-span-2 flex justify-center items-center py-10">
        <p className="text-[#8F8F8F] text-sm font-light">No agents have been created.</p>
      </div>
    ) : (
      <>
        {displayListings.length > 0 && displayListings.length < 6 && (
          <div className="w-full md:col-span-2 lg:hidden justify-start">
            <Link href="/agent/all-agent">
              <p className="text-[#09858D] mt-5 text-xs lg:text-2xl font-medium">
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

    <section className="  bg-[#eeeeeec7]  w-full   lg:w-screen font-bricolage lg:flex  flex-col justify-center flex-1 items-center ">
      <div className="flex  lg:gap-[4%] flex-col-reverse lg:w-[90%]  2xl:w-[94rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
        <span className="flex flex-col gap-y-1 lg:gap-y-0 w-full lg:w-[45em] 2xl:w-[60em] ">
          <h1 className="text-black  text-2xl mt-4  lg:mt-0  lg:text-[2.6rem]  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Connect with local agent</h1>
          <p className="text-gray text-xs lg:text-xl mt-2 2xl:mt-[1em] font-bricolage lg:w-[38rem] 2xl:text-[22px] ">
            Benefit from local expertise. We'll connect you with a Hoydoon Premier Agent who understands your market and can guide you through the process.
          </p>
          <Button className="text-base font-light mt-4 ">
            <Link href="/explore">
              Connect
            </Link>
          </Button>
        </span>

        <span className=" mt-[3rem]  lg:mt-0">
          <Image
            alt="image1"
            width={500}
            quality={100}
            className=" 2xl:w-[50rem] lg:w-[55rem]   w-fit lg:h-[28rem] 2xl:h-[36rem]"
            height={400} // Reduced size of logo
              src={'/agent3.png'}
            />
</span>
        </div>
      </section>
<section className="  hidden  font-bricolage lg:flex  flex-col justify-center flex-1 items-center ">
        <div className="flex  gap-[4%] flex-col w-[90%]  2xl:w-[94rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex flex-col w-full lg:w-[45em] 2xl:w-[60em] ">
<h1  className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Ready to sell your home?.</h1>
<p className="text-gray text-base lg:text-xl mt-3 2xl:mt-[2em] font-bricolage w-[85%] 2xl:text-[20px] 2xl:w-[70%]">
Ready to sell your home? Let us help you maximize its value and make the process stress-free. Schedule a consultation today and take the first step toward a successful sale</p>

<Button className="text-base font-light mt-5 ">
  <Link href="/explore">
  Schedule
  </Link>
</Button>
          </span>

<span className="mt-4 lg:mt-0">
 <Image
              alt="image1"
              width={500} 
              quality={100}
              className="2xl:w-[48rem] w-[45rem] 2xl:h-[30rem]"// Reduced size of logo

              height={400} // Reduced size of logo
              src={'/agent3.png'}
            />
</span>
        </div>
      </section>
<div className="mt-[3px] hidden   ml-[2rem] justify-center items-center max-md:w-full w-full gap-6 lg:flex flex-col max-md:justify-center max-md:items-center lg:flex-row ">
<div className="z-[4] relative max-md:w-full  lg:h-[50em]  lg:left-[50px] 2xl:left-[80px] lg:top-[10em]">
<FAQComponent/>
</div>
<div className="relative lg:-ml-[10em] justify-center items-center  flex w-[255px] lg:w-auto">


      <Image
        alt="image1"
        width={420}
        loading="lazy"
        height={500}
        src={'/q1.png'}
        className="z-[3]  lg:w-[30rem] 2xl:w-[600px] rounded-[20px] relative top-0 left-[0.5rem] 2xl:left-[2rem]   object-cover h-5/10"
      /> <Image
      alt="image1"
      width={400}
      loading="lazy"
      height={300}
      src={'/q2.png'}
      className=" z-2   bottom-[2em] lg:h-[30rem]  2xl:h-[38rem] lg:w-[40rem]  w-[86px] 2xl:w-[650px] mt-[17%] lg:-top-[rem] 2xl:-top-[3rem] lg:-left-[7em]  2xl:-left-[9rem] lg:mt-[11%] relative rounded-lg   object-cover "
    />
    </div>
</div>
 <FagsSection/>

{/* second div layout  */}
  


</div>
  )
}

export default page