"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingPage() {

  const supabase = createClient();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {

    setLoading(true);
    setError("");

    try {

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("User not found");
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          username: username,
        });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");

    } catch (err: any) {

      setError(err.message);

    }

    setLoading(false);

  }

  return (
    <div style={{ padding: 40 }}>

      <h1>Create Username</h1>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: 10,
          marginTop: 10,
          width: 250,
          display: "block"
        }}
      />

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          padding: 10,
          marginTop: 20,
          cursor: "pointer"
        }}
      >
        {loading ? "Saving..." : "Save"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}

    </div>
  );

}
