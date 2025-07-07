"use client";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import Input from "../components/common/inputs/input";
import Link from "next/link";
import SearchBar from "../components/common/searchcomponent";
import Article from "../components/common/Article";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LocationSearchBar from "../components/layouts/maploader";
export default function Home() {
  const [formData, setFormData] = useState({
    location: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      ...(formData.location && { location: formData.location }),
    }).toString();

    router.push(`/agent/all-agent?${queryParams}`);
  };
  return (
    <>
      <header className="relative   lg:h-[88vh] w-screen">
        {/* Background Image Div */}
        <div
          className="absolute top-0 left-0 w-screen h-full bg-center bg-cover bg-no-repeat z-[-1]"
          style={{ backgroundImage: "url('/seller.png')" }}
        >
          {/* Overlay Div */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.1] z-[-1]"></div>
        </div>

        {/* Content Section */}
        <div className="flex z-[1] p-4 lg:p-0  relative gap-[10px] lg:gap-6 justify-center items-center flex-col">
          {/* Main Heading */}
          <h1 className="lg:w-[12em] mt-[1.5em] 2xl:mt-[9rem] lg:mt-[1.4em] text-white text-[2em] w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
            Get Personalized Proposals — No Cost!
          </h1>
          {/* Subheading */}
          <h2 className="lg:text-[1.5em] capitalize lg:leading-[2rem] text-sm 2xl:text-[1.6em]  font-[400] text-center text-[#FFFFFFB2] lg:w-[33em]">
            Get free, customized quotes from local agents ready to assist you.
            Fast, easy, and no obligation.
          </h2>

          {/* Large Screen Search Bar */}
          {/* Large Screen Search Bar */}
          {/* Search Bar (Large Screens) */}
          <LocationSearchBar />
        </div>
      </header>

      {/* this hold the images */}

      {/* explore */}
      <section className="mt-10   lg:my-[4em] w-full  font-bricolage flex justify-center  flex-col lg:flex-row gap-7 2xl:gap-[3rem] lg:max-w-[1200px] flex-1 items-center">
        <div className="lg:w-[24rem]  lg:h-[32rem]    rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
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
            <h4 className="text-gray-800 font-[500] text-base">
              Hoydoon’s Selling
            </h4>
            <h2 className="text-xl font-bold text-black mt-2">
              Choose the perfect agent for your needs.
            </h2>
            <p className="text-[#8F8F8F] font-bricolage text-sm lg:text-[14px] mt-5">
              Complete a quick questionnaire to discover the best agents in your
              area. Review their pricing, services, and ratings to find the one
              that fits your needs perfectly.
            </p>

            <Link href={"/agent/all-agent"}>
              <Button className="!w-full 2xl:mt-[3rem] mt-6 text-base 2xl:text-xl lg:h-[3rem]  h-[3rem] lg:!p-2">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:w-[24rem]  lg:h-[32rem]   rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
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
            <h4 className="text-gray-800 font-[500] text-base">
              Hoydoon’s Marketplace
            </h4>
            <h2 className="text-xl font-bold text-black mt-2">
              Cut costs and save big.{" "}
            </h2>
            <p className="text-[#8F8F8F] text-sm lg:text-[14px] mt-5">
              When you choose to buy and sell with us, youll benefit from a
              significantly reduced fee—only half of what most traditional
              brokerages typically charge—helping you save more while receiving
              exceptional service.{" "}
            </p>
            <Link className=" hidden lg:block " href={"/agent/all-agent"}>
              <button className="w-full   rounded-full items-center justify-center flex bg-transparent border-[#1E1E1E]  border-solid border-[1px] text-black  mt-3 text-base 2xl:text-xl h-[3rem]  2xl:h-[4rem] p-3">
                Visit Seller marketplace
              </button>
            </Link>
            <Link className="lg:hidden block " href={"/agent/all-agent"}>
              <Button className="w-full 2xl:mt-[3rem] mt-8 text-base 2xl:text-xl  text-gray lg:h-[4rem]  h-[3rem] lg:p-3">
                Visit Seller marketplace
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:w-[24rem]  lg:h-[32rem]   rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
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
            <h4 className="text-gray-800 font-[500] text-base">
              Hoydoon’s Value
            </h4>
            <h2 className="text-xl font-bold text-black mt-2">
              Track your home value with Hoydoon.
            </h2>
            <p className="text-[#8F8F8F] text-base lg:text-[14px] 2xl:text-base mt-5">
              Track your Hoydoon valuation over time and see how it compares to
              other homes in your area.{" "}
            </p>

            <div className="  rounded-full relative w-[21rem] mt-[1.5rem] 2xl:w-[25rem]">
              <Input
                label=""
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="2xl:h-[4rem]  p-5 !rounded-[24px] mt-[3rem]"
                placeholder="Enter your home address"
              />

              <div
                onClick={handleSearch}
                className="absolute right-2 top-[12%]  2xl:top-[12%] bg-primary ml-[6em] p-3  h-[35px] w-[35px] 2xl:w-[50px] 2xl:h-[50px] rounded-full flex items-center justify-center"
              >
                <Image
                  alt="logo"
                  width={30}
                  loading="lazy"
                  height={30}
                  quality={100} // Ensures maximum quality
                  src={"/arrow-left.png"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="   font-bricolage flex  justify-center flex-col flex-1 items-center ">
        <div className="flex  lg:max-w-[1200px] 2xl:gap-[1%]  gap-[1.5rem]  lg:gap-[4rem]  flex-col-reverse   2xl:w-[95rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
          <span className="flex flex-col  gap-5 w-full lg:w-[45em]  ">
            <h1 className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
              Ready to sell your home?.
            </h1>
            <p className="text-gray text-sm lg:text-xl mt-3 2xl:mt-[2em] font-bricolage lg:w-[40rem]">
              Ready to sell your home? Let us help you maximize its value and
              make the process stress-free. Schedule a consultation today and
              take the first step toward a successful sale
            </p>

            <Button className="text-base py-2 w-[205px] font-light mt-5 ">
              <Link href="/sell/sell-home"> Get Started</Link>
            </Button>
          </span>

          <span className=" mt-[3rem]  lg:mt-0">
            <Image
              alt="image1"
              width={500}
              quality={100}
              className=" 2xl:w-[50rem] lg:w-[50rem]  object-contain  w-fit lg:h-[28rem] 2xl:h-[36rem]"
              height={400} // Reduced size of logo
              src={"/sell-1.png"}
            />
          </span>
        </div>
      </section>
      {/* afforable component */}

      {/* New-articles */}
      <Article />
    </>
  );
}
