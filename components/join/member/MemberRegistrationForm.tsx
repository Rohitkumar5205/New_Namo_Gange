"use client";
import Link from "next/link";
import { useState } from "react";
import { User, Phone, Mail, Briefcase, Calendar, MapPin } from "lucide-react";

const MemberRegistrationForm = () => {
  const [membership, setMembership] = useState("1year");
  return (
    <div>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/volunteer.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white">
              Membership Registration
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Membership Registration
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-8xl mx-auto">
        {/* ================= 1. FORM SECTION (80% on Desktop) ================= */}
        <div className="w-full md:w-[75%] bg-white p-6 rounded-lg shadow-lg order-2 md:order-1">
          {/* <h2 className="text-xl font-medium text-gray-800 mb-4">
            Membership Registration Form
          </h2> */}

          <form className="space-y-4">
            {/* =================== HEADING =================== */}
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                MEMBERSHIP REGISTRATION FORM
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                (REGD: 168/4/37/110-115/2015 & NITI AYOG, GOVT. OF INDIA UNIQUE
                ID - DL/2016/0113537)
              </p>
            </div>

            <hr className="border-gray-300" />

            {/* =================== MEMBERSHIP TYPES =================== */}
            <div>
              <h3 className="font-normal text-[15px] mb-2">
                Individual Membership Categories *
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                {/* ROW 1 */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="membership"
                    value="1year"
                    checked={membership === "1year"}
                    onChange={() => setMembership("1year")}
                    className="accent-[#DF562C]"
                  />
                  <label>1-Year Membership</label>
                </div>
                <div className="flex items-center">
                  <p className="font-medium">Rs. 1,100</p>
                </div>

                {/* ROW 2 */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="membership"
                    value="3year"
                    checked={membership === "3year"}
                    onChange={() => setMembership("3year")}
                    className="accent-[#DF562C]"
                  />
                  <label>3-Years Membership</label>
                </div>
                <div className="flex items-center">
                  <p className="font-medium">Rs. 2,100</p>
                </div>

                {/* ROW 3 */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="membership"
                    value="5year"
                    checked={membership === "5year"}
                    onChange={() => setMembership("5year")}
                    className="accent-[#DF562C]"
                  />
                  <label>5-Years Membership</label>
                </div>
                <div className="flex items-center">
                  <p className="font-medium">Rs. 3,100</p>
                </div>

                {/* ROW 4 */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="membership"
                    value="lifetime"
                    checked={membership === "lifetime"}
                    onChange={() => setMembership("lifetime")}
                    className="accent-[#DF562C]"
                  />
                  <label>Lifetime Membership</label>
                </div>
                <div className="flex items-center">
                  <p className="font-medium">Rs. 11,000</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* =================== NAME FIELDS =================== */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* First Name */}
              <div>
                <label className="text-sm ">First Name *</label>
                <div className="flex items-center border  px-3 mt-1">
                  <User className="text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full px-2 py-1.5 outline-none text-sm"
                    required
                  />
                </div>
              </div>
              {/* Last Name */}
              <div>
                <label className="text-sm ">Last Name *</label>
                <div className="flex items-center border  px-3 mt-1">
                  <User className="text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full px-2 py-1.5 outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm ">
                  Father's/Mother's/Spouse's Name
                </label>
                <input
                  type="text"
                  placeholder="Enter guardian name"
                  className="w-full border  px-3 py-1.5 mt-1 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-sm ">Occupation</label>
                <div className="flex items-center border  px-3 mt-1">
                  <Briefcase className="text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Your occupation"
                    className="w-full px-2 py-1.5 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm ">Mobile No. *</label>
                <div className="flex items-center border  px-3 mt-1">
                  <Phone className="text-gray-500" size={18} />
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="Enter mobile number"
                    className="w-full px-2 py-1.5 outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm ">Email Address *</label>
                <div className="flex items-center border  px-3 mt-1">
                  <Mail className="text-gray-500" size={18} />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-2 py-1.5 outline-none text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* =================== ADDRESS =================== */}
            <div>
              <label className="text-sm ">Address *</label>
              <input
                type="text"
                placeholder="Enter full address"
                className="w-full border  px-3 py-2 mt-1 text-sm outline-none"
                required
              />
            </div>

            {/* Country / State / City */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm ">Country *</label>
                <select className="border  px-3 py-2 mt-1 text-sm w-full">
                  <option>Select Country</option>
                </select>
              </div>

              <div>
                <label className="text-sm ">State *</label>
                <select className="border  px-3 py-2 mt-1 text-sm w-full">
                  <option>Select State</option>
                </select>
              </div>

              <div>
                <label className="text-sm ">City *</label>
                <select className="border  px-3 py-2 mt-1 text-sm w-full">
                  <option>Select City</option>
                </select>
              </div>
            </div>

            {/* Pincode / DOB / Gender */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm ">Pin Code *</label>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  className="border  px-3 py-2 mt-1 text-sm w-full"
                  required
                />
              </div>

              <div>
                <label className="text-sm ">Date of Birth *</label>
                <div className="flex items-center border  px-3 mt-1">
                  <Calendar className="text-gray-500" size={18} />
                  <input
                    type="date"
                    className="w-full px-2 py-2 outline-none text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm ">Gender *</label>
                <select className="border  px-3 py-2 mt-1 text-sm w-full">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* =================== COMMENTS =================== */}
            <div>
              <label className="text-sm ">Message or Comments *</label>
              <textarea
                rows={4}
                placeholder="Write your message..."
                className="border  p-3 mt-1 w-full text-sm"
              ></textarea>
            </div>

            {/* =================== BUTTONS =================== */}
            <div className="flex gap-4 pt-2">
              {" "}
              {/* Added pt-4 for spacing above buttons */}
              <button className="bg-[#063D8E] border border-[#063D8E] hover:bg-sky-600 text-white px-6 py-1.5 text-base font-normal  transition-colors">
                Register Now
              </button>
              <button
                type="button"
                className="px-6 py-1.5 font-normal border border-[#DF562C] bg-[#DF562C] hover:bg-red-600 text-white text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
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
              We would be more than happy to help you. Our team advisor is
              **24/7 at your service** to help you.
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

            <h4 className="text-lg font-semibold">Become a Volunteer</h4>

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
    </div>
  );
};

export default MemberRegistrationForm;
