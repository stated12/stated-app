           "use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
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
      setError("Enter commitment");
      return;
    }

    setLoading(true);

    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      setError("Not logged in");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("commitments")
      .insert({
        user_id: data.user.id,
        text: text,
        status: "active"
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>Create Commitment</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your commitment"
        style={{
          width: "100%",
          height: 100,
          padding: 10,
          borderRadius: 6,
          border: "1px solid #ccc"
        }}
      />

      <br /><br />

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <button
        onClick={createCommitment}
        disabled={loading}
        style={{
          padding: "10px 16px",
          backgroundColor: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        {loading ? "Creating..." : "Create"}
      </button>

    </div>
  );
}                                                                           }
                                                                                        }

                                                                                          async function createCommitment() {

                                                                                              const { data } = await supabase.auth.getUser();

                                                                                                  if (!data?.user) return;

                                                                                                      await supabase
                                                                                                            .from("commitments")
                                                                                                                  .insert({
                                                                                                                          user_id: data.user.id,
                                                                                                                                  text: text,
                                                                                                                                          duration_type: duration,
                                                                                                                                                  status: "active"
                                                                                                                                                        });

                                                                                                                                                            router.push("/dashboard");
                                                                                                                                                              }

                                                                                                                                                                return (
                                                                                                                                                                    <div style={{ padding: 20 }}>

                                                                                                                                                                          <h1>Create Commitment</h1>

                                                                                                                                                                                <p>Credits: {credits}</p>

                                                                                                                                                                                      <textarea
                                                                                                                                                                                              value={text}
                                                                                                                                                                                                      onChange={(e) => setText(e.target.value)}
                                                                                                                                                                                                              placeholder="Commitment"
                                                                                                                                                                                                                    />

                                                                                                                                                                                                                          <br /><br />

                                                                                                                                                                                                                                <select
                                                                                                                                                                                                                                        value={duration}
                                                                                                                                                                                                                                                onChange={(e) => setDuration(e.target.value)}
                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                              <option value="7d">7 Days</option>
                                                                                                                                                                                                                                                                      <option value="30d">30 Days</option>
                                                                                                                                                                                                                                                                              <option value="90d">90 Days</option>
                                                                                                                                                                                                                                                                                      <option value="365d">1 Year</option>
                                                                                                                                                                                                                                                                                            </select>

                                                                                                                                                                                                                                                                                                  <br /><br />

                                                                                                                                                                                                                                                                                                        <button onClick={createCommitment}>
                                                                                                                                                                                                                                                                                                                Create
                                                                                                                                                                                                                                                                                                                      </button>

                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                            }
