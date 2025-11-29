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

export default function SignupPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-8xl mx-auto">
      <div className="w-full md:w-[75%] bg-white p-6 rounded-lg shadow-lg order-2 md:order-1">
        {/* FORM START */}
        <form className="space-y-4">
          {/* HEADER */}
          <h2 className="text-xl font-semibold text-gray-800">
            Corporator Registration Form
          </h2>

          <p className="text-gray-700 text-sm leading-relaxed">
            <span className="font-semibold text-[#DF562C]">
              Namo Gange Trust
            </span>{" "}
            is looking for corporators to support with{" "}
            <strong>
              Campaigning, Fundraising, Marketing and Social Media Attention.
            </strong>
            Register below and we will contact you soon.
          </p>

          {/* ================= ROW 1 ================= */}
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">
                Full Name <span className="text-red-500">*</span>{" "}
              </label>
              <div className="flex items-center border px-3 mt-1">
                <User size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-2 py-1 text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>{" "}
              </label>
              <div className="flex items-center border px-3 mt-1">
                <Mail size={16} className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-2 py-1 text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Mobile Number <span className="text-red-500">*</span>{" "}
              </label>
              <div className="flex items-center border px-3 mt-1">
                <Phone size={16} className="text-gray-500" />
                <input
                  type="text"
                  maxLength={10}
                  placeholder="10-digit number"
                  className="w-full px-2 py-1 text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Date of Birth <span className="text-red-500">*</span>{" "}
              </label>
              <div className="flex items-center border px-3 mt-1">
                <Calendar size={16} className="text-gray-500" />
                <input
                  type="date"
                  className="w-full px-2 py-1 text-sm outline-none"
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
              <select className="w-full border px-3 py-1 text-sm mt-1 outline-none">
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
              <div className="flex items-center border px-3 mt-1">
                <Briefcase size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter occupation"
                  className="w-full px-2 py-1 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Organization / Firm <span className="text-red-500">*</span>{" "}
              </label>
              <div className="flex items-center border px-3 mt-1">
                <Landmark size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Organization name"
                  className="w-full px-2 py-1 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Website (Optional) <span className="text-red-500">*</span>{" "}
              </label>
              <div className="flex items-center border px-3 mt-1">
                <Globe size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="https://example.com"
                  className="w-full px-2 py-1 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* ================= ADDRESS ================= */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin size={16} />
              Full Address
              <span className="text-red-500">*</span>{" "}
            </label>
            <textarea
              className="w-full border px-3 py-1 text-sm outline-none mt-1"
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
              <select
                className="w-full border px-3 py-1 text-sm outline-none mt-1 bg-white"
                required
              >
                <option value="">Select City</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="noida">Noida</option>
                <option value="gurgaon">Gurgaon</option>
                <option value="lucknow">Lucknow</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                State <span className="text-red-500">*</span>{" "}
              </label>
              <select
                className="w-full border px-3 py-1 text-sm outline-none mt-1 bg-white"
                required
              >
                <option value="">Select State</option>
                <option value="uttar_pradesh">Uttar Pradesh</option>
                <option value="delhi">Delhi</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="haryana">Haryana</option>
                <option value="bihar">Bihar</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                District <span className="text-red-500">*</span>{" "}
              </label>
              <select
                className="w-full border px-3 py-1 text-sm outline-none mt-1 bg-white"
                required
              >
                <option value="">Select District</option>
                <option value="gautam_buddha_nagar">Gautam Buddha Nagar</option>
                <option value="meerut">Meerut</option>
                <option value="ghaziabad">Ghaziabad</option>
                <option value="varanasi">Varanasi</option>
                <option value="kanpur">Kanpur</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Pincode <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                placeholder="Pincode"
                className="w-full border px-3 py-1 text-sm outline-none mt-1"
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
              <div className="flex items-center border px-3 mt-1">
                <Lock size={16} className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-2 py-1 text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">
                Confirm Password <span className="text-red-500">*</span>{" "}
              </label>
              <div className="flex items-center border px-3 mt-1">
                <Lock size={16} className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Re-enter password"
                  className="w-full px-2 py-1 text-sm outline-none"
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
              className="w-full border px-3 py-1 text-sm outline-none mt-1"
            />

            {previewImage && (
              <img
                src={previewImage}
                className="w-24 h-24 mt-3 object-cover border"
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
          <button className="w-full bg-[#DF562C] text-white py-1.5 font-semibold hover:bg-[#c54d21]">
            Submit Registration
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-4 text-gray-700">
          Already Registered?{" "}
          <Link
            href="/auth/login"
            className="text-[#DF562C] font-semibold underline"
          >
            Login here
          </Link>
        </p>
      </div>
      {/* ================= 2. DATA/SIDEBAR SECTION (20% on Desktop) ================= */}
      <div className="w-full md:w-[25%] space-y-6 order-1 md:order-2  self-start sticky top-4">
        {/* NEED HELP BOX */}
        <div className="bg-white shadow-md shadow-lg rounded p-5 text-center">
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

          <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>

          <p className="text-sm text-gray-600 leading-relaxed">
            We would be more than happy to help you. Our team advisor is **24/7
            at your service** to help you.
          </p>

          <p className="text-sm text-[#DF562C] mt-2 font-semibold">
            info@namogange.org
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Monday to Friday 9:00am - 7:30pm
          </p>
        </div>

        {/* VOLUNTEER CTA */}
        <div className="bg-[#2d70c8] rounded shadow-md p-5 text-center text-white">
          <div className="flex justify-center mb-3">
            <img
              src="/home/volunteer-icons.png"
              alt="volunteer"
              className="w-40 h-42"
            />
          </div>

          <h4 className="text-lg font-semibold">Become a Corporator</h4>

          <p className="text-sm leading-relaxed mt-2 text-blue-100">
            Join <span className="font-semibold">Namo Gange Mission</span>
            to serve the nation with pride and dignity.
          </p>

          <button className="mt-4 bg-white text-[#2d70c8] font-semibold px-4 py-1 text-sm rounded hover:bg-gray-100">
            APPLY NOW
          </button>
        </div>

        {/* FACEBOOK PAGE EMBED */}
        <div className="bg-white rounded shadow-md p-3">
          <div
            className="fb-page"
            data-href="https://www.facebook.com/NamoGangeTrust"
            data-tabs="timeline"
            data-width="250"
            data-height="380"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/NamoGangeTrust"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/NamoGangeTrust">
                Namo Gange Trust
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- REUSABLE COMPONENTS ------------------------ */

function InputField({
  icon,
  placeholder,
  type = "text",
  required,
}: {
  icon?: React.ReactNode;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center border rounded-lg px-3 bg-white">
      {icon && <span className="text-gray-500 mr-2">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full py-1 text-sm outline-none"
      />
    </div>
  );
}

function SelectField({
  options,
  placeholder,
  required,
}: {
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <select
      required={required}
      defaultValue=""
      className="border rounded-lg px-3 py-1 text-sm bg-white outline-none"
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((o, i) => (
        <option key={i} value={o.toLowerCase().replace(/ /g, "_")}>
          {o}
        </option>
      ))}
    </select>
  );
}
