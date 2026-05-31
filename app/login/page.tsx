"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);

  async function handleLogin(
    e:any
  ){

    e.preventDefault();

    setLoading(true);

    const {error}=
    await supabase.auth.signInWithPassword({

      email,
      password

    });

    setLoading(false);

    if(error){

      alert(error.message);
      return;

    }

const pendingJoinOrder =
sessionStorage.getItem(
"pendingJoinOrder"
);

if(pendingJoinOrder){

sessionStorage.removeItem(
"pendingJoinOrder"
);

router.push(
`/join/${pendingJoinOrder}`
);

}else{

router.push(
"/dashboard"
);

}

  }

  return (

<main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">


<div className="absolute inset-0 opacity-10 overflow-hidden">

<div className="absolute top-10 left-10 text-[220px] text-green-500 animate-pulse">

USD₮ 

</div>

<div className="absolute bottom-10 right-10 text-[120px] text-green-400 animate-bounce">

ESCROW

</div>

</div>


<div className="relative z-10 w-full max-w-md bg-white/5 border border-green-500/20 backdrop-blur-2xl rounded-[35px] p-8 shadow-2xl">


<div className="flex flex-col items-center mb-8">

<h1 className="text-4xl font-black text-green-400">

GK FOCUS

</h1>

<p className="text-gray-400 mt-2">

Secure USDT Escrow

</p>

</div>


<div className="mb-8 text-center">

<h2 className="text-3xl font-black mb-2">

Welcome Back

</h2>

<p className="text-gray-400">

Login to access your dashboard

</p>

</div>


<form
onSubmit={handleLogin}
className="space-y-6"
>

<div>

<label className="block text-gray-300 mb-2">

Email Address

</label>

<input
type="email"
value={email}
onChange={(e)=>
setEmail(
e.target.value
)
}
placeholder="Enter your email"
className="w-full bg-black border border-green-500/20 rounded-2xl px-5 py-4 outline-none focus:border-green-400"
/>

</div>


<div>

<label className="block text-gray-300 mb-2">

Password

</label>

<input
type="password"
value={password}
onChange={(e)=>
setPassword(
e.target.value
)
}
placeholder="Enter your password"
className="w-full bg-black border border-green-500/20 rounded-2xl px-5 py-4 outline-none focus:border-green-400"
/>

</div>


<button
type="submit"
disabled={loading}
className="w-full bg-green-500 hover:bg-green-400 transition py-4 rounded-2xl text-black font-black text-lg"
>

{loading
? "Signing in..."
: "Login Securely"}

</button>

</form>


<div className="text-center mt-8 text-gray-400">

Don't have an account?{" "}

<Link
href="/register"
className="text-green-400 font-bold"
>

Register Now

</Link>

</div>

</div>

</main>

  );

}