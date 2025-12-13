"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick";
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
    title: "Bright future, must promote in every corner of India.",
    image: Person1,
  },
  {
    name: "Dr. Ishwar V. Basavaraddi",
    title: "Excellent initiative! My best wishes for continued success.",
    image: Person2,
  },
  {
    name: "Dr. Vachaspati",
    title: "The Namo Gange Trust is doing divine service through awareness.",
    image: Person3,
  },
  {
    name: "Sandeep Marwah",
    title: "What a pleasure to be associated with such noble work!",
    image: Person4,
  },
  {
    name: "Khyati Nayak",
    title: "A great platform to spread awareness about holistic living.",
    image: Person5,
  },
  {
    name: "Dr. Preeti Chhabra",
    title: "Excellent! I would love to see this mission grow across India.",
    image: Person6,
  },
  {
    name: "Satya Sharma",
    title: "Namo Gange offers exceptional opportunities to serve humanity.",
    image: Person7,
  },
  {
    name: "Padma Shri Bharat Bhushan",
    title:
      "I had an incredible experience — a perfect blend of tradition and modernity.",
    image: Person8,
  },
  {
    name: "Wafa-El-Hedeny",
    title:
      "The Yogshala is a wonderful effort for global wellness and harmony.",
    image: Person9,
  },
  {
    name: "Dr. Sambit Patra",
    title: "Honoured to be part of this mission towards spiritual awakening.",
    image: Person10,
  },
  {
    name: "Shripad Yesso Naik",
    title: "My heartfelt greetings for this remarkable national initiative.",
    image: Person11,
  },
  {
    name: "Dr. Harsh Vardhan",
    title: "My best wishes and congratulations to the Namo Gange family.",
    image: Person12,
  },
];

const WhatPeople = () => {
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    initialSlide: 0,
    responsive: [
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
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
        {/* <p className="text-gray-600 text-sm md:text-[15px] mb-3 italic leading-relaxed">
          “Creating positive change through service, awareness, and sustainable
          community development.”
        </p> */}
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
        <Slider ref={sliderRef} {...settings}>
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
                           transition-all duration-500 p-4 flex flex-col items-center overflow-hidden
                           hover:-translate-y-2 hover:shadow-2xl hover:border-transparent 
                           hover:bg-gradient-to-br hover:from-white hover:to-[#f4f8fb]
                           before:absolute before:inset-0 before:rounded-2xl before:p-[2px]
                           before:bg-gradient-to-r 
                           before:opacity-0 hover:before:opacity-100 before:-z-10 before:transition-all before:duration-500
                           h-[290px]"
              >
                {/* Profile Image */}
                <div className="overflow-hidden rounded w-full h-36 md:h-34 mb-4 shadow-sm transition-all duration-500">
                  <Image
                    src={person.image}
                    alt={person.name}
                    className="object-fit w-full h-full rounded-md hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>

                {/* Name */}
                <h3 className="text-sm md:text-base lg:text-base font-semibold text-gray-900 mb-2 hover:text-[#1e7ed3] transition-colors duration-300 text-center">
                  {person.name}
                </h3>

                {/* Description */}
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
