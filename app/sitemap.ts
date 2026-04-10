import fetchClient from "@/lib/fetchClient";
import { MetadataRoute } from "next";

// Force static generation for static export mode
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ __metadata_id__: [] }];
}

// Backend base URL for slug fetching
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define Default Static Routes (Fallback)
  const staticRoutes = [
    "/",
    "/about",
    "/career",
    "/contact",
    "/donate",
    "/initiatives",
    "/support",
    "/gallery/photos",
    "/gallery/videos",
    "/communication/latestNews",
    "/communication/newsLetter",
    "/communication/blog",
    "/join/member",
    "/join/volunteer",
    "/event/past",
    "/event/upcoming",
    "/objectives/culture",
    "/objectives/health",
    "/objectives/mokshaSewa",
    "/objectives/nature",
    "/objectives/women",
    "/activities/events",
    "/activities/missions",
  ];

  let routesToUse: string[] = [];

  // 2. Fetch Routes from SEO API
  try {
    const seoRes = await fetchClient.get("/seo");;
    const seoData = seoRes.data;

    if (seoData?.success && Array.isArray(seoData.data) && seoData.data.length > 0) {
      routesToUse = seoData.data
        .map((item: any) => item.page_path)
        .filter((path: string) => path && path.startsWith("/"));

    } else {
      routesToUse = staticRoutes;
    }
  } catch (error) {
    console.warn("[Build] Warning: Could not fetch SEO routes for sitemap. Using default static routes.");
    routesToUse = staticRoutes;
  }

  const sitemapEntries: MetadataRoute.Sitemap = routesToUse.map((route) => ({
    url: `${CLIENT_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" || route === "" ? 1 : 0.8,
  }));

  return sitemapEntries;
}
