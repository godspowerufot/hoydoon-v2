import Image from "next/image";
import Navbar from "./components/layouts/navbar";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import Button from "./components/common/Button";
import Link from "next/link";
import { FaStar } from 'react-icons/fa';
import TestimonialCarousel from "./components/layouts/testimonials";
import FAQComponent from "./components/layouts/faq";
export default function Home() {
  return (
    <>
       <header className="relative  h-[1084px]  w-full">
  
  <div className="absolute top-0 left-0 w-full h-full">
    <Image
      alt="Header Background"
      src="/header.svg"
      layout="fill"
      objectFit="cover"
      quality={100}
      className="z-[-1] "
    />
  </div>

  {/* Navbar */}
  <Navbar />

  {/* Content Section */}
  <div className="p-4 flex  gap-6 justify-center items-center flex-col">
    {/* Main Heading */}
    <h1 className="lg:w-5/10 text-white text-[2.3rem] w-full text-center lg:text-[4.2rem] font-bricolage font-bold">
      Where Every House Feels Like Home
    </h1>

    {/* Subheading */}
    <h2 className="text-base font-normal lg:text-13xl text-center text-[#FFFFFFB2] w-full lg:w-[1007px]">
      From urban flats to rural getaways, Hoydoon effortlessly links you to the home of your dreams with trust and ease.
    </h2>

    {/* Large Screen Search Bar */}
    <div className="hidden  lg:flex justify-center  items-center w-full ">
      <div className="flex font-bricolage items-center m-5 bg-white rounded-full shadow-md w-10/12 md:w-4/5 lg:w-3/5">
        {/* Location */}
        <div className="flex flex-col flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">Location</span>
          <div className="text-sm text-gray">Search Locations</div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Type */}
        <div className="flex flex-col flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">Type</span>
          <div className="text-sm text-gray">Add type</div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Price Range */}
        <div className="flex flex-col flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">Price Range</span>
          <div className="text-sm text-gray">Add range</div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Number of Guests */}
        <div className="flex flex-col flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">Number of Guests</span>
          <div className="text-sm text-gray">Add number</div>
        </div>

        {/* Search Button */}
        <div className="bg-primary p-3 mr-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
          <FaSearch className="text-white text-sm" />
        </div>
      </div>
    </div>

    {/* Small Screen Search Bar */}
    <div className="lg:hidden justify-center items-center w-full px-2 py-3">
      <div className="flex font-bricolage items-center m-5 bg-white rounded-full shadow-md w-[89%] md:w-4/5 lg:w-3/5">
        <div className="flex flex-col flex-1 px-2 py-3">
          <div className="text-sm text-gray">
            Address, Neighborhood, City, Zip code...
          </div>
        </div>
        <div className="bg-primary p-3 mr-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
          <FaSearch className="text-white text-sm" />
        </div>
      </div>
    </div>
  </div>

  {/* Statistics Section */}
 {/* Stats Section */}
 <div className="hidden absolute bottom-0 lg:flex font-bricolage lg:mt-8 justify-center items-center w-full py-10 px-4">
    <div className="flex items-center rounded-lg w-11/12 md:w-4/5 lg:w-3/5">
      {/* Hosts Section */}
      <div className="flex flex-1 text-center gap-2 px-4">
        <span className="text-3xl text-white">10M+</span>
        <span className="text-sm text-start text-white">
          hosts welcome guests worldwide
        </span>
      </div>

      {/* Vertical Divider */}
      <div className="h-12 w-[1px] bg-white mx-2 my-1"></div>

      {/* Unique Stays Section */}
      <div className="flex flex-1 text-center px-4 gap-2">
        <span className="text-3xl text-white">15M+</span>
        <span className="text-sm text-start text-white">
          Unique stays across 150K+ cities
        </span>
      </div>

      {/* Vertical Divider */}
      <div className="h-12 w-[1px] bg-white mx-2 my-1"></div>

      {/* Guest Arrivals Section */}
      <div className="flex gap-2 flex-1 text-center px-4">
        <span className="text-3xl text-white">12M+</span>
        <span className="text-sm text-start text-white">
          guest arrivals to date every month
        </span>
      </div>
    </div>
  </div>
</header>
      {/* this hold the images */}
      <section className=" font-bricolage bg-white">
        <div className="flex  p-8 flex-col lg:flex-row  items-center justify-around ">
          <span className="flex flex-col w-full lg:w-6/10 ">
