"use client";
import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function SocialFixedBar() {
  return (
    <div className="hidden md:flex fixed right-3 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
      {/* FACEBOOK */}
      <SocialIcon
        label="Facebook"
        href="https://www.facebook.com/NamogangeTrust/"
        Icon={Facebook}
        color="text-blue-600"
        delay={0}
      />

      {/* INSTAGRAM */}
      <SocialIcon
        label="Instagram"
        href="https://www.instagram.com/namogangetrust/?hl=en"
        Icon={Instagram}
        color="text-pink-500"
        delay={0.3}
      />

      {/* TWITTER */}
      <SocialIcon
        label="Twitter"
        href="https://x.com/namogange"
        Icon={Twitter}
        color="text-sky-500"
        delay={0.6}
      />

      {/* LINKEDIN */}
      <SocialIcon
        label="LinkedIn"
        href="https://www.linkedin.com/company/namo-gange-trust/"
        Icon={Linkedin}
        color="text-blue-700"
        delay={0.9}
      />

      {/* YOUTUBE */}
      <SocialIcon
        label="YouTube"
        href="https://www.youtube.com/channel/UCkAQ_M8x5l3DvrH_VtuoiSA"
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
