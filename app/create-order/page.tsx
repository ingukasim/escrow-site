"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function CreateOrderPage() {

  const router = useRouter();

  const [sellerTelegram, setSellerTelegram] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const calculateFeePercent = (
    amountValue: number
  ) => {

    if (amountValue < 500) {
      return 2;
    }

    if (
      amountValue >= 500 &&
      amountValue <= 5000
    ) {
      return 1;
    }

    return 0.5;
  };

  const createEscrow = async () => {

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      setMessage("Please login first.");

      setLoading(false);

      return;
    }

    const amountValue =
      Number(amount);

    const feePercent =
      calculateFeePercent(amountValue);

    const totalFee =
      (amountValue * feePercent) / 100;

    const sellerDeposit =
      amountValue + totalFee;

    const buyerReceive =
      amountValue - totalFee;

    const orderId =
      `ESC-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

    const expiresAt =
      new Date(
        Date.now() + 45 * 60 * 1000
      ).toISOString();

    const { error } = await supabase
      .from("escrow-orders")
      .insert([
        {
          order_id: orderId,

          seller_user_id: user.id,

          seller_telegram: sellerTelegram,

          amount: amountValue,

          fee_percent: feePercent,

          total_fee: totalFee,

          seller_deposit: sellerDeposit,

          buyer_receive: buyerReceive,

          status: "Waiting Buyer",

          expires_at: expiresAt,
        },
      ]);

    if (error) {

      setMessage(error.message);

      setLoading(false);

      return;
    }

    // TELEGRAM ALERT
    try {

      await fetch("/api/telegram", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          message:
`🆕 New Escrow Created

Order: ${orderId}

Seller: ${sellerTelegram}

Amount: ${amountValue} USDT

Seller Deposit: ${sellerDeposit} USDT

Buyer Receives: ${buyerReceive} USDT

⏳ Expires In: 45 Minutes`,
        }),
      });

    } catch (error) {

      console.log(error);

    }

    setMessage(
      "Escrow order created successfully!"
    );

    setLoading(false);

    router.push(`/order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="text-center mb-12">

          <div className="text-yellow-400 text-sm mb-3">
            Secure OTC Escrow
          </div>

          <h1 className="text-5xl font-bold mb-5">
            Create Escrow Order
          </h1>

          <div className="text-zinc-400">
            Protected USDT escrow workflow
            with live Telegram monitoring.
          </div>

        </div>

        {/* FORM */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

          <div className="space-y-6">

            {/* TELEGRAM */}
            <div>

              <label className="block mb-3 text-zinc-300">
                Seller Telegram Username
              </label>

              <input
                type="text"
                value={sellerTelegram}
                onChange={(e) =>
                  setSellerTelegram(
                    e.target.value
                  )
                }
                placeholder="@sellerusername"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
              />

            </div>

            {/* AMOUNT */}
            <div>

              <label className="block mb-3 text-zinc-300">
                Escrow Amount (USDT)
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                placeholder="1000"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
              />

            </div>

            {/* FEE INFO */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">

              <h2 className="text-xl font-bold text-yellow-400 mb-5">
                Escrow Fee Structure
              </h2>

              <div className="space-y-3 text-zinc-300">

                <div>
                  &lt; $500 → 2%
                </div>

                <div>
                  $500 - $5000 → 1%
                </div>

                <div>
                  $5000+ → 0.5%
                </div>

              </div>

            </div>

            {/* EXPIRY INFO */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 text-yellow-300">

              ⏳ Escrow expires automatically
              after 45 minutes if inactive.

            </div>

            {/* BUTTON */}
            <button
              onClick={createEscrow}
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-5 rounded-2xl transition-all disabled:opacity-50"
            >

              {loading
                ? "Creating Escrow..."
                : "Create Escrow"}

            </button>

            {/* MESSAGE */}
            {message && (

              <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 text-center">
                {message}
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}