"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, MapPin, Phone, Send, User, MessageSquare } from "lucide-react";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosClient.post("/enquire-list/create", {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone, // 👈 backend expects "mobile"
        message: formData.message,
      });

      alert("Thank you! Your message has been sent successfully.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("❌ Enquiry API Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/contact.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Connect
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Connect
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 ">
        <div className="w-full px-4 md:px-6 lg:px-6 text-center">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4">
              Let’s{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Connect
              </span>
            </h2>

            <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
              "Have a question, feedback, or want to collaborate? We’d love to
              hear from you. Fill out the form below, and our team will get back
              to you soon."
            </p>
          </div>

          <div className="w-full h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

          <p className="w-full pb-6 text-sm md:text-[15px] text-justify text-gray-800 leading-relaxed mt-3">
            At Namo Gange Trust, we believe in building meaningful connections
            rooted in service, compassion, and shared purpose. By connecting
            with us, you become part of a collective journey dedicated to social
            responsibility and positive impact.
          </p>

          {/* ================= CONTACT SECTION ================= */}
          <div className="w-full mt-2 md:mt-5 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* -------- CONTACT INFO CARD -------- */}
            <div className="bg-gradient-to-r from-[#4141b8] to-[#063D8E] text-white rounded p-6 md:p-8 shadow-xl text-left">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src="/logo.png"
                  alt="Namo Gange Trust"
                  className="w-18 h-18 bg-white rounded-full p-2 object-contain"
                />
                <div>
                  <h3 className="text-xl font-semibold">Namo Gange Trust</h3>
                  <p className="text-sm opacity-90">
                    Service • Compassion • Commitment
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-5 h-5 mt-1 opacity-90" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm opacity-90">+91 96549 00525</p>
                  <p className="text-sm opacity-90">+91 78302 41288</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Mail className="w-5 h-5 mt-1 opacity-90" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm opacity-90">info@namogange.org</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 opacity-90" />
                <div>
                  <p className="font-medium">Office Address</p>
                  <p className="text-sm opacity-90 leading-relaxed">
                    12/52, Site-2, Sunrise Industrial Area, Mohan Nagar,
                    Sahibabad, Ghaziabad, Uttar Pradesh – 201007
                  </p>
                </div>
              </div>
            </div>

            {/* -------- FORM -------- */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded p-8 flex flex-col justify-between"
            >
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Send Us a Message
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full border border-gray-300 pl-10 pr-3 py-2 text-sm outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full border border-gray-300 pl-10 pr-3 py-2 text-sm outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 pl-10 pr-3 py-2 text-sm outline-none"
                    required
                  />
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
                disabled={loading}
                className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] text-white font-semibold py-2 hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Send Message"}
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
