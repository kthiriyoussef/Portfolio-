import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mohamed-youssef74.github.io/mohamed-youssef-portfolio/";
  return [{ url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
