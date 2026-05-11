"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function CreateOrderPage() {

  const router = useRouter();

  const [amount, setAmount] =
    useState("");

  const [telegram, setTelegram] =
    useState("");

  const [bookingDate, setBookingDate] =
    useState("");

  const [bookingTime, setBookingTime] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // CALCULATIONS
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

  const handleCreateOrder = async (
    e: any
  ) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        setMessage(
          "Please login first."
        );

        setLoading(false);

        return;
      }

      const { error } =
        await supabase
          .from("orders")
          .insert([
            {
              seller_id: user.id,
              amount: amountNumber,
              telegram,
              booking_date:
                bookingDate,
              booking_time:
                bookingTime,
              fee_rate: feeRate,
              total_fee: totalFee,
              seller_deposit:
                sellerDeposit,
              buyer_receives:
                buyerReceives,
              status: "Pending",
            },
          ]);

      if (error) {

        setMessage(error.message);

        setLoading(false);

        return;
      }

      setMessage(
        "✅ Escrow order created successfully!"
      );

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (err) {

      console.error(err);

      setMessage(
        "❌ Failed to create order"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-20">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

          {/* HEADER */}
          <div className="text-center mb-10">

            <div className="text-yellow-400 text-sm mb-3">
              Secure OTC Escrow
            </div>

            <h1 className="text-4xl font-bold mb-4">
              Escrow Calculator
            </h1>

            <div className="text-zinc-400">
              Create secure escrow deals
              with automatic fee
              calculation.
            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={
              handleCreateOrder
            }
            className="space-y-6"
          >

            {/* AMOUNT */}
            <div>

              <label className="block mb-3 text-zinc-300">
                Transaction Amount
                (USDT)
              </label>

              <input
                type="number"
                required
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
            <div>

              <label className="block mb-3 text-zinc-300">
                Telegram Username
              </label>

              <input
                type="text"
                required
                value={telegram}
                onChange={(e) =>
                  setTelegram(
                    e.target.value
                  )
                }
                placeholder="@yourtelegram"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

            </div>

            {/* DATE */}
            <div>

              <label className="block mb-3 text-zinc-300">
                Preferred Escrow Date
              </label>

              <input
                type="date"
                required
                value={bookingDate}
                onChange={(e) =>
                  setBookingDate(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

            </div>

            {/* TIME */}
            <div>

              <label className="block mb-3 text-zinc-300">
                Preferred Escrow Time
              </label>

              <input
                type="time"
                required
                value={bookingTime}
                onChange={(e) =>
                  setBookingTime(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

            </div>

            {/* KYC NOTICE */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 text-yellow-300 text-sm">

              ⚠ All traders must
              complete manual KYC
              verification before escrow
              approval.

            </div>

            {/* FEE NOTICE */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 text-center text-yellow-300 font-bold text-sm leading-7">

              🔥 ESCROW FEES — BELOW
              500 USDT → 2% EACH SIDE
              • 500–5000 USDT → 1%
              EACH SIDE • 5000+ USDT
              → 0.5% EACH SIDE 🔥

            </div>

            {/* CALCULATOR */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4">

              <h2 className="text-2xl font-bold text-yellow-400">
                Escrow Calculation
              </h2>

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

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-2xl transition-all disabled:opacity-50"
            >

              {loading
                ? "Creating Escrow..."
                : "Create Escrow Deal"}

            </button>

            {/* MESSAGE */}
            {message && (

              <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-center">
                {message}
              </div>

            )}

          </form>

        </div>

      </div>

    </div>
  );
}