"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {

  const [userEmail,setUserEmail]=useState("");
  const [loading,setLoading]=useState(true);

  const [stats,setStats]=useState({
    total:0,
    active:0,
    completed:0
  });

  useEffect(()=>{

    loadDashboard();

  },[]);

  async function loadDashboard(){

    try{

      const session=
      await supabase.auth.getSession();

      const user=
      session.data.session?.user;

      if(user){

      if(user){

  setUserEmail(

    user.user_metadata?.email ||
    user.email ||
    user.user_metadata?.full_name ||
    "User"

  );

  console.log(user);

  const {data}=await supabase
        .from("orders")
        .select("*")
        .eq(
          "seller_id",
          user.id
        );

        if(data){

          setStats({

            total:data.length,

            active:data.filter(
              x=>x.status==="Pending"
            ).length,

            completed:data.filter(
              x=>x.status==="Completed"
            ).length

          });

        }

      }

    }catch(err){

      console.log(err);

    }

    setLoading(false);

  }

  if(loading){

    return(
      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Loading Dashboard...

      </div>
    )

  }

  return(

<div className="min-h-screen bg-black text-white">

<Navbar/>

<div className="max-w-7xl mx-auto px-6 py-20">

<div className="mb-14">

<div className="text-yellow-400 text-lg mb-4">

Premium Escrow Dashboard

</div>

<h1 className="text-6xl font-bold mb-5">

Welcome Back

</h1>

<div className="text-zinc-400 text-xl">

Logged in as:

<span className="text-green-400 ml-2">

{userEmail}

</span>

</div>

</div>

<Link
href="/create-order"
className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-10 py-5 rounded-3xl mb-14"
>

+ Create New Escrow

</Link>


<div className="grid md:grid-cols-3 gap-8">

<div className="bg-zinc-900 rounded-3xl p-10">

<div className="text-zinc-400 text-2xl mb-6">

Total Orders

</div>

<div className="text-yellow-400 text-6xl font-bold">

{stats.total}

</div>

</div>


<div className="bg-zinc-900 rounded-3xl p-10">

<div className="text-zinc-400 text-2xl mb-6">

Active Orders

</div>

<div className="text-yellow-400 text-6xl font-bold">

{stats.active}

</div>

</div>


<div className="bg-zinc-900 rounded-3xl p-10">

<div className="text-zinc-400 text-2xl mb-6">

Completed Orders

</div>

<div className="text-yellow-400 text-6xl font-bold">

{stats.completed}

</div>

</div>

</div>

</div>

</div>

)

}