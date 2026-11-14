import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://kthiriyoussef.github.io/Portfolio-/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mohamed Youssef KTHIRI | Software Engineer",
  description:
    "Software Engineer and final-year ESPRIT student focused on full-stack engineering, applied AI and DevOps. Available for a six-month PFE internship starting January 2027.",
  openGraph: {
    title: "Mohamed Youssef KTHIRI | Software Engineer",
    description:
      "Full-stack software engineering, applied AI and DevOps. Looking for a six-month PFE internship starting January 2027.",
    type: "website",
    locale: "en_US",
    siteName: "Mohamed Youssef KTHIRI",
  },
  twitter: {
    card: "summary",
    title: "Mohamed Youssef KTHIRI | Software Engineer",
    description: "Full-stack software engineering, applied AI and DevOps.",
  },
  robots: { index: true, follow: true },
  icons: { icon: `${basePath}/favicon.svg` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
