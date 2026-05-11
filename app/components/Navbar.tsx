"use client";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-black sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-2xl font-bold text-yellow-400">
          EscrowOTC
        </div>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

          <a
            href="/"
            className="text-zinc-300 hover:text-yellow-400 transition-all"
          >
            Home
          </a>

          <a
            href="/dashboard"
            className="text-zinc-300 hover:text-yellow-400 transition-all"
          >
            Dashboard
          </a>

          <a
            href="/login"
            className="text-zinc-300 hover:text-yellow-400 transition-all"
          >
            Login
          </a>

          <a
            href="/register"
            className="text-zinc-300 hover:text-yellow-400 transition-all"
          >
            Register
          </a>

          <a
            href="https://t.me/TeathorUSTD"
            target="_blank"
            className="text-zinc-300 hover:text-yellow-400 transition-all"
          >
            Telegram
          </a>

        </div>

        {/* BUTTON */}
        <a
          href="/"
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-2xl transition-all"
        >
          Open Escrow
        </a>

      </div>

    </nav>
  );
}