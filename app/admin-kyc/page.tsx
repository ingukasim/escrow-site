"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function AdminKYCPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<any[]>([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.email !== "escrowusdt.info@gmail.com") {
      router.push("/dashboard");
      return;
    }

    loadUsers();
  };

  const loadUsers = async () => {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUsers(data);
    }

    setLoading(false);
  };

  const approveKYC = async (id: string) => {

    const { error } = await supabase
      .from("profiles")
      .update({
        kyc_verified: true,
      })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("KYC approved successfully!");
      loadUsers();
    }
  };

  const rejectKYC = async (id: string) => {

    const { error } = await supabase
      .from("profiles")
      .update({
        kyc_verified: false,
      })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("KYC rejected successfully!");
      loadUsers();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-10 mb-10">

          <div className="flex flex-wrap items-center justify-between gap-6">

            <div>

              <div className="text-yellow-400 text-sm mb-3">
                Escrow Administration
              </div>

              <h1 className="text-5xl font-bold mb-4">
                KYC Verification Panel
              </h1>

              <div className="text-zinc-400">
                Manage customer verification and trusted escrow users.
              </div>

            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 px-6 py-4 rounded-2xl text-yellow-300 font-bold text-lg">
              Admin Access
            </div>

          </div>

        </div>

        {/* MESSAGE */}
        {message && (

          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 text-center mb-8">
            {message}
          </div>

        )}

        {/* USERS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

          <div className="p-8 border-b border-zinc-800">

            <h2 className="text-3xl font-bold text-yellow-400">
              Registered Users
            </h2>

          </div>

          {loading ? (

            <div className="p-12 text-center text-zinc-400">
              Loading users...
            </div>

          ) : users.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-5xl mb-5">
                📭
              </div>

              <div className="text-zinc-400 text-lg">
                No users found.
              </div>

            </div>

          ) : (

            <div className="divide-y divide-zinc-800">

              {users.map((profile) => (

                <div
                  key={profile.id}
                  className="p-8 hover:bg-zinc-800/50 transition-all"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    {/* LEFT */}
                    <div className="space-y-3">

                      <div className="text-2xl font-bold">
                        {profile.email || "No Email"}
                      </div>

                      <div className="text-zinc-400">
                        User ID: {profile.id}
                      </div>

                      <div>

                        {profile.kyc_verified ? (

                          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-2xl font-bold">

                            <span>✅</span>

                            <span>KYC Verified</span>

                          </div>

                        ) : (

                          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-4 py-2 rounded-2xl font-bold">

                            <span>⏳</span>

                            <span>Pending Verification</span>

                          </div>

                        )}

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-wrap gap-4">

                      <button
                        onClick={() =>
                          approveKYC(profile.id)
                        }
                        className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-2xl transition-all"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          rejectKYC(profile.id)
                        }
                        className="bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-2xl transition-all"
                      >
                        Reject
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}