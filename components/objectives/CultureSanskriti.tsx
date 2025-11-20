"use client";
import React from "react";
import Image, { StaticImageData } from "next/image"; // ✅ import StaticImageData
import Link from "next/link";
import ourIni15 from "@/public/OurInitiatives/ourIni15.png";
import ourIni16 from "@/public/OurInitiatives/ourIni16.png";
import ourIni17 from "@/public/OurInitiatives/ourIni17.png";
import ourIni18 from "@/public/OurInitiatives/ourIni18.png";
import ourIni19 from "@/public/OurInitiatives/ourIni19.png";
import ourIni20 from "@/public/OurInitiatives/ourIni20.png";
import ourIni21 from "@/public/OurInitiatives/ourIni21.png";
import ourIni22 from "@/public/OurInitiatives/ourIni22.png";
import ourIni23 from "@/public/OurInitiatives/ourIni23.png";
import ourIni24 from "@/public/OurInitiatives/ourIni24.png";

// ✅ Fixed Interface Type
interface Initiative {
  title: string;
  image: StaticImageData | string; // <---- FIXED HERE
  description: string;
  link: string;
}

const initiatives: Initiative[] = [

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
  {
    title: "Vaidyashala",
    image: ourIni18,
    description:
      "An initiative to revive ancient Ayurveda practices and support affordable herbal treatments.",
    link: "/initiatives/vaidyashala",
  },
  {
    title: "Global Eco-Tech Expo",
    image: ourIni19,
    description:
      "A sustainable technology platform promoting eco-friendly solutions for future innovation.",
    link: "/initiatives/ecotech",
  },
  {
    title: "Ayush Abhinandan",
    image: ourIni20,
    description:
      "Honoring excellence in the field of Ayurveda, Yoga, and holistic healing science.",
    link: "/initiatives/abhinandan",
  },
  {
    title: "MP Development Expo",
    image: ourIni21,
    description:
      "Promoting Madhya Pradesh’s culture, industry, and wellness opportunities through exhibitions.",
    link: "/initiatives/mp-development",
  },
  {
    title: "Shrimad Bhagwat Katha",
    image: ourIni22,
    description:
      "Spiritual discourses spreading wisdom from the Bhagwat Gita to inspire peace and devotion.",
    link: "/initiatives/katha",
  },
  {
    title: "Fitness Through Yoga",
    image: ourIni23,
    description:
      "Encouraging modern fitness through the timeless science of yoga for balance and vitality.",
    link: "/initiatives/fitness",
  },
  {
    title: "NGT Wellness Program",
    image: ourIni24,
    description:
      "Corporate and community wellness programs promoting stress-free, balanced living.",
    link: "/initiatives/wellness",
  },
];

const CultureSanskriti = () => {
  return (
    <section className="py-4 bg-gray-50">
      <div className="w-full px-6 lg:px-10 text-center">
        {/* HEADER */}
        <h2 className="text-lg md:text-xl font-semibold bg-white rounded text-gray-900 mb-6 py-4 px-6 shadow-sm">
          <span>
            Culture{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              Sanskriti
            </span>
          </span>

          <span className="block text-sm md:text-base text-gray-600 mt-1">
            <Link href="/" className="text-[#DF562C] hover:underline">
              Home
            </Link>{" "}
            - Culture Sanskriti
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

export default CultureSanskriti;
