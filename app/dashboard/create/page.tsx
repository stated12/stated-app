                                                                                                                          </div>
        "use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {
  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [duration, setDuration] = useState("7");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createCommitment() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not logged in");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("commitments").insert({
      user_id: user.id,
      text: text,
      duration_days: parseInt(duration),
      status: "active",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Commitment</h1>

      <textarea
        placeholder="Enter your commitment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: "100px",
          marginTop: "10px",
        }}
      />

      <div style={{ marginTop: "10px" }}>
        <label>Duration: </label>

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="7">7 days</option>
          <option value="14">14 days</option>
          <option value="30">30 days</option>
          <option value="60">60 days</option>
        </select>
      </div>

      <button
        onClick={createCommitment}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "10px",
        }}
      >
        {loading ? "Creating..." : "Create Commitment"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
                                                                                                                                     }                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                            }
