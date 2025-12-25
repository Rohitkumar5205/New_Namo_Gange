"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/public/logo.png"; // 👈 logo path check kar lena

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-gray-300 border-t border-white/10">
      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* ===== Column 1: Logo + About ===== */}
          <div>
            <Image
              src={Logo}
              alt="Namo Gange Trust"
              className="w-44 mb-4 bg-white p-2 rounded-md"
              priority
            />

            <p className="text-sm text-gray-400 leading-relaxed">
              Namo Gange Trust is committed to promoting Ayurveda, Yoga,
              holistic wellness, and sustainable living for a healthier,
              conscious, and compassionate society.
            </p>
          </div>

          {/* ===== Column 2: Quick Links ===== */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", link: "/" },
                { name: "About Us", link: "/about" },
                { name: "Events", link: "/events" },
                { name: "Gallery", link: "/gallery" },
                { name: "Contact", link: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link}
                    className="hover:text-[#DF562C] transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Column 3: Objectives ===== */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Our Objectives
            </h3>

            <ul className="space-y-2 text-sm">
              {[
                "Health & Wellness Awareness",
                "Environmental Conservation",
                "Women Empowerment",
                "Cultural & Ethical Values",
              ].map((text, i) => (
                <li key={i} className="hover:text-[#1e7ed3] transition">
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Column 4: Contact Info ===== */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-15 h-15 text-[#DF562C] mt-1" />
                <span className="text-gray-400 leading-relaxed">
                  12/52, Site-2, Sunrise Industrial Area, Mohan Nagar,
                  Sahibabad, Ghaziabad, Uttar Pradesh – 201007
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1e7ed3]" />
                <a
                  href="mailto:info@namogange.org"
                  className="hover:text-[#DF562C]"
                >
                  info@namogange.org
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#1e7ed3]" />
                <a href="tel:+919654900525" className="hover:text-[#DF562C]">
                  +91 96549 00525
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Namo Gange Trust. All Rights Reserved.
      </div>
    </footer>
  );
}
