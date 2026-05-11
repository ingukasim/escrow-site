"use client";

import Navbar from "../components/Navbar";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-yellow-400">
              Create Account
            </h1>

            <p className="text-zinc-400 mt-3">
              Register for verified escrow access.
            </p>

          </div>

          <div className="space-y-5">

            <div>
              <label className="text-sm text-zinc-400">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter full name"
                className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                Telegram Username
              </label>

              <input
                type="text"
                placeholder="@username"
                className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                Wallet Address
              </label>

              <input
                type="text"
                placeholder="Enter USDT wallet address"
                className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                Password
              </label>

              <input
                type="password"
                placeholder="Create password"
                className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-sm text-yellow-300">
              ⚠ Manual KYC verification is required before escrow access approval.
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-2xl transition-all">
              Create Account
            </button>

          </div>

          <div className="text-center mt-6 text-zinc-400 text-sm">
            Already have an account?
            <a
              href="/login"
              className="text-yellow-400 hover:text-yellow-300 ml-2"
            >
              Login
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}