"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { supabase } from "../../../lib/supabase";

export default function OrderPage() {

  const router = useRouter();

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

const [disputeReason,
setDisputeReason]=
useState("");

const [messages,setMessages] =
useState<any[]>([]);

const [newMessage,setNewMessage] =
useState("");

const [chatFile,setChatFile] =
useState<any>(null);

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

console.log(
"BUYER PROOF:",
data?.buyer_payment_proof
);

const {data:chatData} =
await supabase
.from("escrow_messages")
.select("*")
.eq(
"order_id",
params.id
)
.order(
"created_at",
{ascending:true}
);

setMessages(
chatData || []
);

const unreadCount =
(chatData || []).filter(
(msg)=>
msg?.sender_email &&
msg.sender_email !== userEmail &&
msg.seen === false
).length || 0;

console.log(
"UNREAD:",
String(unreadCount)
);

console.log(
"UNREAD:",
unreadCount
);
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

 
<div className="text-2xl font-bold text-blue-400 mb-6">   
 Invite Buyer / Seller

  </div>

  <div className="text-zinc-400 mb-4">

    Share this link with your participant to join escrow.

  </div>

  <div className="bg-zinc-900 rounded-2xl p-4 break-all mb-4">

    {typeof window !== "undefined"
? `https://gkfocususdtescrow.com/join/${order?.id}`
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

{userEmail==="escrowusdt.info@gmail.com" ? (

<div>

<div className="text-zinc-400 mb-2">
Admin USDT Receiving Wallet
</div>

<input
value={wallet}
onChange={(e)=>
setWallet(
e.target.value
)}
placeholder="Enter wallet address"
className="w-full bg-black rounded-2xl p-4 text-white"
/>

<div className="mt-5">

<div className="text-zinc-400 mb-2">
Network
</div>

<input
value={network}
onChange={(e)=>
setNetwork(
e.target.value
)}
placeholder="Enter network"
className="w-full bg-black rounded-2xl p-4 text-white"
/>

<button
onClick={async()=>{

await supabase
.from("settings")
.update({
wallet_address:wallet,
network:network
})
.eq(
"id",
1
);
alert(
"Settings Saved Successfully"
);

}}
className="w-full mt-6 bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-2xl"
>

Save Wallet Settings

</button>

</div>

</div>

) : (

<div>

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

</div>

)}

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

Buyer Deposit Account Details:

</h2>

<div className="space-y-5">

<div className="bg-black rounded-2xl p-4">

Bank:
<b> {bankName || order?.bank_name || "-"}</b>

</div>

<div className="bg-black rounded-2xl p-4">

Account:
<b> {accountNumber || order?.account_number || "-"}</b>

</div>

<div className="bg-black rounded-2xl p-4">

Holder:
<b> {accountHolder || order?.account_holder || "-"}</b>

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
accept="image/*"
onChange={async(e)=>{

const file=
e.target.files?.[0];

if(!file)return;

const safeName =
file.name.replaceAll(" ","-");

const fileName=
`${Date.now()}-${safeName}`;

await supabase
.storage
.from("payment-proofs")
.upload(
fileName,
file
);

const {data}=supabase
.storage
.from("payment-proofs")
.getPublicUrl(
fileName
);

await supabase
.from("orders")
.update({

buyer_payment_proof:
data.publicUrl

})
.eq(
"id",
order?.id
);

alert(
"Payment proof uploaded"
);

location.reload();

}}
className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
/>
</div>



{!order?.dispute && (

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

)}

</div>

</div>

)}
{/* BUYER PAYMENT PROOF */}

{userId===order?.seller_id &&
order?.buyer_payment_proof && (

<div className="bg-zinc-900 border border-green-500/20 rounded-3xl p-10 mb-10">

<h2 className="text-3xl font-bold text-green-400 mb-8">

Buyer Payment Proof

</h2>

<div className="mb-4 text-sm text-yellow-400 break-all">
{order?.buyer_payment_proof}
</div>

<img
src={order?.buyer_payment_proof + "?t=" + Date.now()}
alt="Payment proof"
className="rounded-3xl border border-zinc-700 mb-8 w-full max-w-lg"
onError={()=>{
console.log(
"Image failed:",
order?.buyer_payment_proof
);
}}
/>

{!order?.dispute && order?.status==="Payment Sent" && (

<button
onClick={async()=>{

await supabase
.from("orders")
.update({

status:
"Payment Confirmed"

})
.eq(
"id",
order?.id
);

alert(
"Payment received confirmed"
);

location.reload();

}}
className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-2xl"
>

Money Received

</button>

)}

</div>

)}

{/* RELEASE USDT */}
{!order?.dispute &&
userEmail==="escrowusdt.info@gmail.com" &&
order?.status==="Payment Confirmed" && (

<button
onClick={async()=>{

await supabase
.from("orders")
.update({

status:
"Completed"

})
.eq(
"id",
order?.id
);
window.location.href=
`/feedback/${order?.id}`;
alert(
"USDT Released Successfully"
);

location.reload();

}}
className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-2xl mt-6"
>

Release USDT

</button>

)}
{/* DISPUTE ALERT */}

