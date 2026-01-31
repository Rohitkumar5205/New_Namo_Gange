"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";
import axiosClient from "@/lib/axiosClient";

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
          (item: Blog) => item.status === "Active"
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

  /* ================= SEARCH FILTER ================= */
  const filteredBlogs = useMemo(() => {
    if (!search) return blogs;
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [blogs, search]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= BANNER ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/blog.jpeg')" }}
      >
        <div className="bg-black/20 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Our Blogs
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Blogs
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="w-full px-2 md:px-12 lg:px-12 text-center">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4">
          Our{" "}
          <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
            Blogs
          </span>
        </h2>

        <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
          "Each event reflects our mission to uplift society through
          spirituality, health, culture, and community empowerment."
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

        {/* ================= SEARCH ================= */}
        <div className="w-full flex justify-end mt-2">
          <div className="relative w-full md:w-[60%] lg:w-[40%] xl:w-[30%]">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              type="text"
              placeholder="Search here..."
              className="w-full pl-12 pr-4 p-2 rounded-xl border border-gray-300
            shadow-sm focus:border-[#0C55A0] text-sm md:text-base"
            />
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* ================= BLOG GRID ================= */}
        {loading && (
          <p className="text-center text-gray-500 mt-6">Loading blogs...</p>
        )}

        {!loading && currentBlogs.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No blogs found.</p>
        )}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          {currentBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-md shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />

                <span className="absolute top-3 left-3 bg-[#7a0d0d] text-white text-xs px-3 py-1 rounded-full shadow">
                  {blog.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4 text-left">
                <div className="text-xs text-gray-600 flex justify-between">
                  <span>{blog.author || "Krishnayan Team"}</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} /> 0
                  </span>
                </div>

                <h3 className="mt-2 font-semibold text-gray-800 text-lg line-clamp-2">
                  {blog.title}
                </h3>

                <p
                  className="text-sm text-gray-600 mt-2 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: blog.description,
                  }}
                />

                <Link
                  href={`/communication/blog/${blog.slug}`}
                  className="inline-block mt-3 text-xs font-medium text-[#7a0d0d] hover:underline tracking-wide"
                >
                  READ MORE →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-center gap-2 py-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="w-9 h-9 flex items-center justify-center rounded-full 
  bg-white border hover:bg-gray-100 disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: totalPages || 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-full font-medium transition-all
      ${
        currentPage === i + 1
          ? "bg-[#0C55A0] text-white shadow-md"
          : "bg-white border hover:bg-gray-100"
      }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 1}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-full 
  bg-white border hover:bg-gray-100 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
