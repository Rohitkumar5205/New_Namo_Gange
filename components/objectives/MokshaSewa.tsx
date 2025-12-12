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
    title: "Anna Sewa",
    image: ourIni12,
    description:
      "A noble initiative providing food to the needy, promoting the value of selfless service and compassion.",
    link: "/initiatives/anna-sewa",
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

const MokshaSewa = () => {
  return (
    <section className="bg-gray-50">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/objectives/moksha1.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/10 w-full h-full py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Moksha <span className="">Sewa</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Moksha Sewa
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-2 md:px-6 lg:px-6 text-center">
        {/* HEADER */}

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Moksha{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Sewa
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            “Moksha Sewa embodies the spirit of selfless service, guiding
            individuals toward inner peace, spiritual growth, and compassionate
            living.”
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <p className="w-full pb-6 text-sm text-justify md:text-[15px] text-center text-gray-800 leading-relaxed mt-3">
          Moksha Sewa is devoted to serving humanity through compassion,
          spiritual guidance, and selfless support. Rooted deeply in the
          timeless principles of Sanatana Dharma, it encourages individuals to
          walk the path of purity, peace, and inner awakening. Through sacred
          rituals, charitable actions, and nurturing moral values, Moksha Sewa
          helps people connect with their higher consciousness and move closer
          to the ultimate goal of liberation. Our mission is to transform lives
          by promoting kindness, discipline, and spiritual awareness in everyday
          living. Whether it is helping the needy, supporting spiritual
          practices, uplifting distressed families, or spreading divine wisdom,
          every act of Moksha Sewa becomes a step toward inner freedom. By
          inspiring selfless service and a deeper understanding of the soul, we
          aim to create a society that lives in harmony, compassion, and divine
          unity.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-4">
          {initiatives.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 
                 hover:shadow-lg hover:border-blue-500/40 transition-all duration-300 
                 p-5 flex flex-col items-center text-center"
            >
              {/* Image Section */}
              <div
                className="w-full h-28 mb-4 flex items-center justify-center 
                      rounded-md bg-gray-50
                      overflow-hidden shadow-inner"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-contain max-h-24 w-auto transition-transform duration-300
                     group-hover:scale-105"
                />
              </div>

              {/* Description */}
              <h3 className="text-gray-800 font-semibold text-sm mb-2 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-4">
                {item.description}
              </p>

              {/* Button */}
              <Link href={item.link} className="w-full mt-auto">
                <button
                  className="w-full px-3 py-1.5 text-sm font-medium rounded
                     bg-[#0C55A0] text-white shadow-sm 
                     hover:bg-[#0a4786] active:scale-95 transition-all"
                >
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

export default MokshaSewa;
