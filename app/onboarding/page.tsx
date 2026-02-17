                                                                                                                                                                                                                                                                                                                </div>
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingPage() {

  const supabase = createClient();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {

    setLoading(true);
    setError("");

    try {

      // get current user
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      // validate username
      if (!username || username.length < 3) {
        setError("Username must be at least 3 characters");
        setLoading(false);
        return;
      }

      // check if username already exists
      const { data: existing } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (existing) {
        setError("Username already taken");
        setLoading(false);
        return;
      }

      // update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username: username })
        .eq("id", user.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      // go to dashboard
      router.push("/dashboard");

    } catch (err: any) {

      setError(err.message || "Something went wrong");

    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>Create your username</h1>

      <p>This will be your public profile URL:</p>

      <p><b>stated.in/u/{username || "username"}</b></p>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginTop: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px"
        }}
      />

      <br /><br />

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          padding: "10px 16px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {loading ? "Saving..." : "Save Username"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}

    </div>
  );

               }
                                                                                                                                                                                                                                                                                                                                                                                                                      <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                  <label className="block text-sm font-medium mb-1">
                                                                                                                                                                                                                                                                                                                                                                                                                                                Short bio
                                                                                                                                                                                                                                                                                                                                                                                                                                                            </label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <textarea
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      value={bio}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    onChange={(e) => setBio(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  className="w-full border rounded-lg px-3 py-2"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                rows={3}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              placeholder="What do you stand for"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <label className="block text-sm font-medium mb-1">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Website (optional)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              type="url"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            value={website}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          onChange={(e) => setWebsite(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        className="w-full border rounded-lg px-3 py-2"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      placeholder="https://example.com"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      {error && (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <p className="text-red-600 text-sm">{error}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            )}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  type="submit"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              disabled={loading}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                {loading ? "Saving..." : "Continue"}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }
