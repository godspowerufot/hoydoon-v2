'use client'
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "./components/common/Button";
import Link from "next/link";
import { FaStar } from 'react-icons/fa';
import TestimonialCarousel from "./components/layouts/testimonials";
import FAQComponent from "./components/layouts/faq";
import { useState } from "react";


export default function Home() {
  const [isShrunk, setIsShrunk] = useState(false);
  return (
    <>
    <header className="relative h-[45em] lg:h-[52em] w-full ">
  {/* Background Image Div */}
  <div
    className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
    style={{ backgroundImage: "url('/header.svg')" }}
  ></div>

  {/* Content Section */}
  <div className="flex z-[1] relative gap-6 justify-center items-center flex-col">
    {/* Main Heading */}
    <h1 className="lg:w-[10em] mt-[2em] lg:mt-[1.4em] text-white text-[2em] w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
      Where Every House Feels Like Home
    </h1>

    {/* Subheading */}
    <h2 className="text-[1.5em] font-[400] text-center text-[#FFFFFFB2] w-[32em]">
      From urban flats to rural getaways, Hoydoon effortlessly links you to the home of your dreams with trust and ease.
    </h2>

    {/* Large Screen Search Bar */}
    <div className="hidden lg:flex justify-center items-center w-full">
      <div className="flex pl-[2.5%] h-[4em] font-bricolage items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[58em]">
        {/* Location */}
        <div className="flex flex-col flex-1">
          <span className="text-[1.2em] font-semibold text-black">Location</span>
          <div className="text-[1em] text-gray">Search Locations</div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Type */}
        <div className="flex flex-col flex-1 ml-[3%]">
          <span className="text-[1.2em] font-semibold text-black">Type</span>
          <div className="text-[1em] text-gray">Add type</div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Price Range */}
        <div className="flex flex-col flex-1 ml-[3%]">
          <span className="text-[1.2em] font-semibold text-black">Price Range</span>
          <div className="text-[1em] text-gray">Add range</div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Number of Guests */}
        <div className="flex flex-col flex-1 ml-[3%]">
          <span className="text-[1.2em] font-medium text-black">Number of Guests</span>
          <div className="text-[1em] text-gray">Add number</div>
        </div>

        {/* Search Button */}
        <div className="bg-primary p-3 ml-8 mr-3 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
          <FaSearch className="text-white h-[20px] w-6 font-light text-sm" />
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

  {/* Statistics Section */}
  <div className="absolute bottom-0 lg:flex font-bricolage lg:mt-8 justify-center items-center w-full py-10 px-4">
    <div className="flex items-center rounded-lg w-9/10 md:w-4/5 lg:w-7/10">
      {/* Hosts Section */}
      <div className="flex flex-1 text-center gap-2 px-4">
        <span className="text-13xl text-white">10M+</span>
        <span className="text-xl w-[175px] text-start text-white">
          hosts welcome guests worldwide
        </span>
      </div>

      {/* Vertical Divider */}
      <div className="h-12 w-[1px] bg-white mx-2 my-1"></div>

      {/* Unique Stays Section */}
      <div className="flex flex-1 text-center px-4 gap-2">
        <span className="text-13xl text-white">15M+</span>
        <span className="text-xl w-[179px] text-start text-white">
          Unique stays across 150K+ cities
        </span>
      </div>

      {/* Vertical Divider */}
      <div className="h-12 w-[1px] bg-white mx-2 my-1"></div>

      {/* Guest Arrivals Section */}
      <div className="flex gap-2 flex-1 text-center px-4">
        <span className="text-13xl text-white">12M+</span>
        <span className="text-xl w-[175px] text-start text-white">
          guest arrivals to date every month
        </span>
      </div>
    </div>
  </div>
</header>
      {/* this hold the images */}
      <section className="   font-bricolage lg:flex justify-center flex-col flex-1 items-center bg-white">
        <div className="flex  gap-[4%] flex-col w-[92%]  lg:my-[4em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex flex-col w-full lg:w-6/10 ">
