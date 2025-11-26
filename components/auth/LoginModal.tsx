"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showSuccess, showError } from "@/utils/toast";

export default function LoginModal() {
  const router = useRouter();

  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  // OTP Change Handling
  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const allOtpFilled = otp.join("").length === 4;

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      showError("Please enter a valid 10-digit mobile number");
      return;
    }
    setStep("otp");
  };

  const handleLogin = () => {
    if (!allOtpFilled) return;

    showSuccess("Login Successfully");
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        {/* Close Button */}
        <Link
          href="/"
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
        >
          <X size={22} />
        </Link>

        {/* ------------ LOGO (Centered Top) ------------ */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-56 h-30 object-contain  "
          />
          <h2 className="text-xl font-bold text-[#DF562C] mt-2">
            Login With OTP
          </h2>
        </div>

        {/* ------------ STEP 1: MOBILE ------------ */}
        {step === "mobile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="text-sm font-medium text-gray-600">
              Enter Mobile Number
            </label>

            <div className="flex items-center mt-2 border rounded-lg bg-white px-3">
              <Phone className="text-gray-400 w-4 h-4" />

              <input
                type="text"
                maxLength={10}
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="10-digit mobile number"
                className="w-full p-2 outline-none text-sm bg-transparent"
                required
              />
            </div>

            <button
              onClick={handleSendOtp}
              className="w-full mt-6 bg-[#DF562C] text-white py-2.5 rounded-full font-semibold hover:bg-orange-600 transition"
            >
              Send OTP
            </button>
            {/* 👉 CREATE ACCOUNT LINK (Add this after Login Button) */}
            <div className="mt-5 text-center text-sm">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <Link
                  href="/auth/singup"
                  className="text-[#DF562C] font-semibold hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </motion.div>
        )}

        {/* ------------ STEP 2: OTP ------------ */}
        {step === "otp" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-sm text-center text-gray-600">
              OTP sent to <strong>{mobile}</strong>
            </p>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mt-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="
                    w-12 h-12 border text-center rounded-lg text-lg font-bold 
                    outline-none focus:border-[#DF562C]
                  "
                />
              ))}
            </div>

            {/* Change mobile number */}
            <button
              className="mt-4 text-sm text-[#DF562C] font-medium hover:underline block mx-auto"
              onClick={() => setStep("mobile")}
            >
              Change Mobile Number
            </button>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              disabled={!allOtpFilled}
              className={`
                w-full mt-6 py-2.5 rounded-full font-semibold transition
                ${
                  allOtpFilled
                    ? "bg-[#DF562C] text-white hover:bg-orange-600"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              Login
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
