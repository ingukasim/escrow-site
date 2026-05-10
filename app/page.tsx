export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="text-center px-6 py-20">
        <h1 className="text-5xl font-bold text-yellow-400">
          Trusted USDT Escrow Service
        </h1>

        <p className="mt-4 text-gray-300 text-lg">
          Secure manual OTC escrow for global USDT TRC20 trading.
        </p>

        <a
          href="https://t.me/yourtelegram"
          className="inline-block mt-8 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
        >
          Start Escrow
        </a>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
          How It Works
        </h2>

        <div className="space-y-4">
          <div className="bg-zinc-900 p-4 rounded-xl">
            1. Seller sends USDT TRC20 to escrow wallet
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl">
            2. Buyer pays seller directly via bank/CDM
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl">
            3. Seller confirms payment received
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl">
            4. Escrow releases USDT to buyer wallet
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-4xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-4">

        <div className="bg-zinc-900 p-5 rounded-xl text-center">
          <h3 className="text-yellow-400 font-bold">
            Manual Verification
          </h3>

          <p className="text-sm text-gray-400 mt-2">
            Every trade manually checked
          </p>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl text-center">
          <h3 className="text-yellow-400 font-bold">
            KYC Protected
          </h3>

          <p className="text-sm text-gray-400 mt-2">
            Large trades require verification
          </p>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl text-center">
          <h3 className="text-yellow-400 font-bold">
            Secure Release
          </h3>

          <p className="text-sm text-gray-400 mt-2">
            USDT released after confirmation
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-10 text-sm">
        Manual OTC Escrow • USDT TRC20 Supported
      </footer>

    </div>
  );
}