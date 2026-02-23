import Support from "@/components/support/Support";
import React from "react";
import { getSeo } from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("/support");

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
     
      <Support />
    </div>
  );
};

export default page;
