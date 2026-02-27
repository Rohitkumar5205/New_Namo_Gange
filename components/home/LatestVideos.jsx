"use client";

import React, { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

export default function LatestVideos() {
  const playlistId = "UUkAQ_M8x5l3DvrH_VtuoiSA";
  const playlistIndexes = [1, 2];

  const [apiVideos, setApiVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryVideos = async () => {
      try {
        const res = await axiosClient.get("/gallery-video");
        const videos = res?.data?.videos || [];

        const activeVideos = videos
          .filter((v) => v.status === "Active")
          .sort((a, b) => a.orderBy - b.orderBy)
          .slice(0, 2);

        setApiVideos(activeVideos);
      } catch (error) {
        console.error("❌ Gallery Video API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryVideos();
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("/embed/")) return url;

    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } catch {
      return "";
    }
  };

  return (
    <section className="w-full px-2 py-6 md:py-10 md:px-12 lg:px-12 bg-gradient-to-b from-white via-gray-50 to-[#f8fafc] overflow-hidden">
      {/* ===== Header ===== */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-3 bg-red-50 rounded-full shadow-sm border border-red-100">
          <FaYoutube className="text-red-600 text-xl md:text-3xl drop-shadow-sm" />
        </div>
        <h2 className="text-lg md:text-2xl font-bold text-gray-800 tracking-wide">
          Latest <span className="text-red-600">Videos</span>
        </h2>
      </motion.div>

      {/* ===== ONE GRID – ALL 4 VIDEOS ===== */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* PLAYLIST VIDEOS (2) */}
        {playlistIndexes.map((index) => (
          <motion.div
            key={`playlist-${index}`}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.9 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 100, damping: 12 },
              },
            }}
            whileHover={{ y: -10 }}
            className="group relative bg-white p-3 rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            {/* Unique Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

            <div className="relative rounded-xl overflow-hidden bg-black h-[250px] md:h-[300px]">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed?listType=playlist&list=${playlistId}&index=${index}`}
                frameBorder="0"
                allowFullScreen
                title={`Playlist Video ${index}`}
                className="w-full h-full object-cover"
              ></iframe>
            </div>
          </motion.div>
        ))}

        {/* API VIDEOS (2) */}
        {!loading &&
          apiVideos.map((video) => (
            <motion.div
              key={video._id}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 100, damping: 12 },
                },
              }}
              whileHover={{ y: -10 }}
              className="group relative bg-white p-3 rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Unique Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

              <div className="relative rounded-xl overflow-hidden bg-black h-[250px] md:h-[300px]">
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(video.video_link)}
                  frameBorder="0"
                  allowFullScreen
                  title={video.title}
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
