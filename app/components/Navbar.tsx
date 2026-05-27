"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  const authPages =
    pathname === "/login" ||
    pathname === "/register";

  return (

    <nav className="w-full border-b border-zinc-800 bg-black/90 backdrop-blur-xl sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        {/* LEFT LOGO */}

  <Link
href="/"
className="flex items-center justify-center md:justify-start gap-4"
>


<img
src="/images/logo-new.png"
alt="GK Logo"
className="w-14 h-14 object-contain"
/>

<div>

<div className="text-2xl font-black text-green-400">

GK FOCUS

</div>

<div className="text-xs text-zinc-500">

Secure USDT Escrow

</div>

</div>

</Link>


        {/* RIGHT MENU */}

        {authPages ? (

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 mt-2 md:mt-0">

            <Link
              href="/"
              className="text-zinc-300 hover:text-green-400 transition"
            >
              Home
            </Link>

            <Link
              href="/login"
              className="text-zinc-300 hover:text-green-400 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
             className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-2xl min-w-[120px] text-center"
            >
              Register
            </Link>

          </div>

        ) : (

          <div className="flex items-center gap-5">

            <Link
              href="/"
              className="text-zinc-300 hover:text-green-400 transition px-2 py-2"
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              className="text-zinc-300 hover:text-green-400 transition"
            >
              Dashboard
            </Link>
<Link
href="/about"
className="text-zinc-300 hover:text-green-400 transition"
>
About
</Link>
<Link
href="/contact"
className="text-zinc-300 hover:text-green-400 transition"
>
Contact
</Link>
            <Link
              href="/create-order"
              className="text-zinc-300 hover:text-green-400 transition"
            >
              Create Escrow
            </Link>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.href="/login";
              }}
              className="bg-red-500 hover:bg-red-400 text-white font-bold px-5 py-2 rounded-2xl"
            >

              Logout

            </button>

          </div>

        )}

      </div>

    </nav>

  );

}