export default function PremiumEscrow() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white font-sans">

      {/* HERO */}
      <section className="text-center px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
            Secure USDT Escrow Service
          </h1>

          <p className="mt-6 text-gray-300 text-lg">
            Trusted manual escrow for USDT TRC20 trading between buyers and sellers worldwide.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://t.me/yourtelegram"
              className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Start Escrow on Telegram
            </a>

            <a
              href="#how"
              className="border border-yellow-400 px-8 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 px-6">
        <div className="bg-zinc-900 p-6 rounded-2xl text-center">
          <h3 className="text-yellow-400 font-bold">Manual Control</h3>
          <p className="text-sm text-gray-400 mt-2">Every transaction verified by escrow agent</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl text-center">
          <h3 className="text-yellow-400 font-bold">Secure Process</h3>
          <p className="text-sm text-gray-400 mt-2">Funds released only after confirmation</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl text-center">
          <h3 className="text-yellow-400 font-bold">Global Support</h3>
          <p className="text-sm text-gray-400 mt-2">USDT TRC20 supported worldwide</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">
          Escrow Process
        </h2>

        <div className="space-y-4">
          <div className="bg-zinc-900 p-5 rounded-xl">1. Buyer & seller agree on trade</div>
          <div className="bg-zinc-900 p-5 rounded-xl">2. Seller deposits USDT (TRC20) to escrow wallet</div>
          <div className="bg-zinc-900 p-5 rounded-xl">3. Buyer pays seller via bank / CDM transfer</div>
          <div className="bg-zinc-900 p-5 rounded-xl">4. Seller confirms payment received</div>
          <div className="bg-zinc-900 p-5 rounded-xl">5. Escrow releases USDT to buyer wallet</div>
        </div>
      </section>

      {/* WHY TRUST */}
      <section className="max-w-4xl mx-auto px-6 py-10 text-center">
        <h2 className="text-2xl font-bold text-yellow-400">Why Choose Us</h2>
        <p className="text-gray-300 mt-4">
          • Manual escrow agent (no auto bots)
          • Human verification for safety
          • KYC required for large transactions
          • Transparent process with escrow tracking
        </p>
      </section>

      {/* CTA */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold">Start Secure Trading Now</h2>
        <p className="text-gray-400 mt-2">Contact escrow agent via Telegram</p>

        <a
          href="https://t.me/yourtelegram"
          className="inline-block mt-6 bg-yellow-400 text-black px-10 py-3 rounded-xl font-bold hover:scale-105 transition"
        >
          Open Escrow
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-10 text-sm">
        © 2026 Secure USDT Escrow Service • Manual OTC Trading • TRC20 Supported
      </footer>

    </div>
  );
}
