'use client'

import PropertyListCard from "../components/common/PropertyListing";
import SearchBar from "../components/common/searchcomponent";
import Article from "../components/common/Article";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
interface Property {
  imageUrls?: { url?: string; altText?: string }[];
  _id?:string;
  item?: {
  
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
     
    

        
         if (isAllLoading) {
           return (
             <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
               <div className="loader border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
             </div>
           );
         }
  return (
    <>
      <header className="relative   h-[40vh]   p-2 lg:h-[80vh] w-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/rentHomePage.png')" }}
        ></div>

        {/* Content Section */}
        <div className="flex flex-col items-center relative z-[1]  mt-[6rem]   lg:gap-4 h-full ">
          {/* Main Heading */}
          <h1 className="text-white text-center w-[20rem]   relative  font-bricolage font-semibold leading-tight  text-[2.1em] lg:text-[clamp(4em,4vw,4em)] lg:w-[60%] max-w-[700px] 2xl:max-w-[700px]">
            Find Your Future, Feel at Home!{" "}
          </h1>

          {/* Subheading */}
          <h2 className="text-[#FFFFFFB2]  hidden  lg:-mt-2 text-center  lg:flex item-center justify-center font-[300]  text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
            Find the perfect place for you and your loved ones, where comfort,
            community, and convenience come together.{" "}
          </h2> 
           <h2 className="text-[#FFFFFFB2]  lg:hidden lg:-mt-2 text-center  flex item-center justify-center font-[300]  text-sm lg:text-[clamp(1em,2vw,1.4em)] lg:w-[47rem]">
          Hoydoon connects you to your dream home — easily and reliably. </h2>



  <SearchBar/>
        </div>

        {/* Statistics Section */}
      </header>
      {/* this hold the images */}

      {/* explore */}
      <section className="mt-4  2xl:mt-5  w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   flex-col items-center justify-center">
          <div className="flex   p-2 flex-col md:flex-row  2xl:gap-[10rem] lg:my-[2rem] lg:flex-row    justify-around items-center  md:items-start ">
            <h1 className="text-black lg:-pl-[1rem]   text-[26px] lg:text-[2.5rem] font-[600]   w-full ">
              Newest Listings
            </h1>
            <p className="text-gray  lg:pr-5 text-sm lg:text-xl font-bricolage w-full lg:w-[55rem] 2xl:w-[60rem] ">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 lg:gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                ?.map((items: Property, index: number) => (
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
                      _id={items?._id}

                      title={items?.item?.title || "Untitled Property"}
                      rent={items?.item?.rent || "Rent details not provided"}
                      squareFeet={items?.item?.squareFeet}
                    />
                ))}
            </div>
            <p className="text-[#09858D]  text-sm  lg:ml-6 2xl:ml-8 2xl:my-5 lg:text-2xl font-[500] ">
              see {displayListings.length} new listings for rent
            </p>
          </div>
        </div>
      </section>

      <div className="w-full  mt-[3rem] lg:mb-[2rem] h-[2px] bg-[#D9D9D9] " />

      {/* afforable component */}

      <section className="mt-4 lg:-mt-[1em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   flex-col items-center justify-center">
          <div className="flex   p-2 flex-col md:flex-row  2xl:gap-[10rem] lg:my-[2rem] lg:flex-row    justify-around items-center  md:items-start ">
            <h1 className="text-black lg:pl-[4.5rem] xxl:pl-[6.5rem]    2xl:pl-0 text-[26px] lg:text-[2.5rem] font-[600]   w-full ">
              Explore Lagos Rentals
            </h1>
            <p className="text-gray  lg:pr-5 text-base lg:text-xl font-bricolage w-full lg:w-[55rem] 2xl:w-[60rem] ">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                ?.slice(0, 3) // Create a shallow copy to avoid modifying the original array
                ?.sort(() => Math.random() - 0.5)
                ?.map((items: Property, index: number) => (
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
                      }                      _id={items?._id}

                      title={items?.item?.title || "Untitled Property"}
                      rent={items?.item?.rent || "Rent details not provided"}
                      squareFeet={items?.item?.squareFeet}
                    />
                ))}
            </div>
            <p className="text-[#09858D]  text-base lg:ml-6 2xl:ml-8  my-5 lg:text-2xl font-[500] ">
              see {displayListings.length} explore listings for rent
            </p>
          </div>
        </div>
      </section>
      {/*  upcoming houdes*/}
      <section className="lg:mt-10   2xl:my-[2em] lg:my-[2em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex   lg:w-[92%]   2xl:w-[95rem] flex-col items-center justify-center">
          <div className="flex    p-2 flex-col w-full  2xl:ml-0 md:flex-row 2xl:gap-[10%] lg:my-[2rem] lg:flex-row md:gap-10    justify-end items-center  md:items-start ">
            <h1 className="text-black lg:ml-4  2xl:pl-[2rem] xxl:pl-[3rem] text-[26px] lg:text-[2.5rem] font-[600]   w-full ">
              {" "}
              pet-friendly Rental
            </h1>
            <p className="text-gray  lg:p-0 text-sm lg:text-xl font-bricolage w-full lg:w-[50rem]">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                .sort(() => Math.random() - 0.5)
                ?.map((items: Property, index: number) => (
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
                      _id={items?._id}

                      title={items?.item?.title || "Untitled Property"}
                      rent={items?.item?.rent || "Rent details not provided"}
                      squareFeet={items?.item?.squareFeet}
                    />
                ))}
            </div>

            <p className="text-[#09858D] 2xl:ml-[2.5rem]  lg:ml-6  text-base mt-5 lg:text-2xl font-[500] ">
              See all {displayListings.length} pet-friendly houses for rent
            </p>
          </div>
        </div>
      </section>

      {/* luxury */}

      {/* testimonials */}
      <section className="lg:mt-10  2xl:my-[4em] lg:my-[3em] w-full  font-bricolage lg:flex justify-center flex-col flex-1 items-center">
        <div className="flex  lg:w-[100%]  xxl:w-[89%]    2xl:w-full flex-col items-center justify-center">
          <div className="flex   p-2 flex-col w-full  2xl:ml-0 md:flex-row  lg:my-[2rem] lg:flex-row     justify-end items-center  md:items-start ">
            <h1 className="text-black  text-[26px] xl:ml-[3.2rem] 2xl:ml-[0rem] lg:text-[2.5rem] font-[600]   w-full ">
              {" "}
              Single Family Homes for Rent
            </h1>
            <p className="text-gray  text-sm lg:p-0 lg:text-xl font-bricolage w-full lg:w-[50rem]">
              Discover a home where every detail enhances your lifestyle-crafted
              to fit your taste and needs.
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mt-[1em] min-w-fit items-center justify-center mb-2">
              {[...displayListings]
                .slice(0, 3) // Create a shallow copy to avoid modifying the original array
                ?.map((items: Property, index: number) => (
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
                      _id={items?._id}
                      title={items?.item?.title || "Untitled Property"}
                      rent={items?.item?.rent || "Rent details not provided"}
                      squareFeet={items?.item?.squareFeet}
                    />
                ))}
            </div>

            <p className="text-[#09858D]  text-sm  lg:ml-[2.3rem] 2xl:ml-[2.5rem]  mt-5 lg:text-2xl font-[500] ">
              See all {displayListings.length} single family House rents for
              rent
            </p>
          </div>
        </div>
      </section>

      {/* New-articles */}
      <Article />
    </>
  );
}
