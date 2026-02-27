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

  const stripHtmlTags = (html: string = ""): string => {
    if (typeof window === "undefined") return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const paraStyle =
    "text-gray-700 text-xs md:text-[14px] leading-relaxed font-normal text-justify";

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
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-5 md:gap-10 lg:gap-10 mb-8`}
          >
            {/* TEXT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 mb-2 leading-tight">
                {item.title}
              </h2>

              <div className="space-y-2">
                <p className={paraStyle}>{stripHtmlTags(item.desc)}</p>
              </div>

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
              className="flex-1 relative"
            >
              {item.image && (
                <div className="overflow-hidden rounded shadow-lg md:mt-6 hover:shadow-xl transition-all duration-500 group relative">
                  <Image
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${
                            process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""
                          }${item.image}`
                    }
                    alt={item.image_alt || item.title}
                    width={600}
                    height={400}
                    className="w-full md:h-85 object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              )}

              <div className="absolute -inset-3 bg-gradient-to-r from-[#DF562C]/20 via-transparent to-[#1e7ed3]/20 blur-2xl rounded-3xl -z-10 opacity-70"></div>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
};

export default AboutNGTrust;
