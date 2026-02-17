"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {

  const supabase = createClient();
    const router = useRouter();

      const [text, setText] = useState("");
        const [duration, setDuration] = useState("7d");
          const [credits, setCredits] = useState(0);

            useEffect(() => {
                loadCredits();
                  }, []);

                    async function loadCredits() {

                        const { data } = await supabase.auth.getUser();

                            if (!data?.user) {
                                  router.push("/login");
                                        return;
                                            }

                                                const { data: creditData } = await supabase
                                                      .from("credits")
                                                            .select("credits_remaining")
                                                                  .eq("user_id", data.user.id)
                                                                        .single();

                                                                            if (creditData) {
                                                                                  setCredits(creditData.credits_remaining);
                                                                                      }
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