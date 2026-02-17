"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [duration, setDuration] = useState("1 week");
  const [loading, setLoading] = useState(false);

  async function createCommitment() {

    if (!text.trim()) {
      alert("Enter commitment");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("commitments")
      .insert({
        user_id: user?.id,
        text: text.trim(),
        duration,
        status: "active",
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="max-w-xl mx-auto p-4">

      <h1 className="text-xl mb-4">
        Create commitment
      </h1>

      <input
        className="border rounded-lg p-3 w-full mb-4"
        placeholder="I will run 5 kms everyday"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="border rounded-lg p-3 w-full mb-4"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      >
        <option>1 week</option>
        <option>2 weeks</option>
        <option>3 weeks</option>
        <option>1 month</option>
        <option>3 months</option>
        <option>6 months</option>
        <option>1 year</option>
      </select>

      <button
        onClick={createCommitment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-full"
      >
        {loading ? "Creating..." : "Create commitment"}
      </button>

    </div>
  );
}
