"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import ArticlesSection from "../components/common/Article";
import Agent from "../components/about/Agent";
import Content from "../components/about/Content";
import ResponsiveTabs from "../components/about/ui/tabs";

const Sell = dynamic(() => import("../components/about/sell"));
const Buy = dynamic(() => import("../components/about/Buy"));
// ✅ Fixed: Added import() wrapper
const TalkToAgent = dynamic(() => import("../components/about/Talktoagent"));

const DefaultContent = () => {
  return (
    <div>
      {/* image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="https://hoydoonstorage.blob.core.windows.net/web-images/terms.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-5 md:mt-[3rem]">
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Welcome to Hoydoon (the “Website”). These Terms and Conditions
          (“Terms”) govern your use of, www.hoydoon.com and any related services
          provided through the site. By accessing or using Hoydoon, you agree to
          comply with and be bound by these Terms. If you do not agree, please
          do not use this website. 
        </p>

        <h1 className="md:text-[2rem] text-xl mt-5 md:mt-[3rem] font-semibold ">
          {" "}
          About Hoydoon 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon is a property listing and discovery platform designed to
          connect individuals and businesses looking to buy, sell, or rent
          property. We provide tools to browse listings, communicate with other
          users, and access information about available homes and spaces
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon does not own, manage, or sell properties listed on the
          platform. All listings are created and managed by independent users or
          agents. 
        </p>
      </div>
      <div className=" mt-5 md:mt-[4.5rem]">
        <h1 className="md:text-[2rem] text-xl  font-semibold "> Eligibility</h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          To use Hoydoon, you must: 
          <ul
            className={`text-gray font-light text-[18px] ml-5 list-disc
                
                `}
          >
            <li className="mt-1 list-disc text-[12px] md:text-xl ">
              Be at least 18 years of age (or the legal age of majority in your
              country). 
            </li>
            <li className="mt-1 list-disc text-[12px] md:text-xl ">
              Have the authority to enter into binding agreements.   
            </li>
            <li className="mt-1 list-disc text-[12px] md:text-xl ">
              Provide accurate and up-to-date information when creating an
              account or submitting listings. 
            </li>
          </ul>
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          User Accounts
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Users may need to create an account to access certain features of the
          website. You are responsible for maintaining the confidentiality of
          your account credentials and for all activity under your account
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon reserves the right to suspend or terminate accounts that
          violate these Terms or our Community Guidelines. 
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Property Listings
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          By posting a listing on Hoydoon, you agree that all information you
          provide,including photos, pricing, and descriptions,is accurate and
          lawful, that you have the legal right to advertise the property, and
          that you’ll update or remove the listing once it’s no longer
          available. You also acknowledge that Hoydoon may edit, reject, or
          remove any listing that violates our Terms, policies, or applicable
          law.
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon reserves the right to suspend or terminate accounts that
          violate these Terms or our Community Guidelines. 
        </p>
      </div>
      <div className="relative w-full mt-5 md:mt-[3rem] h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/terms3.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          User Responsibilities
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          You agree not to post any false, misleading, or fraudulent
          information, use the website for illegal or harmful activities, or
          engage in behavior that harasses, abuses, or sends inappropriate
          messages to other users. You also agree not to attempt to damage,
          hack, or interfere with the proper functioning of the website in any
          way. Violating these rules may lead to suspension or permanent removal
          of your account.
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Communication Between Users 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon offers a secure communication channel for buyers, sellers, and
          agents to connect and conduct business. Users are solely responsible
          for their conversations and are expected to maintain a respectful and
          professional tone at all times. Personal, financial, or sensitive
          information should never be shared outside the platform to ensure
          safety and privacy. Although Hoydoon does not actively monitor all
          messages, it reserves the right to review, investigate, and take
          appropriate action in response to any reports of abuse, harassment, or
          misuse
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Fees and Payments 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Most of Hoydoon’s services are free to use, allowing users to browse,
          and connect without cost. However, certain premium features,
          promotional listings, or optional upgrades may come with associated
          fees. All fees will be clearly presented before you make a purchase,
          ensuring full transparency. Payments are handled securely through
          trusted third-party payment providers to protect your financial
          information. Please note that all payments are final and
          non-refundable unless a refund is required by applicable law or
          specific policy exceptions.
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Intellectual Property
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          All content on the Hoydoon website, including its logos, designs,
          text, graphics, and overall layout, is the property of Hoydoon or its
          licensors and is protected by applicable intellectual property laws.
          Users are not permitted to copy, reproduce, modify, or distribute any
          part of the website or its materials without prior written permission
          from Hoydoon. Any unauthorized use of this content is strictly
          prohibited and may result in legal action.
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Privacy 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Your use of Hoydoon is governed by our Privacy Policy, which details
          how we collect, use, store, and protect your personal information.
          This includes information you provide directly, as well as data
          gathered through your use of the platform. By accessing or using
          Hoydoon, you acknowledge and consent to the data practices described
          in our Privacy Policy, including the use of your information to
          enhance user experience, maintain platform security, and deliver
          personalized services. We are committed to safeguarding your privacy
          and handling your data responsibly in accordance with applicable laws
          and regulations.
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Disclaimers 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon provides its services on an “as is” basis, without any
          warranties or guarantees of any kind. While we strive to maintain a
          reliable and accurate platform, we do not guarantee the accuracy,
          completeness, or reliability of any listings, user information, or
          property-related content. We also cannot ensure that the website will
          always be available, error-free, or completely secure. All use of the
          Hoydoon platform and its services is at your own risk, and users are
          encouraged to verify information independently before making any
          property-related decisions or transactions.
        </p>
      </div>
      <div className="relative w-full mt-5  md:mt-[3rem] h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/terms2.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>{" "}
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Limitation of Liability 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          To the fullest extent permitted by law, Hoydoon shall not be held
          responsible for any indirect, incidental, or consequential damages
          resulting from your use of the website or its services. This includes,
          but is not limited to, loss of data, profits, goodwill, or business
          opportunities. In any case, Hoydoon’s total liability for any claim
          arising from your use of the platform will not exceed the total amount
          you have paid (if any) to Hoydoon within the 12 months prior to the
          event giving rise to the claim.
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Termination
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon reserves the right to suspend or permanently terminate your
          access to the website at any time if you violate these Terms, engage
          in fraudulent activity, or misuse the platform in any way. Such
          actions may be taken without prior notice and can include the removal
          of your listings, restriction of account features, or complete
          deactivation of your account to maintain the integrity and safety of
          the platform.
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Updates to These Terms 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon reserves the right to update or modify these Terms at any time
          to reflect changes in our services, policies, or legal requirements.
          Any updates will be posted on this page, along with a revised “Last
          Updated (20|10|25)” date for transparency. By continuing to access or
          use the website after such changes are made, you acknowledge and agree
          to be bound by the updated Terms. Users are encouraged to review this
          page periodically to stay informed of any modifications.
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Governing Law 
        </h1>

        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          These Terms shall be governed by and interpreted in accordance with
          the laws of the Federal Republic of Nigeria and the Federal Republic
          of Somalia, without regard to conflict of law principles
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
            In the event of any dispute, claim, or controversy arising from or
          relating to your use of Hoydoon, such matters shall be subject to the
          exclusive jurisdiction of the competent courts in Nigeria or Somalia,
          depending on the user’s country of residence. 
        </p>
      </div>
      <div className=" mt-5 md:mt-[3rem]">
        <h1 className="md:text-[2rem] text-xl  md:mt-[3rem] font-semibold ">
          {" "}
          Contact Us
        </h1>

        <p className="text-gray  font-light text-[12px] md:w-[710px] md:text-xl font-bricolage  w-full leading-5 mt-4">
          If you have any questions about these Terms or our policies, contact
          us at:  🌐{" "}
          <a href="www.hoydoon.com/helpcenter/submit-request">
            www.hoydoon.com/help
          </a>
           
        </p>
        <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
           By using Hoydoon, you acknowledge that you have read, understood, and
          agreed to these Terms and Conditions. 
        </p>
      </div>
      <div className=" mt-5 md:mt-[6rem]">
        <ArticlesSection />
      </div>
    </div>
  );
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("Default");

  // 🧭 Listen for browser back/forward events
  useEffect(() => {
    const handlePopState = () => {
      const currentTab = window.location.hash.replace("#", "") || "Default";
      setActiveTab(currentTab);
    };

    // Initialize tab from URL hash
    handlePopState();

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  const tabs = [
    { id: "about", label: "About Us" },
    { id: "agents", label: "Our Agents" },
    { id: "buy", label: "Buy with Hoydoon" },
    { id: "sell", label: "Sell with Hoydoon" },
  ];

  // 🧩 When changing tab, push it to browser history
  const handleTalkToAgent = (tabId: string) => {
    setActiveTab(tabId);
    window.history.pushState({}, "", `#${tabId}`);
  };

  return (
    <div className="md:max-w-[1240px] container mx-auto md:mt-[4rem] px-4 md:px-0">
      <div className="md:mt-4 mt-[2rem]">
        <ResponsiveTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          actionButton={{
            label: "Talk to a Hoydoon Agent",
            onClick: () => handleTalkToAgent("talk"),
          }}
        />
      </div>

      <div className="mt-5">
        {activeTab === "Default" && <DefaultContent />}
        {activeTab === "about" && <Content />}
        {activeTab === "agents" && <Agent />}
        {activeTab === "buy" && <Buy />}
        {activeTab === "sell" && <Sell />}
        {activeTab === "talk" && <TalkToAgent />}
      </div>
    </div>
  );
};

export default Page;
