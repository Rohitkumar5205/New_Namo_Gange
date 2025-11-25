"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function MokshaSewaPage() {
  return (
    <section className="bg-gray-50 pb-16">
      {/* ================= BANNER ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/career.jpeg')" }}
      >
        <div className="bg-black/20 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Our <span className="text-[#DF562C]">Career</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-2">
              <Link href="/" className="text-[#DF562C] hover:underline">
                Home
              </Link>{" "}
              / Career
            </p>
          </div>
        </div>
      </div>

      {/* ================= TITLE ================= */}
      <div className="max-w-7xl mx-auto text-center pt-10 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Our{" "}
          <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
            Career
          </span>
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Reach out to us for any enquiry regarding Moksha Sewa services.
        </p>
      </div>

      {/* ================= MAIN SECTION ================= */}
      <div className="max-w-7xl mx-auto flex mt-10 gap-10 justify-between">
        {/* LEFT CONTACT CARDS */}
        <div className="space-y-8 w-[25%]">
          {/* PHONE CARD */}
          <div className="relative bg-white rounded shadow-lg border border-gray-100 p-8">
            <div className="absolute -top-6 left-8 bg-[#DF562C] w-16 h-16 rounded-t-xl rounded-br-xl flex items-center justify-center shadow-md">
              <Phone className="text-white" size={28} />
            </div>

            <h3 className="mt-8 text-lg font-medium text-gray-900">
              Phone Numbers
            </h3>

            <div className="mt-4 space-y-1 text-gray-700 text-sm">
              <p>+91 96549 00525</p>
              <p>+91 98102 47319</p>
              <p>+91 93106 08427</p>
            </div>
          </div>

          {/* EMAIL CARD */}
          <div className="relative bg-white rounded shadow-lg border border-gray-100 p-8">
            <div className="absolute -top-6 left-8 bg-[#DF562C] w-16 h-16 rounded-t-xl rounded-br-xl flex items-center justify-center shadow-md">
              <Mail className="text-white" size={28} />
            </div>

            <h3 className="mt-8 text-lg font-medium text-gray-900">
              Email Address
            </h3>

            <p className="mt-4 text-gray-700 text-sm">info@namogange.org</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-[75%] bg-white p-8 rounded shadow-lg border border-gray-100">
          <h3 className="text-lg md:text-xl font-medium text-[#0C55A0] mb-6">
            Send Your Details or Contact Us
          </h3>

          <form className="space-y-5">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 px-4 py-2 text-sm focus:ring-0 focus:ring-[#0C55A0] outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-300 px-4 py-2 text-sm focus:ring-0 focus:ring-[#0C55A0] outline-none"
              />
            </div>

            {/* Email + Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-[#0C55A0] outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-[#0C55A0] outline-none"
              />
            </div>

            {/* Message */}
            <textarea
              placeholder="Your Message..."
              className="w-full border border-gray-300 px-4 py-2 text-sm h-28 resize-none focus:ring-2 focus:ring-[#0C55A0] outline-none"
            />

            {/* File Upload */}
            <div className="border border-gray-300 bg-gray-50 px-4 py-2">
              <input type="file" className="text-sm" />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-[#0C55A0] hover:bg-sky-600 text-white px-10 py-2 text-sm font-medium transition shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
