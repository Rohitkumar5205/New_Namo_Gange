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
import LatestVideos from "@/components/home/LatestVideos";
import { getSeo } from "@/lib/getSeo";

export async function generateMetadata() {
  const seo = await getSeo("/");

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
      <HomeSlider />
      <MokshaVoyage />
      <ObjectiveOfTrust />
      <AboutNGTrust />
      <OurInitiatives />
      <WhatPeople />
      <OurAchievement />
      {/* <SpecialPage /> */}
      <LatestVideos />
      <NewsUpdate />
    </div>
  );
};

export default page;
g