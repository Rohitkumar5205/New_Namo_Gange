import AboutNGTrust from "@/components/home/AboutNGTrust";
import HomeSlider from "@/components/home/HomeSlider";
import MokshaVoyage from "@/components/home/MokshaVoyage";
import NewsUpdate from "@/components/home/NewsUpdate";
import ObjectiveOfTrust from "@/components/home/ObjectiveOfTrust";
import OurAchievement from "@/components/home/OurAchievement";
import OurInitiatives from "@/components/home/OurInitiatives";
import SpecialPage from "@/components/home/SpecialPage";
import WhatPeople from "@/components/home/WhatPeople";
import React from "react";
// import LatestVideos from "@/components/home/LatestVideos";
import { getSeo, parseOpenGraph, cleanHtmlString, extractSchemaScript } from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("/");

  if (!seo) return {};

  const ogTags = parseOpenGraph(seo.openGraphTags);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.metaKeywords || "",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: ogTags.title || seo.metaTitle,
      description: ogTags.description || seo.metaDescription,
      url: ogTags.url,
      siteName: ogTags.site_name,
      type: (ogTags.type as any) || "website",
      images: [
        {
          url: seo.open_graph || ogTags.image,
          alt: seo.metaTitle,
        },
      ],
    },
  };
}

const page = async () => {
  const seo = await getSeo("/");
  return (
    <div>
      {/* Header SEO Code & Schema */}
      {seo?.seo_header_code && (
        <div dangerouslySetInnerHTML={{ __html: cleanHtmlString(seo.seo_header_code) }} />
      )}
      {seo?.schemaMarkup &&
        extractSchemaScript(seo.schemaMarkup).map((script, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: script }}
          />
        ))}

      <HomeSlider />
      <MokshaVoyage />
      <ObjectiveOfTrust />
      <AboutNGTrust />
      <OurInitiatives />
      <WhatPeople />
      <OurAchievement />
      {/* <SpecialPage /> */}
      {/* <LatestVideos /> */}
      <NewsUpdate />

      {/* Footer SEO Code */}
      {seo?.seo_footer_code && (
        <div dangerouslySetInnerHTML={{ __html: cleanHtmlString(seo.seo_footer_code) }} />
      )}
    </div>
  );
};

export default page;
