"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ourIni1 from "@/public/OurInitiatives/ourIni1.png";
import ourIni2 from "@/public/OurInitiatives/ourIni2.png";
import ourIni3 from "@/public/OurInitiatives/ourIni3.png";
import ourIni4 from "@/public/OurInitiatives/ourIni4.png";
import ourIni5 from "@/public/OurInitiatives/ourIni5.png";
import ourIni6 from "@/public/OurInitiatives/ourIni6.png";
import ourIni7 from "@/public/OurInitiatives/ourIni7.png";
import ourIni8 from "@/public/OurInitiatives/ourIni8.png";
import ourIni9 from "@/public/OurInitiatives/ourIni9.png";

interface Initiative {
  title: string;
  image: StaticImageData | string;
  description: string;
  link: string;
}

const initiatives: Initiative[] = [
  {
    title: "ICOA",
    image: ourIni1,
    description: "International Council of AYUSH...",
    link: "/initiatives/icoa",
  },
  {
    title: "Ministry of AYUSH",
    image: ourIni2,
    description: "Supporting Ayurveda & natural medicine...",
    link: "/initiatives/ayush",
  },
  {
    title: "Arogya Mantra",
    image: ourIni3,
    description: "India’s holistic health awareness platform.",
    link: "/initiatives/arogya-mantra",
  },
  {
    title: "Yogshala Expo 2024",
    image: ourIni4,
    description: "International wellness expo for healthy living.",
    link: "/initiatives/yogshala-expo",
  },
  {
    title: "Yogshala Expo 2025",
    image: ourIni5,
    description: "8th edition of International Health Expo.",
    link: "/initiatives/yogshala2025",
  },
  {
    title: "Swachh Bharat Sankalp",
    image: ourIni6,
    description: "Cleanliness awareness across India.",
    link: "/initiatives/swachh-bharat",
  },
  {
    title: "ICA",
    image: ourIni7,
    description: "Art & cultural heritage exhibitions.",
    link: "/initiatives/ica",
  },
  {
    title: "Acharya Ji",
    image: ourIni8,
    description: "Spiritual guidance towards peace.",
    link: "/initiatives/acharya",
  },
  {
    title: "Aviral Ganga",
    image: ourIni9,
    description: "Restoring & preserving our sacred Ganga.",
    link: "/initiatives/aviral-ganga",
  },
];

const HealthWellness = () => {
  return (
    <section className=" bg-gray-50">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ourActivities/ourActivities5.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="bg-black/60 w-full h-full py-10 md:py-16">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white">
              Health <span className="">Wellness</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Health Wellness
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mb-8 text-center">
        {/* HEADER */}
        <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 py-8 px-6 ">
          <span>
            Health{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              Wellness
            </span>
          </span>
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {initiatives.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded shadow-md border border-gray-100 hover:border-[#0C55A0]/40 transition p-4 flex flex-col items-center text-center"
            >
              {/* Image */}
              <div className="w-full h-28 mb-4 flex items-center justify-center bg-gradient-to-tr from-[#DF562C]/10 to-[#0C55A0]/10 shadow-inner overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-contain w-auto h-auto"
                />
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                {item.description}
              </p>

              {/* Button */}
              <Link href={item.link} className="w-full">
                <button className="w-full px-3 py-1.5 text-sm bg-[#0C55A0] text-white  hover:bg-sky-600 transition">
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

export default HealthWellness;
