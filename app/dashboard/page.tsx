"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    checkUser();

  }, []);

  const checkUser = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    setUser(user);

    loadOrders(user.id);

  };

  const loadOrders = async (
    userId: string
  ) => {

    try {

      const { data, error } =
        await supabase
          .from("orders")
          .select("*")
          .eq("seller_id", userId)
          .order("created_at", {
            ascending: false,
          });

      if (error) {

        console.error(error);

      } else {

        setOrders(data || []);

      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const pendingOrders =
    orders.filter(
      (o) =>
        o.status === "Pending"
    ).length;

  const completedOrders =
    orders.filter(
      (o) =>
        o.status === "Completed"
    ).length;

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-6">

            <div>

              <div className="text-yellow-400 text-sm mb-3">
                Premium Escrow Dashboard
              </div>

              <h1 className="text-5xl font-bold mb-4">
                Welcome Back
              </h1>

              <div className="text-zinc-400">
                {user?.email}
              </div>

            </div>

            <Link
              href="/create-order"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition-all"
            >
              Create New Escrow
            </Link>

          </div>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Total Orders
            </div>

            <div className="text-5xl font-bold text-yellow-400">
              {orders.length}
            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="text-zinc-400 mb-3">
              Pending Orders
            </div>

            <div className="text-5xl font-bold text-yellow-400">
              {pendingOrders}
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

          <div className="p-8 border-b border-zinc-800">

            <h2 className="text-3xl font-bold text-yellow-400">
              Escrow Orders
            </h2>

          </div>

          {loading ? (

            <div className="p-12 text-center text-zinc-400">
              Loading orders...
            </div>

          ) : orders.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-5xl mb-5">
                📭
              </div>

              <div className="text-zinc-400 text-lg">
                No orders found.
              </div>

            </div>

          ) : (

            <div className="divide-y divide-zinc-800">

              {orders.map((order) => (

                <div
                  key={order.id}
                  className="p-8 hover:bg-zinc-800/50 transition-all"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    {/* LEFT */}
                    <div className="space-y-4">

                      <div className="text-3xl font-bold text-yellow-400">

                        {order.amount}
                        {" "}USDT

                      </div>

                      <div className="text-zinc-400 break-all">

                        Order ID:
                        {" "}
                        {order.id}

                      </div>

                      <div className="text-zinc-400">

                        Telegram:
                        {" "}
                        {order.telegram}

                      </div>

                      <div className="text-zinc-400">

                        Escrow Date:
                        {" "}
                        {order.booking_date}

                      </div>

                      <div className="text-zinc-400">

                        Escrow Time:
                        {" "}
                        {order.booking_time}

                      </div>

                      <div className="text-zinc-400">

                        Seller Deposit:
                        {" "}
                        {order.seller_deposit}
                        {" "}USDT

                      </div>

                      <div className="text-zinc-400">

                        Buyer Receives:
                        {" "}
                        {order.buyer_receives}
                        {" "}USDT

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col gap-4 items-start lg:items-end">

                      {order.status ===
                      "Completed" ? (

                        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-3 rounded-2xl font-bold">

                          ✅ Completed

                        </div>

                      ) : order.status ===
                        "Payment Sent" ? (

                        <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-5 py-3 rounded-2xl font-bold">

                          💸 Payment Sent

                        </div>

                      ) : (

                        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-5 py-3 rounded-2xl font-bold">

                          ⏳ Pending

                        </div>

                      )}

                      <Link
                        href={`/order/${order.id}`}
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-2xl transition-all"
                      >

                        View Escrow

                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}