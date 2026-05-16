"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-800 bg-black/90 backdrop-blur-xl sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT LOGO */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >

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

        <div className="flex items-center gap-5">

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
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-2 rounded-2xl transition"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}