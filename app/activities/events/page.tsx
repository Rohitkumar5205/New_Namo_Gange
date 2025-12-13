"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

import ourIni10 from "@/public/OurInitiatives/ourIni10.png";
import ourIni11 from "@/public/OurInitiatives/ourIni11.png";
import ourIni12 from "@/public/OurInitiatives/ourIni12.png";
import ourIni13 from "@/public/OurInitiatives/ourIni13.png";
import ourIni14 from "@/public/OurInitiatives/ourIni14.png";
import ourIni15 from "@/public/OurInitiatives/ourIni15.png";
import ourIni16 from "@/public/OurInitiatives/ourIni16.png";
import ourIni17 from "@/public/OurInitiatives/ourIni17.png";

const initiatives = [
  {
    title: "Arogya Film Festival",
    img: ourIni10,
    desc: "Celebrating health awareness through meaningful cinema and storytelling.",
    slug: "arogya-film-festival",
  },
  {
    title: "Indo Himalayan Expo",
    img: ourIni11,
    desc: "Connecting Himalayan wellness, trade, and culture under one platform.",
    slug: "indo-himalayan-expo",
  },
  {
    title: "Anna Sewa",
    img: ourIni12,
    desc: "Serving nutritious meals with love, compassion, and dignity to the needy.",
    slug: "anna-sewa",
  },
  {
    title: "NGT Farms",
    img: ourIni13,
    desc: "Promoting sustainable natural farming and eco-friendly agriculture.",
    slug: "ngt-farms",
  },
  {
    title: "Grand Master of Yoga",
    img: ourIni14,
    desc: "Honoring yogic excellence and spreading ancient wisdom globally.",
    slug: "grand-master-of-yoga",
  },
  {
    title: "Arogya Sangoshti",
    img: ourIni15,
    desc: "A platform for Ayurvedic experts to share research and healing wisdom.",
    slug: "arogya-sangoshti",
  },
  {
    title: "Rangshala",
    img: ourIni16,
    desc: "A celebration of India’s art, culture, theatre and traditional heritage.",
    slug: "rangshala",
  },
  {
    title: "Ayush Mitra",
    img: ourIni17,
    desc: "Youth volunteers promoting health awareness and holistic living.",
    slug: "ayush-mitra",
  },
];

const page = () => {
  return (
    <section className="bg-[#f6f6f9] pb-16">
      {/* ------------------ BANNER ------------------ */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/events.jpg')" }}
      >
        <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Our Events
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Events
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-2 md:px-12  lg:px-12 text-center">
        {/* HEADER */}
        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Explore Our{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Events & Initiatives
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            "Each event reflects our mission to uplift society through
            spirituality, health, culture, environmental awareness, and
            community empowerment."
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <p className="w-full pb-6 text-sm text-justify md:text-[15px] text-gray-800 leading-relaxed mt-3">
          Our events and initiatives are designed to bring people together for a
          healthier, happier, and more spiritually enriched life. Each program
          focuses on spreading awareness, encouraging mindful living, and
          empowering communities through meaningful activities. Whether it is
          health wellness drives, cultural celebrations, environmental
          conservation efforts, or spiritual gatherings, every initiative
          reflects our commitment to holistic growth and social upliftment. By
          blending ancient wisdom with modern practices, we create opportunities
          for individuals to learn, participate, and contribute to the
          well-being of society. Through these collective efforts, we aim to
          inspire lasting change and build a future rooted in compassion,
          balance, and harmony.
        </p>

        {/* ------------------ EVENT GRID ------------------ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-4">
          {initiatives.map((item, idx) => (
            <Link
              href={`/events/${item.slug}`}
              key={idx}
              className="group bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full h-32 bg-gray-50 rounded flex items-center justify-center overflow-hidden mb-4">
                <Image
                  src={item.img}
                  alt={item.title}
                  className="object-contain w-[60%] group-hover:scale-102 transition"
                />
              </div>

              {/* Title */}
              <h3 className="text-[15px] font-semibold text-gray-800 group-hover:text-[#0C55A0] transition mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {item.desc}
              </p>

              {/* Button */}
              <div className="flex items-center gap-2 text-[#0C55A0] font-medium text-sm group-hover:pl-1 transition-all">
                Read More <ArrowRight size={15} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
