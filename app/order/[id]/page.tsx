"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { supabase } from "../../../lib/supabase";

export default function OrderDetailsPage() {

  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  const [order, setOrder] =
    useState<any>(null);

  const [timeLeft, setTimeLeft] =
    useState("");

  const [expired, setExpired] =
    useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {

    if (!order?.expires_at) return;

    const interval = setInterval(() => {

      const now =
        new Date().getTime();

      const expiry =
        new Date(
          order.expires_at
        ).getTime();

      const distance =
        expiry - now;

      if (distance <= 0) {

        setExpired(true);

        setTimeLeft("Expired");

        clearInterval(interval);

        return;
      }

      const minutes =
        Math.floor(
          (distance %
            (1000 * 60 * 60)) /
            (1000 * 60)
        );

      const seconds =
        Math.floor(
          (distance % (1000 * 60)) /
            1000
        );

      setTimeLeft(
        `${minutes}m ${seconds}s`
      );

    }, 1000);

    return () =>
      clearInterval(interval);

  }, [order]);

  const checkAccess = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");

      return;
    }

    const admin =
      user.email ===
      "escrowusdt.info@gmail.com";

    const { data, error } =
      await supabase
        .from("escrow-orders")
        .select("*")
        .eq("order_id", params.id)
        .single();

    if (error || !data) {

      setLoading(false);

      return;
    }

    const seller =
      data.seller_user_id ===
      user.id;

    const buyer =
      data.buyer_user_id ===
      user.id;

    if (
      !admin &&
      !seller &&
      !buyer
    ) {

      setAuthorized(false);

      setLoading(false);

      return;
    }

    setAuthorized(true);

    setOrder(data);

    setLoading(false);
  };

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Escrow...
      </div>
    );
  }

  if (!authorized) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Access Denied
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
                Secure OTC Escrow
              </div>

              <h1 className="text-5xl font-bold">
                {order.order_id}
              </h1>

            </div>

            <div
              className={`px-6 py-4 rounded-2xl font-bold text-lg ${
                expired
                  ? "bg-red-500/10 border border-red-500/30 text-red-400"
                  : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300"
              }`}
            >

              {expired
                ? "❌ Escrow Expired"
                : `⏳ ${timeLeft}`}

            </div>

          </div>

        </div>

        {/* STATUS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-6">

            <div>

              <div className="text-zinc-400 mb-3">
                Current Escrow Status
              </div>

              <div className="text-4xl font-bold text-yellow-400">
                {order.status}
              </div>

            </div>

            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4">

              <div className="text-zinc-400 text-sm mb-2">
                Expires At
              </div>

              <div className="font-bold">
                {new Date(
                  order.expires_at
                ).toLocaleString()}
              </div>

            </div>

          </div>

        </div>

        {/* ORDER INFO */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Escrow Details
          </h2>

          <div className="space-y-6">

            <div className="flex justify-between border-b border-zinc-800 pb-4">

              <span className="text-zinc-400">
                Seller Telegram
              </span>

              <span className="font-bold">
                {order.seller_telegram}
              </span>

            </div>

            <div className="flex justify-between border-b border-zinc-800 pb-4">

              <span className="text-zinc-400">
                Amount
              </span>

              <span className="font-bold">
                {order.amount} USDT
              </span>

            </div>

            <div className="flex justify-between border-b border-zinc-800 pb-4">

              <span className="text-zinc-400">
                Seller Deposit
              </span>

              <span className="font-bold">
                {order.seller_deposit} USDT
              </span>

            </div>

            <div className="flex justify-between border-b border-zinc-800 pb-4">

              <span className="text-zinc-400">
                Buyer Receives
              </span>

              <span className="font-bold">
                {order.buyer_receive} USDT
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-400">
                Fee Percentage
              </span>

              <span className="font-bold">
                {order.fee_percent}%
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}