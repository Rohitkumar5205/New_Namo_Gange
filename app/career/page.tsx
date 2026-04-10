import React from "react";
import Career from "@/components/career/Career";
import { getSeo, parseOpenGraph, cleanHtmlString, extractSchemaScript } from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("/career");

  if (!seo) return {};

  const ogTags = parseOpenGraph(seo.openGraphTags);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.metaKeywords || "",
    alternates: {
      canonical: "/career",
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

export default async function MokshaSewaPage() {
  const seo = await getSeo("/career");
  return (
    <section className="bg-gray-50 pb-16">
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

      <Career />

      {/* Footer SEO Code */}
      {seo?.seo_footer_code && (
        <div dangerouslySetInnerHTML={{ __html: cleanHtmlString(seo.seo_footer_code) }} />
      )}
    </section>
  );
}
