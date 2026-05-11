"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* TOP BAR */}
      <div className="border-b border-zinc-800 bg-zinc-950">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-yellow-400">
              Member Dashboard
            </h1>

            <p className="text-zinc-400 text-sm mt-1">
              Welcome back, verified trader.
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-2xl text-yellow-300 text-sm">
            Verified Member ✅
          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="text-zinc-400 text-sm">
              Active Escrow Deals
            </div>

            <div className="text-4xl font-bold text-yellow-400 mt-3">
              2
            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="text-zinc-400 text-sm">
              Completed Transactions
            </div>

            <div className="text-4xl font-bold text-yellow-400 mt-3">
              18
            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="text-zinc-400 text-sm">
              Total Trading Volume
            </div>

            <div className="text-4xl font-bold text-yellow-400 mt-3">
              24K
            </div>

          </div>

        </div>

        {/* ACTIVE DEALS */}
        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Active Escrow Deals
          </h2>

          <div className="space-y-6">

            {/* DEAL CARD */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

              <div className="flex flex-wrap gap-4 items-center justify-between">

                <div>

                  <div className="text-yellow-400 font-bold text-lg">
                    ESC-2026-1001
                  </div>

                  <div className="text-zinc-400 mt-2">
                    Buyer: @buyerusername
                  </div>

                  <div className="text-zinc-400">
                    Seller: @sellerusername
                  </div>

                </div>

                <div className="text-right">

                  <div className="text-3xl font-bold">
                    1,250 USDT
                  </div>

                  <div className="text-yellow-400 mt-2">
                    Pending Payment
                  </div>

                </div>

              </div>

            </div>

            {/* DEAL CARD */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

              <div className="flex flex-wrap gap-4 items-center justify-between">

                <div>

                  <div className="text-yellow-400 font-bold text-lg">
                    ESC-2026-1002
                  </div>

                  <div className="text-zinc-400 mt-2">
                    Buyer: @crypto_buyer
                  </div>

                  <div className="text-zinc-400">
                    Seller: @trusted_seller
                  </div>

                </div>

                <div className="text-right">

                  <div className="text-3xl font-bold">
                    3,500 USDT
                  </div>

                  <div className="text-green-400 mt-2">
                    Payment Confirmed
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* KYC STATUS */}
        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Verification Status
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <div className="grid md:grid-cols-2 gap-8">

              <div>

                <div className="text-zinc-400 text-sm">
                  Account Status
                </div>

                <div className="text-yellow-400 text-2xl font-bold mt-2">
                  Verified Member ✅
                </div>

              </div>

              <div>

                <div className="text-zinc-400 text-sm">
                  KYC Verification
                </div>

                <div className="text-green-400 text-2xl font-bold mt-2">
                  Approved
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}