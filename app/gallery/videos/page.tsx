"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const videos = [
  {
    id: 1,
    title: "IYFF (Swarg Ya Narak)",
    url: "https://www.youtube.com/embed/hBfHq6cZqX4",
    date: "2025-01-10",
  },
  {
    id: 2,
    title: "IYFF (Scent of Yoga)",
    url: "https://www.youtube.com/embed/TlSnslCZFcs",
    date: "2025-02-15",
  },
  {
    id: 3,
    title: "Health & Wellness Campaign",
    url: "https://www.youtube.com/embed/zaehBJYSy5s",
    date: "2025-03-20",
  },
  {
    id: 4,
    title: "Yoga For Humanity",
    url: "https://www.youtube.com/embed/O0Ii0E7h-BQ",
    date: "2025-04-12",
  },
];

export default function VideoGallery() {
  return (
    <section className="bg-gray-50 ">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/video.jpeg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white">
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

      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg md:text-xl lg:text-xl font-medium text-center mt-6 ">
          Videos Gallery
        </h1>

        {/* ===== Video Grid ===== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-[#f36b2a]/10"
            >
              {/* Video Frame */}
              <div className="relative overflow-hidden group aspect-video">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full group-hover:scale-103 transition-transform duration-700 ease-in-out"
                ></iframe>
              </div>

              {/* Title + Date */}
              <div className="py-3 px-4 text-center bg-white">
                <h3 className="text-[#DF562C] font-medium text-base mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-700">📅 {video.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
