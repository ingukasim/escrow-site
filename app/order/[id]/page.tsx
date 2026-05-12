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

  const [accessDenied, setAccessDenied] =
    useState(false);

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

        setAccessDenied(true);

        return;
      }

      try {

        let { data, error } =
          await supabase
            .from("orders")
            .select("*")
            .eq("id", orderId)
            .single();

        if (error || !data) {

          console.error(error);

          setLoading(false);

          setAccessDenied(true);

          return;
        }

        const isAdmin =
          user.email ===
          "escrowusdt.info@gmail.com";

        /* AUTO JOIN */

        if (
          !data.joined_user_id &&
          data.seller_id !== user.id &&
          !isAdmin
        ) {

          const {
            error: joinError,
          } =
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

        /* ACCESS CONTROL */

        const hasAccess =
          data.seller_id ===
            user.id ||
          data.joined_user_id ===
            user.id ||
          isAdmin;

        if (!hasAccess) {

          setAccessDenied(true);

          setLoading(false);

          return;
        }

        setOrder(data);

        setBuyerWallet(
          data.buyer_wallet || ""
        );

        /* DETECT ROLE */

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

  /* SAVE BUYER WALLET */

  const saveBuyerWallet =
    async () => {

      if (!buyerWallet) {

        setMessage(
          "Please enter wallet address"
        );

        return;
      }

      const { error } =
        await supabase
          .from("orders")
          .update({
            buyer_wallet:
              buyerWallet,
          })
          .eq("id", orderId);

      if (error) {

        setMessage(
          error.message
        );

      } else {

        setMessage(
          "✅ Buyer wallet saved successfully!"
        );

        initializePage();

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

      if (!order.buyer_wallet) {

        setMessage(
          "Buyer wallet missing"
        );

        return;
      }

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

  if (accessDenied) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="bg-zinc-900 border border-red-500/30 rounded-3xl p-12 text-center max-w-lg">

          <div className="text-6xl mb-6">
            🔒
          </div>

          <h1 className="text-4xl font-bold text-red-400 mb-4">

            Access Denied

          </h1>

          <div className="text-zinc-400 text-lg">

            You are not authorized
            to access this escrow
            transaction.

          </div>

        </div>

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

        {/* BUYER SECTION */}
        {userRole ===
          "buyer" && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Buyer Wallet

            </h2>

            <div className="space-y-6">

              <input
                type="text"
                value={buyerWallet}
                onChange={(e) =>
                  setBuyerWallet(
                    e.target.value
                  )
                }
                placeholder="Enter receiving wallet"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none focus:border-yellow-400"
              />

              <button
                onClick={saveBuyerWallet}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-2xl transition-all"
              >

                Save Wallet

              </button>

              {order.status ===
                "Escrow Secured" && (

                <button
                  onClick={markAsPaid}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition-all"
                >

                  I Have Paid

                </button>

              )}

            </div>

          </div>

        )}

        {/* ADMIN VIEW */}
        {isAdmin &&
          order.buyer_wallet && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-6">

              Buyer Wallet Address

            </h2>

            <div className="bg-black border border-zinc-700 rounded-2xl p-5 break-all text-lg">

              {order.buyer_wallet}

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