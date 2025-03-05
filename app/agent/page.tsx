'use client '
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import Input from "../components/common/inputs/input";
import Link from "next/link";
const agents = [
    { image: "/ruka.jpg", name: "Ruka Oyefeso", estate: "Mapplewood Estate", priceRange: "$500k - $2.5M", sales: "20" },
    { image: "/ruka.jpg", name: "Ruka Oyefeso", estate: "Mapplewood Estate", priceRange: "$500k - $2.5M", sales: "20" },
    { image: "/ruka.jpg", name: "Ruka Oyefeso", estate: "Mapplewood Estate", priceRange: "$500k - $2.5M", sales: "20" },
    { image: "/ruka.jpg", name: "Ruka Oyefeso", estate: "Mapplewood Estate", priceRange: "$500k - $2.5M", sales: "20" },
    { image: "/ruka.jpg", name: "Ruka Oyefeso", estate: "Mapplewood Estate", priceRange: "$500k - $2.5M", sales: "20" },
    { image: "/ruka.jpg", name: "Ruka Oyefeso", estate: "Mapplewood Estate", priceRange: "$500k - $2.5M", sales: "20" },

  ];
  

  
export default function Home() {

    const ProfileCard = ({ image, name, estate, priceRange, sales }:any) => {
        return (
          <div className="p-6 flex gap-5 h-[250px] justify-start bg-[#ffffff]  w-[600px] 2xl:w-[43.8rem]">
            <Image
              alt={name}
              src={image}
              width={200}
              height={200}
              className="rounded-full aspect-square object-cover"
            />
            <div className="mt-[2em] font-bricolage ml-[0.3em]">
              <h2 className="font-bricolage font-bold text-[1.3em] text-black">{name}</h2>
              <p className="text-[#8F8F8F] text-[1em] font-[400] w-[200px]">{estate}</p>
      
              <div className="mt-4">
                <p className="text-black text-[1em] font-[400] w-[280px]">
                  <b>{priceRange}</b> <b className="text-[#8F8F8F] font-[400]">Price range</b>
                </p>
                <p className="text-black text-[1em] font-[400] w-[200px]">
                  <b>{sales}</b> <b className="text-[#8F8F8F] font-[300]">Total sales</b>
                </p>
              </div>
            </div>
          </div>
        );
      };
      
  return (
    <>
 <header className="relative h-[45em] lg:h-[52em] w-screen">
  {/* Background Image Div */}
  <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]" style={{ backgroundImage: "url('/agentheader.png')" }}>
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
<div className="hidden lg:flex justify-center items-center w-full">
  <div className="flex h-[3.5em] py-4 font-bricolage items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[41em]">
    
    {/* Transparent Full-Width Input */}
    <Input 
      type="text" 
      className="flex-1 bg-transparent placeholder:text-[1.3rem] text-black placeholder-gray-500 border-none outline-none pl-4 w-[36.3rem]" 
      placeholder="Enter your home address" 
    />

    {/* Search Button */}
    <div className="relative mr-2 p-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-white before:via-white/30 before:to-white/10 before:p-[1px]">
      <div className="relative bg-primary ml-[1em] p-3 w-[50px] h-[50px] rounded-full flex items-center justify-center">
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
      <section className=" flex-wrap bg-white hidden lg:py-[2em] w-full  font-bricolage lg:flex justify-center flex-col gap-7 2xl:gap-[3rem] flex-1 items-center">
      <div className="flex   p-2 flex-col w-[80rem] 2xl:w-[94rem]  2xl:ml-0 md:flex-row 2xl:gap-[20%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
      <h1 className="text-black lg:ml-5 text-[26px] lg:text-[2.5rem] font-[600]   w-full ">  Real Estate Agents In Lagos</h1>
      <p className="text-gray  lg:p-0 text-base lg:text-2xl font-bricolage w-full lg:w-full">
      Leverage a local agent's expertise with access to millions of listings, guiding you through every step.
</p>

      

</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
        {agents.map((agent, index) => (
          <ProfileCard key={index} {...agent} />
        ))}
      </div>


   
      </section>


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
              height={400} // Reduced size of logo
              src={'/agent3.png'}
            />
</span>
        </div>
      </section>

      <section className="   font-bricolage lg:flex  flex-col justify-center flex-1 items-center ">
        <div className="flex   gap-[4%] flex-col w-[90%]  2xl:w-[100rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
       
       <span className="mt-4 lg:mt-0">
 <Image
              alt="image1"
              width={500} 
              quality={100}
              height={400} // Reduced size of logo
              src={'/agent4.png'}
            />
</span>
          <span className="flex flex-col w-full lg:w-[45em] 2xl:w-[69em] ">
<h1  className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Ready to sell your home?.</h1>
<p className="text-gray text-base lg:text-xl mt-3 2xl:mt-[2em] font-bricolage w-[85%] 2xl:text-[20px] 2xl:w-[70%]">
Ready to sell your home? Let us help you maximize its value and make the process stress-free. Schedule a consultation today and take the first step toward a successful sale</p>

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
    <div className="relative flex flex-col h-[42rem]   lg:w-[36em] 2xl:w-[44em]  font-bricolage  rounded-lg shrink-0">
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
<div className="relative flex flex-col h-[42rem]   lg:w-[36em] 2xl:w-[44em]  font-bricolage  rounded-lg shrink-0">
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
