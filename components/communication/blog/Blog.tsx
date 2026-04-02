"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MessageCircle, Loader2 } from "lucide-react";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  image: string;
  description: string;
  status: string;
  createdAt: string;
  image_alt?: string;
}

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

const Blog = () => {
  const itemsPerPage = 3;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/blog");

        // Add null check for response
        if (!res?.data?.data) {
          console.warn("No data received from blog endpoint");
          setBlogs([]);
          return;
        }

        const data = res.data.data;

        // Ensure data is an array
        const blogArray = Array.isArray(data) ? data : [];

        // ✅ only Active blogs with proper validation
        const activeBlogs = blogArray.filter(
          (item: Blog) => item && item.status === "Active",
        );

        setBlogs(activeBlogs);
      } catch (error) {
        console.error("Blog API Error:", error);
        setBlogs([]); // Set empty array on error
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/communication/blog")}`,
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
        console.error("Error fetching SEO data for blog:", error);
      } finally {
        setSeoLoading(false);
      }
    };
    fetchSEOData();
  }, []);

  const stripHtmlTags = (html: string = ""): string => {
    if (typeof window === "undefined") return html;
    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    } catch (error) {
      console.error("Error stripping HTML tags:", error);
      return html;
    }
  };

  /* ================= SEARCH FILTER ================= */
  const filteredBlogs = useMemo(() => {
    if (!search.trim()) return blogs;

    const searchLower = search.toLowerCase().trim();
    return blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(searchLower) ||
        b.category?.toLowerCase().includes(searchLower),
    );
  }, [blogs, search]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / itemsPerPage),
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Handle image error
  const handleImageError = (blogId: string) => {
    setImageErrors((prev) => ({ ...prev, [blogId]: true }));
  };

  // Loading skeleton component
  const BlogSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
      <div className="w-full h-48 md:h-56 bg-gray-200" />
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-6 w-16 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
        <div className="h-5 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );

  // Don't render anything during initial loading
  if (initialLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Banner Skeleton */}
        <div className="w-full bg-gray-200 h-42 md:h-56 animate-pulse" />

        <div className="relative py-1.5 md:py-3 px-2 md:px-12 lg:px-12 bg-white">
          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto" />
            <div className="h-1 w-full bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>

            {/* Search Skeleton */}
            <div className="flex justify-end">
              <div className="w-full md:w-[30%] h-10 bg-gray-200 rounded-lg" />
            </div>

            {/* Blog Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-4">
              {[1, 2, 3].map((i) => (
                <BlogSkeleton key={i} />
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
          backgroundImage: `url('${seoData?.page_banner || "/home/blog.jpeg"}')`,
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
              {seoData?.h1tag || "Our Blogs"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "Blogs"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative py-1.5 md:py-3 px-2 md:px-12 lg:px-12 bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full text-center"
        >
          <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              Blogs
            </span>
          </h2>

          <p className="text-gray-600 text-[13px] md:text-sm italic leading-relaxed">
            "Each event reflects our mission to uplift society through
            spirituality, health, culture, and community empowerment."
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
          {/* <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
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

          <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
            Our Blogs section offers thoughtful insights, inspiring stories, and
            knowledge-rich articles that reflect our values of spirituality,
            culture, and selfless service. Through engaging content, we aim to
            share meaningful perspectives on life, traditions, and personal
            growth, helping readers connect with deeper wisdom and conscious
            living. Each blog is crafted to inform, inspire, and encourage a
            positive outlook rooted in timeless principles.
            <strong>
              {" "}
              Explore our blogs to discover ideas that nurture awareness, enrich
              understanding, and guide you on a path of purpose and growth.
            </strong>
          </p>
        </motion.div>

        {/* ================= SEARCH ================= */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full flex justify-end py-1 md:py-3"
        >
          <div className="relative w-full md:w-[30%] lg:w-[25%] group">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by title or category..."
              className="w-full pl-12 pr-4 py-1.5 rounded-lg border border-gray-300
                shadow-sm focus:border-[#0C55A0] focus:ring-1 focus:ring-[#0C55A0]/20 text-sm md:text-base transition-all duration-300 outline-none"
              disabled={loading}
            />
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#0C55A0] transition-colors"
            />
          </div>
        </motion.div>

        {/* ================= LOADING STATE ================= */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-4">
            {[1, 2, 3].map((i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              {search
                ? "No blogs match your search criteria."
                : "No blogs found."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-[#DF562C] hover:text-[#0C55A0] transition-colors font-medium"
              >
                Clear search
              </button>
            )}
          </motion.div>
        )}

        {/* ================= BLOG GRID ================= */}
        {!loading && filteredBlogs.length > 0 && (
          <motion.div
            className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-4"
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
            {currentBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col relative"
              >
                {/* IMAGE */}
                <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-100">
                  {!imageErrors[blog._id] ? (
                    <Image
                      src={
                        blog.image?.startsWith("http")
                          ? blog.image
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${blog.image || ""}`
                      }
                      alt={blog?.image_alt || blog.title || "Blog image"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => handleImageError(blog._id)}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400 text-sm">
                        Image not available
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                  <span className="absolute top-3 left-3 bg-[#DF562C] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                    {blog.category || "Uncategorized"}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5 text-left flex flex-col flex-1">
                  <div className="text-xs text-gray-500 flex justify-between items-center mb-3 font-medium">
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {blog.author || "Krishnayan Team"}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <MessageCircle size={14} /> 0
                    </span>
                  </div>

                  <h2 className="text-gray-900 font-normal text-base md:text-lg mb-2 line-clamp-2 group-hover:text-[#0C55A0] transition-colors">
                    {blog.title || "Untitled"}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1 text-justify">
                    {stripHtmlTags(blog.description) ||
                      "No description available."}
                  </p>

                  <Link
                    href={`/communication/blog/${blog.slug || "#"}`}
                    className="mt-auto inline-block"
                  >
                    <span className="text-sm font-semibold text-[#DF562C] hover:text-[#0C55A0] flex items-center gap-1 transition-colors group/link">
                      READ MORE{" "}
                      <span className="transition-transform group-hover/link:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ================= PAGINATION ================= */}
        {!loading && filteredBlogs.length > 0 && totalPages > 1 && (
          <div className="flex justify-center gap-3 py-8 md:py-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-white border border-gray-200 text-gray-600 hover:bg-[#0C55A0] hover:text-white hover:border-[#0C55A0] 
                transition-all duration-300 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 shadow-sm"
              aria-label="Previous page"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all duration-300 shadow-sm
                  ${
                    currentPage === i + 1
                      ? "bg-[#0C55A0] text-white border border-[#0C55A0] scale-110"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                aria-label={`Go to page ${i + 1}`}
                aria-current={currentPage === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-white border border-gray-200 text-gray-600 hover:bg-[#0C55A0] hover:text-white hover:border-[#0C55A0] 
                transition-all duration-300 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 shadow-sm"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
