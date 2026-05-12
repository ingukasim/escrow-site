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

  useEffect(() => {

    initializePage();

    /* REALTIME */

    const orderChannel =
      supabase
        .channel(
          `order-${orderId}`
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "orders",
            filter:
              `id=eq.${orderId}`,
          },
          () => {

            initializePage();

          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        orderChannel
      );

    };

  }, []);

  const initializePage =
    async () => {

      const { data } =
        await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

      setOrder(data);

      setLoading(false);

    };

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading escrow...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-6">

            <div>

              <div className="text-yellow-400 text-sm mb-3">
                Escrow Transaction
              </div>

              <h1 className="text-5xl font-bold mb-4">

                {order?.amount}
                {" "}USDT

              </h1>

              <div className="text-zinc-400">

                Order ID:
                {" "}
                {order?.id}

              </div>

            </div>

            <div>

              {order?.status ===
              "Completed" ? (

                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-2xl font-bold">

                  ✅ Completed

                </div>

              ) : order?.status ===
                "Escrow Secured" ? (

                <div className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-6 py-4 rounded-2xl font-bold">

                  🔒 Escrow Secured

                </div>

              ) : order?.status ===
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

        {/* ESCROW DETAILS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <h2 className="text-3xl font-bold text-yellow-400 mb-8">

            Escrow Details

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <div className="text-zinc-400 mb-2">
                Seller Deposit
              </div>

              <div className="text-2xl font-bold">

                {order?.seller_deposit}
                {" "}USDT

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Buyer Receives
              </div>

              <div className="text-2xl font-bold">

                {order?.buyer_receives}
                {" "}USDT

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Telegram Username
              </div>

              <div className="text-xl">

                @{order?.telegram}

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Preferred Date
              </div>

              <div className="text-xl">

                {order?.preferred_date}

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Preferred Time
              </div>

              <div className="text-xl">

                {order?.preferred_time}

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Escrow Status
              </div>

              <div className="text-xl font-bold text-yellow-400">

                {order?.status}

              </div>

            </div>

          </div>

        </div>

        {/* PAYMENT PROOF */}
        {order?.payment_proof && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Payment Proof

            </h2>

            <img
              src={
                order.payment_proof
              }
              alt="Payment Proof"
              className="rounded-3xl border border-zinc-700"
            />

          </div>

        )}

      </div>

    </div>
  );
}