"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import ArticlesSection from "../components/common/Article";
import Agent from "../components/about/Agent";

const Sell = dynamic(() => import("../components/about/sell"));
const Buy = dynamic(() => import("../components/about/Buy"));
// ✅ Fixed: Added import() wrapper
const TalkToAgent = dynamic(() => import("../components/about/Talktoagent"));

const Content = () => {
  return (
    <div>
      {/* image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/policy.jpg"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-5 md:mt-[3rem]">
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          At Hoydoon, your privacy is very important to us. This Privacy Policy
          explains how we collect, use, share, and protect your personal
          information when you use our website (
          <a href="www.hoydoon.com" className="text-gray underline">
            {" "}
            www.hoydoon.com
          </a>
          ) or mobile application (together, the “Platform”).  By using Hoydoon,
          you agree to the terms of this Privacy Policy. 
        </p>

        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Information We Collect 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          We collect both personal and non-personal information to deliver our
          services effectively, improve your experience, and maintain the smooth
          operation of the Hoydoon platform.{" "}
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          This includes information you provide directly, such as your name,
          email address, phone number, and account login details. When creating
          or managing property listings, we may also collect listing-related
          information like photos, descriptions, and prices, as well as any
          messages exchanged through our platform. If you use premium or paid
          features, we may collect relevant payment or billing details to
          process transactions securely.
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          We also collect certain information automatically when you visit our
          website or app. This may include your device type, browser details, IP
          address, and location data (if enabled). Additionally, we gather data
          about your activity on the platform—such as pages visited, time spent,
          and actions taken—along with insights from cookies and similar
          technologies, as described in Section 8 below.
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          In some cases, we may receive information from third-party sources to
          help us improve our services and user experience. These sources may
          include payment processors, analytics providers, and social login
          services such as Google or Apple, when you choose to sign in through
          those accounts.
        </p>
      </div>
      <div className=" mt-5 md:mt-[4.5rem]">
        <h1 className="md:text-[2rem] text-xl  font-semibold ">
          {" "}
          How We Use Your Information 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          We use the information we collect to provide, manage, and improve your
          experience on Hoydoon. This includes creating and maintaining your
          account, processing listings, handling inquiries, and managing
          payments securely. We also use your data to send important alerts,
          notifications, or updates related to your activity on the platform.{" "}
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Your information helps us enhance the functionality, reliability, and
          performance of our services while preventing fraud, misuse, or
          security breaches. In addition, we may contact you with details about
          new features, special offers, or updates to our policies and terms.{" "}
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon only uses your personal data for these stated purposes and
          always in compliance with applicable data protection and privacy laws.{" "}
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          How We Share Your Information 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          We may share your information only when necessary to operate and
          protect the Hoydoon platform. This includes sharing details with other
          users when you interact with listings or messages, and with trusted
          service providers such as payment processors, hosting partners, and
          analytics tools that help us run and improve our services.{" "}
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          We may also disclose information when required by law or during a
          business transaction like a merger, acquisition, or asset transfer.
          Hoydoon values your privacy and will never sell your personal data to
          third parties.{" "}
        </p>
      </div>
      <div className="relative w-full md:mt-[3rem] h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/policy2.jpg"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Data Retention 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          We retain your information only for as long as needed to deliver our
          services, meet legal requirements, resolve disputes, or enforce our
          agreements. Once this period ends, your data is securely deleted or
          anonymized.
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          You may request the deletion of your account and any associated
          information at any time by contacting us through the details provided
          in Section 10.
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Security of Your Information 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          We employ a range of administrative, technical, and physical
          safeguards to protect your personal information from unauthorized
          access, loss, misuse, or disclosure. These measures include secure
          data storage, encryption, access controls, and regular monitoring to
          help maintain the safety and integrity of our systems.
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          While we are committed to maintaining a high standard of security, no
          platform or transmission over the internet can be completely
          guaranteed to be secure. By using Hoydoon, you acknowledge this
          limitation and agree that you share information at your own discretion
          and risk.{" "}
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Your Rights 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Depending on your country or region, you may have certain rights
          regarding your personal information. These may include the right to
          access the data we hold about you, request corrections to inaccurate
          information, or ask for your personal data to be deleted. You may also
          have the right to withdraw consent for specific processing activities
          or request a copy of your data in a portable format for your own use.
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          To exercise any of these rights or make a related inquiry, please
          contact us at support@hoydoon.com, and our team will assist you in
          accordance with applicable data{" "}
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Cookies and Tracking Technologies
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon uses cookies and similar technologies to enhance your
          experience on the platform. These tools help us remember your
          preferences and settings, analyze how the website is used, and
          continuously improve overall performance and usability.
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          You can manage or disable cookies at any time through your browser or
          device settings. However, please note that certain features or
          functions of the platform may not work properly if cookies are turned
          off.
        </p>
      </div>
      <div className="relative w-full md:mt-[3rem] h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/policy3.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Children’s Privacy 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon is intended for use only by individuals who are 18 years of
          age or older. Our services are not directed toward children, and we do
          not knowingly collect, store, or process personal information from
          anyone under 18. If it comes to our attention that a minor has
          provided personal data through our platform, we will take immediate
          steps to delete the information and restrict further access.
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          If you believe that a child has shared personal details with us,
          please contact us as soon as possible so we can investigate and ensure
          the data is safely removed.
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Contact Us
        </h1>

        <p className="text-gray  font-light text-[12px]  md:text-xl font-bricolage  w-full leading-5 mt-4">
          If you have any questions about these Terms or our policies, contact
          us at:  🌐{" "}
          <a href="www.hoydoon.com/helpcenter/submit-request">
            www.hoydoon.com/help
          </a>
           
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Changes to This Policy 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          We may revise or update this Privacy Policy periodically to reflect
          changes in our services, legal requirements, or data practices.
          Whenever updates are made, the “Last Updated” date at the top of this
          page will be revised to indicate the most recent version.{" "}
        </p>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          By continuing to use Hoydoon after any updates are posted, you
          acknowledge and agree to the terms of the updated Privacy Policy. We
          encourage users to review this page regularly to stay informed about
          how we protect and handle personal information.{" "}
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Governing Law 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          This Privacy Policy is governed by the laws of Nigeria and Somalia,
          without regard to conflict of law principles. Any disputes will be
          resolved in the competent courts of these jurisdictions. {" "}
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          By using Hoydoon, you acknowledge that you have read, understood, and
          agreed to this Privacy Policy. 
        </p>
      </div>
      <div className=" mt-5 md:mt-[6rem]">
        <ArticlesSection />
      </div>
    </div>
  );
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="md:max-w-[1240px] container mx-auto md:mt-[4rem] px-4 md:px-0">
      {/* ✅ Wrap this part in a relative container */}
      <div className="relative border-b mt-4 border-gray">
        <div className="flex justify-between">
          {/* Left Tabs */}
          <div className="flex flex-wrap gap-6">
            {[
              { id: "about", label: "About Us" },
              { id: "agents", label: "Our Agents" },
              { id: "buy", label: "Buy with  Hoydoon" },
              { id: "sell", label: "Sell with  Hoydoon" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`relative py-5 text-sm md:text-[18px] transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-black font-bold"
                    : "text-[#8F8F8F]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute left-0 bottom-[-1px] w-full h-[2px] bg-primary"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Floating Button on the Border Line */}
        <button
          className="absolute right-0 translate-y-1/2 bg-primary text-white px-3 py-3 md:w-[250px] md:h-[50px] text-sm md:text-[18px] hover:opacity-90 transition "
          style={{ bottom: "24px" }} // align exactly with the border line
          onClick={() => {
            setActiveTab("Talk");
          }}
        >
          Talk to a Hoydoon Agent
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-5 ">
        {activeTab === "about" && (
          <div className="">
            <Content />
          </div>
        )}

        {activeTab === "agents" && (
          <div className="">
            <Agent />
          </div>
        )}
        {activeTab === "buy" && (
          <div className="">
            <Buy />
          </div>
        )}

        {activeTab === "sell" && (
          <div className="">
            <Sell />
          </div>
        )}
        {activeTab === "Talk" && (
          <div className="">
            <TalkToAgent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
