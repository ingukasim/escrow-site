"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function DashboardPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState<any[]>([]);

  const [user, setUser] = useState<any>(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const [message, setMessage] = useState("");

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

    const admin =
      user.email === "escrowusdt.info@gmail.com";

    setIsAdmin(admin);

    if (admin) {
      loadAllOrders();
    } else {
      loadUserOrders(user.id);
    }
  };

  const loadUserOrders = async (
    userId: string
  ) => {

    const { data } = await supabase
      .from("escrow-orders")
      .select("*")
      .or(
        `seller_user_id.eq.${userId},buyer_user_id.eq.${userId}`
      )
      .order("created_at", {
        ascending: false,
      });

    setOrders(data || []);
    setLoading(false);
  };

  const loadAllOrders = async () => {

    const { data } = await supabase
      .from("escrow-orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setOrders(data || []);
    setLoading(false);
  };

  const sendTelegramTest = async () => {

    try {

      const response = await fetch(
        "/api/telegram",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message:
              "✅ Telegram notification system connected successfully!",
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {

        setMessage(
          "Telegram notification sent successfully!"
        );

      } else {

        setMessage(
          "Telegram notification failed."
        );

        console.log(data);

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Telegram notification error."
      );

    }

  };

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (o) => o.status === "Completed"
  ).length;

  const pendingOrders = orders.filter(
    (o) => o.status !== "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">

          <div>

            <div className="text-yellow-400 text-sm mb-2">
              Premium Escrow Dashboard
            </div>

            <h1 className="text-5xl font-bold">
              Welcome Back
            </h1>

            <div className="text-zinc-400 mt-3">
              {user?.email}
            </div>

          </div>

          <div className="flex flex-wrap gap-4">

            {isAdmin && (

              <button
                onClick={sendTelegramTest}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-4 rounded-2xl transition-all"
              >
                Test Telegram Alert
              </button>

            )}

            <button
              onClick={() =>
                router.push("/create-order")
              }
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition-all"
            >
              Create New Escrow
            </button>

          </div>

        </div>

        {/* MESSAGE */}
        {message && (

          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 text-center mb-8">
            {message}
          </div>

        )}

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

            <div className="text-5xl font-bold text-green-400">
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

              <div className="text-3xl mb-4">
                📭
              </div>

              <div className="text-zinc-400 text-lg">
                No escrow orders found.
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

                    <div className="space-y-4">

                      <div>

                        <div className="text-yellow-400 text-sm mb-2">
                          Order ID
                        </div>

                        <div className="text-2xl font-bold">
                          {order.order_id}
                        </div>

                      </div>

                      <div className="grid md:grid-cols-3 gap-6">

                        <div>

                          <div className="text-zinc-500 text-sm mb-1">
                            Amount
                          </div>

                          <div className="font-bold">
                            {order.amount} USDT
                          </div>

                        </div>

                        <div>

                          <div className="text-zinc-500 text-sm mb-1">
                            Seller Deposit
                          </div>

                          <div className="font-bold">
                            {order.seller_deposit} USDT
                          </div>

                        </div>

                        <div>

                          <div className="text-zinc-500 text-sm mb-1">
                            Buyer Receives
                          </div>

                          <div className="font-bold">
                            {order.buyer_receive} USDT
                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-4">

                      <div
                        className={`px-5 py-3 rounded-2xl font-bold ${
                          order.status === "Completed"
                            ? "bg-green-500/10 border border-green-500/30 text-green-400"
                            : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300"
                        }`}
                      >
                        {order.status}
                      </div>

                      <button
                        onClick={() =>
                          router.push(
                            `/order/${order.order_id}`
                          )
                        }
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-2xl transition-all"
                      >
                        Open Escrow
                      </button>

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