<h1 className="text-black  text-[26px] lg:text-24xl font-[600]">Find your ideal property with simple tools and guidance.</h1>
<p className="text-gray text-base lg:text-lgi font-bricolage w-9/10">
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
              height={500} // Reduced size of logo
              src={'/house-app.png'}
            />
</span>
        </div>
      </section>
      <section className="mt-10 font-bricolage">
        <div className="flex  p-8 flex-col lg:flex-row  items-center justify-around ">
          <span className="flex flex-col w-full lg:w-6/10 ">
<h1 className="text-black  text-[26px] lg:text-24xl font-[600]">Get the Hoydoon App</h1>
<p className="text-gray text-base lg:text-lgi font-bricolage w-9/10">
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
            />
</span>
        </div> 
      </section>

{/* card component */}
    
<section className="lg:mt-3  lg:p-0 flex flex-col font-bricolage w-full">
    <div className="flex flex-col">
      <div className="flex  p-2 flex-col md:flex-row lg:flex-row md:gap-10  lg:gap-10  justify-around items-center  md:items-start ">
      <h1 className="text-black lg:ml-2 text-[26px] lg:text-23xl font-[600]  lg:mr-10 w-full ">Featured Properties for Rent</h1>
      <p className="text-gray pl-4  lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestyle—crafted to fit your taste and needs.
</p>

      
</div>
<div className="p-3 flex lg:m-3 flex-col lg:flex-col mb-5">
  {/* Horizontal Scrollable Container on Mobile */}
  <div className="flex gap-10 overflow-x-scroll lg:overflow-x-visible flex-nowrap snap-x snap-mandatory scroll-smooth">
    {/* Card 1 */}
    <div className="flex flex-col h-[500px] w-[400px] font-bricolage snap-center shrink-0">
      <Image
        alt="image1"
        width={400}
        height={400}
        src={'/house1.png'}
        className="rounded-lg"
      />
      <span className="mt-4 text-black">
        <span className="flex gap-3">
          <h4 className="text-gray font-light">From</h4>
          <h2 className="font-bold">$2500.00</h2>
        </span>
        <h4 className="text-gray font-light">Area from 190 - 245 m²</h4>
      </span>
    </div>

    {/* Card 2 */}
    <div className="relative flex object-cover flex-col h-[530px] w-[400px] font-bricolage border-[#8F8F8F] border-solid border-[1px] rounded-lg snap-center shrink-0">
      <Image
        alt="image1"
        width={400}
        height={200}
        src={'/house-2.png'}
        className="rounded-b-lg  object-cover h-[300px]"
      />
      <span className="mt-4 m-10 text-black flex-col">
        <h1 className="text-black text-base lg:text-base font-bold">
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
          <p className="text-gray text-[12px] mt-4">
            A cozy 3-bedroom home with an open living area and a private
            backyard. Perfect for comfort and relaxation.
          </p>
          <div className="absolute  flex justify-around gap-[9em] items-center bottom-3 left-0">
            <div className="text-base h-[2em] flex justify-center font-bricolage items-center px-4 py-2 rounded-full font-light w-[10em] text-[#1E1E1E] bg-[#D8F0F1] ml-7">
              Luxury Oasis
            </div>
            <Image
        alt="image1"
        width={50}
        height={50}
        src={'/export.png'}
        className="rounded-full"
      />
          </div>
        </span>
      </span>
    </div>

    {/* Card 3 */}
    <div className="flex flex-col object-contain h-[500px] w-[400px] font-bricolage snap-center shrink-0">
      <Image
        alt="image1"
        width={400}
        height={400}
        src={'/house-3.png'}
        className="rounded-lg"
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


</div>
</section>


{/* carousel */}

<section className="lg:mt-10  p-5 item-start  lg:p-0 flex flex-col font-bricolage w-full  ">
  
<div className="flex  flex-col lg:flex-row md:flex-row  lg:gap-10  justify-around items-center  ">
      <h1 className="text-black  text-[26px] lg:text-23xl font-[600] mr-10">Explore Luxurious Living Spaces</h1>
