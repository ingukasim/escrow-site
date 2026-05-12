"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Globe, Zap } from "lucide-react";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_45%)]" />

      {/* FLOATING COINS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-24 left-10 animate-bounce duration-[6000ms] text-green-400 text-7xl opacity-20">
          ₮
        </div>

        <div className="absolute top-52 right-20 animate-pulse text-green-500 text-8xl opacity-10">
          ₮
        </div>

        <div className="absolute bottom-24 left-1/4 animate-bounce duration-[9000ms] text-green-400 text-6xl opacity-10">
          ₮
        </div>

        <div className="absolute bottom-40 right-1/3 animate-pulse text-green-500 text-7xl opacity