"use client";
import React from "react";
import { Mail, Phone, User } from "lucide-react";

const SuperTopBar = () => {
  return (
    <div className="w-full bg-[#0b1220] text-gray-200 text-sm">
      <div className="w-full p-2 md:px-12 lg:py-1.5 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* LEFT : Email & Phone */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-gray-400" />
            <span>info@namogange.org</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={14} className="text-gray-400" />
            <span>+91 96549 00525</span>
          </div>
        </div>

        {/* RIGHT : Login Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-1 rounded-xl border border-[#DF562C] text-[#DF562C] hover:text-white text-xs font-medium hover:bg-[#DF562C] transition">
            <User size={14} />
            Volunteer Login
          </button>

          <button className="flex items-center gap-1 px-3 py-1 rounded-xl border border-[#0CACE3] text-[#0CACE3] text-xs hover:bg-[#0CACE3] hover:text-white transition">
            <User size={14} />
            Member Login
          </button>

          <button className="flex items-center gap-1 px-3 py-1 rounded-xl border border-[#0C55A0] text-white text-xs hover:bg-[#0C55A0] hover:text-white transition">
            <User size={14} />
            Associate Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperTopBar;
