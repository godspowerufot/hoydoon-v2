"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "../common/Button";
import { log } from "@/utils/log";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/utils/cookies";
import { useLogoutMutation } from "@/store/slices/api/authapi";
const MobileNavbar = () => {
  const router = useRouter();
  const sidebarRef = useRef(null);
  const pathname = usePathname();

  const authPaths = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password"];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
  });

  const isAuthenticated = getAccessToken();
  const [logout] = useLogoutMutation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // ⛔ Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handlelogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout(null); // wait for mutation
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Try again.");
      setIsLoggingOut(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = () => {
    log("Search clicked");
    const queryParams = new URLSearchParams({
      ...(formData.location && { location: formData.location }),
    }).toString();

    router.push(`/rent/searchlisting?${queryParams}`);
  };

  if (authPaths.includes(pathname)) return null;

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const sections = {
    Buy: {
      title: "Homes for Sale",
      items: [
        { label: "Homes for Sale", href: "/buy" },
        { label: "Lagos Homes for Sale", href: "/buy" },
        { label: "Open Houses", href: "/buy" },
        { label: "New Constructions", href: "/buy" },
        { label: "Lands for Sale", href: "/buy" },
      ],
    },
    Rent: {
      title: "Discover Hoydoon Rentals",
      items: [
        { label: "Apartments for rent", href: "/rent" },
        { label: "Houses for rent", href: "/rent" },
        { label: "All rentals listings", href: "/rent" },
        { label: "All rentals buildings", href: "/rent" },
      ],
    },
    Sell: {
      title: "Explore your rentals",
      items: [
        { label: "See your home’s Hoydoon Estimate", href: "/sell" },
        { label: "Lagos Housing market", href: "/sell" },
        { label: "Seller’s guide", href: "/sell" },
      ],
    },
    "Find an Agent": {
      title: "Looking for pros?",
      items: [
        { label: "Real Estate Agents", href: "/agent" },
        { label: "Property Managers", href: "/agent" },
        { label: "Real Estate Photographers", href: "/agent" },
        { label: "Home Builders", href: "/agent" },
      ],
    },
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          // optional
        ></div>
      )}
      <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md lg:hidden">
        {!(
          pathname.startsWith("/rent/searchlisting") ||
          pathname.startsWith("/helpcenter/submit-request")
        ) && (
          <>
            {" "}
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                {" "}
                <Image alt="logo" width={30} height={30} src="/Logo.svg" />
                {pathname === "/helpcenter" ? (
                  <div className="flex items-center space-x-2">
                    {/* vertical line */}
                    {/* <div className="w-[2px] h-5 bg-black" /> */}
                    <span className=" border-l-black border-[2px] pl-2  border-y-0 border-r-0 text-gray-800 font-[500] text-sm cursor-pointer  transition-colors whitespace-nowrap">
                      Help center
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold text-gray-800 text-base">
                    Hoydoon
                  </span>
                )}
              </Link>
            </div>
          </>
        )}

        <div className="flex items-center justify-between w-full gap-3">
          {pathname === "/rent/searchlisting" ||
          pathname.startsWith("/helpcenter/submit-request") ? (
            <div className="flex items-center space-x-2">
              {/* Globe Icon */}
              <Image
                width={500}
                height={300}
                src="/mobilelog.png"
                alt="globe"
                className="w-8 h-8"
              />

              {/* Input Field with Search Button */}
              <div className="flex items-center  border-[0.6px] border-[#8F8F8F] rounded-full   px-2 py-1">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="location"
                  className="text-gray-500 placeholder:text-gray-400  text-sm bg-transparent outline-none px-2 w-[180px]"
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#008D8D] w-7 h-7 rounded-full flex items-center justify-center"
                >
                  <Image
                    alt="Search"
                    width={10}
                    height={10}
                    src="/search.png"
                  />
                </button>
              </div>
            </div>
          ) : (
            <>
              {pathname === "/helpcenter" ? (
                <div className="flex items-center gap-2  w-full justify-end mr-5 flex-end">
                  <span
                    onClick={() => router.push("/helpcenter/submit-request")}
                    className="text-gray-800 text-sm cursor-pointer  transition-colors"
                  >
                    Submit Request
                  </span>
                </div>
              ) : (
                <div className="w-full mr-[7px] flex justify-end">
                  <Link
                    href="https://expo.dev/artifacts/eas/fYMekk7hs69zo5CgvmfQ1N.apk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#008D8D] text-white text-[12px] px-2 !w-[111px] py-[6px] rounded-full font-medium">
                      Download App
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
        <button onClick={() => setSidebarOpen(true)} className="text-gray-800">
          <Image
            alt="logo"
            width={30}
            height={30}
            src="/menu.svg"
            className="w-[32px] h-[12px]"
          />
        </button>
      </nav>

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-[295px] bg-white transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* /* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-[328px] bg-white transform transition-transform duration-300 z-50 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b  border-[#8F8F8F]">
            <Link
              href={"/"}
              className="flex cursor-pointer items-center space-x-2"
            >
              <Image alt="logo" width={30} height={30} src="/Logo.svg" />

              <span className="font-semibold text-[#1E1E1E] text-base">
                Hoydoon
              </span>
            </Link>{" "}
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-800 mr-[9px]"
            >
              <Image
                src="/close.svg"
                alt="close icon"
                width={10}
                height={10}
                className="!w-[15px] !h-[15px]  "
              />
            </button>
          </div>

          <div className=" py-2">
            <div className="flex items-center my-4 px-4 gap-2 ">
              <Image
                alt="phone icon"
                width={13}
                height={13}
                src="/phone.png"
                className="w-[24px] h-[24px]"
              />
              <span className="text-primary text-[16px] font-[500]">
                <Link
                  href="
                https://expo.dev/artifacts/eas/fYMekk7hs69zo5CgvmfQ1N.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Download App
                </Link>
              </span>
            </div>

            {Object.entries(sections).map(([section, content]) => {
              // Add custom border classes for specific sections
              let borderClass =
                "border-x-0 border-[1px] border-[#8F8F8F] px-4 py-2";
              if (section === "Rent") borderClass += " border-b-0";
              if (section === "Rent") borderClass += " border-b border-t-0";
              if (section === "Find an Agent") borderClass += " border-t-0";
              return (
                <div key={section} className={borderClass}>
                  <button className="flex justify-between  items-center w-full text-black text-base h-[2.4rem]">
                    <Link
                      href={content.items[0]?.href || "#"}
                      onClick={() => setSidebarOpen(false)}
                      className="flex-1 text-left"
                    >
                      {section}
                    </Link>
                    <div
                      onClick={() => toggleDropdown(section)}
                      className="border-y-0 border-r-0 w-[36px] h-[24px]  border-l-[1px]  flex justify-center items-center pl-3 border-solid border-[#8F8F8F]"
                    >
                      <Image
                        src={
                          openDropdown === section
                            ? "/arrow-down.svg"
                            : "/arrow-up.svg"
                        }
                        alt="dropdown arrow"
                        width={16}
                        height={16}
                        className="!w-[12px] h-[13px]"
                      />{" "}
                    </div>
                  </button>
                  {openDropdown === section && (
                    <div className="mt-1 pl-2">
                      <p className="text-black font-medium text-sm mb-2">
                        {content.title}
                      </p>
                      {content.items.map((item, index) => (
                        <Link key={index} href={item.href}>
                          <p
                            onClick={() => setSidebarOpen(false)}
                            className="text-[#007B7B] text-sm font-normal py-1 cursor-pointer"
                          >
                            {item.label}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link href="/auth/sign-in">
              <div
                onClick={() => setSidebarOpen(false)}
                className="py-4 px-4 text-primary border-b border-top-[1px]  border-[-0.6px] text-base border-x-0  border-[#8F8F8F]  border-solid cursor-pointer"
              >
                Become an Agent
              </div>
            </Link>

            <Link href="/helpcenter">
              <div
                onClick={() => setSidebarOpen(false)}
                className="py-4  px-4 text-base text-gray-600 border-b border-[#8F8F8F] border-solid cursor-pointer"
              >
                Help
              </div>
            </Link>

            {/* Authentication Buttons */}
            <div className="flex flex-col gap-2">
              {isAuthenticated ? (
                // Logout button when user is logged in
                <div
                  onClick={handlelogout}
                  disabled={isLoggingOut}
                  className={`font-bricolage h-auto p-1 rounded-none mt-5 border-primary brder-solid text-white bg-primary  flex justify-center items-center  w-[7.5rem]
            ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </div>
              ) : (
                // Login & Register buttons when user is not logged in
                <>
                  <Link
                    href="/auth/sign-up"
                    className="font-light h-[25px] text-base"
                  >
                    <button className="font-bricolage ml-4  h-auto p-1 rounded-none mt-5 border-primary brder-solid border-[1px] bg-primary text-white  flex justify-center items-center  w-[7.5rem]">
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
