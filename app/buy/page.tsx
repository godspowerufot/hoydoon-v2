'use client'
/* eslint-disable */
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import PropertyCard from "../components/common/property";
import Input from "../components/common/inputs/input";
import Link from "next/link";
import Article from "../components/common/Article";
import { useEffect, useState } from "react";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import { log } from "@/utils/log";
import MapComponent from "../components/layouts/listingmap";
import SearchBar from "../components/common/searchcomponent";
interface Property {
  _id?: string;
  imageUrls?: { url?: string; altText?: string }[];
  item?: {
    price?: string;
    squareFeet?: string;
    description?: string;
    title?: string;
    rent?: string;
    bedrooms?:string;
    bathrooms?:string;
  };
}

export default function Home() {
  const { data: allListings, isLoading: isAllLoading } = useGetAllListingsQuery({}, { pollingInterval: 60000 });
  const [displayListings, setDisplayListings] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const { data: listing } = useGetAllListingsQuery(  { location: searchLocation }, // e.g. "Lekki" or Zip
    { skip: !searchLocation, pollingInterval: 60000 });
    const [inputValue, setInputValue] = useState("");
    const handleSearch = () => {
      setSearchLocation(inputValue.trim());
    };
      const flattenListings = (listings:any) => {
        return listings.flatMap((item:any) => 
          Array.isArray(item.listings) ? flattenListings(item.listings) : item
        );
    
      };
    useEffect(() => {
      if (listing?.listings) {
        const flatListings = flattenListings(listing.listings);
       
        // Extract coordinates
      // Extract coordinates for active listings
      const coords = flatListings?.map((item:any) => item.item?.coordinate) // Get coordinate object from item
        .filter((coord:any) => coord?.latitude && coord?.longitude); // Ensure valid coordinates
  
      setCoordinates(coords); // Store coordinates for Google Maps
    
      log(coordinates,"locationlisitng")

      }
    }, [listing]);

  
     
       useEffect(() => {
         if (!isAllLoading && allListings) {
          const firstThreeListings = allListings.listings;
          setDisplayListings(firstThreeListings); // Store in state
         }
       }, [allListings, isAllLoading]);
     
       if (isAllLoading) {
         return (
           <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
             <div className="loader border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
           </div>
         );
       }
  return (
    <>
      <header className="relative   h-[43vh]   p-2 lg:h-[80vh] w-screen overflow-hidden">
      {/* Background Image */}
        <div
          className="absolute lg:block hidden  top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/rent.png')" }}
        ></div>
  <div
          className="absolute lg:hidden top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/rentmobile.png')" }}
        ></div>
        {/* Content Section */}
        <div className="flex flex-col items-center relative z-[1]  mt-[2.6rem] lg:mt-[6rem]    gap-1 lg:gap-4 h-full ">
          {/* Main Heading */}
          <h1 className="text-white text-center w-[25rem]   relative  font-bricolage font-semibold leading-tight  text-[36px] lg:text-[clamp(4em,4vw,4em)] lg:w-[60%] max-w-[700px] 2xl:max-w-[700px]">
            Find Your Perfect Dream Home Today!
          </h1>

          {/* Subheading */}
          <h2 className="text-[#FFFFFFB2]  hidden  lg:-mt-2 text-center  lg:flex item-center justify-center font-[300]  text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
            Discover the perfect property to call home. Beautiful locations,
            modern amenities, and endless possibilities—make your move today!
          </h2>

              <h2 className="text-[#FFFFFFB2]  lg:hidden lg:-mt-2 text-center  flex item-center justify-center font-[300]  text-sm lg:text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
              Find your dream home—great locations, modern amenities, endless possibilities. Move in today! </h2>
      
      
      
        <SearchBar/>
        </div>

        {/* Statistics Section */}
      </header>
      {/* this hold the images */}

      {/* explore */}
      <section className="    lg:p-0  w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   flex-col items-center justify-center">
          <div className="flex   lg:ml-[2rem]  xxl:ml-[5rem] 2xl:ml-[2rem]  2xl:w-[96rem] p-2 flex-col md:flex-row  2xl:gap-[9rem] lg:my-[2rem] lg:flex-row    justify-around items-center  md:items-start ">
            <h1 className="text-black lg:pl-[4.5rem] my-1 lg:my-0  text-[26px] lg:text-[2.5rem] font-[600]   w-full ">
              All Houses for Sale
            </h1>
            <p className="text-gray text-sm  lg:pr-5  lg:text-xl font-bricolage w-full lg:w-[55rem] ">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex lg:ml-[1.5rem] flex-col ">
            <div className="grid grid-cols-1 gap-8  sm:grid-cols-2 lg:grid-cols-3 lg:gap-1 mt-[0.5em] lg:mt-[1em] min-w-fit items-center justify-center lg:mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                .map((items: Property, index: number) => (
                <PropertyCard
                         _id={items?._id}
                         key={index}
                         imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                         altText={items?.imageUrls?.[0]?.altText || "Property image showcasing a beautiful home"}
                         price={items?.item?.price || "Price not available"}
                         area={items?.item?.squareFeet || ""}
                         bathrooms={items?.item?.bathrooms}
                         bedrooms={items?.item?.bedrooms}
                         description={items?.item?.description || "No description available for this property."}
                         title={items?.item?.title || "Untitled Property"}
                         rent={items?.item?.rent || "Rent details not provided"}
                       />
                ))}
            </div>

            <p className="text-[#09858D]  text-sm  mt-4 lg:ml-7 2xl:ml-6  2xl:mt-8   lg:text-2xl font-[500] ">
              see All houses for sale
            </p>
          </div>
        </div>
      </section>
      <div className="w-screen  mt-[3rem] lg:mb-[2rem] h-[2px] bg-[#D9D9D9] " />

      {/* afforable component */}
      <section className=" p-1 lg:p-0   w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-start">
        <div className="flex   flex-col items-center justify-center">
          <div className="flex lg:ml-[2rem] gap-y-2  xxl:ml-[5rem] 2xl:ml-[2rem]  2xl:w-[96rem] p-2 flex-col md:flex-row  2xl:gap-[9rem] lg:my-[2rem] lg:flex-row    justify-around items-center  md:items-start ">
            <h1 className="text-black lg:pl-[4.5rem]  text-[24px] lg:text-[2.5rem] font-[600]   w-full ">
              Afforable Houses for Sale
            </h1>
            <p className="text-gray   font-light  lg:pr-5 text-sm lg:text-xl font-bricolage w-full lg:w-[55rem] ">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex lg:ml-[1.5rem] flex-col ">
            <div className="grid grid-cols-1 gap-8  sm:grid-cols-2 lg:grid-cols-3 lg:gap-1 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                .map((items: Property, index: number) => (
                  <PropertyCard
                         _id={items?._id}
                         key={index}
                         imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                         altText={items?.imageUrls?.[0]?.altText || "Property image showcasing a beautiful home"}
                         price={items?.item?.price || "Price not available"}
                         area={items?.item?.squareFeet || ""}
                         bathrooms={items?.item?.bathrooms}
                         bedrooms={items?.item?.bedrooms}
                         description={items?.item?.description || "No description available for this property."}
                         title={items?.item?.title || "Untitled Property"}
                         rent={items?.item?.rent || "Rent details not provided"}
                       />
                ))}
            </div>

            <p className="text-[#09858D]   text-sm lg:ml-7 2xl:ml-6  2xl:mt-8   lg:text-2xl font-[500] ">
              see all Afforable houses for sale
            </p>
          </div>
        </div>
      </section>
      <div className="w-screen  mt-[3rem] lg:mb-[2rem] h-[2px] bg-[#D9D9D9] " />

      <section className=" p-1 lg:p-0   w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   flex-col items-center justify-center">
          <div className="flex  lg:ml-[2rem]  xxl:ml-[5rem] 2xl:ml-[2rem]  2xl:w-[96rem] p-2 flex-col md:flex-row  2xl:gap-[9rem] lg:my-[2rem] lg:flex-row    justify-around items-center  md:items-start ">
            <h1 className="text-black hidden lg:block lg:pl-[4.5rem]  text-[26px] lg:text-[2.5rem] font-[600]   w-full ">
              Upcoming Open Houses for Sale
            </h1>
            <h1 className="text-black  text-[23px] block lg:hidden lg:pl-[4.5rem]   lg:text-[2.5rem] font-[600]   w-full ">
              Upcoming Open Houses 
            </h1>
            <p className="text-gray text-sm  lg:pr-5 lg:text-xl font-bricolage w-full lg:w-[55rem] ">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex lg:ml-[1.5rem] flex-col ">
            <div className="grid gap-8  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-1 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                .map((items: Property, index: number) => (
                  <PropertyCard
                         _id={items?._id}
                         key={index}
                         imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                         altText={items?.imageUrls?.[0]?.altText || "Property image showcasing a beautiful home"}
                         price={items?.item?.price || "Price not available"}
                         area={items?.item?.squareFeet || ""}
                         bathrooms={items?.item?.bathrooms}
                         bedrooms={items?.item?.bedrooms}
                         description={items?.item?.description || "No description available for this property."}
                         title={items?.item?.title || "Untitled Property"}
                         rent={items?.item?.rent || "Rent details not provided"}
                       />
                ))}
            </div>

            <p className="text-[#09858D] text-sm  lg:ml-7 2xl:ml-6  2xl:mt-8   lg:text-2xl font-[500] ">
              see all open houses for sale
            </p>
          </div>
        </div>
      </section>
      <div className="w-screen  hidden lg:block mt-[3rem] lg:mb-[2rem] h-[2px] bg-[#D9D9D9] " />
      {/* luxury */}

      <section className="  hidden  w-full p-1 lg:p-0 font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   flex-col items-center justify-center">
          <div className="flex lg:ml-[2rem]  xxl:ml-[5rem] 2xl:ml-[2rem]  2xl:w-[96rem] p-2 flex-col md:flex-row  2xl:gap-[9rem] my-[2rem] lg:flex-row    justify-around items-center  md:items-start ">
            <h1 className="text-black lg:pl-[4.5rem]  text-[26px] lg:text-[2.5rem] font-[600]   w-full ">
              Luxury Homes Houses for Sale
            </h1>
            <p className="text-gray  lg:pr-5 text-base lg:text-xl font-bricolage w-full lg:w-[55rem] ">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex lg:ml-[1.5rem] flex-col ">
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-1 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                .map((items: Property, index: number) => (
                  <PropertyCard
                  _id={items?._id}
                  key={index}
                  imageSrc={items?.imageUrls?.[0]?.url || "/house1.png"}
                  altText={items?.imageUrls?.[0]?.altText || "Property image showcasing a beautiful home"}
                  price={items?.item?.price || "Price not available"}
                  area={items?.item?.squareFeet || ""}
                  bathrooms={items?.item?.bathrooms}
                  bedrooms={items?.item?.bedrooms}
                  description={items?.item?.description || "No description available for this property."}
                  title={items?.item?.title || "Untitled Property"}
                  rent={items?.item?.rent || "Rent details not provided"}
                />
                ))}
            </div>

            <p className="text-[#09858D]   lg:ml-7 2xl:ml-6  2xl:mt-8   text-2xl font-[500] ">
              see all luxury houses for sale
            </p>
          </div>
        </div>
      </section>
      <div className="w-screen  mt-[3rem] lg:mb-[2rem] h-[2px] bg-[#D9D9D9] " />
      {/* testimonials */}

      <section className="    font-bricolage lg:flex  justify-center flex-col flex-1 items-center ">
        <div className="flex  gap-[4%]  2xl:w-[95rem] flex-col-reverse  w-full lg:w-[90%] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex  p-4 flex-col w-full lg:w-[45em] 2xl:w-[60em] ">
            <h1 className="text-black  mt-4 lg:mt-0 text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
              Get the Local Information
            </h1>
            <p className="text-gray text-sm lg:text-xl mt-3 2xl:mt-[1em] font-bricolage  w-full lg:w-9/10 2xl:text-[20px] 2xl:w-[70%]">
              Curious about local schools? Wondering if there are pet-friendly
              rentals? Find all the key information you need about the area that
              catches your interest.
            </p>

            <div className="  relative w-full  lg:w-[87%] mt-[1.5rem] 2xl:w-[75%]">
              <Input
                label=""
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="2xl:h-[4rem] rounded-[24px]"
                placeholder="Address, Neighborhood, Zip code..."
              />

              <div  onClick={handleSearch}  className="absolute right-2 top-[8%] 2xl:top-[13%] bg-primary ml-[6em] p-3  h-[40px] w-[40px] 2xl:w-[50px] 2xl:h-[50px] rounded-full flex items-center justify-center">
                <Image
                  alt="logo"
                  width={30}
                  loading="lazy"
                  height={30}
                  quality={100} // Ensures maximum quality
                  src={"/search.png"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </span>

          <span className="mt-8  w-screen lg:w-[40rem] h-[25rem] 2xl:w-[50rem] 2xl:h-[35rem] rounded-2xl lg:mt-0">
                 <MapComponent coordinates={coordinates} />
           
          </span>
        </div>
      </section>

      <Article />
    </>
  );
}
