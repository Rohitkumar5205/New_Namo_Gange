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

      <div className="w-full px-2 md:px-12  lg:px-12 text-center">
        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Our{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Blogs
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            "Each event reflects our mission to uplift society through
            spirituality, health, culture, environmental awareness, and
            community empowerment."
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        {/* 🔍 SEARCH BAR */}
        <div className="w-full flex justify-end mt-2">
          <div className="relative w-full md:w-[60%] lg:w-[40%] xl:w-[30%]">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-12 pr-4 p-1.5 md:py-2.5 lg:py-2.5
                 rounded-xl border border-gray-300 
                 shadow-sm focus:shadow-md 
                 focus:border-[#0C55A0] 
                 transition-all duration-200 
                 text-sm md:text-base"
            />
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* 🔥 BLOG GRID */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-2">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-md shadow-md hover:shadow-xl transition overflow-hidden"
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
        <div className="flex justify-center gap-2 py-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border hover:bg-gray-100 disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-full font-medium transition-all
      ${
        currentPage === i + 1
          ? "bg-[#0C55A0] text-white shadow-md"
          : "bg-white border hover:bg-gray-100"
      }
    `}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border hover:bg-gray-100 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
