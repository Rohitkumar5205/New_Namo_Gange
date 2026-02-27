"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

interface Newsletter {
  _id: string;
  title: string;
  monthYear: string; // "2026-01"
  image: string;
  pdf: string;
  order_by: number;
  status: string;
  image_alt?: string;
}

const NewsLetter = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH NEWSLETTERS ================= */
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await axiosClient.get("/newsletters");
        const data = res?.data?.data || [];

        const activeData = data
          .filter((item: Newsletter) => item.status === "Active")
          .sort(
            (a: Newsletter, b: Newsletter) =>
              (a.order_by ?? 0) - (b.order_by ?? 0),
          );

        setNewsletters(activeData);
      } catch (error) {
        console.error("❌ Newsletter API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  /* ================= HELPERS ================= */
  const formatMonthYear = (value: string) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      "en-US",
      { month: "long", year: "numeric" },
    );
  };

  // 🔥 VIEW PDF IN NEW TAB (GOOGLE DOCS VIEWER)
  const openPdfInNewTab = (pdfUrl: string) => {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl,
    )}&embedded=true`;

    window.open(viewerUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= BANNER ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/Newsletter.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-black/40 w-full h-full md:h-[250px] py-14 backdrop-blur-[2px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider drop-shadow-lg">
              News Letter
            </h2>
            <p className="text-white mt-2 text-lg font-light tracking-wide">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              / News Letter
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative py-8 md:py-12 px-4 md:px-12 lg:px-12 bg-white overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
              News Letter{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Collection
              </span>
            </h2>

            <p className="text-gray-600 text-sm md:text-base italic leading-relaxed mt-2">
              “Explore our monthly newsletters capturing key updates,
              activities, and inspiring moments from our mission-driven
              journey.”
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full h-1 mt-4 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="py-6 md:py-8"
          >
            <p className="text-gray-700 text-sm md:text-base text-justify leading-relaxed font-normal">
              This initiative reflects a deep commitment to spiritual awareness,
              cultural values, and selfless service. Rooted in the eternal grace
              of
              <strong> Maa Gange and Lord Krishna</strong>, it seeks to inspire
              individuals toward inner awakening, compassion, and conscious
              living. Through thoughtful guidance, reflective teachings, and
              value-based initiatives, this journey encourages people to
              reconnect with the timeless wisdom of Sanatan Dharma and apply it
              meaningfully in everyday life.
            </p>
          </motion.div>
        </div>

        {/* ================= GRID ================= */}
        <div className="w-full py-4">
          {loading && (
            <p className="text-center text-gray-500">Loading newsletters...</p>
          )}

          {!loading && newsletters.length === 0 && (
            <p className="text-center text-gray-500">
              No newsletters available.
            </p>
          )}

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
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
          >
            {newsletters.map((item) => (
              <motion.div
                key={item._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col relative"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                {/* Thumbnail */}
                <div className="relative overflow-hidden w-full h-56 md:h-64 bg-gray-100">
                  <Image
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.image}`
                    }
                    alt={item?.image_alt || item.title}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Month */}
                  <h4 className="text-center text-lg font-bold text-gray-800 mb-1 group-hover:text-[#DF562C] transition-colors">
                    {formatMonthYear(item.monthYear)}
                  </h4>

                  <p className="text-center text-sm text-gray-500 mb-6 line-clamp-2 flex-1">
                    {item.title}
                  </p>

                  {/* Buttons */}
                  <div className="flex justify-center gap-4 mt-auto">
                    {/* VIEW → NEW TAB (SHOW PDF) */}
                    <button
                      onClick={() => openPdfInNewTab(item.pdf)}
                      className="flex-1 py-2 px-4 text-xs md:text-sm font-medium text-white bg-[#0C55A0] rounded-lg shadow hover:bg-[#0a4786] transition-all duration-300 hover:shadow-md"
                    >
                      VIEW
                    </button>

                    {/* DOWNLOAD → DOWNLOAD ONLY */}
                    <a
                      href={item.pdf}
                      download
                      className="flex-1 py-2 px-4 text-xs md:text-sm font-medium text-[#0C55A0] border border-[#0C55A0] rounded-lg text-center hover:bg-[#0C55A0] hover:text-white transition-all duration-300"
                    >
                      DOWNLOAD
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
