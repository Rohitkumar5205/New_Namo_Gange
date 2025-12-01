"use client";
import React from "react";
import Image, { StaticImageData } from "next/image"; // ✅ import StaticImageData
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
import ourIni10 from "@/public/OurInitiatives/ourIni10.png";
import ourIni11 from "@/public/OurInitiatives/ourIni11.png";
import ourIni12 from "@/public/OurInitiatives/ourIni12.png";
import ourIni13 from "@/public/OurInitiatives/ourIni13.png";
import ourIni14 from "@/public/OurInitiatives/ourIni14.png";
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
  {
    title: "Acharya Ji",
    image: ourIni8,
    description:
      "Acharya Ji Online is a trusted spiritual platform guiding individuals toward self-awareness and peace.",
    link: "/initiatives/acharya",
  },
  {
    title: "Aviral Ganga",
    image: ourIni9,
    description:
      "Dedicated to restoring and preserving the sacred Ganga through social campaigns and awareness.",
    link: "/initiatives/aviral-ganga",
  },
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

const OurInitiatives = () => {
  return (
    <section className="relative py-4 md:py-6 bg-white overflow-hidden">
      <div className="w-full px-6 lg:px-10 text-center">
        {/* ========== Section Header ========== */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            Initiatives
          </span>
        </h2>
        <p className="w-full md:w-2/3 pb-6 mx-auto text-sm md:text-[15px] text-center text-gray-800 leading-relaxed">
          Our initiatives focus on creating meaningful change through service,
          awareness, and community support. Each program is designed to uplift
          society, protect culture, and promote sustainable living.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
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

export default OurInitiatives;
