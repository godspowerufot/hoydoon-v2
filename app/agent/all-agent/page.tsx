/* eslint-disable */

'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import { ProfileCard } from '@/app/components/layouts/profilecard';
import { agents } from '@/constants';
import Link from 'next/link';
import Pagination from '@/app/components/common/pagination';
import Button from '@/app/components/common/Button';
import FAQComponent from '@/app/components/layouts/faq';
const Breadcrumb = () => {
  const [selectedOption, setSelectedOption] = useState("All");

    return (
      <div className="w-full  py-6 px-4 lg:px-[3.5rem] 2xl:px-3  lg:flex-col items-center justify-between">
      {/* Left Section */}
      <div className="flex   p-2 flex-col w-full  2xl:ml-0 md:flex-row 2xl:gap-[20%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-1 text-[26px] lg:text-[2rem] font-[600]   w-full ">  Real Estate Agents In Lagos</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-xl font-bricolage w-full lg:w-full">
      Leverage a local agent's expertise with access to millions of listings, guiding you through every step.
</p>

      

</div>

      {/* Right Section - Filters */}

      <div className=" ml-[1rem] flex flex-col lg:flex-row  items-center gap-[1rem] 2xl:gap-[2rem] mt-4 lg:mt-0">
        {/* Location Input */}
               <div className="relative  bg-[#F9FAFB]   w-[20rem]  2xl:w-[30rem] h-[3.6rem] hidden border-[#8F8F8F] border-solid border-[1px]  lg:flex items-center bg-gray-100 rounded-[14px] px-2 py-2">
                        <input 
                          type="text" 
                          placeholder="Agege, Lagos State..."
                          className="bg-[#F9FAFB]  placeholder:fonr-[300] placeholder:font-[1em] placeholder:text-gray focus:outline-none text-black text-sm w-full"
                        />
                        <button className="ml-2 bg-primary text-white p-3 rounded-lg">
         <Image
                  alt="logo"
                  width={20}
                  loading="lazy"
                  height={10}
                  quality={100} // Ensures maximum quality
                  src={'/arrow-left.png'}
                  style={{ objectFit: 'cover' }}
                />                </button>
                      </div>

        {/* Buy/Sell Toggle */}
        <div className="flex bg-[#F9FAFB]  border-[#8F8F8F]  w-[15rem] 2xl:w-[25rem] justify-between border-solid border-[1px] items-center font-bricolage  rounded-[10px] p-2">
          {["All", "Buy", "Sell"].map((option) => (
            <button
              key={option}
              className={`px-4 py-2 w-[7rem] rounded-md transition-all duration-300 ${
                selectedOption === option ? "bg-primary  text-white" : "text-[#8F8F8F] "
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="relative">
  <select className="border border-[#8F8F8F] bg-[#F9FAFB] rounded-md px-4 text-[#8F8F8F] w-[18rem] 2xl:w-[20rem] py-4 text-gray-700 outline-none appearance-none ">
    <option>Select Language...</option>
    <option>English</option>
    <option>French</option>
    <option>Spanish</option>
  </select>
  {/* Custom Dropdown Icon */}
  <img src="/arrow-down.png" alt="Dropdown" className="w-3 h-2 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
</div>


<div className="relative">
  <select className="border border-[#8F8F8F] bg-[#F9FAFB] rounded-md px-4 text-[#8F8F8F] w-[18rem] 2xl:w-[20rem] py-4 text-gray-700 outline-none appearance-none ">
    <option>Speciality</option>
    <option>English</option>
    <option>French</option>
    <option>Spanish</option>
  </select>
  {/* Custom Dropdown Icon */}
  <img src="/arrow-down.png" alt="Dropdown" className="w-3 h-2 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
</div>
      </div>
    </div>
    );
  };
  

  
const page = () => {
  return (
    <div className='mt-8  2xl:w-[1520px]  '> <Breadcrumb/>
  <div className="lg:ml-[5rem] 2xl:ml-[2rem] grid w-[88%] 2xl:w-[95%]  grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        {agents.map((agent, index) => (
          <ProfileCard key={index} {...agent} />
        ))}
        <Link href={"/agent/all-agent"}>

<p className="text-[#09858D] 2xl:-ml-[16rem]   -ml-[6rem] text-start   mt-5 text-2xl font-[500] ">See all 2500  rents estate agent  in lagos</p>
</Link>
      </div>
<Pagination/>

<section className="   font-bricolage lg:flex  flex-col justify-center flex-1 items-center ">
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
<div className="mt-[3px]  ml-[2rem] justify-center items-center max-md:w-full w-full gap-6 flex flex-col max-md:justify-center max-md:items-center lg:flex-row ">
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

{/* second div layout  */}
  


</div>
  )
}

export default page