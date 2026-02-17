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

      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        setError("Not logged in");
        setLoading(false);
        return;
      }

      const userId = userData.user.id;

      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          username: username,
          created_at: new Date().toISOString()
        });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");

    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>Create your username</h1>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: 10,
          marginTop: 10,
          width: "100%",
          maxWidth: 300
        }}
      />

      <br />

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          marginTop: 15,
          padding: "10px 16px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        {loading ? "Saving..." : "Save"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}

    </div>
  );
}                                                                                                       bio,
                                                                                                                        website,
                                                                                                                              });

                                                                                                                                  if (insertError) {
                                                                                                                                        setError("Failed to save profile. Please try again.");
                                                                                                                                              setLoading(false);
                                                                                                                                                    return;
                                                                                                                                                        }

                                                                                                                                                            router.push("/dashboard");
                                                                                                                                                              };

                                                                                                                                                                return (
                                                                                                                                                                    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                                                                                                                                                                          <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
                                                                                                                                                                                  <h1 className="text-2xl font-semibold mb-2">
                                                                                                                                                                                            Complete your profile
                                                                                                                                                                                                    </h1>
                                                                                                                                                                                                            <p className="text-gray-600 mb-6">
                                                                                                                                                                                                                      This information will appear on your public profile.
                                                                                                                                                                                                                              </p>

                                                                                                                                                                                                                                      <form onSubmit={handleSubmit} className="space-y-4">
                                                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                                                            <label className="block text-sm font-medium mb-1">
                                                                                                                                                                                                                                                                          Full name
                                                                                                                                                                                                                                                                                      </label>
                                                                                                                                                                                                                                                                                                  <input
                                                                                                                                                                                                                                                                                                                type="text"
                                                                                                                                                                                                                                                                                                                              required
                                                                                                                                                                                                                                                                                                                                            value={fullName}
                                                                                                                                                                                                                                                                                                                                                          onChange={(e) => setFullName(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                        className="w-full border rounded-lg px-3 py-2"
                                                                                                                                                                                                                                                                                                                                                                                      placeholder="Your name"
                                                                                                                                                                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                                                                                                                                                                            </div>

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
