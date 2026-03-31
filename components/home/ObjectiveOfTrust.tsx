"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Objective {
  _id: string;
  title: string;
  logo: string;
  description: string;
  slug?: string;
  link?: string;
  logo_alt?: string;
}

const ObjectiveOfTrust = () => {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const res = await axiosClient.get("/objectives");

        if (res.data && Array.isArray(res.data.data)) {
          const filteredData: Objective[] = res.data.data
            .filter((item: any) => item.status === "Active")
            .map((item: any) => ({
              _id: item._id,
              title: item.title,
              logo: item.logo,
              description: item.desc,
              logo_alt: item?.logo_alt || item.title,
              slug: item.slug,
              link: item.slug ? `/objectives/${item.slug}` : "#",
            }));

          setObjectives(filteredData);
        }
      } catch (error) {
        console.error("Error fetching objectives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjectives();
  }, []);

  const truncateHTML = (html?: string, limit: number = 135): string => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, limit);
  };
  return (
    <section className="relative py-2 md:py-6 lg:py-6 bg-gradient-to-b from-white via-gray-50 to-[#f8fafc] overflow-hidden">
      <div className="w-full mx-auto px-2 md:px-12 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            Objective Of{" "}
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Trust
            </span>
          </h2>

          <p className="text-[13px] md:text-[15px] text-medium text-gray-800 italic py-1">
            “Serving Humanity, Preserving Nature, Awakening Divinity.”
          </p>

          <div className="flex justify-center w-full ">
            <div className=" w-full mx-auto bg-white py-3 md:py-4 relative overflow-hidden text-justify">
              <div className="absolute top-1 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

              <p className="text-gray-700 text-xs md:text-[15px] leading-relaxed font-normal">
                The goal of our Trust is to build a strong, meaningful, and
                lasting connection with our community through{" "}
                <span className="font-medium text-[#DF562C]">openness</span>,{" "}
                <span className="font-medium text-[#1e7ed3]">safety</span>, and{" "}
                <span className="font-medium text-gray-900">reliability</span>.
                We strive to create an environment where every individual feels
                valued, respected, empowered, and confident that their
                well-being and interests remain our highest priority. With every
                initiative we undertake, we stay dedicated to upholding your{" "}
                <span className="font-medium text-[#DF562C]">trust</span> and
                strengthening the bond that unites us as a community.
              </p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col items-center text-center animate-pulse min-h-[320px]"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 mb-4 mt-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="w-full space-y-2 mb-4 px-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5 mx-auto"></div>
                </div>
                <div className="h-9 bg-gray-200 rounded w-28 mt-auto mb-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1 md:gap-2"
          >
            {objectives.map((item, i) => (
              <motion.div
                key={item._id || i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Image Container */}
                <div className="relative flex justify-center py-2 md:py-4 ">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "tween", duration: 0.2 }}
                    className="flex items-center justify-center rounded-full bg-white ring-2 ring-gray-200 shadow-lg hover:ring-blue-200"
                  >
                    <Image
                      src={
                        item.logo?.startsWith("http")
                          ? item.logo
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.logo}`
                      }
                      alt={item.logo_alt || item.title}
                      width={100}
                      height={100}
                      className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative z-10 text-base md:text-lg font-normal text-gray-900 px-4  text-center tracking-tight leading-snug"
                >
                  {item.title}
                </motion.h2>

                {/* Description */}
                <div
                  className="relative z-10 px-1 py-2 text-gray-600 text-xs md:text-sm text-center overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    maxHeight: "6rem",
                  }}
                >
                  <div
                    className="[&_h1]:text-lg [&_h1]:font-bold [&_h1]:mb-2
  [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mb-2
  [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mb-1
  [&_h4]:text-xs [&_h4]:font-semibold [&_h4]:mb-1
  [&_h5]:text-xs [&_h5]:font-semibold [&_h5]:mb-1
  [&_h6]:text-xs [&_h6]:font-semibold [&_h6]:mb-1

  [&_p]:mb-3 [&_p]:leading-relaxed

  [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2
  [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2

  [&_strong]:font-semibold [&_strong]:text-gray-900
  [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800"
                    dangerouslySetInnerHTML={{
                      // __html: item?.description || "",
                      __html: truncateHTML(item?.description, 135),
                    }}
                  />
                </div>

                {/* Button Container */}
                <div className="relative z-10 flex justify-center w-full px-4 pt-2 pb-2 md:pb-4">
                  <Link href={item.link || "#"} className="w-full">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "tween", duration: 0.2 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-1 rounded-lg bg-gradient-to-r from-[#0C55A0] via-[#1073C0] to-[#1e7ed3] text-white font-normal hover:font-medium text-sm shadow-md hover:shadow-lg transition-shadow duration-200 group"
                    >
                      <span className="relative">Read More</span>
                      <ArrowRight size={18} className="text-white" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ObjectiveOfTrust;
