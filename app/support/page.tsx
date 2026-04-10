import Support from "@/components/support/Support";
import React from "react";
import { getSeo, parseOpenGraph, cleanHtmlString, extractSchemaScript } from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("/support");

  if (!seo) return {};

  const ogTags = parseOpenGraph(seo.openGraphTags);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.metaKeywords || "",
    alternates: {
      canonical: "/support",
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
  const seo = await getSeo("/support");
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

      <Support />

      {/* Footer SEO Code */}
      {seo?.seo_footer_code && (
        <div dangerouslySetInnerHTML={{ __html: cleanHtmlString(seo.seo_footer_code) }} />
      )}
    </div>
  );
};

export default page;
