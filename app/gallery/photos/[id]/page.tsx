"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ===== Mock Gallery Data =====
const galleryByCategory: Record<string, string[]> = {
  activity: ["/gallery/a1.jpg", "/gallery/a2.jpg", "/gallery/a3.jpg"],
  annadaan: ["/gallery/an1.jpg", "/gallery/an2.jpg", "/gallery/an3.jpg"],
  "cng-plant": ["/gallery/c1.jpg", "/gallery/c2.jpg"],
  events: ["/gallery/e1.jpg", "/gallery/e2.jpg", "/gallery/e3.jpg"],
  gaushala: ["/gallery/g1.jpg", "/gallery/g2.jpg", "/gallery/g3.jpg"],
  "vedic-dham": ["/gallery/v1.jpg", "/gallery/v2.jpg", "/gallery/v3.jpg"],
  "yagya-pooja": [
    "/gallery/y1.jpg",
    "/gallery/y2.jpg",
    "/gallery/y3.jpg",
    "/gallery/y4.jpg",
    "/gallery/y5.jpg",
    "/gallery/y6.jpg",
  ],
};

export default function EventCategoryPage() {
  const params = useParams();

  // Normalize id → string
  const slug = Array.isArray(params.id) ? params.id[0] : params.id || "";

  // Generate Title
  const title = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Gallery";

  // Fetch Images
  const images = galleryByCategory[slug] || [];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className=" bg-gray-50">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/ourActivities/ourActivities5.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/60 w-full h-full py-10 md:h-[250px] md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              {title}
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/gallery/photos"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Back
              </Link>{" "}
              - {title}
            </p>
          </div>
        </div>
      </div>
      <div className=" max-w-7xl mx-auto ">
        {/* Back Link */}
        {/* <Link href="/gallery/photos" className="hover:text-[#DF562C] text-base">
          ← Back
        </Link> */}

        {/* Title */}
        <h1 className="text-lg md:text-xl lg:text-xl font-medium text-center mt-6 capitalize decoration-[#f36b2a]">
          {title}
        </h1>

        {/* If No Images */}
        {images.length === 0 ? (
          <p className="text-center text-gray-500">
            No images available for this category.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6 gap-6">
            {images.map((src, i) => (
              <div
                key={i}
                onClick={() => setSelected(src)}
                className="cursor-pointer overflow-hidden rounded shadow-md hover:shadow-xl transition"
              >
                <div className="relative w-full aspect-square group">
                  <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Viewer */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-[#f36b2a]"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            {/* Enlarged Image */}
            <div className="relative w-[90vw] max-w-6xl h-[80vh] flex items-center justify-center">
              <Image
                src={selected}
                alt="Selected"
                fill
                className="object-contain rounded-lg"
              />
            </div>

            {/* Caption */}
            <p className="text-white mt-4 text-sm opacity-80">
              Click anywhere to close
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
