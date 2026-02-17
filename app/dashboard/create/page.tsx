"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {
  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createCommitment() {
    setError("");

    if (!text.trim()) {
      setError("Please enter a commitment.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not logged in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("commitments").insert({
      user_id: user.id,
      text: text.trim(),
      status: "active",
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Commitment</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your commitment"
        style={{ width: "100%", height: "100px" }}
      />

      <br />
      <br />

      <button onClick={createCommitment} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </div>
  );
}
