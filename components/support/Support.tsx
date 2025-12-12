"use client";
import React, { useState } from "react";

interface SupportFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  ageGroup: string;
  supportType: string;
  address: string;
  city: string;
  state: string;
  contribution: string;
  message: string;
}

const initialForm: SupportFormData = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  ageGroup: "",
  supportType: "",
  address: "",
  city: "",
  state: "",
  contribution: "",
  message: "",
};

const Support = () => {
  const [form, setForm] = useState<SupportFormData>(initialForm);

  // Separate OTP States for Phone
  const [phoneOtp, setPhoneOtp] = useState<string>("");
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState<boolean>(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const [mockPhoneOtp, setMockPhoneOtp] = useState<string>("");

  // Separate OTP States for Email
  const [emailOtp, setEmailOtp] = useState<string>("");
  const [isEmailOtpSent, setIsEmailOtpSent] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [mockEmailOtp, setMockEmailOtp] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // Reset phone verification status if phone is changed
    if (e.target.name === "phone") {
      setIsPhoneVerified(false);
      setIsPhoneOtpSent(false);
      setPhoneOtp("");
      setMockPhoneOtp("");
    }
    // Reset email verification status if email is changed
    if (e.target.name === "email") {
      setIsEmailVerified(false);
      setIsEmailOtpSent(false);
      setEmailOtp("");
      setMockEmailOtp("");
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and max length 10
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      handleChange(e);
    }
  };

  // Logic to send OTP to Phone
  const handleSendPhoneOtp = async () => {
    if (form.phone.length !== 10) {
      alert("कृपया एक वैध 10-अंकों का मोबाइल नंबर दर्ज करें।");
      return;
    }

    // --- MOCK PHONE OTP SIMULATION ---
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setMockPhoneOtp(generatedOtp);
    setIsPhoneOtpSent(true);
    alert(`MOCK: Phone OTP sent to ${form.phone}. Use OTP: ${generatedOtp}`);
    // ---------------------------------
  };

  // Logic to verify Phone OTP
  const handleVerifyPhoneOtp = () => {
    if (phoneOtp === mockPhoneOtp && phoneOtp.length === 6) {
      setIsPhoneVerified(true);
      alert("Mobile OTP Verified Successfully!");
    } else {
      setIsPhoneVerified(false);
      alert("Invalid Mobile OTP. Please try again.");
    }
  };

  // Logic to send OTP to Email
  const handleSendEmailOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("कृपया एक मान्य ईमेल पता दर्ज करें।");
      return;
    }

    // --- MOCK EMAIL OTP SIMULATION ---
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setMockEmailOtp(generatedOtp);
    setIsEmailOtpSent(true);
    alert(`MOCK: Email OTP sent to ${form.email}. Use OTP: ${generatedOtp}`);
    // ---------------------------------
  };

  // Logic to verify Email OTP
  const handleVerifyEmailOtp = () => {
    if (emailOtp === mockEmailOtp && emailOtp.length === 6) {
      setIsEmailVerified(true);
      alert("Email OTP Verified Successfully!");
    } else {
      setIsEmailVerified(false);
      alert("Invalid Email OTP. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if both phone and email are verified before submitting
    if (!isPhoneVerified || !isEmailVerified) {
      alert(
        "कृपया सबमिट करने से पहले मोबाइल नंबर और ईमेल दोनों को OTP का उपयोग करके सत्यापित करें।"
      );
      return;
    }
    console.log("Form Data:", form);
    alert("Support Form Submitted Successfully!");
  };

  const isFormComplete =
    form.name &&
    form.gender &&
    form.ageGroup &&
    form.supportType &&
    form.address &&
    form.city &&
    form.state &&
    form.contribution &&
    form.message;

  return (
    <section className="w-full px-2 md:px-6 lg:px-6 relative py-4 md:py-6 overflow-hidden">
      <div className=" w-full lg:px-0">
        {/* Header */}
        <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-1 text-center">
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            {" "}
            Our Support
          </span>
        </h2>
        <p className="italic text-sm md:text-[15px] w-full text-gray-700 text-center mb-2">
          “We extend our support through wellness initiatives, cultural
          upliftment, women empowerment, compassionate service, and the
          protection of our environment.”
        </p>
        <div className="flex justify-center w-full">
          <div className=" w-full py-4 relative  overflow-hidden text-center ">
            {/* Decorative Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

            <p className="text-gray-700 text-sm text-justify md:text-[15px] leading-relaxed font-normal">
              Each milestone we achieve brings us closer to a more
              compassionate, environmentally balanced society. Our programs are
              growing thanks to the dedication of volunteers, partners, and
              supporters who believe in positive change. As we expand, we remain
              committed to empowering communities through education, healthcare,
              spiritual development, and environmental conservation. Guided by
              integrity and transparency, we strive to build a future that
              inspires hope, unity and lasting transformation — nurturing
              meaningful progress for generations to come. Your support helps us
              innovate, stay inclusive, and scale sustainable solutions for all.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-center text-xl font-medium mb-2">
        Please Complete the Support Form
      </h1>
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-2 lg:px-6 lg:py-5 md:p-10">
        {/* ========== FORM GRID START ========== */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {/* Full Name (col 1) */}
          <div className="flex flex-col ">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email (col 2) */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Email Id<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isEmailVerified}
              className={`border rounded px-3 py-2 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none ${
                isEmailVerified ? "bg-gray-100" : ""
              }`}
              placeholder="Enter your email"
            />
          </div>

          {/* Email OTP Section (col 3) */}
          <div className="flex flex-col col-span-1">
            <label className="text-sm font-medium text-gray-600 mb-1">
              {isEmailOtpSent && !isEmailVerified
                ? "Email OTP"
                : "Email Status"}
            </label>
            <div
              className={`flex items-center justify-between border rounded px-2 py-1.5 text-sm transition duration-300 ${
                isEmailVerified
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              {isEmailVerified ? (
                <span className="font-semibold">&#10003; Verified</span>
              ) : (
                <>
                  {!isEmailOtpSent ? (
                    <button
                      type="button"
                      onClick={handleSendEmailOtp}
                      disabled={form.email.length === 0 || isEmailVerified}
                      className={`py-1 px-3 text-xs rounded shadow ${
                        form.email.length === 0 || isEmailVerified
                          ? "bg-gray-500 text-white cursor-not-allowed"
                          : "bg-[#0C55A0] hover:bg-[#08467c] text-white"
                      }`}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        maxLength={6}
                        value={emailOtp}
                        onChange={(e) =>
                          setEmailOtp(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        placeholder="Enter OTP"
                        className="w-full border p-1 text-xs focus:ring-0 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyEmailOtp}
                        disabled={emailOtp.length !== 6}
                        className={`py-1 px-2 text-xs rounded shadow ml-2 ${
                          emailOtp.length !== 6
                            ? "bg-gray-500 text-white cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        Verify
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Phone (col 4) */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              maxLength={10}
              value={form.phone}
              onChange={handlePhoneChange} // Use the number-only handler
              required
              disabled={isPhoneVerified}
              className={`border rounded px-3 py-2 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none ${
                isPhoneVerified ? "bg-gray-100" : ""
              }`}
              placeholder="10-digit mobile number"
            />
          </div>

          {/* Phone OTP Section (col 5) */}
          <div className="flex flex-col col-span-1">
            <label className="text-sm font-medium text-gray-600 mb-1">
              {isPhoneOtpSent && !isPhoneVerified
                ? "Mobile OTP"
                : "Mobile Status"}
            </label>
            <div
              className={`flex items-center justify-between border rounded px-2 py-1.5 text-sm transition duration-300 ${
                isPhoneVerified
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              {isPhoneVerified ? (
                <span className="font-semibold">&#10003; Verified</span>
              ) : (
                <>
                  {!isPhoneOtpSent ? (
                    <button
                      type="button"
                      onClick={handleSendPhoneOtp}
                      disabled={form.phone.length !== 10 || isPhoneVerified}
                      className={`py-1 px-3 text-xs rounded shadow ${
                        form.phone.length !== 10 || isPhoneVerified
                          ? "bg-gray-500 text-white cursor-not-allowed"
                          : "bg-[#0C55A0] hover:bg-[#08467c] text-white"
                      }`}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        maxLength={6}
                        value={phoneOtp}
                        onChange={(e) =>
                          setPhoneOtp(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        placeholder="Enter OTP"
                        className="w-full border p-1 text-xs focus:ring-0 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyPhoneOtp}
                        disabled={phoneOtp.length !== 6}
                        className={`py-1 px-2 text-xs rounded shadow ml-2 ${
                          phoneOtp.length !== 6
                            ? "bg-gray-500 text-white cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        Verify
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 text-sm bg-white focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Age Group */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              DOB <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="ageGroup"
              value={form.ageGroup}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 text-sm bg-white focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
            />
          </div>

          {/* Support Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Support Type <span className="text-red-500">*</span>
            </label>
            <select
              name="supportType"
              value={form.supportType}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 text-sm bg-white focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
            >
              <option value="">Select support type</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Donation">Donation</option>
              <option value="Partnership">Partnership</option>
              <option value="Awareness">Awareness</option>
              <option value="Service">Service</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2 lg:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows={1}
              className="border rounded px-3 py-2 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
              placeholder="Enter your complete address"
            />
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none bg-white"
            >
              <option value="">Select State</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Delhi">Delhi</option>
              <option value="Haryana">Haryana</option>
              {/* ... other states */}
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none bg-white"
            >
              <option value="">Select City</option>

              {/* Common Cities */}
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
              {/* ... other cities */}
            </select>
          </div>

          {/* Contribution */}
          <div className="flex flex-col ">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Preferred Contribution <span className="text-red-500">*</span>
            </label>
            <select
              name="contribution"
              value={form.contribution}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 text-sm bg-white focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
            >
              <option value="">Choose contribution</option>
              <option value="Time">Time (Volunteering)</option>
              <option value="Skills">Skills / Services</option>
              <option value="Financial">Financial Contribution</option>
              <option value="Resources">Resources Support</option>
            </select>
          </div>

          {/* Message */}
          <div className="flex flex-col md:col-span-2 lg:col-span-4">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Message / Reason to Support{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="border rounded px-3 py-2 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
              placeholder="Write your message"
            />
          </div>

          {/* Submit - Disabled until both are verified */}
          <div className="md:col-span-2 mt-2 lg:col-span-5 flex justify-center">
            <button
              type="submit"
              disabled={!isPhoneVerified || !isEmailVerified || !isFormComplete} // Both must be verified
              className={`px-8 py-2 font-medium text-sm md:text-[15px] lg:text-[15px] rounded-md shadow transition duration-200 ${
                !isPhoneVerified || !isEmailVerified || !isFormComplete
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-[#0C55A0] hover:bg-[#08467c] text-white"
              }`}
            >
              Submit Support Form
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Support;
