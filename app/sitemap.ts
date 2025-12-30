import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://hoydoon.com";
    const lastModified = new Date("2025-12-16T00:14:58.000Z");

    const routes = [
        { url: "", priority: 1.0 },
        { url: "/buy", priority: 0.8 },
        { url: "/rent", priority: 0.8 },
        { url: "/sell", priority: 0.8 },
        { url: "/agent", priority: 0.8 },
        { url: "/auth/sign-in", priority: 0.8 },
        { url: "/auth/sign-up", priority: 0.8 },
        { url: "/helpcenter", priority: 0.8 },
        { url: "/review", priority: 0.8 },
        { url: "/article/6", priority: 0.8 },
        { url: "/article/3", priority: 0.8 },
        { url: "/about", priority: 0.8 },
        { url: "/contact", priority: 0.8 },
        { url: "/terms", priority: 0.8 },
        { url: "/policy", priority: 0.8 },
        { url: "/search", priority: 0.64 },
        { url: "/search?category=luxury", priority: 0.64 },
        { url: "/agent/all-agent", priority: 0.64 },
        { url: "/sell/sell-home", priority: 0.64 },
        { url: "/auth/forgot-password", priority: 0.64 },
        { url: "/helpcenter/submit-request", priority: 0.64 },
        { url: "/article/19", priority: 0.64 },
        { url: "/article/20", priority: 0.64 },
        { url: "/article/21", priority: 0.64 },
        { url: "/article/22", priority: 0.64 },
        { url: "/article/24", priority: 0.64 },
        { url: "/article/1", priority: 0.64 },
        { url: "/article/4", priority: 0.64 },
        { url: "/article/5", priority: 0.64 },
        { url: "/article/7", priority: 0.64 },
        { url: "/article/8", priority: 0.64 },
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route.url}`,
        lastModified,
        changeFrequency: "weekly",
        priority: route.priority,
    }));
}
