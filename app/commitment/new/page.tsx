"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { containsHarmfulContent } from "../../../lib/safety";
import { useRouter } from "next/navigation";

export default function NewCommitmentPage() {
  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState("1 week");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createCommitment() {
    setError("");

    if (!text.trim()) {
      setError("Commitment cannot be empty");
      return;
    }

    if (containsHarmfulContent(text)) {
      setError("Commitment contains unsafe or harmful language");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      // get account
      const { data: profile } = await supabase
        .from("profiles")
        .select("account_id")
        .eq("id", user.id)
        .single();

      if (!profile?.account_id) {
        setError("Account not found");
        setLoading(false);
        return;
      }

      // get credits
      const { data: account } = await supabase
        .from("accounts")
        .select("credits")
        .eq("id", profile.account_id)
        .single();

      if (!account || account.credits <= 0) {
        setError("No credits remaining. Please upgrade.");
        setLoading(false);
        return;
      }

      // create commitment
      await supabase.from("commitments").insert({
        user_id: user.id,
        account_id: profile.account_id,
        text,
        category,
        duration,
        status: "active",
      });

      // deduct credit
      await supabase
        .from("accounts")
        .update({
          credits: account.credits - 1,
        })
        .eq("id", profile.account_id);

      router.push("/dashboard");
    } catch (e) {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div style={container}>
      <div style={card}>
        <div style={header}>
          <div style={logo}>Stated</div>
          <div style={title}>Create Commitment</div>
          <div style={subtitle}>
            Make it public. Stay accountable.
          </div>
        </div>

        <div style={form}>
          {/* Text */}
          <textarea
            placeholder="Example: I will run 5km every day"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={textarea}
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={input}
          >
            <option>General</option>
            <option>Fitness</option>
            <option>Health</option>
            <option>Learning</option>
            <option>Career</option>
            <option>Business</option>
            <option>Finance</option>
            <option>Personal</option>
          </select>

          {/* Duration */}
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={input}
          >
            <option>1 week</option>
            <option>2 weeks</option>
            <option>3 weeks</option>
            <option>1 month</option>
            <option>3 months</option>
            <option>6 months</option>
            <option>1 year</option>
          </select>

          {error && <div style={errorStyle}>{error}</div>}

          <button
            onClick={createCommitment}
            disabled={loading}
            style={button}
          >
            {loading ? "Creating..." : "Create Commitment"}
          </button>
        </div>
      </div>
    </div>
  );
}

//
// STYLES (mobile-first production)
//

const container = {
  minHeight: "100vh",
  background: "#f1f5f9",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "16px",
  paddingTop: "32px",
};

const card = {
  width: "100%",
  maxWidth: "520px",
  background: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

const header = {
  marginBottom: "16px",
};

const logo = {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "4px",
};

const title = {
  fontSize: "18px",
  fontWeight: "600",
};

const subtitle = {
  fontSize: "14px",
  color: "#64748b",
};

const form = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
};

const textarea = {
  width: "100%",
  minHeight: "100px",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
};

const input = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
};

const button = {
  width: "100%",
  padding: "14px",
  fontSize: "16px",
  fontWeight: "600",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const errorStyle = {
  color: "#dc2626",
  fontSize: "14px",
};
