"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function KYCPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
    } else {
      setUserId(user.id);
    }

    setLoading(false);
  };

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setUploading(true);
      setMessage("");

      const file = event.target.files?.[0];

      if (!file) {
        setMessage("Please select a file.");
        setUploading(false);
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("kyc-documents")
        .upload(fileName, file);

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("KYC document uploaded successfully!");
      }

    } catch (error) {
      setMessage("Upload failed.");
    }

    setUploading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-yellow-400 text-2xl font-bold">
          Loading KYC Page...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

          <div className="text-center mb-10">

            <h1 className="text-4xl font-bold text-yellow-400">
              KYC Verification
            </h1>

            <p className="text-zinc-400 mt-4">
              Upload your identity document for manual verification approval.
            </p>

          </div>

          <div className="space-y-6">

            {/* REQUIREMENTS */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">

              <div className="text-yellow-300 font-bold mb-3">
                Required Documents
              </div>

              <div className="space-y-2 text-sm text-zinc-300">
                <div>✔ Government ID / Passport</div>
                <div>✔ Clear visible photo</div>
                <div>✔ Selfie verification recommended</div>
                <div>✔ PNG / JPG / PDF supported</div>
              </div>

            </div>

            {/* FILE INPUT */}
            <div>

              <label className="text-sm text-zinc-400">
                Upload KYC Document
              </label>

              <input
                type="file"
                onChange={handleUpload}
                className="w-full mt-3 bg-black border border-zinc-700 rounded-2xl p-4 file:bg-yellow-400 file:border-0 file:px-4 file:py-2 file:rounded-xl file:text-black file:font-bold"
              />

            </div>

            {/* MESSAGE */}
            {message && (
              <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-sm text-center">
                {message}
              </div>
            )}

            {/* STATUS */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5">

              <div className="flex items-center justify-between">

                <span className="text-zinc-400">
                  Verification Status
                </span>

                <span className="text-yellow-400 font-bold">
                  Pending Review
                </span>

              </div>

            </div>

            {/* BUTTON */}
            <button
              disabled={uploading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-2xl transition-all disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "KYC Upload Ready"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}