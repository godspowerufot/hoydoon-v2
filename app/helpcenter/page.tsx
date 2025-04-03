"use client ";
import Image from "next/image";
import { properties } from "@/constants";
import ArticleCard from "../components/common/articleLayout";
function SupportCategories() {
  const categories = [
    "Landlord & Agents",
    "Buyers & Rentals",
    "Email Alerts",
    "Technical Assistance",
    "Account Assistance",
    "Mobile Apps",
  ];

  return (
    <div className="grid w-[1230px] 2xl:w-[1580px] grid-cols-3 gap-4 p-4">
      {categories.map((category, index) => (
        <button
          key={index}
          className="border border-primary text-xl font-[500] px-6 py-3 rounded-md"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="relative h-[45em] lg:h-[35em] items-center justify-center w-screen">
        {/* Background Image Div */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/article.jpeg')" }}
        >
          {/* Overlay Div */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z[-1]"></div>
        </div>

        {/* Content Section */}
        <div className="flex z-[1] mt-[12rem]  relative gap-6 justify-center items-center flex-col">
          {/* Main Heading */}

          {/* Large Screen Search Bar */}
          {/* Large Screen Search Bar */}
          <div className="hidden lg:flex justify-center items-center w-full">
            <div className="flex h-[3.5em] py-4 font-bricolage items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[35em]">
              {/* Transparent Full-Width Input */}
              <input
                type="text"
                className="flex-1 bg-transparent placeholder:text-[1.2rem] text-black placeholder-gray-500 border-none outline-none pl-4 w-[36.3rem]"
                placeholder="search"
              />

              {/* Search Button */}
              <div className="relative mr-2 p-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-white before:via-white/30 before:to-white/10 before:p-[1px]">
                <div className="relative bg-primary ml-[1em] p-2 3 w-[40px] h-[40px] rounded-full flex items-center justify-center">
                  <Image
                    alt="logo"
                    width={40}
                    loading="lazy"
                    height={40}
                    quality={100} // Ensures maximum quality
                    src={"/search.png"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Small Screen Search Bar */}
          <div className="lg:hidden  justify-center items-center w-full px-2 py-3">
            <div className="flex h-[4em] font-bricolage items-center m-5 bg-white rounded-full shadow-md w-[89%] md:w-4/5 lg:w-3/5">
              <div className="flex flex-col flex-1">
                <div className="text-sm text-gray">search</div>
              </div>
              <div className="bg-primary p-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90">
                <Image
                  alt="Search"
                  width={20}
                  height={20}
                  src={"/search.png"}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* this hold the images */}

      {/* explore */}
      <section className="  2xl:-mb-[8rem]  flex-col  hidden lg:mt-[3em] w-full  font-bricolage lg:flex justify-center   gap-4 2xl:gap-[1.5rem] flex-1 items-center">
        <div className="  grid  grid-row  grid-cols-1 md:grid-cols-3 gap-0 place-items-center gap-y-6">
          {properties.map((property, index) => (
            <ArticleCard
              key={index}
              imageSrc={property.imageSrc}
              altText={property.altText}
            />
          ))}
        </div>
        {/* <Pagination totalPages={} /> */}

        <div className="w-full  mt-[3rem] mb-[2rem] h-[2px] bg-[#D9D9D9] " />

        <SupportCategories />
      </section>
    </>
  );
}
