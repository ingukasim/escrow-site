"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleRegister = async (
    e: any
  ) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      const { error } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (error) {

        setMessage(error.message);

        setLoading(false);

        return;
      }

      setMessage(
        "✅ Account created successfully!"
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err) {

      console.error(err);

      setMessage(
        "❌ Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-md mx-auto px-6 py-24">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

          {/* HEADER */}
          <div className="text-center mb-10">

            <div className="text-yellow-400 text-sm mb-3">
              Secure OTC Escrow
            </div>

            <h1 className="text-4xl font-bold mb-4">
              Create GK Account
            </h1>

            <div className="text-zinc-400">
               Create your secure USDT escrow account.
            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleRegister}
            className="space-y-6"
          >

            {/* EMAIL */}
            <div>

              <label className="block mb-3 text-zinc-300">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="example@email.com"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block mb-3 text-zinc-300">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter password"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-2xl transition-all disabled:opacity-50"
            >

              {loading
                ? "Creating Account..."
                : "Create GK FOCUS ESCROW Account"}

            </button>

            {/* MESSAGE */}
            {message && (

              <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-center">
                {message}
              </div>

            )}

          </form>

          {/* LOGIN */}
          <div className="text-center mt-8 text-zinc-400">

            Already have an account?{" "}

            <button
              onClick={() =>
                router.push("/login")
              }
              className="text-yellow-400 hover:text-yellow-300"
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}