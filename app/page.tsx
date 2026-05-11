"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function HomePage() {

  const [amount, setAmount] =
    useState("");

  const amountNumber =
    Number(amount || 0);

  let feeRate = 0;

  if (amountNumber < 500) {
    feeRate = 2;
  } else if (
    amountNumber >= 500 &&
    amountNumber <= 5000
  ) {
    feeRate = 1;
  } else {
    feeRate = 0.5;
  }

  const totalFee =
    (amountNumber * feeRate) / 100;

  const sellerDeposit =
    amountNumber + totalFee;

  const buyerReceives =
    amountNumber - totalFee;

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 px-5 py-3 rounded-2xl text-yellow-300 text-sm mb-8">

              🔐 Trusted Manual OTC
              Escrow Platform

            </div>

            <h1 className="text-6xl font-bold leading-tight mb-8">

              Secure USDT
              <span className="text-yellow-400">
                {" "}Escrow
              </span>
              {" "}Protection

            </h1>

            <p className="text-zinc-400 text-xl leading-9 mb-10">

              Safe peer-to-peer OTC
              escrow transactions with
              manual verification,
              Telegram support, and
              secure USDT holding.

            </p>

            <div className="flex flex-wrap gap-5">

              <Link
                href="/register"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition-all"
              >
                Get Started
              </Link>

              <Link
                href="/create-order"
                className="border border-zinc-700 hover:border-yellow-400 px-8 py-4 rounded-2xl transition-all"
              >
                Create Escrow
              </Link>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

            <div className="text-3xl font-bold mb-8 text-yellow-400">
              Escrow Calculator
            </div>

            {/* AMOUNT */}
            <div className="mb-6">

              <label className="block mb-3 text-zinc-300">
                Transaction Amount
                (USDT)
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                placeholder="Enter amount"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

            </div>

            {/* TELEGRAM */}
            <div className="mb-6">

              <label className="block mb-3 text-zinc-300">
                Telegram Username
              </label>

              <input
                type="text"
                placeholder="@yourtelegram"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

            </div>

            {/* DATE */}
            <div className="mb-6">

              <label className="block mb-3 text-zinc-300">
                Preferred Escrow Date
              </label>

              <input
                type="date"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

            </div>

            {/* TIME */}
            <div className="mb-6">

              <label className="block mb-3 text-zinc-300">
                Preferred Escrow Time
              </label>

              <input
                type="time"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

            </div>

            {/* KYC NOTICE */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 text-yellow-300 text-sm mb-6">

              ⚠ All traders must
              complete manual KYC
              verification before escrow
              approval.

            </div>

            {/* FEE NOTICE */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 text-center text-yellow-300 font-bold text-sm leading-7 mb-6">

              🔥 ESCROW FEES — BELOW
              500 USDT → 2% EACH SIDE
              • 500–5000 USDT → 1%
              EACH SIDE • 5000+ USDT
              → 0.5% EACH SIDE 🔥

            </div>

            {/* CALCULATION */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4">

              <div className="flex justify-between">

                <span>Fee Rate</span>

                <span>
                  {feeRate}%
                </span>

              </div>

              <div className="flex justify-between">

                <span>Total Fee</span>

                <span>
                  {totalFee.toFixed(2)}
                  {" "}USDT
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Seller Deposit
                </span>

                <span>
                  {sellerDeposit.toFixed(
                    2
                  )}{" "}
                  USDT
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Buyer Receives
                </span>

                <span>
                  {buyerReceives.toFixed(
                    2
                  )}{" "}
                  USDT
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}