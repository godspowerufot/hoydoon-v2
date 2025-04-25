"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useActivateAccountMutation, useResendOtpMutation } from "@/store/slices/api/authapi";
import { useSelector } from "react-redux";
import { log } from "@/utils/log";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const OtpVerify = () => {
  const [activateOtp, { isLoading, isSuccess, error }] = useActivateAccountMutation();
  const [ResendCode] = useResendOtpMutation();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const email = useSelector((state) => state.auth.unverifiedEmail);
  const [isResent, setIsResent] = useState(false);

  const router = useRouter();

  const resendOtp = async () => {
    if (!email) return;
    try {
      const response = await ResendCode(email).unwrap();
      console.log("OTP auto-resent:", response);
      setIsResent(true); // Mark as resent after successful resend
    } catch (err) {
      console.error("Error resending OTP:", err);
    }
  };

  useEffect(() => {
    if (email && !isResent) {
      resendOtp(); // Auto-resend on mount
    }
  }, [email, isResent]); // Depend on email and isResent

  const handleResendClick = () => {
    setIsResent(false); // Reset before manual resend
    resendOtp(); // Trigger resend on button click
  };

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        setActiveInput(index + 1);
      }
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSubmit = async () => {
    if (!isOtpComplete) return;
    const code = otp.join("");
    try {
       await activateOtp({ email, otp: code }).unwrap();
    toast.error("account successfully activated");
      router.push("/auth/sign-in"); // Mark as resent after successful resend
    } catch (err) {
      console.error("Error resending OTP:", err);
    }
    // Call the API here to verify the OTP

    // Example using fetch or RTK mutation can go here
  };

  return (
    <>
      <div className="flex items-center w-full justify-center">
        <div className=" h-screen justify-center lg:items-center  flex  py-[1rem] 2xl:mt-[0.6rem]">
          <div className=" gap-[4rem]   flex flex-1 flex-col lg:flex-row">
            <Image
              alt="authBanner"
              width={400}
              loading="lazy"
              height={400}
              quality={100} // Ensures maximum quality
              src={"/verification.png"}
              className="hidden lg:block   2xl:-mt-[0.9rem] mt-[5px] rounded-3xl w-[37rem] h-[39.5rem]  2xl:h-[48rem] 2xl:w-[50rem]"
              style={{ objectFit: "cover" }}
            />

            <div className=" w-full lg:w-[60%] items-start mt-3 2xl:-mt-4  flex flex-col">
              <Link
                href="/"
                className="flex justify-start lg:ml-[2rem]         "
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

              <span className=" 2xl:mt-[1rem]  mt-[1rem] flex justify-center flex-col font-bricolage items-center w-full ">
                <div className="lg:w-[80%] w-full  2xl:mt-1 h-[1px] bg-[#D9D9D9] " />

                <h1 className="text-black  text-[2rem] lg:text-[2rem]  pt-3 lg:pt-[1rem]   2xl:pt-[1rem]  2xl:text-4xl font-bricolage font-[600]">
                  Confirm your Number
                </h1>
                <p className="font-light text-gray   lg:pt-[0.6rem]     text-center w-[23rem] text-[13.5px]">
                  Enter the verification code we sent to email. ({" "}
                  <b>Use a different phone number</b>)
                </p>

                <div className="2xl:mt-[2rem]  lg:mt-[32px] text-[32px]  font-[500]  p-4 lg:p-0 flex flex-col gap-[1em] w-full  lg:w-[80%] ">
                  <div className="flex gap-3">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        autoFocus={idx === activeInput}
                        className="w-[55px] h-[55px] text-center bg-white text-xl border border-[#8F8F8F] rounded-[16px] focus:outline-none"
                      />
                    ))}
                  </div>
                  <div
                    className="flex items-center w-full "
                    onClick={handleResendClick}
                  >
                    <p
                      id="rememberme"
                      className="flex items-center underline  decoration-[#1e1e1e] text-[#1E1E1E] text-[1rem] font-[300]   cursor-pointer"
                    >
                      Resend Code
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!isOtpComplete}
                    className={`w-full mt-[2rem] rounded-full font-[500] text-[17.5px] p-2 h-[3rem] ${
                      isOtpComplete
                        ? "bg-primary text-white"
                        : "bg-primary text-white cursor-not-allowed"
                    }`}
                  >
                    Submit
                  </button>
                  <p
                    id="rememberme"
                    className="flex items-center underline mt-1 decoration-[#1e1e1e] text-[#1E1E1E] text-[1rem] font-[300]   cursor-pointer"
                  >
                    Remind me later
                  </p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default OtpVerify;
