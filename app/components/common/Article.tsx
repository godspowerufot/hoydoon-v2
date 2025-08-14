/* eslint-disable */

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
const articles = [
  {
    id: 1,
    image: "/news-1.png",
    title: "Understanding the Real Estate Market Trends",
    date: "July 2024",
    category: "Perfect property",
    description:
      "Staying ahead in the real estate market requires a keen understanding of the latest trends and shifts. By analyzing current data and market indicators, you can make informed decisions whether you’re buying, selling, or investing.",
  },
  {
    id: 2,
    image: "/news-2.png",
    title: "Analyzing Modern Real Estate Market Movement",
    date: "July 2024",
    category: "Perfect property",
    description:
      "Staying ahead in the real estate market requires a keen understanding of the latest trends and shifts. By analyzing current data and market indicators, you can make informed decisions whether you’re buying, selling, or investing.",
  },
];

const ArticleCard = ({ article }: any) => {
  return (
    <div className="relative flex flex-col lg:h-[650px] w-[20em] lg:w-[36em]  font-bricolage rounded-lg  shrink-0">
      {" "}
      <Image
        alt="Article image"
        width={400}
        height={300}
        loading="lazy"
        src={article.image}
        className="rounded-2xl  w-full object-cover h-[300px] lg:h-[450px]"
      />
      <div className="flex flex-col my-4 relative">
        <div className="flex gap-3">
          <h1 className=" text-2xl lg:text-4xl font-[600] text-primary ">
            0{article.id}
          </h1>
          <h1 className="text-black  text-[15px] lg:text-2xl w-[30rem] ml-3   font-[500] pt-[15px]">
            {article.title}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 mt-1">
          <div className="flex">
            <span className="flex flex-col text-gray lg:text-[18px] text-sm -gap-2 lg:gap-2 font-medium">
              <h4 className="text-gray lg:text-[18px] text-[12px] font-[400]">
                {article.date.split(" ")[0]}
              </h4>
              <h4 className=" text-[12px] lg:text-[18px]">
                {article.date.split(" ")[1]}
              </h4>
            </span>
            <h2 className="ml-4  text-[12px] mt-[24px] text-gray font-[400] lg:text-[18px]">
              {article.category}
            </h2>
          </div>
        </div>
        <p className="text-gray  font-light text-[12px] lg:text-xl font-bricolage  w-full leading-5 mt-4">
          {article.description}
        </p>
      </div>
    </div>
  );
};

const ArticlesSection = () => {
  return (
    <section className="flex  mt-[2rem] lg:-mt-[3.5em] text-start lg:justify-center items-center w-full flex-col   lg:max-w-[1200px] p-2 lg:p-0 font-bricolage">
      <div className="flex  flex-col lg:flex-row md:flex-row lg:gap-[8rem]   justify-around lg:items-center">
        <span className="flex flex-col  font-bricolage  lg:ml-8  py-2 lg:py-0  gap-2">
          <h1 className="text-black  text-[1.5rem] lg:text-[2.5rem]  font-[600] ">
            New Highlights & Articles
          </h1>
          <p className="text-gray hidden lg:block  font-[400] 2xl:text-[20px] lg:p-0 text-base lg:text-xl w-full lg:w-[30em]">
            Our top stories and features keep you updated on industry trends,
            current events.
          </p>
        </span>
        <span className="  flex flex-col font-bricolage gap-3 text-gray">
          <p className="text-gray hidden lg:block text-sm 2xl:text-[20px] lg:p-0  lg:text-xl  lg:w-[24em]">
            Stay informed with our latest news and insights where you’ll find
            breaking stories.
          </p>
          <p className="text-gray font-light lg:hidden block text-sm 2xl:text-[20px] lg:p-0  lg:text-xl  lg:w-[24em]">
            Stay Informed with our latest news and Insights where you’ find
            breaking stories. Our top stories and features keeps you updated on
            industry trends, current events.
          </p>
          <Link href={"/helpcenter"}>
            <Button className="bg-transparent  hidden lg:block mt-2 font-[3px] border-primary border-solid border-[1px] text-gray">
              <p className="text-gray" style={{ color: "#8F8F8F" }}>
                Explore
              </p>
            </Button>
          </Link>
        </span>
      </div>
      <div className="lg:flex  hidden justify-center w-full  lg:my-[4.5em] lg:flex-1 lg:flex-row flex-col items-center lg:gap-6 ">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className="w-full lg:hidden block overflow-x-auto">
        <div className="flex flex-nowrap gap-6  pt-5 lg:px-10 w-full overflow-x-auto scroll-smooth hide-scrollbar">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
