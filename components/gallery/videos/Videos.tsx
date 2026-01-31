"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";

interface ApiVideo {
  _id: string;
  title: string;
  video_link: string;
  date: string;
  status: string;
  orderBy: number;
}

const Videos = () => {
    const [apiVideos, setApiVideos] = useState<ApiVideo[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= HELPER: EMBED URL ================= */
  const getEmbedUrl = (url: string) => {
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

  /* ================= FETCH VIDEOS ================= */
  useEffect(() => {
    const fetchGalleryVideos = async () => {
      try {
        const res = await axiosClient.get("/gallery-video");
        const videos = res?.data?.videos || [];

        const activeVideos = videos
          .filter((v: ApiVideo) => v.status === "Active")
          .sort((a: ApiVideo, b: ApiVideo) => a.orderBy - b.orderBy);

        setApiVideos(activeVideos);
      } catch (error) {
        console.error("❌ Gallery Video API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryVideos();
  }, []);
  return (
    <section className="bg-gray-50">
    {/* ================= HERO ================= */}
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home/video2.jpg')" }}
    >
      <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
        <div className="w-full px-4 text-center">
          <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
            Videos
          </h2>
          <p className="text-sm md:text-base text-white mt-1">
            <Link
              href="/"
              className="text-[#DF562C] font-medium hover:underline"
            >
              Home
            </Link>{" "}
            - Videos
          </p>
        </div>
      </div>
    </div>

    {/* ================= CONTENT ================= */}
    <div className="w-full px-4 md:px-6 lg:px-6 text-center">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4">
        Videos{" "}
        <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
          Gallery
        </span>
      </h2>

      <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
        "Explore moments captured through our video gallery, showcasing
        inspiring events, social initiatives, and cultural programs."
      </p>

      <div className="w-full h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
      <div>
        <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] mt-2">
          Acharya Jagdishji Maharaj is a revered spiritual guide whose life
          and teachings continue to inspire countless individuals on the path
          of inner awakening and self-realization. Blessed by the divine grace
          of
          <strong> Maa Gange and Lord Krishna</strong>, he embodies a rare
          harmony of spiritual wisdom, compassion, and disciplined living.
          Renowned as a profound philosopher and an eloquent Bhagwat
          Kathavachak, Acharya Ji has dedicated his life to spreading the
          timeless values of Sanatan Dharma through wisdom-filled discourses
          and soulful storytelling.
        </p>
      </div>

      {/* ================= VIDEO GRID ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
        {/* ===== LOADING SKELETON ===== */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded shadow-md border border-gray-200 overflow-hidden animate-pulse"
            >
              <div className="w-full aspect-video bg-gray-200" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
            </div>
          ))}

        {/* ===== REAL VIDEOS ===== */}
        {!loading &&
          apiVideos.map((video, i) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-[#f36b2a]/10"
            >
              {/* Video */}
              <div className="relative overflow-hidden group aspect-video">
                <iframe
                  src={getEmbedUrl(video.video_link)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full group-hover:scale-103 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Title + Date */}
              <div className="py-3 px-4 text-center bg-white">
                <h3 className="text-gray-700 font-medium text-base mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-800">
                  📅 {new Date(video.date).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  </section>
  )
}

export default Videos
