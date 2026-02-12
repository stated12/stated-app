"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    export default function Page() {
      const params = useParams();
        const username = (params.username as string)?.toLowerCase();

          const [profile, setProfile] = useState<any>(null);
            const [error, setError] = useState<any>(null);

              useEffect(() => {
                  if (!username) return;

                      async function fetchProfile() {
                            const { data, error } = await supabase
                                    .from("profiles")
                                            .select("*")
                                                    .eq("username", username)
                                                            .maybeSingle();

                                                                  if (error) {
                                                                          setError(error);
                                                                                } else {
                                                                                        setProfile(data);
                                                                                              }
                                                                                                  }

                                                                                                      fetchProfile();
                                                                                                        }, [username]);

                                                                                                          if (error) {
                                                                                                              return (
                                                                                                                    <div style={{ padding: 24 }}>
                                                                                                                            <h1>Database Error</h1>
                                                                                                                                    <pre>{JSON.stringify(error, null, 2)}</pre>
                                                                                                                                          </div>
                                                                                                                                              );
                                                                                                                                                }

                                                                                                                                                  if (!profile) {
                                                                                                                                                      return (
                                                                                                                                                            <div style={{ padding: 24 }}>
                                                                                                                                                                    <h1>User not found</h1>
                                                                                                                                                                            <p>Searching for: {username}</p>
                                                                                                                                                                                  </div>
                                                                                                                                                                                      );
                                                                                                                                                                                        }

                                                                                                                                                                                          return (
                                                                                                                                                                                              <div style={{ padding: 24 }}>
                                                                                                                                                                                                    <h1>Public Profile</h1>
                                                                                                                                                                                                          <p><strong>Username:</strong> {profile.username}</p>
                                                                                                                                                                                                                <p><strong>Display Name:</strong> {profile.display_name}</p>
                                                                                                                                                                                                                      <p><strong>Created At:</strong> {profile.created_at}</p>
                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                            );
                                                                                                                                                                                                                            }