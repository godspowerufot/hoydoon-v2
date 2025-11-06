// components/ui/ResponsiveTabs.tsx
"use client";

import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

interface Tab {
  id: string;
  label: string;
}

interface ResponsiveTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const ResponsiveTabs = ({
  tabs,
  activeTab,
  onTabChange,
  actionButton,
}: ResponsiveTabsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeTabLabel =
    tabs.find((tab) => tab.id === activeTab)?.label || tabs[0]?.label;

  const handleTabSelect = (tabId: string) => {
    onTabChange(tabId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative border-b md:border-gray">
      {/* Mobile Dropdown */}
      <div className="lg:hidden relative">
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Dropdown Button */}
          <div className="relative flex-1">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-transparent border border-[#8F8F8F] rounded-lg text-left hover:border-gray-400 transition-colors"
            >
              <span className="text-sm font-medium text-gray">
                {activeTabLabel.replace("with Hoydoon", "")}
              </span>
              <IoChevronDown
                size={20}
                className={`text-gray transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />

                {/* Dropdown Content */}
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabSelect(tab.id)}
                      className={`w-full text-left px-4 py-3 text-xs transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-white font-medium"
                          : "text-gray hover:bg-gray"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Action Button (Mobile) */}
          {actionButton && (
            <button
              onClick={actionButton.onClick}
              className="bg-primary text-white px-4 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition whitespace-nowrap"
            >
              {actionButton.label}
            </button>
          )}
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden lg:block">
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
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
        {actionButton && (
          <button
            className="absolute right-0 translate-y-1/2 bg-primary text-white px-3 py-3 md:w-[250px] md:h-[50px] text-sm md:text-[18px] hover:opacity-90 transition"
            style={{ bottom: "24px" }}
            onClick={actionButton.onClick}
          >
            {actionButton.label}{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResponsiveTabs;