<p className="text-gray  lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-[30em]">
Discover a home where every detail enhances your lifestyle—crafted to fit your taste and needs.</p>

      
</div>
<div className=" lg:p-5 font-bricolage">
  <div className="relative w-full h-[500px] rounded-lg flex items-center justify-center">
    {/* Background Image */}
    <div
      style={{
        backgroundImage: "url('/carousel.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative  top-0 left-0 w-full h-full rounded-lg"
    >

    {/* Black Transparent Overlay */}
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-lg"></div>

    {/* Content Overlay */}

    <div className="lg:absolute relative  top-[5rem] lg:top-40  lg:bottom-10 left-3 bg-primarytransparent  w-full lg:w-8/10 lg:h-auto  p-5 rounded-lg shadow-lg z-10">
      {/* Property Info */}
      <div className=" bg-white w-full h-1/2 lg:h-auto p-8 rounded-lg shadow-lg  z-10">
      {/* Property Info */}
      <h1 className="text-black  text-base lg:text-23xl font-[600]">

      Laurel Canyon Nest
      </h1>
      <p className="text-gray lg:text-base text-[10px] ">
      A charming 3-bedroom home featuring a bright, open-concept living area designed for both comfort and connection. The spacious layout flows seamlessly from the kitchen to the dining and living spaces, making it perfect for gatherings. Step outside to a private backyard, ideal for relaxing, entertaining, or enjoying a bit of gardening. This home offers the perfect blend of functionality and tranquility for everyday living.
      </p>
      <div className="flex font-bricolage items-center mt-5 ">
        
           {/* Type */}
           <div className="flex flex-col-reverse  flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">
          
          1,00sqft</span>
          <div className="text-sm text-gray">
          size

          </div>
        </div>
        {/* Location */}
            {/* Vertical Divider */}
            <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

     

        <div className="flex flex-col-reverse flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">
          Berbera, Somalia
          </span>
          <div className="text-sm text-gray">
            Location
          </div>
        </div>

    
        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Price Range */}
        <div className="flex flex-col-reverse flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">
          <span className="flex lg:flex-row flex-col  items-center text-sm">
          <FaStar className="text-[#E0DA18]"/> 5.0 <p className="text-gray  text-[10px] lg:block  lg:text-[10px] hidden">(200 reviews)
            </p>
        </span>
          </span>
          <div className="text-sm text-gray">
          reviews
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

 

      
    </div>
    </div>
    </div>
    <div className="absolute bottom-2 right-2 z-[100000000] flex gap-5">
      {/* Previous Button */}
      <div className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-2 w-10 h-10 shadow-md cursor-pointer hover:bg-gray-200">
        <FaArrowLeft className="text-gray-600 text-lg" />
      </div>

      {/* Next Button */}
      <div className="flex items-center justify-center rounded-full bg-[#F9FAFB] p-2 w-10 h-10 shadow-md cursor-pointer hover:bg-gray-200">
        <FaArrowRight className="text-gray-600 text-lg" />
      </div>
    </div>
    </div>
  </div>
</div>



  </section>
  {/* testimonials */}
  <section className="mt-8 p-4 lg:p-0 font-bricolage ">
  <div className="flex  flex-col lg:flex-row md:flex-row  lg:gap-10  justify-around items-center  ">
    <span className="flex flex-col font-bricolage gap-3">


      <h1 className="text-black  text-[26px] lg:text-23xl font-[600] mr-10">What People Are Saying</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-[30em]">
Discover a home where every detail enhances your lifestyle—crafted to fit your taste and needs.</p>

      
      </span>
      <span className=" hidden lg:flex flex-col font-bricolage gap-3 ">
      <p className="text-gray  lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-[30em]">
Discover a home where every detail enhances your lifestyle—crafted to fit your taste and needs.</p>
<Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px]  " >
<p className="text-gray" style={{color:"text-gray"}}>
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
  <section className=" mt-7 lg:mt-[10%] p-4 lg:p-0 font-bricolage ">
  <div className="flex  flex-col lg:flex-row md:flex-row   lg:gap-10  justify-around items-center  ">
    <span className="flex flex-col font-bricolage gap-3">


      <h1 className="text-black  text-[26px] lg:text-23xl font-[600] mr-10">Your Questions, Our Answers</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-[30em]">
      Whether you’re curious about our services, need help with specific issues..</p>

      
      </span>
      <span className=" hidden lg:flex flex-col font-bricolage gap-3 text-gray">
      <p className="text-gray  lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-[30em]">
      Welcome to our FAQ center, where you can find answers to all your most pressuring questions</p>
<Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px]  text-gray">
 Explore
</Button>
</span>
   
