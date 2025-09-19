import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-200 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
        {/* Logo / Symbol */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 shadow-inner">
            <FaUserAstronaut className="text-4xl text-amber-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-amber-800">
            Welcome Back
          </h1>
          <p className="text-sm text-amber-600">
            Login to continue your journey ✨
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Username */}
          <div>
            <label className="mb-1 block text-left text-sm font-medium text-amber-800">
              Username
            </label>
            <div className="flex items-center rounded-lg border border-amber-300 bg-white px-3">
              <FaUserAstronaut className="mr-2 text-amber-500" />
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full border-none bg-transparent py-2 text-amber-800 placeholder-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-left text-sm font-medium text-amber-800">
              Password
            </label>
            <div className="flex items-center rounded-lg border border-amber-300 bg-white px-3">
              <RiLockPasswordLine className="mr-2 text-amber-500" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border-none bg-transparent py-2 text-amber-800 placeholder-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white shadow-md transition hover:bg-amber-700"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-amber-600">
          🌙 Your path to wisdom begins here 🙏
        </p>
      </div>
    </div>
  );
};

export default Login;
