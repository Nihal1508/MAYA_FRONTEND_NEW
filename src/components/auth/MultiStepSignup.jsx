import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { generateOtp, signUp, verifyOtp } from "../../api/auth";

function MultiStepSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState("");

  // ----- Step 1: Request OTP (Email Input) ----- //
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm({ mode: "onBlur" });

  const generateOtpMutation = useMutation({
    mutationFn: generateOtp,
    onSuccess: (_, variables) => {
      setEmail(variables.email);
      setStep(2);
    },
    onError: (error) => {
      console.error("Error sending OTP:", error);
      setOtpError("Failed to send OTP. Please try again.");
    },
  });

  const onSubmitEmail = (data) => {
    generateOtpMutation.mutate({ email: data.email });
  };

  // ----- Step 2: Verify OTP ----- //
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
  } = useForm({ mode: "onBlur" });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      setStep(3);
      setOtpError("");
    },
    onError: (error) => {
      console.error("OTP verification error:", error);
      setOtpError(error.response?.data?.message || "Invalid OTP. Please try again.");
    },
  });

  const onSubmitOtp = (data) => {
    verifyOtpMutation.mutate({ email, otp: data.otp });
  };

  // ----- Step 3: Complete Signup (Password Input) ----- //
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors },
  } = useForm({ mode: "onBlur" });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      const { message, accessToken, refreshToken } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(message);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });

  const onSubmitSignup = (data) => {
    signUpMutation.mutate({ email, password: data.password });
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
            disabled={generateOtpMutation.isLoading}
          >
            {generateOtpMutation.isLoading ? "Sending OTP..." : "Send OTP"}
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
            disabled={verifyOtpMutation.isLoading}
          >
            {verifyOtpMutation.isLoading ? "Verifying OTP..." : "Verify OTP"}
          </button>
          <button
            type="button"
            onClick={() => generateOtpMutation.mutate({ email })}
            className="mt-4 w-full py-2 text-sm text-blue-400 hover:underline"
            disabled={generateOtpMutation.isLoading}
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
            disabled={signUpMutation.isLoading}
          >
            {signUpMutation.isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      )}
    </div>
  );
}

export default MultiStepSignup;