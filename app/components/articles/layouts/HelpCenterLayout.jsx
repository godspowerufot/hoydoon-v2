"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useGetAllListingsQuery } from "@/store/slices/api/authapi";
import Image from "next/image";
import HoverCard from "../../common/card";
import { truncateDescription } from "@/utils";
import { handleShareClick } from "@/utils";
const Breadcrumb = ({ id, name, onToggleImages }) => {
  const [hideImages, setHideImages] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      window.print();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleToggleImages = () => {
    const newState = !hideImages;
    setHideImages(newState);
    if (onToggleImages) {
      onToggleImages(newState);
    }
  };

  return (
    <div className="flex ml-[1rem] lg:ml-0 items-center justify-around py-2 lg:w-full my-[1rem] bg-gray-100">
      <div className="flex w-full gap-1 text-[1.08rem] items-center font-bricolage text-gray-600">
        <Image
          src="/arrow-right.png"
          alt="arrow"
          height={12}
          width={12}
          className="w-4 h-4 object-contain cursor-pointer"
          onClick={() => window.history.back()}
        />

        <span className="text-gray-500 hidden lg:block">Home page |</span>

        <div className="flex font-light items-center gap-1">
          <a href="/help-center" className="text-primary">
            Help Center
          </a>
        </div>

        <div className="flex items-center gap-1">
          <Image
            src="/arrow-right-top.png"
            alt="arrow"
            height={12}
            width={12}
          />
          <a href="/help-center" className="text-primary">
            Articles
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-1">
          <Image
            src="/arrow-right-top.png"
            alt="arrow"
            height={12}
            width={12}
          />
          <a href="#" className="text-primary">
            {truncateDescription(name?.title, 10)}....
          </a>
        </div>
      </div>

      <div className="hidden lg:flex items-center lg:-ml-[4rem] gap-2">
        <div
          onClick={handleDownloadPDF}
          className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md hover:bg-gray-50 transition-colors"
          title="Download as PDF"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8F8F8F"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </div>
        <div
          onClick={handleShareClick}
          className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md"
        >
          <Image
            width={500}
            height={300}
            src="/upload.svg"
            alt="Download"
            className="w-4 h-4"
          />
        </div>
        <div
          onClick={handleToggleImages}
          className="p-2 border cursor-pointer border-[#8F8F8F] rounded-md hover:bg-gray-50 transition-colors"
          title={hideImages ? "Show Images" : "Hide Images"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8F8F8F"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                hideImages
                  ? "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  : "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              }
            />
          </svg>
        </div>
      </div>

      <div></div>
    </div>
  );
};

