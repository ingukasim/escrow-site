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

  const [role, setRole] =
    useState("seller");

  const [loading, setLoading] =
    useState(false);

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

  /* CORRECT ESCROW FEES */

  const feeAmount =
    (amountNumber * feeRate) / 100;

  const sellerDeposit =
    amountNumber + feeAmount;

  const buyerReceives =
    amountNumber - feeAmount;

  const handleCreateOrder =
    async (e: any) => {

      e.preventDefault();

      setLoading(true);

      try {

        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        if (!user) {

          alert(
            "Please login first"
          );

          return;
        }

        const { error } =
          await supabase
            .from("orders")
            .insert([
              {
                seller_id: user.id,

                amount:
                  amountNumber,

                telegram,

                booking_date:
                  bookingDate,

                booking_time:
                  bookingTime,

                fee_rate:
                  feeRate,

                total_fee:
                  feeAmount,

                seller_deposit:
                  sellerDeposit,

                buyer_receives:
                  buyerReceives,

                role,

                status:
                  "Pending",
              },
            ]);

        if (error) {

          alert(error.message);

        } else {

          alert(
            "Escrow order created successfully!"
          );

          router.push(
            "/dashboard"
          );

        }

      } catch (err) {

        console.error(err);

        alert(
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <div className="text-yellow-400 text-sm mb-3">
            Secure OTC Escrow
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Create Escrow Deal
          </h1>

          <div className="text-zinc-400 text-lg">

            Create secure manual
            USDT escrow transactions.

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={
            handleCreateOrder
          }
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 space-y-8"
        >

          {/* ROLE */}
          <div>

            <label className="block mb-4 text-zinc-300 text-lg">

              I Am:

            </label>

            <div className="flex gap-8">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="radio"
                  value="seller"
                  checked={
                    role === "seller"
                  }
                  onChange={(e) =>
                    setRole(
                      e.target.value
                    )
                  }
                />

                <span>
                  Seller
                </span>

              </label>

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="radio"
                  value="buyer"
                  checked={
                    role === "buyer"
                  }
                  onChange={(e) =>
                    setRole(
                      e.target.value
                    )
                  }
                />

                <span>
                  Buyer
                </span>

              </label>

            </div>

          </div>

          {/* AMOUNT */}
          <div>

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
              required
            />

          </div>

          {/* TELEGRAM */}
          <div>

            <label className="block mb-3 text-zinc-300">

              Telegram Username

            </label>

            <input
              type="text"
              value={telegram}
              onChange={(e) =>
                setTelegram(
                  e.target.value
                )
              }
              placeholder="@yourtelegram"
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              required
            />

          </div>

          {/* DATE */}
          <div>

            <label className="block mb-3 text-zinc-300">

              Preferred Escrow Date

            </label>

            <input
              type="date"
              value={bookingDate}
              onChange={(e) =>
                setBookingDate(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              required
            />

          </div>

          {/* TIME */}
          <div>

            <label className="block mb-3 text-zinc-300">

              Preferred Escrow Time

            </label>

            <input
              type="time"
              value={bookingTime}
              onChange={(e) =>
                setBookingTime(
                  e.target.value
                )
              }
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              required
            />

          </div>

          {/* FEES */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4">

            <div className="flex justify-between">

              <span>
                Fee Rate
              </span>

              <span>
                {feeRate}%
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Escrow Fee
              </span>

              <span>

                {feeAmount.toFixed(
                  2
                )}{" "}
                USDT

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
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-5 rounded-2xl transition-all text-lg"
          >

            {loading
              ? "Creating Escrow..."
              : "Create Escrow Deal"}

          </button>

        </form>

      </div>

    </div>
  );
}