import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { generateOtp, signUp, verifyOtp } from "../../api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MultiStepSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState({
    generateOtp: false,
    verifyOtp: false,
    signUp: false
  });

  // ----- Step 1: Request OTP (Email Input) ----- //
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm({ mode: "onBlur" });

  const onSubmitEmail = async (data) => {
    setLoading(prev => ({ ...prev, generateOtp: true }));
    try {
      await generateOtp({ email: data.email }, {
        onSuccess: () => {
          setEmail(data.email);
          setStep(2);
          toast.success("OTP sent successfully!");
        },
        onError: (error) => {
          setOtpError(error.message || "Failed to send OTP. Please try again.");
          toast.error(error.message);
        }
      });
    } finally {
      setLoading(prev => ({ ...prev, generateOtp: false }));
    }
  };

  // ----- Step 2: Verify OTP ----- //
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
  } = useForm({ mode: "onBlur" });

  const onSubmitOtp = async (data) => {
    setLoading(prev => ({ ...prev, verifyOtp: true }));
    try {
      await verifyOtp({ email, otp: data.otp }, {
        onSuccess: () => {
          setStep(3);
          setOtpError("");
          toast.success("OTP verified successfully!");
        },
        onError: (error) => {
          setOtpError(error.message || "Invalid OTP. Please try again.");
          toast.error(error.message);
        }
      });
    } finally {
      setLoading(prev => ({ ...prev, verifyOtp: false }));
    }
  };

  // ----- Step 3: Complete Signup (Password Input) ----- //
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors },
  } = useForm({ mode: "onBlur" });

  const onSubmitSignup = async (data) => {
    setLoading(prev => ({ ...prev, signUp: true }));
    try {
      await signUp({ email, password: data.password }, {
        onSuccess: (response) => {
          const { accessToken, refreshToken } = response;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          toast.success("Signup successful!");
          navigate("/waiting");
        },
        onError: (error) => {
          toast.error(error.message || "Signup failed. Please try again.");
        }
      });
    } finally {
      setLoading(prev => ({ ...prev, signUp: false }));
    }
  };

  return (
    <div className="bg-[#ffffff11] backdrop-blur-sm p-10 rounded-3xl shadow-lg w-full max-w-md">
      {step === 1 && (
        <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
          <h2 className="text-2xl font-bold mb-4">Enter your Email</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded mb-4 bg-[#00000010] border text-white"
            {...registerEmail("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
          />
          {emailErrors.email && (
            <p className="text-red-500 mb-4">{emailErrors.email.message}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200"
            disabled={loading.generateOtp}
          >
            {loading.generateOtp ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitOtp(onSubmitOtp)}>
          <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
          <p className="mb-4 text-sm">We've sent a 6-digit code to {email}</p>
          <input
            type="text"
            placeholder="OTP"
            className="w-full p-3 rounded mb-4 bg-[#00000010] border text-white"
            {...registerOtp("otp", {
              required: "OTP is required",
              pattern: {
                value: /^\d{6}$/,
                message: "OTP must be 6 digits"
              }
            })}
          />
          {otpErrors.otp && (
            <p className="text-red-500 mb-4">{otpErrors.otp.message}</p>
          )}
          {otpError && (
            <p className="text-red-500 mb-4">{otpError}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200"
            disabled={loading.verifyOtp}
          >
            {loading.verifyOtp ? "Verifying OTP..." : "Verify OTP"}
          </button>
          <button
            type="button"
            onClick={() => onSubmitEmail({ email })}
            className="mt-4 w-full py-2 text-sm text-blue-400 hover:underline"
            disabled={loading.generateOtp}
          >
            Resend OTP
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmitSignup(onSubmitSignup)}>
          <h2 className="text-2xl font-bold mb-4">Create a Password</h2>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded mb-4 bg-[#00000010] border text-white"
            {...registerSignup("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                message:
                  "Password must contain at least one digit, one lowercase, one uppercase letter, and be 6-20 characters",
              },
            })}
          />
          {signupErrors.password && (
            <p className="text-red-500 mb-4">{signupErrors.password.message}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200"
            disabled={loading.signUp}
          >
            {loading.signUp ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      )}
    </div>
  );
}

export default MultiStepSignup;