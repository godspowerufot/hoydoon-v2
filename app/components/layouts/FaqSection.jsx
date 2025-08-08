// components/TestimonialsSection.tsx
"use client";

import Image from "next/image";
import Button from "../common/Button";
import FAQComponent from "../layouts/faq";
export default function FagsSection() {
  return (
    <section className=" mt-[20px]  w-full  lg:mt-[7%]   flex flex-1 justify-center items-center  flex-col   p-2 lg:p-0 font-bricolage ">
      <div className="lg:flex  hidden flex-col lg:flex-row md:flex-row  lg:gap-[6rem]  justify-around  items-start lg:items-center  ">
        <span className="flex flex-col  font-bricolage lg:ml-[1rem]  gap-2">
          <h1 className="text-black  lg:text-[2.5rem] 2xl:text-5xl font-[600] ">
            Your Questions, Our Answers
          </h1>
          <p className="text-gray   lg:p-0 text-base  lg:text-xl font-bricolage w-full lg:w-[30em]">
            Whether you’re curious about our services, need help with specific
            issues..
          </p>
        </span>
        <span className=" hidden lg:flex flex-col font-bricolage gap-3 text-gray">
          <p className="text-gray    lg:p-0 text-sm lg:text-xl font-bricolage w-full lg:w-[25em]">
            Welcome to our FAQ center, where you can find answers to all your
            most pressuring questions
          </p>
          {/* <Button className="bg-transparent mt-2  font-[3px] border-primary border-solid border-[1px] ">
          <p className="text-gray" >
            {" "}
            Explore{" "}
          </p>
        </Button> */}
        </span>
      </div>
      <div className="-mt-[3rem] lg:-mt-[6rem]  lg:ml-[8rem] 2xl:ml-[4rem]  justify-center items-center max-md:w-full w-full gap-6 flex flex-col-reverse max-md:justify-center max-md:items-center lg:flex-row ">
        <div className="z-[4] lg:block relative max-md:w-full  lg:h-[50em]  lg:left-[30px] 2xl:left-[10px] lg:top-[11em]">
          <div className="lg:hidden flex  flex-col lg:flex-row md:flex-row   2xl:gap-[14rem] lg:gap-[6rem]  justify-around items-start lg:items-center  ">
            <span className="flex flex-col  font-bricolage lg:ml-[1rem] 2xl:ml-[1rem]  gap-2">
              <h1 className="text-black  text-[1.5rem] 2xl:text-5xl font-[600] mr-3 ">
                Your Questions, Our Answers
              </h1>
            </span>
            <span className=" flex flex-col  my-4 mb-8 font-bricolage gap-3 text-gray">
              <p className="text-gray text-sm     font-[300] lg:p-0  lg:text-xl font-bricolage w-full lg:w-[25em]">
                Welcome to our FAQ center, where you can find answers to all
                your most pressuring questions
              </p>
            </span>
          </div>
          <FAQComponent />
        </div>
        <div className="relative mt-[4rem] lg:mt-[3rem] lg:0 ml-10 lg:-ml-[7em] justify-center items-center  flex w-3/5 lg:w-auto">
          <Image
            alt="image1"
            width={420}
            loading="lazy"
            height={500}
            src={"/q1.png"}
            className="z-[3]  w-[16rem] h-[21rem] lg:w-[27rem] 2xl:w-[600px] rounded-[20px] relative  left-[0.5rem] 2xl:left-[2rem] lg:h-[37rem]  object-cover "
          />{" "}
          <Image
            alt="image1"
            width={400}
            loading="lazy"
            height={300}
            src={"/q2.png"}
            className=" z-2  top-[0.5rem]  w-[12rem] h-[18rem]  bottom-[2em] lg:h-[30rem]   lg:w-[35rem]    lg:-left-[11em] -left-[2.8em]  2xl:-left-[9rem] lg:mt-[9px]  relative rounded-[20px]   object-cover "
          />
        </div>
      </div>
    </section>
  );
}
