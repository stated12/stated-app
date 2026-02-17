"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("30");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + parseInt(duration));

    await supabase.from("commitments").insert({
      title,
      user_id: user.id,
      status: "active",
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    });

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      <div className="max-w-md mx-auto">

        <h1 className="text-xl font-semibold mb-6 text-center">
          Create commitment
        </h1>

        <input
          type="text"
          placeholder="I will..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6"
        >

          <option value="7">1 week</option>
          <option value="14">2 weeks</option>
          <option value="30">1 month</option>
          <option value="90">3 months</option>
          <option value="180">6 months</option>
          <option value="365">1 year</option>

        </select>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium"
        >
          {loading ? "Creating..." : "Create commitment"}
        </button>

      </div>

    </div>
  );
}
