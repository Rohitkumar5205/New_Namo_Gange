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

  const sliderSettings = {
    dots: false,
    infinite: testimonials.length > 5,
    speed: 1000,
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      duration: 0.6,
                    },
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1,
                    boxShadow: "0 30px 40px -20px rgba(0,0,0,0.3)",
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  viewport={{ once: true, margin: "-30px" }}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col relative"
                >
                  {/* Premium Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                  {/* Image Section with Modern Effects */}
                  <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    {/* Image Loading Skeleton */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />

                    {person.image && (
                      <>
                        <Image
                          src={
                            person.image.startsWith("http")
                              ? person.image
                              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${person.image}`
                          }
                          alt={person.image_alt || person.name}
                          fill
                          className="object-contain p-2 transition-all duration-700 group-hover:scale-103  z-10"
                        />

                        {/* Image Overlay Effect on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                      </>
                    )}

                    {/* Decorative Corner Accent */}
                    <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-br from-orange-400 to-blue-400 transform rotate-12 translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-20 transition-all duration-700 group-hover:translate-x-6 group-hover:-translate-y-6" />
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex-1 flex flex-col relative bg-white/90 backdrop-blur-sm">
                    {/* Modern Quote Icon with Animation */}
                    <motion.div
                      className="absolute top-4 right-4 text-gray-200 group-hover:text-orange-200 transition-colors duration-300"
                      animate={{
                        rotate: [0, 3, -3, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    >
                      <Quote size={20} fill="currentColor" />
                    </motion.div>

                    {/* Name with Modern Typography */}
                    <motion.h2
                      className="text-sm md:text-base font-medium text-gray-800 mb-2 relative inline-block"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="relative z-10">{person.name}</span>
                      {/* <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      /> */}
                    </motion.h2>

                    {/* Description with Enhanced Typography */}
                    <div className="relative z-10 flex-1">
                      <div
                        className="text-xs md:text-sm text-gray-600 text-justify line-clamp-4 leading-relaxed
          [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:text-gray-800 [&_h1]:border-l-4 [&_h1]:border-orange-400 [&_h1]:pl-3
          [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:text-gray-700 [&_h2]:border-l-4 [&_h2]:border-blue-400 [&_h2]:pl-3
          [&_p]:mb-2 [&_p]:leading-relaxed [&_p]:text-gray-600 
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:space-y-1.5
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_ol]:space-y-1.5
          [&_li]:text-gray-600 [&_li]:hover:text-gray-900 [&_li]:transition-colors
          [&_strong]:font-semibold [&_strong]:text-gray-800 [&_strong]:bg-gradient-to-r [&_strong]:from-orange-100 [&_strong]:to-blue-100 [&_strong]:px-1
          [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800 [&_a]:hover:no-underline [&_a]:transition-all [&_a]:duration-300 [&_a]:font-medium"
                        dangerouslySetInnerHTML={{ __html: person.desc || "" }}
                      />
                    </div>

                    {/* Read More Indicator (if text is long) */}
                    {/* {person.desc && person.desc.length > 150 && (
                      <motion.div
                        className="mt-2 flex justify-end"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <button className="text-xs font-medium text-gray-500 hover:text-orange-500 transition-colors duration-300 flex items-center gap-1 group/btn">
                          <span>Read full story</span>
                          <svg
                            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    )} */}
                  </div>

                  {/* Bottom Gradient Accent */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-orange-400 via-cyan-400 to-blue-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
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
