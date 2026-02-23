import UpcomingEvent from "@/components/event/UpcomingEvent";
import React from "react";
import { getSeo } from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("/event/upcoming");

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
      <UpcomingEvent />
    </div>
  );
};

export default page;
