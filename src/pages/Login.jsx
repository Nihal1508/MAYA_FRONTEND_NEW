import swirl from "../assets/images/swirl.png";
import mayaLogo from "../assets/images/maya-logo.png";

import AuthForm from "../components/auth/AuthForm";

export default function Login() {
  return (
    <div className="max-h-screen flex flex-col items-center bg-black text-white">
      {/* Top Section: Logo and Tagline */}
      <div className="text-center my-8">
        <img src={mayaLogo} alt="Maya Logo" className="w-48 h-auto" />
        <p className="text-lg text-gray-300 mt-2">Turn Moments into Memories</p>
      </div>

      {/* Main Content: Image and Login Form */}
      <div className="flex flex-row items-start lg:justify-between w-full max-w-6xl p-4">
        {/* Left Section: Image */}
        <div className="flex flex-col items-center lg:items-start mb-10 lg:mb-0">
          <img src={swirl} alt="Swirl" className="w-4/5  mb-6" />
        </div>
        <AuthForm type="login" />
      </div>
    </div>
  );
}
