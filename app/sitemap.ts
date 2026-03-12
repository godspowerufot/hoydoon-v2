import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://www.hoydoon.com";
    const now = new Date().toISOString();
    return [
        { url: base, lastModified: now, changeFrequency: "daily", priority: 1.0 },
        { url: `${base}/buy`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${base}/rent`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${base}/sell`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${base}/agent`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${base}/search`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        // Add more pages as the site grows
    ];
}
