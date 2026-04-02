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

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

const Videos = () => {
  const [apiVideos, setApiVideos] = useState<ApiVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

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
        console.error("Gallery Video API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryVideos();
  }, []);

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/gallery/videos")}`,
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
        console.error("Error fetching SEO data for videos:", error);
      } finally {
        setSeoLoading(false);
      }
    };

    fetchSEOData();
  }, []);
  return (
    <section className="bg-gray-50">
      {/* ================= HERO ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner || "/home/video2.jpg"}')`,
          backgroundAttachment: "fixed",
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
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-wide drop-shadow-lg">
              {seoData?.h1tag || "Videos"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "Videos"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative py-1.5 md:py-3 px-2 md:px-12  lg:px-12  bg-white text-center">
        <h2 className="text-sm text-center md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
          Videos{" "}
          <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
            Gallery
          </span>
        </h2>

        <p className="text-gray-600 text-[13px] md:text-sm italic leading-relaxed">
          "Explore moments captured through our video gallery, showcasing
          inspiring events, social initiatives, and cultural programs."
        </p>

        <div className="w-full h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <div>
          {/* <p className="mt-1 text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
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
          </p> */}

          <p className="mt-1 text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
  Our Videos Gallery presents a collection of inspiring moments captured through
  visual storytelling, reflecting the essence of devotion, service, and cultural
  values. These videos offer a deeper insight into spiritual discourses,
  community initiatives, and meaningful events that bring people together with a
  shared purpose. Through each frame, viewers can experience the dedication,
  positivity, and transformative impact of our journey.
  <strong>
    {" "}
    This gallery serves as a window into our mission, showcasing faith, unity,
    and the spirit of selfless service in action.
  </strong>
</p>
        </div>

        {/* ================= VIDEO GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 py-2 md:py-6">
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
                <div className="flex flex-row justify-between py-3 px-4 text-center bg-white">
                  <h3 className="text-gray-900 font-normal text-sm md:text-base mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  {/* <p className="text-gray-600 text-xs md:text-[13px] leading-relaxed line-clamp-3 mb-4">
                    📅 {new Date(video.date).toLocaleDateString() || ""}
                  </p> */}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
