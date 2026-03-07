"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

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
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col text-center"
              >
                <div className="flex justify-center mb:1 md:mb-2">
                  <div className="flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 shadow-inner transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={
                        item.logo?.startsWith("http")
                          ? item.logo
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.logo}`
                      }
                      alt={item.logo_alt || item.title}
                      width={100}
                      height={100}
                      className="w-20 h-20 md:w-24 md:h-24 p-2 rounded-full object-cover"
                    />
                  </div>
                </div>

                <h2 className="text-sm md:text-base font-medium text-gray-900 md:py-2 py-1 tracking-wide">
                  {item.title}
                </h2>

                <div
                  className="text-gray-600 text-xs md:text-sm text-center  line-clamp-4
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
                  dangerouslySetInnerHTML={{ __html: item?.description || "" }}
                />

                <Link href={item.link || "#"} className="flex justify-end mt-1">
                  <span className="text-sm font-normal text-[#0C55A0] hover:text-[#08467c] inline-flex items-center gap-1 transition-all group-hover:underline">
                    Read More
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ObjectiveOfTrust;
