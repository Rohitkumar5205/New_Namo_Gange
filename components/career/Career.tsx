"use client";
import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fetchClient from "@/lib/fetchClient";
import { showSuccess, showError } from "@/utils/toast";

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

interface Job {
  _id?: string;
  title: string;
  exp: string;
  salary: string;
  location: string;
  desc: string[];
}

const Career = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<null | (typeof jobs)[0]>(null);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    currentLocation: "",
    role: "",
    message: "",
  });

  // Static job data
  // const jobs = [
  //   {
  //     title: "Telemarketing Executive",
  //     exp: "Minimum 1 Year",
  //     salary: "Not disclosed",
  //     location: "Ghaziabad",
  //     desc: [
  //       "Strong communication and persuasive skills.",
  //       "Experience in cold calling and lead generation.",
  //       "Ability to handle objections and negotiate effectively.",
  //       "Target-driven with focus on achieving goals.",
  //       "Basic knowledge of exhibitions, events & stall marketing.",
  //     ],
  //   },
  //   {
  //     title: "Receptionist",
  //     exp: "Minimum 1 Year",
  //     salary: "Not disclosed",
  //     location: "Ghaziabad",
  //     desc: [
  //       "Must have good communication skills.",
  //       "Should be presentable.",
  //       "Should have ability to manage guests.",
  //       "Manage front desk.",
  //     ],
  //   },
  //   {
  //     title: "Sr. Accountant",
  //     exp: "2 - 3 Years",
  //     salary: "Not disclosed",
  //     location: "Ghaziabad",
  //     desc: [
  //       "Daily accounting functions.",
  //       "Balance sheet preparation.",
  //       "Income Tax, GST, TDS handling.",
  //       "Account reconciliation.",
  //       "Statutory compliance & audits.",
  //     ],
  //   },
  // ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSendPhoneOtp = async () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      showError("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      const res = await fetchClient.post("/otp/send-mobile-otp", { mobile: formData.phone });
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

  const handleSendEmailOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError("Please enter a valid email address.");
      return;
    }
    try {
      const res = await fetchClient.post("/otp/send-email-otp", { email: formData.email });
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

  const handleVerifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) {
      showError("Please enter a 6-digit OTP.");
      return;
    }
    try {
      const res = await fetchClient.post("/otp/verify-otp", { mobile: formData.phone, otp: phoneOtp });
      if (res.data.success) {
        setIsPhoneVerified(true);
        showSuccess("Phone Verified Successfully!");
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
      const res = await fetchClient.post("/otp/verify-otp", { email: formData.email, otp: emailOtp });
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
      showError("Please verify your phone and email first.");
      return;
    }

    setLoading(true);
    try {
      await fetchClient.post("/job-apply/create", formData);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        currentLocation: "",
        role: formData.role,
        message: "",
      });
      setIsPhoneVerified(false);
      setIsEmailVerified(false);
      setIsPhoneOtpSent(false);
      setIsEmailOtpSent(false);
      setPhoneOtp("");
      setEmailOtp("");
    } catch (error) {
      console.error("Apply error:", error);
      showError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetchClient.get("/jobs/list");
        setJobs(res.data.data || []);
      } catch (error) {
        console.error("Job fetch error:", error);
      }
    };

    fetchJobs();
  }, []);

  // Fetch SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await fetchClient.get(
          `/seo/page/${encodeURIComponent("/career")}`,
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
        console.error("Error fetching SEO data for career page:", error);
      } finally {
        setSeoLoading(false);
      }
    };
    fetchSEOData();
  }, []);

  return (
    <>
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner
            ? seoData.page_banner.startsWith("http")
              ? seoData.page_banner
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
            : "/career/career.jpeg"
            }')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative w-full h-42 md:h-56 flex items-center justify-center">
          <div




            className="w-full px-4 text-center z-10"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-wide drop-shadow-lg">
              {seoData?.h1tag || "Career"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "Career"}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full relative py-1.5 md:py-3 px-2 md:px-12  lg:px-12  bg-white overflow-hidden text-center">
        {/* HEADER */}
        <div className="">
          <h2 className="text-sm text-center md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            <span>
              Our{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Career
              </span>
            </span>
          </h2>
          <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
            "Explore meaningful career opportunities where passion meets
            purpose, and contribute to impactful social, cultural,
            environmental, and community-driven initiatives."
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

        <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
          At Namo Gange Trust, we believe in creating meaningful career
          opportunities where passion meets purpose. Our work environment
          encourages individuals to grow, innovate, and contribute to impactful
          initiatives across health, culture, education, environment, and
          community service. By joining us, you become a part of a mission
          dedicated to positive societal transformation, personal development,
          and service to humanity with compassion and integrity.
        </p>
      </div>
      {/* ===== NO CURRENT VACANCY MESSAGE ===== */}
      <div className="w-full py-1.5 md:py-3 px-2 md:px-12  lg:px-12">
        <div className="bg-[#0C55A0] rounded-xl py-8 px-6 md:px-12 text-center">
          <h2 className="text-lg md:text-2xl font-medium md:font-semibold text-white">
            Career Opportunities
          </h2>

          {/* Divider */}
          <div className="w-20 h-[2px] bg-white/40 mx-auto my-4 rounded-full"></div>

          <p className="max-w-7xl mx-auto text-sm md:text-[15px] text-justify leading-relaxed text-white/90">
            Currently, there are no active job vacancies at Namo Gange Trust.
            However, our organisation is continuously evolving as we expand our
            initiatives across social welfare, cultural preservation,
            environmental care, and spiritual upliftment. As new projects and
            programmes take shape, career opportunities may arise in various
            roles and capacities. Any upcoming openings will be updated and
            clearly reflected on this page in due course. We encourage you to
            visit again periodically to stay informed about future opportunities
            and potential ways to contribute to our mission.
          </p>

          {/* Soft Footer Line */}
          <p className="mt-4 text-xs md:text-sm text-white/70 italic">
            We appreciate your interest in being a part of our mission.
          </p>
        </div>
      </div>

      {/* ================= job crads ================= */}
      <div className="w-full py-1.5 md:py-3 px-2 md:px-12  lg:px-12 mt-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-sm rounded-lg p-2 md:px-6 md:py-4 hover:shadow-md 
                 transition-all flex flex-col justify-between h-full"
          >
            {/* Job Title */}
            <h3 className="text-sm md:text-lg font-medium md:font-semibold text-[#0C55A0] mb-2">
              {job?.title}
            </h3>

            {/* Job Info */}
            <div className="text-sm text-gray-700 space-y-1 border-b pb-3">
              <p className="flex items-center gap-2">
                <Briefcase size={16} /> {job?.exp}
              </p>

              <p className="flex items-center gap-2">
                <span className="ml-1">₹</span> {job?.salary}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} /> {job?.location}
              </p>
            </div>

            {/* Description */}
            <div className="mt-3 text-xs md:text-sm text-gray-700 text-justify space-y-1 leading-relaxed flex-1">
              {job?.desc?.map((line, i) => (
                <p key={i}>• {line}</p>
              ))}
            </div>

            {/* BUTTON */}
            <button
              onClick={() => {
                setSelectedJob(job);
                setFormData((prev) => ({
                  ...prev,
                  role: job?.title, // 👈 auto fill role
                }));
                setOpenModal(true);
              }}
              className="
    w-1/2 md:w-full
    mx-auto md:mx-0
    mt-3 md:mt-5
    py-1 md:py-1.5
    text-xs md:text-sm
    font-medium
    rounded-md
    bg-[#0C55A0]
    text-white
    shadow-sm
    transition-all duration-300
    hover:bg-[#08467c]
    hover:shadow-md
    active:scale-[0.98]
    focus:outline-none
    focus:ring-2 focus:ring-[#0C55A0]/40
  "
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* ========= POPUP MODAL ========= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[95%] md:w-[90%] lg:w-[90%] h-[95vh] rounded-xl shadow-xl overflow-hidden relative flex">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-6 top-6 text-gray-600 text-2xl hover:text-black z-50"
            >
              ✕
            </button>

            {/* LEFT IMAGE SECTION */}
            <div className="hidden md:flex w-[40%] h-full relative overflow-hidden">
              {/* Background Image */}
              <Image
                src="/career/career.jpeg"
                alt="Namo Gange Trust"
                fill
                priority
                className="object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C55A0]/80 via-[#0C55A0]/40 to-transparent"></div>

              {/* Text Content */}
              <div className="relative z-10 p-6 text-white flex flex-col justify-end text-center w-full h-full">
                <h3 className="text-xl font-semibold tracking-wide">
                  Namo Gange Trust
                </h3>
                <p className="text-sm mt-2 opacity-90 leading-relaxed">
                  Join a mission-driven organisation working for social,
                  cultural, environmental & spiritual upliftment.
                </p>
              </div>
            </div>

            {/* RIGHT FORM SECTION */}
            <div className="w-full md:w-[60%] flex flex-col p-8">
              {isSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Application Submitted!</h3>
                  <p className="text-sm text-gray-600">
                    Thank you for applying. We will review your profile and get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setOpenModal(false);
                    }}
                    className="bg-[#0C55A0] text-white px-8 py-2 rounded shadow-md text-sm font-semibold hover:bg-[#08467c]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Title */}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Join Our Team
                  </h2>
                  <p className="italic text-sm md:text-[15px] w-full text-gray-700 text-center mb-2">
                    “This form is intended for individuals who wish to associate
                    with us through a spirit of selfless service and sincere
                    dedication. We encourage you to proceed only if your intent is
                    guided by seva (service), compassion, and a desire to contribute
                    meaningfully — not by commercial expectations or personal gain.”
                  </p>

                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
                    {/* Scrollable Form Area */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* NAME */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1 text-gray-700">Your Name</label>
                          <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Full Name"
                            className="border rounded px-4 py-2 text-sm focus:ring-1 focus:ring-[#0C55A0] outline-none"
                          />
                        </div>

                        {/* EMAIL */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1 text-gray-700">Email</label>
                          <div className="flex gap-2">
                            <input
                              required
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              type="email"
                              disabled={isEmailVerified}
                              placeholder="Email Address"
                              className={`flex-1 border rounded px-4 py-2 text-sm focus:ring-1 focus:ring-[#0C55A0] outline-none transition-all ${isEmailVerified ? "text-green-600 font-semibold italic" : "text-gray-800 placeholder:text-gray-400"}`}
                            />
                            {!isEmailVerified && (
                              <button
                                type="button"
                                onClick={handleSendEmailOtp}
                                disabled={emailTimer > 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                                className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-bold rounded-md uppercase transition-all flex items-center justify-center ${(emailTimer > 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#DF562C] text-white hover:bg-[#c54d21]"}`}
                              >
                                {isEmailOtpSent ? (emailTimer > 0 ? `RESEND IN ${emailTimer}S` : "RESEND OTP") : "SEND OTP"}
                              </button>
                            )}
                            {isEmailVerified && <span className="text-green-600 text-[10px] font-bold flex items-center px-2">VERIFIED ✓</span>}
                          </div>
                          {isEmailOtpSent && !isEmailVerified && (
                            <div className="mt-2 flex gap-2">
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
                            </div>
                          )}
                        </div>

                        {/* PHONE */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1 text-gray-700">Phone Number</label>
                          <div className="flex gap-2">
                            <input
                              required
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              type="tel"
                              maxLength={10}
                              disabled={isPhoneVerified}
                              placeholder="Enter mobile number"
                              className={`flex-1 border rounded px-4 py-2 text-sm focus:ring-1 focus:ring-[#0C55A0] outline-none transition-all ${isPhoneVerified ? "text-green-600 font-semibold italic" : "text-gray-800 placeholder:text-gray-400"}`}
                            />
                            {!isPhoneVerified && (
                              <button
                                type="button"
                                onClick={handleSendPhoneOtp}
                                disabled={phoneTimer > 0 || formData.phone.length !== 10}
                                className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-bold rounded-md uppercase transition-all flex items-center justify-center ${(phoneTimer > 0 || formData.phone.length !== 10) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#DF562C] text-white hover:bg-[#c54d21]"}`}
                              >
                                {isPhoneOtpSent ? (phoneTimer > 0 ? `RESEND IN ${phoneTimer}S` : "RESEND OTP") : "SEND OTP"}
                              </button>
                            )}
                            {isPhoneVerified && <span className="text-green-600 text-[10px] font-bold flex items-center px-2">VERIFIED ✓</span>}
                          </div>
                          {isPhoneOtpSent && !isPhoneVerified && (
                            <div className="mt-2 flex gap-2">
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
                            </div>
                          )}
                        </div>
                        {/* City */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1 text-gray-700">City</label>
                          <input
                            required
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            type="text"
                            placeholder="City"
                            className="border rounded px-4 py-2 text-sm focus:ring-1 focus:ring-[#0C55A0] outline-none"
                          />
                        </div>
                        {/* STATE */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1 text-gray-700">State</label>
                          <input
                            required
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            type="text"
                            placeholder="State"
                            className="border rounded px-4 py-2 text-sm focus:ring-1 focus:ring-[#0C55A0] outline-none"
                          />
                        </div>

                        {/* CURRENT LOCATION */}
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1 text-gray-700">Current Location</label>
                          <input
                            required
                            name="currentLocation"
                            value={formData.currentLocation}
                            onChange={handleChange}
                            type="text"
                            placeholder="Current Location"
                            className="border rounded px-4 py-2 text-sm focus:ring-1 focus:ring-[#0C55A0] outline-none"
                          />
                        </div>

                        {/* ROLE */}
                        <div className="flex flex-col md:col-span-2">
                          <label className="text-sm font-medium mb-1 text-gray-700">Role Applying For</label>
                          <input
                            name="role"
                            value={formData.role}
                            type="text"
                            readOnly
                            className="border rounded px-4 py-2 text-sm bg-gray-100 focus:ring-0 outline-none text-gray-500 font-medium"
                          />
                        </div>

                        {/* MESSAGE */}
                        <div className="flex flex-col md:col-span-2">
                          <label className="text-sm font-medium mb-1 text-gray-700">Your Message</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            className="border rounded px-4 py-2 text-sm h-28 focus:ring-1 focus:ring-[#0C55A0] outline-none resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* FIXED BUTTON (Always bottom) */}
                    <div className="mt-4 border-t pt-4 flex justify-center">
                      <button
                        type="submit"
                        disabled={loading || !isPhoneVerified || !isEmailVerified}
                        className="bg-[#0C55A0] hover:bg-[#08467c] text-white px-8 py-2.5 rounded shadow-md text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                      >
                        {loading ? "Submitting..." : "Apply Now"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Career;
