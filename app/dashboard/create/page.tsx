"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateCommitment() {
  const router = useRouter();

    const [text, setText] = useState("");
      const [credits, setCredits] = useState<number | null>(null);
        const [error, setError] = useState("");
          const [loading, setLoading] = useState(false);

            useEffect(() => {
                loadCredits();
                  }, []);

                    async function loadCredits() {
                        const {
                              data: { user },
                                  } = await supabase.auth.getUser();

                                      if (!user) return;

                                          const { data } = await supabase
                                                .from("credits")
                                                      .select("credits_remaining")
                                                            .eq("user_id", user.id)
                                                                  .single();

                                                                      if (data) {
                                                                            setCredits(data.credits_remaining);
                                                                                }
                                                                                  }

                                                                                    async function createCommitment() {
                                                                                        setError("");

                                                                                            if (!text.trim()) {
                                                                                                  setError("Enter commitment");
                                                                                                        return;
                                                                                                            }

                                                                                                                if (credits === 0) {
                                                                                                                      setError("No credits remaining");
                                                                                                                            return;
                                                                                                                                }

                                                                                                                                    setLoading(true);

                                                                                                                                        const {
                                                                                                                                              data: { user },
                                                                                                                                                  } = await supabase.auth.getUser();

                                                                                                                                                      if (!user) {
                                                                                                                                                            setError("Not logged in");
                                                                                                                                                                  setLoading(false);
                                                                                                                                                                        return;
                                                                                                                                                                            }

                                                                                                                                                                                const { error: insertError } = await supabase
                                                                                                                                                                                      .from("commitments")
                                                                                                                                                                                            .insert({
                                                                                                                                                                                                    user_id: user.id,
                                                                                                                                                                                                            text: text,
                                                                                                                                                                                                                    status: "active",
                                                                                                                                                                                                                          });

                                                                                                                                                                                                                              if (insertError) {
                                                                                                                                                                                                                                    setError(insertError.message);
                                                                                                                                                                                                                                          setLoading(false);
                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                        await supabase.rpc("decrement_credit");

                                                                                                                                                                                                                                                            router.push("/dashboard");
                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                return (
                                                                                                                                                                                                                                                                    <div style={{ padding: 20 }}>
                                                                                                                                                                                                                                                                          <h1>Create Commitment</h1>

                                                                                                                                                                                                                                                                                <p>Credits remaining: {credits}</p>

                                                                                                                                                                                                                                                                                      <textarea
                                                                                                                                                                                                                                                                                              value={text}
                                                                                                                                                                                                                                                                                                      onChange={(e) => setText(e.target.value)}
                                                                                                                                                                                                                                                                                                              maxLength={200}
                                                                                                                                                                                                                                                                                                                      placeholder="Enter your commitment"
                                                                                                                                                                                                                                                                                                                              style={{ width: "100%", height: 100 }}
                                                                                                                                                                                                                                                                                                                                    />

                                                                                                                                                                                                                                                                                                                                          {error && <p style={{ color: "red" }}>{error}</p>}

                                                                                                                                                                                                                                                                                                                                                <button onClick={createCommitment} disabled={loading}>
                                                                                                                                                                                                                                                                                                                                                        Create
                                                                                                                                                                                                                                                                                                                                                              </button>
                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                    }