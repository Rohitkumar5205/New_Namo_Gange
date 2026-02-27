"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";
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

const Blog = () => {
  const itemsPerPage = 3;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosClient.get("/blog"); // ✅ blog endpoint
        const data = res?.data?.data || [];

        // ✅ only Active blogs
        const activeBlogs = data.filter(
          (item: Blog) => item.status === "Active",
        );

        setBlogs(activeBlogs);
      } catch (error) {
        console.error("❌ Blog API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const stripHtmlTags = (html: string = ""): string => {
    if (typeof window === "undefined") return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  /* ================= SEARCH FILTER ================= */
  const filteredBlogs = useMemo(() => {
    if (!search) return blogs;
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase()),
    );
  }, [blogs, search]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= BANNER ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/blog.jpeg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-black/40 w-full h-full md:h-[250px] py-10 md:py-16 backdrop-blur-[2px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
              Our Blogs
            </h2>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wide">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - Blogs
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="w-full px-4 md:px-12 lg:px-12 py-8 md:py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight mt-2">
            Our{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              Blogs
            </span>
          </h2>

          <p className="text-gray-600 py-2 text-sm md:text-base italic leading-relaxed">
            "Each event reflects our mission to uplift society through
            spirituality, health, culture, and community empowerment."
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full mt-2 mb-6"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify mt-2 mb-8">
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
        </motion.div>

        {/* ================= SEARCH ================= */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full flex justify-end mt-4 mb-6"
        >
          <div className="relative w-full md:w-[30%] lg:w-[25%] group">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              type="text"
              placeholder="Search here..."
              className="w-full pl-12 pr-4 px-4 py-2 rounded-full border border-gray-300
            shadow-sm focus:border-[#0C55A0] focus:ring-2 focus:ring-[#0C55A0]/20 text-sm md:text-base transition-all duration-300 outline-none"
            />
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#0C55A0] transition-colors"
            />
          </div>
        </motion.div>

        {/* ================= BLOG GRID ================= */}
        {loading && (
          <p className="text-center text-gray-500 mt-6">Loading blogs...</p>
        )}

        {!loading && currentBlogs.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No blogs found.</p>
        )}

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
              <div className="relative w-full h-48 md:h-56 overflow-hidden">
                <Image
                  src={
                    blog.image?.startsWith("http")
                      ? blog.image
                      : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${blog.image}`
                  }
                  alt={blog?.image_alt || blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                <span className="absolute top-3 left-3 bg-[#DF562C] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                  {blog.category}
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

                <h1 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#0C55A0] transition-colors">
                  {blog.title}
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1 text-justify">
                  {stripHtmlTags(blog.description)}
                </p>

                <Link
                  href={`/communication/blog/${blog.slug}`}
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

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-center gap-3 py-8 md:py-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full 
  bg-white border border-gray-200 text-gray-600 hover:bg-[#0C55A0] hover:text-white hover:border-[#0C55A0] transition-all duration-300 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 shadow-sm"
          >
            ‹
          </button>

          {Array.from({ length: totalPages || 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all duration-300 shadow-sm
      ${
        currentPage === i + 1
          ? "bg-[#0C55A0] text-white border border-[#0C55A0] scale-110"
          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
      }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 1}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full 
  bg-white border border-gray-200 text-gray-600 hover:bg-[#0C55A0] hover:text-white hover:border-[#0C55A0] transition-all duration-300 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 shadow-sm"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
