'use client'
/* eslint-disable */

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import { ProfileCard } from '@/app/components/layouts/profilecard';
import Link from "next/link";
import FagsSection  from "../components/layouts/FaqSection"
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import { useEffect,useRef, useState } from "react";
  import Spinner from '@/app/components/common/Spinner';
import LocationSearchBar from "../components/layouts/maploader";




export default function Page() {

    const { data: allAgent, isLoading: isAllLoading, refetch } = useGetAgentsQuery({});
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
  <div className="flex z-[1] p-4 lg:p-0 relative  gap-1 lg:gap-6 justify-center items-center flex-col">
    {/* Main Heading */}
    <h1 className="w-[10em]  capitalize  mt-[1em] 2xl:mt-[9rem] lg:mt-[1.4em] text-white text-[2em] lg:w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
    A top agent matters!    </h1>

    {/* Subheading */}
    <h2 className="lg:text-[1.5em] 2xl:text-[1.6em]  font-[400] text-center text-[#FFFFFFB2] lg:w-[33em]">
    Hoydoon’s agents are highly experienced, ready to guide you to success in today’s market.    </h2>

    {/* Large Screen Search Bar */}
 {/* Large Screen Search Bar */}

<LocationSearchBar/>


    {/* Small Screen Search Bar */}
  
  </div>
</header>

      {/* this hold the images */}



      {/* explore */}
      <section className="   lg:w-screen bg-white  lg:bg-[#eeeeeec7]  lg:py-[2em] ont-bricolage lg:flex justify-center flex-col lg:gap-7 2xl:gap-[3rem] flex-1 items-center">
      <div className="flex   p-2 flex-col lg:w-[90rem] 2xl:w-[94rem]  mt-4  2xl:ml-0 md:flex-row 2xl:gap-[20%] lg:my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-[6.5rem] 2xl:ml-0 text-2xl  lg:text-[2.6rem] font-[600]   w-full ">  Real Estate Agents In Hoydoon</h1>
      <p className="text-gray  lg:p-0 text-[12px] lg:text-xl font-bricolage w-full lg:w-[60rem]">
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

  

{displayListings.length > 0 && displayListings.length < 6 && (
    <div className="w-full  flex justify-start">
      <Link href="/agent/all-agent">
        <p className="text-[#09858D] mt-5  w-full text-sm lg:text-2xl font-medium">
          See all {displayListings.length} rent estate agents in Lagos
        </p>
      </Link>
    </div>
  )}
</div>
{/* "See All" link aligned to the start */}
    <div className="w-full  lg:col-span-2  lg:flex justify-start">
      <Link href="/agent/all-agent">
        <p className="text-[#09858D] mt-5  lg:ml-[7rem] 2xl:ml-[10rem]  w-full text-sm lg:text-2xl font-medium">
          See all  real estate agents  on Hoydoon
        </p>
      </Link>
    </div>
      </section>


      <section className="  bg-white  lg:bg-[#eeeeeec7]  w-full   lg:w-screen font-bricolage lg:flex  flex-col justify-center flex-1 items-center ">
        <div className="flex  lg:gap-[4%] flex-col-reverse lg:w-[90%]  2xl:w-[94rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex flex-col gap-y-1 lg:gap-y-0 w-full lg:w-[45em] 2xl:w-[60em] ">
<h1  className="text-black  text-2xl mt-4  lg:mt-0  lg:text-[2.6rem]  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Connect with local agent</h1>
<p className="text-gray text-xs lg:text-xl mt-2 2xl:mt-[1em] font-bricolage lg:w-[38rem] 2xl:text-[22px] ">
Benefit from local expertise. We'll connect you with a Hoydoon Premier Agent who understands your market and can guide you through the process.</p>
<Button className="text-base !w-[115px] font-light mt-4 ">
  <Link href="/agent/all-agent">
  Connect
  </Link>
</Button>
          </span>

<span className=" mt-[3rem]  lg:mt-0">
 <Image
              alt="image1"
              width={500} 
              quality={100}
              className=" 2xl:w-[50rem] lg:w-[50rem]   w-fit lg:h-[28rem] 2xl:h-[36rem]"

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

<Button className="text-base  !w-[115px] font-light mt-5 ">
  <Link href="/explore">
 explore
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
