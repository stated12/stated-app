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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      // get logged in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!user || userError) {
        setError("You must be logged in");
        setLoading(false);
        return;
      }

      // get profile safely
      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("account_id")
        .eq("id", user.id)
        .single();

      if (!profile || profileError) {
        setError("Profile not found");
        setLoading(false);
        return;
      }

      // get account safely
      const {
        data: account,
        error: accountError,
      } = await supabase
        .from("accounts")
        .select("credits")
        .eq("id", profile.account_id)
        .single();

      if (!account || accountError) {
        setError("Account not found");
        setLoading(false);
        return;
      }

      if (account.credits <= 0) {
        setError("No credits remaining. Please upgrade.");
        setLoading(false);
        return;
      }

      // create commitment
      const { error: insertError } = await supabase
        .from("commitments")
        .insert({
          user_id: user.id,
          account_id: profile.account_id,
          text: text,
          category: category,
          duration: duration,
          status: "active",
        });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      // deduct credit
      await supabase
        .from("accounts")
        .update({
          credits: account.credits - 1,
        })
        .eq("id", profile.account_id);

      // redirect
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h1>Create Commitment</h1>

      <textarea
        placeholder="I will run 5km daily"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
        }}
      >
        <option>General</option>
        <option>Fitness</option>
        <option>Health</option>
        <option>Career</option>
        <option>Learning</option>
        <option>Business</option>
      </select>

      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 10,
        }}
      >
        <option>1 week</option>
        <option>2 weeks</option>
        <option>1 month</option>
        <option>3 months</option>
        <option>6 months</option>
        <option>1 year</option>
      </select>

      {error && (
        <div style={{ color: "red", marginBottom: 10 }}>
          {error}
        </div>
      )}

      <button
        onClick={createCommitment}
        disabled={loading}
        style={{
          padding: 12,
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
          width: "100%",
        }}
      >
        {loading ? "Creating..." : "Create Commitment"}
      </button>
    </div>
  );
}
