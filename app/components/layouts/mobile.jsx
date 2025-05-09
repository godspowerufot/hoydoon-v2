'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '../common/Button';




const MobileNavbar = () => {
  const pathname = usePathname();
  const authPaths = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password"];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
const [formData, setFormData] = useState({
    location: "",
  
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSearch = () => {
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
    onClick={() => setSidebarOpen(false)} // optional
  ></div>
)}
  <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md lg:hidden">
  {!pathname.startsWith("/rent/searchlisting") && (
    <div className="flex items-center space-x-2">
      <Image alt="logo" width={30} height={30} src="/Logo.svg" />
      <span className="font-semibold text-gray-800 text-[16px]">Hoydoon</span>
    </div>
  )}

  <div className="flex items-center justify-between w-full gap-3">
    {pathname === "/rent/searchlisting" ? (
    <div className="flex items-center space-x-2">
    {/* Globe Icon */}
    <img src="/mobilelog.png" alt="globe" className="w-8 h-8" />

    {/* Input Field with Search Button */}
    <div className="flex items-center border border-[#8F8F8F] rounded-full   px-2 py-1">
      <input
        type="text"
        value={formData.location}
        onChange={handleChange}
        placeholder="Lagos, Nigeria"
        className="text-gray-500 placeholder:text-gray-400  text-sm bg-transparent outline-none px-2 w-[180px]"
      />
      <button
        onClick={handleSearch}
        className="bg-[#008D8D] w-7 h-7 rounded-full flex items-center justify-center"
      >
          <Image alt="Search" width={10} height={10} src="/search.png" />
      </button>
    </div>
  </div>
    ) : (<>
     <div className='w-full mr-[5px] flex justify-end'>
      <Button className="bg-[#008D8D] text-white text-sm px-4 py-[8px] rounded-full font-medium">
        Download App
      </Button>
     
    </div>
      </>
    )}

    
  </div>
  <button onClick={() => setSidebarOpen(true)} className="text-gray-800">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
</nav>

<div className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b  border-[#8F8F8F]">
          <Image alt="logo" width={100} height={100} src="/mobilelogo.png" />
          <button onClick={() => setSidebarOpen(false)} className="text-gray-800">
            <Image src="/close.svg" alt="close icon" width={10} height={10} />
          </button>
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center my-4 gap-2 ">
            <Image alt="phone icon" width={20} height={18} src="/phone.png" />
            <span className="text-primary text-sm font-meduim">Download App</span>
          </div>

          {Object.entries(sections).map(([section, content]) => (
            <div key={section} className="border-b border-t border-[#E5E5E5] py-2">
              <button
                className="flex justify-between items-center w-full text-black text-base h-[2.4rem]"
                onClick={() => toggleDropdown(section)}
              >
                {section}
                <Image
                  src={openDropdown === section ? "/arrowup-green.png" : "/arrowdown.png"}
                  alt="dropdown arrow"
                  width={16}
                  height={16}
                />
              </button>
              {openDropdown === section && (
  <div className="mt-1 pl-2">
    <p className="text-black font-medium text-sm mb-2">{content.title}</p>
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
          ))}

<Link href="/auth/sign-in">
  <div
    onClick={() => setSidebarOpen(false)}
    className="py-4 text-primary border-b text-base border-x-0  border-[#E5E5E5] border-[1px] border-solid cursor-pointer"
  >
    Become an Agent
  </div>
</Link>

<Link href="/helpcenter">
  <div
    onClick={() => setSidebarOpen(false)}
    className="py-4 text-base text-gray-600 border-b border-[#E5E5E5] border-solid cursor-pointer"
  >
    Help
  </div>
</Link>

        </div>
      </div>
      </div>
    </>
  );
};


export default MobileNavbar;