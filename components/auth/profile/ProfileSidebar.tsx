"use client";
import Image from "next/image";
import { User, Banknote } from "lucide-react";

interface SidebarProps {
  activeTab: "personal" | "bank";
  setActiveTab: (tab: "personal" | "bank") => void;
}

export default function ProfileSidebar({
  activeTab,
  setActiveTab,
}: SidebarProps) {
  return (
    <aside className="w-full md:w-72 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col items-center py-6 border-b">
        <Image
          src="/no-image.png"
          alt="Profile"
          width={120}
          height={120}
          className="rounded-md mb-2 border"
        />
        <p className="text-xs text-gray-500">
          ID: <span className="font-semibold">NGT-0245</span>
        </p>
      </div>

      <nav className="flex flex-col p-4 gap-3">
        <button
          onClick={() => setActiveTab("personal")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium ${
            activeTab === "personal"
              ? "bg-[#DF562C]/10 text-[#DF562C]"
              : "hover:bg-[#DF562C]/5 text-gray-700"
          }`}
        >
          <User className="w-5 h-5" /> Personal Details
        </button>

        <button
          onClick={() => setActiveTab("bank")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium ${
            activeTab === "bank"
              ? "bg-[#DF562C]/10 text-[#DF562C]"
              : "hover:bg-[#DF562C]/5 text-gray-700"
          }`}
        >
          <Banknote className="w-5 h-5" /> Bank Account Details
        </button>
      </nav>
    </aside>
  );
}
