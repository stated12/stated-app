"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    export default function EditProfile() {
      const router = useRouter();

        const [loading, setLoading] = useState(false);
          const [error, setError] = useState("");

            const [fullName, setFullName] = useState("");
              const [bio, setBio] = useState("");
                const [website, setWebsite] = useState("");

                  const [userId, setUserId] = useState<string | null>(null);

                    useEffect(() => {
                        getUser();
                          }, []);

                            async function getUser() {
                                const {
                                      data: { user },
                                          } = await supabase.auth.getUser();

                                              if (!user) {
                                                    router.push("/login");
                                                          return;
                                                              }

                                                                  setUserId(user.id);

                                                                      // load existing profile if exists
                                                                          const { data } = await supabase
                                                                                .from("profiles")
                                                                                      .select("*")
                                                                                            .eq("id", user.id)
                                                                                                  .single();

                                                                                                      if (data) {
                                                                                                            setFullName(data.display_name || "");
                                                                                                                  setBio(data.bio || "");
                                                                                                                        setWebsite(data.website || "");
                                                                                                                            }
                                                                                                                              }

                                                                                                                                async function handleSave(e: any) {
                                                                                                                                    e.preventDefault();

                                                                                                                                        setLoading(true);
                                                                                                                                            setError("");

                                                                                                                                                if (!userId) {
                                                                                                                                                      setError("User not found");
                                                                                                                                                            setLoading(false);
                                                                                                                                                                  return;
                                                                                                                                                                      }

                                                                                                                                                                          const { error } = await supabase.from("profiles").upsert(
                                                                                                                                                                                {
                                                                                                                                                                                        id: userId, // THIS IS THE CRITICAL FIX
                                                                                                                                                                                                display_name: fullName,
                                                                                                                                                                                                        bio: bio,
                                                                                                                                                                                                                website: website,
                                                                                                                                                                                                                      },
                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                    onConflict: "id",
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                              );

                                                                                                                                                                                                                                                  setLoading(false);

                                                                                                                                                                                                                                                      if (error) {
                                                                                                                                                                                                                                                            setError(error.message);
                                                                                                                                                                                                                                                                  return;
                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                          router.push("/dashboard");
                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                              return (
                                                                                                                                                                                                                                                                                  <div style={{ padding: 20 }}>
                                                                                                                                                                                                                                                                                        <h1>Complete your profile</h1>

                                                                                                                                                                                                                                                                                              <form onSubmit={handleSave}>

                                                                                                                                                                                                                                                                                                      <div>
                                                                                                                                                                                                                                                                                                                <label>Full name</label>
                                                                                                                                                                                                                                                                                                                          <input
                                                                                                                                                                                                                                                                                                                                      value={fullName}
                                                                                                                                                                                                                                                                                                                                                  onChange={(e) => setFullName(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                              required
                                                                                                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                                                                                                                                                                                                  <label>Short bio</label>
                                                                                                                                                                                                                                                                                                                                                                                                            <textarea
                                                                                                                                                                                                                                                                                                                                                                                                                        value={bio}
                                                                                                                                                                                                                                                                                                                                                                                                                                    onChange={(e) => setBio(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                              />
                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                              <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <label>Website</label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              value={website}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          onChange={(e) => setWebsite(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    {error && (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <p style={{ color: "red" }}>{error}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      )}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <button disabled={loading}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        {loading ? "Saving..." : "Continue"}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }