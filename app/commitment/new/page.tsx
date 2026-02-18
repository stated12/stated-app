"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import { containsHarmfulContent } from "../../../lib/safety";

export default function NewCommitmentPage() {
  const router = useRouter();
  const supabase = createClient();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState("1 week");

  const [credits, setCredits] = useState<number | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load user credits safely
  useEffect(() => {
    async function loadCredits() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("account_id")
        .eq("id", user.id)
        .single();

      if (!profile?.account_id) {
        setError("Account not found");
        return;
      }

      setAccountId(profile.account_id);

      const { data: account } = await supabase
        .from("accounts")
        .select("credits")
        .eq("id", profile.account_id)
        .single();

      setCredits(account?.credits ?? 0);
    }

    loadCredits();
  }, []);

  async function createCommitment() {
    setError("");
    setSuccess("");

    if (!text.trim()) {
      setError("Commitment cannot be empty");
      return;
    }

    if (containsHarmfulContent(text)) {
      setError("Commitment contains unsafe language");
      return;
    }

    if (!accountId) {
      setError("Account error");
      return;
    }

    if (!credits || credits <= 0) {
      setError("No credits remaining. Please upgrade.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please login again");
        setLoading(false);
        return;
      }

      // Create commitment
      const { error: commitError } = await supabase
        .from("commitments")
        .insert({
          user_id: user.id,
          account_id: accountId,
          text,
          category,
          duration,
          status: "active",
        });

      if (commitError) {
        setError(commitError.message);
        setLoading(false);
        return;
      }

      // Deduct credit
      await supabase
        .from("accounts")
        .update({ credits: credits - 1 })
        .eq("id", accountId);

      setSuccess("Commitment created successfully");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (e) {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "600" }}>Stated</h1>

          <h2 style={{ fontSize: "18px", marginTop: "6px" }}>
            Create Commitment
          </h2>

          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Make it public. Stay accountable.
          </p>
        </div>

        {/* Credits */}
        <div
          style={{
            marginBottom: "14px",
            fontSize: "14px",
            color: "#475569",
          }}
        >
          Credits remaining:{" "}
          <strong>
            {credits === null ? "Loading..." : credits}
          </strong>
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: I will run 5km every day"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            marginBottom: "14px",
            fontSize: "16px",
            minHeight: "80px",
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
            border: "1px solid #e2e8f0",
            marginBottom: "14px",
            fontSize: "16px",
          }}
        >
          <option>General</option>
          <option>Fitness</option>
          <option>Health</option>
          <option>Career</option>
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
            border: "1px solid #e2e8f0",
            marginBottom: "18px",
            fontSize: "16px",
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
              marginBottom: "12px",
              color: "#dc2626",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div
            style={{
              marginBottom: "12px",
              color: "#16a34a",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        {/* Button */}
        <button
          onClick={createCommitment}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "#94a3b8" : "#2563eb",
            color: "white",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Commitment"}
        </button>

        {/* Footer */}
        <div
          style={{
            marginTop: "14px",
            fontSize: "12px",
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          Public commitments build accountability.
        </div>
      </div>
    </div>
  );
        }
