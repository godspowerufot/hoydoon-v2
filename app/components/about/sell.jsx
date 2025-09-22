"use client";
/* eslint-disable */
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import Input from "../common/inputs/input";

const Sell = () => {
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
    <div>
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/seller.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Get Personalized Proposals — No Cost!
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Need help buying, selling, or renting a property? Get free,
          personalized quotes from experienced local agents who understand your
          market and are ready to guide you every step of the way. Simply share
          a few details about your needs, and you’ll be matched with trusted
          professionals offering competitive rates and expert advice. It’s fast,
          easy, and completely obligation-free—so you can compare options and
          choose the right agent with confidence.{" "}
        </p>
      </div>
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
              <Button className="!w-full 2xl:mt-[4.5rem] mt-6 text-base 2xl:text-xl lg:h-[3rem]  h-[3rem] lg:!p-2">
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
              <Button className="w-full 2xl:mt-[4.5rem] mt-8 text-base 2xl:text-xl  text-gray lg:h-[4rem]  h-[3rem] lg:p-3">
                Visit Seller marketplace
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:w-[24rem] w-full lg:h-[32rem]   rounded-[20px] bg-[#F9FAFB] overflow-hidden border border-none">
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

            <div className="  rounded-full relative  w-full lg:w-[21rem] mt-[1.5rem] 2xl:w-[25rem]">
              <Input
                label=""
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="2xl:h-[4rem]  p-5 !rounded-[24px] mt-[4.5rem]"
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
      <div className="flex  lg:max-w-[1200px] 2xl:gap-[1%]  gap-[1.5rem]  lg:gap-[4rem]  flex-col-reverse   2xl:w-[95rem] 2xl:pl-[2.5em] lg:pl-5 lg:mt-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
        <span className="flex flex-col  gap-5 w-full lg:w-[45em]  ">
          <h1 className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
            Ready to sell your home?.
          </h1>
          <p className="text-gray text-sm lg:text-xl mt-3 2xl:mt-[2em] font-bricolage lg:w-[40rem]">
            Ready to sell your home? Let us help you maximize its value and make
            the process stress-free. Schedule a consultation today and take the
            first step toward a successful sale
          </p>

          <Button className="text-base py-2 w-[205px] font-light mt-5 ">
            <Link href="/sell/sell-home"> Get Started</Link>
          </Button>
        </span>

        <span className=" mt-[4.5rem]  lg:mt-0">
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
    </div>
  );
};
export default Sell;
