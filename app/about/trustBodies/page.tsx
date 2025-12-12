import React from "react";
import Link from "next/link";
import TrustBodies from "@/components/about/TrustBodies";
import AboutJoin from "@/components/about/AboutJoin";

const page = () => {
  return (
    <div>
      <TrustBodies />
      <AboutJoin />
    </div>
  );
};

export default page;
