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
    <section className="bg-gray-50">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/objectives/culture1.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Culture <span className="">Sanskriti</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Culture Sanskriti
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-2 md:px-6 lg:px-6 text-center">
        {/* HEADER */}

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Culture{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Sanskriti
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            “Preserving our roots, celebrating our heritage, and nurturing
            cultural harmony.”
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <p className="w-full pb-6 text-sm text-justify md:text-[15px] text-center text-gray-800 leading-relaxed mt-3">
          Culture Sanskriti celebrates the profound heritage, timeless values,
          and vibrant traditions that have shaped our civilization for
          centuries. It seeks to preserve ancient wisdom, revive traditional
          practices, and promote cultural awareness among all generations.
          Through festivals, arts, literature, rituals, and spiritual teachings,
          we strengthen the bond between individuals and their cultural
          identity. By encouraging participation in cultural programs,
          preserving folk arts, supporting artisans, and sharing stories of our
          rich past, we help nurture a deep sense of pride and belonging. Our
          mission is to ensure that these priceless traditions continue to
          thrive, inspire, and guide humanity, creating a bridge between the
          wisdom of yesterday and the aspirations of tomorrow.
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

export default CultureSanskriti;
