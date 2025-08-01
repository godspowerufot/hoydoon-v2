"use client";
import Image from "next/image";
import { articles } from "@/constants";
import ArticleCard from "../components/common/articleLayout";
import { useState } from "react";
import Pagination from "../components/common/pagination";
import { useRouter } from "next/navigation";
function SupportCategories() {
  const categories = [
    "Landlord & Agents",
    "Buyers & Rentals",
    "Email Alerts",
    "Technical Assistance",
    "Account Assistance",
    "Mobile Apps",
  ];

  return (
    <div className=" hidden lg:grid w-[1230px] 2xl:w-[1580px] grid-cols-3 gap-4 p-4">
      {categories.map((category, index) => (
        <button
          key={index}
          className="border border-primary text-xl font-[500] px-6 py-3 rounded-md"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({
    location: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 13;
  const router = useRouter();
  interface FormData {
    location: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };
  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      ...(formData.location && { location: formData.location }),
    }).toString();

    router.push(`/rent/searchlisting?${queryParams}`);
  };

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className=" relative h-[25vh] lg:h-[32em] items-center justify-center w-screen">
        {/* Background Image Div */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
          style={{ backgroundImage: "url('/article.jpeg')" }}
        >
          {/* Overlay Div */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z[-1]"></div>
        </div>

        {/* Content Section */}
        <div className="flex z-[1]  mt-[7rem] lg:mt-[12rem]  p-3 relative gap-6 justify-center items-center flex-col">
          {/* Main Heading */}

          {/* Large Screen Search Bar */}
          {/* Large Screen Search Bar */}
          <div className="hidden lg:flex justify-center items-center w-full">
            <div className="flex h-[3.5em] py-4 font-bricolage items-center m-2 bg-white rounded-full w-10/12 md:w-4/5 lg:w-[35em]">
              {/* Transparent Full-Width Input */}
              <input
                type="text"
                className="flex-1 bg-transparent placeholder:text-[1.2rem] text-black placeholder-gray-500 border-none outline-none pl-4 w-[36.3rem]"
                placeholder="search"
              />

              {/* Search Button */}
              <div className="relative mr-2 p-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-white before:via-white/30 before:to-white/10 before:p-[1px]">
                <div className="relative bg-primary ml-[1em] p-2 3 w-[40px] h-[40px] rounded-full flex items-center justify-center">
                  <Image
                    alt="logo"
                    width={40}
                    loading="lazy"
                    height={40}
                    quality={100} // Ensures maximum quality
                    src={"/search.png"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Small Screen Search Bar */}
          <div className="flex  lg:hidden justify-center items-center w-full px-1 py-1">
            <div className="flex  items-center w-full bg-white rounded-full h-[2.4em] px-2 py-1">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="search"
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
              />
              <button
                onClick={handleSearch}
                className="ml-2 bg-primary p-2 rounded-full flex items-center justify-center hover:bg-opacity-90"
              >
                <Image alt="Search" width={15} height={15} src="/search.png" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* this hold the images */}

      {/* explore */}
      <section className="  2xl:-mb-[8rem]  flex-col mt-[2rem]   lg:mt-[3em] w-full  font-bricolage lg:flex justify-center   gap-4 2xl:gap-[1.5rem] flex-1 items-center">
        <div className=" p-2 grid  grid-row  grid-cols-1 md:grid-cols-3 gap-7 place-items-center gap-y-6">
          {currentArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              imageSrc={article.imageSrc}
              altText={article.altText}
              title={article.title}
              articleType={article.articleType}
              readTime={article.readTime}
              date={article.date}
              id={article.id} // Ensure to pass the id prop
            />
          ))}
        </div>

        <Pagination
          totalPages={totalPages}
          display={currentArticles.map((article) => article.id)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        <div className="w-full hidden lg:block  mt-[3rem] mb-[2rem] h-[2px] bg-[#D9D9D9] " />

        <SupportCategories />
      </section>
    </>
  );
}
