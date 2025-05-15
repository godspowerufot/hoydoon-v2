'use client'
/* eslint-disable */

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import { ProfileCard } from '@/app/components/layouts/profilecard';
import Link from "next/link";
import FagsSection  from "../components/layouts/FaqSection"
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import { useEffect, useState } from "react";
  import Spinner from '@/app/components/common/Spinner';
  import { useRouter } from "next/navigation";
export default function Page() {

    const { data: allAgent, isLoading: isAllLoading, refetch } = useGetAgentsQuery({});
    const [displayListings, setDisplayListings] = useState([]);
    const [formData, setFormData] = useState({
      location: "",
    
    });
      const router=useRouter()
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
      const handleSearch = () => {
        const queryParams = new URLSearchParams({
          ...(formData.location && { location: formData.location }),
      }).toString();
    
        router.push(`/rent/searchlisting?${queryParams}`);
      };


     
      
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
    return (
    <Spinner/>
    );
  }
  return (
    
    <>
 <header className="relative h-[38vh] lg:h-[80vh] w-screen">
  {/* Background Image Div */}
  <div className="absolute top-0 left-0 w-screen h-full bg-cover bg-center z-[-1]" style={{ backgroundImage: "url('/agentheader.png')" }}>
    {/* Overlay Div */}
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.3] z-[-1]"></div>
  </div>

  {/* Content Section */}
  <div className="flex z-[1] p-4 lg:p-0 relative  gap-2 lg:gap-6 justify-center items-center flex-col">
    {/* Main Heading */}
    <h1 className="w-[10em]  capitalize  mt-[2em] 2xl:mt-[9rem] lg:mt-[1.4em] text-white text-[2em] lg:w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
    A top agent matters!    </h1>

    {/* Subheading */}
    <h2 className="lg:text-[1.5em] 2xl:text-[1.6em]  font-[400] text-center text-[#FFFFFFB2] lg:w-[33em]">
    Hoydoon’s agents are highly experienced, ready to guide you to success in today’s market.    </h2>

    {/* Large Screen Search Bar */}
 {/* Large Screen Search Bar */}
<div className="hidden lg:flex   justify-center items-center ">
  <div className="flex h-[3.5em] py-4 font-bricolage items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[35em]">
   
    {/* Transparent Full-Width Input */}
    <input 
      type="text" 
      name="location"

      value={formData.location}
      onChange={handleChange}
      className="flex-1 bg-transparent placeholder:text-[1.3rem] text-black placeholder-gray-500 border-none outline-none pl-4 w-[36.3rem]" 
      placeholder="Enter your home address" 
    />

    {/* Search Button */}
    <div onClick={handleSearch} className="relative mr-2 p-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-white before:via-white/30 before:to-white/10 before:p-[1px]">
      <div className="relative bg-primary ml-[1em] p-3 w-[47px] h-[47px] rounded-full flex items-center justify-center">
        <Image
          alt="logo"
          width={30}
          loading="lazy"
          height={30}
          quality={100} // Ensures maximum quality
          src={'/arrow-left.png'}
          style={{ objectFit: 'cover' }}
        />

      </div> 
    </div>
  </div>
</div>
 <div className="flex  lg:hidden justify-center items-center w-full px-1 py-1">
  <div className="flex  items-center w-full bg-white rounded-full h-[2.4em] px-2 py-1">
    <input
      type="text"
      name="location"
      value={formData.location}
      onChange={handleChange}
      placeholder="Address, Neighborhood, City, Zip code..."
      className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
    />
    <button
      onClick={handleSearch}
      className="ml-2 bg-primary p-2 rounded-full flex items-center justify-center hover:bg-opacity-90"
    >
      <Image alt="Search" width={15} height={15} src="/search.png" />
    </button>
  </div>
</div>


    {/* Small Screen Search Bar */}
  
  </div>
