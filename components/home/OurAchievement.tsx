"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

interface Achievement {
  _id: string;
  title: string;
  image: string;
  desc: string;
  link?: string;
  image_alt?: string;
  status?: string;
  createdAt?: string;
}

const OurAchievement = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await axiosClient.get("/achievements");

        const data: Achievement[] = res?.data?.data || [];

        const activeItems = data
          .filter((item) => item.status === "Active")
          .sort(
            (a, b) =>
              new Date(a.createdAt || "").getTime() -
              new Date(b.createdAt || "").getTime(),
          );

        setAchievements(activeItems);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section className="w-full relative py-1.5 md:py-3 bg-gray-50 overflow-hidden">
      <div className="px-2 lg:px-12 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 text-center leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Achievement
            </span>
          </h2>

          <p className="text-[13px] md:text-[15px] text-center text-medium text-gray-800 italic py-1">
            “Serving Humanity, Preserving Nature, Awakening Divinity.”
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center w-full mb-6"
        >
          <div className="w-full py-2 relative overflow-hidden text-center rounded-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
           <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
  Each milestone achieved by our Trust is a step toward creating a more 
  compassionate and environmentally balanced society. We believe that true 
  progress is measured not just by the initiatives we launch, but by the 
  meaningful impact they create in the lives of people and the preservation 
  of our natural world. 
</p>
          </div>
        </motion.div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="space-y-5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center gap-5 animate-pulse"
              >
                <div className="flex-1 w-full h-60 bg-gray-200 rounded" />
                <div className="flex-1 w-full space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-8 bg-gray-200 rounded w-32 mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <p className="text-center text-gray-500">
            No achievements available.
          </p>
        ) : (
          <div className="space-y-3 md:space-y-5">
            {achievements.map((activity, i) => (
              <div
                key={activity._id}
                className={`flex flex-col ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-1 md:gap-10 lg:gap-10`}
              >
                {/* IMAGE */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 1 ? 100 : -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex-1 relative group w-full"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#f36b2a]/30 to-[#1e7ed3]/30 rounded blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                  <div className="overflow-hidden rounded shadow-lg bg-white/50 backdrop-blur-sm border border-gray-100 transition-all duration-700 group-hover:shadow-2xl w-full">
                    <Image
                      src={
                        activity.image.startsWith("http")
                          ? activity.image
                          : `${
                              process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""
                            }${activity.image}`
                      }
                      alt={activity.image_alt || activity.title}
                      width={600}
                      height={400}
                      className="w-full md:h-75 object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                </motion.div>

                {/* TEXT */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 1 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex-1 text-center md:text-left"
                >
                  <h2 className="text-base md:text-xl font-normal text-gray-900">
                    {activity.title}
                  </h2>

                  <div
                    className="
                      text-gray-700 py-0 md:py-4 text-justify text-xs md:text-sm lg:text-sm leading-relaxed font-normal
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
                    dangerouslySetInnerHTML={{ __html: activity.desc || "" }}
                  />

                  {activity.link && activity.link.trim() !== "" && (
                    <Link href={activity.link}>
                      <button
                        className="relative overflow-hidden px-4 py-1 rounded md:py-1.5 lg:py-1.5 text-xs md:text-sm lg:text-sm text-white bg-[#0C55A0] hover:bg-[#08467c]
                        hover:shadow-lg transition-all duration-300"
                      >
                        Read More...
                      </button>
                    </Link>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurAchievement;
