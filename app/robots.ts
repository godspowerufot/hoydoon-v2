import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/rent/fixes",
          "/auth/sign-in",
          "/auth/sign-up",
          "/auth/forgot-password",
        ],
      },
    ],
    sitemap: "https://www.hoydoon.com/sitemap.xml",
  };
}
