"use client";

import Link from "next/link";

export default function LoginPage() {

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 opacity-10 overflow-hidden">

        <div className="absolute top-10 left-10 text-[220px] text-green-500 animate-pulse">
          ₮
        </div>

        <div className="absolute bottom-10 right-10 text-[180px] text-green-400 animate-bounce">
          ₮
        </div>

      </div>

      {/* LOGIN CARD */}

      <div className="relative z-10 w-full max-w-md bg-white/5 border border-green-500/20 backdrop-blur-2xl rounded-[35px] p-8 shadow-2xl">

        {/* LOGO */}

        <div className="flex flex-col items-center mb-8">

          <img
            src="/images/logo-new.png"
            alt="GK Focus"
            className="w-24 h-24 object-contain mb-4"
          />

          <h1 className="text-4xl font-black text-green-400">

            GK FOCUS

          </h1>

          <p className="text-gray-400 mt-2">

            Secure USDT Escrow

          </p>

        </div>

        {/* TITLE */}

        <div className="mb-8 text-center">

          <h2 className="text-3xl font-black mb-2">

            Welcome Back

          </h2>

          <p className="text-gray-400">

            Login to access your escrow dashboard

          </p>

        </div>

        {/* FORM */}

        <form className="space-y-6">

          <div>

            <label className="block text-gray-300 mb-2">

              Email Address

            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-black border border-green-500/20 rounded-2xl px-5 py-4 outline-none focus:border-green-400"
            />

          </div>

          <div>

            <label className="block text-gray-300 mb-2">

              Password

            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-black border border-green-500/20 rounded-2xl px-5 py-4 outline-none focus:border-green-400"
            />

          </div>

          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-gray-400">

              <input type="checkbox" />

              Remember me

            </label>

            <Link
              href="#"
              className="text-green-400 hover:text-green-300"
            >

              Forgot Password?

            </Link>

          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 transition py-4 rounded-2xl text-black font-black text-lg shadow-xl shadow-green-500/20"
          >

            Login Securely

          </button>

        </form>

        {/* REGISTER */}

        <div className="text-center mt-8 text-gray-400">

          Don&apos;t have an account?{" "}

          <Link
            href="/register"
            className="text-green-400 hover:text-green-300 font-bold"
          >

            Register Now

          </Link>

        </div>

      </div>

    </main>
  );
}