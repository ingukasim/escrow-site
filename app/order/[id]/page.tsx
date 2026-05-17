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
const [userEmail, setUserEmail] =
  useState("");
const [userId, setUserId] =
  useState("");
const [wallet,setWallet]=
useState("");

const [network,setNetwork]=
useState("");

const [qrCode,setQrCode]=
useState("");
const [bankName,setBankName]=
useState("");

const [accountNumber,setAccountNumber]=
useState("");

const [accountHolder,setAccountHolder]=
useState("");

const [depositNote,setDepositNote]=
useState("CDM ONLY");

  useEffect(() => {

    initializePage();

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

    return () => {

      supabase.removeChannel(
        orderChannel
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
const {
data:{user}
}=await supabase.auth.getUser();

setUserEmail(
user?.email || ""
);

setUserId(
user?.id || ""
);
const {data:settings}=await supabase
.from("settings")
.select("*")
.limit(1)
.single();

if(settings){

setWallet(
settings.wallet_address || ""
);

setNetwork(
settings.network || ""
);

setQrCode(
settings.qr_code || ""
);

}     
 setOrder(data);

      setLoading(false);

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

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-6">

            <div>

              <div className="text-yellow-400 text-sm mb-3">
                Escrow Transaction
              </div>

              <h1 className="text-5xl font-bold mb-4">

                {order?.amount}
                {" "}USDT

              </h1>

              <div className="text-zinc-400">

                Order ID:
                {" "}
                {order?.id}

              </div>

            </div>

            <div>

              {order?.status ===
              "Completed" ? (

                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-2xl font-bold">

                  ✅ Completed

                </div>

              ) : order?.status ===
                "Escrow Secured" ? (

                <div className="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-6 py-4 rounded-2xl font-bold">

                  🔒 Escrow Secured

                </div>

              ) : order?.status ===
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

        </div>

        {/* ESCROW DETAILS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-10">

          <h2 className="text-3xl font-bold text-yellow-400 mb-8">

            Escrow Details

          </h2>
{/* INVITE PARTICIPANT */}

<div className="bg-black border border-green-500/20 rounded-3xl p-6 mb-8">

  <div className="text-green-400 text-xl font-bold mb-3">

    Invite Buyer / Seller

  </div>

  <div className="text-zinc-400 mb-4">

    Share this link with your participant to join escrow.

  </div>

  <div className="bg-zinc-900 rounded-2xl p-4 break-all mb-4">

    {typeof window !== "undefined"
? `${window.location.origin}/join/${order?.id}`
: ""}

  </div>

 
 <button
onClick={() => {

const inviteLink =
`${window.location.origin}/join/${order?.id}`;

navigator.clipboard.writeText(
inviteLink
);

alert("Invite link copied");

}}
className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-2xl"
>

Copy Invite Link

</button>

</div>
          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <div className="text-zinc-400 mb-2">
                Seller Deposit
              </div>

              <div className="text-2xl font-bold">

                {order?.seller_deposit}
                {" "}USDT

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Buyer Receives
              </div>

              <div className="text-2xl font-bold">

                {order?.buyer_receives}
                {" "}USDT

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Telegram Username
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

                {order?.booking_date}

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Preferred Time
              </div>

              <div className="text-xl">

                {order?.booking_time}

              </div>

            </div>

            <div>

              <div className="text-zinc-400 mb-2">
                Escrow Status
              </div>

              <div className="text-xl font-bold text-yellow-400">

                {order?.status}

              </div>

            </div>

          </div>

        </div>
{/* ADMIN CONTROLS */}

{(
userEmail==="escrowusdt.info@gmail.com"
||
userId===order?.seller_id
) && (

<div className="bg-zinc-900 border border-green-500/20 rounded-3xl p-10 mb-10">

<h2 className="text-3xl font-bold text-green-400 mb-8">

Escrow Funding

</h2>


<div className="mb-6">

<div className="text-zinc-400 mb-2">

Admin USDT Receiving Wallet

</div>

<div className="bg-black rounded-2xl p-4 break-all">

{wallet}

</div>


<div className="mt-5">

<div className="text-zinc-400 mb-2">

Network

</div>

<div className="bg-black rounded-2xl p-4">

{network}

</div>

</div>


{qrCode && (

<div className="mt-6">

<div className="text-zinc-400 mb-3">

Scan QR

</div>

<img
src={qrCode}
className="rounded-2xl w-52"
/>

</div>

)}

</div>



{userId===order?.seller_id && (

<div className="space-y-5">

<div>

<div className="text-zinc-400 mb-3">

Upload USDT Deposit Proof

</div>

<input
type="file"
className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
/>

</div>

<button
className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-2xl"
>

Paid

</button>

</div>

)}


{userEmail==="escrowusdt.info@gmail.com" && (

<div className="mt-8">

<div className="text-zinc-400 mb-5">

Seller deposit verification panel

</div>

<button

onClick={async()=>{

await supabase
.from("orders")
.update({

status:
"Escrow Secured"

})
.eq(
"id",
order?.id
);

location.reload();

}}

className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-2xl"

>

USDT Deposit Verified

</button>

</div>

)}
</div>


)}


{/* BANK DETAILS */}

{/* BANK DETAILS */}

{userId===order?.seller_id && (

<div className="bg-zinc-900 border border-blue-500/20 rounded-3xl p-10 mb-10">

<h2 className="text-3xl font-bold text-blue-400 mb-8">

Bank Deposit Details

</h2>

<div className="space-y-5">

<input
placeholder="Bank Name"
value={bankName}
onChange={(e)=>setBankName(e.target.value)}
className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
/>

<input
placeholder="Account Number"
value={accountNumber}
onChange={(e)=>setAccountNumber(e.target.value)}
className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
/>

<input
placeholder="Account Holder Name"
value={accountHolder}
onChange={(e)=>setAccountHolder(e.target.value)}
className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
/>

<input
value={depositNote}
onChange={(e)=>setDepositNote(e.target.value)}
className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
/>

<button
onClick={async()=>{

await supabase
.from("orders")
.update({
bank_name:bankName,
account_number:accountNumber,
account_holder:accountHolder,
deposit_note:depositNote
})
.eq(
"id",
order?.id
);

alert(
"Bank details saved"
);

}}
className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-2xl"
>

Save Details

</button>

</div>

</div>

)}


{/* BUYER PAYMENT */}

{userId===order?.participant_id && (

<div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-10 mb-10">

<h2 className="text-3xl font-bold text-yellow-400 mb-8">

Buyer Payment

</h2>

<div className="space-y-5">

<div className="bg-black rounded-2xl p-4">

Bank:
<b> {order?.bank_name}</b>

</div>

<div className="bg-black rounded-2xl p-4">

Account:
<b> {order?.account_number}</b>

</div>

<div className="bg-black rounded-2xl p-4">

Holder:
<b> {order?.account_holder}</b>

</div>

<div className="text-red-400 font-bold">

⚠ CDM ONLY — No online transfer / no RTGS

</div>

<div>

<div className="text-zinc-400 mb-3">

Upload CDM Deposit Proof

</div>

<input
type="file"
className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
/>

</div>

<button
onClick={async()=>{

await supabase
.from("orders")
.update({

status:
"Payment Sent"

})
.eq(
"id",
order?.id
);

alert(
"Payment submitted"
);

location.reload();

}}
className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-2xl"
>

Payment Sent

</button>

</div>

</div>

)}
{/* PAYMENT PROOF */}  
      
        {order?.payment_proof && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">

              Payment Proof

            </h2>

            <img
              src={
                order.payment_proof
              }
              alt="Payment Proof"
              className="rounded-3xl border border-zinc-700"
            />

          </div>

        )}

      </div>

    </div>
  );
}