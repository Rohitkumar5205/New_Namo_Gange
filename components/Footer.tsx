"use client";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/public/footer-logo.png"; // 👈 logo path check kar lena
import React, { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";

interface SocialMediaData {
  mail: string;
  callNumber: string;
  address: string;
}

export default function Footer() {
  const [socialData, setSocialData] = useState<SocialMediaData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/social-media/get");
        // setSocialData(res.data.data);
        setSocialData(res.data.data[0]);
      } catch (error) {
        console.error("Failed to fetch social media data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-[#0b0b0b] text-gray-300 border-t border-white/10">
      {/* ================= MAIN FOOTER ================= */}

      <div className="flex flex-col w-full px-4 py-4 md:py-12  lg:py-12 md:px-12 lg:px-12 md:flex-row gap-2 md:gap-20 justify-around items-start text-center">
        {/* ===== Column 1: Logo + About ===== */}
        <div className=" text-justify md:w-[30%]">
          <Image
            src={Logo}
            alt="Namo Gange Trust"
            className="w-48 mb-4"
            priority
          />

          <p className="text-sm text-gray-400 leading-relaxed text-justify">
            Namo Gange Trust is committed to promoting Ayurveda, Yoga, Holistic
            Wellness, and sustainable living for a Healthier, conscious, and
            compassionate society.
          </p>
        </div>

        {/* ===== Column 2: Quick Links ===== */}
        <div className="text-justify md:w-[20%]">
          <h3 className="text-base font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm ">
            {[
              { name: "Home", link: "/" },
              { name: "About Us", link: "/about" },
              { name: "Events", link: "/event/upcoming" },
              { name: "Gallery", link: "/gallery/photos" },
              { name: "Contact", link: "/contact" },
            ].map((item, i) => (
              <li key={i} className="hover:text-[#DF562C] transition">
                <Link href={item.link} className=" ">
                  {item.name}
                </Link>
                <hr className="mt-2 border-gray-600" />
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Column 3: Objectives ===== */}
        <div className="text-justify md:w-[20%]">
          <h3 className="text-base font-semibold text-white mb-4">
            Our Objectives
          </h3>

          <ul className="space-y-2 text-sm">
            {[
              { name: "Health & Wellness", slug: "health-wellness" },
              { name: "Nature & Environment", slug: "nature-environment" },
              { name: "Culture & Sanskriti", slug: "kala-sanskriti" },
              { name: "Women Empowerment", slug: "women-empowerment" },
              { name: "Moksha Sewa", slug: "moksha-sewa" },
            ].map((item, i) => (
              <li key={i} className="hover:text-[#1e7ed3] transition">
                <Link href={`/objectives/${item.slug}`}>{item.name}</Link>
                <hr className="mt-2 border-gray-600" />
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Column 4: Contact Info ===== */}
        <div className="text-justify md:w-[30%]">
          <h3 className="text-base font-semibold text-white mb-4">
            Contact Us
          </h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-1">
              <MapPin className="w-15 h-15 text-[#DF562C] mt-1" />
              <span className="text-gray-400 leading-relaxed text-justify">
                {socialData?.address || ""}
              </span>
            </li>

            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#1e7ed3]" />
              <a
                href={socialData?.mail || "#"}
                className="hover:text-[#DF562C]"
              >
                {socialData?.mail || ""}
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#1e7ed3]" />
              <a
                href={socialData?.callNumber || "#"}
                className="hover:text-[#DF562C]"
              >
                {socialData?.callNumber || ""}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Namo Gange Trust. All Rights Reserved.
      </div>
    </footer>
  );
}
