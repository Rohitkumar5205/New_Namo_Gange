"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import axiosClient from "@/lib/axiosClient";

/* CUSTOM WHATSAPP SVG ICON */
function WhatsappSVG(props) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.004 3C9.373 3 4 8.373 4 15.004c0 2.647.88 5.084 2.375 7.056L4 29l7.17-2.312A11.94 11.94 0 0 0 16.004 27c6.627 0 12-5.373 12-11.996C28.004 8.373 22.631 3 16.004 3zm0 2c5.52 0 10 4.477 10 9.996 0 5.52-4.48 10.004-10 10.004a9.94 9.94 0 0 1-5.24-1.52l-.375-.236-4.25 1.368 1.386-4.136-.246-.395A9.93 9.93 0 0 1 6 15.004C6 9.477 10.48 5 16.004 5zm5.68 14.225c-.31-.155-1.84-.91-2.13-1.015-.29-.105-.5-.155-.71.156-.205.31-.815 1.015-1 1.22-.185.205-.37.23-.68.08-.31-.155-1.3-.48-2.475-1.53-.915-.815-1.53-1.825-1.71-2.135-.185-.31-.02-.48.14-.63.145-.145.31-.37.465-.555.155-.185.205-.31.31-.515.1-.205.05-.39-.025-.545-.08-.155-.71-1.7-.975-2.33-.255-.61-.515-.525-.71-.535l-.605-.01c-.205 0-.545.08-.83.39-.285.31-1.09 1.065-1.09 2.6 0 1.535 1.115 3.015 1.27 3.22.155.205 2.195 3.35 5.31 4.695.741.32 1.32.51 1.77.655.74.235 1.41.2 1.94.12.59-.09 1.84-.75 2.1-1.475.26-.725.26-1.345.18-1.475-.08-.13-.28-.205-.59-.36z" />
    </svg>
  );
}

/* MAIN COMPONENT */
export default function FloatingContactWidget() {
  const ICON_SIZE = 22;

  const [socialData, setSocialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/social-media/get");
        // Assuming the API returns an array and we need the first item
        setSocialData(res.data.data[0]);
      } catch (error) {
        console.error(
          "Failed to fetch social media data for FloatingContactWidget",
          error,
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hidden md:flex fixed left-2 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
      <SocialIcon
        label="Mail_Us"
        href={`mailto:${socialData?.mail || "info@namogange.org"}`}
        Icon={Mail}
        color="text-blue-600"
        size={ICON_SIZE}
        delay={0}
      />
      <SocialIcon
        label="Call_Us"
        href={`tel:${socialData?.callNumber || "+919654900525"}`}
        Icon={Phone}
        color="text-green-600"
        size={ICON_SIZE}
        delay={0.2}
      />

      <SocialIcon
        label="Whatsapp"
        href={`https://wa.me/${socialData?.whatsappNumber?.replace(/\s/g, "") || "919654900525"}?text=${encodeURIComponent(socialData?.whatsappMessage || "Hello Namo Gange")}`}
        Icon={WhatsappSVG}
        color="text-green-500"
        size={ICON_SIZE}
        delay={0.4}
      />
    </div>
  );
}

/* REUSABLE SOCIAL ICON COMPONENT */
function SocialIcon({
  label,
  href,
  Icon,
  color,
  delay,
  size,
  extraClass = "",
}) {
  return (
    <motion.div
      className="relative group flex items-center justify-end"
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {/* Tooltip */}
      <motion.span
        className="absolute left-16 bg-black text-white text-sm py-1 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ x: 12 }}
        animate={{ x: 0 }}
      >
        {label}
      </motion.span>

      {/* Icon Button */}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 
             flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-300"
        style={{
          width: size + 14,
          height: size + 14,
        }}
      >
        <Icon
          className={`${color}`}
          style={{
            width: size,
            height: size,
          }}
        />
      </a>
    </motion.div>
  );
}
