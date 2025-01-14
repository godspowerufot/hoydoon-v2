import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Barsearch = () => {
  return (
   <>
      {/* Large Screen Search Bar */}
      <div className="hidden  lg:flex justify-center  items-center w-full ">
          <div className="flex font-bricolage items-center m-5 bg-white rounded-full shadow-md w-10/12 md:w-4/5 lg:w-[7/10] p-2">
            {/* Location */}
            <div className="flex flex-col flex-1 px-4 py-3">
              <span className="text-xl font-semibold text-black">Location</span>
              <div className="text-xl text-gray">Search Locations</div>
            </div>
    
            {/* Vertical Divider */}
            <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>
    
            {/* Type */}
            <div className="flex flex-col flex-1 px-4 py-3">
              <span className="text-xl font-semibold text-black">Type</span>
              <div className="text-xl text-gray">Add type</div>
            </div>
    
            {/* Vertical Divider */}
            <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>
    
            {/* Price Range */}
            <div className="flex flex-col flex-1 px-4 py-3">
              <span className="text-xl font-semibold text-black">Price Range</span>
              <div className="text-xl text-gray">Add range</div>
            </div>
    
            {/* Vertical Divider */}
            <div className="h-10 w-[1px] bg-black mx-1 my-1"></div>
    
            {/* Number of Guests */}
            <div className="flex flex-col flex-1 px-4 py-3">
              <span className="text-xl font-semibold text-black">Number of Guests</span>
              <div className="text-xl text-gray">Add number</div>
            </div>
    
            {/* Search Button */}
            <div className="bg-primary p-3 ml-8 mr-3 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
              <FaSearch className="text-white h-[20px] w-6 font-light text-sm" />
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
              <FaSearch className="text-white h-6  text-sm" />
            </div>
          </div>
        </div>
        </>
  )
}

export default Barsearch