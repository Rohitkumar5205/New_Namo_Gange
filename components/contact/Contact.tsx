"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Mail, MapPin, Phone, Send, User, MessageSquare } from "lucide-react";
import fetchClient from "@/lib/fetchClient";
import Link from "next/link";
import { showSuccess, showError } from "@/utils/toast";
import Image from "next/image";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}
interface SocialMediaData {
  mail: string;
  mail2: string;
  callNumber: string;
  callNumber2: string;
  address: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);
  const [socialData, setSocialData] = useState<SocialMediaData | null>(null);

  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await fetchClient.get(
          `/seo/page/${encodeURIComponent("/contact")}`,
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
        console.error("Error fetching SEO data for contact page:", error);
      } finally {
        setSeoLoading(false);
      }
    };
    fetchSEOData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchClient.get("/social-media/get");
        // setSocialData(res.data.data);
        setSocialData(res.data.data[0]);
      } catch (error) {
        console.error("Failed to fetch social media data", error);
      }
    };

    fetchData();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
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

  /* ================= HANDLE SEND OTP ================= */
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

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPhoneVerified || !isEmailVerified) {
      showError("Please verify your phone and email first.");
      return;
    }

    setLoading(true);
    try {
      await fetchClient.post("/enquire-list/create", {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        message: formData.message,
      });

      showSuccess("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsPhoneVerified(false);
      setIsEmailVerified(false);
      setIsPhoneOtpSent(false);
      setIsEmailOtpSent(false);
      setPhoneOtp("");
      setEmailOtp("");
    } catch (error) {
      console.error("❌ Enquiry API Error:", error);
      showError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner
            ? seoData.page_banner.startsWith("http")
              ? seoData.page_banner
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
            : "/home/contact.jpg"
            }')`,
          backgroundAttachment: "scroll",
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
              {seoData?.h1tag || "Connect"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "Connect"}
            </p>
          </div>
        </div>
      </div>
      <div className="relative bg-gray-50 py-8 md:py-12 px-4 md:px-12 lg:px-12 overflow-hidden">
        <div className="w-full text-center">
          <div>
            <h2 className="text-sm text-center md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
              Let’s{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Connect
              </span>
            </h2>

            <p className="text-gray-600 text-[13px] md:text-sm italic leading-relaxed">
              "Have a question, feedback, or want to collaborate? We’d love to
              hear from you. Fill out the form below, and our team will get back
              to you soon."
            </p>
          </div>

          <div className="w-full h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

          <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
            At Namo Gange Trust, we believe in building meaningful connections
            rooted in service, compassion, and shared purpose. By connecting
            with us, you become part of a collective journey dedicated to social
            responsibility and positive impact.
          </p>

          {/* ================= CONTACT SECTION ================= */}
          <div className="w-full mt-8 md:mt-10 mb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 max-w-7xl mx-auto">
            {/* -------- CONTACT INFO CARD -------- */}
            <div className="lg:col-span-5 relative bg-gradient-to-br from-[#0C55A0] to-[#063D8E] text-white rounded-3xl p-8 md:p-10 shadow-2xl text-left overflow-hidden flex flex-col justify-center border border-blue-800">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-[#DF562C]/30 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex items-center gap-5 mb-10">
                <div className="bg-white rounded-full p-2.5 shadow-xl">
                  <Image
                    width={70}
                    height={70}
                    src="/logo.png"
                    alt="Namo Gange Trust"
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-wide">
                    Namo Gange Trust
                  </h3>
                  <p className="text-sm md:text-base text-blue-200 mt-1 font-medium tracking-wide">
                    Service • Compassion • Commitment
                  </p>
                </div>
              </div>

              <div className="relative z-10 space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3 rounded-2xl group-hover:bg-[#DF562C] shadow-sm transition-colors duration-400">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-blue-200 font-medium mb-1 tracking-wider uppercase">
                      Call Us
                    </p>
                    <p className="text-base md:text-lg font-semibold">
                      {socialData?.callNumber || ""}
                    </p>
                    {socialData?.callNumber2 && (
                      <p className="text-base md:text-lg font-semibold mt-0.5">
                        {socialData?.callNumber2 || ""}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3 rounded-2xl group-hover:bg-[#DF562C] shadow-sm transition-colors duration-400">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-blue-200 font-medium mb-1 tracking-wider uppercase">
                      Email Us
                    </p>
                    <p className="text-base md:text-lg font-semibold">
                      {socialData?.mail || ""}
                    </p>
                    {socialData?.mail2 && (
                      <p className="text-base md:text-lg font-semibold mt-0.5">
                        {socialData?.mail2 || ""}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-white/10 p-3 rounded-2xl group-hover:bg-[#DF562C] shadow-sm transition-colors duration-400">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-blue-200 font-medium mb-1 tracking-wider uppercase">
                      Visit Us
                    </p>
                    <p className="text-base font-medium leading-relaxed max-w-xs pr-4">
                      {socialData?.address || ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* -------- FORM -------- */}
            <div
            className="lg:col-span-7 rounded-3xl p-[2px] shadow-2xl shadow-[#0C55A0]/15 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #0C55A0, #f89a36, #DF562C)",
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="w-full h-full bg-white rounded-[22px] p-8 md:p-10 flex flex-col justify-between relative z-10"
            >
              <div className="mb-6 md:mb-8 text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                  Send Us a Message
                </h3>
                <p className="text-gray-500 text-sm">
                  We'd love to hear from you. Please fill out the form below.
                </p>
              </div>

              <div className="space-y-5">
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[#0C55A0] transition-colors" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full bg-white border border-gray-400 shadow-sm text-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-[#0C55A0] focus:ring-4 focus:ring-[#0C55A0]/10 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <div className="relative group">
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[#0C55A0] transition-colors z-10" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        disabled={isEmailVerified}
                        className={`w-full bg-white border border-gray-400 shadow-sm rounded-xl pl-12 pr-28 py-3.5 text-sm outline-none focus:border-[#0C55A0] focus:ring-4 focus:ring-[#0C55A0]/10 transition-all duration-300 ${isEmailVerified ? "text-green-700 font-semibold bg-green-50 border-green-400" : "text-gray-800"}`}
                        required
                      />
                      <div className="absolute right-2">
                        {!isEmailVerified ? (
                          <button
                            type="button"
                            onClick={handleSendEmailOtp}
                            disabled={emailTimer > 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                            className={`px-3 py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all flex items-center justify-center ${
                              (emailTimer > 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#0C55A0]/10 text-[#0C55A0] hover:bg-[#0C55A0] hover:text-white"
                            }`}
                          >
                            {isEmailOtpSent ? (emailTimer > 0 ? `IN ${emailTimer}S` : "RESEND") : "SEND OTP"}
                          </button>
                        ) : (
                          <div className="flex items-center px-3 text-green-600 text-[11px] font-bold tracking-wider">
                            VERIFIED ✓
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEmailOtpSent && !isEmailVerified && (
                    <div className="mt-3 flex gap-3 transform transition-all duration-300 ease-in-out">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="ENTER EMAIL OTP"
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full bg-blue-50/50 border border-blue-400 shadow-sm rounded-xl px-4 py-3 outline-none text-[#0C55A0] text-sm text-center font-bold tracking-[0.3em] placeholder:text-blue-300 placeholder:font-medium placeholder:tracking-normal focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyEmailOtp}
                        className="px-6 py-3 bg-[#0C55A0] text-white text-[11px] tracking-wider font-bold rounded-xl shadow-md hover:bg-[#08467c] hover:shadow-lg active:scale-95 transition-all"
                      >
                        VERIFY
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="relative group">
                    <div className="relative flex items-center">
                      <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[#0C55A0] transition-colors z-10" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        disabled={isPhoneVerified}
                        maxLength={10}
                        className={`w-full bg-white border border-gray-400 shadow-sm rounded-xl pl-12 pr-28 py-3.5 text-sm outline-none focus:border-[#0C55A0] focus:ring-4 focus:ring-[#0C55A0]/10 transition-all duration-300 ${isPhoneVerified ? "text-green-700 font-semibold bg-green-50 border-green-400" : "text-gray-800"}`}
                        required
                      />
                      <div className="absolute right-2">
                        {!isPhoneVerified ? (
                          <button
                            type="button"
                            onClick={handleSendPhoneOtp}
                            disabled={phoneTimer > 0 || formData.phone.length !== 10}
                            className={`px-3 py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all flex items-center justify-center ${
                              (phoneTimer > 0 || formData.phone.length !== 10) ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#0C55A0]/10 text-[#0C55A0] hover:bg-[#0C55A0] hover:text-white"
                            }`}
                          >
                            {isPhoneOtpSent ? (phoneTimer > 0 ? `IN ${phoneTimer}S` : "RESEND") : "SEND OTP"}
                          </button>
                        ) : (
                          <div className="flex items-center px-3 text-green-600 text-[11px] font-bold tracking-wider">
                            VERIFIED ✓
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {isPhoneOtpSent && !isPhoneVerified && (
                    <div className="mt-3 flex gap-3 transform transition-all duration-300 ease-in-out">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="ENTER MOBILE OTP"
                        value={phoneOtp}
                        onChange={(e) => setPhoneOtp(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full bg-blue-50/50 border border-blue-300 shadow-sm rounded-xl px-4 py-3 outline-none text-[#0C55A0] text-sm text-center font-bold tracking-[0.3em] placeholder:text-blue-300 placeholder:font-medium placeholder:tracking-normal focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyPhoneOtp}
                        className="px-6 py-3 bg-[#0C55A0] text-white text-[11px] tracking-wider font-bold rounded-xl shadow-md hover:bg-[#08467c] hover:shadow-lg active:scale-95 transition-all"
                      >
                        VERIFY
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[#0C55A0] transition-colors" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    rows={4}
                    className="w-full bg-white border border-gray-400 shadow-sm text-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-[#0C55A0] focus:ring-4 focus:ring-[#0C55A0]/10 transition-all duration-300 resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !isPhoneVerified || !isEmailVerified}
                className="mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#DF562C] to-[#f89a36] hover:from-[#c54d21] hover:to-[#e6831d] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Enquiry
                  </>
                )}
              </button>
            </form>
            </div>
          </div>

          {/* MAP */}
          <div className="py-2 md:py-5 lg:py-5 rounded">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7000.423416262373!2d77.37740819352632!3d28.68331300254777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf07cc46dbd6f%3A0xdbf4390a96ef056e!2sNamo%20Gange%20Trust%20(Best%20NGO%20in%20Ghaziabad)!5e0!3m2!1sen!2sin!4v1763013400984!5m2!1sen!2sin"
              width="100%"
              height="450"
              //   allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl border border-gray-300"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
