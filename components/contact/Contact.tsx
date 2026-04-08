"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Mail, MapPin, Phone, Send, User, MessageSquare } from "lucide-react";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";
import { motion } from "framer-motion";
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
        const res = await axiosClient.get(
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
        const res = await axiosClient.get("/social-media/get");
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
      const res = await axiosClient.post("/otp/send-mobile-otp", { mobile: formData.phone });
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
      const res = await axiosClient.post("/otp/send-email-otp", { email: formData.email });
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
      const res = await axiosClient.post("/otp/verify-otp", { mobile: formData.phone, otp: phoneOtp });
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
      const res = await axiosClient.post("/otp/verify-otp", { email: formData.email, otp: emailOtp });
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
      await axiosClient.post("/enquire-list/create", {
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
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
          </motion.div>
        </div>
      </div>
      <div className="relative bg-gray-50 py-1.5 md:py-3 px-2 md:px-12  lg:px-12  bg-white overflow-hidden">
        <div className="w-full  text-center">
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
          <div className="w-full mt-2 md:mt-5 grid grid-cols-1 lg:grid-cols-2 gap-2 g md:gap-10">
            {/* -------- CONTACT INFO CARD -------- */}
            <div className="bg-gradient-to-r from-[#4141b8] to-[#063D8E] text-white rounded p-6 md:p-8 shadow-xl text-left">
              <div className="flex items-center gap-4 mb-5">
                <Image
                                      width={100}
                                      height={100}
                  src="/logo.png"
                  alt="Namo Gange Trust"
                  className="w-18 h-18 bg-white rounded-full p-2 object-contain"
                />
                <div>
                  <h3 className="text-lg font-medium md:text-xl md:font-semibold">
                    Namo Gange Trust
                  </h3>
                  <p className="text-sm opacity-90">
                    Service • Compassion • Commitment
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-5 h-5 mt-1 opacity-90" />
                <div>
                  <p className="text-[15px] md:text-lg font-normal md:font-medium">
                    Phone
                  </p>
                  <p className="text-sm opacity-90">
                    {socialData?.callNumber || ""}
                  </p>
                  {socialData?.callNumber2 ? <p className="text-sm opacity-90">
                    {socialData?.callNumber2 || ""}
                  </p> : ""}
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Mail className="w-5 h-5 mt-1 opacity-90" />
                <div>
                  <p className="text-[15px] md:text-lg font-normal md:font-medium">
                    Email
                  </p>
                  <p className="text-sm opacity-90">
                    {socialData?.mail || ""}
                  </p>
                  {socialData?.mail2 ? <p className="text-sm opacity-90">
                    {socialData?.mail2 || ""}
                  </p> : ""}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 opacity-90" />
                <div>
                  <p className="text-[15px] md:text-lg font-normal md:font-medium">
                    Office Address
                  </p>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {socialData?.address || ""}
                  </p>
                </div>
              </div>
            </div>

            {/* -------- FORM -------- */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded p-8 flex flex-col justify-between"
            >
              <h3 className="text-lg md:text-xl font-normal md:font-medium text-gray-800 mb-4">
                Send Us a Message
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm text-gray-800 placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <div className="relative">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        disabled={isEmailVerified}
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
                      {isEmailVerified && (
                        <div className="flex items-center text-green-600 text-[10px] font-bold px-2 whitespace-nowrap">
                          VERIFIED ✓
                        </div>
                      )}
                    </div>
                  </div>

                  {isEmailOtpSent && !isEmailVerified && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2 flex gap-2 items-center"
                    >
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

                <div>
                  <div className="relative">
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        disabled={isPhoneVerified}
                        maxLength={10}
                        className={`w-full bg-[#edf3ff] px-4 py-3 text-sm outline-none rounded-sm transition-all ${isPhoneVerified ? "text-green-600 font-semibold italic" : "text-gray-800 placeholder:text-gray-400"}`}
                        required
                      />
                      {!isPhoneVerified && (
                        <button
                          type="button"
                          onClick={handleSendPhoneOtp}
                          disabled={phoneTimer > 0 || formData.phone.length !== 10}
                          className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-bold rounded-md uppercase transition-all flex items-center justify-center ${(phoneTimer > 0 || formData.phone.length !== 10) ? "bg-[#edf3ff] text-blue-300 cursor-not-allowed" : "bg-[#DF562C] text-white hover:bg-[#c54d21]"}`}
                        >
                          {isPhoneOtpSent ? (phoneTimer > 0 ? `RESEND IN ${phoneTimer}S` : "RESEND OTP") : "SEND OTP"}
                        </button>
                      )}
                      {isPhoneVerified && (
                        <div className="flex items-center text-green-600 text-[10px] font-bold px-2 whitespace-nowrap">
                          VERIFIED ✓
                        </div>
                      )}
                    </div>
                  </div>

                  {isPhoneOtpSent && !isPhoneVerified && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2 flex gap-2 items-center"
                    >
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

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    rows={4}
                    className="w-full border border-gray-300 pl-10 pr-3 py-2 text-sm outline-none resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !isPhoneVerified || !isEmailVerified}
                className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] text-white font-semibold py-2 hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Submit Enquiry"}
              </button>
            </form>
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
