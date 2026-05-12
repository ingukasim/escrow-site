"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Globe,
  Zap,
} from "lucide-react";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%)]" />

      {/* FLOATING USDT SYMBOLS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-24 left-10 text-green-500/20 text-8xl animate-bounce">
          ₮
        </div>

        <div className="absolute top-52 right-20 text-green-400/10 text-9xl animate-pulse">
          ₮
        </div>

        <div className="absolute bottom-32 left-1/4 text-green-500/10 text-7xl animate-bounce">
          ₮
        </div>

        <div className="absolute bottom-20 right-1/3 text-green-400/10 text-8xl animate-pulse">
          ₮
        </div>

      </div>

      {/* NAVBAR */}
      <header className="relative z-10 border-b border-zinc-800 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="text-3xl font-bold text-green-400">

            USDT ESCROW

          </div>

          <div className="flex items-center gap-4">

            <Link
              href="/login"
              className="text-zinc-300 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-2xl transition"
            >
              Register
            </Link>

          </div>

        </div>

      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-2 rounded-full mb-8">

              <ShieldCheck size={18} />

              Secure OTC Escrow Platform

            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-tight mb-8">

              Buy & Sell
              <span className="text-green-400">
                {" "}USDT
              </span>
              <br />
              Safely With Escrow

            </h1>

            <p className="text-zinc-400 text-xl leading-9 mb-10 max-w-2xl">

              Professional crypto escrow platform with realtime transaction tracking,
              admin verification, secure proof uploads, and protected OTC trading.

            </p>

            <div className="flex flex-wrap gap-5">

              <Link
                href="/register"
                className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-5 rounded-2xl text-lg transition"
              >
                Create Escrow
              </Link>

              <Link
                href="/login"
                className="border border-zinc-700 hover:border-green-500 text-white px-8 py-5 rounded-2xl text-lg transition"
              >
                Login
              </Link>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 shadow-2xl shadow-green-500/10">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <div className="text-zinc-400 mb-2">
                    Escrow Protected
                  </div>

                  <div className="text-5xl font-black text-green-400">

                    100 USDT

                  </div>

                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-5">

                  <ShieldCheck
                    size={50}
                    className="text-green-400"
                  />

                </div>

              </div>

              <div className="space-y-5">

                <div className="bg-black border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">

                  <div>

                    <div className="text-zinc-500 text-sm">
                      Seller Deposit
                    </div>

                    <div className="text-2xl font-bold">
                      102 USDT
                    </div>

                  </div>

                  <div className="text-green-400 font-bold">
                    +2%
                  </div>

                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">

                  <div>

                    <div className="text-zinc-500 text-sm">
                      Buyer Receives
                    </div>

                    <div className="text-2xl font-bold">
                      98 USDT
                    </div>

                  </div>

                  <div className="text-red-400 font-bold">
                    -2%
                  </div>

                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 text-center">

                  <div className="text-green-400 font-bold text-xl">

                    🔒 Escrow Secured

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-20">

          <div className="text-green-400 font-bold mb-4">

            WHY CHOOSE US

          </div>

          <h2 className="text-5xl font-black">

            Secure & Trusted Escrow

          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <Lock
              className="text-green-400 mb-6"
              size={40}
            />

            <h3 className="text-2xl font-bold mb-4">

              Secure Custody

            </h3>

            <p className="text-zinc-400 leading-8">

              Escrow funds protected until both parties complete transaction safely.

            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <Zap
              className="text-green-400 mb-6"
              size={40}
            />

            <h3 className="text-2xl font-bold mb-4">

              Fast Processing

            </h3>

            <p className="text-zinc-400 leading-8">

              Realtime escrow updates and rapid transaction management.

            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <Globe
              className="text-green-400 mb-6"
              size={40}
            />

            <h3 className="text-2xl font-bold mb-4">

              Global Trading

            </h3>

            <p className="text-zinc-400 leading-8">

              Trade securely with worldwide crypto buyers and sellers.

            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <ShieldCheck
              className="text-green-400 mb-6"
              size={40}
            />

            <h3 className="text-2xl font-bold mb-4">

              Verified Escrow

            </h3>

            <p className="text-zinc-400 leading-8">

              Admin-controlled escrow verification for safer OTC trading.

            </p>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-20">

          <div className="text-green-400 font-bold mb-4">

            HOW IT WORKS

          </div>

          <h2 className="text-5xl font-black">

            Simple Escrow Process

          </h2>

        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            "Create Escrow",
            "Invite Counterparty",
            "Upload Payment Proof",
            "Admin Releases Escrow",
          ].map((step, index) => (

            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center"
            >

              <div className="bg-green-500 text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">

                {index + 1}

              </div>

              <div className="text-2xl font-bold">

                {step}

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-zinc-800 py-10 mt-20">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-zinc-500">

            © 2026 USDT Escrow Platform. All rights reserved.

          </div>

          <div className="flex items-center gap-6 text-zinc-400">

            <Link href="/login">
              Login
            </Link>

            <Link href="/register">
              Register
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}