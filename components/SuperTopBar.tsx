"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import {
  Mail,
  Phone,
  User,
  ChevronDown,
  HeartHandshake,
  Star,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import SpeakerButton from "./SpeakerButton";

interface SocialMediaData {
  mail: string;
  callNumber: string;
}

const SuperTopBar = () => {
  const router = useRouter();

  const [openSewa, setOpenSewa] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
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

  const handleLogin = () => {
    const url = process.env.NEXT_PUBLIC_ADMIN_APP_URL;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      router.push("/auth/login");
    }
  };

  const dropdownBase =
    "absolute right-0 mt-[2px] w-44 bg-white text-gray-800 rounded-md shadow-xl z-[60] overflow-hidden border border-gray-100";

  const dropdownItem =
    "w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-[#0CACE3]/10 hover:text-[#0CACE3] transition";

  return (
    <div className="hidden md:block w-full bg-[#0b1220] text-gray-200 text-sm">
      <div className="w-full p-2 md:px-12 lg:py-1.5 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* LEFT */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-gray-400" />
            {/* <span>info@namogange.org</span> */}
            <span>{socialData?.mail}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-gray-400" />
            <span>{socialData?.callNumber}</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 relative">
          {/* Donate */}
          <button
            onClick={() => router.push("/donate")}
            className="px-3 py-1 rounded-xl bg-[#DF562C] text-xs font-medium hover:opacity-90 transition"
          >
            Donate
          </button>

          {/* SEWA */}
          <div
            className="relative"
            onMouseEnter={() => setOpenSewa(true)}
            onMouseLeave={() => setOpenSewa(false)}
          >
            <button className="flex items-center gap-1 px-3 py-1 rounded-xl border border-[#0CACE3] text-[#0CACE3] text-xs hover:bg-[#0CACE3] hover:text-white transition">
              Sewa <ChevronDown size={14} />
            </button>

            {openSewa && (
              <div className={`${dropdownBase} animate-fadeIn`}>
                <button
                  onClick={() => router.push("/sewa/ann-sewa")}
                  className={dropdownItem}
                >
                  Ann Sewa
                </button>
                <button
                  onClick={() => router.push("/sewa/moksha-sewa")}
                  className={dropdownItem}
                >
                  Moksha Sewa
                </button>
              </div>
            )}
          </div>

          {/* JOIN US */}
          <div
            className="relative"
            onMouseEnter={() => setOpenJoin(true)}
            onMouseLeave={() => setOpenJoin(false)}
          >
            <button className="flex items-center gap-1 px-3 py-1 rounded-xl border border-[#0CACE3] text-[#0CACE3] text-xs hover:bg-[#0CACE3] hover:text-white transition">
              Join Us <ChevronDown size={14} />
            </button>

            {openJoin && (
              <div className={`${dropdownBase} animate-fadeIn`}>
                <button
                  onClick={() => router.push("/join/volunteer")}
                  className={`${dropdownItem} flex items-center gap-2`}
                >
                  <HeartHandshake size={18} className="text-pink-500" />
                  Join as Volunteer
                </button>

                <button
                  onClick={() => router.push("/join/member")}
                  className={`${dropdownItem} flex items-center gap-2`}
                >
                  <Star size={18} className="text-yellow-500" />
                  Become a Member
                </button>

                <button
                  onClick={() => router.push("/auth/signup")}
                  className={`${dropdownItem} flex items-center gap-2`}
                >
                  <UserPlus size={18} className="text-blue-500" />
                  Associate
                </button>
              </div>
            )}
          </div>

          {/* Login */}
          <button
            onClick={handleLogin}
            className="flex items-center gap-1 px-3 py-1 rounded-xl border border-[#DF562C] text-[#DF562C] hover:bg-[#DF562C] hover:text-white text-xs transition"
          >
            <User size={14} />
            Admin
          </button>

          <SpeakerButton />
        </div>
      </div>
    </div>
  );
};

export default SuperTopBar;
