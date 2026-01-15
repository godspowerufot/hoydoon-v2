"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// import { useSelector } from "react-redux";
// import { log } from "@/utils/log";
import { toast } from "react-toastify";

import Input from "@/app/components/common/inputs/input";
import ForgetOtpVerify from "./otp/otp";
import { useResendOtpMutation } from "@/store/slices/api/authapi";
import { useDispatch } from "react-redux";
import { setUnverifiedEmail } from "@/store/slices/authslice";
import PasswordConfirm from "./new-password";

const OtpVerify = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // Start from step 1
  const [isLoading, setIsLoading] = useState(false);
  const [ResendCode] = useResendOtpMutation();
  const dispatch = useDispatch();
  dispatch(setUnverifiedEmail(email.toLowerCase()));
  const resendOtp = async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      await ResendCode(email.toLowerCase()).unwrap();
      toast.success("OTP resent successfully!");
      setStep(2);
    } catch (err: unknown) {
      // Handle different error response formats
      let errorMessage = "Something went wrong";

      if (typeof err === "object" && err !== null) {
        // Check for error in data property (RTK Query format)
        if ("data" in err && typeof err.data === "object" && err.data !== null && "error" in err.data) {
          errorMessage = (err.data as { error?: string }).error || errorMessage;
        }
        // Check for error property directly
        else if ("error" in err) {
          errorMessage = (err as { error?: string }).error || errorMessage;
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = () => {
    resendOtp();
  };

  return (
    <>
      <div className="flex lg:items-center w-full justify-center h-screen lg:h-full ">
        <div className=" h-screen  lg:py-1 justify-center md:items-center  flex   2xl:mt-[0.6rem] ">
          {step === 1 && (
            <div className=" gap-[4rem]   md:flex flex-1 flex-col md:flex-row">
              <Image
                alt="authBanner"
                width={400}
                loading="lazy"
                height={400}
                quality={100} // Ensures maximum quality
                src={"/otp-1.png"}
                className="rounded-[24px] hidden  md:block w-[480px] h-[600px] lg:w-[500px] lg:h-[650px] xl:w-[700px] xl:h-[700px] 2xl:w-[600px] 2xl:h-[700px] object-cover "
                style={{ objectFit: "cover" }}
              />

              <div className=" w-full px-4 max-w-[500px] items-start mt-3 2xl:-mt-4  flex flex-col">
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
                    src={"/newlogo.svg"}
                  />
                </Link>

                <div className=" 2xl:mt-[1rem]  mt-[1rem] flex lg:justify-center flex-col font-bricolage items-start lg:items-center w-full ">
                  <div className=" w-full  2xl:mt-1 h-[1px] bg-[#D9D9D9] " />

                  <h1 className="text-[32px] mt-5  lg:mt-[32px]  xl:text-[36px] 2xl:text-[40px] font-medium text-gray-900 mb-2 leading-tight">
                    Forgot Password
                  </h1>
                  <p className="font-light text-gray text-center  xl:text-lg ">
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
                    className="p-3 lowercase"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full lg:mt-[32px] bg-primary mt-5 rounded-full text-white font-semibold py-3 px-4 text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-5 flex items-center justify-center gap-2"
                  >
                    {isLoading && (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {isLoading ? "Sending..." : "Reset"}
                  </button>
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
