"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function CompleteCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const commitmentId = params.id as string;

  const [commitment, setCommitment] = useState<any>(null);
  const [note, setNote] = useState("");
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

    if (data.status !== "active" && data.status !== "paused") {
      setError("This commitment cannot be completed");
      return;
    }

    setCommitment(data);
  }

  // COMPLETE COMMITMENT
  async function handleComplete() {

    setError("");
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
          status: "completed",
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", commitmentId)
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      // SAVE UPDATE ENTRY
      const completionText =
        note.trim()
          ? `Commitment completed: ${note}`
          : "Commitment completed";

      const { error: logError } = await supabase
        .from("commitment_updates")
        .insert({
          commitment_id: commitmentId,
          user_id: user.id,
          content: completionText,
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
          Complete Commitment
        </h1>

        <div className="text-gray-600 mb-4">
          {commitment.text}
        </div>

        <textarea
          placeholder="Optional completion note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        {error && (
          <div className="text-red-500 text-sm mb-3">
            {error}
          </div>
        )}

        <button
          onClick={handleComplete}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Completing..." : "Mark as Completed"}
        </button>

      </div>

    </div>

  );

}
