/* eslint-disable */
"use client";
import React, {  useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Input from "@/app/components/common/inputs/input";
import Button from "@/app/components/common/Button";
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";
import {
  useLoginMutation,
} from "@/store/slices/api/authapi";
import { sendDeviceInfo } from "../../../utils/lib/devicinfo";
import { log} from "@/utils/log";
import LoginButtons from "@/app/components/common/googlebutton";
import { setUnverifiedEmail } from "@/store/slices/authslice";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const [isPasswordValid, setIsPasswordValid] = useState(true);
const dispatch=useDispatch()
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      return;
    }

    try {
      const device = await sendDeviceInfo();

// Destructure to exclude region
const { region, ...deviceWithoutRegion } = device;
log("Device info:",region);
// Send login request with device info (without region)
 await login({ email, password, device: deviceWithoutRegion }).unwrap();

 toast.success("Login successful!");
 router.push("/");

    } catch (err:any) {
    
   // inside handleSubmit
if (err?.data?.error === "account is not active") {
  toast.error("Your account is not active. Please verify your email address.");
  dispatch(setUnverifiedEmail(email));
  router.push("/auth/sign-up/verification");
}
     
    }
  };
 


  return (
    <>
      <div className="flex items-center w-full justify-center">
        <div className=" h-screen justify-center items-center  flex  py-[1rem] 2xl:mt-[0.6rem]">
          <div className=" gap-[4rem]   flex flex-1 flex-col lg:flex-row">
            <Image
              alt="authBanner"
              width={400}
              loading="lazy"
              height={400}
              quality={100} // Ensures maximum quality
              src={"/authBanner.png"}
              className="hidden lg:block   2xl:-mt-[0.9rem] mt-[5px] rounded-3xl w-[37rem] h-[39.5rem]  2xl:h-[48rem] 2xl:w-[50rem]"
              style={{ objectFit: "cover" }}
            />

            <div className=" w-full lg:w-[50%] items-start mt-3 2xl:-mt-4  flex flex-col">
              <Link href="/" className="flex justify-start ml-[2rem]         ">
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

              <span className=" 2xl:mt-[1rem] flex justify-center flex-col font-bricolage items-center w-full ">
                <div className="w-[80%] 2xl:mt-1 h-[1px] bg-[#D9D9D9] " />

                <h1 className="text-black  text-[26px] lg:text-3xl  pt-3   2xl:mt-[1rem]  2xl:text-4xl font-bricolage font-[600]">
                  Welcome Back
                </h1>
                <p className="font-light text-gray pt-1  2xl:mt-[0.8rem]  text-xs 2xl:text-base">
                  Please log in to continue
                </p>

                <div className="2xl:mt-[2rem] mt-[1rem] flex flex-col gap-[1em] w-[80%] ">
                  <Input
                    label="Email Address"
                    type="text"
                    placeholder="Enter Email Address"
                    value={email} // ✅ Binding state
                    onChange={(e) => setEmail(e.target.value)} // ✅ Updating state
                  />

                  <Input
                    label="Password"
                    type="password"
                    className="mt-1"
                    placeholder="Enter Password"
                    value={password} // ✅ Binding state
                    onChange={(e) => {
                      setPassword(e.target.value);
                      // Check password validity while typing
                      const passwordRegex =
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                      setIsPasswordValid(passwordRegex.test(e.target.value));
                    }} // ✅ Updating state
                  />

                  {!isPasswordValid && (
                    <p className="text-[0.7em] text-gray -mt-1  2xl:text-[0.8em] font-[300] ">
                      It must be a combination of 8 words, letters, numbers,
                      symbols
                    </p>
                  )}

                  <div className="flex items-center  justify-end w-full gap-[7rem]">
                    <div className="flex items-center w-full 2xl:mt-2">
                      <label
                        id="rememberme"
                        className="flex items-center text-grey-700 font-[300]   cursor-pointer"
                      >
                        <input
                          name="rememberme"
                          type="checkbox"
                          className="mr-2 rounded-lg h-[20px] w-[25px]  cursor-pointer"
                        />
                        Remember me
                      </label>
                    </div>
                    <p className="text-primary font-meduim w-full   2xl:text-xl font-bricolage">
                      {" "}
                      Forgot password{" "}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    onClick={handleSubmit} // ✅ Correct way
                    className="w-full 2xl:mt-2 mt-2 text-base 2xl:text-[1.3rem] h-[4rem] p-4"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>

                  <div className="w-full 2xl:mt-3 h-[1px] bg-[#D9D9D9] " />
                  <div className="w-full text-black text-right font-[500] font-bricolage">
                    Or Log in with:
                  </div>
                
                  <div className="w-full flex gap-3 mt-[2px] ">
                  <LoginButtons />
          
                    <span className="w-[9em] gap-3 h-[2.5em]  2xl:text-[1.em] rounded-full p-3  2xl:h-[3em] 2x:p-4 border-gray border-solid border-[1px]   flex items-center text-black font-[500] text-[1em] justify-center ">
                      {" "}
                      <Image
                        alt="logo"
                        width={20}
                        loading="lazy"
                        objectFit="cover"
                        height={20} // Reduced size of logo
                        src={"/apple.png"}
                      />{" "}
                      Apple
                    </span>
                    <span className="w-[9em] gap-3 h-[2.5em]  2xl:text-[1.em] rounded-full p-3  2xl:h-[3em] 2x:p-4 border-gray border-solid border-[1px]   flex items-center text-black font-[500] text-[1em] justify-center ">
                      {" "}
                      <Image
                        alt="logo"
                        width={20}
                        loading="lazy"
                        objectFit="cover"
                        height={20} // Reduced size of logo
                        src={"/facebook.png"}
                      />{" "}
                      Facebook
                    </span>
                  </div>
                  <div className="w-full 2xl:mt-3 h-[1px] bg-[#D9D9D9] " />

                  <p className="text-black w-full text-end block  font-[500] -mt-[5px] text-base 2xl:text-base">
                    No account yet?{" "}
                    <Link
                      href="/auth/sign-up"
                      className="text-primary text-[1em]  2xl:text-xl font-bricolage"
                    >
                      {" "}
                      Sign Up{" "}
                    </Link>{" "}
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

export default Signup;
