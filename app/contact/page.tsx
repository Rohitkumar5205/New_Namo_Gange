import Contact from "@/components/contact/Contact";
import React from "react";
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

const page = () => {
  return (
    <div>
     
      <Contact />
    </div>
  );
};

export default page;