{order?.dispute && (

<div className="bg-red-950 border border-red-500 rounded-3xl p-10 mb-10">

<h2 className="text-3xl font-bold text-red-400 mb-6">

🚨 DISPUTE ACTIVE

</h2>

<div className="text-white mb-4">

Reason:

<b>
{" "}
{order?.dispute_reason}
</b>

</div>

{userEmail==="escrowusdt.info@gmail.com" && (

<button
onClick={async()=>{

await supabase
.from("orders")
.update({

dispute:false,
status:"Escrow Secured"

})
.eq(
"id",
order?.id
);

alert(
"Dispute resolved"
);

location.reload();

}}
className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-2xl"
>

Resolve Dispute

</button>

)}

</div>

)}
{/* ESCROW TIMELINE */}

<div className="bg-zinc-900 border border-purple-500/20 rounded-3xl p-10 mb-10">

<h2 className="text-3xl font-bold text-purple-400 mb-8">

Escrow Timeline

</h2>

<div className="space-y-4">

<div>✅ Escrow Created</div>

{order?.participant_id && (
<div>✅ Participant Joined</div>
)}

{order?.status==="Escrow Secured" ||
order?.status==="Payment Sent" ||
order?.status==="Payment Confirmed" ||
order?.status==="Completed" ? (
<div>✅ Escrow Secured</div>
):null}

{order?.buyer_payment_proof && (
<div>✅ Payment Sent</div>
)}

{order?.status==="Payment Confirmed" ||
order?.status==="Completed" ? (
<div>✅ Payment Confirmed</div>
):null}

{order?.status==="Completed" && (
<div>✅ USDT Released / Completed</div>
)}

</div>

</div>
{/* DISPUTE */}

{order?.status!=="Completed" &&
!order?.dispute && (

<div className="bg-zinc-900 border border-red-500/20 rounded-3xl p-10 mb-10">

<h2 className="text-3xl font-bold text-red-400 mb-8">

Dispute Center

</h2>

<textarea
placeholder="Describe issue..."
value={disputeReason}
onChange={(e)=>
setDisputeReason(
e.target.value
)}
className="w-full bg-black border border-zinc-700 rounded-2xl p-4 mb-5 h-32"
/>

<button
onClick={async()=>{

await supabase
.from("orders")
.update({

dispute:true,
dispute_reason:
disputeReason,
status:"Disputed"

})
.eq(
"id",
order?.id
);

alert(
"Dispute submitted"
);

location.reload();

}}
className="bg-red-500 hover:bg-red-400 text-white font-bold px-8 py-4 rounded-2xl"
>

Open Dispute

</button>

</div>

)}
{/* ESCROW CHAT */}

<div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-10 mb-10">

<h2 className="text-3xl font-bold text-cyan-400 mb-8">

Escrow Chat

</h2>

<div className="bg-black rounded-2xl p-4 h-72 overflow-y-auto mb-6">

{messages.map((msg)=>(

<div
key={msg.id}
className="mb-4"
>

<div className="text-cyan-400 text-sm">

{msg.sender_email}

</div>

<div className="text-white">

{msg.message?.includes(
"supabase.co/storage"
) ? (

<img
src={msg.message}
alt="chat file"
className="w-64 h-auto rounded-2xl border border-zinc-700 mt-2 object-contain"
onError={()=>{
console.log(
"CHAT IMAGE FAILED:",
msg.message
);
}}
/>

) : (

msg.message

)}

</div>

</div>

))}

</div>

<div className="flex gap-3">

<input
value={newMessage}
onChange={(e)=>
setNewMessage(
e.target.value
)}
placeholder="Type message..."
className="flex-1 bg-black border border-zinc-700 rounded-2xl p-4"
/>

<input
type="file"
onChange={(e)=>
setChatFile(
e.target.files?.[0]
)}
className="bg-black border border-zinc-700 rounded-2xl p-3"
/>

<button
onClick={async()=>{

if(!newMessage && !chatFile)return;

let fileUrl="";

if(chatFile){

const safeName=
`${Date.now()}-${chatFile.name}`;

const {
data:uploadData,
error:uploadError
}=
await supabase
.storage
.from("chat-files")
.upload(
safeName,
chatFile
);

console.log(
"UPLOAD:",
uploadData
);

console.log(
"UPLOAD ERROR:",
uploadError
);

if(uploadError){

alert(
JSON.stringify(
uploadError
)
);

return;

}

const {data:fileData}=
supabase
.storage
.from("chat-files")
.getPublicUrl(
safeName
);
fileUrl=
fileData.publicUrl;

}

const {data,error}=await supabase
.from("escrow_messages")
.insert({

order_id:
order?.id,

sender_email:
userEmail,

message:
newMessage || fileUrl,

seen:false

})
.select();

alert(
error
? JSON.stringify(error)
: "Message sent"
);

setNewMessage("");
setChatFile(null);

const {data:chatData} =
await supabase
.from("escrow_messages")
.select("*")
.eq(
"order_id",
order?.id
)
.order(
"created_at",
{ascending:true}
);

setMessages(
chatData || []
);

}}
className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 rounded-2xl"
>

Send

</button>
</div>

</div>
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