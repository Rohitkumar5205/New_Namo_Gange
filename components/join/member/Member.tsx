"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Member = () => {
  const router = useRouter();
  return (
    <div>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner/member.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/0 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Get In Touch
            </h2>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded py-6 ">
        {/* ---- TITLE + TEXT ---- */}
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          NAMO GANGE MEMBERSHIP
        </h2>

        <p className="text-gray-700 text-base font-normal leading-relaxed mb-4">
          <strong className="text-[#DF562C]">Namo Gange Trust</strong> has a
          unique and vital membership procedure to achieve its mission and
          vision by establishing Namo Gange Trust community worldwide. It
          provides a distinctive forum of membership for those who are willing
          to contribute by offering their time and initiative for human and
          social welfare. The membership of Namo Gange Trust encourages
          association, collaboration, and interaction among the people of
          diverse extensions. We do also believe in clubbing the approach if
          <strong>
            Traditionalism, Spiritualism and Cultural Idealism
          </strong>{" "}
          are blended with the core fundamentals of modernism. We believe that
          man is the author of its own destiny who has the potential to
          transform the universal system by its fortitude, conviction, and
          dedication.
        </p>

        {/* ---- MEMBERSHIP TABLE (SAME TO SAME) ---- */}
        <div className="max-w-7xl mx-auto border border-gray-300 rounded overflow-hidden mt-4">
          {/* BLUE HEADER BAR */}
          <div className="bg-[#0066b2] text-white text-center py-3 text-sm font-semibold tracking-wide">
            INDIVIDUAL MEMBERSHIP CATEGORIES
          </div>

          {/* TOP MEMBERSHIP PLANS */}
          <div className="grid grid-cols-4 border-b">
            {/* 1 Year */}
            <div className="text-center p-6 border-r">
              <h3 className="text-lg font-semibold">1-Year Membership</h3>
              <p className="text-gray-400 line-through">Was ₹1,500.00</p>
              <p className="mt-2 text-[28px] font-bold text-[#ff6600]">
                ₹1,100
                <span className="text-gray-700 text-lg font-normal">
                  {" "}
                  / 1 year
                </span>
              </p>

              <button
                onClick={() => router.push("/join/memberForm")}
                className="mt-3 bg-[#ff6600] hover:bg-[#cc5200] text-white px-5 py-2 rounded text-sm font-semibold"
              >
                REGISTER NOW
              </button>
            </div>

            {/* 3 Year */}
            <div className="text-center p-6 border-r">
              <h3 className="text-lg font-semibold">3-Years Membership</h3>
              <p className="text-gray-400 line-through">Was ₹3,000.00</p>
              <p className="mt-2 text-[28px] font-bold text-[#ff6600]">
                ₹2,100
                <span className="text-gray-700 text-lg font-normal">
                  {" "}
                  / 3 years
                </span>
              </p>

              <button
                onClick={() => router.push("/join/memberForm")}
                className="mt-3 bg-[#ff6600] hover:bg-[#cc5200] text-white px-5 py-2 rounded text-sm font-semibold"
              >
                REGISTER NOW
              </button>
            </div>

            {/* 5 Year */}
            <div className="text-center p-6 border-r">
              <h3 className="text-lg font-semibold">5-Years Membership</h3>
              <p className="text-gray-400 line-through">Was ₹6,000.00</p>
              <p className="mt-2 text-[28px] font-bold text-[#ff6600]">
                ₹3,100
                <span className="text-gray-700 text-lg font-normal">
                  {" "}
                  / 5 years
                </span>
              </p>

              <button
                onClick={() => router.push("/join/memberForm")}
                className="mt-3 bg-[#ff6600] hover:bg-[#cc5200] text-white px-5 py-2 rounded text-sm font-semibold"
              >
                REGISTER NOW
              </button>
            </div>

            {/* Lifetime */}
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold">Lifetime Membership</h3>
              <p className="text-gray-400 line-through">Was ₹21,000.00</p>
              <p className="mt-2 text-[28px] font-bold text-[#ff6600]">
                ₹11,000
                <span className="text-gray-700 text-lg font-normal">
                  {" "}
                  / Lifetime
                </span>
              </p>

              <button
                onClick={() => router.push("/join/memberForm")}
                className="mt-3 bg-[#ff6600] hover:bg-[#cc5200] text-white px-5 py-2 rounded text-sm font-semibold"
              >
                REGISTER NOW
              </button>
            </div>
          </div>

          {/* MAIN TABLE */}
          <div className="text-sm">
            {/* OPD */}
            <div className="grid grid-cols-5 border-t">
              <div className="bg-gray-50 p-3 font-medium">OPD</div>
              <div className="p-3 text-center">12 OPD</div>
              <div className="p-3 text-center">22 OPD</div>
              <div className="p-3 text-center">30 OPD</div>
              <div className="p-3 text-center">100 OPD</div>
            </div>

            {/* Yoga Course */}
            <div className="grid grid-cols-5 border-t">
              <div className="bg-gray-50 p-3 font-medium">
                Basic Yoga Course
              </div>
              <div className="p-3 text-center text-[#0070c9]">
                7 Days / Year
              </div>
              <div className="p-3 text-center text-[#0070c9]">
                7 Days / Years
              </div>
              <div className="p-3 text-center text-[#0070c9]">
                7 Days / Years
              </div>
              <div className="p-3 text-center text-green-600 font-semibold">
                7 Days / Years
              </div>
            </div>

            {/* Discount */}
            <div className="grid grid-cols-5 border-t">
              <div className="bg-gray-50 p-3 font-medium">
                Participation Discount in Events
              </div>
              <div className="p-3 text-center text-[#0070c9]">25%</div>
              <div className="p-3 text-center text-[#0070c9]">30%</div>
              <div className="p-3 text-center text-[#0070c9]">30%</div>
              <div className="p-3 text-center text-green-600 font-semibold">
                50%
              </div>
            </div>

            {/* CHECK ROWS */}
            {[
              "Jobs Registration",
              "Free access to all the Exhibitions",
              "Entitled for subsidies treatment",
              "Volunteer Registration",
            ].map((label, i) => (
              <div key={i} className="grid grid-cols-5 border-t">
                <div className="bg-gray-50 p-3 font-medium">{label}</div>
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="p-3 text-center">
                    <span className="text-green-600 text-xl font-bold">✔</span>
                  </div>
                ))}
              </div>
            ))}

            {/* BOTTOM REGISTER BUTTONS */}
            <div className="grid grid-cols-5 border-t py-5">
              <div></div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <button
                    onClick={() => router.push("/join/memberForm")}
                    className="bg-[#ff6600] hover:bg-[#cc5200] text-white px-6 py-2 rounded text-sm font-semibold"
                  >
                    REGISTER NOW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- BENEFITS LIST ---- */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">
            Membership Privileges, Benefits & Services
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
            <li>
              ➤ Free health OPDs in Health Centre run by Namo Gange 12 times in
              a year worth Rs. 3600.
            </li>
            <li>
              ➤ Free basic Yoga course at Health Centre run by Namo Gange (7
              days course) in a year.
            </li>
            <li>
              ➤ The members will be entitled to get subsidies treatment at the
              nearest The Yogshala health center.
            </li>
            <li>
              ➤ Participation rates for Namo Gange Trust seminars, conferences &
              other events will be 25% reduced for a yearly membership, 30%
              reduced for a multi-year membership and 50% reduced for a lifetime
              membership.
            </li>
            <li>
              ➤ Dissemination of updated information, Namo Gange's events,
              programs, and services through e-newsletters.
            </li>
            <li>
              ➤ Providing free registration through online job portal{" "}
              <strong>www.theyogshalajobs.com</strong> for national &
              international placement.
            </li>
            <li>➤ Opportunity to participate in Health camps PAN India.</li>
            <li>
              ➤ Acknowledgment of work at national and global level through
              broadcasting, award, and reward.
            </li>
            <li>
              ➤ Participation as a volunteer in all the social activities.
            </li>
            <li>
              ➤ Conducting an internship or short duration program for the
              people who are willing to work for the trust.
            </li>
            <li>
              ➤ Members can organize health workshops and cultural events in
              their area (subject to approval).
            </li>
            <li>➤ Free access to all the exhibitions of Namo Gange Trust.</li>
            <li>
              ➤ Opportunity to actively participate in the activities of Shrimad
              Bhagwat Katha as a listener.
            </li>
            <li>
              ➤ All members will be provided an opportunity to associate with
              Social Awareness Programs, Training Programs, Health Awareness
              Programs, Various Workshops, and Charity Oriented Programs.
            </li>
            <li>
              ➤ Namo Gange Trust's privileged members will also be a part of
              Strategic Planning, New Undertakings, and Board Development.
            </li>
            <li>
              ➤ All members will be acknowledged for their valuable Support,
              Services, Projects and Social Welfare activities.
            </li>
            <li>
              ➤ All member's name will be added in Namo Gange Trust Membership
              Directory.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Member;
