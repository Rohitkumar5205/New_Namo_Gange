"use client";
import React, { useState } from "react";
import Link from "next/link";
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
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpStep, setOtpStep] = useState<"verify" | "success">("verify");

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

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!isPhoneVerified || !isEmailVerified) {
  //     alert(
  //       "कृपया सबमिट करने से पहले मोबाइल नंबर और ईमेल दोनों को OTP का उपयोग करके सत्यापित करें।"
  //     );
  //     return;
  //   }
  //   console.log("Form Data:", form);
  //   alert("Support Form Submitted Successfully!");
  // };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      alert("कृपया सभी आवश्यक जानकारी भरें।");
      return;
    }

    // Send OTPs
    handleSendEmailOtp();
    handleSendPhoneOtp();

    setShowOtpModal(true);
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
    <section>
      <div
        className="w-full  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner/support.png')" }}
      >
        {/* Overlay */}
        <div className="bg-black/20 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Our Support
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Our Support
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-2 md:px-12  lg:px-12 relative py-4 md:py-6 overflow-hidden">
        <div className=" w-full lg:px-0">
          {/* Header */}
          <h2 className="text-sm text-center md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              {" "}
              Our Support
            </span>
          </h2>
          <p className="text-gray-600 text-[13px] md:text-sm text-center italic leading-relaxed">
            “We extend our support through wellness initiatives, cultural
            upliftment, women empowerment, compassionate service, and the
            protection of our environment.”
          </p>
          <div className="flex justify-center w-full">
            <div className=" w-full py-4 relative  overflow-hidden text-center ">
              {/* Decorative Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

              <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
                Each milestone we achieve brings us closer to a more
                compassionate, environmentally balanced society. Our programs
                are growing thanks to the dedication of volunteers, partners,
                and supporters who believe in positive change. As we expand, we
                remain committed to empowering communities through education,
                healthcare, spiritual development, and environmental
                conservation. Guided by integrity and transparency, we strive to
                build a future that inspires hope, unity and lasting
                transformation — nurturing meaningful progress for generations
                to come. Your support helps us innovate, stay inclusive, and
                scale sustainable solutions for all.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-2 md:gap-8 bg-gray-50 py-2 md:py-4 px-2 md:px-4 rounded">
          {/* ================= LEFT INFO PANEL ================= */}
          <div
            className="
    w-full lg:w-[45%]
    rounded-2xl
    bg-gradient-to-br from-[#0C55A0] via-[#0b4f96] to-[#08467c]
    text-white
    p-4 lg:p-10
    flex flex-col justify-between
    shadow-lg
  "
          >
            <div>
              <h3 className="text-lg lg:text-2xl font-medium md:font-semibold mb-4 tracking-wide">
                Support Our Mission
              </h3>

              <p className="text-xs md:text-[15px] leading-relaxed text-white/95 mb-4">
                By submitting this form, you step into a purpose-driven journey
                dedicated to compassion, responsibility, and service to
                humanity. Your involvement enables us to design, implement, and
                scale initiatives that create meaningful and sustainable impact
                at the grassroots level.
              </p>

              <p className="text-xs md:text-[15px] leading-relaxed text-white/90 mb-5">
                Every contribution—whether through time, skills, resources, or
                strategic partnerships—strengthens our collective mission.
                Together, we work toward empowering communities, uplifting
                lives, and fostering long-term social transformation guided by
                ethical values and shared responsibility.
              </p>

              <ul className="space-y-3 text-xs md:text-[15px] text-white/95">
                <li className="flex gap-3">
                  <span>✔</span>
                  <span>
                    Volunteer in social, environmental, and humanitarian
                    initiatives
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>✔</span>
                  <span>
                    Contribute professional skills, expertise, or mentorship
                    support
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>✔</span>
                  <span>
                    Support programs through donations, resources, or funding
                    assistance
                  </span>
                </li>
                <li className="flex gap-3">
                  <span>✔</span>
                  <span>
                    Partner with us for long-term, high-impact community
                    development
                  </span>
                </li>
              </ul>
            </div>

            {/* <p className="mt-8 text-xs md:text-sm text-white/70 border-t border-white/20 pt-4 leading-relaxed">
    * All information shared through this form is kept strictly confidential
    and is used solely for coordination, communication, and engagement related
    to our initiatives.
  </p> */}
          </div>

          {/* ================= RIGHT FORM PANEL ================= */}
          <div
            className="
      w-full lg:w-[55%]
      bg-white
      border border-gray-200
      rounded-2xl
      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
      p-4 md:p-7 lg:p-9
    "
          >
            <form className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4">
              {/* FORM TITLE */}
              <div className="lg:col-span-3 mb-2 text-center">
                <h2 className="text-base md:text-xl font-medium text-gray-800">
                  Support Form
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1 border-t border-gray-200 pt-2">
                  Fields marked with <span className="text-red-500">*</span> are
                  required
                </p>
              </div>

              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="border rounded-md px-3 py-1 md:py-1.5 text-sm focus:border-[#1e7ed3] outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={isEmailVerified}
                  className={`border rounded-md px-3 py-1 md:py-1.5 text-sm focus:border-[#1e7ed3] outline-none ${
                    isEmailVerified ? "bg-gray-100" : ""
                  }`}
                  placeholder="Enter your email"
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={form.phone}
                  onChange={handlePhoneChange}
                  required
                  disabled={isPhoneVerified}
                  className={`border rounded-md px-3 py-1 md:py-1.5 text-sm focus:border-[#1e7ed3] outline-none ${
                    isPhoneVerified ? "bg-gray-100" : ""
                  }`}
                  placeholder="10-digit mobile number"
                />
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
                  className="border rounded-md px-3 py-1 md:py-1.5 text-sm bg-white outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* DOB */}
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
                  className="border rounded-md px-3 py-1 md:py-1.5 text-sm bg-white outline-none"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="border rounded-md px-3 py-1 md:py-1.5 text-sm outline-none"
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
                  className="border rounded-md px-3 py-1 md:py-1.5 text-sm bg-white outline-none"
                >
                  <option value="">Select State</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Haryana">Haryana</option>
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
                  className="border rounded-md px-3 py-1 md:py-1.5 text-sm bg-white outline-none"
                >
                  <option value="">Select City</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Noida">Noida</option>
                </select>
              </div>

              {/* Contribution */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Preferred Contribution <span className="text-red-500">*</span>
                </label>
                <select
                  name="contribution"
                  value={form.contribution}
                  onChange={handleChange}
                  required
                  className="border rounded-md px-3 py-1 md:py-1.5 text-sm bg-white outline-none"
                >
                  <option value="">Choose contribution</option>
                  <option value="Time">Time (Volunteering)</option>
                  <option value="Skills">Skills / Services</option>
                  <option value="Financial">Financial Contribution</option>
                  <option value="Resources">Resources Support</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col md:col-span-3 lg:col-span-3">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Message / Reason to Support{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="border rounded-md px-3 py-1 md:py-1.5 text-sm outline-none"
                  placeholder="Write your message"
                />
              </div>

              {/* Submit */}
              <div className="lg:col-span-3 flex justify-center mt-4">
                <button
                  type="submit"
                  onClick={handleInitialSubmit}
                  disabled={!isFormComplete}
                  className={`px-12 py-1 md:py-1.5 text-sm md:text-[15px] font-medium rounded-md shadow transition ${
                    !isFormComplete
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-[#0C55A0] hover:bg-[#08467c] text-white"
                  }`}
                >
                  Submit Support Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {showOtpModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] md:w-[400px] rounded-xl p-6 shadow-xl">
              {otpStep === "verify" ? (
                <>
                  <h3 className="text-lg font-semibold text-center mb-4">
                    Verify Your Details
                  </h3>

                  {/* Email OTP */}
                  <div className="mb-3">
                    <label className="text-sm font-medium">Email OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={emailOtp}
                      onChange={(e) =>
                        setEmailOtp(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="w-full border rounded px-3 py-2 text-sm mt-1"
                      placeholder="Enter Email OTP"
                    />
                  </div>

                  {/* Phone OTP */}
                  <div className="mb-4">
                    <label className="text-sm font-medium">Mobile OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={phoneOtp}
                      onChange={(e) =>
                        setPhoneOtp(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="w-full border rounded px-3 py-2 text-sm mt-1"
                      placeholder="Enter Mobile OTP"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (
                        phoneOtp === mockPhoneOtp &&
                        emailOtp === mockEmailOtp
                      ) {
                        setIsPhoneVerified(true);
                        setIsEmailVerified(true);
                        setOtpStep("success");
                      } else {
                        alert("Invalid OTPs. Please try again.");
                      }
                    }}
                    className="w-full bg-[#0C55A0] hover:bg-[#08467c] text-white py-2 rounded-md"
                  >
                    Verify & Submit
                  </button>
                </>
              ) : (
                /* SUCCESS SCREEN */
                <div className="text-center py-6">
                  <h3 className="text-xl font-semibold text-green-600 mb-2">
                    ✔ Support Submitted Successfully
                  </h3>
                  <p className="text-sm text-gray-700">
                    Thank you for supporting Namo Gange Trust. We truly
                    appreciate your contribution and commitment.
                  </p>

                  <button
                    onClick={() => {
                      setShowOtpModal(false);
                      setForm(initialForm);
                      setOtpStep("verify");
                    }}
                    className="mt-4 bg-[#0C55A0] text-white px-6 py-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Support;
