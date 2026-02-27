"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiService, InitiativeFromAPI } from "@/lib/apiService";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

// ✅ Fixed Interface Type
interface Initiative {
  title: string;
  image: string;
  desc: string;
  link: string;
  image_alt?: string;
}

const OurInitiatives = () => {
  const [initiativeList, setInitiativeList] = useState<Initiative[]>([]);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const res = await axiosClient.get("/initiatives");
        if (res.data && Array.isArray(res.data.data)) {
          const parser = new DOMParser();
          const fetchedData = res.data.data
            .filter((item: any) => item.status === "Active")
            .sort(
              (a: any, b: any) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((item: any) => {
              let description = item.desc || "";
              const decoded = parser.parseFromString(description, "text/html");
              description = decoded.body.textContent || "";
              return {
                title: item.title,
                image: item.image,
                desc: description.replace(/<[^>]+>/g, ""),
                image_alt: item?.image_alt || item.title,
                link: item.slug ? `/initiatives/${item.slug}` : "#",
              };
            });
          console.log("setInitiativeList...", fetchedData);
          setInitiativeList(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching initiatives:", error);
      }
    };

    fetchInitiatives();
  }, []);

  const stripHtmlTags = (html: string = ""): string => {
    if (typeof window === "undefined") return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <section className="relative py-1.5 md:py-3 px-2 md:px-12  lg:px-12  bg-white overflow-hidden">
      <div className="w-full text-center">
        {/* ========== Section Header ========== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm text-center md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Initiatives
            </span>
          </h2>
          <p className="text-gray-600 text-[13px] md:text-sm italic leading-relaxed">
            “Creating positive change through service, awareness, and
            sustainable community development.”
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center w-full mt-2"
        >
          <div className="w-full  bg-white py-6 relative overflow-hidden text-center">
            <div className="absolute top-1 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
            <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
              Our initiatives focus on creating meaningful change through
              service, awareness, and community support. Each program is
              designed to uplift society, protect culture, and promote
              sustainable living while encouraging unity, responsibility,
              compassion, and long-term positive transformation. We strive to
              create a harmonious connection between people and nature by
              nurturing values of{" "}
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
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {initiativeList.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="
        group relative bg-white rounded-2xl border border-gray-200
        shadow-sm hover:shadow-xl transition-all duration-300
        flex flex-col overflow-hidden
      "
            >
              {/* IMAGE */}
              <div className="w-full h-28 md:h-36 flex items-center justify-center bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="
            object-contain h-14 md:h-30 md:w-30 w-auto
            transition-transform duration-300
            group-hover:scale-110
          "
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-1 py-1 md:py-2 px-2 text-center">
                <h3 className="text-gray-900 font-normal text-sm md:text-base mb-1 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-xs md:text-[13px] leading-relaxed line-clamp-3 mb-4">
                  {stripHtmlTags(item?.desc)}
                </p>

                {/* CTA */}
                <Link href={item.link} className="mt-auto">
                  <div
                    className="
              relative w-full text-center py-1 md:py-1 rounded-lg overflow-hidden
             text-xs md:text-sm font-medium text-[#0C55A0]
              border border-[#0C55A0]/30
              group/btn cursor-pointer transition-all duration-300 hover:border-[#0C55A0]
            "
                  >
                    <span className="relative text-xs z-10 transition-colors duration-300 group-hover/btn:text-white">
                      Explore →
                    </span>
                    <div className="absolute inset-y-0 left-0 w-0 bg-[#0C55A0] transition-all duration-500 ease-out group-hover/btn:w-full" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurInitiatives;
