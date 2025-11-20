"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import ProfileSidebar from "@/components/auth/profile/ProfileSidebar";
import PersonalDetailsForm from "@/components/auth/profile/PersonalDetailsForm";
import BankAccountDetails from "@/components/auth/profile/BankAccountDetails";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"personal" | "bank">("personal");

  return (
    <section className="bg-gary-50 min-h-screen">
      {/* ======== HEADER / BREADCRUMB ======== */}
      <div className="w-full border-b border-gray-300 ">
        <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Left: Breadcrumb */}
          <div className="flex items-center text-sm text-gray-800 space-x-3">
            {/* Back */}
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-800 hover:text-orange-600 font-medium transition"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </button>

            <div className="h-4 w-px bg-[#DF562C]/40"></div>

            {/* Home → My Profile */}
            <div className="flex items-center text-sm">
              <Home size={16} className="text-[#DF562C] mr-1" />
              <Link
                href="/"
                className="hover:text-orange-600 transition font-medium"
              >
                Home
              </Link>
              <span className="mx-2 text-[#7a0d0d] font-semibold">—</span>
              <span className="font-medium text-gray-900">My Profile</span>
            </div>
          </div>

          {/* Right: Title */}
          <div className="mt-3 md:mt-0 text-sm md:text-base text-gray-700 font-semibold">
            Manage Your Profile
          </div>
        </div>
      </div>

      {/* ======== MAIN CONTENT ======== */}
      <div className="w-full mx-auto px-2 md:px-5 py-2 md:py-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 mb-6 md:mb-0">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-4 bg-white rounded-xl shadow-md p-2 md:p-4">
          {activeTab === "personal" && <PersonalDetailsForm />}
          {activeTab === "bank" && <BankAccountDetails />}
        </div>
      </div>
    </section>
  );
}
