"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {
  const supabase = createClient();
    const router = useRouter();

      const [text, setText] = useState("");
        const [credits, setCredits] = useState(0);
          const [durationType, setDurationType] = useState("30d");
            const [startDate, setStartDate] = useState("");
              const [endDate, setEndDate] = useState("");
                const [visibility, setVisibility] = useState("public");
                  const [loading, setLoading] = useState(false);
                    const [error, setError] = useState("");

                      useEffect(() => {
                          loadCredits();
                            }, []);

                              async function loadCredits() {
                                  const { data: user } = await supabase.auth.getUser();

                                      const { data } = await supabase
                                            .from("credits")
                                                  .select("credits_remaining")
                                                        .eq("user_id", user.user.id)
                                                              .single();

                                                                  if (data) setCredits(data.credits_remaining);
                                                                    }

                                                                      async function createCommitment() {
                                                                          setError("");

                                                                              if (!text) {
                                                                                    setError("Enter commitment");
                                                                                          return;
                                                                                              }

                                                                                                  if (credits <= 0) {
                                                                                                        setError("No credits remaining");
                                                                                                              return;
                                                                                                                  }

                                                                                                                      setLoading(true);

                                                                                                                          const { data: user } = await supabase.auth.getUser();

                                                                                                                              const { error } = await supabase.from("commitments").insert({
                                                                                                                                    user_id: user.user.id,
                                                                                                                                          text,
                                                                                                                                                status: "active",
                                                                                                                                                      duration_type: durationType,
                                                                                                                                                            start_date: startDate || new Date(),
                                                                                                                                                                  end_date: endDate || null,
                                                                                                                                                                        visibility,
                                                                                                                                                                            });

                                                                                                                                                                                if (error) {
                                                                                                                                                                                      setError(error.message);
                                                                                                                                                                                            setLoading(false);
                                                                                                                                                                                                  return;
                                                                                                                                                                                                      }

                                                                                                                                                                                                          await supabase.rpc("consume_credit");

                                                                                                                                                                                                              router.push("/dashboard");
                                                                                                                                                                                                                }

                                                                                                                                                                                                                  return (
                                                                                                                                                                                                                      <div style={{ padding: 20 }}>

                                                                                                                                                                                                                            <h2>Create Commitment</h2>

                                                                                                                                                                                                                                  <p>Credits remaining: {credits}</p>

                                                                                                                                                                                                                                        <textarea
                                                                                                                                                                                                                                                placeholder="Enter your commitment"
                                                                                                                                                                                                                                                        value={text}
                                                                                                                                                                                                                                                                onChange={(e) => setText(e.target.value)}
                                                                                                                                                                                                                                                                        style={{ width: "100%", height: 100 }}
                                                                                                                                                                                                                                                                              />

                                                                                                                                                                                                                                                                                    <br /><br />

                                                                                                                                                                                                                                                                                          <label>Duration</label><br />

                                                                                                                                                                                                                                                                                                <select
                                                                                                                                                                                                                                                                                                        value={durationType}
                                                                                                                                                                                                                                                                                                                onChange={(e) => setDurationType(e.target.value)}
                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                              <option value="7d">7 Days</option>
                                                                                                                                                                                                                                                                                                                                      <option value="14d">14 Days</option>
                                                                                                                                                                                                                                                                                                                                              <option value="30d">30 Days</option>
                                                                                                                                                                                                                                                                                                                                                      <option value="90d">90 Days</option>
                                                                                                                                                                                                                                                                                                                                                            </select>

                                                                                                                                                                                                                                                                                                                                                                  <br /><br />

                                                                                                                                                                                                                                                                                                                                                                        <label>Start Date</label><br />
                                                                                                                                                                                                                                                                                                                                                                              <input
                                                                                                                                                                                                                                                                                                                                                                                      type="date"
                                                                                                                                                                                                                                                                                                                                                                                              onChange={(e) => setStartDate(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                    />

                                                                                                                                                                                                                                                                                                                                                                                                          <br /><br />

                                                                                                                                                                                                                                                                                                                                                                                                                <label>End Date</label><br />
                                                                                                                                                                                                                                                                                                                                                                                                                      <input
                                                                                                                                                                                                                                                                                                                                                                                                                              type="date"
                                                                                                                                                                                                                                                                                                                                                                                                                                      onChange={(e) => setEndDate(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                            />

                                                                                                                                                                                                                                                                                                                                                                                                                                                  <br /><br />

                                                                                                                                                                                                                                                                                                                                                                                                                                                        <label>Visibility</label><br />

                                                                                                                                                                                                                                                                                                                                                                                                                                                              <select
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      value={visibility}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              onChange={(e) => setVisibility(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <option value="public">Public</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <option value="private">Private</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </select>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <br /><br />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      {error && <p style={{ color: "red" }}>{error}</p>}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <button onClick={createCommitment} disabled={loading}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    {loading ? "Creating..." : "Create"}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }