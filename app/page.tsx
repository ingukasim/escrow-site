"use client";

import { ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function HomePage() {

  const [amount, setAmount] = useState(1000);

  let fee = 0;

  if (amount <= 500) {
    fee = 0.02;
  } else if (amount <= 5000) {
    fee = 0.01;
  } else {
    fee = 0.005;
  }

  const sellerDeposit = amount + amount * fee;
  const buyerReceive = amount - amount * fee;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVBAR */}

      <nav className="w-full border-b border-green-500/20 bg-black/90 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

          {/* LEFT LOGO */}

          <div className="flex items-center gap-4 ml-2 md:ml-4">

            <img
              src="/logo-new.png"
              alt="GK FOCUS"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />

            <div>

              <h1 className="text-2xl md:text-4xl font-black tracking-wide text-green-400 leading-none">

                GK FOCUS

              </h1>

              <p className="text-xs md:text-base text-gray-400 mt-1">

                Secure USDT Escrow

              </p>

            </div>

          </div>

          {/* RIGHT BUTTONS */}

          <div className="flex items-center gap-3 md:gap-6">

            <a
              href="/login"
              className="text-sm md:text-xl font-bold text-white hover:text-green-400 transition"
            >
              Login
            </a>

            <a
              href="/register"
              className="bg-green-500 hover:bg-green-400 transition px-5 md:px-8 py-2 md:py-4 rounded-2xl font-black text-black text-sm md:text-xl shadow-xl shadow-green-500/20"
            >
              Register
            </a>

          </div>

        </div>

      </nav>

      {/* HERO */}

      <section className="relative py-16 md:py-28 px-4 md:px-8">

        {/* BACKGROUND */}

        <div className="absolute inset-0 opacity-10 overflow-hidden">

          <div className="absolute top-20 left-10 md:left-20 text-[140px] md:text-[220px] text-green-400 animate-pulse">
            ₮
          </div>

          <div className="absolute bottom-10 right-10 md:right-20 text-[120px] md:text-[180px] text-green-500 animate-bounce">
            ₮
          </div>

        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">

          {/* LEFT CONTENT */}

          <div>

            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-5 py-3 text-green-400 mb-8 text-sm md:text-lg">

              <ShieldCheck className="w-5 h-5" />

              Secure OTC Escrow Platform

            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">

              Buy & Sell

              <span className="block text-green-400">
                USDT
              </span>

              Safely With Escrow

            </h1>

            <p className="text-lg md:text-2xl text-gray-400 leading-relaxed mb-10 max-w-2xl">

              Professional crypto escrow platform with secure custody,
              admin verification, realtime escrow updates, and protected
              OTC transactions worldwide.

            </p>

            <div className="flex flex-wrap gap-4">

              <a
                href="/register"
                className="bg-green-500 hover:bg-green-400 transition px-8 md:px-10 py-4 md:py-5 rounded-2xl text-black font-black text-lg shadow-xl shadow-green-500/20"
              >
                Create Escrow
              </a>

              <a
                href="#calculator"
                className="border border-green-500/30 hover:border-green-400 transition px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-lg"
              >
                Fee Calculator
              </a>

            </div>

          </div>

          {/* CALCULATOR */}

          <div
            id="calculator"
            className="bg-[#111116] border border-green-500/10 rounded-[35px] p-6 md:p-10 shadow-2xl"
          >

            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-5 py-3 text-green-400 mb-8 animate-pulse text-sm md:text-lg">

              🔥 LOW FEES FOR LARGE TRANSACTIONS

            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">

              Escrow Fee Calculator

            </h2>

            <div className="space-y-7">

              <div>

                <label className="block text-gray-400 mb-3 text-sm md:text-lg">

                  Enter USDT Amount

                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-black border border-green-500/20 rounded-3xl px-6 py-5 md:px-8 md:py-6 text-2xl md:text-3xl font-bold outline-none focus:border-green-400"
                />

              </div>

              <div className="bg-black rounded-3xl p-6 border border-green-500/10">

                <div className="text-gray-400 mb-2 text-sm md:text-lg">
                  Seller Deposit
                </div>

                <div className="text-2xl md:text-4xl font-black text-green-400">

                  {sellerDeposit.toFixed(2)} USDT

                </div>

              </div>

              <div className="bg-black rounded-3xl p-6 border border-green-500/10">

                <div className="text-gray-400 mb-2 text-sm md:text-lg">
                  Buyer Receives
                </div>

                <div className="text-2xl md:text-4xl font-black text-green-400">

                  {buyerReceive.toFixed(2)} USDT

                </div>

              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

                <div className="text-green-400 font-bold leading-loose text-sm md:text-lg">

                  • 0–500 USDT → 2% fee both sides<br />

                  • 500–5000 USDT → 1% fee both sides<br />

                  • Above 5000 USDT → 0.5% fee both sides

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}