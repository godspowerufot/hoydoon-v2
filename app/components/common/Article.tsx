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
    <div className="relative flex flex-col h-[650px] w-[22em] lg:w-[36em] 2xl:w-[43em] font-bricolage rounded-lg  shrink-0">
      <Link href={"/article/article-details"}>
        {" "}
        <Image
          alt="Article image"
          width={400}
          height={300}
          loading="lazy"
          src={article.image}
          className="rounded-2xl 2xl:h-[30rem] w-full object-cover h-[300px] lg:h-[450px]"
        />
        <div className="flex flex-col my-4 relative">
          <div className="flex gap-3">
            <h1 className=" text-2xl lg:text-4xl font-[600] text-primary ">0{article.id}</h1>
            <h1 className="text-black  text-base lg:text-2xl w-[30rem] ml-3  2xl:text-[2rem] 2xl:w-[50rem] font-[500] pt-[15px]">
              {article.title}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex">
              <span className="flex flex-col text-gray lg:text-[18px] text-sm gap-2 font-medium">
                <h4 className="text-gray lg:text-[18px] text-sm font-[400]">
                  {article.date.split(" ")[0]}
                </h4>
                <h4 className=" text-sm lg:text-[18px]">{article.date.split(" ")[1]}</h4>
              </span>
              <h2 className="ml-4  text-sm mt-[24px] text-gray font-[400] lg:text-[18px]">
                {article.category}
              </h2>
            </div>
          </div>
          <p className="text-gray  text-sm lg:text-xl font-bricolage font-[300] w-full leading-5 mt-4">
            {article.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

const ArticlesSection = () => {
  return (
    <section className="flex  text-start lg:justify-center items-center w-full flex-col my-[3rem]   p-5 lg:p-0 font-bricolage">
      <div className="flex  flex-col lg:flex-row md:flex-row lg:gap-[8rem] 2xl:gap-[14rem]  justify-around lg:items-center">
        <span className="flex flex-col font-bricolage  lg:ml-8 2xl:ml-0 py-2 lg:py-0  gap-2">
          <h1 className="text-black  text-xl lg:text-[2.5rem] 2xl:text-5xl font-[600] ">
            New Highlights & Articles
          </h1>
          <p className="text-gray hidden lg:block  2xl:text-[20px] lg:p-0 text-sm lg:text-xl w-full lg:w-[30em]">
            Our top stories and features keep you updated on industry trends,
            current events.
          </p>
        </span>
        <span className="  flex flex-col font-bricolage gap-3 text-gray">
          <p className="text-gray text-sm 2xl:text-[20px] lg:p-0  lg:text-xl 2xl:w-[30em] lg:w-[24em]">
            Stay informed with our latest news and insights where you’ll find
            breaking stories.
          </p>
          <Button className="bg-transparent  hidden lg:block mt-2 font-[3px] border-primary border-solid border-[1px] text-gray">
            <p className="text-gray" style={{ color: "#8F8F8F" }}>
              Explore
            </p>
          </Button>
        </span>
      </div>
      <div className="flex justify-center w-full  mt-[1.3rem] lg:mt-[4%] lg:flex-1 lg:flex-row flex-col items-center lg:gap-6 2xl:gap-10">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;
