"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const supabase = createClient();
    const router = useRouter();

      const [loading, setLoading] = useState(true);
        const [profile, setProfile] = useState<any>(null);
          const [credits, setCredits] = useState(0);
            const [commitments, setCommitments] = useState<any[]>([]);

              useEffect(() => {
                  loadDashboard();
                    }, []);

                      async function loadDashboard() {

                          const { data } = await supabase.auth.getUser();

                              if (!data?.user) {
                                    router.push("/login");
                                          return;
                                              }

                                                  const userId = data.user.id;

                                                      const { data: profileData } = await supabase
                                                            .from("profiles")
                                                                  .select("*")
                                                                        .eq("id", userId)
                                                                              .single();

                                                                                  setProfile(profileData);

                                                                                      const { data: creditData } = await supabase
                                                                                            .from("credits")
                                                                                                  .select("credits_remaining")
                                                                                                        .eq("user_id", userId)
                                                                                                              .single();

                                                                                                                  if (creditData) {
                                                                                                                        setCredits(creditData.credits_remaining);
                                                                                                                            }

                                                                                                                                const { data: commitmentsData } = await supabase
                                                                                                                                      .from("commitments")
                                                                                                                                            .select("*")
                                                                                                                                                  .eq("user_id", userId)
                                                                                                                                                        .order("created_at", { ascending: false });

                                                                                                                                                            if (commitmentsData) {
                                                                                                                                                                  setCommitments(commitmentsData);
                                                                                                                                                                      }

                                                                                                                                                                          setLoading(false);
                                                                                                                                                                            }

                                                                                                                                                                              function goToCreate() {
                                                                                                                                                                                  router.push("/dashboard/create");
                                                                                                                                                                                    }

                                                                                                                                                                                      if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

                                                                                                                                                                                        return (
                                                                                                                                                                                            <div style={{ padding: 20 }}>

                                                                                                                                                                                                  <h1>Dashboard</h1>

                                                                                                                                                                                                        <p>Credits: <b>{credits}</b></p>

                                                                                                                                                                                                              <button onClick={goToCreate}>
                                                                                                                                                                                                                      Create Commitment
                                                                                                                                                                                                                            </button>

                                                                                                                                                                                                                                  <h2>Your Commitments</h2>

                                                                                                                                                                                                                                        {commitments.map((c) => (
                                                                                                                                                                                                                                                <div key={c.id}>
                                                                                                                                                                                                                                                          <p>{c.text}</p>
                                                                                                                                                                                                                                                                    <p>{c.duration_type}</p>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                  ))}

                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                        }