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

/* ================= TYPES ================= */
interface PastEvent {
  id: number;
  title: string;
  image: string;
  fromDate: string;
  toDate: string;
  link: string;
}

/* ================= DATA ================= */
const events: PastEvent[] = [
  {
    id: 1,
    title: "India Health Expo 2026",
    image: "/event/arogya.jpg",
    fromDate: "2026-08-21",
    toDate: "2026-08-23",
    link: "/events/india-health-expo-2026",
  },
  {
    id: 2,
    title: "Yogshala Wellness Summit",
    image: "/event/arogya.jpg",
    fromDate: "2025-03-10",
    toDate: "2025-03-12",
    link: "/events/yogshala-wellness",
  },
  {
    id: 3,
    title: "Ganga Safai Abhiyan",
    image: "/event/arogya.jpg",
    fromDate: "2025-06-05",
    toDate: "2025-06-05",
    link: "/events/ganga-safai",
  },
  {
    id: 4,
    title: "Arogya Mantra Health Camp",
    image: "/event/arogya.jpg",
    fromDate: "2025-04-18",
    toDate: "2025-04-20",
    link: "/events/arogya-mantra-camp",
  },
  {
    id: 5,
    title: "Organic & Natural Expo",
    image: "/event/arogya.jpg",
    fromDate: "2025-09-12",
    toDate: "2025-09-14",
    link: "/events/organic-expo",
  },
  {
    id: 6,
    title: "International Yoga Day Celebration",
    image: "/event/arogya.jpg",
    fromDate: "2025-06-21",
    toDate: "2025-06-21",
    link: "/events/international-yoga-day",
  },
  {
    id: 7,
    title: "Ayurveda Awareness Program",
    image: "/event/arogya.jpg",
    fromDate: "2025-07-08",
    toDate: "2025-07-09",
    link: "/events/ayurveda-awareness",
  },
];

/* ================= HELPERS ================= */
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PastEvent = () => {
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
              Past Events
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Past Events
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
                Past Events
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            "Each past event stands as a milestone of our commitment to service,
            spirituality, and community upliftment—creating lasting impact
            across health, culture, and environmental awareness."
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <p className="w-full pb:2 md:pb-10 text-sm md:text-[15px] text-justify text-gray-800 leading-relaxed mt-3">
          Our past events stand as meaningful milestones in our journey of
          service and social commitment. Each initiative reflects our dedication
          to spiritual well-being, healthy living, cultural preservation,
          environmental care, and community upliftment. From wellness programs
          and cultural celebrations to environmental drives and spiritual
          gatherings, these events have brought people together to learn, serve,
          and create lasting positive impact across society.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {events.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm
              hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              <div className=" flex items-center justify-center bg-gray-50 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover hover:scale-103 transition-transform rounded-xl p-2 md:p-4"
                />
              </div>

              <div className="text-center flex flex-col flex-1">
                <h5 className="text-sm md:text-[15px] font-medium text-gray-900 mb-2">
                  {item.title}
                </h5>

                <p className="text-sm text-gray-600 mb-4">
                  {formatDate(item.fromDate)} – {formatDate(item.toDate)}
                </p>

                <Link
                  href={item.link}
                  className="mt-auto px-2 pb-2 md:px-5 md:pb-4"
                >
                  <button className="w-full py-1.5 text-sm font-medium  rounded-md bg-[#0C55A0] text-white hover:bg-[#0a4786] transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEvent;
