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

        const activeHero = heroList.find((b: any) => b.status === "Active");

        if (activeHero) {
          setHero({
            image: activeHero.image,
            title: activeHero.title,
            tag_line: activeHero.tag_line,
            link: activeHero.link,
            description: activeHero.description,
            alt_text: activeHero.alt_text,
          });
        }
      } catch (error: any) {
        console.error("Hero API Error:", error?.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

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
        <div className=" flex-1 md:w-[60%]">
          <div className=" text-center">
            <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
              {hero?.title}
            </h2>
            <div className="w-full h-[2px] my-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
          </div>

          <div className="space-y-2 text-gray-700 text-base md:text-sm leading-relaxed text-justify">
            <p className="text-[13px] md:text-sm font-medium italic mb-3 text-center bg-gradient-to-r from-orange-800 via-cyan-800 to-blue-800 bg-clip-text text-transparent">
              {hero?.tag_line}
            </p>

            {/* DESCRIPTION */}
            <div
              className="
  text-xs md:text-[15px] text-gray-700 font-normal text-justify

  [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3
  [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3
  [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2
  [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mb-2
  [&_h5]:text-sm [&_h5]:font-semibold [&_h5]:mb-2
  [&_h6]:text-xs [&_h6]:font-semibold [&_h6]:mb-2

  [&_p]:mb-3 [&_p]:leading-relaxed

  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3

  [&_strong]:font-semibold
  [&_a]:text-blue-600 [&_a]:underline
  "
              dangerouslySetInnerHTML={{ __html: hero?.description || "" }}
            />

            {/* Read More Button */}
            {hero?.link ? <Link href={hero?.link || "#"}>
              <button
                className="mt-2 md:mt-5 lg:mt-5 relative rounded overflow-hidden px-4 md:px-6 py-1 text-[12px] md:text-sm text-white font-normal 
                shadow-md bg-[#0C55A0] cursor-pointer
                hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
              >
                Read More...
              </button>
            </Link> : ""}
          </div>
        </div>

        {/* ================= RIGHT SIDE IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="md:w-[40%] relative flex justify-end items-end"
        >
          {/* Decorative Background */}
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
                className="w-full h-64 md:h-[400px] object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MokshaVoyage;
