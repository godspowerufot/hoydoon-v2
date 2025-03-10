/* eslint-disable */


import Image from "next/image";
import Button from "./Button";
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

const ArticleCard = ({ article }:any) => {
  return (
    <div className="relative flex flex-col h-[650px] lg:w-[36em] 2xl:w-[44em] font-bricolage rounded-lg shrink-0">
      <Image
        alt="Article image"
        width={400}
        height={300}
        loading="lazy"
        src={article.image}
        className="rounded-2xl 2xl:h-[30rem] w-full object-cover h-[400px]"
      />
      <div className="flex flex-col my-4 relative">
        <div className="flex gap-3">
          <h1 className="text-4xl font-[600] text-primary">{article.id}</h1>
          <h1 className="text-black text-3xl font-[500] pt-[10px]">
            {article.title}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex">
            <span className="flex flex-col text-gray lg:text-[18px] text-sm gap-2 font-medium">
              <h4 className="text-gray lg:text-[18px] text-sm font-medium">
                {article.date.split(" ")[0]}
              </h4>
              <h4 className="text-[18px]">{article.date.split(" ")[1]}</h4>
            </span>
            <h2 className="ml-2 mt-[17px] text-gray font-medium lg:text-[18px]">
              {article.category}
            </h2>
          </div>
        </div>
        <p className="text-gray text-[1rem] 2xl:text-xl font-bricolage font-[300] w-full leading-5 mt-4">
          {article.description}
        </p>
      </div>
    </div>
  );
};

const ArticlesSection = () => {
  return (
    <section className="flex justify-center items-center w-full flex-col mt-[3rem] p-5 lg:p-0 font-bricolage">
      <div className="flex w-full flex-col lg:flex-row md:flex-row lg:gap-8 justify-around items-center">
        <span className="flex flex-col font-bricolage 2xl:ml-0 lg:ml-7 gap-2">
          <h1 className="text-black lg:text-[2.5rem] 2xl:text-5xl font-[600] mr-2">
            New Highlights & Articles
          </h1>
          <p className="text-gray 2xl:text-[20px] lg:p-0 text-base lg:text-xl w-full lg:w-[30em]">
            Our top stories and features keep you updated on industry trends, current events.
          </p>
        </span>
        <span className="hidden lg:flex flex-col font-bricolage gap-3 text-gray">
          <p className="text-gray 2xl:text-[20px] lg:p-0 text-base lg:text-xl 2xl:w-[30em] lg:w-[24em]">
            Stay informed with our latest news and insights where you’ll find breaking stories.
          </p>
          <Button className="bg-transparent mt-2 font-[3px] border-primary border-solid border-[1px] text-gray">
            <p className="text-gray" style={{ color: "#8F8F8F" }}>
              Explore
            </p>
          </Button>
        </span>
      </div>
      <div className="flex justify-center w-full mt-[4%] lg:flex-1 lg:flex-row flex-col items-center lg:gap-10 2xl:gap-16">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;