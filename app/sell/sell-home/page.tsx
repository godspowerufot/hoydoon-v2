/* eslint-disable */

'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import { agents } from '@/constants';
import Input from '@/app/components/common/inputs/input';
import Button from '@/app/components/common/Button';
import { ProfileCard } from '@/app/components/layouts/profilecard';
import Link from 'next/link';
import Article from '@/app/components/common/Article';


const Breadcrumb = () => {
    return (
      <div className="flex  items-center justify-between gap-[0.2rem] px-4 py-2  mt-[5rem] w-full  bg-gray-100">
        {/* Left Section: Back Arrow and Breadcrumb */}
        <div className="flex items-start justify-center  gap-2 text-[1.08rem] font-bricolage text-gray-600">
          {/* Back Arrow */}
          <img src="/arrow-right.png" alt="Back" className="w-3 h-4 mt-1" />
  
          {/* Breadcrumb Links */}
          <span className="text-gray-400">Search |</span>
          <a href="#" className="text-primary">Homes for sale</a>
          <span>{'>'}</span>
          <a href="#" className="text-primary">Nigeria</a>
          <span>{'>'}</span>
          <a href="#" className="text-primary">Lagos</a>
          <span>{'>'}</span>
          <a href="#" className="text-primary">Magodo Estate</a>
        </div>
  






        <div>
        </div>
      </div>
    );
  };
  

  
const page = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const tabs = [
    { id: "all", label: "All listings" },
    { id: "active", label: "Active listings" },
    { id: "sold", label: "Sold with Ruka" },
    { id: "bought", label: "Bought with Ruka" },
  ];


  return (
    <div className='mt-2  2xl:w-[1520px] '> <Breadcrumb/>
    <div className=" mt-3 relative rounded-lg  flex items-center overflow-hidden">
        <Image
          src="/sell.png" // Replace with actual map image
          alt="Map"
          width={700}
          height={300}
          className="w-[78rem] 2xl:w-full 2xl:h-auto rounded-[20px] h-[38rem]"
        />

      </div>


    {/* second layout */}
    <div className=' w-full px-4 py-7'>
  <h1 className="text-[2rem] font-semibold ">  Sell your Home with Hoydoon
    </h1>
    <p className=' text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl py-2'>
    Are you thinking about selling your home? We’re here to help you every step of the way! Our team will work closely with you to highlight your home’s best features, attract the right buyers, and maximize its value. From preparing your property for sale to navigating offers and closing the deal, we’ll ensure the entire process is smooth, simple, and stress-free. Schedule a consultation with us today, and let’s start planning for a successful and rewarding home-selling experience!    </p>
  
</div>
    <div className=' w-full px-4 py-4'>
  <h1 className="text-[2rem] font-semibold "> Choose the perfect agent for your needs.
    </h1>
    <p className=' text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl py-2'>
    Hoydoon makes finding the right real estate agent simple and stress-free. Whether you're buying, selling, or renting, we connect you with trusted professionals tailored to your needs. Browse detailed profiles, compare expertise, and read reviews to make an informed choice. Start your real estate journey with the perfect agent today!</p>
    <p className=' text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl py-2'>

    Complete a quick questionnaire to discover the best agents in your area. Review their pricing, services, and ratings to find the one that fits your needs perfectly</p>  



<div className="flex justify-center flex-col w-full">
    <div className="grid grid-cols-2 gap-4 p-4">
        <Input
            label=""
            type="text"
            placeholder="Enter your full name"
            className="border  h-[3.5rem] placeholder:font-[400] border-gray-300 rounded-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
        />
        <Input
            label=""
            type="text"
            placeholder="Please enter Email Address"
            className="border h-[3.5rem]  placeholder:font-[400]  border-gray-300 rounded-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <Input
            label=""
            type="text"
            placeholder="Please enter your address"
            className="border  h-[3.5rem] placeholder:font-[400] border-gray-300 rounded-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
        />
        <Input
            label=""
            type="tel"
            placeholder="Please enter your phone number"
            className="border h-[3.5rem] placeholder:font-[400]  border-gray-300 rounded-none"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
        />
    </div>
</div>
<div className='w-full flex items-center justify-center'>
<Button type="submit" className="text-base  rounded-none  w-[20rem] font-light mt-5 "> Submit</Button>

</div>
<p className=' text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl mt-5 py-2'>

By submitting this form, you agree that Hoydoon, its affiliates, or associated third parties may contact you, including through calls or texts using automated systems. You also agree to our Terms of Service and Privacy Policy. Message and data rates may apply. Providing consent is not a condition for accessing real estate services. </p>


</div>

   
   <div className="grid grid-cols-1 mt-[3rem] md:grid-cols-2 gap-8 place-items-center">
           {agents.map((agent, index) => (
             <ProfileCard 
               key={index} 
               pictureUrl={agent.image} 
               fullname={agent.name} 
             
               priceRange={agent.priceRange ? { min: parseInt(agent.priceRange.split('-')[0]), max: parseInt(agent.priceRange.split('-')[1]) } : undefined} 
               sales={Number(agent.sales)} 
             />
           ))}
           <Link href={"/agent/all-agent"}>
   
   <p className="text-[#09858D] 2xl:-ml-[16rem]   -ml-[6rem] text-start   mt-5 text-2xl font-[500] ">See all 2500  rents estate agent  in lagos</p>
   </Link>
         </div> {/* description */}
 

   

<Article/>


</div>
  )
}

export default page