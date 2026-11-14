import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mohamed-youssef74.github.io/mohamed-youssef-portfolio/";
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${baseUrl}/sitemap.xml` };
}
