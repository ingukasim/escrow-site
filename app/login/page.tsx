"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
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
              Member Login
            </h1>

            <p className="text-zinc-400 mt-3">
              Login to access your escrow dashboard.
            </p>

          </div>

          <div className="space-y-5">

            <div>
              <label className="text-sm text-zinc-400">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter email"
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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />
            </div>

            {message && (
              <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-sm text-center">
                {message}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-2xl transition-all disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </div>

          <div className="text-center mt-6 text-zinc-400 text-sm">
            Don’t have an account?
            <a
              href="/register"
              className="text-yellow-400 hover:text-yellow-300 ml-2"
            >
              Register
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}