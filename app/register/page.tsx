"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [wallet, setWallet] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          telegram_username: telegram,
          wallet_address: wallet,
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created successfully!");
    }

    setLoading(false);
  };

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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
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
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-sm text-yellow-300">
              ⚠ Manual KYC verification is required before escrow access approval.
            </div>

            {message && (
              <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-sm text-center">
                {message}
              </div>
            )}

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-2xl transition-all disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
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