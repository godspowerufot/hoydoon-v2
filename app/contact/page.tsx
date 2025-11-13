/* eslint-disable */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
}

interface CountryOffices {
  country: string;
  offices: Office[];
}
const socialLinks = [
  {
    href: "mailto:support@hoydoon.com",
    src: "/mail.svg",
    alt: "Email",
  },
  {
    href: "https://www.facebook.com/share/1YwJpJwiGT/?mibextid=wwXIfr",
    src: "/face.png",
    alt: "facebook",
  },
  {
    href: "https://www.instagram.com/hoydoon/",
    src: "/instagram.svg",
    alt: "Instagram",
  },
  {
    href: "https://x.com/hoydoon_?s=11&t=nIieHzDuZ8BAPHDnr6Ikcw",
    src: "/x.svg",
    alt: "X (Twitter)",
  },

  {
    href: "https://www.linkedin.com/company/hoydoon/about/?viewAsMember=true",
    src: "/linkedin.svg",
    alt: "LinkedIn",
  },
];
function OfficeLocator() {
  const [expandedCountries, setExpandedCountries] = useState<string[]>([]);

  const officeData: CountryOffices[] = [
    {
      country: "Nigeria",
      offices: [
        {
          city: "Lagos",
          address: "123 Victoria Island, Lagos State, Nigeria",
          phone: "+234 1 234 5678",
          email: "lagos@houdoon.com",
        },
        {
          city: "Abuja",
          address: "456 Central Business District, Abuja, Nigeria",
          phone: "+234 9 876 5432",
          email: "abuja@houdoon.com",
        },
        {
          city: "Port Harcourt",
          address: "789 GRA Phase 2, Port Harcourt, Rivers State",
          phone: "+234 84 123 456",
          email: "portharcourt@houdoon.com",
        },
      ],
    },
    {
      country: "Somalia",
      offices: [
        {
          city: "Mogadishu",
          address: "101 Hamar Weyne District, Mogadishu, Somalia",
          phone: "+252 1 234 567",
          email: "mogadishu@houdoon.com",
        },
        {
          city: "Hargeisa",
          address: "202 Maroodi Jeex Region, Hargeisa, Somaliland",
          phone: "+252 63 789 012",
          email: "hargeisa@houdoon.com",
        },
      ],
    },
  ];

  const toggleCountry = (country: string) => {
    setExpandedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  return (
    <section className="bg-gray-50 md:py-16">
      <div className=" mx-auto px-2 ">
        <div className="rounded-3xl ">
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2  md:gap-[18rem] items-start">
            <div>
              <h1 className=" text-2xl md:text-5xl font-semibold text-[#1E1E1E] mb-4">
                Locate a Hoydoon office near you
              </h1>
            </div>
            <div className="lg:text-start flex flex-end">
              <p className="text-[#8F8F8F] font-light text-base md:text-lg leading-relaxed ">
                Our offices are listed below. No location nearby? Reach out,
                we’ve got agents nationwide.{" "}
              </p>
            </div>
          </div>

          <div className="space-y-0">
            {officeData.map((countryData, index) => (
              <div
                key={countryData.country}
                className="border-b border-[#8F8F8F]  last:border-b-1"
              >
                <button className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50 transition-colors duration-200 rounded-lg px-4">
                  <h3 className="text-2xl font-light text-[#1E1E1E]">
                    {countryData.country}
                  </h3>
                </button>

                {/* {expandedCountries.includes(countryData.country) && (
                  <div className="pb-6 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {countryData.offices.map((office, officeIndex) => (
                        <div
                          key={officeIndex}
                          className="bg-gray-50 rounded-xl p-6 transition-shadow duration-200"
                        >
                          <h4 className="text-xl font-semibold text-gray-900 mb-4">
                            {office.city}
                          </h4>

                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {office.address}
                              </p>
                            </div>

                            <div className="flex items-center space-x-3">
                              <a
                                href={`tel:${office.phone}`}
                                className="text-teal-600 text-sm hover:text-teal-700 transition-colors"
                              >
                                {office.phone}
                              </a>
                            </div>

                            <div className="flex items-center space-x-3">
                              <a
                                href={`mailto:${office.email}`}
                                className="text-teal-600 text-sm hover:text-teal-700 transition-colors"
                              >
                                {office.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Methods Data
const contactMethods = [
  {
    icon: "/call.svg",
    title: "(312) 566-2313",
    description:
      "Talk to a Customer Service Representative for help with our site, app, or finding a Hoydoon Agent.",
    action: "tel:+13125662313",
  },
  {
    icon: "/message.svg",
    title: "Message us",
    description:
      "Send our Customer Service Team questions about our site, app, or finding a Houdoon Agent.",
    action: "mailto:devteam@quorvixconsulting.com",
  },
];

// Breadcrumb Component
const Breadcrumb = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link
        href="/"
        className="flex items-center text-teal-600 hover:text-teal-700"
      >
        <Image
          src="/arrow-right.png"
          alt="arrow"
          height={12}
          width={12}
          className="h-4 w-3 mr-3"
        />
        Hoydoon
      </Link>
      <span className="text-gray-400">|</span>
      <span className="text-gray-900">Contact Us</span>
    </nav>
  );
};

// Page Component
const ContactPage = () => {
  return (
    <div className="lg:-mb-[5rem]   mt-[5rem] w-screen bg-[#eeeeeec7]">
      <div className=" mx-auto  pt-2 max-w-[78rem]">
        <div className=" rounded-3xl p-3 md:pt-3 ">
          {/* Hero Image */}
          <Breadcrumb />
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/contact-us.png"
              alt="Customer service representative on phone"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Heading and Text */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 md:gap-[18rem] items-start">
            <div>
              <h1 className=" text-2xl  md:text-5xl font-semibold text-[#1E1E1E] mb-4">
                Contact Us
              </h1>
            </div>
            <div className="lg:text-start max-w-2xl">
              <p className="text-[#8F8F8F] font-light text-lg leading-relaxed">
                We're here to help! Our National Customer Service Team is
                available 8am - 5pm PST, seven days a week.
              </p>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      {/* <Icon className="h-8 w-8 text-gray-600" /> */}
                      <Image
                        src={method.icon}
                        alt="icon"
                        width={500}
                        height={500}
                      />{" "}
                    </div>
                  </div>
                  <h3 className=" txt-2xl md:text-3xl font-semibold text-teal-600 mb-4">
                    {method.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed max-w-xs mx-auto">
                    {method.description}
                  </p>
                </div>
              );
            })}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  {/* <Icon className="h-8 w-8 text-gray-600" /> */}
                  <Image
                    src={"/share.svg"}
                    alt="icon"
                    width={500}
                    height={500}
                  />{" "}
                </div>
              </div>
              <h3 className=" txt-2xl md:text-3xl font-semibold text-teal-600 mb-4">
                Connect With Us
              </h3>
              <div className="grid grid-cols-5 gap-5 max-w-[16rem] mx-auto">
                {socialLinks.map(({ href, src, alt }: any) => (
                  <Link
                    key={alt}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={43}
                      height={40}
                      className="hover:scale-110 transition-transform"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <OfficeLocator />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
