"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewCommitmentPage() {
  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState("1 week");

  const [credits, setCredits] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCredits();
  }, []);

  async function loadCredits() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("account_id")
      .eq("id", user.id)
      .single();

    if (!profile) return;

    const { data: account } = await supabase
      .from("accounts")
      .select("credits")
      .eq("id", profile.account_id)
      .single();

    if (account) setCredits(account.credits);
  }

  async function createCommitment() {
    setError("");

    if (!text.trim()) {
      setError("Please enter a commitment");
      return;
    }

    if (credits !== null && credits <= 0) {
      setError("No credits remaining");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login again");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("account_id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      setError("Profile not found");
      setLoading(false);
      return;
    }

    const accountId = profile.account_id;

    const { error: insertError } = await supabase
      .from("commitments")
      .insert({
        account_id: accountId,
        user_id: user.id,
        text: text.trim(),
        category,
        duration,
        status: "active",
      });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    if (credits !== null) {
      await supabase
        .from("accounts")
        .update({
          credits: credits - 1,
        })
        .eq("id", accountId);
    }

    router.push("/dashboard");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "white",
          borderRadius: "14px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          padding: "20px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "18px" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "4px",
            }}
          >
            Stated
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Create Commitment
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            Make it public. Stay accountable.
          </div>
        </div>

        {/* Commitment */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I will run 5km daily"
          rows={4}
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            marginBottom: "14px",
          }}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            marginBottom: "14px",
          }}
        >
          <option>General</option>
          <option>Fitness</option>
          <option>Health</option>
          <option>Learning</option>
          <option>Business</option>
          <option>Personal</option>
        </select>

        {/* Duration */}
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            marginBottom: "18px",
          }}
        >
          <option>1 week</option>
          <option>2 weeks</option>
          <option>3 weeks</option>
          <option>1 month</option>
          <option>3 months</option>
          <option>6 months</option>
          <option>1 year</option>
        </select>

        {/* Error */}
        {error && (
          <div
            style={{
              color: "#dc2626",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Button */}
        <button
          onClick={createCommitment}
          disabled={loading}
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "10px",
            border: "none",
            background: loading ? "#94a3b8" : "#2563eb",
            color: "white",
            fontWeight: "600",
          }}
        >
          {loading ? "Creating..." : "Create Commitment"}
        </button>

        {/* Credits */}
        {credits !== null && (
          <div
            style={{
              marginTop: "14px",
              fontSize: "14px",
              color: "#475569",
              textAlign: "center",
            }}
          >
            Credits remaining: {credits}
          </div>
        )}
      </div>
    </div>
  );
}
