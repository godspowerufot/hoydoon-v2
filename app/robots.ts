import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/rent/searchlisting"], // Add any paths you want to exclude
    },
    sitemap: "https://www.hoydoon.com/sitemap.xml",
  };
}
