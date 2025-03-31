'use client '
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import Input from "../components/common/inputs/input";
import Link from "next/link";
import Article from "../components/common/Article";

export default function Home() {
  return (
    <>
 <header className="relative h-[45em] lg:h-[50em] w-screen">
  {/* Background Image Div */}
  <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]" style={{ backgroundImage: "url('/seller.png')" }}>
    {/* Overlay Div */}
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-[-1]"></div>
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
    <input
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
      <section className="mt-10  hidden lg:my-[4em] w-full  font-bricolage lg:flex justify-center flex-row gap-7 2xl:gap-[3rem] flex-1 items-center">
  

      <div className="w-[24rem] 2xl:w-[28rem]    rounded-lg overflow-hidden border border-none">
      {/* Image Section */}
      <div className="relative h-52 w-full">
        <Image
          src="/sell1.png" // Replace with actual image path
          alt="Agents talking"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Text Content */}
      <div className="p-6  2xl:px-7">
        <h4 className="text-gray-800 font-[500] text-base">Hoydoon’s Selling</h4>
        <h2 className="text-xl font-bold text-black mt-2">
          Choose the perfect agent for your needs.
        </h2>
        <p className="text-[#8F8F8F] font-bricolage text-sm lg:text-base mt-5">
          Complete a quick questionnaire to discover the best agents in your area. Review their
          pricing, services, and ratings to find the one that fits your needs perfectly.
        </p>

<Link href={"/sell/sell-home"}>
        <Button className='w-full 2xl:mt-[3rem] mt-9 text-base 2xl:text-xl h-[4rem] p-3'>
 Get Started
</Button></Link>
      </div>
    </div>

    <div className="w-[24rem] 2xl:w-[28rem]   rounded-lg shadow-md overflow-hidden border border-none">
      {/* Image Section */}
      <div className="relative h-52 w-full">
        <Image
          src="/sell2.png" // Replace with actual image path
          alt="Agents talking"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Text Content */}
      <div className="p-6">
        <h4 className="text-gray-800 font-[500] text-base">Hoydoon’s Selling</h4>
        <h2 className="text-xl font-bold text-black mt-2">
          Choose the perfect agent for your needs.
        </h2>
        <p className="text-[#8F8F8F] text-sm lg:text-base mt-5">
          Complete a quick questionnaire to discover the best agents in your area. Review their
          pricing, services, and ratings to find the one that fits your needs perfectly.
        </p>


        <button className='w-full   rounded-full items-center justify-center flex bg-[#fffefe] border-[#1E1E1E] border-solid border-[2px] text-black 2xl:mt-[5rem] mt-9 text-base 2xl:text-xl h-[3rem]  2xl:h-[4rem] p-3'>
        Visit Seller’s marketplace
</button>
      </div>
    </div>


    <div className="w-[24rem] 2xl:w-[28rem]   rounded-lg shadow-md overflow-hidden border border-none">
      {/* Image Section */}
      <div className="relative h-52 w-full">
        <Image
          src="/sell3.png" // Replace with actual image path
          alt="Agents talking"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Text Content */}
      <div className="p-6">
        <h4 className="text-gray-800 font-[500] text-base">Hoydoon’s Selling</h4>
        <h2 className="text-xl font-bold text-black mt-2">
          Choose the perfect agent for your needs.
        </h2>
        <p className="text-[#8F8F8F] text-sm lg:text-base mt-5">
          Complete a quick questionnaire to discover the best agents in your area. Review their
          pricing, services, and ratings to find the one that fits your needs perfectly.
        </p>


        <div className="  rounded-full relative w-[21rem] 2xl:mt-[6rem] mt-[1.5rem] 2xl:w-[26rem]">


<Input
label=""
type='text'
className="2xl:h-[4rem]  p-5 rounded-[24px] mt-[3rem]"
placeholder='Enter your home address'
 />

  <div className="absolute right-2 top-[10%]  2xl:top-[12%] bg-primary ml-[6em] p-3  h-[40px] w-[40px] 2xl:w-[50px] 2xl:h-[50px] rounded-full flex items-center justify-center">
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
      </section>


      <section className="   font-bricolage lg:flex  justify-center flex-col flex-1 items-center ">
        <div className="flex  w-9/10 2xl:gap-[1%] gap-[4rem] flex-col   2xl:w-[95rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex flex-col 2xl:pl-[1rem] w-full lg:w-[45em] 2xl:w-[60em] ">
<h1  className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">Ready to sell your home?.</h1>
<p className="text-gray text-base lg:text-xl mt-3 2xl:mt-[2em] font-bricolage w-[40rem]">
Ready to sell your home? Let us help you maximize its value and make the process stress-free. Schedule a consultation today and take the first step toward a successful sale</p>

<Button className="text-base font-light mt-5 ">
  <Link href="/explore">
  Schedule
  </Link>
</Button>
          </span>

<span className="mt-4 2xl:pr-[3rem]   lg:mt-0">
 <Image
              alt="image1"
              width={500} 
              quality={100}
              height={400} // Reduced size of logo
              src={'/sell-1.png'}
              className=" 2xl:w-[43rem] w-[55rem]   h-[28rem] 2xl:h-[35rem]"
            />
</span>
        </div>
      </section>
{/* afforable component */}
    

     

    {/* New-articles */}
 <Article/> 
    
      </>
  );
}
