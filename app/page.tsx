"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const [amount, setAmount] = useState("");

  const usdt = Number(amount) || 0;

  let feePercent = 2;

  if (usdt >= 500 && usdt <= 5000) {
    feePercent = 1;
  } else if (usdt > 5000) {
    feePercent = 0.5;
  }

  const totalFee = (usdt * feePercent) / 100;
  const sellerDeposit = usdt + totalFee / 2;
  const buyerReceive = usdt - totalFee / 2;

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* TOP ANNOUNCEMENT */}
      <div className="bg-yellow-400 text-black py-3 border-b border-yellow-300">
        <div className="animate-pulse text-center font-bold text-sm lg:text-base px-4">
          🔥 ESCROW FEES — BELOW 500 USDT → 2% EACH SIDE •
          500–5000 USDT → 1% EACH SIDE •
          5000+ USDT → 0.5% EACH SIDE 🔥
        </div>
      </div>

      {/* HERO */}
      <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-950 to-black">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE */}
            <div>

              <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-yellow-400 text-sm mb-6">
                Verified OTC Escrow Platform
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Secure USDT Escrow
                <span className="block text-yellow-400 mt-2">
                  For Verified Traders
                </span>
              </h1>

              <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
                Professional crypto escrow platform with manual KYC verification,
                trusted member access, secure escrow protection, and live
                transaction support for buyers and sellers.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-8">

                <a
                  href="/register"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition-all"
                >
                  Open Escrow
                </a>

                <a
                  href="https://t.me/TeathorUSTD"
                  target="_blank"
                  className="border border-zinc-700 hover:border-yellow-400 hover:text-yellow-400 px-8 py-4 rounded-2xl transition-all"
                >
                  Join Telegram
                </a>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-6 mt-12">

                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    100%
                  </div>

                  <div className="text-zinc-400 text-sm mt-1">
                    Manual Verification
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    24/7
                  </div>

                  <div className="text-zinc-400 text-sm mt-1">
                    Escrow Support
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    Secure
                  </div>

                  <div className="text-zinc-400 text-sm mt-1">
                    USDT Protection
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

              <h2 className="text-3xl font-bold mb-6 text-yellow-400">
                Escrow Calculator
              </h2>

              <div className="space-y-5">

                {/* AMOUNT */}
                <div>
                  <label className="text-sm text-zinc-400">
                    Transaction Amount (USDT)
                  </label>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
                  />
                </div>

                {/* BUYER TELEGRAM */}
                <div>
                  <label className="text-sm text-zinc-400">
                    Buyer Telegram Username
                  </label>

                  <input
                    type="text"
                    placeholder="@buyerusername"
                    className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
                  />
                </div>

                {/* SELLER TELEGRAM */}
                <div>
                  <label className="text-sm text-zinc-400">
                    Seller Telegram Username
                  </label>

                  <input
                    type="text"
                    placeholder="@sellerusername"
                    className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
                  />
                </div>

                {/* DATE */}
                <div>
                  <label className="text-sm text-zinc-400">
                    Escrow Booking Date
                  </label>

                  <input
                    type="date"
                    className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
                  />
                </div>

                {/* TIME */}
                <div>
                  <label className="text-sm text-zinc-400">
                    Escrow Booking Time
                  </label>

                  <input
                    type="time"
                    className="w-full mt-2 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
                  />
                </div>

                {/* KYC WARNING */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-sm text-yellow-300">
                  ⚠ All traders must complete manual KYC verification before
                  escrow approval.
                </div>

                {/* RESULTS */}
                <div className="bg-black rounded-2xl p-5 border border-zinc-800 space-y-4">

                  <div className="flex justify-between">
                    <span className="text-zinc-400">Fee Rate</span>
                    <span className="text-yellow-400 font-bold">
                      {feePercent}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400">Total Fee</span>
                    <span>{totalFee.toFixed(2)} USDT</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400">Seller Deposit</span>
                    <span>{sellerDeposit.toFixed(2)} USDT</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400">Buyer Receives</span>
                    <span>{buyerReceive.toFixed(2)} USDT</span>
                  </div>

                </div>

                {/* BUTTON */}
                <a
                  href="/register"
                  className="block text-center w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-2xl text-lg transition-all"
                >
                  Create Escrow Deal
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}