'use client'
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import PropertyListCard from "../components/common/PropertyListing";
import Link from "next/link";
import Article from "../components/common/Article";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
interface Property {
  imageUrls?: { url?: string; altText?: string }[];
  item?: {
    _id?:string;
    price?: string;
    squareFeet?: number
    bathrooms?: number;
    bedrooms?: number;
    description?: string;
    title?: string;
    rent?: string;
  };
}

export default function Home() {
    const { data: allListings, isLoading: isAllLoading } = useGetAllListingsQuery({})
    const displayListings = allListings?.listings;
     
    
       console.log(displayListings);
        
         if (isAllLoading) {
           return (
             <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
               <div className="loader border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
             </div>
           );
         }
  return (
    <>
      <header className="relative h-[80vh] w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/rentHomePage.png')" }}
        ></div>

        {/* Content Section */}
        <div className="flex flex-col items-center relative z-[1]  mt-[6rem]   gap-4 h-full ">
          {/* Main Heading */}
          <h1 className="text-white text-center   relative  font-bricolage font-semibold leading-tight text-[clamp(4em,4vw,4em)] w-[60%] max-w-[700px] 2xl:max-w-[700px]">
            Find Your Future, Feel at Home!{" "}
          </h1>

          {/* Subheading */}
          <h2 className="text-[#FFFFFFB2] text-center  flex item-center justify-center font-[300] text-[clamp(1em,2vw,1.4em)] w-[47rem]">
            Find the perfect place for you and your loved ones, where comfort,
            community, and convenience come together.{" "}
          </h2>

          {/* Search Bar (Large Screens) */}
          <div className="hidden lg:flex justify-center items-center w-full max-w-[50em]">
            <div className="flex items-center h-[3.4rem] bg-white rounded-full shadow-md w-full p-[0.4rem]">
              {/* Location Input */}
              <div className="flex flex-col flex-1 px-4">
                <span className="text-sm font-semibold text-black">
                  Location
                </span>
                <input
                  type="text"
                  placeholder="Search Locations"
                  className="text-sm text-gray outline-none bg-transparent"
                />
              </div>

              {/* Type Input */}
              <div className="flex w-[8rem] flex-col pl-3 border-x border-[#8F8F8F]">
                <span className="text-sm font-semibold text-black">Type</span>
                <input
                  type="text"
                  placeholder="Add type"
                  className="text-sm text-gray outline-none bg-transparent"
                />
              </div>

              {/* Price Range Input */}
              <div className="flex flex-col w-[8rem] pl-3 border-r border-gray">
                <span className="text-sm font-semibold text-black">
                  Price Range
                </span>
                <input
                  type="text"
                  placeholder="Add range"
                  className="text-sm text-gray outline-none bg-transparent"
                />
              </div>

              {/* Guests Input */}
              <div className="flex flex-col mr-[5rem] px-4">
                <span className="text-sm font-semibold text-black">
                  Number of Guests
                </span>
                <input
                  type="number"
                  max={100}
                  min={0}
                  placeholder="Add number"
                  className="text-sm text-gray outline-none bg-transparent"
                />
              </div>

              {/* Search Button */}
              <Link href={"/rent/searchlisting"}>
                <div className="ml-2 bg-primary p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
                  <Image
                    alt="Search"
                    width={20}
                    height={20}
                    src={"/search.png"}
                  />
                </div>
              </Link>
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
      </header>
      {/* this hold the images */}

      {/* explore */}
      <section className="mt-10  hidden lg:my-[1em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   flex-col items-center justify-center">
          <div className="flex   p-2 flex-col md:flex-row  2xl:gap-[10rem] my-[2rem] lg:flex-row    justify-around items-center  md:items-start ">
            <h1 className="text-black lg:-pl-[1rem]   text-[26px] lg:text-[2.5rem] font-[600]   w-full ">
              Newest Listings
            </h1>
            <p className="text-gray  lg:pr-5 text-base lg:text-xl font-bricolage w-full lg:w-[55rem] 2xl:w-[60rem] ">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 6) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                .map((items:Property, index: number) => (
              <Link                     key={index}
               href={`/rent/${items?.item?._id}`}>   
              <PropertyListCard
                    key={index}
                  
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                    squareFeet={items?.item?.squareFeet}
                  /></Link>
                ))}
            </div>
            <p className="text-[#09858D]   ml-6 2xl:ml-8  my-5 text-2xl font-[500] ">
              see 2500 new listings for rent
            </p>
          </div>
        </div>
      </section>

      <div className="w-full  mt-[3rem] mb-[2rem] h-[2px] bg-[#D9D9D9] " />

      {/* afforable component */}

      <section className="mt-10  hidden  2xl:mt-[5em] lg:my-[3em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]   2xl:w-[95rem]  flex-col items-center justify-center">
          <div className="flex   p-2 flex-col w-full  2xl:ml-0 md:flex-row 2xl:gap-[8%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
            <h1 className="text-black lg:ml-5  2xl:ml-9 text-[26px] lg:text-[2.5rem] font-[600]   w-full ">
              {" "}
              Explore Lagos Rentals
            </h1>
            <p className="text-gray  lg:p-0 text-base lg:text-xl font-bricolage w-full lg:w-[50rem] ">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                .map((items:Property, index: number) => (
                  <Link  key={index} href={`/rent/${items?.item?._id}`}>   
  <PropertyListCard
                    key={index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                    squareFeet={items?.item?.squareFeet}
                  /></Link>
                ))}
            </div>

            <p className="text-[#09858D] 2xl:ml-[2rem]  ml-4  mt-5 text-2xl font-[500] ">
              See all 2500 Lagos houses for sale
            </p>
          </div>
        </div>
      </section>

      {/*  upcoming houdes*/}
      <section className="mt-10  hidden  2xl:my-[2em] lg:my-[2em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]  2xl:w-[95rem] flex-col items-center justify-center">
          <div className="flex   p-2 flex-col w-full  2xl:ml-0 md:flex-row 2xl:gap-[10%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
            <h1 className="text-black lg:ml-4  2xl:pl-[2rem] text-[26px] lg:text-[2.5rem] font-[600]   w-full ">
              {" "}
              pet-friendly Rental
            </h1>
            <p className="text-gray  lg:p-0 text-base lg:text-xl font-bricolage w-full lg:w-[50rem]">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                .map((items:Property, index: number) => (
                  <Link   key={index} href={`/rent/${items?.item?._id}`}>   
 <PropertyListCard
                    key={index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                    squareFeet={items?.item?.squareFeet}
                  /></Link>
                ))}
            </div>

            <p className="text-[#09858D] 2xl:ml-[2.5rem]  ml-6   mt-5 text-2xl font-[500] ">
              See all 2500 pet-friendly houses for rent
            </p>
          </div>
        </div>
      </section>

      {/* luxury */}

      {/* testimonials */}
      <section className="mt-10  hidden  2xl:my-[4em] lg:my-[3em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   w-[92%]  2xl:w-[95rem] flex-col items-center justify-center">
          <div className="flex   p-2 flex-col w-full  2xl:ml-0 md:flex-row 2xl:gap-[10%] my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
            <h1 className="text-black lg:ml-4 text-[26px] 2xl:pl-[2rem] lg:text-[2.5rem] font-[600]   w-full ">
              {" "}
              Single Family Homes for Rent
            </h1>
            <p className="text-gray  lg:p-0 text-base lg:text-xl font-bricolage w-full lg:w-[50rem]">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                .map((items:Property, index: number) => (
                  <Link  key={index} href={`/rent/${items?.item?._id}`}>   
   <PropertyListCard
                    key={index}
                    imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                    altText={
                      items?.imageUrls?.[0]?.altText ||
                      "Property image showcasing a beautiful home"
                    }
                    price={items?.item?.price || "Price not available"}
                    area={items?.item?.squareFeet}
                    bathrooms={items?.item?.bathrooms}
                    bedrooms={items?.item?.bedrooms}
                    description={
                      items?.item?.description ||
                      "No description available for this property."
                    }
                    title={items?.item?.title || "Untitled Property"}
                    rent={items?.item?.rent || "Rent details not provided"}
                    squareFeet={items?.item?.squareFeet}
                  /></Link>
                ))}
            </div>

            <p className="text-[#09858D]   lg:ml-[2.3rem] 2xl:ml-[2.5rem]  mt-5 text-2xl font-[500] ">
              See all 2500 single family House rents for rent
            </p>
          </div>
        </div>
      </section>

      {/* New-articles */}
      <Article />
    </>
  );
}
