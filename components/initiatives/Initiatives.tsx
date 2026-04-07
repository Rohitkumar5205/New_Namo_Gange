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

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

const Initiatives = () => {
  const [initiativeList, setInitiativeList] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState<boolean>(true);

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

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/initiatives")}`,
        );
        const seo = res?.data?.data;
        if (seo) {
          setSeoData({
            page_banner: seo.page_banner,
            banner_alt: seo.banner_alt,
            h1tag: seo.h1tag,
          });
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      } finally {
        setSeoLoading(false);
      }
    };

    fetchSEOData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ✅ FIXED BANNER - Responsive for all devices */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${
            seoData?.page_banner
              ? seoData.page_banner.startsWith("http")
                ? seoData.page_banner
                : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
              : "/OurInitiatives/initbanner.jpg"
          }')`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative w-full h-42 md:h-56 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full px-4 text-center z-10"
          >
            {/* Dynamic H1 from SEO data */}
            <h1 className="text-lg md:text-2xl lg:text-3xl font-medium text-white tracking-wide drop-shadow-lg">
              {seoData?.h1tag || "Our Initiatives"}
            </h1>

            <p className="text-xs md:text-base lg:text-lg text-white mt-1 md:mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "Our Initiatives"}
            </p>
          </motion.div>
        </div>
      </div>

      <section className="relative py-4 md:py-6 lg:py-8 px-4 sm:px-6 md:px-8 lg:px-12 bg-transparent overflow-hidden">
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-base md:text-xl lg:text-2xl font-medium text-gray-900 leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
                Initiatives
              </span>
            </h2>
            <p className="text-gray-600 text-[12px] md:text-sm lg:text-base italic leading-relaxed mt-2">
              "Creating positive change through service, awareness, and
              sustainable community development."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center w-full mt-3 md:mt-4"
          >
            <div className="w-full relative overflow-hidden text-center">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
              />
              <p className="text-gray-700 text-xs md:text-[14px] lg:text-[15px] text-justify leading-relaxed font-normal mt-3 md:mt-4 px-2">
                Our initiatives focus on creating meaningful change through
                service, awareness, and community support. Each program is
                designed to uplift society, protect culture, and promote
                sustainable living while encouraging unity, responsibility,
                compassion, and long-term positive transformation. We strive to
                create a harmonious connection between people and nature by
                nurturing values of{" "}
                <span className="font-medium text-[#1e7ed3]">compassion</span>,{" "}
                <span className="font-medium text-[#DF562C]">
                  responsibility
                </span>
                , and{" "}
                <span className="font-medium text-gray-900">
                  conscious living.
                </span>
              </p>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 md:py-4 mt-6 md:mt-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 animate-pulse h-56 sm:h-64"
                >
                  <div className="w-full h-24 sm:h-28 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:py-4 gap-2 md:gap-3 mt-6 md:mt-8"
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
              {initiativeList?.map((item, i) => (
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
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden h-full"
                >
                  <Link href={item.link} className="flex flex-col h-full">
                    {/* IMAGE */}
                    <div className="w-full h-24 sm:h-28 md:h-36 lg:h-40 relative flex items-center justify-center bg-gray-50 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="w-full h-full relative flex items-center justify-center p-2 sm:p-3"
                      >
                        <Image
                          src={
                            item.image?.startsWith("http")
                              ? item.image
                              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.image}`
                          }
                          alt={item.image_alt || item.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                          className="object-contain transition-transform duration-300"
                          priority={false}
                        />
                      </motion.div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col flex-1 py-2 px-2 sm:px-3 text-center">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-900 font-normal text-xs sm:text-sm md:text-base mb-1 line-clamp-2"
                      >
                        {item.title}
                      </motion.h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Initiatives;
