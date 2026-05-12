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

  const [currentUser, setCurrentUser] =
    useState<any>(null);

  const [userRole, setUserRole] =
    useState("");

  useEffect(() => {

    initializePage();

  }, []);

  const initializePage =
    async () => {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      setCurrentUser(user);

      if (!user) {

        setLoading(false);

        return;
      }

      try {

        let { data, error } =
          await supabase
            .from("orders")
            .select("*")
            .eq("id", orderId)
            .single();

        if (error) {

          console.error(error);

          setLoading(false);

          return;
        }

        /* AUTO JOIN LOGIC */

        if (
          !data.joined_user_id &&
          data.seller_id !== user.id
        ) {

          const { error: joinError } =
            await supabase
              .from("orders")
              .update({
                joined_user_id:
                  user.id,
              })
              .eq("id", orderId);

          if (!joinError) {

            data.joined_user_id =
              user.id;

          }

        }

        setOrder(data);

        /* DETECT USER ROLE */

        if (
          data.seller_id ===
          user.id
        ) {

          setUserRole(
            data.creator_role
          );

        } else {

          if (
            data.creator_role ===
            "seller"
          ) {

            setUserRole(
              "buyer"
            );

          } else {

            setUserRole(
              "seller"
            );

          }

        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

  const markAsPaid =
    async () => {

      const { error } =
        await supabase
          .from("orders")
          .update({
            status:
              "Payment Sent",
          })
          .eq("id", orderId);

      if (error) {

        setMessage(
          error.message
        );

      } else {

        setMessage(
          "✅ Payment marked successfully!"
        );

        initializePage();

      }

    };

  const confirmEscrow =
    async () => {

      const { error } =
        await supabase
          .from("orders")
          .update({
            status:
              "Escrow Secured",
          })
          .eq("id", orderId);

      if (error) {

        setMessage(
          error.message
        );

      } else {

        setMessage(
          "✅ Escrow secured successfully!"
        );

        initializePage();

      }

    };

  const releaseEscrow =
    async () => {

      const { error } =
        await supabase
          .from("orders")
          .update({
            status:
              "Completed",
          })
          .eq("id", orderId);

      if (error) {

        setMessage(
          error.message
        );

      } else {

        setMessage(
          "✅ Escrow released successfully!"
        );

        initializePage();

      }

    };

  const isAdmin =
    currentUser?.email ===
    "escrowusdt.info@gmail.com";

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

              <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-6 py-4 rounded-2xl font-bold capitalize">

                {userRole}

              </div>

            </div>

          </div>

        </div>

        {/* STATUS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-bold text-yellow-400 mb-6">

            Escrow Status

          </h2>

          <div className="space-y-4 text-lg">

            <div>
              ✅ Escrow order created
            </div>

            <div>

              {order.status ===
              "Escrow Secured" ||
              order.status ===
              "Payment Sent" ||
              order.status ===
              "Completed"
                ? "✅ Escrow funded"
                : "⏳ Awaiting escrow funding"}

            </div>

            <div>

              {order.status ===
              "Escrow Secured" ||
              order.status ===
              "Payment Sent" ||
              order.status ===
              "Completed"
                ? "✅ Escrow secured"
                : "⏳ Waiting admin confirmation"}

            </div>

            <div>

              {order.status ===
              "Payment Sent" ||
              order.status ===
              "Completed"
                ? "✅ Buyer payment sent"
                : "⏳ Buyer payment pending"}

            </div>

            <div>

              {order.status ===
              "Completed"
                ? "✅ Escrow completed"
                : "⏳ Awaiting escrow release"}

            </div>

          </div>

        </div>

        {/* SELLER VIEW */}
        {userRole ===
          "seller" && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Seller Deposit Instructions

            </h2>

            <div className="space-y-6">

              <div className="bg-white rounded-3xl p-6 flex items-center justify-center">

                <img
                  src="/wallet-qr.png"
                  alt="Wallet QR"
                  className="w-64 h-64 object-contain"
                />

              </div>

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

            </div>

          </div>

        )}

        {/* BUYER VIEW */}
        {userRole ===
          "buyer" && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Buyer Payment Section

            </h2>

            <div className="space-y-6">

              <div>

                <div className="text-zinc-400 mb-2">
                  You Will Receive
                </div>

                <div className="text-3xl font-bold text-yellow-400">

                  {order.buyer_receives}
                  {" "}USDT

                </div>

              </div>

              <div>

                <label className="block mb-3 text-zinc-300">

                  Receiving Wallet

                </label>

                <input
                  type="text"
                  value={buyerWallet}
                  onChange={(e) =>
                    setBuyerWallet(
                      e.target.value
                    )
                  }
                  placeholder="Enter your receiving wallet"
                  className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
                />

              </div>

              {order.status ===
                "Escrow Secured" && (

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

        {/* ADMIN CONTROLS */}
        {isAdmin && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Admin Controls

            </h2>

            <div className="flex flex-wrap gap-6">

              {order.status ===
                "Pending" && (

                <button
                  onClick={confirmEscrow}
                  className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-8 py-4 rounded-2xl transition-all"
                >

                  Confirm USDT Received

                </button>

              )}

              {order.status ===
                "Payment Sent" && (

                <button
                  onClick={releaseEscrow}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-2xl transition-all"
                >

                  Release Escrow

                </button>

              )}

            </div>

          </div>

        )}

        {/* MESSAGE */}
        {message && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center">

            {message}

          </div>

        )}

      </div>

    </div>
  );
}