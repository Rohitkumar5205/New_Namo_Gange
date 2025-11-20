"use client";
import React from "react";
import Image, { StaticImageData } from "next/image"; // ✅ import StaticImageData
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ourIni10 from "@/public/OurInitiatives/ourIni10.png";
import ourIni11 from "@/public/OurInitiatives/ourIni11.png";
import ourIni12 from "@/public/OurInitiatives/ourIni12.png";
import ourIni13 from "@/public/OurInitiatives/ourIni13.png";
import ourIni14 from "@/public/OurInitiatives/ourIni14.png";
import ourIni15 from "@/public/OurInitiatives/ourIni15.png";
import ourIni16 from "@/public/OurInitiatives/ourIni16.png";
import ourIni17 from "@/public/OurInitiatives/ourIni17.png";

// ✅ Fixed Interface Type
interface Initiative {
  title: string;
  image: StaticImageData | string; // <---- FIXED HERE
  description: string;
  link: string;
}

const initiatives: Initiative[] = [
  {
    title: "Arogya Film Festival",
    image: ourIni10,
    description:
      "Celebrating health and wellness through meaningful cinema and short films focused on Ayurveda and yoga.",
    link: "/initiatives/film-festival",
  },
  {
    title: "Indo Himalayan Expo",
    image: ourIni11,
    description:
      "An event connecting the Himalayan states with the world through trade, culture, and wellness.",
    link: "/initiatives/himalayan-expo",
  },
  {
    title: "Anna Seva",
    image: ourIni12,
    description:
      "A noble initiative providing food to the needy, promoting the value of selfless service and compassion.",
    link: "/initiatives/anna-seva",
  },
  {
    title: "NGT Farms",
    image: ourIni13,
    description:
      "Empowering organic farming through education, sustainability, and rural development initiatives.",
    link: "/initiatives/farms",
  },
  {
    title: "Grand Master of Yoga",
    image: ourIni14,
    description:
      "Recognizing yoga masters worldwide for spreading the ancient Indian practice for better living.",
    link: "/initiatives/grandmaster",
  },
  {
    title: "Arogya Sangoshti",
    image: ourIni15,
    description:
      "A platform for dialogue among Ayurvedic experts to share knowledge and innovations in natural healing.",
    link: "/initiatives/sangoshti",
  },
  {
    title: "Rangshala",
    image: ourIni16,
    description:
      "Celebrating Indian art, drama, and folk culture through live performances and creative events.",
    link: "/initiatives/rangshala",
  },
  {
    title: "Ayush Mitra",
    image: ourIni17,
    description:
      "A volunteer program that empowers youth to promote wellness and holistic health in local communities.",
    link: "/initiatives/ayushmitra",
  },
];

const NatureEnvironment = () => {
  return (
    <section className="py-4 bg-gray-50">
      <div className="w-full px-6 lg:px-10 text-center">
        {/* HEADER */}
        <h2 className="text-lg md:text-xl font-semibold bg-white rounded text-gray-900 mb-6 py-4 px-6 shadow-sm">
          <span>
            Nature{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              Environment
            </span>
          </span>

          <span className="block text-sm md:text-base text-gray-600 mt-1">
            <Link href="/" className="text-[#DF562C] hover:underline">
              Home
            </Link>{" "}
            - Nature Environment
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

export default NatureEnvironment;