const HelpCenterLayout = ({ PageData }) => {
  const { data: allListings, isLoading } = useGetAllListingsQuery({});
  const [hidePageDataImages, setHidePageDataImages] = useState(false);

  const handleToggleImages = (shouldHide) => {
    setHidePageDataImages(shouldHide);
  };

  return (
    <div className="max-w-[1200px] mt-[3rem] lg:mt-[4rem] lg:p-0 lg:px-0 p-[1.5rem]">
      <Breadcrumb
        id={PageData?.id}
        name={PageData}
        onToggleImages={handleToggleImages}
      />

      {/* Hero Image - Hidden when toggle is active */}
      {!hidePageDataImages && (
        <div className="relative w-screen lg:w-full h-[400px] md:h-[500px] lg:rounded-md overflow-hidden">
          <Image
            src={PageData?.heroImage || "/rent.png"}
            alt="Customer service representative on phone"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {PageData?.introSection?.map((intro, index) => (
        <div
          key={index}
          className="pl-[1.5rem] lg:pl-0 mt-[1.5rem] lg:mt-[3rem] p-2 lg:p-0"
        >
          <h1 className="lg:text-[2rem] lg:max-w-[42rem] text-[20px] leading-0 lg:leading-9 font-semibold">
            {intro?.heading || PageData?.title}
          </h1>
          <p
            className="text-gray font-light text-base lg:text-[20px] font-bricolage w-full mt-4"
            dangerouslySetInnerHTML={{ __html: intro?.paragraph }}
          />
        </div>
      ))}

      {PageData?.sections?.map((section, index) => (
        <div key={index}>
          <div className="pl-[1.5rem] lg:pl-0 mt-[1.5rem] lg:mt-[3rem] p-2 lg:p-0">
            <h1 className="lg:text-[2rem] lg:max-w-[42rem] text-[20px] leading-0 lg:leading-9 font-semibold">
              {section.heading}
            </h1>
            {section.paragraphs?.map((para, pIndex) => (
              <p
                key={pIndex}
                className="text-gray font-light text-base lg:text-[20px] font-bricolage w-full mt-4"
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}

            {section.listItems && (
              <ul
                className={`text-gray font-light text-[18px] ml-5 ${
                  !Array.isArray(section.listItems[0]?.description)
                    ? "list-disc"
                    : ""
                }`}
              >
                {section.listItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="mt-8">
                    <div>
                      <strong className="font-medium">{item.title}</strong>
                    </div>
                    {Array.isArray(item.description) ? (
                      <ul className="mt-2 ml-4">
                        {item.description.map((desc, descIndex) => (
                          <li
                            key={descIndex}
                            className="mt-2 list-disc text-base"
                            dangerouslySetInnerHTML={{ __html: desc }}
                          />
                        ))}
                      </ul>
                    ) : (
                      <span
                        className="mt-2"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}

            {section.paragraph2 && (
              <p
                className="text-gray font-light text-base lg:text-[20px] font-bricolage w-full mt-4"
                dangerouslySetInnerHTML={{ __html: section.paragraph2 }}
              />
            )}
          </div>

          {/* Section Image - Hidden when toggle is active */}
          {section.image && !hidePageDataImages && (
            <div className="relative mt-[1.5rem] lg:mt-[3rem] w-full h-[400px] md:h-[500px] lg:rounded-md overflow-hidden">
              <Image
                src={section.image}
                alt="Section image"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      ))}

      {/* FAQ Section */}
      {PageData?.faqSection && (
        <div className="pl-[1.5rem] lg:pl-0 mt-[1.5rem] lg:mt-[3rem] p-2 lg:p-0">
          <h1 className="lg:text-[2rem] lg:max-w-[42rem] text-[20px] leading-0 lg:leading-9 font-semibold">
            {PageData.faqSection.heading}
          </h1>
          <p className="text-gray font-light text-base lg:text-[20px] font-bricolage w-full leading-5 mt-4">
            {PageData.faqSection.paragraph}
          </p>

          <ul className="text-gray font-light text-[18px] ml-5 list-disc">
            {PageData.faqSection.faqs?.map((faq, faqIndex) => (
              <li key={faqIndex} className="mt-5">
                <strong className="font-medium">Q: {faq.question}</strong>
                <br />
                <span className="font-normal">
                  A:{" "}
                  {Array.isArray(faq.answer) ? (
                    <ul className="mt-2 ml-4 text-base list-disc">
                      {faq.answer.map((ans, ansIndex) => (
                        <li key={ansIndex} className="mt-2">
                          {ans}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    faq.answer
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Listings - Always visible */}
      <div className="mt-[4rem] p-4">
        <div className="flex flex-col items-start gap-6 justify-center max-w-[1200px] w-full">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full mx-auto">
            <h1 className="text-black text-[24px] mt-[32px] text-start lg:mt-0 lg:text-[2.5rem] font-[600]">
              Hoydoon Houses for Sale
            </h1>
            <p className="text-gray font-light text-sm lg:max-w-[30rem] lg:text-xl font-bricolage text-start lg:text-right">
              Discover a home where every detail enhances your lifestyle—crafted
              to fit your taste and needs.
            </p>
          </div>

          {/* Property Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-5">
            {(allListings?.listings || []).slice(0, 6).map((item, idx) => (
              <HoverCard
                key={idx}
                _id={item._id}
                imageSrc={item?.imageUrls?.[0]?.url || "/house1.png"}
                altText={item?.imageUrls?.[0]?.altText || "Property image"}
                price={item?.item?.price || "Price not available"}
                area={item?.item?.squareFeet || ""}
                bathrooms={item?.item?.bathrooms}
                bedrooms={item?.item?.bedrooms}
                description={
                  item?.item?.description || "No description available."
                }
                title={item?.item?.title || "Untitled Property"}
                rent={item?.item?.rent || "Rent details not provided"}
              />
            ))}
          </div>

          <Link
            href="/"
            className="text-[#09858D] lg:hidden mt-2 text-sm lg:text-2xl font-[500]"
          >
            See all luxury houses for sale
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterLayout;
