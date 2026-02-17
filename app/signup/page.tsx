"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {

  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup() {

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding");

    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>

      <h1>Signup</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: 10,
          marginTop: 10,
          display: "block",
          width: 250
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: 10,
          marginTop: 10,
          display: "block",
          width: 250
        }}
      />

      <button
        onClick={handleSignup}
        disabled={loading}
        style={{
          padding: 10,
          marginTop: 20,
          cursor: "pointer"
        }}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}

    </div>
  );

}                                                                                                                               <h1>Create account</h1>

                                                                                                                                                                                                                                                                                                                                                                            <form onSubmit={handleSignup}>

                                                                                                                                                                                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                                                                                                                                                                                              type="text"
                                                                                                                                                                                                                                                                                                                                                                                                        placeholder="Username"
                                                                                                                                                                                                                                                                                                                                                                                                                  value={username}
                                                                                                                                                                                                                                                                                                                                                                                                                            required
                                                                                                                                                                                                                                                                                                                                                                                                                                      onChange={(e) => setUsername(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                style={{ display: "block", marginBottom: 10, width: "100%" }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                        />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          type="email"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    placeholder="Email"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              value={email}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        required
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  onChange={(e) => setEmail(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            style={{ display: "block", marginBottom: 10, width: "100%" }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      type="password"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                placeholder="Password"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          value={password}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    required
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              onChange={(e) => setPassword(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        style={{ display: "block", marginBottom: 10, width: "100%" }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        {error && (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <p style={{ color: "red" }}>{error}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          )}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <button type="submit" disabled={loading}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            {loading ? "Creating..." : "Create account"}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
