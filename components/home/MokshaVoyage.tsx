"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import axiosClient from "@/lib/axiosClient";

interface Hero {
  title: string;
  tag_line: string;
  description?: string;
  link?: string;
  image: string;
  imagePreview?: string;
  alt_text?: string;
  status?: string;
}

const MokshaVoyage = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axiosClient.get("/heroes");

        const heroList = res?.data?.data || [];

        const activeHero = heroList.filter((b: any) => b.status === "Active");

        if (activeHero.length > 0) {
          const formatted: Hero = {
            image: activeHero[0].image,
            title: activeHero[0].title,
            tag_line: activeHero[0].tag_line,
            link: activeHero[0].link,
            description: activeHero[0].description,
            alt_text: activeHero[0].alt_text,
          };

          setHero(formatted);
        }
      } catch (error: any) {
        console.error("Hero API Error:", error?.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  // ✅ Type Safe HTML Strip
  const stripHtmlTags = (html: string = ""): string => {
    if (typeof window === "undefined") return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-100 to-[#f8fafc] overflow-hidden">
      <div className="w-full px-4 md:px-12 lg:px-12 py-6 md:py-12 flex flex-col md:flex-row items-center gap-2 md:gap-8 md:justify-between">
        {/* ================= LEFT SIDE TEXT ================= */}
        <div className="flex-1 md:w-[60%]">
          <h1 className="text-sm text-center md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            {hero?.title}
          </h1>

          <div className="space-y-2 text-gray-700 text-base md:text-sm leading-relaxed text-justify">
            <p className="text-[13px] md:text-sm font-medium italic mb-3 text-center bg-gradient-to-r from-orange-700 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
              {hero?.tag_line}
            </p>

            <p className="text-xs md:text-[15px]  text-gray-800 font-normal tracking-wide text-justify">
              {stripHtmlTags(hero?.description || "")}
            </p>
          </div>

          {/* Read More Button */}
          <Link href={hero?.link || "#"}>
            <button
              className="mt-2 md:mt-5 lg:mt-5 relative rounded overflow-hidden px-4 md:px-6 py-1 text-[12px] md:text-sm text-white font-normal 
               shadow-md bg-[#0C55A0] cursor-pointer
               hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
            >
              Read More...
            </button>
          </Link>
        </div>

        {/* ================= RIGHT SIDE IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className=" md:w-[40%] relative flex justify-end items-end"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#DF562C]/10 via-transparent to-[#1e7ed3]/10 blur-3xl rounded-full -z-10" />

          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl border border-gray-100 group bg-white">
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

            {hero?.image && (
              <Image
                src={
                  hero.image.startsWith("http")
                    ? hero.image
                    : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${hero.image}`
                }
                alt={hero?.alt_text || hero?.title || "Hero Image"}
                height={100}
                width={100}
                className="w-full h-64 md:h-[400px] object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-103"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MokshaVoyage;
