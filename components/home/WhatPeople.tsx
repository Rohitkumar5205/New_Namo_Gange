"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosClient from "@/lib/axiosClient";

interface Testimonial {
  _id: string;
  name: string;
  image: string;
  desc: string;
  image_alt?: string;
  status?: string;
}

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-20
    bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow transition"
  >
    <ChevronLeft size={18} />
  </button>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axiosClient.get("/testimonials");

        const data: Testimonial[] = res?.data?.data || [];

        const activeItems = data
          .filter((item) => item.status === "Active")
          .sort(
            (a: any, b: any) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          );

        setTestimonials(activeItems);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const stripHtmlTags = (html: string = ""): string => {
    if (typeof window === "undefined") return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const sliderSettings = {
    dots: false,
    infinite: testimonials.length > 5,
    speed: 600,
    autoplay: testimonials.length > 1,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    arrows: testimonials.length > 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: testimonials.length > 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          infinite: testimonials.length > 1,
        },
      },
    ],
  };

  return (
    <section className="w-full relative py-2 md:py-6 overflow-hidden">
      <div className="w-full px-2 md:px-12 lg:px-12 text-center">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>

          <p className="text-[13px] md:text-[15px] text-medium text-gray-800 italic py-1">
            “Creating positive change through service, awareness, and
            sustainable community development.”
          </p>
        </motion.div>

        {/* TOP CONTENT BLOCK SAME AS BEFORE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center w-full mb-6"
        >
          <div className="w-full bg-white py-4 relative overflow-hidden text-center rounded-lg shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
            <p className="text-gray-700 text-xs md:text-[15px] leading-relaxed font-normal px-4">
              Our initiatives focus on creating meaningful change through{" "}
              <span className="font-medium text-[#DF562C]">service</span>,{" "}
              <span className="font-medium text-[#1e7ed3]">awareness</span>, and{" "}
              <span className="font-medium text-gray-900">
                community support
              </span>
              .
            </p>
          </div>
        </motion.div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border shadow-md p-4 animate-pulse"
              >
                <div className="w-full h-56 bg-gray-200 rounded-md mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto" />
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <p className="text-gray-500 text-sm">No testimonials available.</p>
        ) : (
          <Slider ref={sliderRef} {...sliderSettings}>
            {testimonials.map((person) => (
              <div key={person._id} className="px-2 py-4 h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-56 overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    {person.image && (
                      <Image
                        src={
                          person.image.startsWith("http")
                            ? person.image
                            : `${
                                process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""
                              }${person.image}`
                        }
                        alt={person.image_alt || person.name}
                        fill
                        className="object-contain p-1 transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex-1 flex flex-col relative text-center">
                    <h1 className="text-sm md:text-base font-bold text-gray-900 mb-2">
                      {person.name}
                    </h1>
                    <div className="absolute top-3 right-4 text-gray-100 group-hover:text-orange-50 transition-colors duration-300 -z-0">
                      <Quote size={40} fill="currentColor" />
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 text-center line-clamp-3 leading-relaxed relative z-10">
                      {stripHtmlTags(person.desc)}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default WhatPeople;
