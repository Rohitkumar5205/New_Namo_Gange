"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const res = await axiosClient.get("/initiatives");
        if (res.data && Array.isArray(res.data.data)) {
          const fetchedData = res.data.data
            .filter((item: any) => item.status === "Active")
            .sort(
              (a: any, b: any) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((item: any) => {
              return {
                title: item.title,
                image: item.image,
                desc: item.desc,
                image_alt: item?.image_alt || item.title,
                link: item.slug ? `/initiatives/${item.slug}` : "#",
              };
            });
          console.log("setInitiativeList...", fetchedData);
          setInitiativeList(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching initiatives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  // ✅ Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <section className="relative py-1.5 md:py-3 px-2 md:px-12 lg:px-12 bg-white overflow-hidden">
        <div className="w-full text-center">
          <div className="h-8 bg-gray-200 animate-pulse rounded mb-4 mx-auto max-w-md"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-8 mx-auto max-w-2xl"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 animate-pulse h-64"
              >
                <div className="w-full h-28 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="relative py-1.5 md:py-3 px-2 md:px-12 lg:px-12 bg-white overflow-hidden">
        <div className="w-full text-center">
          <div className="h-8 bg-gray-200 animate-pulse rounded mb-4 mx-auto max-w-md"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-8 mx-auto max-w-2xl"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 animate-pulse h-64"
              >
                <div className="w-full h-28 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-1.5 md:py-3 px-2 md:px-12 lg:px-12 bg-white overflow-hidden">
      <div className="w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center w-full mt-2"
        >
          <div className="w-full bg-white py-6 relative overflow-hidden text-center">
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
                conscious living.
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {initiativeList.slice(0, 12).map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden h-full"
            >
              {/* IMAGE */}
              <div className="w-full h-32 md:h-40 flex items-center justify-center bg-gray-50 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="w-full flex items-center justify-center"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-contain h-16 md:h-32 w-auto transition-transform duration-300"
                  />
                </motion.div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-1 py-2 px-3 text-center">
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-900 font-normal text-sm md:text-base mb-1 line-clamp-1"
                >
                  {item.title}
                </motion.h3>

                <div
                  className="text-gray-600 text-xs md:text-[13px] leading-relaxed line-clamp-3 mb-3
                    [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mb-1
                    [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mb-1
                    [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mb-1
                    [&_p]:mb-1 [&_p]:leading-relaxed
                    [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-1
                    [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-1
                    [&_strong]:font-semibold
                    [&_a]:text-blue-600 [&_a]:underline hover:opacity-90"
                  dangerouslySetInnerHTML={{ __html: item.desc || "" }}
                />

                {/* CTA */}
                <Link href={item.link} className="mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "tween", duration: 0.2 }}
                    className="relative w-full text-center py-1 rounded-lg overflow-hidden text-xs md:text-sm font-normal text-white bg-gradient-to-r from-[#0C55A0] to-[#1e7ed3] shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    Read More...
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More Link */}
        {initiativeList.length > 12 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-end mt-6"
          >
            <Link
              href="/initiatives"
              className="group inline-flex items-center gap-2 text-[#0C55A0] hover:text-[#08467c] font-medium text-sm transition-colors duration-300"
            >
              <span>Show More</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OurInitiatives;
