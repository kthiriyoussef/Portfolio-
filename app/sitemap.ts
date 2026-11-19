import type { MetadataRoute } from "next";
import { projectCatalog } from "@/lib/project-catalog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://kthiriyoussef.github.io/Portfolio-/";
  const projectUrls = projectCatalog.map(({ slug }) => ({
    url: new URL(`projects/${slug}/`, baseUrl).toString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...projectUrls,
  ];
}
