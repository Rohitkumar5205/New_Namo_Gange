import React from "react";
import { getSeo } from "@/lib/getSeo";
import Donate from "@/components/donate/Donate"

export async function generateMetadata() {
  const seo = await getSeo("/donate");

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
     
      <Donate />
    </div>
  );
};

export default page;
