import React from 'react'
import Link from "next/link";
import DonationForm from "@/components/donate/DonationForm";
import DonationContent from "@/components/donate/DonationContent";
const Donate = () => {
  return (
   <div>
         <div
           className="w-full bg-cover bg-center bg-no-repeat"
           style={{ backgroundImage: "url('/home/donation.jpg')" }}
         >
           <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
             <div className="max-w-7xl mx-auto text-center">
               <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
                 Donate
               </h2>
   
               <p className="text-sm md:text-base text-white mt-1">
                 <Link
                   href="/"
                   className="text-[#DF562C] font-medium hover:underline"
                 >
                   Home
                 </Link>{" "}
                 - Donate
               </p>
             </div>
           </div>
         </div>
         <div className="w-full bg-gray-50 px-4 lg:px-6 py-6">
           {/* HEADER */}
           <div className="text-center mb-4 ">
             <h2 className="text-lg md:text-xl font-semibold text-gray-900">
               Our{" "}
               <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                 Donate
               </span>
             </h2>
   
             <p className="text-gray-600 text-xs md:text-sm italic mt-1">
               "Your support strengthens our mission and uplifts those in need."
             </p>
           </div>
   
           <div className="h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] mb-4" />
           <p className="w-full  text-center text-gray-700 text-sm md:text-[15px] leading-relaxed mb-6">
             Your contribution plays a powerful role in transforming lives and
             supporting those who rely on our compassionate services. Through our
             initiatives such as
             <span className="font-semibold text-[#DF562C]"> Ann Sewa</span>, which
             provides nutritious meals to the hungry, and
             <span className="font-semibold text-[#0C55A0]"> Moksha Sewa</span>,
             which offers dignified last-rites support to underprivileged families,
             we strive to bring relief, comfort, and hope to communities in need.
             Every donation—big or small—helps extend kindness, humanity, and
             spiritual service to countless people.
           </p>
   
           <div className="flex w-full flex-row gap-4">
             <DonationContent />
             <DonationForm />
           </div>
         </div>
       </div>
  )
}

export default Donate
