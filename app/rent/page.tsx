'use client '
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import PropertyListCard from "../components/common/PropertyListing";

export default function Home() {
  return (
    <>
    <header className="relative h-[45em] lg:h-[52em] w-screen ">
  {/* Background Image Div */}
  <div
    className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
    style={{ backgroundImage: "url('/rentHomePage.png')" }}
  ></div>

  {/* Content Section */}
  <div className="flex z-[1] relative gap-6 justify-center items-center flex-col">
    {/* Main Heading */}
    <h1 className="lg:w-[10em] mt-[2em]2xl:mt-[9rem] lg:mt-[1.4em] text-white text-[2em] w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
    Find Your Future, Feel at Home!
</h1>
    {/* Subheading */}
    <h2 className="lg:text-[1.5em] 2xl:text-[1.6em]  font-[400] text-center text-[#FFFFFFB2] w-[33em]">
    Discover the perfect property to call home. Beautiful locations, modern amenities, and endless possibilities—make your move today! 
    </h2>

    {/* Large Screen Search Bar */}
    <div className="hidden lg:flex justify-center items-center w-full">
      <div className="flex pl-[2.5%] h-[4em] py-4 font-bricolage   items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[62em] ">
      <div className="w-[63em] flex justify-center items-center">

   
        {/* Location */}
        <div className="flex flex-col flex-1 border-none  border-[1px]">
          <span className="text-[1em] font-semibold text-black">Location</span>
          <div className="text-[1em] text-gray">Search Locations</div>
        </div>


        <div className=" flex justify-center  w-[39em] items-center">
           {/* Type */}
           <div className="flex flex-col justify-center items-start  border-l-black border-t-0 border-b-0 px-5 border-r-black border-[1px] border-solid  w-[100px] flex-1 ml-[3%]">
               <span className="text-[1em] font-semibold text-black">Type</span>
               <div className="text-[1em] text-gray">Add type</div>
             </div>
     
             {/* Vertical Divider */}
     
             {/* Price Range */}
             <div className="flex flex-col justify-center items-start  border-l-0 border-t-0 border-b-0 px-5 border-r-black border-[1px] border-solid  w-[100px] flex-1 ml-[3%]">
             <span className="text-[1em] font-semibold text-black">Price Range</span>
               <div className="text-[1em] text-gray">Add range</div>
             </div>
     
             {/* Vertical Divider */}
     
             {/* Number of Guests */}
             <div className="flex flex-col flex-1 px-5 ">
               <span className="text-[1em] font-medium text-black">Number of Guests</span>
               <div className="text-[1em] text-gray">Add number</div>
             </div>
        </div>

        {/* Vertical Divider */}
    

     

        {/* Search Button */}
       
      </div>
      <div className="relative mr-2 p-1  rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-white before:via-white/30 before:to-white/10 before:p-[1px]">
  <div className="relative bg-primary ml-[6em] p-3 w-[50px] h-[50px] rounded-full flex items-center justify-center">
    <Image
      alt="logo"
      width={30}
      loading="lazy"
      height={30}
      quality={100} // Ensures maximum quality
       
      src={'/search.png'}
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

  {/* Statistics Section */}

</header>
      {/* this hold the images */}



      {/* explore */}
      <section className="mt-10  hidden lg:my-[4em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]  2xl:w-[89%] flex-col items-center justify-center">
      <div className="flex w-full  2xl:w-[92rem]   p-2 flex-col md:flex-row 2xl:gap-[20%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-2 2xl:ml-0  text-[26px] lg:text-[2.5rem] font-[600]   w-full ">New Listings</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-2xl font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestyle-crafted to fit your taste and needs.
</p>

      

</div>
<div className="flex flex-col ">


<div className=" flex mt-[1em]   min-w-fit items-center lg:flex-row    justify-center  mb-2">
  {/* Horizontal Scrollable Container on Mobile */}
    {/* Card 1 */}
    <PropertyListCard imageSrc={'/rent-1.png'} altText={'rent6'} price={'4500.00'} area={''} />
    <PropertyListCard imageSrc={'/rent2.png'} altText={'rent6'} price={'4000.00'} area={''} />

  
    <PropertyListCard imageSrc={'/rent3.png'} altText={'rent6'} price={'4000.00'} area={''} />



   
  </div>
<div className=" flex mt-[1em]   min-w-fit items-center lg:flex-row    justify-center  mb-2">
  {/* Horizontal Scrollable Container on Mobile */}
    {/* Card 1 */}
    <PropertyListCard imageSrc={'/rent4.png'} altText={'rent6'} price={'4000.00'} area={''} />
    <PropertyListCard imageSrc={'/rent5.png'} altText={'rent6'} price={'4000.00'} area={''} />

  
    <PropertyListCard imageSrc={'/rent6.png'} altText={'rent6'} price={'4000.00'} area={''} />



   
  </div>

  <p className="text-[#09858D]   ml-6 2xl:ml-8  mt-5 text-2xl font-[500] ">see 2500 new listings for rent</p>
  </div>

</div>

      
      </section>
      <div className='w-full  2xl:mt-[5rem] h-[2px] bg-[#D9D9D9] '/>

{/* afforable component */}
    
<section className="mt-10  hidden  2xl:my-[4em] lg:my-[3em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]   2xl:w-[95rem]  flex-col items-center justify-center">
      <div className="flex   p-2 flex-col w-full  2xl:ml-0 md:flex-row 2xl:gap-[20%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-2  2xl:ml-7 text-[26px] lg:text-[2.5rem] font-[600]   w-full ">  Explore Lagos Rentals</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-2xl font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestyle-crafted to fit your taste and needs.
</p>

      

</div>
<div className="flex flex-col ">


<div className=" flex mt-[1em]   min-w-fit items-center lg:flex-row    justify-center  mb-2">
  {/* Horizontal Scrollable Container on Mobile */}
    {/* Card 1 */}
    <PropertyListCard imageSrc={'/afforable-1.png'} altText={'rent6'} price={'4000.00'} area={''} />
    <PropertyListCard imageSrc={'/afforable-2.png'} altText={'rent6'} price={'4000.00'} area={''} />

  
    <PropertyListCard imageSrc={'/house1.png'} altText={'rent6'} price={'4000.00'} area={''} />



   
  </div>


  <p className="text-[#09858D] 2xl:ml-[2rem]  ml-4  mt-5 text-2xl font-[500] ">See all 2500 Lagos houses for sale</p>
  </div>

</div>
      
      </section>


{/*  upcoming houdes*/}
<section className="mt-10  hidden  2xl:my-[4em] lg:my-[3em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]  2xl:w-[95rem] flex-col items-center justify-center">
      <div className="flex   p-2 flex-col w-full  2xl:ml-0 md:flex-row 2xl:gap-[20%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-5 text-[26px] lg:text-[2.5rem] font-[600]   w-full ">  pet-friendly Rental</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-2xl font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestyle-crafted to fit your taste and needs.
</p>

      

</div>
<div className="flex flex-col ">


<div className=" flex mt-[1em]   min-w-fit items-center lg:flex-row    justify-center  mb-2">
  {/* Horizontal Scrollable Container on Mobile */}
    {/* Card 1 */}
    <PropertyListCard imageSrc={'/afforable-1.png'} altText={'rent6'} price={'4000.00'} area={''} />
    <PropertyListCard imageSrc={'/afforable-2.png'} altText={'rent6'} price={'4000.00'} area={''} />

  
    <PropertyListCard imageSrc={'/house1.png'} altText={'rent6'} price={'4000.00'} area={''} />



   
  </div>


  <p className="text-[#09858D] 2xl:ml-[2rem]  ml-6  mt-5 text-2xl font-[500] ">See all 2500 pet-friendly houses for rent</p>
  </div>

</div>
      
      </section>


  {/* luxury */}


      {/* testimonials */}
      <section className="mt-10  hidden  2xl:my-[4em] lg:my-[3em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]   2xl:w-[95rem]  flex-col items-center justify-center">
      <div className="flex   p-2 flex-col w-full  2xl:ml-0 md:flex-row 2xl:gap-[20%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-5 text-[26px] lg:text-[2.5rem] font-[600]   w-full ">  Single Family House Rents</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-2xl font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestyle-crafted to fit your taste and needs.
</p>

      

</div>
<div className="flex flex-col ">


<div className=" flex mt-[1em]   min-w-fit items-center lg:flex-row    justify-center  mb-2">
  {/* Horizontal Scrollable Container on Mobile */}
    {/* Card 1 */}
    <PropertyListCard imageSrc={'/afforable-1.png'} altText={'rent6'} price={'18,000.00'} area={''} />
    <PropertyListCard imageSrc={'/afforable-2.png'} altText={'rent6'} price={'18,000.00'} area={''} />

  
    <PropertyListCard imageSrc={'/house1.png'} altText={'rent6'} price={'4000.00'} area={''} />



   
  </div>


  <p className="text-[#09858D] 2xl:ml-[1rem]  ml-6  mt-5 text-2xl font-[500] ">See all 2500 single family House rents for rent</p>
  </div>

</div>
      
      </section>



     

    {/* New-articles */}
    <section className="   flex justify-center items-center  w-full  flex-col mt-[4rem] p-5 lg:p-0 font-bricolage ">
    <div className="flex w-full   flex-col lg:flex-row md:flex-row  2xl:w-[106rem]  lg:gap-8  justify-around items-center  ">
    <span className="flex flex-col  font-bricolage 2xl:ml-0 lg:ml-7 gap-2">


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
    <div className="flex justify-center w-full mt-[4%] lg:flex-1 lg:flex-row flex-col  items-center lg:gap-10 2xl:gap-16 ">
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
    <h1 className="text-black  text-3xl  font-[500] pt-[10px]">Understanding the Real Estate Market Trends</h1>
    </div>
    {/* Price and Area */}
    <div className="flex flex-wrap flex-end gap-3 mt-4">
      <div className="flex ">
      <span className="flex  flex-col text-gray lg:text-[18px] text-sm  gap-2 font-meduim">
   <h4 className="text-gray  lg:text-[18px]  text-sm font-meduim">July </h4><h4 className="text-[18px]">2024</h4>     </span>  
        <h2 className="ml-2 mt-[17px] text-gray  font-meduim lg:text-[18px] ">Perfect property</h2>
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
    <h1 className="text-black  text-3xl  font-[500] pt-[10px]">Analyzing Modern Real Estate Market Movement</h1>
    </div>
    {/* Price and Area */}
    <div className="flex flex-wrap flex-end gap-3 mt-4">
      <div className="flex ">
      <span className="flex  flex-col text-gray lg:text-[18px] text-sm  gap-2 font-meduim">
   <h4 className="text-gray  lg:text-[18px]  text-sm font-meduim">July </h4><h4 className="text-[18px]">2024</h4>     </span>  
        <h2 className="ml-2 mt-[17px] text-gray  font-meduim lg:text-[18px] ">Perfect property</h2>
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

</div>



    </section>  
    
      </>
  );
}
