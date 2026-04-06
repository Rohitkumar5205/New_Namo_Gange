"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

interface AboutNGT {
  _id: string;
  title: string;
  image: string;
  image_alt?: string;
  desc: string;
  link?: string;
  status?: string;
}

const AboutNGTrust = () => {
  const [aboutNGT, setAboutNGT] = useState<AboutNGT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axiosClient.get("/about-us");
        const data: AboutNGT[] = res?.data?.data || [];

        const activeItems = data.filter((item) => item.status === "Active");

        setAboutNGT(activeItems);
      } catch (error) {
        console.error("About API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <section className="relative py-1.5 md:py-2 px-4 md:px-12 lg:px-12 bg-gradient-to-b from-white via-gray-50 to-[#f8fafc] overflow-hidden">
      {aboutNGT.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={item._id}
            className={`w-full flex flex-col ${
              isEven ? "lg:flex-row justify-between" : "lg:flex-row-reverse"
            } items-center gap-5 lg:gap-10 lg:mb-4 mb-4`} // ✅ Fixed: mb:4 → mb-4
          >
            {/* TEXT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex-1 lg:w-[60%]"
            >
              <h2 className="text-sm md:text-lg lg:text-lg font-semibold text-gray-900 py-2 leading-tight">
                {item.title}
              </h2>

              <div
                className="
        text-gray-700 text-xs md:text-[14px] leading-relaxed font-normal text-justify
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
                dangerouslySetInnerHTML={{ __html: item.desc || "" }}
              />

              {item.link && item.link.trim() !== "" && (
                <Link href={item.link}>
                  <button className="mt-2 md:mt-4 relative overflow-hidden px-4 py-1 rounded md:px-6 md:py-1.5 text-xs md:text-sm text-white font-medium shadow-md bg-[#DF562C] hover:bg-orange-600 hover:shadow-lg transition-all duration-300">
                    Join As Volunteer
                  </button>
                </Link>
              )}
            </motion.div>

            {/* IMAGE SIDE */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex-1 lg:w-[40%] relative"
            >
              {item.image && (
                <div className="overflow-hidden rounded shadow-lg hover:shadow-xl transition-all duration-500 group relative">
                  <Image
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.image}`
                    }
                    alt={item.image_alt || item.title}
                    width={500} 
                    height={400} 
                    // sizes="(max-width: 768px) 100vw, (max-width: 1024px) 30vw, 40vw"
                    priority={false}
                    className="w-full h-auto lg:h-85 md:h-70 object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-102"
                    className="w-full h-auto lg:h-[340px] md:h-[280px] object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              )}

              <div className="absolute -inset-3 bg-gradient-to-r from-[#DF562C]/20 via-transparent to-[#1e7ed3]/20 blur-2xl rounded-3xl -z-10 opacity-70" />
            </motion.div>
          </div>
        );
      })}
    </section>
  );
};

export default AboutNGTrust;
