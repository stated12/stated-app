"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function PauseCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const commitmentId = params.id as string;

  const [commitment, setCommitment] = useState<any>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // LOAD COMMITMENT
  useEffect(() => {
    loadCommitment();
  }, []);

  async function loadCommitment() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("commitments")
      .select("*")
      .eq("id", commitmentId)
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      setError("Commitment not found");
      return;
    }

    if (data.status !== "active") {
      setError("Only active commitments can be paused");
      return;
    }

    setCommitment(data);
  }

  // PAUSE COMMITMENT
  async function handlePause() {

    setError("");

    if (!reason.trim()) {
      setError("Please provide a reason");
      return;
    }

    setLoading(true);

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Not authenticated");
      }

      // UPDATE STATUS
      const { error: updateError } = await supabase
        .from("commitments")
        .update({
          status: "paused",
          updated_at: new Date().toISOString(),
        })
        .eq("id", commitmentId)
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      // INSERT UPDATE ENTRY
      const { error: logError } = await supabase
        .from("commitment_updates")
        .insert({
          commitment_id: commitmentId,
          user_id: user.id,
          content: `Commitment paused: ${reason}`,
        });

      if (logError) throw logError;

      router.push("/dashboard");

    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }

  if (error && !commitment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!commitment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">

        <Link href="/dashboard">
          <div className="text-2xl font-bold text-blue-600 mb-4">
            Stated
          </div>
        </Link>

        <h1 className="text-xl font-semibold mb-2">
          Pause Commitment
        </h1>

        <div className="text-gray-600 mb-4">
          {commitment.text}
        </div>

        <textarea
          placeholder="Reason for pausing..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        {error && (
          <div className="text-red-500 text-sm mb-3">
            {error}
          </div>
        )}

        <button
          onClick={handlePause}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Pausing..." : "Pause Commitment"}
        </button>

      </div>

    </div>

  );

}
