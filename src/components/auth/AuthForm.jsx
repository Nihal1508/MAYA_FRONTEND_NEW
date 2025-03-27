import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth";

function AuthForm({ type }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: signIn,
    onSuccess: (data) => {
      navigate("/dashboard");
    }
  });

  let route = "";
  if (type === "login") {
    route = "/signup";
  } else {
    route = "/";
  }
  return (
    <div
      className={`bg-[#ffffff11] backdrop-blur-sm p-10 rounded-3xl shadow-lg w-full max-w-md ${
        type == "signup" ? "absolute right-0 left-0 mx-auto" : "relative"
      }`}
    >
      <h2 className="text-2xl text-left font-bold mb-2">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>
      <p className="text-gray-200 mb-6 text-xs text-left">
        Welcome Back. Manage, Organize, and Unlock the Power of Maya.
      </p>

      <form className="mx-10" onSubmit={handleSubmit(mutate)}>
        {/* Email Field */}
        <div className="mb-4">
          <input
            type="email"
            className="w-full p-3 rounded bg-[#00000010] border border-gray-700 text-white"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <input
            type="password"
            className="w-full p-3 rounded bg-[#00000010] border border-gray-700 text-white"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200"
          disabled={isPending}
        >
          {type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* Footer Links */}
      <p className="mt-6 text-center ">
        <span className="text-white ">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
        </span>
        <Link to={route} className="text-purple-500 hover:underline">
          {type === "login" ? "Sign Up" : "Login"}
        </Link>
      </p>
    </div>
  );
}

export default AuthForm;
