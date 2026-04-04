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
  description?: string;
  category?: string;
}

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

const NewsLetter = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

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

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/communication/newsLetter")}`,
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

  /* ================= HELPERS ================= */
  const formatMonthYear = (value: string) => {
    if (!value || !value.includes("-")) return "";
    const [year, month] = value.split("-");
    const yearNum = Number(year);
    const monthNum = Number(month) - 1;
    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 0 || monthNum > 11)
      return "";
    return new Date(yearNum, monthNum).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // 🔥 VIEW PDF IN NEW TAB (GOOGLE DOCS VIEWER)
  const openPdfInNewTab = (pdfUrl: string) => {
    if (!pdfUrl) return;
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl,
    )}&embedded=true`;

    window.open(viewerUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= BANNER ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner || "/home/Newsletter.jpg"}')`,
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
              {seoData?.h1tag || "News Letter"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              / {seoData?.h1tag || "News Letter"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative py-2 md:py-4 px-4 md:px-12 lg:px-12 bg-white overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-tight">
              News Letter{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Collection
              </span>
            </h2>

            <p className="text-gray-600 text-[13px] md:text-sm italic leading-relaxed">
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
            className="w-full h-1  bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="py-1 md:py-2"
          >
            <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
              Our Newsletter keeps you connected with the latest updates,
              events, and initiatives, reflecting our ongoing journey of
              service, spirituality, and community engagement. It brings
              together inspiring stories, important announcements, and
              highlights of activities that showcase our commitment to
              meaningful impact and cultural values. Through regular updates,
              readers can stay informed and inspired by the work being carried
              forward with dedication and purpose.
              <strong>
                {" "}
                Subscribe to stay connected and be a part of our mission of
                spreading awareness, positivity, and collective growth.
              </strong>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            animate={!loading && newsletters.length > 0 ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {newsletters.map((item, index) => (
              <motion.div
                key={item._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(12,85,160,0.3)] transition-all duration-300 flex flex-col w-full"
              >
                {/* Modern Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0C55A0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0C55A0] to-[#2E86DE] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                {/* Thumbnail Container - Readable & Full Width */}
                <div className="relative overflow-hidden w-full aspect-[3/4] bg-white border-b border-gray-100 p-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.image || ""}`
                      }
                      alt={item?.image_alt || item.title}
                      fill
                      unoptimized
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                    />
                  </div>
                </div>

                {/* Content Section - High Density */}
                <div className="p-4 flex flex-col flex-1 bg-white relative">
                  {/* Title with Blue Dot */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0C55A0] flex-shrink-0" />
                    <h3 className="text-base font-bold text-gray-800 tracking-tight leading-tight">
                      {formatMonthYear(item.monthYear)}
                    </h3>
                  </div>

                  {/* Action Buttons - Shorter */}
                  <div className="flex gap-2.5 mt-auto">
                    <button
                      onClick={() => item.pdf && openPdfInNewTab(item.pdf)}
                      disabled={!item.pdf}
                      className="flex-1 rounded-lg bg-[#0C55A0] py-2 text-xs font-bold text-white transition-all hover:bg-[#2E86DE]"
                    >
                      View
                    </button>

                    <a
                      href={item.pdf || "#"}
                      download={!!item.pdf}
                      className="flex-1 rounded-lg border-2 border-[#0C55A0] py-2 text-center text-xs font-bold text-[#0C55A0] transition-all hover:bg-[#0C55A0] hover:text-white"
                    >
                      Download
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
