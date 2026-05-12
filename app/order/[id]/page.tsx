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

  const [proofFile, setProofFile] =
    useState<any>(null);

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

      let { data, error } =
        await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

      if (error || !data) {

        console.error(error);

        setLoading(false);

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

      setOrder(data);

      setBuyerWallet(
        data.buyer_wallet || ""
      );

      /* ROLE */

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

      setLoading(false);

    };

  /* SAVE WALLET */

  const saveBuyerWallet =
    async () => {

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
          "✅ Wallet saved successfully!"
        );

        initializePage();

      }

    };

  /* UPLOAD PAYMENT PROOF */

  const uploadProof =
    async () => {

      if (!proofFile) {

        setMessage(
          "Select proof image first"
        );

        return;
      }

      const fileName =
        `${Date.now()}-${proofFile.name}`;

      const { error: uploadError } =
        await supabase.storage
          .from("payment-proofs")
          .upload(
            fileName,
            proofFile
          );

      if (uploadError) {

        setMessage(
          uploadError.message
        );

        return;
      }

      const {
        data: publicData,
      } =
        supabase.storage
          .from(
            "payment-proofs"
          )
          .getPublicUrl(
            fileName
          );

      const proofUrl =
        publicData.publicUrl;

      const { error } =
        await supabase
          .from("orders")
          .update({
            payment_proof:
              proofUrl,
          })
          .eq("id", orderId);

      if (error) {

        setMessage(
          error.message
        );

      } else {

        setMessage(
          "✅ Payment proof uploaded!"
        );

        initializePage();

      }

    };

  /* BUYER PAID */

  const markAsPaid =
    async () => {

      if (
        !order.payment_proof
      ) {

        setMessage(
          "Upload payment proof first"
        );

        return;
      }

      if (
        !order.buyer_wallet
      ) {

        setMessage(
          "Save buyer wallet first"
        );

        return;
      }

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
          "✅ Payment submitted!"
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
          "✅ Escrow secured!"
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
          "✅ Escrow released!"
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

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <h1 className="text-5xl font-bold text-yellow-400 mb-4">

            {order.amount} USDT

          </h1>

          <div className="text-zinc-400">
            Order ID: {order.id}
          </div>

        </div>

        {/* BUYER VIEW */}
        {userRole ===
          "buyer" && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Buyer Payment Section

            </h2>

            <div className="space-y-6">

              {/* WALLET */}
              <input
                type="text"
                value={buyerWallet}
                onChange={(e) =>
                  setBuyerWallet(
                    e.target.value
                  )
                }
                placeholder="Receiving wallet"
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
              />

              <button
                onClick={saveBuyerWallet}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-2xl"
              >

                Save Wallet

              </button>

              {/* PAYMENT PROOF */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProofFile(
                    e.target.files?.[0]
                  )
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
              />

              <button
                onClick={uploadProof}
                className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-8 py-4 rounded-2xl"
              >

                Upload Payment Proof

              </button>

              {/* PREVIEW */}
              {order.payment_proof && (

                <img
                  src={
                    order.payment_proof
                  }
                  alt="Payment Proof"
                  className="rounded-2xl border border-zinc-700"
                />

              )}

              {/* PAID BUTTON */}
              {order.status ===
                "Escrow Secured" && (

                <button
                  onClick={markAsPaid}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl"
                >

                  I Have Paid

                </button>

              )}

            </div>

          </div>

        )}

        {/* ADMIN VIEW */}
        {isAdmin && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Admin Controls

            </h2>

            <div className="space-y-6">

              {/* BUYER WALLET */}
              {order.buyer_wallet && (

                <div>

                  <div className="text-zinc-400 mb-3">
                    Buyer Wallet
                  </div>

                  <div className="bg-black border border-zinc-700 rounded-2xl p-5 break-all">

                    {order.buyer_wallet}

                  </div>

                </div>

              )}

              {/* PAYMENT PROOF */}
              {order.payment_proof && (

                <div>

                  <div className="text-zinc-400 mb-3">
                    Payment Proof
                  </div>

                  <img
                    src={
                      order.payment_proof
                    }
                    alt="Payment Proof"
                    className="rounded-2xl border border-zinc-700"
                  />

                </div>

              )}

              {/* BUTTONS */}
              {order.status ===
                "Pending" && (

                <button
                  onClick={confirmEscrow}
                  className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-8 py-4 rounded-2xl"
                >

                  Confirm USDT Received

                </button>

              )}

              {order.status ===
                "Payment Sent" && (

                <button
                  onClick={releaseEscrow}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-2xl"
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