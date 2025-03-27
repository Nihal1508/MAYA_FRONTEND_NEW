import React from "react";
import swirl2 from "../assets/images/swirl2.png";
import mayaLogo from "../assets/images/maya-logo.png";
import MultiStepSignup from "../components/auth/MultiStepSignup";

export default function Signup() {
  return (
    <div className="max-h-screen flex flex-col items-center bg-black text-white">
      {/* Top Section: Logo and Tagline */}
      <div className="text-center my-8">
        <img src={mayaLogo} alt="Maya Logo" className="w-48 h-auto" />
        <p className="text-lg text-gray-300 mt-2">Turn Moments into Memories</p>
      </div>
      {/* Main Content: Image and Signup Form */}
      <div className="flex relative w-full flex-row items-start justify-start">
        {/* Left Section: Image */}
        <div className="">
          <img src={swirl2} alt="Swirl" className="w-9/12 -mt-4 ml-28" />
        </div>
        {/* Right Section: Signup Form */}
        <div className="absolute inset-x-0 flex items-center justify-center">
          <MultiStepSignup />
        </div>
      </div>
    </div>
  );
}
