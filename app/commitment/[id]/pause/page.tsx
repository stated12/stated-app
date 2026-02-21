"use client";

import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function PauseCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const commitmentId = params.id as string;

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  async function pauseCommitment() {

    setLoading(true);

    await supabase
      .from("commitments")
      .update({
        status: "paused",
        pause_reason: reason,
        updated_at: new Date().toISOString(),
      })
      .eq("id", commitmentId);

    router.push("/dashboard");
    router.refresh();

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">

        <h1 className="text-xl font-semibold mb-4">
          Pause commitment
        </h1>

        <textarea
          placeholder="Reason (optional)"
          value={reason}
          onChange={(e)=>setReason(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <button
          onClick={pauseCommitment}
          disabled={loading}
          className="w-full bg-yellow-600 text-white py-2 rounded-lg"
        >
          Pause
        </button>

      </div>

    </div>
  );

}
