"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, User, Loader2 } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  publisher: string;
  img: string;
  logo: string;
  desc: string;
  rawDate?: string;
}

interface Publisher {
  _id: string;
  name: string;
}

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

export default function LatestNewsPage() {
  const [search, setSearch] = useState("");
  const [publisherFilter, setPublisherFilter] = useState("");
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newsRes, pubRes] = await Promise.all([
          axiosClient.get("/recent-updates"),
          axiosClient.get("/published"),
        ]);

        // Process news data with proper validation
        if (newsRes?.data?.data && Array.isArray(newsRes.data.data)) {
          const parser = new DOMParser();
          const mappedNews = newsRes.data.data
            .filter((item: any) => item && item.status === "Active")
            .map((item: any) => {
              let description = item.description || "";
              try {
                const decoded = parser.parseFromString(
                  description,
                  "text/html",
                );
                description = decoded.body?.textContent || "";
              } catch (e) {
                console.error("Error parsing description:", e);
              }

              // Parse date safely
              let formattedDate = "Date not available";
              try {
                if (item.date) {
                  const dateObj = new Date(item.date);
                  if (!isNaN(dateObj.getTime())) {
                    formattedDate = dateObj.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }
                }
              } catch (e) {
                console.error("Error formatting date:", e);
              }

              return {
                id: item._id || `news-${Math.random()}`,
                title: item.title || "Untitled",
                rawDate: item.date,
                date: formattedDate,
                publisher: item.published_by || "Namo Gange",
                img: item.image || "",
                logo: "/logo.png", // Fallback logo
                desc:
                  description.replace(/<[^>]+>/g, "").trim() ||
                  "No description available.",
              };
            });
          setNewsList(mappedNews);
        } else {
          setNewsList([]);
        }

        // Process publishers
        if (pubRes?.data?.data && Array.isArray(pubRes.data.data)) {
          setPublishers(pubRes.data.data);
        } else {
          setPublishers([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNewsList([]);
        setPublishers([]);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/communication/latestNews")}`,
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
        console.error("Error fetching SEO data for latest news:", error);
      } finally {
        setSeoLoading(false);
      }
    };
    fetchSEOData();
  }, []);

  // Handle image errors
  const handleImageError = (id: string, type: "news" | "logo") => {
    if (type === "news") {
      setImageErrors((prev) => ({ ...prev, [id]: true }));
    } else {
      setLogoErrors((prev) => ({ ...prev, [id]: true }));
    }
  };

  // Filter news with useMemo for performance
  const filteredNews = useMemo(() => {
    if (!newsList.length) return [];

    return newsList.filter((item) => {
      const s = search.toLowerCase().trim();
      const matchSearch =
        !s ||
        item.title.toLowerCase().includes(s) ||
        item.desc.toLowerCase().includes(s) ||
        item.publisher.toLowerCase().includes(s);

      const matchPublisher =
        !publisherFilter || item.publisher === publisherFilter;

      return matchSearch && matchPublisher;
    });
  }, [newsList, search, publisherFilter]);

  // Reset publisher filter when no publishers exist
  useEffect(() => {
    if (publishers.length === 0) {
      setPublisherFilter("");
    }
  }, [publishers]);

  // Loading skeleton component
  const NewsSkeleton = () => (
    <div className="group bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row gap-6 border border-gray-100 animate-pulse">
      <div className="md:w-1/3 w-full h-48 md:h-56 relative rounded-xl overflow-hidden bg-gray-200" />
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="w-24 h-12 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );

  if (initialLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Banner Skeleton */}
        <div className="w-full bg-gray-300 h-[300px] animate-pulse" />

        <div className="relative py-8 md:py-12 px-4 md:px-12 lg:px-12 bg-gray-50">
          <div className="space-y-6">
            <div className="h-10 w-96 bg-gray-200 rounded mx-auto" />
            <div className="h-16 w-3/4 bg-gray-200 rounded mx-auto" />
            <div className="h-1 w-full bg-gray-200 rounded" />
            <div className="h-20 w-full bg-gray-200 rounded" />

            {/* Filter Skeletons */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="h-12 w-full md:w-56 bg-gray-200 rounded-lg" />
              <div className="h-12 w-full md:w-80 bg-gray-200 rounded-lg" />
            </div>

            {/* News Skeletons */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <NewsSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative w-full h-42 md:h-56 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full px-4 text-center z-10"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-wide drop-shadow-lg">
              {seoData?.h1tag || "Latest News"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "Latest News"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative py-2 md:py-4 px-4 md:px-12 lg:px-12 bg-white overflow-hidden">
        {/* ---------- HEADING ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-tight">
            Latest News{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              And Updates
            </span>
          </h2>
          <p className="text-gray-600 text-[13px] md:text-sm italic leading-relaxed mt-1">
            Stay connected with our latest activities, inspiring stories, and
            important updates that reflect our ongoing mission toward social
            upliftment and community well-being.
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full mt-2"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* <p className="text-gray-700 mt-2 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
            This initiative reflects a deep commitment to spiritual awareness,
            cultural values, and selfless service. Rooted in the eternal grace
            of
            <strong className="text-[#DF562C]">
              {" "}
              Maa Gange and Lord Krishna
            </strong>
            , it seeks to inspire individuals toward inner awakening,
            compassion, and conscious living. Through thoughtful guidance,
            reflective teachings, and value-based initiatives, this journey
            encourages people to reconnect with the timeless wisdom of Sanatan
            Dharma and apply it meaningfully in everyday life.
          </p> */}
          <p className="text-gray-700 mt-2 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
  Stay informed with our Latest News & Updates, where we share important
  announcements, recent activities, and ongoing initiatives that reflect our
  commitment to service, culture, and community development. This section brings
  you closer to the impactful work being carried out, highlighting key moments,
  achievements, and events that shape our journey.
  <strong className="text-[#DF562C]">
    {" "}
    Explore updates to stay connected, informed, and inspired by our continuous
    efforts toward positive change and meaningful contribution.
  </strong>
</p>
        </motion.div>

        {/* ---------- FILTERS ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full flex flex-col md:flex-row justify-between gap-4 mt-8 mb-6"
        >
          <div className="relative w-full md:w-56 group">
            <select
              className="w-full appearance-none border border-gray-300 px-4 py-1.5 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-[#DF562C]/20 focus:border-[#DF562C] outline-none transition-all text-sm md:text-base cursor-pointer"
              value={publisherFilter}
              onChange={(e) => setPublisherFilter(e.target.value)}
              disabled={loading || publishers.length === 0}
            >
              <option value="">All Publishers</option>
              {publishers.map((pub: Publisher) => (
                <option key={pub._id} value={pub.name}>
                  {pub.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              ▼
            </div>
          </div>

          <div className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder="Search by title, content, or publisher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#DF562C]/20 focus:border-[#DF562C] outline-none transition-all text-sm md:text-base"
              disabled={loading}
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#DF562C] transition-colors"
            />
          </div>
        </motion.div>

        {/* ---------- LOADING STATE ---------- */}
        {loading && (
          <div className="space-y-6 py-2">
            {[1, 2, 3].map((i) => (
              <NewsSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ---------- EMPTY STATE ---------- */}
        {!loading && filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              {search || publisherFilter
                ? "No news match your search criteria."
                : "No news available at the moment."}
            </p>
            {(search || publisherFilter) && (
              <button
                onClick={() => {
                  setSearch("");
                  setPublisherFilter("");
                }}
                className="mt-4 text-[#DF562C] hover:text-[#0C55A0] transition-colors font-medium"
              >
                Clear all filters
              </button>
            )}
          </motion.div>
        )}

        {/* ---------- NEWS LIST ---------- */}
        {!loading && filteredNews.length > 0 && (
          <motion.div
            className="w-full space-y-6 py-2"
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
            {filteredNews.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 border border-gray-100 transition-all duration-300"
              >
                {/* LEFT IMAGE */}
                <div className="md:w-1/3 w-full h-48 md:h-56 relative rounded-xl overflow-hidden shadow-sm bg-gray-100">
                  {!imageErrors[item.id] ? (
                    <Image
                      src={
                        item.img?.startsWith("http")
                          ? item.img
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.img || ""}`
                      }
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={() => handleImageError(item.id, "news")}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400 text-sm">
                        Image not available
                      </span>
                    </div>
                  )}
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <h3 className="text-gray-900 font-normal text-lg md:text-xl mb-2 line-clamp-2  transition-colors flex-1">
                      {item.title}
                    </h3>

                    <div className="w-24 h-12 relative flex-shrink-0">
                      {!logoErrors[item.id] ? (
                        <Image
                          src={item.logo}
                          alt={item.publisher}
                          fill
                          className="object-contain"
                          onError={() => handleImageError(item.id, "logo")}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                          <span className="text-xs text-gray-400">Logo</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500 mt-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-[#DF562C]" />
                      {item.date}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-[#0C55A0]" />
                      {item.publisher}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm md:text-base text-justify mt-4 line-clamp-3 leading-relaxed">
                    {item.desc}
                  </p>

                  <Link
                    href={`/communication/news/${item.id}`}
                    className="inline-block mt-4 text-sm font-medium text-[#DF562C] hover:text-[#0C55A0] transition-colors group/link"
                  >
                    READ MORE{" "}
                    <span className="inline-block transition-transform group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
