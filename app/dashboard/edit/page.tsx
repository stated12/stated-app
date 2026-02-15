"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProfilePage() {
  const router = useRouter();

    const [loading, setLoading] = useState(false);
      const [userId, setUserId] = useState<string | null>(null);

        const [displayName, setDisplayName] = useState("");
          const [bio, setBio] = useState("");
            const [website, setWebsite] = useState("");
              const [username, setUsername] = useState("");

                const [error, setError] = useState("");

                  useEffect(() => {
                      async function loadUser() {
                            const {
                                    data: { user },
                                          } = await supabase.auth.getUser();

                                                if (!user) {
                                                        router.push("/login");
                                                                return;
                                                                      }

                                                                            setUserId(user.id);

                                                                                  const { data: profile } = await supabase
                                                                                          .from("profiles")
                                                                                                  .select("*")
                                                                                                          .eq("id", user.id)
                                                                                                                  .single();

                                                                                                                        if (profile) {
                                                                                                                                setDisplayName(profile.display_name || "");
                                                                                                                                        setBio(profile.bio || "");
                                                                                                                                                setWebsite(profile.website || "");
                                                                                                                                                        setUsername(profile.username || "");
                                                                                                                                                              }
                                                                                                                                                                  }

                                                                                                                                                                      loadUser();
                                                                                                                                                                        }, [router]);

                                                                                                                                                                          async function handleSave(e: React.FormEvent) {
                                                                                                                                                                              e.preventDefault();

                                                                                                                                                                                  if (!userId) return;

                                                                                                                                                                                      setLoading(true);
                                                                                                                                                                                          setError("");

                                                                                                                                                                                              const { error } = await supabase.from("profiles").upsert({
                                                                                                                                                                                                    id: userId,
                                                                                                                                                                                                          username: username || userId.substring(0, 8),
                                                                                                                                                                                                                display_name: displayName,
                                                                                                                                                                                                                      bio,
                                                                                                                                                                                                                            website,
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
                                                                                                                                                                                                                                                                            <h1>Complete your profile</h1>

                                                                                                                                                                                                                                                                                  <form onSubmit={handleSave}>
                                                                                                                                                                                                                                                                                          <input
                                                                                                                                                                                                                                                                                                    placeholder="Username"
                                                                                                                                                                                                                                                                                                              value={username}
                                                                                                                                                                                                                                                                                                                        onChange={(e) => setUsername(e.target.value)}
                                                                                                                                                                                                                                                                                                                                />

                                                                                                                                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                                                                                                                                                  placeholder="Full name"
                                                                                                                                                                                                                                                                                                                                                            value={displayName}
                                                                                                                                                                                                                                                                                                                                                                      onChange={(e) => setDisplayName(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                              />

                                                                                                                                                                                                                                                                                                                                                                                      <textarea
                                                                                                                                                                                                                                                                                                                                                                                                placeholder="Bio"
                                                                                                                                                                                                                                                                                                                                                                                                          value={bio}
                                                                                                                                                                                                                                                                                                                                                                                                                    onChange={(e) => setBio(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                            />

                                                                                                                                                                                                                                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                                                                                                                                                                                                                                              placeholder="Website"
                                                                                                                                                                                                                                                                                                                                                                                                                                                        value={website}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  onChange={(e) => setWebsite(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  {error && <p style={{ color: "red" }}>{error}</p>}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <button disabled={loading}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    {loading ? "Saving..." : "Save profile"}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }