"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import AboutNGTrust from "../home/AboutNGTrust";
import { motion } from "framer-motion";

interface TrustBody {
  _id: string;
  name: string;
  description: string;
  image: string;
  image_alt?: string;
  status?: string;
  createdAt?: string;
}

interface TrustBodyCard {
  id: string;
  title: string;
  text: string;
  image: string;
  image_alt?: string;
}

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

const AboutNamoGange = () => {
  const [trustBodies, setTrustBodies] = useState<TrustBodyCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrustBodies = async () => {
      try {
        const res = await axiosClient.get("/trust-bodies");
        const data: TrustBody[] = res?.data?.data || [];

        const activeItems: TrustBodyCard[] = data
          .filter((item) => item.status === "Active")
          .sort(
            (a, b) =>
              new Date(a.createdAt || "").getTime() -
              new Date(b.createdAt || "").getTime(),
          )
          .map((item) => ({
            id: item._id,
            title: item.name,
            text: item.description || "",
            image: item.image,
            image_alt: item.image_alt,
          }));

        setTrustBodies(activeItems);
      } catch (error) {
        console.error("Error fetching trust bodies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrustBodies();
  }, []);

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        // Fix the API endpoint - use the correct path format
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/about")}`,
        );
        console.log("SEO API Response:", res); // Debug log

        const seo = res?.data?.data;
        console.log("SEO Data:", seo); // Debug log

        if (seo) {
          setSeoData({
            page_banner: seo.page_banner,
            banner_alt: seo.banner_alt,
            h1tag: seo.h1tag,
          });
          console.log("seoData set:", {
            page_banner: seo.page_banner,
            banner_alt: seo.banner_alt,
            h1tag: seo.h1tag,
          });
        } else {
          console.log("No SEO data found in response");
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      } finally {
        setSeoLoading(false);
      }
    };

    fetchSEOData();
  }, []);

  console.log("Current seoData state:", seoData); // This will show the updated state

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Header with dynamic SEO data */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner
            ? seoData.page_banner.startsWith("http")
              ? seoData.page_banner
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
            : "/about/about1.jpg"
            }')`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-wide drop-shadow-lg">
              {seoData?.h1tag || "ABOUT US"}
            </h1>

            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "About Us"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full px-4 md:px-12 lg:px-12 py-2 md:py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full text-center"
        >
          <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-tight">
            About <span className="text-[#DF562C]">Namo Gange</span>
          </h2>

          <p className="text-sm md:text-[15px] text-gray-600 italic mt-1">
            "We serve communities through wellness, culture, women empowerment,
            compassionate service, and environmental care."
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
        />

        <motion.div className="w-full py-2 md:py-3 leading-relaxed space-y-4 text-justify">
          <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-normal">
            The Trust Bodies guided by{" "}
            <span className="font-medium text-[#DF562C]">
              Acharya Jagdish ji Maharaj
            </span>{" "}
            work with a shared vision of spiritual growth and social
            responsibility. Inspired by the divine blessings of{" "}
            <span className="font-medium text-[#DF562C]">Maa Ganga</span> and{" "}
            <span className="font-medium text-[#1e7ed3]">Lord Krishna</span>,
            these trusts are dedicated to preserving{" "}
            <span className="font-medium text-[#DF562C]">Dharma</span>,
            promoting cultural values, and serving humanity through education,
            awareness, and seva. With a foundation rooted in faith and
            compassion, the Trust Bodies continue to strengthen society by
            uniting spirituality with meaningful action.
          </p>
        </motion.div>
      </div>

      <AboutNGTrust />

      {/* Trust Bodies */}
      <div className="w-full py-8 md:py-12 px-4 md:px-12 lg:px-12 bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full py-2 text-center"
        >
          <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-tight">
            Trust <span className="text-[#DF562C]">Bodies</span>
          </h2>

          <p className="text-sm md:text-[15px] text-gray-600 italic mt-1">
            "Organizations united in service, spirituality, and social
            upliftment."
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full "
        />
        <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal py-2">
          The Trust Bodies form the backbone of our organizational structure,
          comprising dedicated professionals, visionary leaders, and committed
          individuals who collectively steer our mission towards meaningful
          impact. Each member brings unique expertise, experience, and
          perspectives that enrich our decision-making processes and strategic
          planning. Our governance framework ensures transparency,
          accountability, and ethical practices in all our endeavors.
        </p>

        {/* Loading */}
        {loading ? (
          <div className="space-y-6 py-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center gap-6 animate-pulse"
              >
                <div className="w-full md:w-[30%] h-48 bg-gray-200 rounded" />
                <div className="w-full md:w-[70%] space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : trustBodies.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No trust bodies available.
          </p>
        ) : (
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {trustBodies.map((activity, i) => (
              <div
                key={activity.id}
                className={`flex flex-col w-full ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-4 md:gap-6 lg:gap-12`}
              >
                {/* IMAGE SIDE */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="w-full md:w-[70%] lg:w-[45%] relative group" // ✅ Fixed: md:w-[80] → md:w-[70%]
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg bg-white border border-gray-100 w-full aspect-video">
                    <Image
                      src={
                        activity.image?.startsWith("http")
                          ? activity.image
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${activity.image}`
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 70vw, 45vw" // ✅ Fixed: Added better breakpoints for tablet
                      alt={activity.image_alt || activity.title}
                      priority={false}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" // ✅ Fixed: Removed invalid classes (lg:h-85, md:h-70, scale-102)
                    />
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                </motion.div>

                {/* TEXT SIDE */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col w-full lg:w-[55%]"
                >
                  <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4 relative pb-2 border-b-2 border-[#DF562C]">
                    {activity.title}
                  </h3>
                  <div
                    className="
            text-xs md:text-[15px] text-gray-700 font-normal text-justify leading-relaxed
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
            [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800
          "
                    dangerouslySetInnerHTML={{ __html: activity?.text || "" }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutNamoGange;
