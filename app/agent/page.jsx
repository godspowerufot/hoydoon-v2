'use client'
/* eslint-disable */

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import { ProfileCard } from '@/app/components/layouts/profilecard';
import Link from "next/link";
import FAQComponent from "../components/layouts/faq";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import { useEffect, useState } from "react";
  import Spinner from '@/app/components/common/Spinner';
  
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
 <header className="relative h-[45em] lg:h-[52em] 2xl:w-full w-screen">
  {/* Background Image Div */}
  <div className="absolute top-0 left-0 w-screen h-full bg-cover bg-center z-[-1]" style={{ backgroundImage: "url('/agentheader.png')" }}>
    {/* Overlay Div */}
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-1]"></div>
  </div>

  {/* Content Section */}
  <div className="flex z-[1] relative gap-6 justify-center items-center flex-col">
    {/* Main Heading */}
    <h1 className="lg:w-[12em] mt-[2em] 2xl:mt-[9rem] lg:mt-[1.4em] text-white text-[2em] w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
      Get Personalized Proposals — No Cost!
    </h1>
    {/* Subheading */}
    <h2 className="lg:text-[1.5em] 2xl:text-[1.6em]  font-[400] text-center text-[#FFFFFFB2] w-[33em]">
      Get free, customized quotes from local agents ready to assist you. Fast, easy, and no obligation.    
    </h2>

    {/* Large Screen Search Bar */}
 {/* Large Screen Search Bar */}
<div className="hidden lg:flex   justify-center items-center ">
  <div className="flex h-[3.5em] py-4 font-bricolage items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[35em]">
   
    {/* Transparent Full-Width Input */}
    <input 
      type="text" 
      className="flex-1 bg-transparent placeholder:text-[1.3rem] text-black placeholder-gray-500 border-none outline-none pl-4 w-[36.3rem]" 
      placeholder="Enter your home address" 
    />

    {/* Search Button */}
    <div className="relative mr-2 p-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-white before:via-white/30 before:to-white/10 before:p-[1px]">
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


    {/* Small Screen Search Bar */}
    <div className="lg:hidden justify-center items-center w-full px-2 py-3">
      <div className="flex h-[4em] font-bricolage items-center m-5 bg-white rounded-full shadow-md w-[89%] md:w-4/5 lg:w-3/5">
        <div className="flex flex-col flex-1">
          <div className="text-sm text-gray">
            Address, Neighborhood, City, Zip code...
          </div>
        </div>
        <div className="bg-primary p-3 mr-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
          <FaSearch className="text-white h-6 text-sm" />
        </div>
      </div>
    </div>
  </div>
</header>

      {/* this hold the images */}



      {/* explore */}
      <section className=" flex-wrap bg-[#eeeeeec7] hidden lg:py-[2em] w-full  font-bricolage lg:flex justify-center flex-col gap-7 2xl:gap-[3rem] flex-1 items-center">
      <div className="flex   p-2 flex-col w-[80rem] 2xl:w-[94rem]  2xl:ml-0 md:flex-row 2xl:gap-[20%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-[3rem] text-[26px] lg:text-[2rem] font-[600]   w-full ">  Real Estate Agents In Lagos</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-xl font-bricolage w-full lg:w-full">
      Leverage a local agent's expertise with access to millions of listings, guiding you through every step.
</p>

      

</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
  {displayListings.slice(0, Math.min(displayListings.length < 4 ? 2 : 6, displayListings.length)).map((agent) => (
    <ProfileCard
      key={agent._id}
      {...agent}
      sales={Number(agent.numberOfListings)}
    />
  ))}

  {/* "See All" link aligned to the start */}
  {displayListings.length > 0 && displayListings.length < 6 && (
    <div className="w-full md:col-span-2 flex justify-start">
      <Link href="/agent/all-agent">
        <p className="text-[#09858D] mt-5 text-2xl font-medium">
          See all 2500 rent estate agents in Lagos
        </p>
      </Link>
    </div>
  )}
</div>


      </section>


      <section className="  bg-[#eeeeeec7]   w-full font-bricolage lg:flex  flex-col justify-center flex-1 items-center ">
        <div className="flex  gap-[4%] flex-col w-[90%]  2xl:w-[94rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex flex-col w-full lg:w-[45em] 2xl:w-[60em] ">
<h1  className="text-black  text-[26px] lg:text-[2.6rem]  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Connect with local agent</h1>
<p className="text-gray text-base lg:text-xl mt-2 2xl:mt-[1em] font-bricolage w-[38rem] 2xl:text-[22px] ">
Benefit from local expertise. We'll connect you with a Hoydoon Premier Agent who understands your market and can guide you through the process.</p>
<Button className="text-base font-light mt-5 ">
  <Link href="/explore">
  Connect
  </Link>
</Button>
          </span>

<span className="mt-4 lg:mt-0">
 <Image
              alt="image1"
              width={500} 
              quality={100}
              className=" 2xl:w-[50rem] w-[55rem]   h-[28rem] 2xl:h-[36rem]"

              height={400} // Reduced size of logo
              src={'/agent3.png'}
            />
</span>
        </div>
      </section>

      <section className=" bg-[#eeeeeec7] w-full   font-bricolage lg:flex  flex-col j flex-1 items-center ">
        <div className="flex   ml-[5.5rem] gap-[4%] 2xl:gap-[8%] flex-col  w-full 2xl:w-[110rem] 2xl:pl-[8em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
       
       <span className="mt-4 lg:mt-0">
 <Image
              alt="image1"
              width={500} 
              quality={100}
              height={400} 
              className=" 2xl:w-[59rem] w-[32rem]   h-[28rem] 2xl:h-[36rem]"
              src={'/agent4.png'}
            />
</span>
          <span className="flex flex-col w-full 2xl:-mr-[2rem]  lg:w-[43em]  2xl:w-[80em] ">
<h1  className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Rapid Finds, Ready to View</h1>
<p className="text-gray text-base lg:text-xl mt-3 2xl:mt-[1em] font-bricolage w-[90%] 2xl:text-[20px] 2xl:w-[70%]">
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
    

     

    {/* New-articles */}
    <section className="   flex justify-center items-center  w-full  flex-col mt-[2rem] p-5 lg:p-0 font-bricolage ">
    <div className="mt-[3px]  ml-[5rem] justify-center items-center max-md:w-full w-full gap-6 flex flex-col max-md:justify-center max-md:items-center lg:flex-row ">
          <div className="z-[4] relative max-md:w-full  lg:h-[50em]  lg:left-[50px] 2xl:left-[80px] lg:top-[10em]">
            <FAQComponent />
          </div>
          <div className="relative lg:-ml-[10em] justify-center items-center  flex w-[255px] lg:w-auto">
            <Image
              alt="image1"
              width={420}
              loading="lazy"
              height={500}
              src={"/q1.png"}
              className="z-[3]  lg:w-[30rem] 2xl:w-[600px] rounded-[20px] relative top-0 left-[0.5rem] 2xl:left-[2rem]   object-cover h-5/10"
            />{" "}
            <Image
              alt="image1"
              width={400}
              loading="lazy"
              height={300}
              src={"/q2.png"}
              className=" z-2   bottom-[2em] lg:h-[30rem]  2xl:h-[38rem] lg:w-[40rem]  w-[86px] 2xl:w-[650px] mt-[17%] lg:-top-[rem] 2xl:-top-[3rem] lg:-left-[7em]  2xl:-left-[9rem] lg:mt-[11%] relative rounded-lg   object-cover "
            />
          </div>
        </div>


    </section>  
    
      </>
  );
}
