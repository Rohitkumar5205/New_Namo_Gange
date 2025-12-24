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
      <div className="w-full flex flex-col md:flex-row items-center md:items-center justify-between p-2 md:px-12 py-0.5 gap-4 ">
        {/* ================= LOGO ================= */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <Image
            src={logo}
            alt="Namo Gange"
            width={180}
            className="object-contain"
          />
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          <button
            onClick={handleLogin}
            className=" flex items-center space-x-1.5 px-2 py-2 text-sm rounded-sm border border-[#DF562C] text-white bg-[#DF562C] hover:bg-[#c94b26]  transition  shadow-md "
          >
            Ann Sewa
          </button>
          <button
            onClick={handleLogin}
            className=" flex items-center space-x-1.5 px-4 py-2 text-sm rounded-sm border border-[#DF562C] text-white bg-[#DF562C] hover:bg-[#c94b26]  transition  shadow-md "
          >
            Moksha Sewa
          </button>
          {/* JOIN WITH US DROPDOWN */}
          <JoinDropdown />

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className=" flex items-center space-x-1.5 px-4 py-2 text-sm border border-[#0C55A0] font-medium rounded-sm text-white bg-[#0C55A0] hover:bg-sky-600 hover:border-sky-600 transition  shadow-md "
          >
            Login
          </button>

          {/* PROFILE ICON */}
          {/* <Link
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
          </Link> */}

          {/* AUDIO + LANGUAGE SELECTORS */}
          <SpeakerButton />
          {/* <LanguageSwitcher /> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
