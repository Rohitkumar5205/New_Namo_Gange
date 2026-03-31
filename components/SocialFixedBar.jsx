"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import axiosClient from "@/lib/axiosClient";

export default function SocialFixedBar() {
  const [socialData, setSocialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/social-media/get");
        setSocialData(res.data.data[0]);
      } catch (error) {
        console.error("Failed to fetch social media data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hidden md:flex fixed right-2 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
      {/* FACEBOOK */}
      <SocialIcon
        label="Facebook"
        href={socialData?.facebook || "#"}
        Icon={Facebook}
        color="text-blue-600"
        delay={0}
      />

      {/* INSTAGRAM */}
      <SocialIcon
        label="Instagram"
        href={socialData?.instagram || "#"}
        Icon={Instagram}
        color="text-pink-500"
        delay={0.3}
      />

      {/* TWITTER */}
      <SocialIcon
        label="Twitter"
        href={socialData?.twitter || "#"}
        Icon={Twitter}
        color="text-sky-500"
        delay={0.6}
      />

      {/* LINKEDIN */}
      <SocialIcon
        label="LinkedIn"
        href={socialData?.linkedin || "#"}
        Icon={Linkedin}
        color="text-blue-700"
        delay={0.9}
      />

      {/* YOUTUBE */}
      <SocialIcon
        label="YouTube"
        href={socialData?.youtube || "#"}
        Icon={Youtube}
        color="text-red-600"
        delay={1.2}
      />
    </div>
  );
}

/* REUSABLE COMPONENT */
function SocialIcon({ label, href, Icon, color, delay }) {
  return (
    <motion.div
      className="relative group flex items-center justify-end"
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {/* LABEL */}
      <motion.span
        className="absolute right-14 bg-black text-white text-sm py-1 px-3 rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ x: 10 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.span>

      {/* ICON */}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="w-9 h-9 rounded-full bg-gray-50 shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        <Icon className={`w-5 h-5 ${color}`} />
      </a>
    </motion.div>
  );
}
