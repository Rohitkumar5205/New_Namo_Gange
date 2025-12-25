"use client";
import React from "react";
import Image, { StaticImageData } from "next/image"; // ✅ import StaticImageData
import Link from "next/link";
import ourIni1 from "@/public/objectives/moksha.png";
import ourIni2 from "@/public/OurInitiatives/ourIni2.png";
import ourIni3 from "@/public/OurInitiatives/ourIni3.png";
import ourIni4 from "@/public/OurInitiatives/ourIni4.png";
import ourIni5 from "@/public/OurInitiatives/ourIni5.png";
// import ourIni6 from "@/public/OurInitiatives/ourIni6.png";
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
import ourIni24 from "@/public/OurInitiatives/Yogshala_Clinic.png";
import ourIni25 from "@/public/OurInitiatives/9IHWE.png";

// ✅ Fixed Interface Type
interface Initiative {
  title: string;
  image: StaticImageData | string; // <---- FIXED HERE
  description: string;
  link: string;
}

const initiatives: Initiative[] = [
  {
    title: "Moksha Sewa",
    image: ourIni1,
    description:
      "A spiritual service initiative dedicated to supporting last rites, dignity in departure, and compassionate care for souls on their final journey.",
    link: "/initiatives/icoa",
  },
  {
    title: "Meri Beti Mera Abhiman",
    image: ourIni2,
    description:
      "An empowering social movement that celebrates girl children, promotes education, and upholds dignity, equality, and self-respect for daughters.",
    link: "/initiatives/ayush",
  },
  {
    title: "Arogya Mantra",
    image: ourIni3,
    description:
      "A national health awareness platform spreading knowledge of Ayurveda, yoga, and holistic living for a healthier and balanced lifestyle.",
    link: "/initiatives/arogya-mantra",
  },
  {
    title: "The Yogshala Expo",
    image: ourIni4,
    description:
      "An international wellness expo bringing together yoga, Ayurveda, healthcare experts, and innovators to inspire conscious living.",
    link: "/initiatives/yogshala-expo",
  },
  {
    title: "The Yogshala Jobs",
    image: ourIni5,
    description:
      "A career and employment initiative connecting skilled wellness professionals with opportunities in yoga, health, and holistic industries.",
    link: "/initiatives/yogshala2025",
  },
  {
    title: "Swachh Bharat Sankalp",
    image: ourIni7,
    description:
      "A cleanliness and sanitation drive supporting the Swachh Bharat Mission through public awareness, participation, and responsible action.",
    link: "/initiatives/swachh-bharat",
  },
  {
    title: "ICA",
    image: ourIni8,
    description:
      "Indian Contemporary Art platform promoting creativity, cultural heritage, and artistic expression through exhibitions and events.",
    link: "/initiatives/ica",
  },
  {
    title: "Acharya Ji",
    image: ourIni9,
    description:
      "A spiritual guidance initiative offering teachings, wisdom, and inner awareness to help individuals walk the path of peace and self-realization.",
    link: "/initiatives/acharya",
  },
  {
    title: "Aviral Ganga",
    image: ourIni10,
    description:
      "A sacred mission focused on preserving the uninterrupted flow and purity of River Ganga through awareness, action, and community participation.",
    link: "/initiatives/aviral-ganga",
  },
  {
    title: "Arogya Film Festival",
    image: ourIni11,
    description:
      "A unique film festival highlighting stories of health, wellness, yoga, and Ayurveda through impactful cinema and creative storytelling.",
    link: "/initiatives/film-festival",
  },
  {
    title: "Indo Himalayan Expo",
    image: ourIni12,
    description:
      "An international platform showcasing Himalayan culture, wellness, trade, tourism, and sustainable development opportunities.",
    link: "/initiatives/himalayan-expo",
  },
  {
    title: "Anna Sewa",
    image: ourIni13,
    description:
      "A humanitarian food service initiative ensuring nourishment for the needy while promoting compassion, sharing, and selfless service.",
    link: "/initiatives/anna-Sewa",
  },
  {
    title: "NGT Farms",
    image: ourIni14,
    description:
      "A sustainable agriculture initiative supporting organic farming, rural empowerment, and eco-friendly cultivation practices.",
    link: "/initiatives/farms",
  },
  {
    title: "The Grand Master of Yoga",
    image: ourIni15,
    description:
      "An सम्मान initiative recognizing global yoga masters for preserving, teaching, and spreading the ancient science of yoga.",
    link: "/initiatives/grandmaster",
  },
  {
    title: "Arogya Sangoshti",
    image: ourIni16,
    description:
      "A knowledge-sharing forum bringing together Ayurvedic scholars and experts to discuss innovations in natural healing systems.",
    link: "/initiatives/sangoshti",
  },
  {
    title: "Bachchan Ki Rangshala",
    image: ourIni17,
    description:
      "A cultural platform celebrating Indian theatre, folk arts, music, and drama to preserve and promote traditional creativity.",
    link: "/initiatives/rangshala",
  },
  {
    title: "Ayush Mitra",
    image: ourIni18,
    description:
      "A youth-driven volunteer initiative encouraging community participation in promoting wellness, yoga, and preventive healthcare.",
    link: "/initiatives/ayushmitra",
  },
  {
    title: "Vaidyashala",
    image: ourIni19,
    description:
      "An Ayurveda revival initiative supporting traditional practitioners and making natural treatments accessible and affordable.",
    link: "/initiatives/vaidyashala",
  },
  {
    title: "Global Eco-Tech Expo",
    image: ourIni20,
    description:
      "A global exhibition platform promoting eco-friendly technologies, sustainability, and innovative solutions for a greener future.",
    link: "/initiatives/ecotech",
  },
  {
    title: "Ayush Abhinandan",
    image: ourIni21,
    description:
      "An honor and recognition initiative celebrating excellence in Ayurveda, yoga, wellness, and holistic health sciences.",
    link: "/initiatives/abhinandan",
  },
  {
    title: "MP Development Expo",
    image: ourIni22,
    description:
      "A development-focused expo highlighting Madhya Pradesh’s culture, industry, investment, and wellness opportunities.",
    link: "/initiatives/mp-development",
  },
  {
    title: "Shrimad Bhagwat Katha",
    image: ourIni23,
    description:
      "Spiritual discourses sharing divine wisdom from Shrimad Bhagwat to inspire devotion, morality, and inner transformation.",
    link: "/initiatives/katha",
  },
  {
    title: "The Yogshala Clinic",
    image: ourIni24,
    description:
      "A wellness clinic integrating yoga therapy and modern fitness practices to promote balance, vitality, and holistic health.",
    link: "/initiatives/fitness",
  },
  {
    title: "9IHWE Expo",
    image: ourIni25,
    description:
      "Comprehensive wellness programs designed for communities and corporates to promote stress-free and balanced living.",
    link: "/initiatives/wellness",
  },
];