<h1 className="text-black  text-[26px] lg:text-24xl font-[600] 2xl:w-[80%]">Find your ideal property with simple tools and guidance.</h1>
<p className="text-gray text-base lg:text-lgi font-bricolage w-9/10 2xl:text-[20px] 2xl:w-[70%]">
Enjoy fast and easy access to a variety of properties that suit your needs. Use our smart filters to find the perfect places within your budget and preferences. We’ve done the hard work for you, so no need to stress about the search.
</p>

<Button className="text-base font-light mt-5 ">
  <Link href="/explore">
  explore
  </Link>
</Button>
          </span>

<span className="mt-4 lg:mt-0">
 <Image
              alt="image1"
              width={500}  // Reduced size of logo
              height={400} // Reduced size of logo
              src={'/house-app.png'}
            />
</span>
        </div>
      </section>
      <section className="mt-10 lg:my-[4em]  font-bricolage flex justify-center flex-col flex-1 items-center">
        <div className="flex  w-[92%] flex-col lg:flex-row  items-center justify-around ">
          <span className="flex flex-col w-full lg:w-6/10 ">
<h1 className="text-black  text-[26px] lg:text-24xl font-[600]">Get the Hoydoon App</h1>
<p className="text-gray text-base lg:text-lgi  2xl:text-[20px] font-bricolage w-8/10">
Download our highly-rated real estate app for iOS or Android to receive instant alerts when your dream home becomes available.</p>

<Button className="text-base font-light mt-5 ">
  <Link href="/download">
  Download
  </Link>
</Button>
          </span>

<span className="mt-4 lg:mt-0">
 <Image
              alt="image1"
              width={500}  // Reduced size of logo
              height={500} // Reduced size of logo
              src={'/app.svg'}
              className="lg:w-[500px]"
            />
</span>
        </div> 
      </section>
      <section className="mt-10  hidden lg:my-[4em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]  2xl:w-[89%] flex-col items-center justify-center">
      <div className="flex   p-2 flex-col md:flex-row 2xl:gap-[20%] my-[2em] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-2 text-[26px] lg:text-23xl font-[600]   w-full ">Featured Properties for Rent</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-5xl font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestylecrafted to fit your taste and needs.
</p>

      

</div>
<div className=" flex mt-3   min-w-fit items-center lg:flex-row   gap-x-[2.25em] justify-center  mb-2">
  {/* Horizontal Scrollable Container on Mobile */}
    {/* Card 1 */}
    <div
      className="flex flex-col h-fit lg:w-[31%] font-bricolage snap-center shrink-0"
      onMouseEnter={() => setIsShrunk(true)}
    >
      <div
        className={`overflow-hidden rounded-lg w-full transition-all duration-500 ${
          isShrunk ? "h-[300px] scale-95" : "h-[400px] scale-100"
        }`}
      >
        <Image
          alt="image1"
          width={300}
          height={400}
          src="/house1.png"
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>
      <span className="mt-4 text-black">
        <span className="flex gap-3">
          <h4 className="text-gray font-light">From</h4>
          <h2 className="font-bold">$2500.00</h2>
        </span>
        <h4 className="text-gray font-light">Area from 190 - 245 m²</h4>
      </span>
    </div>
    <div className="flex flex-col h-fit lg:w-[31%] border border-gray border-1 border-solid rounded-[20px] w-3/10 font-bricolage snap-center shrink-0">
    <Image
        alt="image1"
        width={400}
        height={200}
        src={'/house-2.png'}
        className="rounded-b-[20px] -mt-1  w-full  object-cover h-auto"
      />
     <span className="mt-4 mb-2  ml-5 w-9/10 text-black flex-col">
        <h1 className="text-black text-base lg:text-[25px] font-bold">
          Whispering Pines Estate
        </h1>
        <span className="flex-col flex mt-3">
          <span className="flex gap-1">
            <h4 className="text-gray text-label flex items-center justify-center font-light">
              From
            </h4>
            <h2 className="font-bold">$2500.00</h2>
            <h4 className="ml-9 text-label text-gray font-light">
              Area from 190 - 245 m²
            </h4>
          </span>
          <p className="text-gray text-[16px] mt-4">
            A cozy 3-bedroom home with an open living area and a private
            backyard. Perfect for comfort and relaxation.
          </p>
          <div className=" mt-9  flex justify-between items-center ">
            <div className="text-base  flex justify-center font-bricolage items-center  rounded-full font-light h-[41px] lg:w-[180px] text-[#1E1E1E] bg-[#D8F0F1] ">
              Luxury Oasis
            </div>
            <Image
        alt="image1"
        width={50}
        height={50}
        src={'/export.png'}
        className="rounded-full "
      />
          </div>
        </span>
      </span>
    </div>
    <div className="flex flex-col h-fit lg:w-[31%] font-bricolage snap-center shrink-0">
      <Image
        alt="image1"
        width={300}
        height={400}
        src={'/house1.png'}
        className="rounded-lg w-full"
      />
      <span className="mt-4 text-black">
        <span className="flex gap-3">
          <h4 className="text-gray font-light">From</h4>
          <h2 className="font-bold">$2500.00</h2>
        </span>
        <h4 className="text-gray font-light">Area from 190 - 245 m²</h4>
      </span>
    </div>


   
  </div>


