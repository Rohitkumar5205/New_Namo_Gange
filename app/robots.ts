import { MetadataRoute } from "next";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{}];
}

const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://panchkarmaa.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${CLIENT_URL}/sitemap.xml`,
  };
}
