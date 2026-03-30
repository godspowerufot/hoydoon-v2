"use client";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import Button from "../components/common/Button";
import Input from "../components/common/inputs/input";
import Link from "next/link";
import { toast } from "react-toastify";
import SearchBar from "../components/common/searchcomponent";
import Article from "../components/common/Article";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LocationSearchBar from "../components/layouts/maploader";
import PropertySearchBar from "../components/common/headerSearch";
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
        toast.info("coming soon!!");
    };
    return (
        <>
            <header className="relative h-[60dvh]    md:h-[100vh] lg:h-[100vh] w-screen overflow-visible">
                {/* Background Image Div */}
                <div
                    className="absolute top-0 left-0 w-screen h-full bg-center bg-cover bg-no-repeat z-[-1]"
                    style={{
                        backgroundImage:
                            "url('https://hoydoonstorage.blob.core.windows.net/web-images/seller.webp')",
                    }}
                >
                    {/* Overlay Div */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.1] z-[-1]"></div>
                </div>

                {/* Content Section */}
                <div className="flex z-[1] mt-[4rem] p-4 lg:p-0 md:h-full  relative gap-[10px] lg:gap-6 justify-center items-center flex-col">
                    {/* Main Heading */}
                    <h1 className="lg:w-[12em] text-white text-[2em] w-full leading-[1em] text-center lg:text-[5em] font-bricolage font-[600]">
                        Get Personalized Proposals, at no cost
                    </h1>
                    {/* Subheading */}
                    <h2 className="lg:text-[1.5em] capitalize lg:leading-[2rem] text-sm 2xl:text-[1.6em]  font-[400] text-center text-[#FFFFFFB2] lg:w-[33em]">
                        Get free, customized quotes from local agents ready to assist you.
                        Fast, easy, and no obligation.
                    </h2>

                    {/* Large Screen Search Bar */}
                    {/* Large Screen Search Bar */}
                    {/* Search Bar (Large Screens) */}
                    <PropertySearchBar />
                </div>
            </header>

            {/* this hold the images */}

            {/* explore */}
            <section className="mt-10   lg:mt-[5em] w-full  font-bricolage flex justify-center  flex-col lg:flex-row gap-7  lg:max-w-[1200px] flex-1 items-center">
                <div className="lg:w-[24rem]  lg:h-[32rem]    rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
                    {/* Image Section */}
                    <div className="relative h-52 w-full">
                        <Image
                            src="https://hoydoonstorage.blob.core.windows.net/web-images/sell1.webp" // Replace with actual image path
                            alt="Agents talking"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="p-6  relative">
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
                    </div>
                    <div className="m-4">
                        <Link href={"/rent/fixes"}>
                            <Button className="!w-full mt-6 lg:-mt-4 text-base   h-[3rem] lg:!p-2">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="lg:w-[24rem]  lg:h-[32rem]   rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
                    {/* Image Section */}
                    <div className="relative h-52 w-full">
                        <Image
                            src="https://hoydoonstorage.blob.core.windows.net/web-images/sell2.webp" // Replace with actual image path
                            alt="Agents talking"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="p-6 relative">
                        <h4 className="text-gray-800 font-[500] text-base">
                            Hoydoon’s Marketplace
                        </h4>
                        <h2 className="text-xl font-bold text-black mt-2">
                            Cut costs and save smart.
                        </h2>
                        <p className="text-[#8F8F8F] text-sm lg:text-[14px] mt-5">
                            On average, our service fees are up to 50% lower than standard
                            industry rates. By streamlining the process and connecting you
                            directly with trusted agents, we help you save without sacrificing
                            quality.
                        </p>

                        <Link className="lg:hidden block " href={"/agent/all-agent"}>
                            <Button className="w-full 2xl:mt-[3rem] mt-8 text-base 2xl:text-xl  text-gray lg:h-[4rem]  h-[3rem] lg:p-3">
                                Visit Seller marketplace
                            </Button>
                        </Link>
                    </div>
                    <div className="m-4">
                        <Link className=" hidden lg:block " href={"/agent/all-agent"}>
                            <button className="w-full    relative bottom-2  rounded-full items-center justify-center flex bg-transparent border-[#1E1E1E]  border-solid border-[1px] text-black  mt-3 text-base h-[3rem] p-3">
                                Visit Seller marketplace
                            </button>
                        </Link>{" "}
                    </div>
                </div>

                <div className="lg:w-[24rem] w-full   lg:h-[32rem]       rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
                    {/* Image Section */}
                    <div className="relative h-52 w-full">
                        <Image
                            src="https://hoydoonstorage.blob.core.windows.net/web-images/sell3.webp" // Replace with actual image path
                            alt="Agents talking"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="p-6 ">
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
                    </div>
                    <div className="m-4">
                        <div className=" relative -mt-4 2xl:-mt-[2.7rem] rounded-full     w-[21rem]  ">
                            <Input
                                label=""
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="  p-5  !h-[2.8rem] !rounded-[24px] mt-[3rem]"
                                placeholder="Enter your home address"
                            />

                            <div
                                onClick={handleSearch}
                                className="absolute right-2 top-[12%]  bg-primary ml-[6em] p-3  h-[35px] w-[35px]  rounded-full flex items-center justify-center"
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

            <section className="   font-bricolage flex  lg:mt-[3em]  justify-center flex-col flex-1 items-center ">
                <div className="flex  lg:max-w-[1200px] 2xl:gap-[1%]  gap-[1.5rem]  lg:gap-[4rem]  flex-col-reverse   2xl:w-[95rem] lg:pl-5 lg:my-[2em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
                    <span className="flex flex-col  gap-5 w-full lg:w-[45em]  ">
                        <h2 className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
                            Ready to sell your home?.
                        </h2>
                        <p className="text-gray text-sm lg:text-xl mt-3  font-bricolage font-light lg:w-[40rem]">
                            Ready to sell your home? Let us help you maximize its value and
                            make the process stress-free. Schedule a consultation today and
                            take the first step toward a successful sale
                        </p>

                        <Button className="text-base py-2 w-[205px] font-light mt-5 ">
                            <Link href="/sell/sell-home"> Schedule</Link>
                        </Button>
                    </span>

                    <span className=" mt-[3rem]   lg:mt-0">
                        <Image
                            alt="image1"
                            width={500}
                            quality={100}
                            className=" 2xl:w-[50rem] 2xl:ml-[2rem] lg:w-[50rem]  object-contain  w-fit lg:h-[28rem] 2xl:h-[36rem]"
                            height={400} // Reduced size of logo
                            src={"/sell-1.png"}
                        />
                    </span>
                </div>
            </section>
            {/* afforable component */}

            {/* New-articles */}
            <div className="w-full flex justify-center items-center lg:mt-[3em]">
                <Article />
            </div>
        </>
    );
}
