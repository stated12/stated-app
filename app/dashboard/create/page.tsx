"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {

  const supabase = createClient();
    const router = useRouter();

      const [text, setText] = useState("");
        const [credits, setCredits] = useState(0);
          const [durationType, setDurationType] = useState("7d");
            const [startDate, setStartDate] = useState("");
              const [endDate, setEndDate] = useState("");
                const [visibility, setVisibility] = useState("public");

                  const [loading, setLoading] = useState(false);
                    const [error, setError] = useState("");

                      useEffect(() => {
                          loadCredits();
                            }, []);

                              async function loadCredits() {

                                  const { data: userData } = await supabase.auth.getUser();

                                      if (!userData?.user) return;

                                          const { data } = await supabase
                                                .from("credits")
                                                      .select("credits_remaining")
                                                            .eq("user_id", userData.user.id)
                                                                  .single();

                                                                      if (data) setCredits(data.credits_remaining);
                                                                        }

                                                                          async function createCommitment() {

                                                                              setError("");

                                                                                  if (!text.trim()) {
                                                                                        setError("Enter commitment");
                                                                                              return;
                                                                                                  }

                                                                                                      if (credits <= 0) {
                                                                                                            setError("No credits remaining");
                                                                                                                  return;
                                                                                                                      }

                                                                                                                          setLoading(true);

                                                                                                                              const { data: userData } = await supabase.auth.getUser();

                                                                                                                                  if (!userData?.user) {
                                                                                                                                        setError("Not logged in");
                                                                                                                                              setLoading(false);
                                                                                                                                                    return;
                                                                                                                                                        }

                                                                                                                                                            const { error } = await supabase
                                                                                                                                                                  .from("commitments")
                                                                                                                                                                        .insert({
                                                                                                                                                                                user_id: userData.user.id,
                                                                                                                                                                                        text,
                                                                                                                                                                                                status: "active",
                                                                                                                                                                                                        duration_type: durationType,
                                                                                                                                                                                                                start_date: startDate || new Date(),
                                                                                                                                                                                                                        end_date: endDate || null,
                                                                                                                                                                                                                                visibility
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

                                                                                                                                                                                                                                                                                      <h1>Create Commitment</h1>

                                                                                                                                                                                                                                                                                            <p>Credits remaining: {credits}</p>

                                                                                                                                                                                                                                                                                                  <textarea
                                                                                                                                                                                                                                                                                                          value={text}
                                                                                                                                                                                                                                                                                                                  onChange={(e) => setText(e.target.value)}
                                                                                                                                                                                                                                                                                                                          placeholder="Enter your commitment"
                                                                                                                                                                                                                                                                                                                                  style={{
                                                                                                                                                                                                                                                                                                                                            width: "100%",
                                                                                                                                                                                                                                                                                                                                                      height: 100,
                                                                                                                                                                                                                                                                                                                                                                padding: 10,
                                                                                                                                                                                                                                                                                                                                                                          border: "1px solid #ccc",
                                                                                                                                                                                                                                                                                                                                                                                    borderRadius: 6
                                                                                                                                                                                                                                                                                                                                                                                            }}
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <option value="180d">6 Months</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <option value="365d">1 Year</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </select>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <br /><br />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    onClick={createCommitment}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            disabled={loading}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          {loading ? "Creating..." : "Create Commitment"}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      {error && (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <p style={{ color: "red" }}>{error}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    )}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }