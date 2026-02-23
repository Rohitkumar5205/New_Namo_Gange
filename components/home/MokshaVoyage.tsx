"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Moksha from "@/public/home/moksha_sewa.png";
import axiosClient from "@/lib/axiosClient";

interface Hero {
  title: string;
  tag_line: string;
  description?: string;
  link: string;
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
        console.log("🚀 Fetching heroes...");

        const res = await axiosClient.get("/heroes");

        console.log("✅ Full API Response:", res);
        console.log("✅ API Data:", res?.data);

        const heroList = res?.data?.data || [];

        console.log("📦 Raw Hero List:", heroList);

        const activeHero = heroList.filter((b: any) => b.status === "Active");

        console.log("🟢 Active Heroes:", activeHero);

        const formatted = activeHero.map((b: any) => ({
          image: b.image,
          title: b.title,
          tag_line: b.tag_line,
          link: b.link,
          description: b.description,
          alt_text: b.alt_text,
        }));

        console.log("🔥 Final Formatted Data:", formatted);

        setHero(formatted[0]);
      } catch (error: any) {
        console.error("❌ Hero API Error:", error?.response || error.message);
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
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-100 to-[#f8fafc] overflow-hidden">
      <div className="w-full px-2 md:px-12  lg:px-12 py-2 md:py-6 flex flex-col md:flex-row items-center gap-2 md:gap-12">
        {/* ================= LEFT SIDE TEXT ================= */}
        <div className="flex-1">
          <h1 className="text-sm text-center md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            {/* Moksha{" "}
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Sewa */}
            {hero?.title}
            {/* </span> */}
          </h1>

          <div className="space-y-2 text-gray-700 text-base md:text-sm leading-relaxed text-justify">
            <p className="text-[13px] md:text-sm font-medium italic mb-3 text-center bg-gradient-to-r from-orange-700 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
              {/* “A soulful journey from self to salvation — आत्मा से मोक्ष तक की
              यात्रा” */}
              {hero?.tag_line}
            </p>

            {/* <p className="text-xs md:text-[14px]">
              <span className="font-normal text-gray-900">Moksha Voyage</span>{" "}
              is an initiative by{" "}
              <span className="font-normal text-[#DF562C]">
                Namo Gange Trust
              </span>{" "}
              that represents a sacred journey — a voyage towards inner
              purification, spiritual awakening, and harmony with nature.
            </p>

            <p className="text-xs md:text-[14px]">
              Through this divine mission, we strive to inspire people to live
              with{" "}
              <span className="font-normal text-[#1e7ed3]">
                awareness, compassion,
              </span>{" "}
              and{" "}
              <span className="font-normal text-[#DF562C]">
                selfless service
              </span>
              . Each step of this journey unites individuals with the eternal
              flow of spirituality, wellness, and cultural values rooted in
              Indian tradition.
            </p>

            <p className="text-xs md:text-[14px]">
              <span className="font-normal text-gray-900">Moksha Voyage</span>{" "}
              is not just an event — it’s a movement that connects hearts, heals
              the planet, and guides humanity toward the ultimate goal of{" "}
              <span className="font-normal text-[#1e7ed3]">peace, purity,</span>{" "}
              and <span className="font-normal text-[#DF562C]">liberation</span>
              .
            </p>

            <p className="text-xs md:text-[14px]">
              The voyage brings together seekers, spiritual masters, yogic
              practitioners, and nature lovers from across the world. It
              celebrates the ancient wisdom of India — where the human soul
              discovers its purpose through{" "}
              <span className="text-[#1e7ed3] font-medium">
                meditation, devotion,
              </span>{" "}
              and{" "}
              <span className="text-[#DF562C] font-medium">
                self-realization
              </span>
              . Through collective participation, the journey becomes a sacred
              celebration of unity, humanity, and divine consciousness.
            </p>

            <p className="text-xs md:text-[14px]">
              Moksha Voyage also emphasizes the importance of living in balance
              with the environment. By encouraging sustainable practices,
              mindful living, and ecological responsibility, it reminds us that{" "}
              <span className="font-normal text-gray-900">
                serving nature is serving the Creator
              </span>
              . Every participant becomes a messenger of hope, carrying forward
              a vision of a cleaner, kinder, and spiritually awakened world.
            </p> */}

            <p className="text-xs md:text-[14px] ">
              {stripHtmlTags(hero?.description)}
            </p>
          </div>

          {/* Read More Button */}
          <Link href={hero?.link}>
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
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 relative"
        >
          <div className="overflow-hidden rounded shadow-lg hover:shadow-xl transition-all duration-500">
            {hero?.image && (
              <Image
                src={
                  hero.image.startsWith("http")
                    ? hero.image
                    : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${hero.image}`
                }
                alt={hero?.alt_text}
                height={90}
                width={90}
                className="w-full md:h-90 object-cover hover:scale-103 transition-transform duration-700 ease-in-out"
              />
            )}
          </div>

          {/* Gradient Glow Effect */}
          <div
            className="absolute -inset-3 bg-gradient-to-r 
              from-[#DF562C]/20 via-transparent to-[#1e7ed3]/20 
              blur-2xl rounded-3xl -z-10 opacity-70"
          ></div>
        </motion.div>
      </div>
    </section>
  );
};

export default MokshaVoyage;
