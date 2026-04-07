"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

export default function BlogSlugClient({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

  /* ================= FETCH BLOG BY SLUG ================= */
  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await axiosClient.get("/blog");
        const data = res?.data?.data || [];

        const matched = data.find(
          (item: Blog) => item.slug === slug && item.status === "Active",
        );

        setBlog(matched || null);
      } catch (error) {
        console.error("Blog Slug API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/blog")}`,
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

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading blog...
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-800">Blog not found</h2>
        <Link
          href="/communication/blog"
          className="mt-3 text-sm text-[#7a0d0d] hover:underline"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= TOP BREADCRUMB BANNER ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner
            ? seoData.page_banner.startsWith("http")
              ? seoData.page_banner
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
            : "/home/blog.jpeg"
            }')`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative w-full h-42 md:h-56 flex items-center justify-center">
          <div className="w-full px-4 text-center z-10 text-white">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-wide drop-shadow-lg">
              {seoData?.h1tag || "Our Blogs"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              -{" "}
              <Link href="/communication/blog" className="hover:underline">
                {seoData?.h1tag || "Blogs"}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ================= FEATURE IMAGE ================= */}
      <div className="w-full max-w-5xl mx-auto mt-6">
        {/* Image */}
        <div className="w-full h-[260px] md:h-[380px] overflow-hidden rounded-md">
          <Image
            src={blog.image}
            alt={blog.title}
            width={1200}
            height={700}
            unoptimized
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Meta Content BELOW image */}
        <div className="px-2 md:px-0 mt-6">
          {/* Category */}
          <span className="inline-block bg-[#7a0d0d] text-white px-3 py-1 rounded-full text-xs uppercase">
            {blog.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 leading-snug">
            {blog.title}
          </h1>

          {/* Author + Date */}
          <p className="text-sm text-gray-600 mt-2">
            By{" "}
            <span className="font-medium">
              {blog.author || "Krishnayan Team"}
            </span>{" "}
            •{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* ================= BLOG CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-4 py-2 md:py-6 lg:py-6 bg-white shadow-sm my-4 rounded-md">
        <div
          className="prose prose-lg max-w-none
            prose-p:text-gray-700
            prose-p:leading-relaxed
            prose-strong:text-gray-900
            prose-a:text-[#7a0d0d]
            prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* BACK LINK */}
        <div className="mt-12 border-t pt-6">
          <Link
            href="/communication/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7a0d0d] hover:underline"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
