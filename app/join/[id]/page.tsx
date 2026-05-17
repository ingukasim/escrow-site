"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function JoinEscrow(){

const router=useRouter();

const params=useParams();

const id=params.id;

useEffect(()=>{

checkUser();

},[]);

async function checkUser(){

const {
data:{user}

}=await supabase.auth.getUser();

if(!user){

router.push(
`/login?redirect=/join/${id}`
);

return;

}

await supabase
.from("orders")
.update({

status:
"Participant Joined"

})
.eq(
"id",
id
);

router.push(
`/order/${id}`
);

}

return(

<div className="min-h-screen bg-black text-white flex items-center justify-center">

<div className="text-center">

<div className="text-5xl mb-6">

🔐

</div>

<div className="text-2xl font-bold">

Joining Escrow...

</div>

<div className="text-zinc-400 mt-3">

Please wait...

</div>

</div>

</div>

)

}