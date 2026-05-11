"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function AdminKYCPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [users, setUsers] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    const init = async () => {

      try {

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        if (
          user.email !==
          "escrowusdt.info@gmail.com"
        ) {
          router.push("/dashboard");
          return;
        }

        const { data } =
          await supabase
            .from("profiles")
            .select("*");

        if (data) {
          setUsers(data);
        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    init();

  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-4xl font-bold mb-10 text-yellow-400">
          Admin KYC Panel
        </h1>

        {message && (
          <div className="mb-6 bg-zinc-800 p-4 rounded-2xl">
            {message}
          </div>
        )}

        {loading ? (

          <div>
            Loading users...
          </div>

        ) : users.length === 0 ? (

          <div>
            No users found.
          </div>

        ) : (

          <div className="space-y-6">

            {users.map((user) => (

              <div
                key={user.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >

                <div className="mb-4">
                  <div className="font-bold text-xl">
                    {user.email}
                  </div>

                  <div className="text-zinc-400 text-sm">
                    {user.id}
                  </div>
                </div>

                <div className="flex gap-4">

                  <button
                    onClick={async () => {

                      await supabase
                        .from("profiles")
                        .update({
                          kyc_verified: true,
                        })
                        .eq("id", user.id);

                      setMessage(
                        "KYC Approved"
                      );

                    }}
                    className="bg-green-500 px-5 py-2 rounded-xl font-bold"
                  >
                    Approve
                  </button>

                  <button
                    onClick={async () => {

                      await supabase
                        .from("profiles")
                        .update({
                          kyc_verified: false,
                        })
                        .eq("id", user.id);

                      setMessage(
                        "KYC Rejected"
                      );

                    }}
                    className="bg-red-500 px-5 py-2 rounded-xl font-bold"
                  >
                    Reject
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}