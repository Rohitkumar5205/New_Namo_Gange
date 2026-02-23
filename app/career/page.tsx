import React from "react";
import Career from "@/components/career/Career";
import { getSeo } from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("/career");

  if (!seo) return {};

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.metaKeywords,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}

export default function MokshaSewaPage() {
  return (
    <section className="bg-gray-50 pb-16">
      <Career />
    </section>
  );
}
