import Image from "next/image";
import Navbar from "./components/layouts/navbar";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <header className=" h-full lg:h-[110vh]" style={{ backgroundImage: "url('/header.svg')", backgroundSize: "cover" }}>
        <Navbar />
        <div className="p-4 flex justify-center items-center flex-col">
          <h1 className="lg:w-5/10 text-[2.6em] w-full text-center lg:text-[4.2em] font-bricolage font-bold">
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
    <div className=" justify-center items-center w-full px-2 py-3">
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
      <section>
        hi
      </section>
    </>
  );
}
