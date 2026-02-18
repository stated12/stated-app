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

    if (account) {
      setCredits(account.credits);
    }
  }

  async function createCommitment() {
    setError("");

    if (!text.trim()) {
      setError("Please enter a commitment");
      return;
    }

    if (credits !== null && credits <= 0) {
      setError("No credits remaining. Please upgrade.");
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

    // decrease credit
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "white",
          padding: "28px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            marginBottom: "6px",
          }}
        >
          Stated
        </div>

        <div
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "4px",
          }}
        >
          Create Commitment
        </div>

        <div
          style={{
            color: "#666",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          Make it public. Stay accountable.
        </div>

        {/* Text input */}
        <textarea
          placeholder="I will run 5km daily"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "14px",
            fontSize: "15px",
          }}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
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
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
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
              color: "red",
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
            padding: "14px",
            background: loading ? "#999" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
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
              color: credits <= 2 ? "#b91c1c" : "#555",
            }}
          >
            Credits remaining: {credits}
          </div>
        )}
      </div>
    </div>
  );
}
