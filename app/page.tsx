import Image from "next/image";
import Navbar from "./components/layouts/navbar";
import { FaSearch } from "react-icons/fa";
import Button from "./components/common/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className=" h-full lg:h-[110vh]" style={{ backgroundImage: "url('/header.svg')", backgroundSize: "cover" }}>
        <Navbar />
        <div className="p-4 flex justify-center items-center flex-col">
          <h1 className="lg:w-5/10 text-white  text-[2.3em] w-full text-center lg:text-[4.2em] font-bricolage font-bold">
            Where Every House Feels Like Home
          </h1>
          <h2 className="text-base font-normal lg:text-2xl text-center text-[#FFFFFFB2]  w-full lg:w-6/10">
            From urban flats to rural getaways, Hoydoon effortlessly links you to the home of your dreams with trust and ease.
          </h2>
{/* large screensearch bar */}
          <div className=" hidden lg:flex justify-center items-center w-full px-2 py-8">
      <div className="flex font-bricolage items-center m-5 bg-white rounded-full shadow-md w-10/12 md:w-4/5 lg:w-3/5">
        
        {/* Location */}
        <div className="flex flex-col flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">
            Location
          </span>
          <div className="text-sm text-gray">
            Search Locations
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Type */}
        <div className="flex flex-col flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">
            Type
          </span>
          <div className="text-sm text-gray">
            Add type
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Price Range */}
        <div className="flex flex-col flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">
            Price Range
          </span>
          <div className="text-sm text-gray">
            Add range
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>

        {/* Number of Guests */}
        <div className="flex flex-col flex-1 px-4 py-3">
          <span className="text-sm font-semibold text-black">
            Number of Guests
          </span>
          <div className="text-sm text-gray">
            Add number
          </div>
        </div>

        {/* Search Button */}
        <div className="bg-primary p-3 mr-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
          <FaSearch className="text-white text-sm" />
        </div>
      </div>
    </div>
    {/* small screen bar */}
    <div className="lg:hidden justify-center items-center w-full px-2 py-3">
      <div className="flex font-bricolage items-center m-5 bg-white rounded-full shadow-md w-[89%] md:w-4/5 lg:w-3/5">
        
        {/* Location */}
        <div className="flex flex-col  flex-1 px-2 py-3">
        
          <div className="text-sm text-gray">
          Address, Neighborhood, City, Zip code...
          </div>
        </div>

      

        {/* Search Button */}
        <div className="bg-primary p-3 mr-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
          <FaSearch className="text-white text-sm" />
        </div>
      </div>
    </div>
        </div>

        {/* end section */}
        <div className=" hidden lg:flex font-bricolage  lg:mt-8 justify-center items-center w-full py-10 px-4">
      <div className="flex items-center   rounded-lg w-11/12 md:w-4/5 lg:w-3/5">
        
        {/* Hosts Section */}
        <div className="flex  flex-1 text-center  gap-2 px-4">
          <span className="text-3xl  text-white">10M+</span>
          <span className="text-sm text-start text-white">hosts welcome guests worldwide</span>
        </div>

        {/* Vertical Divider */}
        <div className="h-12 w-[1px] bg-white mx-2 my-1"></div>

        {/* Unique Stays Section */}
        <div className="flex flex-1 text-center px-4 gap-2">
          <span className="text-3xl  text-white">15M+</span>
          <span className="text-sm text-start text-white">Unique stays across 150K+ cities</span>
        </div>

        {/* Vertical Divider */}
        <div className="h-12 w-[1px] bg-white mx-2 my-1"></div>

        {/* Guest Arrivals Section */}
        <div className="flex gap-2  flex-1 text-center px-4">
          <span className="text-3xl  text-white">12M+</span>
          <span className="text-sm text-start text-white">guest arrivals to date every month</span>
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
      <section className=" lg:mt-3 w-full ">
        <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row  lg:gap-10  justify-around items-center ">
      <h1 className="text-black  text-[26px] lg:text-23xl font-[600] mr-10">Featured Properties for Rent</h1>
<p className="text-gray p-[7%] lg:p-0 text-base lg:text-base font-bricolage w-[23em] lg:w-[30em]">
Discover a home where every detail enhances your lifestyle—crafted to fit your taste and needs.
</p>

      
</div>
<div className="flex p-9 lg:m-14 flex-col lg:flex-col">
  {/* Horizontal Scrollable Container on Mobile */}
  <div className="flex gap-4 overflow-x-scroll lg:overflow-x-visible flex-nowrap snap-x snap-mandatory scroll-smooth">
    {/* Card 1 */}
    <div className="flex flex-col h-[500px]  w-[250px lg:w-[400px] font-bricolage snap-center shrink-0">
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
    <div className="relative flex object-contain  flex-col h-[530px]  w-[250px lg:w-[400px] font-bricolage border-[#8F8F8F] border-solid border-[1px] rounded-lg snap-center shrink-0">
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
          <div className="absolute bottom-3 left-0">
            <div className="text-base h-[2em] flex justify-center font-bricolage items-center px-4 py-2 rounded-full font-light w-[10em] text-[#1E1E1E] bg-[#D8F0F1] ml-7">
              Luxury Oasis
            </div>
          </div>
        </span>
      </span>
    </div>

    {/* Card 3 */}
    <div className="flex flex-col object-contain h-[500px]  w-[250px lg:w-[400px] font-bricolage snap-center shrink-0">
      <Image
        alt="image1"
        width={400}
        height={400}
        src={'/house-3.png'}
        className="rounded-lg"
      />
    </div>
  </div>
</div>


</div>
{/* card component */}
</section>
    </>
  );
}
