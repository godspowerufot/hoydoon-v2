"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Agent = dynamic(() => import("../components/about/Agent"));
const Content = dynamic(() => import("../components/about/Content"));
const Sell = dynamic(() => import("../components/about/sell"));
const Buy = dynamic(() => import("../components/about/Buy"));
// ✅ Fixed: Added import() wrapper
const TalkToAgent = dynamic(() => import("../components/about/Talktoagent"));

const Page = () => {
  const [activeTab, setActiveTab] = useState("about");

  const allCoordinates = {
    about: [],
    agents: [],
    buy: [],
    sell: [],
  };

  return (
    <div className="lg:max-w-[1240px] container mx-auto lg:mt-[4rem] px-4 lg:px-0">
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
                className={`relative py-5 text-sm lg:text-[18px] transition-colors duration-300 ${
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
          className="absolute right-0 translate-y-1/2 bg-primary text-white px-3 py-3 lg:w-[250px] lg:h-[50px] text-sm lg:text-[18px] hover:opacity-90 transition "
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
