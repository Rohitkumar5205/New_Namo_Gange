"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Globe,
  Landmark,
  Lock,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { showSuccess, showError } from "@/utils/toast";
import axiosClient from "@/lib/axiosClient";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SignuPage() {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    occupation: "",
    organization: "",
    website: "",
    address: "",
    city: "",
    state: "",
    district: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    profileImage: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, profileImage: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  /* ================= OTP STATES ================= */
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);

  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const [phoneTimer, setPhoneTimer] = useState(0);
  const [emailTimer, setEmailTimer] = useState(0);

  useState(() => {
    const pInt = setInterval(() => {
      setPhoneTimer((p) => (p > 0 ? p - 1 : 0));
    }, 1000);
    const eInt = setInterval(() => {
      setEmailTimer((e) => (e > 0 ? e - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(pInt);
      clearInterval(eInt);
    };
  });

  const handleSendPhoneOtp = async () => {
    if (!validatePhone(formData.mobile)) {
      showError("Please enter a valid 10-digit mobile number");
      return;
    }
    try {
      const res = await axiosClient.post("/otp/send-mobile-otp", { mobile: formData.mobile });
      if (res.data.success) {
        setIsPhoneOtpSent(true);
        setPhoneTimer(30);
        showSuccess("OTP sent to your WhatsApp!");
      } else {
        showError(res.data.message || "Failed to send OTP");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Something went wrong while sending mobile OTP.");
    }
  };

  const handleSendEmailOtp = async () => {
    if (!validateEmail(formData.email)) {
      showError("Please enter a valid email address");
      return;
    }
    try {
      const res = await axiosClient.post("/otp/send-email-otp", { email: formData.email });
      if (res.data.success) {
        setIsEmailOtpSent(true);
        setEmailTimer(30);
        showSuccess("OTP sent to your email!");
      } else {
        showError(res.data.message || "Failed to send OTP");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Something went wrong while sending email OTP.");
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) {
      showError("Please enter a 6-digit OTP.");
      return;
    }
    try {
      const res = await axiosClient.post("/otp/verify-otp", { mobile: formData.mobile, otp: phoneOtp });
      if (res.data.success) {
        setIsPhoneVerified(true);
        showSuccess("Phone verified successfully!");
      } else {
        showError(res.data.message || "Invalid OTP");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Verification failed. Please check the OTP.");
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (emailOtp.length !== 6) {
      showError("Please enter a 6-digit OTP.");
      return;
    }
    try {
      const res = await axiosClient.post("/otp/verify-otp", { email: formData.email, otp: emailOtp });
      if (res.data.success) {
        setIsEmailVerified(true);
        showSuccess("Email verified successfully!");
      } else {
        showError(res.data.message || "Invalid OTP");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Verification failed. Please check the OTP.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isPhoneVerified || !isEmailVerified) {
      showError("Please verify your email and phone number first.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value as any);
      });

      await axiosClient.post("/members/create", data);
      setIsSuccess(true);
      showSuccess("Registration successful!");
    } catch (error: any) {
      showError(error?.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-8xl mx-auto">
      <div className="w-full md:w-[75%] bg-white p-6 rounded-lg shadow-lg order-2 md:order-1">
        {/* FORM START */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Registration Successful!</h2>
            <p className="text-gray-600 max-w-md">
              Thank you for registering as an Associate with Namo Gange Trust. We will contact you soon.
            </p>
            <Link
              href="/"
              className="bg-[#DF562C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#c54d21] transition-all"
            >
              Go to Home
            </Link>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* HEADER */}
            <h2 className="text-xl font-semibold text-gray-800">
              Associate Registration Form
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="font-semibold text-[#DF562C]">
                Namo Gange Trust
              </span>{" "}
              is looking for Associates to support with{" "}
              <strong>
                Campaigning, Fundraising, Marketing and Social Media Attention.
              </strong>{" "}
              Register below and we will contact you soon.
            </p>

            {/* ================= ROW 1 ================= */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800 placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-1">
                <label className="text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-1 relative">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isEmailVerified}
                      placeholder="Email Address"
                      className={`w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm transition-all ${isEmailVerified ? "text-green-600 font-semibold italic" : "text-gray-800 placeholder:text-gray-400"}`}
                      required
                    />
                    {!isEmailVerified && (
                      <button
                        type="button"
                        onClick={handleSendEmailOtp}
                        disabled={emailTimer > 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                        className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-bold rounded-md uppercase transition-all flex items-center justify-center ${(emailTimer > 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? "bg-[#edf3ff] text-blue-300 cursor-not-allowed" : "bg-[#DF562C] text-white hover:bg-[#c54d21]"}`}
                      >
                        {isEmailOtpSent ? (emailTimer > 0 ? `RESEND IN ${emailTimer}S` : "RESEND OTP") : "SEND OTP"}
                      </button>
                    )}
                    {isEmailVerified && <span className="text-green-600 text-[10px] font-bold flex items-center px-2">VERIFIED ✓</span>}
                  </div>
                  {isEmailOtpSent && !isEmailVerified && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 flex gap-2">
                      <div className="flex-1 bg-[#fff9f4] border border-[#fca5a5]/50 px-4 py-2 rounded-sm flex items-center">
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="EMAIL OTP"
                          value={emailOtp}
                          onChange={(e) => setEmailOtp(e.target.value.replace(/[^0-9]/g, ""))}
                          className="w-full bg-transparent outline-none text-[#f1a06a] text-sm text-center font-bold tracking-[0.2em] placeholder:text-[#f1a06a]/50 placeholder:font-normal placeholder:tracking-normal"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyEmailOtp}
                        className="px-4 py-1.5 bg-[#DF562C] text-white text-[10px] font-bold rounded-md shadow-sm hover:bg-[#c54d21] active:scale-95 transition-all"
                      >
                        VERIFY
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="md:col-span-1">
                <label className="text-sm font-medium">
                  Mobile Number <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-1 relative">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      disabled={isPhoneVerified}
                      placeholder="10-digit number"
                      className={`w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm transition-all ${isPhoneVerified ? "text-green-600 font-semibold italic" : "text-gray-800 placeholder:text-gray-400"}`}
                      required
                    />
                    {!isPhoneVerified && (
                      <button
                        type="button"
                        onClick={handleSendPhoneOtp}
                        disabled={phoneTimer > 0 || formData.mobile.length !== 10}
                        className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-bold rounded-md uppercase transition-all flex items-center justify-center ${(phoneTimer > 0 || formData.mobile.length !== 10) ? "bg-[#edf3ff] text-blue-300 cursor-not-allowed" : "bg-[#DF562C] text-white hover:bg-[#c54d21]"}`}
                      >
                        {isPhoneOtpSent ? (phoneTimer > 0 ? `RESEND IN ${phoneTimer}S` : "RESEND OTP") : "SEND OTP"}
                      </button>
                    )}
                    {isPhoneVerified && <span className="text-green-600 text-[10px] font-bold flex items-center px-2">VERIFIED ✓</span>}
                  </div>
                  {isPhoneOtpSent && !isPhoneVerified && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 flex gap-2">
                      <div className="flex-1 bg-[#fff9f4] border border-[#fca5a5]/50 px-4 py-2 rounded-sm flex items-center">
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="MOBILE OTP"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value.replace(/[^0-9]/g, ""))}
                          className="w-full bg-transparent outline-none text-[#f1a06a] text-sm text-center font-bold tracking-[0.2em] placeholder:text-[#f1a06a]/50 placeholder:font-normal placeholder:tracking-normal"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyPhoneOtp}
                        className="px-4 py-1.5 bg-[#DF562C] text-white text-[10px] font-bold rounded-md shadow-sm hover:bg-[#c54d21] active:scale-95 transition-all"
                      >
                        VERIFY
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Date of Birth <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ================= ROW 2 ================= */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Gender <span className="text-red-500">*</span>{" "}
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-[#edf3ff] px-4 py-3 mt-1 text-sm outline-none rounded-sm text-gray-800"
                  required
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Occupation <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Enter occupation"
                    className="w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Organization / Firm <span className="text-red-500">*</span>{" "}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Organization name"
                    className="w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Website (Optional)</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* ================= ADDRESS ================= */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                Full Address
                <span className="text-red-500">*</span>{" "}
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none mt-1 rounded-sm text-gray-800 placeholder:text-gray-400"
                rows={2}
                placeholder="House No, Street, Area"
                required
              ></textarea>
            </div>

            {/* ================= CITY / STATE / PIN ================= */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">
                  City <span className="text-red-500">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full bg-[#edf3ff] px-4 py-3 mt-1 text-sm outline-none rounded-sm text-gray-800 placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  State <span className="text-red-500">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full border px-3 h-10 py-1 text-sm outline-none mt-1 bg-white"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  District <span className="text-red-500">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                  className="w-full border px-3 h-10 py-1 text-sm outline-none mt-1 bg-white"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Pincode <span className="text-red-500">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-full border px-3 h-10 py-1 text-sm outline-none mt-1"
                  required
                />
              </div>
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium">
                  Password <span className="text-red-500">*</span>{" "}
                </label>
                <div className="flex items-center border px-3 mt-1 h-10">
                  <Lock size={16} className="text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full px-2 py-1 text-sm outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">
                  Confirm Password <span className="text-red-500">*</span>{" "}
                </label>
                <div className="flex items-center border px-3 mt-1 h-10">
                  <Lock size={16} className="text-gray-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className="w-full px-2 py-1 text-sm outline-none bg-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ================= PROFILE IMAGE ================= */}
            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <ImageIcon size={16} />
                Upload Profile Photo
                <span className="text-red-500">*</span>{" "}
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border px-3 py-1 text-sm outline-none mt-1"
              />

              {previewImage && (
             <Image
                                    width={100}
                                    height={100}
                  src={previewImage}
                  alt="preview"
                  className="w-24 h-24 mt-3 object-cover border rounded"
                />
              )}
            </div>

            {/* ================= TERMS ================= */}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" required className="accent-[#DF562C]" />I
              agree to the{" "}
              <span className="text-[#DF562C] underline">Terms & Conditions</span>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading || !isPhoneVerified || !isEmailVerified}
              className="w-full bg-[#DF562C] text-white py-2.5 font-bold uppercase tracking-widest hover:bg-[#c54d21] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Registering..." : "Submit Registration"}
            </button>
          </form>
        )}
      </div>
      {/* RIGHT SIDEBAR */}
      <div className="w-full md:w-[25%] space-y-6 order-1 md:order-2 self-start sticky top-4">
        {/* NEED HELP BOX */}
        <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded p-5 text-center">
          <div className="flex justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-14 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18v.01M8 21h8a2 2 0 002-2v-6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zM15 3H9a2 2 0 00-2 2v1h10V5a2 2 0 00-2-2z"
              />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2 font-inter">Need Help?</h4>
          <p className="text-sm text-gray-600 leading-relaxed font-inter">
            We would be more than happy to help you. Our team advisor is{" "}
            **24/7 at your service** to help you.
          </p>
          <p className="text-sm text-[#DF562C] mt-2 font-semibold">
            info@namogange.org
          </p>
          <p className="text-sm text-gray-500 mt-1 uppercase text-[10px] tracking-wider">
            Monday to Friday 9:00am - 7:30pm
          </p>
        </div>

        {/* CORPORATOR CTA */}
        <div className="bg-[#2d70c8] rounded shadow-[0_0_20px_rgba(0,0,0,0.1)] p-6 text-center text-white relative overflow-hidden group">
          {/* Background Decorative Element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700" />

          <div className="flex justify-center mb-4">
           <Image
                                  width={100}
                                  height={100}
              src="/home/volunteer-icons.png"
              alt="corporator"
              className="w-32 h-auto drop-shadow-xl"
            />
          </div>

          <h4 className="text-xl font-bold font-inter tracking-tight">Become a Corporator</h4>

          <p className="text-[13px] leading-relaxed mt-3 text-blue-50/90 font-inter">
            Join <span className="font-bold text-white">Namo Gange Mission</span> to serve the nation with pride and dignity.
          </p>

          <button className="mt-6 w-full bg-white text-[#2d70c8] font-bold py-2 text-xs rounded shadow-sm hover:bg-gray-50 active:scale-95 transition-all uppercase tracking-widest">
            APPLY NOW
          </button>
        </div>

        {/* TRUST NAME */}
        <div className="bg-white rounded p-4 shadow-sm border border-gray-100 italic text-gray-400 text-xs text-center font-inter">
          Namo Gange Trust
        </div>
      </div>
    </div>
  );
}
