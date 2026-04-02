/* eslint-disable */

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
const articles = [
  {
    id: "6",
    imageSrc: "/webp/6.webp",
    altText: "How Do I Report a Problem With a Listing?",
    articleType: "General",
    title: "How Do I Report a Problem With a Listing?",
    slug: "report-listing-problem",
    readTime: "3 min read",
    date: "March 2025",
    description:
      "If you come across a problem with a listing on Hoydoon, we're here to support you every step of the way. Whether the issue involves inaccurate information, technical glitches, or something that goes against our policies, our team is ready to step in and assist.",
  },
  {
    id: "3",
    imageSrc: "/webp/3.webp",
    altText: "Do I Need a Real Estate Agent to Buy a Home?",
    articleType: "General",
    title: "Do I Need a Real Estate Agent to Buy a Home?",
    slug: "do-i-need-real-estate-agent",
    readTime: "3 min read",
    date: "March 2025",
    description:
      "Buying a home is one of the biggest financial decisions most people will make. It's not just a transaction,it's a complex process that involves legal paperwork, market analysis, negotiations, inspections, and plenty of emotions.",
  },
];

const ArticleCard = ({ article }: any) => {
  return (
    <Link href={`/article/${article.slug}`}>
      <div className="relative cursor-pointer flex flex-col md:h-[650px] w-[20em] md:w-[36em]  font-bricolage rounded-lg  shrink-0">
        {" "}
        <Image
          alt="Article image"
          width={400}
          height={300}
          loading="lazy"
          src={article.imageSrc}
          className="rounded-2xl  w-full object-cover h-[300px] md:h-[450px]"
        />
        <div className="flex flex-col my-4 relative">
          <div className="flex gap-3">
            <span className=" text-2xl md:text-4xl font-[600] text-primary ">
              0{article.id}
            </span>
            <h3 className="text-black  text-[15px] md:text-2xl w-[30rem] ml-3   font-[500] pt-[15px]">
              {article.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 mt-1">
            <div className="flex">
              <span className="flex flex-col text-gray md:text-[18px] text-sm -gap-2 md:gap-2 font-medium">
                <span className="text-gray md:text-[18px] text-[12px] font-[400]">
                  {article.date.split(" ")[0]}
                </span>
                <span className=" text-[12px] md:text-[18px]">
                  {article.date.split(" ")[1]}
                </span>
              </span>
              <span className="ml-4  text-[12px] mt-[24px] text-gray font-[400] md:text-[18px]">
                {article.articleType}
              </span>
            </div>
          </div>
          <p className="text-gray  font-light text-[12px] md:text-xl font-bricolage  w-full leading-5 mt-4">
            {article.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const ArticlesSection = () => {
  return (
    <div className="relative md:-mt-[1em] text-start md:justify-center items-center w-full flex-col   md:max-w-[1200px] p-2 md:p-0 font-bricolage">
      <div className="flex  flex-col md:flex-row md:gap-[4rem]   justify-around md:items-center">
        <span className="flex flex-col  font-bricolage  md:ml-10  py-2 md:py-0  gap-2">
          <h2 className="text-black  text-[1.5rem] md:text-[2.5rem]  font-[600] ">
            New Highlights & Articles
          </h2>
          <p className="text-gray hidden md:block  font-[400] 2xl:text-[20px] md:p-0 text-base md:text-xl w-full md:w-[30em]">
            Our top stories and features keeps you updated on industry trends
            and current trends.
          </p>
        </span>
        <span className="  flex flex-col font-bricolage gap-3 text-gray">
          <p className="text-gray hidden md:block text-sm 2xl:text-[20px] md:p-0  md:text-xl  md:w-[28em]">
            Stay informed with our latest news and insights where you’ll find
            Breaking stories in the property market
          </p>
          <p className="text-gray font-light md:hidden block text-sm 2xl:text-[20px] md:p-0  md:text-xl  md:w-[24em]">
            Stay Informed with our latest news and Insights where you’ find
            breaking stories. Our top stories and features keeps you updated on
            industry trends, current trends.
          </p>
          <Link href={"/helpcenter"}>
            <Button className="bg-transparent  hidden md:block mt-2 font-[3px] group hover:bg-primary transition-all duration-500 border-primary border-solid border-[1px] text-gray">
              <p className="text-gray group-hover:!text-white transition-colors duration-500" >
                Explore
              </p>
            </Button>
          </Link>
        </span>
      </div>
      <div className="md:flex  hidden justify-center w-full md:mt-[2.5em]  md:mb-[5.5em] md:flex-1 md:flex-row flex-col items-center md:gap-8 ">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className="w-full md:hidden block overflow-x-auto">
        <div className="flex flex-nowrap gap-6  pt-5 md:px-10 w-full overflow-x-auto scroll-smooth hide-scrollbar">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection;
