"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewCommitmentPage() {
  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState("1 week");

  const [accountId, setAccountId] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAccount();
  }, []);

  async function loadAccount() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: account } = await supabase
      .from("accounts")
      .select("id, credits")
      .eq("id", user.id)
      .single();

    if (!account) {
      setError("Account not found");
      return;
    }

    setAccountId(account.id);
    setCredits(account.credits);
  }

  async function createCommitment() {
    setError("");

    if (!accountId) {
      setError("Account not ready");
      return;
    }

    if (!text.trim()) {
      setError("Enter your commitment");
      return;
    }

    if (credits === null || credits <= 0) {
      setError("No credits remaining");
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase
      .from("commitments")
      .insert({
        account_id: accountId,
        text,
        category,
        duration,
        status: "active",
      });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    await supabase
      .from("accounts")
      .update({
        credits: credits - 1,
      })
      .eq("id", accountId);

    router.push("/dashboard");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <Link href="/dashboard">
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#2563eb",
              marginBottom: "10px",
            }}
          >
            Stated
          </div>
        </Link>

        <div style={{ marginBottom: "10px", color: "#555" }}>
          Credits remaining:{" "}
          {credits === null ? "Loading..." : credits}
        </div>

        <textarea
          placeholder="Example: I will run 5km every day"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <option>General</option>
          <option>Fitness</option>
          <option>Career</option>
          <option>Learning</option>
          <option>Health</option>
          <option>Business</option>
        </select>

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
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

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </div>
        )}

        <button
          onClick={createCommitment}
          disabled={loading || credits === 0}
          style={{
            width: "100%",
            padding: "14px",
            background: credits === 0 ? "#aaa" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          {loading ? "Creating..." : "Create Commitment"}
        </button>
      </div>
    </div>
  );
}
