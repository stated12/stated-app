"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {

  const supabase = createClient();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: any) {

    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {

      await supabase.from("profiles").insert({
        id: data.user.id,
        username,
        email,
      });

      router.push("/onboarding");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          {loading ? "Loading..." : "Signup"}
        </button>

      </form>

      {error && <p>{error}</p>}

    </div>
  );

}                                                                                                                                                                                          const user = data.user;

                                                                                                                                                                                                if (!user) {
                                                                                                                                                                                                        setError("Signup failed");
                                                                                                                                                                                                                setLoading(false);
                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                    // 3. Create profile
                                                                                                                                                                                                                                          const { error: profileError } = await supabase
                                                                                                                                                                                                                                                  .from("profiles")
                                                                                                                                                                                                                                                          .insert({
                                                                                                                                                                                                                                                                    id: user.id,
                                                                                                                                                                                                                                                                              username: username,
                                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                                            if (profileError) {
                                                                                                                                                                                                                                                                                                    setError(profileError.message);
                                                                                                                                                                                                                                                                                                            setLoading(false);
                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                                // 4. Redirect
                                                                                                                                                                                                                                                                                                                                      router.push("/dashboard");

                                                                                                                                                                                                                                                                                                                                          } catch (err: any) {
                                                                                                                                                                                                                                                                                                                                                setError(err.message);
                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                        setLoading(false);
                                                                                                                                                                                                                                                                                                                                                          };

                                                                                                                                                                                                                                                                                                                                                            return (
                                                                                                                                                                                                                                                                                                                                                                <div style={{ maxWidth: 400, margin: "100px auto" }}>
                                                                                                                                                                                                                                                                                                                                                                      <h1>Create account</h1>

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
