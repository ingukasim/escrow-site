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

      <nav className="w-full border-b border-green-500/20 bg-black/70 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <img
              src="/logo.png"
              alt="GK Focus"
              className="w-14 h-14 rounded-full shadow-lg shadow-green-500/20"
            />

            <div>

              <h1 className="text-2xl font-black tracking-wide text-green-400">

                GK FOCUS

              </h1>

              <p className="text-sm text-gray-400">

                Secure USDT Escrow

              </p>

            </div>

          </div>

          <div className="flex items-center gap-6">

            <a
              href="/login"
              className="text-white hover:text-green-400 transition"
            >
              Login
            </a>

            <a
              href="/register"
              className="bg-green-500 hover:bg-green-400 transition px-7 py-3 rounded-2xl font-bold text-black"
            >
              Register
            </a>

          </div>

        </div>

      </nav>

      {/* HERO */}

      <section className="relative py-20 md:py-32 px-6">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute top-20 left-20 text-[200px] text-green-400 animate-pulse">
            ₮
          </div>

          <div className="absolute bottom-20 right-20 text-[180px] text-green-500 animate-bounce">
            ₮
          </div>

        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          <div>

            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3 text-green-400 mb-8">

              <ShieldCheck className="w-5 h-5" />

              Secure OTC Escrow Platform

            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-8">

              Buy & Sell

              <span className="block text-green-400">
                USDT
              </span>

              Safely With Escrow

            </h1>

            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">

              Professional crypto escrow platform with secure custody,
              admin verification, realtime escrow updates, and protected
              OTC transactions worldwide.

            </p>

            <div className="flex flex-wrap gap-5">

              <a
                href="/register"
                className="bg-green-500 hover:bg-green-400 transition px-10 py-5 rounded-2xl text-black font-black text-lg"
              >
                Create Escrow
              </a>

              <a
                href="#calculator"
                className="border border-green-500/30 hover:border-green-400 transition px-10 py-5 rounded-2xl font-bold"
              >
                Fee Calculator
              </a>

            </div>

          </div>

          {/* CALCULATOR */}

          <div
            id="calculator"
            className="bg-[#111116] border border-green-500/10 rounded-[40px] p-6 md:p-10 shadow-2xl"
          >

            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3 text-green-400 mb-8 animate-pulse">

              🔥 LOW FEES FOR LARGE TRANSACTIONS

            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-10">

              Escrow Fee Calculator

            </h2>

            <div className="space-y-8">

              <div>

                <label className="block text-gray-400 mb-3">

                  Enter USDT Amount

                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-black border border-green-500/20 rounded-3xl px-8 py-6 text-3xl font-bold outline-none focus:border-green-400"
                />

              </div>

              <div className="bg-black rounded-3xl p-6 border border-green-500/10">

                <div className="text-gray-400 mb-2">
                  Seller Deposit
                </div>

                <div className="text-3xl font-black text-green-400">

                  {sellerDeposit.toFixed(2)} USDT

                </div>

              </div>

              <div className="bg-black rounded-3xl p-6 border border-green-500/10">

                <div className="text-gray-400 mb-2">
                  Buyer Receives
                </div>

                <div className="text-3xl font-black text-green-400">

                  {buyerReceive.toFixed(2)} USDT

                </div>

              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

                <div className="text-green-400 font-bold leading-loose">

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