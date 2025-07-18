"use client";
import React, { useState } from "react";
import Image from "next/image";
const Content = () => {
  return (
    <div>
      <div className="relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/about-us.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className=" lg:mt-[3rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Welcome to Hoydoon!{" "}
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Hoydoon is a modern, all-in-one property platform designed to serve
          everyone in the real estate space—from first-time buyers and renters
          to experienced investors, agents, and homeowners. We believe that
          property should be approachable for all, no matter your level of
          experience or goal.{" "}
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          By blending intuitive, user-friendly technology with real-time local
          insights, we simplify every step of the property journey. Whether
          you're searching for your next home, managing listings, exploring
          investment opportunities, or just starting out, Hoydoon makes the
          process seamless, efficient, and accessible.{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Our platform is built to adapt to your needs—putting smart tools,
          helpful resources, and expert support right at your fingertips, so you
          can move forward with confidence, clarity, and control.{" "}
        </p>
      </div>
      <div className=" lg:mt-[3rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold "> Who We Are </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          At Hoydoon, we believe that navigating the property market—whether
          you're searching for a new home, a reliable tenant, or the ideal
          buyer—should be a straightforward, secure, and even enjoyable
          experience. That belief drives everything we do.
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Our mission is to empower individuals and families by providing the
          tools, guidance, and platform they need to succeed at every stage of
          their real estate journey. Whether you're buying your first home,
          renting a place that fits your lifestyle, or listing a property for
          sale, Hoydoon is here to make the process easier, more transparent,
          and truly connected.{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          With a focus on innovation, trust, and user-first design, we’re
          building more than just a property platform—we’re creating a space
          where people can make confident decisions and move forward with
          clarity and peace of mind.
        </p>
      </div>
      <div className=" lg:mt-[3rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">
          {" "}
          Our Leadership 
        </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          At our core, we are a collective of bold, forward-thinking
          individuals—innovators driven by curiosity and a passion for
          redefining what’s possible. We don’t just embrace change—we lead it.
          Unafraid to challenge the status quo, we seek out uncharted paths and
          turn unconventional ideas into impactful realities. Our culture
          thrives on this spirit of exploration, where questioning norms isn’t
          just welcomed—it’s expected{" "}
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Our leadership plays a vital role in fueling this mindset. By
          championing creative risk-taking and rewarding originality, they
          foster an environment where initiative is recognized and celebrated.
          Whether it’s a new solution to a longstanding challenge or a
          disruptive concept that rewrites the rules, we value the courage it
          takes to step forward and think differently{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          But innovation doesn’t flourish in isolation—it grows in a culture of
          belonging. That’s why we’re deeply committed to creating an inclusive,
          supportive workplace where every voice matters. Here, team members are
          not only encouraged to contribute but are empowered to lead, learn,
          and reach their full potential. We believe that when people feel
          respected, inspired, and connected, they don’t just do their best
          work—they thrive, both in their careers and in their personal growth{" "}
        </p>
      </div>
      {/* section2 */}
      <div className="relative my-[3rem] w-full h-[400px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src="/value-us.png"
          alt="Customer service representative on phone"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className=" lg:mt-[3rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold ">Our Values </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          At Hoydoon, our foundation is built on trust, innovation, and a deep
          sense of community. We believe that navigating the property market
          should feel transparent and secure, which is why we prioritize honest
          listings, reliable information, and safe, respectful interactions
          across our platform. Users can explore, connect, and transact with
          confidence, knowing that integrity is at the heart of everything we
          do.
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          At the same time, we are constantly evolving—driven by innovation—to
          improve the way people find, rent, buy, and manage property. Through
          intuitive design, smart tools, and continuous feature updates, we
          strive to make the experience simpler, faster, and more empowering for
          everyone{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          But beyond the technology, Hoydoon is about people. We’re not just a
          property marketplace—we’re a growing community where individuals,
          families, and professionals come together to support one another,
          share insights, and help each other find their place in the world.{" "}
        </p>
      </div>

      <div className=" lg:mt-[3rem]">
        <h1 className="lg:text-[2rem] text-xl  font-semibold "> Join Us! </h1>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          whether you're ready to buy, sell, rent, or simply explore your
          options, Hoydoon is here to guide you with the tools, support, and
          confidence you need to take your next step. Our platform is designed
          to be intuitive and accessible, making it easy to connect with
          listings, people, and opportunities that truly match your goals. By
          combining smart technology with a people-first approach, we help
          simplify what can often feel like a complicated process—so you can
          focus on what matters most: finding a place that feels right for you
        </p>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Download the Hoydoon app, set up your account, and become part of a
          growing, trusted community where real estate is built on honesty,
          ease, and human connection.{" "}
        </p>

        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          Your next move starts here—with Hoydoon{" "}
        </p>
      </div>
    </div>
  );
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("about");

  const allCoordinates = {
    about: [],
    agents: [],
    buy: [],
    sell: [],
  };

  const setCoordinates = (coords) => {
    console.log("Updating coordinates:", coords);
  };

  return (
    <div className="lg:max-w-[1200px] container mx-auto lg:mt-[4rem] px-4 lg:px-0">
      {/* ✅ Wrap this part in a relative container */}
      <div className="relative border-b mt-4 border-gray">
        <div className="flex justify-between">
          {/* Left Tabs */}
          <div className="flex flex-wrap gap-6">
            {[
              { id: "about", label: "About Us" },
              { id: "agents", label: "Our Agents" },
              { id: "buy", label: "Buy with Hoyleton" },
              { id: "sell", label: "Sell with Hoyleton" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCoordinates(allCoordinates[tab.id] || []);
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
          className="absolute right-0 translate-y-1/2 bg-primary text-white px-6 py-3 lg:w-[300px] lg:h-[50px] text-sm lg:text-[18px] hover:opacity-90 transition "
          style={{ bottom: "24px" }} // align exactly with the border line
          onClick={() => {
            console.log("Talk to a Hoyleton Agent clicked");
          }}
        >
          Talk to a Hoyleton Agent
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {activeTab === "about" && (
          <div>
            <Content />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
