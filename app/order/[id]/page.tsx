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

  const [activities, setActivities] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    initializePage();

    loadActivities();

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

    const activityChannel =
      supabase
        .channel(
          `activity-${orderId}`
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table:
              "escrow_activity",
            filter:
              `order_id=eq.${orderId}`,
          },
          () => {

            loadActivities();

          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        orderChannel
      );

      supabase.removeChannel(
        activityChannel
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

  const loadActivities =
    async () => {

      const { data } =
        await supabase
          .from(
            "escrow_activity"
          )
          .select("*")
          .eq("order_id", orderId)
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      setActivities(data || []);

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

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <h1 className="text-5xl font-bold text-yellow-400 mb-4">

            {order?.amount}
            {" "}USDT Escrow

          </h1>

          <div className="text-zinc-400">

            Order ID:
            {" "}
            {order?.id}

          </div>

        </div>

        {/* ORDER DETAILS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <h2 className="text-3xl font-bold text-yellow-400 mb-8">

            Escrow Details

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <div className="text-zinc-400 mb-2">
                Amount
              </div>

              <div className="text-2xl font-bold">

                {order?.amount} USDT

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Status
              </div>

              <div className="text-2xl font-bold text-yellow-400">

                {order?.status}

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Seller Deposit
              </div>

              <div className="text-2xl font-bold">

                {order?.seller_deposit} USDT

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Buyer Receives
              </div>

              <div className="text-2xl font-bold">

                {order?.buyer_receives} USDT

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Telegram
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

          </div>

        </div>

        {/* PAYMENT PROOF */}
        {order?.payment_proof && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Payment Proof

            </h2>

            <img
              src={order.payment_proof}
              alt="Payment Proof"
              className="rounded-3xl border border-zinc-700"
            />

          </div>

        )}

        {/* ACTIVITY LOG */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

          <div className="p-8 border-b border-zinc-800">

            <h2 className="text-3xl font-bold text-yellow-400">

              Activity Timeline

            </h2>

          </div>

          <div className="p-6 space-y-5 max-h-[600px] overflow-y-auto">

            {activities.length ===
            0 ? (

              <div className="text-zinc-500 text-center py-20">

                No activity yet.

              </div>

            ) : (

              activities.map(
                (activity) => (

                  <div
                    key={activity.id}
                    className="bg-zinc-800 rounded-2xl p-5"
                  >

                    <div className="text-white leading-7">

                      {
                        activity.activity
                      }

                    </div>

                    <div className="text-xs text-zinc-500 mt-3">

                      {new Date(
                        activity.created_at
                      ).toLocaleString()}

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>

      </div>

    </div>
  );
}