"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
// Dummy category data (you can later fetch dynamically)
const categories = [
  {
    id: "activity",
    title: "Activity",
    img: "/gallery/activity.jpg",
    date: "11 Oct 2025",
  },
  {
    id: "annadaan",
    title: "Annadaan",
    img: "/gallery/annadaan.jpg",
    date: "12 Oct 2025",
  },
  {
    id: "cng-plant",
    title: "CNG Plant",
    img: "/gallery/cngplant.jpg",
    date: "15 Oct 2025",
  },
  {
    id: "events",
    title: "Events",
    img: "/gallery/events.jpg",
    date: "20 Oct 2025",
  },
  {
    id: "gaushala",
    title: "Gaushala",
    img: "/gallery/gaushala.jpg",
    date: "25 Oct 2025",
  },
  {
    id: "vedic-dham",
    title: "Vedic Dham",
    img: "/gallery/vedicdham.jpg",
    date: "28 Oct 2025",
  },
  {
    id: "yagya-pooja",
    title: "Yagya & Pooja",
    img: "/gallery/yagya.jpg",
    date: "29 Oct 2025",
  },
];

export default function EventsPage() {
  return (
    <section className="w-full bg-gray-50 ">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/image1.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white">
              Photos Gallery
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Photos Gallery
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-lg md:text-xl lg:text-xl font-medium text-center py-6 ">
        Our Activities & Events
      </h1>

      <div className="max-w-7xl mb-6 mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/gallery/photos/${cat.id}`}
            className="group block bg-white shadow-md hover:shadow-lg rounded overflow-hidden transition"
          >
            <div className="relative">
              <Image
                src={cat.img}
                alt={cat.title}
                width={400}
                height={300}
                className="w-full h-56 object-cover transition-transform duration-300"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 bg-orange-100 py-2 text-center">
                <h3 className="font-semibold text-black text-base">
                  {cat.title}
                </h3>
              </div> */}
            </div>
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm">
              <p className="font-medium">{cat.title}</p>
              <p className="flex items-center gap-1">📅 {cat.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
