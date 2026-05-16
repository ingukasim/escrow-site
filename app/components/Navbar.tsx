"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Navbar() {

  const router = useRouter();

  const handleLogout = async () => {

    await supabase.auth.signOut();

    router.push("/login");

  };

  return (
    <nav className="w-full border-b border-zinc-800 bg-black">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold text-yellow-400"
        >

          GK FOCUS

        </Link>

        {/* MENU */}
        <div className="flex items-center gap-6">

          <Link
            href="/dashboard"
            className="text-zinc-300 hover:text-yellow-400 transition-all"
          >

            Dashboard

          </Link>

          <Link
            href="/create-order"
            className="text-zinc-300 hover:text-yellow-400 transition-all"
          >

            Create Escrow

          </Link>

       {false && (
  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-400 text-white font-bold px-5 py-2 rounded-2xl transition-all"
  >
    Logout
  </button>
)}

        </div>

      </div>

    </nav>
  );
}