import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "./components/common/Button";
import Link from "next/link";
import TestimonialCarousel from "./components/layouts/testimonials";
import FAQComponent from "./components/layouts/faq";
import PropertyCard from "./components/common/property";


export default function Home() {
  return (
    <>
 <header className="relative h-[100vh] w-screen overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
    style={{ backgroundImage: "url('/header.svg')" }}
  ></div>

  {/* Content Section */}
  <div className="flex flex-col items-center  mt-[6rem]  relative gap-4 z-10 h-full px-4">
    {/* Main Heading */}
    <h1 className="text-white text-center font-bricolage font-semibold leading-tight text-[clamp(4em,4vw,4em)] w-[60%] max-w-[700px] 2xl:max-w-[700px]">
      Where Every House Feels Like Home
    </h1>

    {/* Subheading */}
    <h2 className="text-[#FFFFFFB2] text-center  flex item-center justify-center font-[300] text-[clamp(1em,2vw,1.4em)] w-[47rem]">
      From urban flats to rural getaways, Hoydoon effortlessly links you to the home of your dreams with trust and ease.
    </h2>

    {/* Search Bar (Large Screens) */}
    <div className="hidden lg:flex justify-center items-center w-full max-w-[50em]">
  <div className="flex items-center h-[3.4rem] bg-white rounded-full shadow-md w-full p-[0.4rem]">
    {/* Location */}
    <div className="flex flex-col flex-1 px-4">
      <span className="text-sm font-semibold text-black">Location</span>
      <div className="text-sm text-gray">Search Locations</div>
    </div>

    {/* Type */}
    <div className="flex w-[8rem] flex-col pl-3 border-x border-[#8F8F8F]">
      <span className="text-sm font-semibold text-black">Type</span>
      <div className="text-sm text-gray">Add type</div>
    </div>

    {/* Price Range */}
    <div className="flex flex-col w-[8rem] pl-3 border-r border-gray">
      <span className="text-sm font-semibold text-black">Price Range</span>
      <div className="text-sm text-gray">Add range</div>
    </div>

    {/* Guests */}
    <div className="flex flex-col mr-[5rem] px-4">
      <span className="text-sm font-semibold text-black">Number of Guests</span>
      <div className="text-sm text-gray">Add number</div>
    </div>

    {/* Search Button */}
    <div className="ml-2 bg-primary p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
      <Image alt="Search" width={20} height={20} src={'/search.png'} />
    </div>
  </div>
</div>


    {/* Mobile Search Bar */}
    <div className="lg:hidden w-full px-2">
      <div className="flex items-center bg-white rounded-full shadow-md w-full p-3">
        <input
          type="text"
          placeholder="Address, Neighborhood, City..."
          className="flex-1 text-sm text-gray outline-none"
        />
        <div className="bg-primary p-3 rounded-full flex items-center justify-center cursor-pointer">
          <FaSearch className="text-white h-6" />
        </div>
      </div>
    </div>
  </div>

  {/* Statistics Section */}
  <div className="absolute bottom-3 lg:flex font-bricolage lg:mt-10 justify-center items-center w-full pt-10 px-4">
  <div className="flex items-center rounded-lg w-9/10 ml-15 justify-between md:w-4/5 lg:w-6/10">
    {/* Hosts Section */}
    <div className="flex items-center text-start gap-2 px-4">
      <span className="text-2xl font-medium text-white">10M+</span>
      <span className="text-base leading-[16px] w-[150px] font-light text-white">
        Hosts welcome guests worldwide
      </span>
    </div>

    {/* Vertical Divider */}
    <div className="h-12 w-[1px] bg-white"></div>

    {/* Unique Stays Section */}
    <div className="flex  items-center text-start gap-2 px-4">
      <span className="text-xl font-medium text-white">15M+</span>
      <span className="text-base leading-[16px] font-light w-[150px] text-white">
        Unique stays across 150K+ cities
      </span>
    </div>

    {/* Vertical Divider */}
    <div className="h-12 w-[1px] bg-white"></div>

    {/* Guest Arrivals Section */}
    <div className="flex  items-center text-start gap-2 px-4">
      <span className="text-2xl font-medium text-white">12M+</span>
      <span className="text-base leading-[16px] font-light w-[150px] text-white">
        Guest arrivals to date every month
      </span>
    </div>
  </div>
</div>

</header>

      {/* this hold the images */}
      <section className="   font-bricolage lg:flex  justify-center flex-col flex-1 items-center bg-white">
        <div className="flex  gap-[4%] flex-col w-[90%] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex flex-col w-full lg:w-[45em] 2xl:w-[60em] ">
<h1  className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Find your ideal property with simple tools and guidance.</h1>
<p className="text-gray text-base lg:text-xl mt-3 2xl:mt-[2em] font-bricolage w-9/10 2xl:text-[20px] 2xl:w-[70%]">
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
              width={500} 
              quality={100}
              height={400} // Reduced size of logo
              src={'/house-app.png'}
            />
</span>
        </div>
      </section>
      <section className="mt-10  lg:mt-[100px]  font-bricolage flex justify-center flex-col flex-1 items-center">
        <div className="flex  w-[92%] flex-col lg:flex-row  items-center justify-around ">
          <span className="flex   lg:pl-5 flex-col w-full lg:w-6/10 ">
<h1 className="text-black  text-[26px] lg:text-5xl font-[600]">Get the Hoydoon App</h1>
<p className="text-gray text-base lg:text-xl   font-bricolage w-8/10">
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

      {/* explore */}
      <section className="mt-10  hidden lg:my-[4em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]  2xl:w-[89%] flex-col items-center justify-center">
      <div className="flex   p-2 flex-col md:flex-row 2xl:gap-[20%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-2 2xl:ml-6  text-[26px] lg:text-[2.5rem] font-[600]   w-full ">Featured Properties for Rent</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-2xl font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestylecrafted to fit your taste and needs.
</p>

      

</div>
<div className=" flex mt-[1em]   min-w-fit items-center lg:flex-row    justify-center  mb-2">
  {/* Horizontal Scrollable Container on Mobile */}
    {/* Card 1 */}
    <PropertyCard imageSrc={'/house1.png'} altText={'rent6'} price={'18,000.00'} area={''} />
    <PropertyCard imageSrc={'/house1.png'} altText={'rent6'} price={'18,000.00'} area={''} />

  
    <PropertyCard imageSrc={'/house1.png'} altText={'rent6'} price={'18,000.00'} area={''} />



   
  </div>


</div>
      
      </section>

{/* card component */}
    
<section className="mt-10  hidden lg:my-[4em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex  w-[94%] 2xl:w-[89%] flex-col items-center justify-center">
      <div className="flex   p-2 flex-col md:flex-row 2xl:gap-[10%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-5 text-[26px] lg:text-[2.2rem] font-[600]   w-full ">Explore Luxurious Living Spaces</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-2xl font-bricolage w-full lg:w-full">
      Discover a home where every detail enhances your lifestyl ecrafted to fit your taste and needs.
</p>

      

</div>
<div
  style={{
    backgroundImage: "url('/carousel.jpg')",
    backgroundSize: "cover", // Makes the image fill the entire container
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center", // Ensures the image is centered
  }}
  className="mt-[1rem] relative p-8 2xl:w-[90rem] 2xl:h-[47rem] w-[75rem] h-[40rem] rounded-2xl"
>


  <div className="  bg-primarytransparent p-8 rounded-2xl 2xl:mt-[20rem] lg:mt-[14rem] h-[22rem]  2xl:w-[66rem] w-[60rem]">
  <div className=" bg-white p-8 rounded-2xl   h-[18rem]  2xl:w-[61rem] w-[56rem] ">
          <h1 className="text-black text-base  lg:text-xl 2xl:text-[2rem] font-[600]">Laurel Canyon Nest</h1>
          <p className="text-gray lg:text-[1rem] mb-[2rem] 2xl:text-[1.05rem]  2xl:w-[55rem] mt-3 text-[10px] ">
            A charming 3-bedroom home featuring a bright, open-concept living area designed for both comfort and connection. The spacious layout flows seamlessly from the kitchen to the dining and living spaces, making it perfect for gatherings. Step outside to a private backyard, ideal for relaxing, entertaining, or enjoying a bit of gardening. This home offers the perfect blend of functionality and tranquility for everyday living.
          </p>

          <div className="flex  w-[60%]  2xl:w-[75%] font-bricolage items-center mt-5 ">
            {/* Property Details */}
            <div className="flex flex-col-reverse w-1/2 flex-1 px-1 py-3">
              <span className="text-[0.9em]   mt-[3px] 2xl:text-[1.2rem] font-semibold text-black">1,200sqft</span>
              <div className="text-sm 2xl:text-[1rem] text-gray">Size</div>
            </div>

            {/* Vertical Divider */}
            <div className="h-10 w-[1px] - bg-black -mx-[15%] my-1"></div>

            <div className="flex ml-[20%] flex-col-reverse w-[40%] flex-1 px-2 py-3">

              <span className="text-[0.9em]  mt-[3px]  2xl:text-[1.2rem]  font-semibold text-black">Berbera, Somalia</span>
              <div className="text-sm 2xl:text-[1rem] text-gray">Location</div>
            </div>

            {/* Vertical Divider */}
            <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

            <div className="flex w-max flex-col-reverse ml-[3%] flex-1 px-2 py-3">
              <span className="text-[0.9em]  2xl:text-[1.2rem] font-semibold text-black">
                <span className="flex  mt-[3px] lg:flex-row flex-col gap-[0.2em]  w-full  items-center -ml-[9%] justify-center">
            <Image
                       alt="logo"
                       width={20}  
                       loading='lazy'
                       objectFit='cover'
                       height={20} // Reduced size of logo
                       src={'/star.png'}
                       className="h-5 w-5 "/>
                       <p>
                       5.0 </p>
                  <p className="text-gray  font-[500] lg:block  hidden">(200 reviews)</p>
                </span>
              </span>
              <div className="text-sm 2xl:text-[1rem] text-gray">Reviews</div>
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
      
      </section>


{/* carousel */}


  {/* testimonials */}
  <section className="mt-8 p-4 2xl:p-6 lg:p-0 font-bricolage ">
  <div className="flex  flex-col lg:flex-row md:flex-row 2xl:mt-4  lg:gap-12  justify-around items-center  ">
    <span className="flex   w-[38%] 2xl:w-[40%] flex-col 2xl:-ml-5  font-bricolage gap-3">


      <h1 className="text-black  text-[26px] lg:text-[2.5rem] 2xl:text-5xl font-[600]  mr-5">What People Are Saying</h1>
      <p className="text-gray  lg:p-0 text-base  lg:text-xl font-bricolage w-full lg:w-[30em]">
Discover a home where every detail enhances your lifestyle—crafted to fit your taste and needs.</p>

      
      </span>
      <span className=" hidden lg:flex flex-col font-bricolage gap-3 ">
      <p className="text-gray  lg:p-0 text-base 2xl:text-[20px] lg:text-xl font-bricolage w-full lg:w-[24em]">
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
  <section className=" mt-7  w-full  lg:mt-[7%]  flex flex-1 justify-center items-center  flex-col   p-5 lg:p-0 font-bricolage ">
  <div className="flex w-full   flex-col lg:flex-row md:flex-row   lg:gap-8  justify-around items-center  ">
    <span className="flex flex-col  font-bricolage ml-[3rem] 2xl:ml-9 gap-2">


      <h1 className="text-black  lg:text-[2.5rem] 2xl:text-5xl font-[600] mr-3 ">Your Questions, Our Answers</h1>
      <p className="text-gray  2xl:text-[20px] lg:p-0 text-base  lg:text-xl font-bricolage w-full lg:w-[30em]">
      Whether you’re curious about our services, need help with specific issues..</p>

      
      </span>
      <span className=" hidden lg:flex flex-col font-bricolage gap-3 text-gray">
      <p className="text-gray 2xl:text-[20px]  lg:p-0 text-base lg:text-xl font-bricolage w-full lg:w-[30em]">
      Welcome to our FAQ center, where you can find answers to all your most pressuring questions</p>
<Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px]  text-gray">
 <p className="text-gray" style={{color:"#8F8F8F"}}> Explore </p>
</Button>
</span>
   
</div>
<div className="mt-[3rem]  ml-[5rem] justify-center items-center max-md:w-full w-full gap-6 flex flex-col max-md:justify-center max-md:items-center lg:flex-row ">
<div className="z-20 relative max-md:w-full  lg:h-[50em]  lg:left-[50px] 2xl:left-[80px] lg:top-[10em]">
<FAQComponent/>
</div>
<div className="relative lg:-ml-[10em] justify-center items-center  flex w-[255px] lg:w-auto">


      <Image
        alt="image1"
        width={420}
        loading="lazy"
        height={500}
        src={'/q1.png'}
        className="z-10  lg:w-[30rem] 2xl:w-[600px] rounded-[20px] relative top-0 left-[0.5rem] 2xl:left-[2rem]   object-cover h-5/10"
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
    </section> 
    {/* New-articles */}
    <section className="   flex justify-center items-center  w-full  flex-col mt-[3rem] p-5 lg:p-0 font-bricolage ">
    <div className="flex w-full   flex-col lg:flex-row md:flex-row   lg:gap-8  justify-around items-center  ">
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
