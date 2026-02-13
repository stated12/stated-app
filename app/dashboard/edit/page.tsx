"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const router = useRouter();

    const [fullName, setFullName] = useState("");
      const [bio, setBio] = useState("");
        const [website, setWebsite] = useState("");
          const [error, setError] = useState("");
            const [loading, setLoading] = useState(false);

              const handleSave = async () => {
                  setLoading(true);
                      setError("");

                          const {
                                data: { user },
                                    } = await supabase.auth.getUser();

                                        if (!user) {
                                              setError("Not logged in");
                                                    setLoading(false);
                                                          return;
                                                              }

                                                                  const { error } = await supabase
                                                                        .from("profiles")
                                                                              .upsert({
                                                                                      id: user.id,
                                                                                              username: user.user_metadata.username,
                                                                                                      display_name: fullName,
                                                                                                              bio: bio,
                                                                                                                      website: website,
                                                                                                                            });

                                                                                                                                if (error) {
                                                                                                                                      setError(error.message);
                                                                                                                                            setLoading(false);
                                                                                                                                                  return;
                                                                                                                                                      }

                                                                                                                                                          router.push("/dashboard");
                                                                                                                                                            };

                                                                                                                                                              return (
                                                                                                                                                                  <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
                                                                                                                                                                        <h2>Complete your profile</h2>

                                                                                                                                                                              <input
                                                                                                                                                                                      placeholder="Full name"
                                                                                                                                                                                              value={fullName}
                                                                                                                                                                                                      onChange={(e) => setFullName(e.target.value)}
                                                                                                                                                                                                              style={{ width: "100%", marginBottom: 10 }}
                                                                                                                                                                                                                    />

                                                                                                                                                                                                                          <textarea
                                                                                                                                                                                                                                  placeholder="Short bio"
                                                                                                                                                                                                                                          value={bio}
                                                                                                                                                                                                                                                  onChange={(e) => setBio(e.target.value)}
                                                                                                                                                                                                                                                          style={{ width: "100%", marginBottom: 10 }}
                                                                                                                                                                                                                                                                />

                                                                                                                                                                                                                                                                      <input
                                                                                                                                                                                                                                                                              placeholder="Website"
                                                                                                                                                                                                                                                                                      value={website}
                                                                                                                                                                                                                                                                                              onChange={(e) => setWebsite(e.target.value)}
                                                                                                                                                                                                                                                                                                      style={{ width: "100%", marginBottom: 10 }}
                                                                                                                                                                                                                                                                                                            />

                                                                                                                                                                                                                                                                                                                  {error && <p style={{ color: "red" }}>{error}</p>}

                                                                                                                                                                                                                                                                                                                        <button onClick={handleSave} disabled={loading}>
                                                                                                                                                                                                                                                                                                                                {loading ? "Saving..." : "Continue"}
                                                                                                                                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                            }