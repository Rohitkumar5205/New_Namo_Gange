"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HealthIcon from "@/public/objectives/health.png";
import NatureIcon from "@/public/objectives/nature.png";
import CultureIcon from "@/public/objectives/culture.png";
import WomenIcon from "@/public/objectives/women.png";

const objectives = [
  {
    title: "Health & Wellness",
    image: HealthIcon,
    description:
      "We spread awareness of holistic health and well-being through Yoga, Ayurveda, and wellness programs like Arogya Sangoshti and film festivals.",
    link: "/objectives/health",
  },
  {
    title: "Nature & Environment",
    image: NatureIcon,
    description:
      "We work passionately to protect and preserve nature — focusing on a clean, green, and sustainable future while restoring the purity of the holy Ganga.",
    link: "/objectives/nature",
  },
  {
    title: "Kala & Sanskriti",
    image: CultureIcon,
    description:
      "We promote India’s rich art and culture through live events, painting, dance, and photography competitions to connect the youth with traditions.",
    link: "/objectives/culture",
  },
  {
    title: "Women Empowerment",
    image: WomenIcon,
    description:
      "We support women’s education, equality, and empowerment — fostering confidence, leadership, and independence in every woman.",
    link: "/objectives/women",
  },
  {
    title: "Moksha Sewa",
    image: WomenIcon,
    description:
      "Moksha Sewa is devoted to serving humanity through spiritual upliftment, compassion, and selfless service — guiding individuals toward inner peace, purity.",
    link: "/objectives/women",
  },
];

const ObjectiveOfTrust = () => {
  return (
    <section className="relative py-4 md:py-8 lg:py-8 bg-gradient-to-b from-white via-gray-50 to-[#f8fafc] overflow-hidden">
      <div className="w-full mx-auto px-2 md:px-12 lg:px-12 text-center">
        {/* Section Header */}
        <h2 className="text-[1rem] md:text-xl lg:text-xl font-semibold text-gray-900 mb-3">
          Objective of{" "}
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            Trust
          </span>
        </h2>

        {/* ✨ Tagline under the header */}
        <p className="text-sm md:text-[15px] text-medium mb-2 text-gray-800 italic">
          “Serving Humanity, Preserving Nature, Awakening Divinity.”
        </p>

        <div className="flex justify-center w-full ">
          <div className=" w-full   mx-auto bg-white py-6  relative   overflow-hidden text-justify">
            <div className="absolute top-1 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

            {/* Gradient Top Highlight Line */}
            <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-normal">
              The goal of our Trust is to build a strong, meaningful, and
              lasting connection with our community through{" "}
              <span className="font-semibold text-[#DF562C]">openness</span>,{" "}
              <span className="font-semibold text-[#1e7ed3]">safety</span>, and{" "}
              <span className="font-semibold text-gray-900">reliability</span>.
              We strive to create an environment where every individual feels
              valued, respected, empowered, and confident that their well-being
              and interests remain our highest priority. With every initiative
              we undertake, we stay dedicated to upholding your{" "}
              <span className="font-semibold text-[#DF562C]">trust</span> and
              strengthening the bond that unites us as a community.
            </p>
          </div>
        </div>

        {/* Objective Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1 px-4">
          {objectives.map((item, i) => (
            <div
              key={i}
              className="bg-white  rounded-xl border border-gray-200  shadow-sm  hover:shadow-xl transition-all p-3 flex flex-col items-center text-center "
            >
              {/* Icon */}
              <div className=" w-24 h-24  md:w-28 md:h-28 flex items-center justify-center  rounded-full bg-gray-50   border border-gray-200 shadow-inner  mb-4 ">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 text-justify line-clamp-4">
                {item.description}
              </p>

              {/* Read More Button */}
              <Link href={item.link}>
                <button className=" px-5 py-1.5 text-sm font-medium text-white rounded bg-[#0C55A0] hover:bg-[#08467c] transition shadow-sm ">
                  Read More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectiveOfTrust;
