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

  const [messages, setMessages] =
    useState<any[]>([]);

  const [newMessage, setNewMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [currentUser, setCurrentUser] =
    useState<any>(null);

  useEffect(() => {

    initializePage();

    loadMessages();

    loadActivities();

    /* ORDER REALTIME */

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

    /* CHAT REALTIME */

    const messageChannel =
      supabase
        .channel(
          `messages-${orderId}`
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table:
              "escrow_messages",
            filter:
              `order_id=eq.${orderId}`,
          },
          () => {

            loadMessages();

          }
        )
        .subscribe();

    /* ACTIVITY REALTIME */

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
        messageChannel
      );

      supabase.removeChannel(
        activityChannel
      );

    };

  }, []);

  const initializePage =
    async () => {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      setCurrentUser(user);

      const { data } =
        await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

      setOrder(data);

      setLoading(false);

    };

  const loadMessages =
    async () => {

      const { data } =
        await supabase
          .from(
            "escrow_messages"
          )
          .select("*")
          .eq("order_id", orderId)
          .order(
            "created_at",
            {
              ascending: true,
            }
          );

      setMessages(data || []);

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

  /* SAVE ACTIVITY */

  const saveActivity =
    async (
      activity: string
    ) => {

      await supabase
        .from(
          "escrow_activity"
        )
        .insert([
          {
            order_id: orderId,
            activity,
          },
        ]);

    };

  /* SEND CHAT */

  const sendMessage =
    async () => {

      if (!newMessage.trim()) {

        return;
      }

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {

        return;
      }

      await supabase
        .from(
          "escrow_messages"
        )
        .insert([
          {
            order_id: orderId,
            sender_email:
              user.email,
            message:
              newMessage,
          },
        ]);

      await saveActivity(
        `${user.email} sent a message`
      );

      setNewMessage("");

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

        <div className="grid lg:grid-cols-3 gap-8">

          {/* CHAT */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

            <div className="p-8 border-b border-zinc-800">

              <h2 className="text-3xl font-bold text-yellow-400">

                Escrow Chat

              </h2>

            </div>

            <div className="h-[600px] overflow-y-auto p-8 space-y-6">

              {messages.map(
                (msg) => (

                  <div
                    key={msg.id}
                    className={`max-w-2xl ${
                      msg.sender_email ===
                      currentUser?.email
                        ? "ml-auto"
                        : ""
                    }`}
                  >

                    <div
                      className={`rounded-3xl p-5 ${
                        msg.sender_email ===
                        currentUser?.email
                          ? "bg-yellow-400 text-black"
                          : "bg-zinc-800 text-white"
                      }`}
                    >

                      <div className="text-sm opacity-70 mb-2">

                        {
                          msg.sender_email
                        }

                      </div>

                      <div className="text-lg leading-7">

                        {msg.message}

                      </div>

                    </div>

                    <div className="text-xs text-zinc-500 mt-2 px-2">

                      {new Date(
                        msg.created_at
                      ).toLocaleString()}

                    </div>

                  </div>

                )
              )}

            </div>

            <div className="border-t border-zinc-800 p-6">

              <div className="flex gap-4">

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) =>
                    setNewMessage(
                      e.target.value
                    )
                  }
                  placeholder="Type escrow message..."
                  className="flex-1 bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
                />

                <button
                  onClick={sendMessage}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 rounded-2xl"
                >

                  Send

                </button>

              </div>

            </div>

          </div>

          {/* ACTIVITY */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

            <div className="p-8 border-b border-zinc-800">

              <h2 className="text-3xl font-bold text-yellow-400">

                Activity Log

              </h2>

            </div>

            <div className="p-6 space-y-5 h-[600px] overflow-y-auto">

              {activities.length ===
              0 ? (

                <div className="text-zinc-500 text-center pt-20">

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

    </div>
  );
}