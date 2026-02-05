"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosClient from "@/lib/axiosClient";

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
interface Testimonial {
  _id: string;
  name: string;
  image: string;
  desc: string;
  link: string;
}

const WhatPeople = () => {
  const sliderRef = useRef<any>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const people = testimonials;
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axiosClient.get("/testimonials");
        if (res.data && Array.isArray(res.data.data)) {
          const parser = new DOMParser();
          const fetchedData = res.data.data
            .filter((item: any) => item.status === "Active")
            .map((item: any) => {
              let description = item.desc || "";
              const decoded = parser.parseFromString(description, "text/html");
              description = decoded.body.textContent || "";
              return {
                name: item.name,
                image: item.image,
                desc: description.replace(/<[^>]+>/g, ""),
              };
            });
          setTestimonials(fetchedData);
          console.log(fetchedData, "🔥 Testimonials Data");
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    arrows: true,

    slidesToShow: 5,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024, // tablet & below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full relative py-2 md:py-6  overflow-hidden">
      <div className="w-full px-2 md:px-12  lg:px-12 text-center">
        {/* ===== Section Header ===== */}
        <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text  text-transparent">
            Testimonials
          </span>
        </h2>
        <p className="text-[13px] md:text-[15px] text-medium text-gray-800 italic py-1">
          “Creating positive change through service, awareness, and sustainable
          community development.”
        </p>
        <div className="flex justify-center w-full mb-6">
          <div className=" w-full bg-white py-4 relative overflow-hidden text-center ">
            {/* Decorative Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

            <p className="text-gray-700 text-xs md:text-[15px] leading-relaxed font-normal">
              Our initiatives focus on creating meaningful change through{" "}
              <span className="font-medium text-[#DF562C]">service</span>,{" "}
              <span className="font-medium text-[#1e7ed3]">awareness</span>, and{" "}
              <span className="font-medium text-gray-900">
                community support
              </span>
              . Each program is thoughtfully designed to uplift society, protect
              culture, and promote sustainable living for future generations. We
              strive to create a harmonious connection between people and nature
              by nurturing values of{" "}
              <span className="font-medium text-[#1e7ed3]">compassion</span>,{" "}
              <span className="font-medium text-[#DF562C]">responsibility</span>
              , and{" "}
              <span className="font-medium text-gray-900">
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
        <Slider ref={sliderRef}  {...sliderSettings}>
          {people.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="px-2"
            >
              <div
                className="
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-md
          p-4
          flex flex-col items-center
          transition-all duration-500
        "
              >
                {/* IMAGE */}
                <div className="relative w-full h-56 rounded-md overflow-hidden">
                  <Image
                    src={
                      person.image?.startsWith("http")
                        ? person.image
                        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${person.image}`
                    }
                    alt={person.name}
                    fill
                    className="object-fit md:object-cover"
                  />
                </div>

                {/* NAME */}
                <h3 className="mt-2 text-sm font-medium text-gray-900 text-center">
                  {person.name}
                </h3>

                {/* DESC */}
                <p className="text-xs text-gray-600 text-center line-clamp-3">
                  {person.desc}
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
