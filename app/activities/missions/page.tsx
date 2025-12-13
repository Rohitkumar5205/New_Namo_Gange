"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// IMAGES
import ourIni10 from "@/public/OurInitiatives/ourIni10.png";
import ourIni11 from "@/public/OurInitiatives/ourIni11.png";
import ourIni12 from "@/public/OurInitiatives/ourIni12.png";
import ourIni13 from "@/public/OurInitiatives/ourIni13.png";
import ourIni14 from "@/public/OurInitiatives/ourIni14.png";
import ourIni15 from "@/public/OurInitiatives/ourIni15.png";
import ourIni16 from "@/public/OurInitiatives/ourIni16.png";
import ourIni17 from "@/public/OurInitiatives/ourIni17.png";

interface Mission {
  title: string;
  image: StaticImageData | string;
  description: string;
  link: string;
}

const missions: Mission[] = [
  {
    title: "Arogya Film Festival",
    image: ourIni10,
    description:
      "A mission to spread health awareness through cinema, storytelling and positive messaging.",
    link: "/missions/arogya-film-festival",
  },
  {
    title: "Indo Himalayan Expo",
    image: ourIni11,
    description:
      "Connecting Himalayan wellness, nature, culture and trade on a global platform.",
    link: "/missions/indo-himalayan-expo",
  },
  {
    title: "Anna Sewa",
    image: ourIni12,
    description:
      "Feeding the needy with compassion — a mission rooted in selfless service.",
    link: "/missions/anna-sewa",
  },
  {
    title: "NGT Farms",
    image: ourIni13,
    description:
      "Promoting sustainable farming, organic growth and eco-friendly rural development.",
    link: "/missions/ngt-farms",
  },
  {
    title: "Grand Master of Yoga",
    image: ourIni14,
    description:
      "Honoring exceptional yoga practitioners and promoting ancient Indian wisdom.",
    link: "/missions/grand-master",
  },
  {
    title: "Arogya Sangoshti",
    image: ourIni15,
    description:
      "A knowledge-sharing mission for Ayurveda and natural healing innovations.",
    link: "/missions/arogya-sangoshti",
  },
  {
    title: "Rangshala",
    image: ourIni16,
    description:
      "Preserving Indian culture through performing arts, drama and traditional heritage.",
    link: "/missions/rangshala",
  },
  {
    title: "Ayush Mitra",
    image: ourIni17,
    description:
      "Youth volunteers spreading holistic wellness and health awareness across communities.",
    link: "/missions/ayush-mitra",
  },
];

const page = () => {
  return (
    <section className="mb-8 bg-gray-50">
      {/* ------------------ BANNER ------------------ */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/mission_banner.jpg')" }}
      >
        <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Missions
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Missions
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-2 md:px-12  lg:px-12 text-center">
        {/* HEADER */}
        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Our{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Missions
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            “Every mission carries our commitment to service, wellness, culture,
            and community upliftment.”
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <p className="w-full pb-6 text-sm text-justify md:text-[15px] text-center text-gray-800 leading-relaxed mt-3">
          Our missions are dedicated to uplifting communities through
          sustainable development, cultural preservation, health awareness, and
          holistic well-being. Each mission is crafted with a deep sense of
          purpose, compassion, and responsibility toward creating meaningful
          social impact. We strive to empower individuals by promoting
          education, supporting environmental conservation, strengthening
          traditional values, and fostering harmony within society. Through
          various initiatives, we aim to build a future where every person has
          access to opportunities, resources, and guidance needed to live a
          dignified and fulfilling life. With unwavering commitment and
          community participation, our missions continue to inspire positive
          change, nurture unity, and contribute to the long-lasting progress of
          our nation and future generations.
        </p>

        {/* ------------------ GRID ------------------ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-4">
          {missions.map((item, i) => (
            <div
              key={i}
              className="group bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full h-32 bg-gray-50 rounded flex items-center justify-center overflow-hidden mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-contain w-[60%] group-hover:scale-102 transition"
                />
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                {item.description}
              </p>

              {/* Read More */}
              <Link
                href={item.link}
                className="flex items-center justify-center gap-2 text-[#0C55A0] hover:gap-3 transition text-sm font-medium"
              >
                Read More <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
