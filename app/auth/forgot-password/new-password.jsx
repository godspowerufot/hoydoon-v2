"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Input from "@/app/components/common/inputs/input";
import Button from "@/app/components/common/Button";
import { useChangePasswordMutation } from "@/store/slices/api/authapi";
const PasswordConfirm = () => {
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const email = useSelector((state) => state.auth.unverifiedEmail);
  const otp = useSelector((state) => state.auth.unverifiedOtp);

  const router = useRouter();
  const handleSubmit = async () => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const valid = passwordRegex.test(password);
    const match = password === conpassword;

    setIsPasswordValid(valid);
    setDoPasswordsMatch(match);

    if (!valid || !match) return;

    if (!email || !otp) {
      toast.error("Missing OTP or email information.");
      return;
    }

    try {
      const respond = await changePassword({
        email,
        password,
        otp,
      }).unwrap();
      toast.success("Password reset successfully. You can now log in.");
      router.push("/auth/sign-in");
      console.log(respond);
    } catch (error) {
      const message =
        error?.data?.message || "Failed to reset password. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="flex lg:items-center w-full justify-center min-h-screen">
      <div className="w-full flex justify-center py-10 px-4">
        <div className="gap-[4rem] flex flex-1 flex-col lg:flex-row">
          <Image
            alt="authBanner"
            width={400}
            loading="lazy"
            height={400}
            quality={100}
            src={"/newpassword.png"}
            className="rounded-[24px] w-[480px] h-[600px] lg:w-[800px] lg:h-[650px] xl:w-[700px] xl:h-[700px] 2xl:w-[700px] 2xl:h-[700px] object-cover "
            style={{ objectFit: "cover" }}
          />

          <div className=" w-full px-4 max-w-[550px] items-start  flex flex-col">
            <Link href="/" className="flex lg:justify-start lg:ml-[2rem]">
              <Image
                alt="logo"
                width={30}
                priority
                quality={100}
                height={30}
                className="w-[10rem] h-[4rem] 2xl:w-[12rem]"
                src={"/logo2.svg"}
              />
            </Link>

            <div className="2xl:mt-[1rem] mt-[1rem] flex lg:justify-center flex-col font-bricolage items-start lg:items-center w-full">
              <div className="w-full 2xl:mt-1 h-[1px] bg-[#D9D9D9]" />

              <h1 className="text-black text-[2rem] pt-3 lg:text-[2rem] 2xl:text-4xl font-bricolage font-[600]">
                Create New Password
              </h1>
              <p className="font-light text-gray lg:pt-[0.6rem] text-start lg:text-center lg:max-w-[25rem] text-[13.5px]">
                Create your new password. If you forget it, then you have to do
                forget password again.
              </p>
            </div>

            <div className="lg:mt-[32px] font-bold mt-2 lg:p-0 flex flex-col gap-[2em] w-full">
              <Input
                label="Enter new password"
                type="password"
                className="mt-1"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  setIsPasswordValid(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      value
                    )
                  );
                }}
              />
              {!isPasswordValid && (
                <p className="text-[0.7em] text-gray -mt-1  2xl:text-[0.8em] font-[300] ">
                  It must be a combination of 8 words, letters, numbers, symbols
                </p>
              )}

              <Input
                label="Confirm Password"
                type="password"
                className="mt-1"
                placeholder="Confirm password"
                value={conpassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setConPassword(value);
                  setDoPasswordsMatch(password === value);
                }}
              />
              {!doPasswordsMatch && (
                <p className="text-[0.7em] text-gray -mt-1  2xl:text-[0.8em] font-[300] ">
                  Passwords do not match.
                </p>
              )}

              <Button
                type="submit"
                onClick={handleSubmit}
                className="!w-full font-medium 2xl:mt-2 mt-2 text-base 2xl:text-xl rounded-sm lg:rounded-full h-[3rem] lg:h-[3rem] p-5"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirm;
