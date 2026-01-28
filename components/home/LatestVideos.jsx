"use client";

import React, { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import axiosClient from "@/lib/axiosClient";

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
    <section className="w-full px-2 py-2 md:py-4 md:px-12 lg:px-12">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-2 mb-4">
        <FaYoutube className="text-red-600 text-2xl" />
        <h2 className="text-xl font-semibold text-gray-800">
          Latest Videos
        </h2>
      </div>

      {/* ===== ONE GRID – ALL 4 VIDEOS ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "20px",
        }}
      >
        {/* PLAYLIST VIDEOS (2) */}
        {playlistIndexes.map((index) => (
          <div
            key={`playlist-${index}`}
            style={{
              textAlign: "center",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            className="hover:shadow-lg hover:-translate-y-1"
          >
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed?listType=playlist&list=${playlistId}&index=${index}`}
              frameBorder="0"
              allowFullScreen
              title={`Playlist Video ${index}`}
              className="rounded-md"
            ></iframe>
          </div>
        ))}

        {/* API VIDEOS (2) */}
        {!loading &&
          apiVideos.map((video) => (
            <div
              key={video._id}
              style={{
                textAlign: "center",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              className="hover:shadow-lg hover:-translate-y-1"
            >
              <iframe
                width="100%"
                height="300"
                src={getEmbedUrl(video.video_link)}
                frameBorder="0"
                allowFullScreen
                title={video.title}
                className="rounded-md"
              ></iframe>
            </div>
          ))}
      </div>
    </section>
  );
}
