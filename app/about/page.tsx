import React from "react";
import AboutJoin from "@/components/about/AboutJoin";
import AboutNamoGange from "@/components/about/AboutNamoGange";
import {
  getSeo,
  parseOpenGraph,
  cleanHtmlString,
  extractSchemaScript,
} from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("/about");

  if (!seo) return {};

  const ogTags = parseOpenGraph(seo.openGraphTags);
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.metaKeywords,
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title: ogTags.title || seo.metaTitle,
      description: ogTags.description || seo.metaDescription,
      url: ogTags.url,
      siteName: ogTags.site_name,
      type: ogTags.type as any,
      images: [
        {
          url: seo.open_graph,
          alt: seo.metaTitle,
        },
      ],
    },
  };
}
const page = async () => {
  const seo = await getSeo("/about");
  // console.log(" __html: extractSchemaScript(seo.schemaMarkup)", { __html: extractSchemaScript(seo.schemaMarkup) })
  return (
    <>
      <AboutNamoGange />
      <AboutJoin />
      {seo?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: extractSchemaScript(seo.schemaMarkup),
          }}
        />
      )}
    </>
  );
};

export default page;
