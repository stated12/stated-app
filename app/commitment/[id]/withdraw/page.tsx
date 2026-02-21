"use client";

import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function WithdrawCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const commitmentId = params.id as string;

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  async function withdrawCommitment() {

    setLoading(true);

    await supabase
      .from("commitments")
      .update({
        status: "withdrawn",
        withdraw_reason: reason,
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
          Withdraw commitment
        </h1>

        <textarea
          placeholder="Reason"
          value={reason}
          onChange={(e)=>setReason(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <button
          onClick={withdrawCommitment}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-lg"
        >
          Withdraw
        </button>

      </div>

    </div>
  );

}
