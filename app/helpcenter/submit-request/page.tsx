"use client";

import React, { useState, useEffect } from "react";
import Input from "@/app/components/common/inputs/input";
import Image from "next/image";
import { toast } from "react-toastify";

const SubmitRequest = () => {
  const [category, setCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [listingInfo, setListingInfo] = useState("");
  const [appVersion, setAppVersion] = useState("");
  const [browser, setBrowser] = useState("");
  const [listingLink, setListingLink] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Select",
    "General Inquiry",
    "I'm seeking to update my contact details",
    "Assistance",
    "I'm an agent and I'm unable to edit my listings",
    "My listing was flagged for review",
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67dd7bad1297d6190a7b4b0b/1imsim8qk";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("category", category);
    if (category !== "Select") {
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("description", description);
    }

    if (category === "I'm seeking to update my contact details") {
      formData.append("listingInfo", listingInfo);
    }

    if (category === "Assistance") {
      formData.append("appVersion", appVersion);
      formData.append("browser", browser);
    }

    if (category === "I'm an agent and I'm unable to edit my listings") {
      formData.append("listingLink", listingLink);
    }

    let totalSize = 0;
    attachments.forEach((file) => {
      totalSize += file.size;
      formData.append("attachments", file);
    });

    if (totalSize > 6 * 1024 * 1024) {
      toast.error("Total file size exceeds 6MB limit.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/submit-request", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Submission failed");

      toast.success("Request submitted successfully!");
      setAttachments([]);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];

    const filtered = selected.filter((file) =>
      allowedTypes.includes(file.type)
    );
    const rejected = selected.length - filtered.length;

    const newAttachments = [...attachments, ...filtered];
    const totalSize = newAttachments.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > 6 * 1024 * 1024) {
      toast.error("Total file size exceeds 6MB.");
    } else if (newAttachments.length > 10) {
      toast.error("You can upload a maximum of 10 files.");
    } else {
      setAttachments(newAttachments);
      toast.success(
        `${filtered.length} file(s) added.${
          rejected ? ` ${rejected} file(s) rejected.` : ""
        }`
      );
    }
  };

  // Helper function to determine margin bottom
  const getMarginBottom = () => {
    if (dropdownOpen) return "mb-[20rem]";
    if (category && category !== "Select") return "mb-0";
    return "mb-[20rem]";
  };

  return (
    <div className="mt-10 md:w-[1200px] p-4 md:p-6 bg-white min-h-screen lg:min-h-0">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 py-2 mt-[2em] w-full bg-gray-100">
        <div className="flex items-center gap-2 text-sm lg:text-lg text-gray-600">
          <Image
            src="/arrow-right.png"
            alt="Back"
            width={500}
            height={500}
            className="w-3 h-5"
          />
          <span className="text-primary">Hoydoon Help Center |</span>
          <a href="#" className="text-black">
            Submit a request
          </a>
        </div>

        <div className="hidden lg:block relative  w-full md:w-[20rem] 2xl:w-[25rem]">
          <div className="absolute left-4 top-[45%] transform -translate-y-1/2">
            <Image
              alt="Search"
              src={"/Search2.png"}
              width={20}
              height={20}
              className="text-gray"
            />
          </div>
          <Input
            label=""
            type="text"
            className="w-full  2xl:placeholder:text-xl lg:h-[3rem]  text-xl  p-2 pl-10 placeholder:pl-2 rounded-[15px]"
            placeholder="Search..."
          />
        </div>
      </div>

      <div
        className={`mt-6 flex flex-col md:flex-row gap-6 ${getMarginBottom()}`}
      >
        <div className="w-full md:flex-1 2xl:max-w-[45rem] lg:max-w-[40rem] max-w-full">
          <h1 className="text-2xl md:text-3xl font-medium lg:font-semibold mb-6">
            Submit a request
          </h1>

          <div className={`mb-4 relative `}>
            <label className="block text-[#1E1E1E99] text-sm lg:text-base mb-2 2xl:text-[1.2em]">
              Please choose your issue below
            </label>
            <div
              className="border 2xl:w-[40rem] p-3 border-[#d6d5d5] flex justify-between items-center cursor-pointer bg-white text-base 2xl:text-xl"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {category || "Select an option"}
              <Image
                src="/arrow/arrow-down.png"
                alt="Back"
                width={500}
                height={500}
                className="w-4 h-5"
              />
            </div>
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black opacity-50 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute left-0 w-full 2xl:w-[40rem] border-transparent text-base 2xl:text-xl border mt-1 z-20 bg-white">
                  {categories.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer text-gray hover:bg-primary hover:text-white"
                      onClick={() => {
                        setCategory(item);
                        setDropdownOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {category && category !== "Select" && (
            <>
              <Input
                label="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full !rounded-none border p-3 mb-4"
              />
              <Input
                label="Enter Subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border p-3 !rounded-none mb-4"
              />
              <label className="block text-gray-700 text-base mb-2 2xl:text-[1.2em]">
                Enter Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-[#d6d5d5] border p-3 h-[10rem] bg-transparent mb-4"
              />
            </>
          )}

          {category === "I'm seeking to update my contact details" && (
            <>
              <label className="block text-gray-700 text-base mb-2 2xl:text-[1.2em]">
                Enter listing address and name to verify ownership of listing:
              </label>
              <textarea
                value={listingInfo}
                onChange={(e) => setListingInfo(e.target.value)}
                className="w-full border-[#d6d5d5] border p-3 bg-transparent h-[10rem] mb-4"
              />
            </>
          )}

          {category === "Assistance" && (
            <>
              <Input
                label="Mobile apps - What version of iOS or Android app are you using?"
                type="text"
                value={appVersion}
                onChange={(e) => setAppVersion(e.target.value)}
                className="w-full border !rounded-none p-3 mb-4"
              />
              <Input
                label="Website - What browser are you using?"
                type="text"
                value={browser}
                onChange={(e) => setBrowser(e.target.value)}
                className="w-full border !rounded-none p-3 mb-4"
              />
            </>
          )}

          {category === "I'm an agent and I'm unable to edit my listings" && (
            <Input
              label="Provide listing's address or a link to the home"
              type="text"
              value={listingLink}
              onChange={(e) => setListingLink(e.target.value)}
              className="w-full !rounded-none border p-3 mb-4"
            />
          )}

          {category && category !== "Select" && (
            <>
              <label className="block text-gray-700 text-base mb-2 2xl:text-[1.2em]">
                Attachments
              </label>
              <div className="border border-[#d6d5d5] p-3 text-center cursor-pointer bg-white relative">
                <span
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  className="text-primary cursor-pointer"
                >
                  Add files
                </span>{" "}
                or drop files here
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </div>

              <ul className="mt-2 text-sm text-gray-600">
                {attachments.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full md:w-[12rem] bg-primary mt-10 text-white py-3 rounded flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
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
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </>
          )}
        </div>

        {category && category !== "Select" && (
          <div className="hidden md:block md:max-w-[25rem]  lg:ml-[6rem]">
            <h2 className="text-xl font-semibold mb-4">
              Articles in this section
            </h2>
            <div className="space-y-2 text-base">
              {[
                "Rental Scams Uncovered: How to Spot and Avoid Fraudulent Listings",
                "Do I Need a Real Estate Agent to Buy a Home?",
                "What Are Common Mistakes to Avoid When Buying a Home?",
                "What Do I Do If a Listing Has Incorrect Information?",
                "How Do I Search for Homes in a Specific Neighborhood?",
                "What Are Common Mistakes to Avoid When Buying a Home?",
              ].map((article, index) => (
                <button
                  key={index}
                  className="block w-full text-left h-[4.5rem] p-3 border rounded-md border-gray text-gray hover:bg-gray-200"
                >
                  {article}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitRequest;
