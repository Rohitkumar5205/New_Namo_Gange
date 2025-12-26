"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ==== Import Images ====
import Person1 from "@/public/people/people1.jpg";
import Person2 from "@/public/people/people2.jpg";
import Person3 from "@/public/people/people3.jpg";
import Person4 from "@/public/people/people4.jpg";
import Person5 from "@/public/people/people5.jpg";
import Person6 from "@/public/people/people6.jpg";
import Person7 from "@/public/people/people7.jpg";
import Person8 from "@/public/people/people8.jpg";
import Person9 from "@/public/people/people9.jpg";
import Person10 from "@/public/people/people10.jpg";
import Person11 from "@/public/people/people11.jpg";
import Person12 from "@/public/people/people12.jpg";

const people = [
  {
    name: "Dr. Jaideep Arya",
    title:
      "This visionary initiative holds a bright future and deserves to be promoted and embraced in every corner of India.",
    image: Person1,
  },
  {
    name: "Dr. Ishwar V. Basavaraddi",
    title:
      "An excellent and inspiring initiative. My sincere best wishes for its continued growth, success, and positive impact.",
    image: Person2,
  },
  {
    name: "Dr. Vachaspati",
    title:
      "The Namo Gange Trust is performing truly divine service by spreading awareness rooted in spirituality, culture, and values.",
    image: Person3,
  },
  {
    name: "Sandeep Marwah",
    title:
      "It is a pleasure and an honour to be associated with such noble work that contributes meaningfully to society.",
    image: Person4,
  },
  {
    name: "Khyati Nayak",
    title:
      "A remarkable platform dedicated to spreading awareness about holistic living, wellness, and conscious lifestyles.",
    image: Person5,
  },
  {
    name: "Dr. Preeti Chhabra",
    title:
      "Excellent initiative! I truly look forward to seeing this meaningful mission expand and touch lives across India.",
    image: Person6,
  },
  {
    name: "Satya Sharma",
    title:
      "Namo Gange offers exceptional opportunities for individuals to serve humanity with compassion and purpose.",
    image: Person7,
  },
  {
    name: "Padma Shri Bharat Bhushan",
    title:
      "I had an incredible and enriching experience that beautifully blended timeless traditions with modern perspectives.",
    image: Person8,
  },
  {
    name: "Wafa-El-Hedeny",
    title:
      "The Yogshala is a wonderful global initiative promoting wellness, harmony, and a balanced way of life.",
    image: Person9,
  },
  {
    name: "Dr. Sambit Patra",
    title:
      "I am honoured to be part of this inspiring mission dedicated to spiritual awareness and national upliftment.",
    image: Person10,
  },
  {
    name: "Shripad Yesso Naik",
    title:
      "My heartfelt greetings and best wishes for this remarkable national initiative with a powerful social vision.",
    image: Person11,
  },
  {
    name: "Dr. Harsh Vardhan",
    title:
      "My sincere congratulations and best wishes to the entire Namo Gange family for their commendable efforts.",
    image: Person12,
  },
];
const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-20
    bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow transition"
  >
    <ChevronLeft size={18} />
  </button>
);

const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-20
    bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow transition"
  >
    <ChevronRight size={18} />
  </button>
);

const WhatPeople = () => {
  const sliderRef = useRef<any>(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="w-full relative py-4 md:py-6  overflow-hidden">
      <div className="w-full px-2 md:px-12  lg:px-12 text-center">
        {/* ===== Section Header ===== */}
        <h2 className="text-lg md:text-xl lg:text-xl font-semibold mb-2 text-gray-900">
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text  text-transparent">
            Testimonials
          </span>
        </h2>
        <p className="text-gray-600 text-sm md:text-[15px] mb-3 italic leading-relaxed">
          “Creating positive change through service, awareness, and sustainable
          community development.”
        </p>
        <div className="flex justify-center w-full mb-6">
          <div className=" w-full bg-white py-4 relative overflow-hidden text-center ">
            {/* Decorative Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

            <p className="text-gray-700 text-sm md:text-[15px] text-justify leading-relaxed font-normal mb-3">
              Our initiatives focus on creating meaningful change through{" "}
              <span className="font-semibold text-[#DF562C]">service</span>,{" "}
              <span className="font-semibold text-[#1e7ed3]">awareness</span>,
              and{" "}
              <span className="font-semibold text-gray-900">
                community support
              </span>
              . Each program is thoughtfully designed to uplift society, protect
              culture, and promote sustainable living for future generations. We
              strive to create a harmonious connection between people and nature
              by nurturing values of{" "}
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
            {/* ⭐ NEW PARAGRAPH — ADDED FOR MORE DEPTH */}
            <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-normal"></p>
          </div>
        </div>

        {/* ===== Slider ===== */}
        <Slider ref={sliderRef} {...sliderSettings}>
          {people.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="px-2"
            >
              <div
                className="relative bg-white rounded-2xl border border-gray-100 shadow-md 
                p-4 flex flex-col items-center overflow-hidden
                hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
              >
                {/* ✅ FIXED IMAGE */}
                <div className="relative w-full h-56 mb-4 overflow-hidden rounded-md">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 text-center">
                  {person.name}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed text-center line-clamp-3">
                  {person.title}
                </p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default WhatPeople;
