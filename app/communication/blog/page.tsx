"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";
import { blogs } from "@/data/blogs";

// ===================== PAGE COMPONENT =======================

export default function BlogPage() {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* biner  */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/blog.jpeg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/20 w-full h-full py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white">Blog</h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Blog
            </p>
          </div>
        </div>
      </div>

      <div className="py-8">
        <h1 className="text-lg md:text-xl lg:text-xl font-medium text-center mb-6 ">
          Our Activities & Events
        </h1>
        {/* 🔍 SEARCH BAR */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Here..."
              className="w-full pl-12 pr-4 py-3 rounded-full shadow-md border border-gray-200 focus:outline-none"
            />
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* 🔥 BLOG GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />

                <span className="absolute top-3 left-3 bg-[#7a0d0d] text-white text-xs px-3 py-1 rounded-full shadow">
                  {blog.category}
                </span>

                <div className="absolute bottom-2 left-3 flex gap-3 text-white text-xs">
                  <span>f</span>
                  <span>x</span>
                  <span>in</span>
                  <span>⧉</span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <div className="text-xs text-gray-600 flex justify-between">
                  <span>Krishnayan Team</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} /> ({blog.comments})
                  </span>
                </div>

                <h3 className="mt-2 font-semibold text-gray-800 text-lg line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {blog.desc}
                </p>

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

        {/* 🔵 PAGINATION */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            className="px-3 py-1 border rounded-full bg-white hover:bg-gray-100"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full ${
                currentPage === i + 1
                  ? "bg-[#7a0d0d] text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded-full bg-white hover:bg-gray-100"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
