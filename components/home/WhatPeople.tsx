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
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="absolute left-0 md:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20
    bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow transition"
  >
    <ChevronLeft size={18} />
  </motion.button>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="absolute right-0 md:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20
    bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow transition"
  >
    <ChevronRight size={18} />
  </motion.button>
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
    slidesToShow: 5, // Desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 3, // Tablet - 3 cards
          slidesToScroll: 1,
          infinite: testimonials.length > 3,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 2, // Small tablet - 2 cards
          slidesToScroll: 1,
          infinite: testimonials.length > 2,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1, // Mobile - 1 card
          slidesToScroll: 1,
          infinite: testimonials.length > 1,
        },
      },
    ],
  };

  return (
    <section className="w-full relative py-6 overflow-hidden">
      <div className="w-full px-3 md:px-12 lg:px-12 text-center">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-2"
        >
          <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>

          <p className="text-sm md:text-[15px] text-gray-600 italic mt-1">
            "Creating positive change through service, awareness, and
            sustainable community development."
          </p>
        </motion.div>

        {/* TOP CONTENT BLOCK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center w-full md:mb-4 px-2 md:px-0"
        >
          <div className="w-full bg-white py-2 md:py-2 relative overflow-hidden text-center rounded-lg ">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
            <p className="text-xs md:text-sm lg:text-base leading-relaxed font-normal px-3 md:px-4 text-gray-700">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border shadow-md p-3 md:p-4 animate-pulse"
              >
                <div className="w-full h-40 md:h-48 bg-gray-200 rounded-md mb-3" />
                <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                <div className="h-2 md:h-3 bg-gray-200 rounded w-5/6 mx-auto" />
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <p className="text-gray-500 text-xs md:text-sm">
            No testimonials available.
          </p>
        ) : (
          <div className="px-2 md:px-0">
            <Slider ref={sliderRef} {...sliderSettings}>
              {testimonials.map((person) => (
                <div
                  key={person._id}
                  className="px-1 md:px-2 py-2 md:py-4 h-full"
                >
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
                      scale: 1.02,
                      boxShadow: "0 30px 40px -20px rgba(0,0,0,0.3)",
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      },
                    }}
                    viewport={{ once: true, margin: "-30px" }}
                    className="group bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col relative"
                  >
                    {/* Premium Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                    {/* Image Section */}
                    <div className="relative w-full h-40 md:h-48 lg:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      {/* Image Loading Skeleton */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />

                      {person.image && (
                        <>
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
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            className="object-contain p-2 transition-all duration-700 group-hover:scale-105 z-10"
                            quality={85}
                          />

                          {/* Image Overlay Effect on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                        </>
                      )}

                      {/* Decorative Corner Accent */}
                      <div className="absolute top-0 right-0 w-12 md:w-14 h-12 md:h-14 bg-gradient-to-br from-orange-400 to-blue-400 transform rotate-12 translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-20 transition-all duration-700 group-hover:translate-x-6 group-hover:-translate-y-6" />
                    </div>

                    {/* Content Section */}
                    <div className="p-3 md:p-4 lg:p-5 flex-1 flex flex-col relative bg-white/90 backdrop-blur-sm">
                      {/* Quote Icon */}
                      <motion.div
                        className="absolute top-3 right-3 text-gray-200 group-hover:text-orange-200 transition-colors duration-300"
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
                        <Quote size={16} fill="currentColor" />
                      </motion.div>

                      {/* Name */}
                      <motion.h2
                        className="text-xs md:text-sm lg:text-base font-semibold text-gray-800 mb-2 relative inline-block"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <span className="relative z-10">{person.name}</span>
                      </motion.h2>

                      {/* Description */}
                      <div className="relative z-10 flex-1 overflow-hidden">
                        <div
                          className="text-xs md:text-sm text-gray-600 text-justify line-clamp-3 md:line-clamp-4 leading-relaxed
                  [&_h1]:text-base [&_h1]:font-bold [&_h1]:mb-2 [&_h1]:text-gray-800 [&_h1]:border-l-4 [&_h1]:border-orange-400 [&_h1]:pl-2
                  [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:text-gray-700 [&_h2]:border-l-4 [&_h2]:border-blue-400 [&_h2]:pl-2
                  [&_p]:mb-2 [&_p]:leading-relaxed [&_p]:text-gray-600 
                  [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_ul]:space-y-1
                  [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2 [&_ol]:space-y-1
                  [&_li]:text-gray-600 [&_li]:text-xs [&_li]:hover:text-gray-900 [&_li]:transition-colors
                  [&_strong]:font-semibold [&_strong]:text-gray-800 [&_strong]:bg-gradient-to-r [&_strong]:from-orange-100 [&_strong]:to-blue-100 [&_strong]:px-1
                  [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800 [&_a]:hover:no-underline [&_a]:transition-all [&_a]:duration-300 [&_a]:font-medium"
                          dangerouslySetInnerHTML={{
                            __html: person.desc || "",
                          }}
                        />
                      </div>
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
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatPeople;
