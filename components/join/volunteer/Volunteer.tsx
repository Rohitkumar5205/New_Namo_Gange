import React from 'react'
import VolunteerRegistrationForm from "@/components/join/volunteer/VolunteerRegistrationForm";
import Link from "next/link";

const Volunteer = () => {
  return (
    <div>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner/volunteer.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/10 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              VOLUNTEER REGISTRATION
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Volunteer Registration
            </p>
          </div>
        </div>
      </div>
      <VolunteerRegistrationForm />
    </div>
  )
}

export default Volunteer
