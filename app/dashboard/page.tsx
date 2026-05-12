"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function DashboardPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [userEmail, setUserEmail] =
    useState("");

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {

        setLoading(false);

        return;
      }

      setUserEmail(
        user.email || ""
      );

      const isAdmin =
        user.email ===
        "escrowusdt.info@gmail.com";

      let query =
        supabase
          .from("orders")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      /* ADMIN SEES ALL */

      if (!isAdmin) {

        query =
          query.or(
            `seller_id.eq.${user.id},joined_user_id.eq.${user.id}`
          );

      }

      const {
        data,
        error,
      } =
        await query;

      if (error) {

        console.error(error);

      } else {

        setOrders(data || []);

      }

      setLoading(false);

    };

  const totalOrders =
    orders.length;

  const activeOrders =
    orders.filter(
      (o) =>
        o.status !==
        "Completed"
    ).length;

  const completedOrders =
    orders.filter(
      (o) =>
        o.status ===
        "Completed"
    ).length;

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Loading dashboard...

      </div>
    );

  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="mb-12">

          <div className="text-yellow-400 text-sm mb-3">

            Premium Escrow Dashboard

          </div>

          <h1 className="text-5xl font-bold mb-4">

            Welcome Back

          </h1>

          <div className="text-zinc-400 text-lg">

            {userEmail}

          </div>

        </div>

        {/* CREATE BUTTON */}
        <div className="mb-12">

          <Link
            href="/create-order"
            className="inline-flex items-center bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition-all"
          >

            + Create New Escrow

          </Link>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Total Orders
            </div>

            <div className="text-5xl font-bold text-yellow-400">

              {totalOrders}

            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Active Orders
            </div>

            <div className="text-5xl font-bold text-yellow-400">

              {activeOrders}

            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Completed Orders
            </div>

            <div className="text-5xl font-bold text-yellow-400">

              {completedOrders}

            </div>

          </div>

        </div>

        {/* ORDERS */}
        <div className="space-y-6">

          {orders.length ===
          0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-16 text-center">

              <div className="text-2xl text-zinc-500">

                No escrow orders found.

              </div>

            </div>

          ) : (

            orders.map(
              (order) => (

                <Link
                  key={order.id}
                  href={`/order/${order.id}`}
                  className="block bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-3xl p-8 transition-all"
                >

                  <div className="flex flex-wrap items-center justify-between gap-6">

                    <div>

                      <div className="text-3xl font-bold text-yellow-400 mb-4">

                        {order.amount}
                        {" "}USDT

                      </div>

                      <div className="text-zinc-400 mb-2">

                        Order ID:
                        {" "}
                        {order.id}

                      </div>

                      <div className="text-zinc-400">

                        Created:
                        {" "}
                        {new Date(
                          order.created_at
                        ).toLocaleString()}

                      </div>

                    </div>

                    <div>

                      {order.status ===
                      "Completed" ? (

                        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-2xl font-bold">

                          ✅ Completed

                        </div>

                      ) : order.status ===
                        "Escrow Secured" ? (

                        <div className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-6 py-4 rounded-2xl font-bold">

                          🔒 Escrow Secured

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

                </Link>

              )
            )

          )}

        </div>

      </div>

    </div>
  );
}