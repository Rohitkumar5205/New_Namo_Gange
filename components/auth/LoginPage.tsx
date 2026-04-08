"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { showSuccess, showError } from "@/utils/toast";
import Image from "next/image";


export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userType, setUserType] = useState("volunteer");

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
    <div className=" w-full flex ">
      {/* ---------------- LEFT WELCOME PANEL ---------------- */}
      <div
        className="
        hidden lg:flex w-1/2 items-center justify-center 
        bg-gray-50
        text-gray-700 p-12 relative overflow-hidden
      "
      >
        {/* Soft radial glow */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}

        <div className="relative z-10 max-w-lg text-center">
          <h1 className="text-4xl font-semibold leading-tight drop-shadow-md">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray/90">
            Sign in to access your dashboard and continue contributing toward a
            stronger, more connected community.
          </p>

          <div className="flex justify-center mt-4">
            <Image
                       width={100}
                       height={100}
              src="/logo.png"
              alt="Organization Logo"
              className="w-56 opacity-95 drop-shadow-xl rounded-xl"
            />
          </div>

          <p className="mt-4 text-sm text-gray/90 leading-relaxed">
            Manage initiatives, collaborate with your team, track progress, and
            make a meaningful impact—all from one secure platform.
          </p>
        </div>
      </div>

      {/* ---------------- RIGHT LOGIN PANEL ---------------- */}
      <div className="flex-1 flex items-center justify-center bg-white  p-6 sm:p-10">
        <div
          className="
            w-full max-w-md p-8 rounded-2xl 
            bg-white/90 backdrop-blur-xl 
            shadow-[0_8px_30px_rgb(0,0,0,0.08)]
            border border-white/40
          "
        >
          {/* <h2 className="text-3xl font-bold text-center text-[#DF562C] tracking-wide">
            Login With OTP
          </h2> */}
          <h1 className="text-3xl font-semibold text-center text-[#DF562C] tracking-wide leading-tight drop-shadow-md">
  Secure Login
</h1>

<p className="mt-2 text-sm text-gray-600 text-center">
  Log in to securely access your account and manage your data with confidence.
</p>


          {/* User Type */}
          <div className="flex justify-center gap-6 mt-6 text-sm font-medium text-gray-700">
            {["volunteer", "member", "associate"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer hover:text-[#DF562C] transition"
              >
                <input
                  type="radio"
                  name="userType"
                  value={type}
                  checked={userType === type}
                  onChange={(e) => setUserType(e.target.value)}
                  className="accent-[#DF562C] cursor-pointer"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>

          {/* ---------------- STEP 1: MOBILE ---------------- */}
          {step === "mobile" && (
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-600">
                Mobile Number
              </label>

              <div className="flex items-center mt-2 border rounded-md bg-white px-3 py-1.5 shadow-sm">
                <Phone className="text-gray-400 w-4 h-4" />

                <input
                  type="text"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="Enter your mobile number"
                  className="w-full p-1 outline-none text-sm bg-transparent"
                />
              </div>

              <button
                onClick={handleSendOtp}
                className="w-full mt-6 bg-[#DF562C] hover:bg-red-600
                text-white py-2 rounded font-semibold shadow-md 
                hover:opacity-90 transition active:scale-95"
              >
                Send OTP
              </button>

              {userType === "associate" && (
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
              )}
            </div>
          )}

          {/* ---------------- STEP 2: OTP ---------------- */}
          {step === "otp" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <p className="text-sm text-center text-gray-600">
                OTP sent to <strong>{mobile}</strong>
              </p>

              <div className="flex justify-center gap-4 mt-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="
                      w-14 h-14 text-center text-xl font-bold rounded-md
                      border border-gray-300 bg-white shadow-sm
                      focus:border-[#DF562C] outline-none
                    "
                  />
                ))}
              </div>

              <button
                className="mt-4 text-sm text-[#DF562C] font-medium hover:underline block mx-auto"
                onClick={() => setStep("mobile")}
              >
                Change Mobile Number
              </button>

              <button
                onClick={handleLogin}
                disabled={!allOtpFilled}
                className={`
                  w-full mt-6 py-3 rounded-md font-semibold shadow-md transition
                  ${
                    allOtpFilled
                      ? "bg-gradient-to-r from-[#DF562C] to-[#c1471f] text-white hover:opacity-90"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }
                `}
              >
                Login
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
