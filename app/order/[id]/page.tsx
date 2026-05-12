"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { supabase } from "../../../lib/supabase";

export default function OrderPage() {

  const params = useParams();

  const orderId = params.id as string;

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [buyerWallet, setBuyerWallet] =
    useState("");

  useEffect(() => {

    loadOrder();

  }, []);

  const loadOrder = async () => {

    try {

      const { data, error } =
        await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

      if (error) {

        console.error(error);

      } else {

        setOrder(data);

      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const markAsPaid = async () => {

    const { error } =
      await supabase
        .from("orders")
        .update({
          status: "Payment Sent",
        })
        .eq("id", orderId);

    if (error) {

      setMessage(error.message);

    } else {

      setMessage(
        "✅ Payment marked successfully!"
      );

      loadOrder();

    }

  };

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading escrow...
      </div>
    );

  }

  if (!order) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Escrow order not found.
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-6">

            <div>

              <div className="text-yellow-400 text-sm mb-3">
                Escrow Transaction
              </div>

              <h1 className="text-5xl font-bold mb-4">
                {order.amount} USDT
              </h1>

              <div className="text-zinc-400">
                Order ID: {order.id}
              </div>

            </div>

            <div>

              {order.status ===
              "Completed" ? (

                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-2xl font-bold">

                  ✅ Completed

                </div>

              ) : order.status ===
                "Payment Sent" ? (

                <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-6 py-4 rounded-2xl font-bold">

                  💸 Payment Sent

                </div>

              ) : (

                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-6 py-4 rounded-2xl font-bold">

                  ⏳ Pending

                </div>

              )}

            </div>

          </div>

        </div>

        {/* ESCROW STATUS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-bold text-yellow-400 mb-6">

            Escrow Custody Status

          </h2>

          <div className="space-y-4 text-lg">

            <div>
              ✅ Escrow order created
            </div>

            <div>
              ⏳ Awaiting seller USDT
              deposit
            </div>

            <div>
              ⏳ Waiting escrow admin
              confirmation
            </div>

            <div>
              ⏳ Buyer payment pending
            </div>

            <div>
              ⏳ Escrow release pending
            </div>

          </div>

        </div>

        {/* SELLER VIEW */}
        {order.role ===
          "seller" && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Seller Escrow Deposit

            </h2>

            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* QR */}
              <div className="bg-white rounded-3xl p-6 flex items-center justify-center">

                <img
                  src="/wallet-qr.png"
                  alt="Wallet QR"
                  className="w-64 h-64 object-contain"
                />

              </div>

              {/* WALLET */}
              <div className="space-y-6">

                <div>

                  <div className="text-zinc-400 mb-2">
                    Network
                  </div>

                  <div className="text-2xl font-bold">
                    TRC20 (TRON)
                  </div>

                </div>

                <div>

                  <div className="text-zinc-400 mb-2">
                    Escrow Wallet Address
                  </div>

                  <div className="bg-black border border-zinc-700 rounded-2xl p-5 break-all text-lg">

                    YOUR_USDT_WALLET_ADDRESS

                  </div>

                </div>

                <div>

                  <div className="text-zinc-400 mb-2">
                    Required Deposit
                  </div>

                  <div className="text-3xl font-bold text-yellow-400">

                    {order.seller_deposit}
                    {" "}USDT

                  </div>

                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 text-yellow-300 text-sm leading-7">

                  ⚠ Seller must deposit
                  escrow USDT before
                  buyer payment begins.

                </div>

              </div>

            </div>

          </div>

        )}

        {/* BUYER VIEW */}
        {order.role ===
          "buyer" && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Buyer Payment Section

            </h2>

            <div className="space-y-6">

              <div>

                <label className="block mb-3 text-zinc-300">

                  Buyer Receiving Wallet

                </label>

                <input
                  type="text"
                  value={buyerWallet}
                  onChange={(e) =>
                    setBuyerWallet(
                      e.target.value
                    )
                  }
                  placeholder="Enter your USDT receiving wallet"
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
                />

              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 text-blue-300 text-sm leading-7">

                💡 Buyer must provide
                correct USDT wallet
                for escrow release.

              </div>

              {order.status ===
                "Pending" && (

                <button
                  onClick={markAsPaid}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-10 py-4 rounded-2xl transition-all"
                >

                  I Have Paid

                </button>

              )}

            </div>

          </div>

        )}

        {/* DETAILS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Role
            </div>

            <div className="text-2xl font-bold capitalize">
              {order.role}
            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Telegram Username
            </div>

            <div className="text-2xl font-bold">
              {order.telegram}
            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Fee Rate
            </div>

            <div className="text-2xl font-bold">
              {order.fee_rate}%
            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Seller Deposit
            </div>

            <div className="text-2xl font-bold">
              {order.seller_deposit}
              {" "}USDT
            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Buyer Receives
            </div>

            <div className="text-2xl font-bold">
              {order.buyer_receives}
              {" "}USDT
            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Escrow Date
            </div>

            <div className="text-2xl font-bold">
              {order.booking_date}
            </div>

          </div>

        </div>

        {/* MESSAGE */}
        {message && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center mt-8">

            {message}

          </div>

        )}

      </div>

    </div>
  );
}