</div>
      
      </section>

{/* card component */}
    



{/* carousel */}

<section className="lg:mt-[6%]  p-5 item-center justify-center  lg:p-0 items-center flex flex-col font-bricolage  ">
  <div className=" item-center justify-center  flex flex-col">


<div className="flex  lg:w-[80em] 2xl:w-[95em] p-2 flex-col md:flex-row lg:flex-row md:gap-10  lg:gap-10  justify-around items-center  md:items-start ">
      <h1 className="text-black lg:ml-2 text-[26px] lg:text-23xl font-[600]   w-full ">Explore Luxurious Living Spaces</h1>
      <p className="text-gray  2xl:texxt-end  2xl:ml-[10%] lg:p-0 text-base lg:text-5xl font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestylecrafted to fit your taste and needs.
</p>
</div>
<div className="lg:p-5 font-bricolage">
      <div className="relative  lg:h-[850px] h-[500px] rounded-lg flex flex-col">
        {/* Background Image and Content */}
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          {/* Background Image */}
          <Image
            src="/carousel.jpg"
            alt="Carousel Background"
            fill
            priority
            sizes="(max-width: 1024px)  100vw, 80vw"
            className="object-cover rounded-[24px]"
          />
          {/* Black Transparent Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

          {/* Content Inside Image */}
          <div className="lg:absolute h-[43%] relative top-[5rem] lg:top-[28rem] lg:bottom-10 left-3 bg-primarytransparent w-full lg:w-8/10 lg:h-auto p-5 rounded-lg shadow-lg z-10">
        {/* Property Info */}
        <div className="bg-white rounded-[24px] w-full h-fit lg:h-auto p-8  shadow-lg z-10">
          <h1 className="text-black text-base lg:text-23xl font-[600]">Laurel Canyon Nest</h1>
          <p className="text-gray lg:text-base text-[10px] mt-2">
            A charming 3-bedroom home featuring a bright, open-concept living area designed for both comfort and connection. The spacious layout flows seamlessly from the kitchen to the dining and living spaces, making it perfect for gatherings. Step outside to a private backyard, ideal for relaxing, entertaining, or enjoying a bit of gardening. This home offers the perfect blend of functionality and tranquility for everyday living.
          </p>

          <div className="flex font-bricolage items-center mt-5">
            {/* Property Details */}
            <div className="flex flex-col-reverse flex-1 px-1 py-3">
              <span className="text-sm font-semibold text-black">1,00sqft</span>
              <div className="text-sm text-gray">Size</div>
            </div>

            {/* Vertical Divider */}
            <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

            <div className="flex flex-col-reverse flex-1 px-4 py-3">
              <span className="text-sm font-semibold text-black">Berbera, Somalia</span>
              <div className="text-sm text-gray">Location</div>
            </div>

            {/* Vertical Divider */}
            <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

            <div className="flex flex-col-reverse flex-1 px-4 py-3">
              <span className="text-sm font-semibold text-black">
                <span className="flex lg:flex-row flex-col items-center justify-start text-sm">
                  <FaStar className="text-[#E0DA18]" /> 5.0{' '}
                  <p className="text-gray text-[10px] lg:block lg:text-[10px] hidden">(200 reviews)</p>
                </span>
              </span>
              <div className="text-sm text-gray">Reviews</div>
            </div>
          </div>
        </div>
      </div>

          {/* Navigation Buttons at Bottom Right */}
          <div className="absolute bottom-5 right-5 flex gap-3 z-50">
            {/* Previous Button */}
            <div className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-3 w-12 h-12 shadow-md cursor-pointer hover:bg-gray-200">
                 <Image
                         alt="logo"
                         width={20}  
                         loading='lazy'
                         height={20} // Reduced size of logo
                         src={'/left.png'}
                       className="text-gray w-[9px]  text-lg" />
            </div>
            {/* Next Button */}
            <div className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-3 w-12 h-12 shadow-md cursor-pointer hover:bg-gray-200">
            <Image
                         alt="logo"
                         width={20}  
                         loading='lazy'
                         height={20} // Reduced size of logo
                         src={'/right.png'}
                       className="text-gray w-[9px]  text-lg" />
                 </div>
          </div>
        </div>
      </div>
    </div>
    </div>



  </section>
  {/* testimonials */}
  <section className="mt-8 p-4 lg:p-0 font-bricolage ">
  <div className="flex  flex-col lg:flex-row md:flex-row  lg:gap-10  justify-around items-center  ">
    <span className="flex   2xl:w-[38%] flex-col font-bricolage gap-3">


      <h1 className="text-black  text-[26px] lg:text-23xl font-[600] mr-10">What People Are Saying</h1>
      <p className="text-gray  lg:p-0 text-base 2xl:text-[20px] lg:text-base font-bricolage w-full lg:w-[30em]">
