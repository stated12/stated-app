"use client";

import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function CompleteCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const commitmentId = params.id as string;

  const [loading, setLoading] = useState(false);

  async function markComplete() {

    setLoading(true);

    const { error } =
      await supabase
        .from("commitments")
        .update({
          status: "completed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", commitmentId);

    if (!error) {
      router.push("/dashboard");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">

        <h1 className="text-xl font-semibold mb-4">
          Mark as completed?
        </h1>

        <button
          onClick={markComplete}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          {loading ? "Updating..." : "Confirm Complete"}
        </button>

      </div>

    </div>
  );

}