</div>
<div className="mt-7  max-md:w-full lg:w-9/10 gap-6 flex flex-col max-md:justify-center max-md:items-center lg:flex-row mb-5">
<div className="z-20 relative max-md:w-full   lg:left-[4.5rem] lg:top-[5rem]">
<FAQComponent/>
</div>
<div className="relative flex w-full lg:w-auto">


      <Image
        alt="image1"
        width={420}
        loading="lazy"
        height={500}
        src={'/q1.png'}
        className="z-10  relative top-0 left-[0.5rem] rounded-lg  object-cover h-5/10"
      /> <Image
      alt="image1"
      width={400}
      loading="lazy"
      height={300}
      src={'/q2.png'}
      className=" z-2   bottom-[2em]   max-md:w-[43%] mt-[17%] lg:-top-[2rem]  lg:mt-[11%] relative rounded-lg   object-cover h-3/10"
    />
    </div>
</div>
    </section> 
    {/* New-articles */}
    <section className=" hidden mt-10 p-4 lg:p-0 font-bricolage ">
  <div className="flex  flex-col lg:flex-row md:flex-row  lg:gap-10  justify-around items-center  ">
    <span className="flex flex-col font-bricolage gap-3">


      <h1 className="text-black  text-[26px] lg:text-23xl font-[600] mr-10">New Highlights & Articles</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-[30em]">
      Our top stories and features keeps you updated on industry trends, current events</p>

      
      </span>
      <span className=" hidden lg:flex flex-col font-bricolage gap-3 text-gray">
      <p className="text-gray  lg:p-0 text-base lg:text-base font-bricolage w-full lg:w-[30em]">
      Stay Informed with our latest news and Insights where you’ find breaking stories</p>
<Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px]  " >
<p className="text-gray" style={{color:"text-gray"}}>
Explore
  </p> 
</Button>
</span>
   
</div>
{/* cards */}
{/* Card Component */}
{/* Card Component */}
<div className="flex justify-center items-center gap-6">
<div className="relative flex flex-col h-[530px] w-[38em] font-bricolage border border-[#8F8F8F] rounded-lg snap-center shrink-0">
  {/* Image Section */}
  <Image
    alt="house image"
    width={400}
    height={300}
    src={'/house-2.png'}
    className="rounded-t-lg object-cover w-full h-[300px]"
  />

  {/* Content Section */}
  <div className="flex flex-col p-4">
    {/* Title */}
    <h1 className="text-black text-lg font-bold">Whispering Pines Estate</h1>

    {/* Price and Area */}
    <div className="flex flex-wrap gap-3 mt-2">
      <div className="flex items-center">
        <h4 className="text-gray text-sm font-light">From</h4>
        <h2 className="ml-2 font-bold">$2500.00</h2>
      </div>
      <h4 className="ml-auto text-sm text-gray font-light">
        Area from 190 - 245 m²
      </h4>
    </div>

    {/* Description */}
    <p className="text-gray text-sm mt-4">
      A cozy 3-bedroom home with an open living area and a private backyard.
      Perfect for comfort and relaxation.
    </p>
  </div>

  {/* Footer Section */}
  <div className="absolute flex items-center justify-between bottom-4 left-4 right-4">
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
  </div>
</div>
<div className="relative flex flex-col h-[530px] w-[38em]  font-bricolage border border-[#8F8F8F] rounded-lg snap-center shrink-0">
  {/* Image Section */}
  <Image
    alt="house image"
    width={400}
    height={300}
    src={'/house-2.png'}
    className="rounded-t-lg  w-full object-cover h-[300px]"
  />

  {/* Content Section */}
  <div className="flex flex-col p-4">
    {/* Title */}
    <h1 className="text-black text-lg font-bold">Whispering Pines Estate</h1>

    {/* Price and Area */}
    <div className="flex flex-wrap gap-3 mt-2">
      <div className="flex items-center">
        <h4 className="text-gray text-sm font-light">From</h4>
        <h2 className="ml-2 font-bold">$2500.00</h2>
      </div>
      <h4 className="ml-auto text-sm text-gray font-light">
        Area from 190 - 245 m²
      </h4>
    </div>

    {/* Description */}
    <p className="text-gray text-sm mt-4">
      A cozy 3-bedroom home with an open living area and a private backyard.
      Perfect for comfort and relaxation.
    </p>
  </div>

  {/* Footer Section */}
  <div className="absolute flex items-center justify-between bottom-4 left-4 right-4">
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
  </div>
</div>

</div>


    </section>  
    
      </>
  );
}
