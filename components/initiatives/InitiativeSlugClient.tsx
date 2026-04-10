"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import fetchClient from "@/lib/fetchClient";

interface Initiative {
  _id: string;
  title: string;
  slug: string;
  image: string;
  desc: string;
  status: string;
  createdAt: string;
  image_alt?: string;
}

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

export default function InitiativeSlugClient({ slug }: { slug: string }) {
  const [initiative, setInitiative] = useState<Initiative | null>(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState<SEOData | null>(null);

  /* ================= FETCH INITIATIVE BY SLUG ================= */
  useEffect(() => {
    if (!slug) return;

    const fetchInitiative = async () => {
      try {
        const res = await fetchClient.get("/initiatives");
        const data = res?.data?.data || [];

        const matched = data.find(
          (item: Initiative) => item.slug === slug && item.status === "Active",
        );

        setInitiative(matched || null);
      } catch (error) {
        console.error("Initiative Slug API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiative();
  }, [slug]);

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await fetchClient.get(
          `/seo/page/${encodeURIComponent("/initiatives")}`,
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
        console.error("Error fetching SEO data for initiative:", error);
      }
    };
    fetchSEOData();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading initiative...
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!initiative) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-800">Initiative not found</h2>
        <Link
          href="/initiatives"
          className="mt-3 text-sm text-[#7a0d0d] hover:underline"
        >
          ← Back to Initiatives
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
            : "/OurInitiatives/initbanner.jpg"
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
              {seoData?.h1tag || "Our Initiatives"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              -{" "}
              <Link href="/initiatives" className="hover:underline">
                {seoData?.h1tag || "Our Initiatives"}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ================= FEATURE IMAGE ================= */}
      <div className="w-full max-w-5xl mx-auto mt-6">
        {/* Image */}
        <div className="w-full h-[260px] md:h-[380px] overflow-hidden rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
          <Image
            src={
              initiative.image?.startsWith("http")
                ? initiative.image
                : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${initiative.image}`
            }
            alt={initiative.image_alt || initiative.title}
            width={1200}
            height={700}
            unoptimized
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Meta Content BELOW image */}
        <div className="px-4 md:px-0 mt-6 text-center">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 leading-snug">
            {initiative.title}
          </h1>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-4 py-4 md:py-6 lg:py-6 bg-white shadow-sm my-4 rounded-md">
        <div
          className="prose prose-lg max-w-none
            prose-p:text-gray-700
            prose-p:leading-relaxed
            prose-strong:text-gray-900
            prose-a:text-[#7a0d0d]
            prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: initiative.desc }}
        />

        {/* BACK LINK */}
        <div className="mt-12 border-t pt-6">
          <Link
            href="/initiatives"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7a0d0d] hover:underline"
          >
            ← Back to Initiatives
          </Link>
        </div>
      </div>
    </div>
  );
}