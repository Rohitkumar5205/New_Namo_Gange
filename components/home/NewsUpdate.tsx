"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import fetchClient from "@/lib/fetchClient";

interface Blog {
  _id: string;
  title: string;
  image: string;
  description: string;
  createdAt?: string;
  status?: string;
  image_alt?: string;
  slug?: string;
}

interface BlogCard {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
  image_alt?: string;
  slug?: string;
}

const NewsUpdate = () => {
  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetchClient.get("/blog");

        const data: Blog[] = res?.data?.data || [];

        const parser = new DOMParser();

        const fetchedData: BlogCard[] = data
          .filter((item) => item.status === "Active")
          .sort(
            (a, b) =>
              new Date(b.createdAt || "").getTime() -
              new Date(a.createdAt || "").getTime(),
          )
          .slice(0, 4)
          .map((item) => {
            let description = item.description || "";
            const decoded = parser.parseFromString(description, "text/html");
            description = decoded.body.textContent || "";

            return {
              id: item._id,
              title: item.title,
              image: item.image,
              image_alt: item.image_alt,
              description: description.replace(/<[^>]+>/g, ""),
              slug: item?.slug,
              date: new Date(item.createdAt || "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            };
          });

        setBlogs(fetchedData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="w-full relative py-6 md:py-12 bg-gray-50 overflow-hidden">
      <div className="w-full px-4 md:px-12 lg:px-12">
        {/* Header */}
        <div




          className="text-center"
        >
          <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            Blogs{" "}
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Updates
            </span>
          </h2>
          <p className="text-[13px] md:text-[15px] text-medium text-gray-800 italic py-1">
            “Serving Humanity, Preserving Nature, Awakening Divinity.”
          </p>
        </div>

        {/* Top Text */}
        <div




          className="flex justify-center w-full mt-4 mb-8"
        >
          <div className="w-full mx-auto relative overflow-hidden text-center rounded-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
            <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal py-2">
              Stay informed with the latest updates, highlights, and impactful
              stories from our Trust. We are committed to maintaining
              transparency and keeping our stakeholders, community members, and
              supporters engaged with regular communications about our ongoing
              projects, achievements, and initiatives. Through comprehensive
              reporting and meaningful narratives, we showcase how our work
              directly contributes to environmental conservation, social
              welfare, and sustainable development.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-4 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            No blog updates available.
          </p>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"




          >
            {blogs.map((item, i) => (
              <div
                key={item.id}


                className="group relative bg-gray-50 rounded-xl border border-gray-100 overflow-hidden shadow-xl
                hover:shadow-2xl transition-shadow duration-400 flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 bg-white border-b border-gray-50 overflow-hidden">
                  <Image
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.image}`
                    }
                    alt={item.image_alt || item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain object-center transition-transform duration-700 ease-in-out group-hover:scale-101 p-1"
                  />
                </div>

                {/* Content */}
                <div className="p-4 md:p-5 text-left flex flex-col flex-1 bg-white relative z-10">
                  <div className="flex items-center gap-1.5 text-[#f36b2a] text-[11px] md:text-xs font-semibold mb-2 md:mb-3 uppercase tracking-wider">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#1e7ed3] transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-justify text-xs md:text-sm line-clamp-3 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <Link
                    href={`/communication/blog/${item?.slug || "#"}`}
                    className="mt-auto pt-1 border-t border-gray-100 flex items-center justify-between group/link"
                    aria-label={`Read more about ${item.title}`}
                  >
                    <span className="text-xs md:text-sm font-semibold text-[#0C55A0] group-hover/link:text-[#f36b2a] transition-colors duration-300">
                      Read More..
                    </span>
                 
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default NewsUpdate;
