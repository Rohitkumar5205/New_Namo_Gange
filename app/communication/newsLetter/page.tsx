"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Newsletter {
  id: number;
  title: string;
  month: string;
  img: string; // Thumbnail Image
  pdf: string; // PDF file for download
}

const newsletters: Newsletter[] = [
  {
    id: 1,
    title: "Monthly Newsletter",
    month: "January, 2023",
    img: "/newsletters/newsletters1.jpg",
    pdf: "/newsletters/newsletters1.pdf",
  },
  {
    id: 2,
    title: "Monthly Newsletter",
    month: "February, 2023",
    img: "/newsletters/newsletters2.jpg",
    pdf: "/newsletters/newsletters2.pdf",
  },
  {
    id: 3,
    title: "Monthly Newsletter",
    month: "November, 2022",
    img: "/newsletters/newsletters3.jpg",
    pdf: "/newsletters/newsletters3.pdf",
  },
  {
    id: 4,
    title: "Monthly Newsletter",
    month: "October, 2019",
    img: "/newsletters/newsletters4.jpg",
    pdf: "/newsletters/newsletters4.pdf",
  },
  {
    id: 5,
    title: "Monthly Newsletter",
    month: "June, 2019",
    img: "/newsletters/newsletters5.jpg",
    pdf: "/newsletters/newsletters5.pdf",
  },
];

export default function NewsletterPage() {
  const [viewImage, setViewImage] = useState<string | null>(null);

  return (
    <div className="bg-gray-50">
      {/* 📌 Banner */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/Newsletter.jpg')" }}
      >
        <div className="bg-black/20 w-full h-full md:h-[250px] py-14">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold text-white">Newsletter</h2>
            <p className="text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              / Newsletter
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-2 md:px-6 lg:px-6 text-center">
        {/* HEADER */}
        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Newsletter{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Collection
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            “Explore our monthly newsletters capturing key updates, activities,
            and inspiring moments from our mission-driven journey.”
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
      </div>

      {/* 📌 Newsletter Grid */}
      <div className="w-full p-2 lg:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {newsletters.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-md overflow-hidden hover:shadow-2xl transition"
            >
              {/* Thumbnail */}
              <Image
                src={item.img}
                alt={item.month}
                width={400}
                height={500}
                className="w-full h-80 object-cover cursor-pointer"
                onClick={() => setViewImage(item.img)}
              />

              {/* Buttons */}
              <div className="flex justify-center gap-6 mt-3">
                {/* VIEW BUTTON */}
                <button
                  onClick={() => setViewImage(item.img)}
                  className="text-sm font-medium text-gray-600 cursor-pointer hover:underline"
                >
                  VIEW
                </button>

                {/* DOWNLOAD BUTTON */}
                <a
                  href={item.pdf}
                  download
                  className="text-sm font-medium text-blue-800 hover:underline"
                >
                  DOWNLOAD
                </a>
              </div>

              {/* Month */}
              <h4 className="text-center mt-2 font-semibold text-gray-800">
                {item.month}
              </h4>
              <p className="text-center text-xs text-gray-600 mb-4">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 📌 Full-Screen Image Modal */}
      {viewImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative bg-gray-50 w-full max-w-5xl h-[95vh] rounded-lg shadow-lg overflow-y-auto">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setViewImage(null)}
              className="absolute top-1 right-1 w-8 h-8 flex items-center justify-center 
             bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 
             rounded-full shadow-md transition-all z-20"
            >
              ✕
            </button>

            {/* IMAGE FULL VIEW */}
            <div className="w-full h-full flex justify-center items-center p-4">
              <img
                src={viewImage}
                alt="Full View"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
