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
          <button className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-600 text-xs font-medium hover:bg-gray-700 transition">
            <User size={14} />
            Login
          </button>

          {/* <button className="px-3 py-1 rounded-full border border-yellow-500 text-yellow-400 text-xs hover:bg-yellow-500 hover:text-black transition">
            Partner Login
          </button>

          <button className="px-3 py-1 rounded-full border border-green-500 text-green-400 text-xs hover:bg-green-500 hover:text-black transition">
            Corporate Login
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SuperTopBar;
