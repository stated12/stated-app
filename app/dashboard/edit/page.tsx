"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const router = useRouter();

    const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);

        const [displayName, setDisplayName] = useState("");
          const [bio, setBio] = useState("");
            const [website, setWebsite] = useState("");

              useEffect(() => {
                  loadProfile();
                    }, []);

                      async function loadProfile() {
                          const {
                                data: { user },
                                    } = await supabase.auth.getUser();

                                        if (!user) {
                                              router.push("/login");
                                                    return;
                                                        }

                                                            const { data } = await supabase
                                                                  .from("profiles")
                                                                        .select("*")
                                                                              .eq("id", user.id)
                                                                                    .single();

                                                                                        if (data) {
                                                                                              setDisplayName(data.display_name || "");
                                                                                                    setBio(data.bio || "");
                                                                                                          setWebsite(data.website || "");
                                                                                                              }

                                                                                                                  setLoading(false);
                                                                                                                    }

                                                                                                                      async function handleSave() {
                                                                                                                          setSaving(true);

                                                                                                                              const {
                                                                                                                                    data: { user },
                                                                                                                                        } = await supabase.auth.getUser();

                                                                                                                                            const { error } = await supabase
                                                                                                                                                  .from("profiles")
                                                                                                                                                        .update({
                                                                                                                                                                display_name: displayName,
                                                                                                                                                                        bio: bio,
                                                                                                                                                                                website: website,
                                                                                                                                                                                      })
                                                                                                                                                                                            .eq("id", user.id);

                                                                                                                                                                                                setSaving(false);

                                                                                                                                                                                                    if (error) {
                                                                                                                                                                                                          alert("Failed to save profile");
                                                                                                                                                                                                                return;
                                                                                                                                                                                                                    }

                                                                                                                                                                                                                        router.push("/dashboard");
                                                                                                                                                                                                                          }

                                                                                                                                                                                                                            if (loading) return <div>Loading...</div>;

                                                                                                                                                                                                                              return (
                                                                                                                                                                                                                                  <div style={{ padding: 20 }}>
                                                                                                                                                                                                                                        <h2>Edit Profile</h2>

                                                                                                                                                                                                                                              <input
                                                                                                                                                                                                                                                      placeholder="Full Name"
                                                                                                                                                                                                                                                              value={displayName}
                                                                                                                                                                                                                                                                      onChange={(e) => setDisplayName(e.target.value)}
                                                                                                                                                                                                                                                                            />

                                                                                                                                                                                                                                                                                  <br /><br />

                                                                                                                                                                                                                                                                                        <textarea
                                                                                                                                                                                                                                                                                                placeholder="Bio"
                                                                                                                                                                                                                                                                                                        value={bio}
                                                                                                                                                                                                                                                                                                                onChange={(e) => setBio(e.target.value)}
                                                                                                                                                                                                                                                                                                                      />

                                                                                                                                                                                                                                                                                                                            <br /><br />

                                                                                                                                                                                                                                                                                                                                  <input
                                                                                                                                                                                                                                                                                                                                          placeholder="Website"
                                                                                                                                                                                                                                                                                                                                                  value={website}
                                                                                                                                                                                                                                                                                                                                                          onChange={(e) => setWebsite(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                />

                                                                                                                                                                                                                                                                                                                                                                      <br /><br />

                                                                                                                                                                                                                                                                                                                                                                            <button onClick={handleSave} disabled={saving}>
                                                                                                                                                                                                                                                                                                                                                                                    {saving ? "Saving..." : "Save"}
                                                                                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                }
