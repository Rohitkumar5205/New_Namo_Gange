import React from 'react'
import AboutJoin from "@/components/about/AboutJoin";
import AboutNamoGange from "@/components/about/AboutNamoGange";
import { getSeo } from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("/about");

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
const page = () => {
  return (
    <div>
      <AboutNamoGange/>
      <AboutJoin/>
    </div>
  )
}

export default page
