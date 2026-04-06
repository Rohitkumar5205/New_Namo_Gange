import Link from "next/link";
import React from "react";

function AboutJoin() {
  return (
    <section className="relative w-full overflow-hidden py-2 md:py-4 lg:py-8">
      {/* Soft background glow */}
      <div className="absolute -top-24 -right-24 w-60 md:w-80 h-60 md:h-80 bg-[#DF562C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 md:w-80 h-60 md:h-80 bg-[#0C55A0]/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className="
          relative
          w-full
          bg-white/95
          backdrop-blur-xl
          p-4 sm:p-6 md:p-8 lg:p-12
          flex flex-col items-center text-center
          shadow-lg md:shadow-xl
          border border-gray-100
          mx-auto
          max-w-5xl
        "
      >
        {/* Heading */}
        <span
          className="
            text-[11px] sm:text-xs md:text-base lg:text-lg
            font-semibold
            mb-3 sm:mb-4 md:mb-5 lg:mb-6
            bg-gradient-to-r from-[#DF562C] via-[#f28a55] to-[#0C55A0]
            bg-clip-text text-transparent
            tracking-wider
          "
        >
          ॐ Join Us in This Sacred Yatra ॐ
        </span>

        {/* Main Description */}
        <p className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] max-w-3xl leading-relaxed text-gray-700 mb-3 sm:mb-4 md:mb-5 px-2 sm:px-0">
          Become a part of{" "}
          <span className="font-semibold text-gray-900">Namo Gange</span> — a
          divine movement rooted in{" "}
          <span className="font-medium text-[#DF562C]">
            seva, compassion, and consciousness
          </span>
          . Together, we walk a sacred path where every small act of kindness
          creates meaningful ripples of transformation across society and
          nature.
        </p>

        {/* Secondary Description */}
        <p className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] max-w-3xl leading-relaxed text-gray-700 mb-5 sm:mb-6 md:mb-7 lg:mb-8 px-2 sm:px-0">
          By joining this mission, you become a guardian of timeless values —
          protecting <span className="font-medium text-[#0C55A0]">Gaumata</span>
          , feeding the needy, preserving{" "}
          <span className="font-medium text-[#DF562C]">Vedic wisdom</span>, and
          serving humanity with humility and devotion. This is more than service
          — it is a journey of inner awakening and collective upliftment.
        </p>

        {/* Action Line */}
        <p className="text-[11px] sm:text-[13px] md:text-[15px] lg:text-[16px] text-gray-800 font-medium mb-6 sm:mb-7 md:mb-8 lg:mb-10 tracking-wide">
          Protect • Serve • Inspire • Transform
        </p>

        {/* CTA Button */}
        <Link href="/joinAsVolunteer">
          <button
            className="
              relative
              overflow-hidden
              group
              border border-[#DF562C]
              rounded-full
              px-6 sm:px-8 md:px-10 lg:px-12
              py-1 sm:py-1 md:py-1.5 lg:py-1
              text-xs sm:text-sm md:text-sm lg:text-base
              font-medium
              text-[#DF562C]
              shadow-md
              hover:shadow-xl md:hover:shadow-2xl
              transition-all duration-500
              hover:-translate-y-1
              active:translate-y-0
              whitespace-nowrap
            "
          >
            {/* Button Text */}
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              Join the Movement
            </span>

            {/* Hover Fill */}
            <span
              className="
                absolute inset-0
                bg-gradient-to-r from-[#DF562C] to-[#0C55A0]
                translate-x-[-100%]
                group-hover:translate-x-0
                transition-transform duration-700 ease-in-out
              "
            />
          </button>
        </Link>
      </div>
    </section>
  );
}

export default AboutJoin;