const OurInitiatives = () => {
  return (
    <section className="relative py-1.5 md:py-3 px-2 md:px-12  lg:px-12  bg-white overflow-hidden">
      <div className="w-full text-center">
        {/* ========== Section Header ========== */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Our{" "}
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            Initiatives
          </span>
        </h2>
        <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
          “Creating positive change through service, awareness, and sustainable
          community development.”
        </p>

        <div className="flex justify-center w-full mt-2">
          <div className="w-full md:max-w-8xl mx-auto  bg-white py-6 relative overflow-hidden text-cente ">
            <div className="absolute top-1 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
            <p className="text-gray-700 text-sm md:text-[15px] text-justify leading-relaxed font-normal">
              Our initiatives focus on creating meaningful change through
              service, awareness, and community support. Each program is
              designed to uplift society, protect culture, and promote
              sustainable living while encouraging unity, responsibility,
              compassion, and long-term positive transformation. We strive to
              create a harmonious connection between people and nature by
              nurturing values of{" "}
              <span className="font-semibold text-[#1e7ed3]">compassion</span>,{" "}
              <span className="font-semibold text-[#DF562C]">
                responsibility
              </span>
              , and{" "}
              <span className="font-semibold text-gray-900">
                conscious living
              </span>
              . Guided by this purpose, our initiatives empower individuals and
              communities to contribute towards a more balanced, inclusive, and
              spiritually enriched world.
            </p>
          </div>
        </div>

        {/* GRID */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {initiatives.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 
                 hover:shadow-lg hover:border-blue-500/40 transition-all duration-300 
                 p-3 flex flex-col items-center text-center"
            >
              <div
                className="w-full mb-4 flex items-center justify-center 
                      rounded-md bg-gray-50
                      overflow-hidden shadow-inner"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-contain h-16 md:h-32 md:w-32 w-auto transition-transform duration-300
                     group-hover:scale-105"
                />
              </div>

              <h3 className="text-gray-800 font-semibold text-sm md:text-[15px] mb-2 line-clamp-1">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.description}
              </p>

              <Link href={item.link} className="w-full mt-auto">
                <button
                  className="w-full px-3 py-1.5 text-sm font-medium rounded
                     bg-[#0C55A0] text-white shadow-sm 
                     hover:bg-[#0a4786] active:scale-95 transition-all"
                >
                  Read More...
                </button>
              </Link>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {initiatives.map((item, i) => (
            <div
              key={i}
              className="
        group relative bg-white rounded-2xl border border-gray-200
        shadow-sm hover:shadow-xl transition-all duration-300
        flex flex-col overflow-hidden
      "
            >
              {/* IMAGE */}
              <div className="w-full h-28 md:h-36 flex items-center justify-center bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="
            object-contain h-16 md:h-34 md:w-34 w-auto
            transition-transform duration-300
            group-hover:scale-110
          "
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-1 py-3 px-2 text-center">
                <h3 className="text-gray-900 font-semibold text-sm md:text-[15px] mb-1 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-xs md:text-[13px] leading-relaxed line-clamp-3 mb-4">
                  {item.description}
                </p>

                {/* CTA */}
                <Link href={item.link} className="mt-auto">
                  <div
                    className="
              w-full text-center py-1.5 rounded-lg
              text-sm font-medium text-[#0C55A0]
              border border-[#0C55A0]/30
              hover:bg-[#0C55A0] hover:text-white
              transition-all duration-300
            "
                  >
                    Explore →
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurInitiatives;
