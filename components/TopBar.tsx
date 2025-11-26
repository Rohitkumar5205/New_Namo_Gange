"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SpeakerButton from "./SpeakerButton";
import {
  Mail,
  Phone,
  User,
  ChevronDown,
  Globe,
  Volume2,
  VolumeX,
} from "lucide-react";
import logo from "@/public/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter } from "next/navigation";
import Link from "next/link";
import JoinDropdown from "./JoinDropdown";

const TopBar: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="hidden sm:block w-full bg-white shadow-sm">
      <div
        className="
          max-w-7xl mx-auto 
          flex flex-col md:flex-row 
          items-center md:items-center 
          justify-between 
          px-4 py-0.5 gap-4
        "
      >
        {/* ================= LOGO ================= */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Image
            src={logo}
            alt="Namo Gange"
            width={180}
            className="object-contain"
          />
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex items-center gap-3 w-full mt-6 md:w-auto justify-center md:justify-end">
          {/* JOIN WITH US DROPDOWN */}
          <JoinDropdown />

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-[#0C55A0] text-white hover:bg-sky-600 transition "
          >
            Login
          </button>

          {/* PROFILE ICON */}
          <Link
            href="/auth/profile"
            className="
              flex items-center space-x-2 
              px-4 py-2
              bg-[#0C55A0] text-white hover:bg-sky-600
              transition 
              shadow-sm
            "
          >
            <User size={20} className="text-white" />
            <span className="font-medium ">Profile</span>
          </Link>

          {/* AUDIO + LANGUAGE SELECTORS */}
          <SpeakerButton />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
