"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { containsHarmfulContent } from "../../../lib/safety";
import { useRouter } from "next/navigation";

export default function NewCommitment() {

  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");

  async function createCommitment() {

    setError("");

    if (!text.trim()) {
      setError("Commitment cannot be empty");
      return;
    }

    if (containsHarmfulContent(text)) {
      setError("Commitment violates safety guidelines");
      return;
    }

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    // get account
    const { data: profile } = await supabase
      .from("profiles")
      .select("account_id")
      .eq("id", userData.user.id)
      .single();

    const { data: account } = await supabase
      .from("accounts")
      .select("credits")
      .eq("id", profile.account_id)
      .single();

    if (account.credits <= 0) {
      setError("No credits remaining. Please upgrade.");
      return;
    }

    // create commitment
    await supabase.from("commitments").insert({
      text,
      category,
      account_id: profile.account_id,
      user_id: userData.user.id,
      status: "active"
    });

    // deduct credit
    await supabase
      .from("accounts")
      .update({
        credits: account.credits - 1
      })
      .eq("id", profile.account_id);

    router.push("/dashboard");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>New Commitment</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter commitment"
        style={{ width: "100%", height: 100 }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>General</option>
        <option>Fitness</option>
        <option>Health</option>
        <option>Learning</option>
        <option>Career</option>
        <option>Productivity</option>
      </select>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={createCommitment}>
        Create Commitment
      </button>

    </div>
  );
}
