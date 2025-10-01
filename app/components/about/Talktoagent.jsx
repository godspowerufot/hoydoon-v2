"use client";
/* eslint-disable */
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../common/Button";
import { toast } from "react-toastify";
import Input from "../common/inputs/input";

const TalkToAgent = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");
    try {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("phone", phoneNumber);
      formData.append("requestType", "agent");
      formData.append(
        "message",
        description || "I want to find an agent. Address: " + address
      );

      const res = await fetch("/api/find-agent", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setFullName("");
        setEmail("");
        setAddress("");
        setPhoneNumber("");
        toast.success("Message successfully Sent");
      } else {
        const data = await res.json();
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      toast.error(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/talk.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-5 lg:mt-[4.5rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          Choose the Perfect Agent for your Needs
        </h1>
        <p className="text-gray  font-light text-sm lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon makes finding the right real estate agent simple and
          stress-free. Whether you're buying, selling, or renting, we connect
          you with trusted professionals tailored to your needs. Browse detailed
          profiles, compare expertise, and read reviews to make an informed
          choice. Start your real estate journey with the perfect agent today!
        </p>
        <p className="text-gray  font-light text-sm lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Complete a quick questionnaire to discover the best agents in your
          area. Review their pricing, services, and ratings to find the one that
          fits your needs perfectly
        </p>
      </div>
      <div className="mt-5 lg:mt-[4.5rem]">
        <div className="flex justify-center flex-col w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:p-4">
            <Input
              label=""
              type="text"
              placeholder="Enter your full name"
              className="border  h-[3.5rem] placeholder:font-[400] border-gray-300 !rounded-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              label=""
              type="text"
              placeholder="Please enter Email Address"
              className="border h-[3.5rem]  placeholder:font-[400]  border-gray-300 !rounded-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label=""
              type="text"
              placeholder="Please enter your address"
              className="border  h-[3.5rem] placeholder:font-[400] border-gray-300 !rounded-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              label=""
              type="tel"
              placeholder="Please enter your phone number"
              className="border h-[3.5rem] placeholder:font-[400]  border-gray-300 !rounded-none"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex items-center lg:justify-center justify-start">
          <Button
            onClick={handleSubmit}
            className="text-base rounded-none w-full font-light mt-5 lg:w-[300px] "
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
        <p className="text-gray  font-light text-sm lg:text-base  font-bricolage  w-full leading-5 mt-4">
          By submitting this form, you agree that Hoydoon, its affiliates, or
          associated third parties may contact you, including through calls or
          texts using automated systems. You also agree to our Terms of Service
          and Privacy Policy. Message and data rates may apply. Providing
          consent is not a condition for accessing real estate services.{" "}
        </p>
      </div>
      <div className="flex  lg:max-w-[1200px] 2xl:gap-[1%]  gap-[1.5rem]  lg:gap-[4rem]  flex-col-reverse   2xl:w-[95rem] 2xl:pl-[2.5em] lg:pl-5 lg:my-[5em] lg:flex-row  items-center  2xl:justify-center lg:justify-around ">
        <span className="flex flex-col  gap-5 w-full lg:w-[45em]  ">
          <h1 className="text-black  text-[26px] lg:text-[2.6rem] 2xl:text-5xl  lg:leading-[1.1em] font-[600] 2xl:w-[80%]">
            Ready to sell your home?.
          </h1>
          <p className="text-gray text-sm lg:text-xl lg:mt-3 2xl:mt-[2em] font-bricolage lg:w-[40rem]">
            Ready to sell your home? Let us help you maximize its value and make
            the process stress-free. Schedule a consultation today and take the
            first step toward a successful sale
          </p>

          <Button className="text-base py-2 w-[205px] font-light lg:mt-5 ">
            <Link href="/sell/sell-home"> Get Started</Link>
          </Button>
        </span>

        <span className=" mt-5  lg:mt-0">
          <Image
            alt="image1"
            width={500}
            quality={100}
            className=" 2xl:w-[50rem] lg:w-[50rem]  object-contain  w-fit lg:h-[28rem] 2xl:h-[36rem]"
            height={400} // Reduced size of logo
            src={"/sell-1.png"}
          />
        </span>
      </div>{" "}
    </div>
  );
};
export default TalkToAgent;
