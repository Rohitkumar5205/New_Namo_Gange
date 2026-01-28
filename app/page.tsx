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
