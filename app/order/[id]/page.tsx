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
      </div>
    </div>
  );
}