"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// import { useSelector } from "react-redux";
// import { log } from "@/utils/log";
import { toast } from "react-toastify";

import Input from "@/app/components/common/inputs/input";
import Button from "@/app/components/common/Button";
import ForgetOtpVerify from "./otp/otp";
import { useResendOtpMutation } from "@/store/slices/api/authapi";
import { useDispatch } from "react-redux";
import { setUnverifiedEmail } from "@/store/slices/authslice";
import PasswordConfirm from "./new-password";

const OtpVerify = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // Start from step 1
  const [ResendCode] = useResendOtpMutation();
  const dispatch = useDispatch();
  dispatch(setUnverifiedEmail(email));
  const resendOtp = async () => {
    if (!email) return;
    try {
      await ResendCode(email).unwrap();
      toast.success("OTP resent successfully!");
      setStep(2);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "error" in err) {
        toast.error(
          (err as { error?: string }).error || "Something went wrong"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  const handleSubmit = () => {
    resendOtp();
    setStep(2);
  };

  return (
    <>
      <div className="flex lg:items-center w-full justify-center h-screen lg:h-full ">
        <div className=" h-screen  lg:py-1 justify-center lg:items-center  flex   2xl:mt-[0.6rem] ">
          {step === 1 && (
            <div className=" gap-[4rem]   flex flex-1 flex-col lg:flex-row">
              <Image
                alt="authBanner"
                width={400}
                loading="lazy"
                height={400}
                quality={100} // Ensures maximum quality
                src={"/otp-1.png"}
                className="hidden lg:block   2xl:-mt-[0.9rem] mt-[5px] rounded-3xl w-[37rem] h-[39.5rem]  2xl:h-[48rem] 2xl:w-[50rem]"
                style={{ objectFit: "cover" }}
              />

              <div className=" w-full px-4 lg:w-[60%] items-start mt-3 2xl:-mt-4  flex flex-col">
                <Link
                  href="/"
                  className="flex lg:justify-start  lg:ml-[2rem]         "
                >
                  <Image
                    alt="logo"
                    width={30}
                    priority
                    quality={100}
                    objectFit="cover"
                    height={30}
                    className="w-[10rem] h-[4rem] 2xl:w-[12rem]" // Reduced size of logo
                    src={"/logo2.svg"}
                  />
                </Link>

                <div className=" 2xl:mt-[1rem]  mt-[1rem] flex lg:justify-center flex-col font-bricolage items-start lg:items-center w-full ">
                  <div className=" w-full  2xl:mt-1 h-[1px] bg-[#D9D9D9] " />

                  <h1 className="text-black  text-[2rem] lg:text-[2rem]  pt-3 lg:pt-[1rem]   2xl:pt-[1rem]  2xl:text-4xl font-bricolage font-[600]">
                    Forgot Password
                  </h1>
                  <p className="font-light text-gray   lg:pt-[0.6rem] text-start     lg:text-center lg:max-w-[25rem] text-[13.5px]">
                    Enter your email address and we ’II send you confirmation
                    code to reset your password{" "}
                  </p>
                </div>

                <div className="lg:mt-[32px] font-bold mt-2    lg:p-0 flex flex-col gap-[1em] w-full   ">
                  <Input
                    label="Email Address"
                    type="text"
                    placeholder="Enter Email Address "
                    value={email}
                    className="p-3"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="!w-full lg:!w-full  font-medium 2xl:mt-2 mt-2 text-base 2xl:text-xl rounded-sm lg:rounded-full h-[2.5rem] lg:h-[2.8rem] p-4"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}
          {step === 2 && <ForgetOtpVerify setStep={setStep} />}
          {step === 3 && <PasswordConfirm />}
        </div>
      </div>{" "}
    </>
  );
};

export default OtpVerify;
