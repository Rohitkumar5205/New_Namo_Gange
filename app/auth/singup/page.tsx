import SignupPage from "@/components/auth/SignuPage";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/volunteer.png')" }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Corporator REGISTRATION
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Corporator Registration
            </p>
          </div>
        </div>
      </div>
      <SignupPage />
    </div>
  );
}
