"use client";
import React, { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";
import { motion } from "framer-motion";
import { showSuccess, showError } from "@/utils/toast";

interface SupportFormData {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  dob: string;
  supportType: string;
  fullAddress: string;
  city: string;
  state: string;
  prefferedContribution: string;
  message: string;
}

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

const initialForm: SupportFormData = {
  name: "",
  email: "",
  mobile: "",
  gender: "",
  dob: "",
  supportType: "Individual",
  fullAddress: "",
  city: "",
  state: "",
  prefferedContribution: "",
  message: "",
};

const Support = () => {
  const [form, setForm] = useState<SupportFormData>(initialForm);
  const [seoData, setSeoData] = useState<SEOData | null>(null);

  // Separate OTP States for Phone
  const [phoneOtp, setPhoneOtp] = useState<string>("");
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState<boolean>(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);

  // Separate OTP States for Email
  const [emailOtp, setEmailOtp] = useState<string>("");
  const [isEmailOtpSent, setIsEmailOtpSent] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  const [phoneTimer, setPhoneTimer] = useState(0);
  const [emailTimer, setEmailTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/support")}`,
        );
        const seo = res?.data?.data;
        if (seo) {
          setSeoData({
            page_banner: seo.page_banner,
            banner_alt: seo.banner_alt,
            h1tag: seo.h1tag,
          });
        }
      } catch (error) {
        console.error("Error fetching SEO data for support page:", error);
      }
    };
    fetchSEOData();
  }, []);

  useEffect(() => {
    let pInterval: NodeJS.Timeout;
    if (phoneTimer > 0) {
      pInterval = setInterval(() => setPhoneTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(pInterval);
  }, [phoneTimer]);

  useEffect(() => {
    let eInterval: NodeJS.Timeout;
    if (emailTimer > 0) {
      eInterval = setInterval(() => setEmailTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(eInterval);
  }, [emailTimer]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      handleChange(e);
    }
  };

  // Logic to send OTP to Phone
  const handleSendPhoneOtp = async () => {
    if (form.mobile.length !== 10) {
      showError("कृपया एक वैध 10-अंकों का मोबाइल नंबर दर्ज करें।");
      return;
    }
    try {
      const res = await axiosClient.post("/otp/send-mobile-otp", { mobile: form.mobile });
      if (res.data.success) {
        setIsPhoneOtpSent(true);
        setPhoneTimer(30);
        showSuccess("OTP sent to your WhatsApp successfully!");
      } else {
        showError(res.data.message || "Failed to send OTP");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Something went wrong while sending mobile OTP.");
    }
  };

  // Logic to verify Phone OTP
  const handleVerifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) {
      showError("Please enter a 6-digit OTP.");
      return;
    }
    try {
      const res = await axiosClient.post("/otp/verify-otp", { mobile: form.mobile, otp: phoneOtp });
      if (res.data.success) {
        setIsPhoneVerified(true);
        showSuccess("Mobile Verified Successfully!");
      } else {
        showError(res.data.message || "Invalid OTP");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Verification failed. Please check the OTP.");
    }
  };

  // Logic to send OTP to Email
  const handleSendEmailOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showError("कृपया एक मान्य ईमेल पता दर्ज करें।");
      return;
    }
    try {
      const res = await axiosClient.post("/otp/send-email-otp", { email: form.email });
      if (res.data.success) {
        setIsEmailOtpSent(true);
        setEmailTimer(30);
        showSuccess("OTP sent to your Email successfully!");
      } else {
        showError(res.data.message || "Failed to send OTP");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Something went wrong while sending email OTP.");
    }
  };

  // Logic to verify Email OTP
  const handleVerifyEmailOtp = async () => {
    if (emailOtp.length !== 6) {
      showError("Please enter a 6-digit OTP.");
      return;
    }
    try {
      const res = await axiosClient.post("/otp/verify-otp", { email: form.email, otp: emailOtp });
      if (res.data.success) {
        setIsEmailVerified(true);
        showSuccess("Email Verified Successfully!");
      } else {
        showError(res.data.message || "Invalid OTP");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Verification failed. Please check the OTP.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPhoneVerified || !isEmailVerified) {
      showError("कृपया मोबाइल नंबर और ईमेल सत्यापित करें।");
      return;
    }

    setLoading(true);
    try {
      // API call to submit form
      await axiosClient.post("/support/create", form);
      setIsSuccess(true);
      setForm(initialForm);
      setIsPhoneVerified(false);
      setIsEmailVerified(false);
      setIsPhoneOtpSent(false);
      setIsEmailOtpSent(false);
      setPhoneOtp("");
      setEmailOtp("");
    } catch (error) {
      console.error("Support API Error:", error);
      showError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.mobile.trim() !== "" &&
    form.gender !== "" &&
    form.dob !== "" &&
    form.fullAddress.trim() !== "" &&
    form.city !== "" &&
    form.state !== "" &&
    form.prefferedContribution !== "" &&
    form.message.trim() !== "";

  return (
    <section>
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner
            ? seoData.page_banner.startsWith("http")
              ? seoData.page_banner
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
            : "/banner/support.png"
            }')`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative w-full h-42 md:h-56 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full px-4 text-center z-10"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-wide drop-shadow-lg">
              {seoData?.h1tag || "Our Support"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "Our Support"}
            </p>
          </motion.div>
        </div>
      </div>
      <div className="w-full px-2 md:px-12 lg:px-12 relative py-4 md:py-6 overflow-hidden">
        <div className="w-full lg:px-0">
          <h2 className="text-sm text-center md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Our Support
            </span>
          </h2>
          <p className="text-gray-600 text-[13px] md:text-sm text-center italic leading-relaxed">
            “We extend our support through wellness initiatives, cultural upliftment, women empowerment, compassionate service, and the protection of our environment.”
          </p>
          <div className="flex justify-center w-full">
            <div className="w-full py-4 relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
              <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
                Each milestone we achieve brings us closer to a more compassionate, environmentally balanced society. Our programs are growing thanks to the dedication of volunteers, partners, and supporters who believe in positive change. As we expand, we remain committed to empowering communities through education, healthcare, spiritual development, and environmental conservation. Guided by integrity and transparency, we strive to build a future that inspires hope, unity and lasting transformation — nurturing meaningful progress for generations to come. Your support helps us innovate, stay inclusive, and scale sustainable solutions for all.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-2 md:gap-8 bg-gray-50 py-2 md:py-4 px-2 md:px-4 rounded-lg shadow-inner">
          <div className="w-full lg:w-[45%] rounded-2xl bg-gradient-to-br from-[#0C55A0] via-[#0b4f96] to-[#08467c] text-white p-4 lg:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg lg:text-2xl font-semibold mb-6 tracking-wide">Support Our Mission</h3>
              <p className="text-sm md:text-base leading-relaxed text-white/95 mb-6">
                By submitting this form, you step into a purpose-driven journey dedicated to compassion, responsibility, and service to humanity. Your involvement enables us to design, implement, and scale initiatives that create meaningful and sustainable impact at the grassroots level.
              </p>
              <ul className="space-y-4 text-sm md:text-base text-white/95">
                <li className="flex gap-3 items-start"><span className="text-green-400 text-lg">✓</span><span>Volunteer in social, environmental, and humanitarian initiatives</span></li>
                <li className="flex gap-3 items-start"><span className="text-green-400 text-lg">✓</span><span>Contribute professional skills, expertise, or mentorship support</span></li>
                <li className="flex gap-3 items-start"><span className="text-green-400 text-lg">✓</span><span>Support programs through donations, resources, or funding assistance</span></li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-[55%] bg-white border border-gray-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-4 md:p-7 lg:p-9 relative overflow-hidden">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <div className="flex items-center justify-between md:col-span-2 border-b border-gray-200 pb-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Support Form</h2>
                <p className="text-xs md:text-sm text-gray-500">Fields marked with <span className="text-red-500">*</span> are required</p>
              </div>

              {isSuccess ? (
                <div className="md:col-span-2 py-10 text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Support Submitted Successfully!</h3>
                  <p className="text-gray-600">Thank you for supporting Namo Gange Trust. We truly appreciate your commitment.</p>
                  <button type="button" onClick={() => setIsSuccess(false)} className="bg-[#0C55A0] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#08467c]">Close</button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className="bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800 placeholder:text-gray-400" placeholder="Full Name" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Email ID <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <input type="email" name="email" value={form.email} onChange={handleChange} required disabled={isEmailVerified} className={`flex-1 bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm transition-all ${isEmailVerified ? "text-green-600 font-semibold italic" : "text-gray-800 placeholder:text-gray-400"}`} placeholder="Email Address" />
                      {!isEmailVerified && (
                        <button
                          type="button"
                          onClick={handleSendEmailOtp}
                          disabled={emailTimer > 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)}
                          className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-bold rounded-md uppercase transition-all flex items-center justify-center ${(emailTimer > 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) ? "bg-[#edf3ff] text-blue-300 cursor-not-allowed" : "bg-[#DF562C] text-white hover:bg-[#c54d21]"}`}
                        >
                          {isEmailOtpSent ? (emailTimer > 0 ? `RESEND IN ${emailTimer}S` : "RESEND OTP") : "SEND OTP"}
                        </button>
                      )}
                      {isEmailVerified && <span className="text-green-600 text-[10px] font-bold flex items-center px-2">VERIFIED ✓</span>}
                    </div>
                    {isEmailOtpSent && !isEmailVerified && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 flex gap-2">
                        <div className="flex-1 bg-[#fff9f4] border border-[#fca5a5]/50 px-4 py-2 rounded-sm flex items-center">
                          <input type="text" maxLength={6} placeholder="EMAIL OTP" value={emailOtp} onChange={(e) => setEmailOtp(e.target.value.replace(/[^0-9]/g, ""))} className="w-full bg-transparent outline-none text-[#f1a06a] text-sm text-center font-bold tracking-[0.2em] placeholder:text-[#f1a06a]/50 placeholder:font-normal placeholder:tracking-normal" />
                        </div>
                        <button type="button" onClick={handleVerifyEmailOtp} className="px-4 py-1.5 bg-[#DF562C] text-white text-[10px] font-bold rounded-md shadow-sm hover:bg-[#c54d21] active:scale-95 transition-all">Verify</button>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Mobile <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <input type="tel" name="mobile" maxLength={10} value={form.mobile} onChange={handlePhoneChange} required disabled={isPhoneVerified} className={`flex-1 bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm transition-all ${isPhoneVerified ? "text-green-600 font-semibold italic" : "text-gray-800 placeholder:text-gray-400"}`} placeholder="Mobile Number" />
                      {!isPhoneVerified && (
                        <button
                          type="button"
                          onClick={handleSendPhoneOtp}
                          disabled={phoneTimer > 0 || form.mobile.length !== 10}
                          className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-bold rounded-md uppercase transition-all flex items-center justify-center ${(phoneTimer > 0 || form.mobile.length !== 10) ? "bg-[#edf3ff] text-blue-300 cursor-not-allowed" : "bg-[#DF562C] text-white hover:bg-[#c54d21]"}`}
                        >
                          {isPhoneOtpSent ? (phoneTimer > 0 ? `RESEND IN ${phoneTimer}S` : "RESEND OTP") : "SEND OTP"}
                        </button>
                      )}
                      {isPhoneVerified && <span className="text-green-600 text-[10px] font-bold flex items-center px-2">VERIFIED ✓</span>}
                    </div>
                    {isPhoneOtpSent && !isPhoneVerified && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 flex gap-2">
                        <div className="flex-1 bg-[#fff9f4] border border-[#fca5a5]/50 px-4 py-2 rounded-sm flex items-center">
                          <input type="text" maxLength={6} placeholder="MOBILE OTP" value={phoneOtp} onChange={(e) => setPhoneOtp(e.target.value.replace(/[^0-9]/g, ""))} className="w-full bg-transparent outline-none text-[#f1a06a] text-sm text-center font-bold tracking-[0.2em] placeholder:text-[#f1a06a]/50 placeholder:font-normal placeholder:tracking-normal" />
                        </div>
                        <button type="button" onClick={handleVerifyPhoneOtp} className="px-4 py-1.5 bg-[#DF562C] text-white text-[10px] font-bold rounded-md shadow-sm hover:bg-[#c54d21] active:scale-95 transition-all">Verify</button>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
                    <select name="gender" value={form.gender} onChange={handleChange} required className="bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800"><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option></select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">DOB <span className="text-red-500">*</span></label>
                    <input type="date" name="dob" value={form.dob} onChange={handleChange} required className="bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
                    <select name="state" value={form.state} onChange={handleChange} required className="bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800"><option value="">State</option><option value="Delhi">Delhi</option></select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                    <select name="city" value={form.city} onChange={handleChange} required className="bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800"><option value="">Select</option><option value="Delhi">Delhi</option></select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Contribution <span className="text-red-500">*</span></label>
                    <select name="prefferedContribution" value={form.prefferedContribution} onChange={handleChange} required className="bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800"><option value="">Select</option><option value="Time">Time</option><option value="Financial">Financial</option></select>
                  </div>
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                    <input type="text" name="fullAddress" value={form.fullAddress} onChange={handleChange} required className="bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800 placeholder:text-gray-400" placeholder="Full Address" />
                  </div>
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={3} className="bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm resize-none text-gray-800 placeholder:text-gray-400"></textarea>
                  </div>
                  <div className="md:col-span-2 flex justify-center mt-4">
                    <button
                      type="submit"
                      disabled={loading || !isFormComplete || !isPhoneVerified || !isEmailVerified}
                      className="bg-[#DF562C] text-white px-12 py-2.5 rounded-md font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-[#c54d21] transition-all"
                    >
                      {loading ? "Submitting..." : "Submit Support"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
