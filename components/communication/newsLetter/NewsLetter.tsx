"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";

interface Newsletter {
  _id: string;
  title: string;
  monthYear: string; // "2026-01"
  image: string;
  pdf: string;
  order_by: number;
  status: string;
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
              (a.order_by ?? 0) - (b.order_by ?? 0)
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
      { month: "long", year: "numeric" }
    );
  };

  // 🔥 VIEW PDF IN NEW TAB (GOOGLE DOCS VIEWER)
  const openPdfInNewTab = (pdfUrl: string) => {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;

    window.open(viewerUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-gray-50">
    {/* ================= BANNER ================= */}
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home/Newsletter.jpg')" }}
    >
      <div className="bg-black/20 w-full h-full md:h-[250px] py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-white">News Letter</h2>
          <p className="text-white mt-1">
            <Link
              href="/"
              className="text-[#DF562C] font-medium hover:underline"
            >
              Home
            </Link>{" "}
            / News Letter
          </p>
        </div>
      </div>
    </div>

    {/* ================= HEADER ================= */}
    <div className="w-full p-2 md:px-6 lg:px-6 text-center">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4">
        News Letter{" "}
        <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
          Collection
        </span>
      </h2>

      <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
        “Explore our monthly newsletters capturing key updates, activities,
        and inspiring moments from our mission-driven journey.”
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
    </div>

    {/* ================= GRID ================= */}
    <div className="w-full p-2 lg:px-6 py-6">
      {loading && (
        <p className="text-center text-gray-500">Loading newsletters...</p>
      )}

      {!loading && newsletters.length === 0 && (
        <p className="text-center text-gray-500">No newsletters available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newsletters.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-md overflow-hidden hover:shadow-2xl transition"
          >
            {/* Thumbnail */}
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={500}
              className="w-full h-80 object-cover"
            />

            {/* Buttons */}
            <div className="flex justify-center gap-6 mt-3">
              {/* VIEW → NEW TAB (SHOW PDF) */}
              <button
                onClick={() => openPdfInNewTab(item.pdf)}
                className="text-sm font-medium text-gray-600 hover:underline"
              >
                VIEW
              </button>

              {/* DOWNLOAD → DOWNLOAD ONLY */}
              <a
                href={item.pdf}
                download
                className="text-sm font-medium text-blue-800 hover:underline"
              >
                DOWNLOAD
              </a>
            </div>

            {/* Month */}
            <h4 className="text-center mt-2 font-semibold text-gray-800">
              {formatMonthYear(item.monthYear)}
            </h4>

            <p className="text-center text-xs text-gray-600 mb-4">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default NewsLetter;