Discover a home where every detail enhances your lifestyle—crafted to fit your taste and needs.</p>

      
      </span>
      <span className=" hidden lg:flex flex-col font-bricolage gap-3 ">
      <p className="text-gray  lg:p-0 text-base 2xl:text-[20px] lg:text-base font-bricolage w-full lg:w-[30em]">
Discover a home where every detail enhances your lifestyle—crafted to fit your taste and needs.</p>
<Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px]  group-hover:text-white text-white" >
<p className="text-gray group-hover:text-white" style={{color:"text-white"}}>
Explore
  </p> 
</Button>
</span>
   
</div>
<div className="mt-7">
<TestimonialCarousel/>
</div>
    </section>  
    
      {/* testimonials */}
  <section className=" mt-7  lg:mt-[10%]  flex flex-1 justify-center items-center  flex-col   p-5 lg:p-0 font-bricolage ">
  <div className="flex 2xl:w-full   flex-col lg:flex-row md:flex-row   lg:gap-10  justify-around items-center  ">
    <span className="flex flex-col  font-bricolage gap-3">


      <h1 className="text-black  text-[26px] lg:text-23xl font-[600] mr-10">Your Questions, Our Answers</h1>
      <p className="text-gray  2xl:text-[20px] lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-[30em]">
      Whether you’re curious about our services, need help with specific issues..</p>

      
      </span>
      <span className=" hidden lg:flex flex-col font-bricolage gap-3 text-gray">
      <p className="text-gray 2xl:text-[20px]  lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-[30em]">
      Welcome to our FAQ center, where you can find answers to all your most pressuring questions</p>
<Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px]  text-gray">
 <p className="text-gray" style={{color:"#8F8F8F"}}> Explore </p>
</Button>
</span>
   
