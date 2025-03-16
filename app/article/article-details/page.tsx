/* eslint-disable */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import PropertyListCard from "@/app/components/common/PropertyListing";
import Button from "@/app/components/common/Button";
import Link from "next/link";

const Breadcrumb = () => {
  return (
    <div className="flex  items-center justify-between gap-[0.2rem] pl-4 py-2 w-full  mt-[5rem]  bg-gray-100">
      {/* Left Section: Back Arrow and Breadcrumb */}
      <div className="flex items-start justify-center  gap-2 text-[1.08rem] font-bricolage text-gray-600">
        {/* Back Arrow */}
        <img src="/arrow-right.png" alt="Back" className="w-3 h-4 mt-1" />

        {/* Breadcrumb Links */}
        <span className="text-gray-500">Search |</span>
        <a href="#" className="text-primary">
          Homes for sale
        </a>
        <span>{">"}</span>
        <a href="#" className="text-primary">
          Nigeria
        </a>
        <span>{">"}</span>
        <a href="#" className="text-primary">
          Lagos
        </a>
        <span>{">"}</span>
        <a href="#" className="text-primary">
          Magodo Estate
        </a>
      </div>

      {/* Right Section: Icons */}
      <div className="flex pl-[33rem] 2xl:pl-[50rem]  items-center gap-2">
        <div className="p-2 border border-[#8F8F8F] rounded-md">
          <img src="/favorite.png" alt="Favorite" className="w-4 h-4" />
        </div>
        <div className="p-2 border border-[#8F8F8F] rounded-md">
          <img src="/upload.png" alt="Download" className="w-4 h-4" />
        </div>
        <div className="p-2 border border-[#8F8F8F] rounded-md">
          <img src="/image2.png" alt="Share" className="w-4 h-4" />
        </div>
      </div>

      <div></div>
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
    <div className="mt-2  2xl:w-[1520px] ">
      {" "}
      <Breadcrumb />
      <div className=" mt-3 relative rounded-lg  flex items-center overflow-hidden">
        <Image
          src="/sell.png" // Replace with actual map image
          alt="Map"
          width={700}
          height={300}
          className="w-[78rem] 2xl:w-full 2xl:h-auto rounded-[20px] h-[38rem]"
        />
      </div>
      <div className="bg-gray-100 px-4  pt-4 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Section */}
          <div>
            <h2 className="text-[1.7rem] font-bricolage font-semibold w-[34rem]">
              Understanding the Real Estate Market Trends
            </h2>
          </div>

          {/* Right Section */}
          <div className="text-right font-bricolage  text-[#1E1E1E] mt-4 md:mt-0">
            <p className="text-[1.2rem] text-black font-[300]">
              By <b> Ruka Oyefeso</b>
            </p>

            <p className="text-gray-600 text-sm">Jan 25, 2025</p>
          </div>
        </div>
      </div>
      {/* second layout */}
      <div className=" w-full px-4 py-3">
        <p className=" text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl py-2">
          The real estate market is a dynamic ecosystem influenced by a
          multitude of factors. Understanding market trends is essential for
          investors, homeowners, and professionals seeking to navigate this
          complex industry. This article explores the key components,
          influencing factors, and strategies for analyzing real estate market
          trends.
        </p>
      </div>
      <div className=" w-full px-4 py-1">
        <p className=" text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl py-2">
          Supply and demand are fundamental aspects of real estate trends. The
          balance between available properties and the number of buyers or
          renters shapes property prices and market activity. A surplus in
          supply often leads to price declines, while high demand with limited
          inventory drives prices up. Monitoring average property prices and
          price growth rates provides insights into market health, which varies
          across regions, property types, and economic conditions. Inventory
          levels, representing the number of properties available for sale, can
          indicate whether the market favors buyers or sellers. Mortgage
          interest rates also significantly impact affordability, with lower
          rates typically boosting buying activity while higher rates may cool
          the market. Economic indicators, such as employment rates, GDP growth,
          and consumer confidence, play a vital role in influencing buyer
          behavior and overall market performance
        </p>
      </div>
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
      <div className=" w-full px-4 py-1">
        <p className=" text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl py-2">
          Several factors influence the real estate market. Economic conditions
          are crucial, as a strong economy fosters market growth through
          increased purchasing power and consumer confidence, while economic
          downturns often suppress real estate activity. Government policies,
          including tax incentives, subsidies, and zoning regulations, can
          either stimulate or restrict market activity. Demographics, such as
          population growth, migration patterns, and generational shifts, shape
          housing demand. For instance, millennials entering the housing market
          can drive demand for starter homes. Technological advancements, like
          real estate platforms and virtual tours, are reshaping how properties
          are marketed and sold. Local market dynamics, including job
          availability, school quality, and infrastructure development, create
          varying conditions across regions.
        </p>
      </div>
      <div className=" w-full px-4 py-1">
        <p className=" text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl py-2">
          Analyzing market trends requires a strategic approach. Leveraging data
          analytics is essential for examining property values, rental yields,
          and market growth trends. Data-driven insights help identify
          profitable opportunities. Monitoring economic indicators such as
          inflation, employment rates, and GDP growth is crucial for predicting
          market shifts. Staying updated on policy changes, including local and
          national regulations, ensures informed decision-making. Analyzing
          comparable properties, by evaluating recent sales of similar
          properties in the area, provides a clear understanding of market value
          and trends. Engaging with industry experts, such as real estate
          agents, brokers, and market analysts, offers valuable professional
          insights.
        </p>
      </div>
      {/* third layout */}
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
      <div className=" w-full px-4 py-1">
        <p className=" text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl py-2">
          Current and emerging trends highlight significant shifts in the
          market. The rise of remote work has increased demand for suburban and
          rural properties, as buyers prioritize space and home offices.
          Sustainability is becoming a key focus, with green building practices
          and energy-efficient homes gaining traction due to environmental
          concerns and cost savings. Technological integration is enhancing the
          real estate industry, with smart home technologies and AI-driven
          platforms improving buyer experiences and property management. Urban
          redevelopment efforts, including revitalizing downtown areas and
          creating mixed-use developments, are attracting younger populations
          and fostering vibrant communities.
        </p>
      </div>
      <div className=" w-full px-4 py-1">
        <p className=" text-[#8F8F8F] font-bricolage text-[19px] w-[75rem] 2xl:w-full 2xl:text-xl py-2">
          Understanding real estate market trends requires a multifaceted
          approach, considering economic, demographic, and local factors. By
          leveraging data, staying informed, and seeking professional advice,
          stakeholders can make informed decisions and capitalize on market
          opportunities. As the industry evolves, staying adaptable and
          forward-thinking will remain key to success.
        </p>
      </div>
     
      <section className="mt-10  hidden pl-[12rem] 2xl:mt-[4em] lg:mt-[3em] w-[65rem]  2xl:w-[88rem]  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex    2xl:-mb-[5rem]    flex-col items-center justify-center">
          <div className="flex   p-2  2xl:pl-[7rem] flex-col w-[75rem]  2xl:w-[100rem]  md:flex-row 2xl:gap-[30%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
            <h1 className="text-black   text-[26px] lg:text-[1.8rem] font-[600]   w-full ">
              {" "}
              Single Family House Rents
            </h1>
            <p className="text-gray  lg:p-0 text-base  lg:text-xl font-bricolage w-full lg:w-full">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col  2xl:mb-[4rem] 2xl:ml-[6rem]  ">
            <div className=" flex mt-[1em]    min-w-fit items-center lg:flex-row    justify-center  mb-2">
              {/* Horizontal Scrollable Container on Mobile */}
              {/* Card 1 */}
              <PropertyListCard
                imageSrc={"/afforable-1.png"}
                altText={"rent6"}
                price={"18,000.00"}
                area={""}
              />
              <PropertyListCard
                imageSrc={"/afforable-2.png"}
                altText={"rent6"}
                price={"18,000.00"}
                area={""}
              />

              <PropertyListCard
                imageSrc={"/house1.png"}
                altText={"rent6"}
                price={"4000.00"}
                area={""}
              />
            </div>
          </div>
        </div>
      </section>
      {/* description */}
      <div className="2xl:w-full">

    
        {/* New-articles */}
    <section className="   flex justify-center items-center  w-full  flex-col mt-[4rem] p-5 lg:p-0 font-bricolage ">
    <div className="flex w-full   flex-col lg:flex-row md:flex-row  2xl:w-[106rem]  lg:gap-8  justify-around items-center  ">
    <span className="flex flex-col  font-bricolage 2xl:ml-0 lg:-ml-1 gap-2">


      <h1 className="text-black  lg:text-[2.5rem] 2xl:text-5xl font-[600] mr-2 ">New Highlights & Articles</h1>
      <p className="text-gray  2xl:text-[20px] lg:p-0 text-base  lg:text-xl font-bricolage w-full lg:w-[30em]">
      Our top stories and features keeps you updated on industry trends, current events</p>

      
      </span>
      <span className=" hidden lg:flex flex-col font-bricolage gap-3 text-gray">
      <p className="text-gray 2xl:text-[20px]  lg:p-0 text-base lg:text-xl font-bricolage 2xl:w-[30em]  lg:w-[24em]">
      Stay Informed with our latest news and Insights where you’ find breaking stories</p>
<Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px]  text-gray">
 <p className="text-gray" style={{color:"#8F8F8F"}}> Explore </p>
</Button>
</span>
   
</div>
    <div className="flex justify-center w-full mt-[4%] lg:flex-1 lg:flex-row flex-col  items-center lg:gap-12 2xl:gap-16 ">
  
    <Link href={"/article/article-details"}> 
      <div className="relative flex flex-col h-[650px]   lg:w-[36em] 2xl:w-[44em]  font-bricolage  rounded-lg shrink-0">
  {/* Image Section */}
  <Image
    alt="house image"
    width={400}
    height={300}
    loading="lazy"
    src={'/news-1.png'}
    className="rounded-2xl 2xl:h-[30rem]  w-full object-cover h-[400px]"
  />

  {/* Content Section */}
  <div className="flex flex-col my-4  relative">
    {/* Title */}
    <div className="flex gap-3">
    <h1 className="text-4xl font-[600] text-primary absolute`">01</h1>
    <h1 className="text-black text-2xl w-[30rem] ml-3  2xl:text-[2rem] 2xl:w-[50rem] font-[500] pt-[15px]">
    Understanding the Real Estate Market Trends</h1>
    </div>
    {/* Price and Area */}
    <div className="flex flex-wrap flex-end gap-3 mt-4">
      <div className="flex ">
      <span className="flex  flex-col text-gray lg:text-[18px] text-sm  gap-2 font-meduim">
   <h4 className="text-gray  lg:text-[18px]  text-sm font-meduim">July </h4><h4 className="text-[18px]">2024</h4>     </span>  
   <h2 className="ml-4 mt-[24px] text-gray font-[400] lg:text-[18px]">
   Perfect property</h2>
      </div>
   
    </div>

    {/* Description */}
    <p className="text-gray text-[1rem]  2xl:text-xl font-bricolage fomt-[300] w-full leading-5 mt-4">
    Staying ahead the real estate market requires a keen understanding of the latest trends and shifts. By analyzing current data and market indicators, you can make informed decisions whether you’re buyin, selling, or investing. 
    </p>
  </div>

  {/* Footer Section */}
  {/* <div className="absolute flex items-center justify-between bottom-4 left-4 right-4">
    <div className="flex items-center justify-center px-4 py-2 text-sm font-light text-[#1E1E1E] bg-[#D8F0F1] rounded-full">
      Luxury Oasis
    </div>
    <Image
      alt="export icon"
      width={40}
      height={40}
      src={'/export.png'}
      className="rounded-full"
    />
  </div> */}
</div></Link>
<Link href={"/article/article-details"}> 
<div className="relative flex flex-col h-[650px]   lg:w-[36em] 2xl:w-[44em]  font-bricolage  rounded-lg shrink-0">
  {/* Image Section */}
  <Image
    alt="house image"
    width={400}
    height={300}
    loading="lazy"
    src={'/news-2.png'}
    className="rounded-2xl 2xl:h-[30rem]  w-full object-cover h-[400px]"
  />

  {/* Content Section */}
  <div className="flex flex-col my-4  relative">
    {/* Title */}
    <div className="flex gap-3">
    <h1 className="text-4xl font-[600] text-primary absolute`">01</h1>
    <h1 className="text-black text-2xl w-[30rem] ml-3  2xl:text-[2rem] 2xl:w-[50rem] font-[500] pt-[15px]">
    Analyzing Modern Real Estate Market Movement</h1>
    </div>
    {/* Price and Area */}
    <div className="flex flex-wrap flex-end gap-3 mt-4">
      <div className="flex ">
      <span className="flex  flex-col text-gray lg:text-[18px] text-sm  gap-2 font-meduim">
   <h4 className="text-gray  lg:text-[18px]  text-sm font-meduim">July </h4><h4 className="text-[18px]">2024</h4>     </span>  
   <h2 className="ml-4 mt-[24px] text-gray font-[400] lg:text-[18px]">Perfect property</h2>
      </div>
   
    </div>

    {/* Description */}
    <p className="text-gray text-[1rem]  2xl:text-xl font-bricolage fomt-[300] w-full leading-5 mt-4">
    Staying ahead the real estate market requires a keen understanding of the latest trends and shifts. By analyzing current data and market indicators, you can make informed decisions whether you’re buyin, selling, or investing. 
    </p>
  </div>

  {/* Footer Section */}
  {/* <div className="absolute flex items-center justify-between bottom-4 left-4 right-4">
    <div className="flex items-center justify-center px-4 py-2 text-sm font-light text-[#1E1E1E] bg-[#D8F0F1] rounded-full">
      Luxury Oasis
    </div>
    <Image
      alt="export icon"
      width={40}
      height={40}
      src={'/export.png'}
      className="rounded-full"
    />
  </div> */}
</div>
</Link>

</div>



    </section>    </div>
    </div>
  );
};

export default page;
