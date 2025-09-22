/* eslint-disable */

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/app/components/common/inputs/input";
import Button from "@/app/components/common/Button";
import { ProfileCard } from "@/app/components/layouts/profilecard";
import Link from "next/link";
import Article from "@/app/components/common/Article";
import { useGetAgentsQuery } from "@/store/slices/api/authapi";
import Spinner from "@/app/components/common/Spinner";
import { toast } from "react-toastify";

const Breadcrumb = () => {
  return (
    <div className="flex  items-center justify-between gap-[0.2rem] lg:px-4 py-2  mt-[3rem] lg:mt-[5rem] w-full  bg-gray-100">
      {/* Left Section: Back Arrow and Breadcrumb */}
      <div className="flex items-start justify-center  gap-2 text-[1.08rem] font-bricolage text-gray-600">
        {/* Back Arrow */}
        <Image
          width={500}
          height={300}
          src="/arrow-right.png"
          alt="Back"
          className="w-3 h-4 mt-1"
        />

        {/* Breadcrumb Links */}
        <span className="text-gray-400">Search |</span>
        <a href="#" className="text-primary">
          Homes for sale
        </a>
      </div>

      <div></div>
    </div>
  );
};

const page = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const tabs = [
    { id: "all", label: "All listings" },
    { id: "active", label: "Active listings" },
    { id: "sold", label: "Sold with Ruka" },
    { id: "bought", label: "Bought with Ruka" },
  ];

  const {
    data: allAgent,
    isLoading: isAllLoading,
    refetch,
  } = useGetAgentsQuery({});
  const [displayListings, setDisplayListings] = useState([]);
  useEffect(() => {
    refetch(); // Refetch data on every mount
  }, [refetch]);
  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      toast.error(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    if (!isAllLoading && allAgent) {
      const firstThreeListings = allAgent;
      setDisplayListings(firstThreeListings); // Store in state
    }
  }, [allAgent, isAllLoading]);

  if (isAllLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-2 flex flex-col justify-center items-center  w-full lg:max-w-[1230px] ">
      {" "}
      <Breadcrumb />
      <div className=" mt-3 relative rounded-lg  flex items-center overflow-hidden">
        <Image
          src="/webp/sell.webp" // Replace with actual map image
          alt="Map"
          width={700}
          height={300}
          className=" 2xl:h-auto w-full rounded-[15px] lg:h-[38rem]"
        />
      </div>
      {/* second layout */}
      <div className="  max-md:w-full  mt-[3rem] lg:px-4 py-7">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Sell your Home with Hoydoon
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Are you thinking about selling your home? We’re here to help you every
          step of the way! Our team will work closely with you to highlight your
          home’s best features, attract the right buyers, and maximize its
          value. From preparing your property for sale to navigating offers and
          closing the deal, we’ll ensure the entire process is smooth, simple,
          and stress-free. Schedule a consultation with us today, and let’s
          start planning for a successful and rewarding home-selling experience!{" "}
        </p>
      </div>
      <div className=" w-full lg:px-4 py-4">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Choose the perfect agent for your needs.
        </h1>
        <p className=" text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon makes finding the right real estate agent simple and
          stress-free. Whether you're buying, selling, or renting, we connect
          you with trusted professionals tailored to your needs. Browse detailed
          profiles, compare expertise, and read reviews to make an informed
          choice. Start your real estate journey with the perfect agent today!
        </p>
        <p className=" text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Complete a quick questionnaire to discover the best agents in your
          area. Review their pricing, services, and ratings to find the one that
          fits your needs perfectly
        </p>

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

          <textarea
            className="border border-[#d6d5d5] bg-transparent !w-full !rounded-none mt-4 p-2 min-h-[100px]"
            placeholder="Describe your needs or any additional information..."
            value={description}
            rows={8}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-full mt-[2rem] flex items-center lg:justify-center justify-start">
          <Button
            onClick={handleSubmit}
            className="text-base rounded-none !w-full lg:!w-1/4 font-light mt-5"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          By submitting this form, you agree that Hoydoon, its affiliates, or
          associated third parties may contact you, including through calls or
          texts using automated systems. You also agree to our Terms of Service
          and Privacy Policy. Message and data rates may apply. Providing
          consent is not a condition for accessing real estate services.{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 mt-[3rem] md:grid-cols-2 gap-8 place-items-center !w-full">
        {displayListings.map((agent: any) => (
          <ProfileCard
            key={agent._id}
            {...agent}
            sales={Number(agent.numberOfListings)}
          />
        ))}
      </div>{" "}
      {/* description */}
      <div className=" lg:mt-[4rem] w-full">
        <Article />
      </div>
    </div>
  );
};

export default page;