</header>

      {/* this hold the images */}



      {/* explore */}
      <section className="   lg:w-screen bg-none  lg:bg-[#eeeeeec7]  lg:py-[2em] ont-bricolage lg:flex justify-center flex-col lg:gap-7 2xl:gap-[3rem] flex-1 items-center">
      <div className="flex   p-2 flex-col lg:w-[80rem] 2xl:w-[94rem]  mt-4  2xl:ml-0 md:flex-row 2xl:gap-[20%] lg:my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-[3rem]  text-2xl  lg:text-[2rem] font-[600]   w-full ">  Real Estate Agents In Lagos</h1>
      <p className="text-gray  lg:p-0 text-[12px] lg:text-xl font-bricolage w-full lg:w-full">
      Leverage a local agent's expertise with access to millions of listings, guiding you through every step.
</p>

      

</div>


<div className="grid p-3 gap-y-3  w-full lg:w-[90%]  grid-col-1 lg:grid-cols-2    gap-2 lg:gap-6 lg:place-items-center">
  {displayListings.slice(0, Math.min(displayListings.length < 4 ? 2 : 6, displayListings.length)).map((agent) => (
    <ProfileCard
      key={agent._id}
      {...agent}
      sales={Number(agent.numberOfListings)}
    />
  ))}

  {/* "See All" link aligned to the start */}
  {displayListings.length > 0 && displayListings.length < 6 && (
    <div className="w-full hidden  lg::col-span-2 lg:flex justify-start">
      <Link href="/agent/all-agent">
        <p className="text-[#09858D] mt-5  w-full text-sm lg:text-2xl font-medium">
          See all {displayListings.length} rent estate agents in Lagos
        </p>
      </Link>
    </div>
  )}
{displayListings.length > 0 && displayListings.length < 6 && (
    <div className="w-full  lg:hidden lflex justify-start">
      <Link href="/agent/all-agent">
        <p className="text-[#09858D] mt-5  w-full text-sm lg:text-2xl font-medium">
          See all {displayListings.length} rent estate agents in Lagos
        </p>
      </Link>
    </div>
  )}
</div>
      </section>


      <section className="  bg-[#eeeeeec7]  w-full   lg:w-screen font-bricolage lg:flex  flex-col justify-center flex-1 items-center ">
        <div className="flex  lg:gap-[4%] flex-col-reverse lg:w-[90%]  2xl:w-[94rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex flex-col gap-y-1 lg:gap-y-0 w-full lg:w-[45em] 2xl:w-[60em] ">
<h1  className="text-black  text-2xl mt-4  lg:mt-0  lg:text-[2.6rem]  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Connect with local agent</h1>
<p className="text-gray text-xs lg:text-xl mt-2 2xl:mt-[1em] font-bricolage lg:w-[38rem] 2xl:text-[22px] ">
Benefit from local expertise. We'll connect you with a Hoydoon Premier Agent who understands your market and can guide you through the process.</p>
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

      <section className=" bg-[#eeeeeec7] w-full lg:w-screen  mb-[2em] lg:mb-0 font-bricolage lg:flex  flex-col j flex-1 items-center ">
        <div className="flex flex-col   lg:ml-[5.5rem] gap-[4%] 2xl:gap-[8%]   w-full 2xl:w-[110rem] 2xl:pl-[8em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
       
       <span className="mt-[3.5rem] lg:mt-0">
 <Image
              alt="image1"
              width={500} 
              quality={100}
              height={400} 
              className=" 2xl:w-[59rem] lg:w-[32rem]  w-fit   lg:h-[28rem] 2xl:h-[36rem]"
              src={'/agent4.png'}
            />
</span>
          <span className="flex flex-col w-full  lg:gap-y-0  2xl:-mr-[2rem]  lg:w-[43em]  2xl:w-[80em] ">
<h1  className="text-black my-4 lg:my-0  text-xl lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Rapid Finds, Ready to View</h1>
<p className="text-gray  lg:text-xl text-xs  2xl:mt-[1em] font-bricolage lg:w-[90%] 2xl:text-[20px] 2xl:w-[70%]">
Never miss out. We refresh listings every minute, ensuring you see new homes instantly. Book on-demand tours to view them fast</p>

<Button className="text-base font-light mt-5 ">
  <Link href="/explore">
  Schedule
  </Link>
</Button>
          </span>


        </div>
      </section>
{/* afforable component */}
    

     <FagsSection/>

    {/* New-articles */}
    
    
      </>
  );
}
