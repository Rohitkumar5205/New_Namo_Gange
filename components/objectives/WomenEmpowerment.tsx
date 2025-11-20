"use client";
import React from "react";
import Image, { StaticImageData } from "next/image"; // ✅ import StaticImageData
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ourIni1 from "@/public/OurInitiatives/ourIni1.png";
import ourIni2 from "@/public/OurInitiatives/ourIni2.png";
import ourIni3 from "@/public/OurInitiatives/ourIni3.png";
import ourIni4 from "@/public/OurInitiatives/ourIni4.png";
import ourIni5 from "@/public/OurInitiatives/ourIni5.png";
import ourIni6 from "@/public/OurInitiatives/ourIni6.png";
import ourIni7 from "@/public/OurInitiatives/ourIni7.png";

// ✅ Fixed Interface Type
interface Initiative {
  title: string;
  image: StaticImageData | string; // <---- FIXED HERE
  description: string;
  link: string;
}

const initiatives: Initiative[] = [
  {
    title: "ICOA",
    image: ourIni1,
    description:
      "International Council of AYUSH (ICOA) promotes holistic wellness and traditional health systems worldwide.",
    link: "/initiatives/icoa",
  },
  {
    title: "Ministry of AYUSH",
    image: ourIni2,
    description:
      "We work with the Ministry of AYUSH to support the integration of Ayurveda, Yoga, and natural medicine.",
    link: "/initiatives/ayush",
  },
  {
    title: "Arogya Mantra",
    image: ourIni3,
    description:
      "Arogya Mantra is India’s leading holistic health awareness platform promoting Ayurveda and wellness.",
    link: "/initiatives/arogya-mantra",
  },
  {
    title: "Yogshala Expo 2024",
    image: ourIni4,
    description:
      "An international wellness expo uniting yoga, Ayurveda, and health experts to inspire healthy living.",
    link: "/initiatives/yogshala-expo",
  },
  {
    title: "Yogshala Expo 2025",
    image: ourIni5,
    description:
      "8th edition of the International Health & Wellness Expo – promoting holistic wellbeing globally.",
    link: "/initiatives/yogshala2025",
  },
  {
    title: "Swachh Bharat Sankalp",
    image: ourIni6,
    description:
      "Our contribution to the national Swachh Bharat Mission, spreading cleanliness awareness across India.",
    link: "/initiatives/swachh-bharat",
  },
  {
    title: "ICA",
    image: ourIni7,
    description:
      "Indian Contemporary Art (ICA) celebrates cultural heritage and creativity through art and exhibitions.",
    link: "/initiatives/ica",
  },
];

const WomenEmpowerment = () => {
  return (
    <section className="py-4 bg-gray-50">
      <div className="w-full px-6 lg:px-10 text-center">
        {/* HEADER */}
        <h2 className="text-lg md:text-xl font-semibold bg-white rounded text-gray-900 mb-6 py-4 px-6 shadow-sm">
          <span>
            Women{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              Empowerment
            </span>
          </span>

          <span className="block text-sm md:text-base text-gray-600 mt-1">
            <Link href="/" className="text-[#DF562C] hover:underline">
              Home
            </Link>{" "}
            - Women Empowerment
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
                <button className="w-full px-3 py-1.5 text-sm bg-[#0C55A0] text-white rounded hover:bg-sky-600 transition">
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

export default WomenEmpowerment;