</div>
<div className="mt-7 justify-center items-center max-md:w-full w-full gap-6 flex flex-col max-md:justify-center max-md:items-center lg:flex-row mb-5">
<div className="z-20 relative max-md:w-full  lg:h-[50em]  lg:left-[50px] lg:top-[10em]">
<FAQComponent/>
</div>
<div className="relative lg:-ml-[15em] justify-center items-center  flex w-[255px] lg:w-auto">


      <Image
        alt="image1"
        width={420}
        loading="lazy"
        height={500}
        src={'/q1.png'}
        className="z-10  lg:w-[552px] rounded-[20px] relative top-0 left-[0.5rem]   object-cover h-5/10"
      /> <Image
      alt="image1"
      width={400}
      loading="lazy"
      height={300}
      src={'/q2.png'}
      className=" z-2   bottom-[2em]   w-[86px] lg:w-[620px] mt-[17%] lg:-top-[2rem] lg:-left-[10em]  lg:mt-[11%] relative rounded-lg   object-cover h-3/10"
    />
    </div>
</div>
    </section> 
    {/* New-articles */}
    <section className="   flex justify-center items-center  w-full  flex-col mt-10 p-4 lg:p-0 font-bricolage ">
    <div className="flex justify-center w-full mt-4 lg:flex-1 lg:flex-row flex-col  items-center gap-10 ">
    <div className="relative flex flex-col h-[650px]   lg:w-[38em] 2xl:w-[45em]  font-bricolage  rounded-lg  shrink-0">
  {/* Image Section */}
  <Image
    alt="house image"
    width={400}
    height={300}
    loading="lazy"
    src={'/news-1.png'}
    className="rounded-t-lg  w-full object-cover h-[300px]"
  />

  {/* Content Section */}
  <div className="flex flex-col p-4 relative">
    {/* Title */}
    <div className="flex gap-3">
    <h1 className="text-13xl text-primary absolute`">01</h1>
    <h1 className="text-black text-10xl font-[500] pt-[10px]">Analyzing Modern Real Estate Market Movement</h1>
    </div>
    {/* Price and Area */}
    <div className="flex flex-wrap flex-end gap-3 mt-2">
      <div className="flex ">
      <span className="flex  flex-col text-gray lg:text-xl text-sm font-meduim">
   <h4 className="text-gray lg:text-xl f text-sm font-meduim">July </h4><h4>2024</h4>     </span>  
        <h2 className="ml-2 mt-[17px] text-gray  font-meduim lg:text-xl ">Perfect property</h2>
      </div>
   
    </div>

    {/* Description */}
    <p className="text-gray text-sm  lg:text-[15.8px] font-bricolage w-full leading-5 mt-4">
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
<div className="relative flex flex-col h-[650px]  2xl:w-[45em] lg:w-[38em]  font-bricolage  rounded-lg  shrink-0">
  {/* Image Section */}
  <Image
    alt="house image"
    width={400}
    height={300}
    loading="lazy"
    src={'/news-2.png'}
    className="rounded-t-lg  w-full object-cover h-[300px]"
  />

  {/* Content Section */}
  <div className="flex flex-col p-4 relative">
    {/* Title */}
    <div className="flex gap-3">
    <h1 className="text-13xl text-primary absolute`">01</h1>
    <h1 className="text-black text-10xl font-[500] pt-[10px]">Analyzing Modern Real Estate Market Movement</h1>
    </div>
    {/* Price and Area */}
    <div className="flex flex-wrap flex-end gap-3 mt-2">
      <div className="flex ">
      <span className="flex  flex-col text-gray lg:text-xl text-sm font-meduim">
   <h4 className="text-gray lg:text-xl f text-sm font-meduim">July </h4><h4>2024</h4>     </span>  
        <h2 className="ml-2 mt-[17px] text-gray  font-meduim lg:text-xl ">Perfect property</h2>
      </div>
   
    </div>

    {/* Description */}
    <p className="text-gray text-sm  lg:text-[15.8px] font-bricolage w-full leading-5 mt-4">
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

</div>



    </section>  
    
      </>
  );
}
