"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function JoinEscrow(){

const router=useRouter();

const params=useParams();

useEffect(()=>{

joinEscrow();

},[]);

async function joinEscrow(){

const id=params.id;

const {
  data:{user}
} = await supabase.auth.getUser();

if(!user){

localStorage.setItem(
  "pendingJoinOrder",
  String(id)
);

alert(
  "Saved Join Order: " + String(id)
);

router.push(
`/login?join=${id}`
);
return;
}

const {data}=await supabase
.from("orders")
.select("*")
.eq(
"id",
id
)
.single();

if(!data){

alert(
"Escrow not found"
);

router.push(
"/dashboard"
);

return;

}

const { error } = await supabase
.from("orders")
.update({

participant_id: user.id

})
.eq(
"id",
id
);

console.log(
"JOIN ERROR:",
error
);

router.push(
`/order/${id}`
);

}

return(

<div className="min-h-screen bg-black text-white flex items-center justify-center">

<div>

<div className="text-4xl mb-5">

🔐

</div>

<div className="text-xl">

Joining Escrow...

</div>

</div>

</div>

)

}