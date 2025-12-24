"use client";
import React from "react";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";
import { Play, Users, Gift } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.18, ease: easeOut },
  }),
};

export default function SpecialPage() {
  return (
    <section className="relative w-full h-auto pt-16 pb-20 md:pb-0 md:h-[60vh] overflow-hidden flex items-center justify-center text-white">
      {/* BACKGROUND IMAGE */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut" }}
        className="absolute inset-0 z-10"
      >
        <Image
          src="/home/how_we.png"
          alt="NGO food distribution"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
      </motion.div>

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/70 via-black/40 md:via-transparent to-black/60 -z-10" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
        {/* LEFT — VOLUNTEER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
          className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-md bg-white/10">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Become A Volunteer
            </h3>
          </div>

          <p className="text-sm sm:text-base text-white/80 max-w-sm">
            Join our volunteer team to help distribute meals and support
            community events. Flexible timings with training included.
          </p>

          <Link href="/about">
            <button className="mt-2 inline-flex items-center px-6 py-2.5 bg-[#f36b2a] hover:bg-[#f36b2a]/90  shadow-md text-sm sm:text-base transition">
              Register Now
            </button>
          </Link>
        </motion.div>

        {/* CENTER — VIDEO PLAY BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-[#f36b2a]/30 blur-xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <button
            aria-label="Play introduction video"
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f36b2a] hover:bg-[#f36b2a]/95 shadow-lg flex items-center justify-center transition hover:scale-105"
          >
            <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </button>
        </motion.div>

        {/* RIGHT — BIRTHDAY DONATION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-md bg-white/10">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Celebrate Your Birthday
            </h3>
          </div>

          <p className="text-sm sm:text-base text-white/80 max-w-sm">
            Sponsor a community meal or fund a day’s distribution. Celebrate
            your special day with real purpose.
          </p>

          <Link href="/about">
            <button className="mt-2 inline-flex items-center px-6 py-2.5 bg-[#0C55A0] hover:bg-sky-700  shadow-md text-sm sm:text-base transition">
              Celebrate Now
            </button>
          </Link>
        </motion.div>
      </div>

      {/* WATERMARK */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.06, 0.08, 0.06, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl md:text-8xl font-extrabold text-white/10 select-none"
      >
        NAMO GANGE
      </motion.h1>
    </section>
  );
}
