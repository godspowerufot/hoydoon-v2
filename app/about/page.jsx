"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import ResponsiveTabs from "../components/about/ui/tabs";

const Agent = dynamic(() => import("../components/about/Agent"));
const Content = dynamic(() => import("../components/about/Content"));
const Sell = dynamic(() => import("../components/about/sell"));
const Buy = dynamic(() => import("../components/about/Buy"));
const TalkToAgent = dynamic(() => import("../components/about/Talktoagent"));

const Page = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About Us" },
    { id: "agents", label: "Our Agents" },
    { id: "buy", label: "Buy with Hoydoon" },
    { id: "sell", label: "Sell with Hoydoon" },
  ];

  const handleTalkToAgent = () => {
    setActiveTab("talk");
  };

  return (
    <div className="lg:max-w-[1240px] container mx-auto lg:mt-[4rem] px-4 lg:px-0">
      {/* Reusable Tabs Component */}
      <div className="md:mt-4 mt-[4rem]">
        <ResponsiveTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          actionButton={{
            label: "Talk to a Hoydoon Agent",
            onClick: handleTalkToAgent,
          }}
        />
      </div>

      {/* Tab Content */}
      <div className="mt-5 mb-[4rem] md:mb-0">
        {activeTab === "about" && (
          <div>
            <Content />
          </div>
        )}

        {activeTab === "agents" && (
          <div>
            <Agent />
          </div>
        )}

        {activeTab === "buy" && (
          <div>
            <Buy />
          </div>
        )}

        {activeTab === "sell" && (
          <div>
            <Sell />
          </div>
        )}

        {activeTab === "talk" && (
          <div>
            <TalkToAgent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
